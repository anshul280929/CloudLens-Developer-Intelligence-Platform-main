/**
 * GitHub REST API service module
 *
 * Provides typed wrappers around the GitHub v3 REST API with:
 * - Automatic pagination for list endpoints
 * - ETag-based conditional requests (304 caching)
 * - Exponential backoff + retry on rate-limit (403/429) and server errors (5xx)
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string; avatar_url: string };
  private: boolean;
  html_url: string;
  description: string | null;
  language: string | null;
  default_branch: string;
  pushed_at: string | null;
  updated_at: string;
  size: number;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

export interface GitHubContent {
  type: "file" | "dir" | "symlink" | "submodule";
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  download_url: string | null;
  /** Base64-encoded file content (only present when type === "file") */
  content?: string;
  encoding?: string;
}

export interface GitHubTreeEntry {
  path: string;
  mode: string;
  type: "blob" | "tree" | "commit";
  sha: string;
  size?: number;
  url: string;
}

export interface GitHubTree {
  sha: string;
  url: string;
  tree: GitHubTreeEntry[];
  truncated: boolean;
}

// ---------------------------------------------------------------------------
// In-memory ETag cache
// Key: URL string, Value: { etag: string; data: unknown }
// ---------------------------------------------------------------------------

const etagCache = new Map<string, { etag: string; data: unknown }>();

// ---------------------------------------------------------------------------
// Core fetch with rate-limit handling
// ---------------------------------------------------------------------------

const GITHUB_API = "https://api.github.com";
const MAX_RETRIES = 4;

class GitHubRateLimitError extends Error {
  constructor(
    public readonly resetAt: Date,
    message = "GitHub API rate limit exceeded",
  ) {
    super(message);
    this.name = "GitHubRateLimitError";
  }
}

class GitHubAPIError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "GitHubAPIError";
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch a GitHub API endpoint with:
 * - Authorization header
 * - ETag conditional requests (returns cached data on 304)
 * - Exponential backoff on 403 (secondary rate limit) and 429
 * - Retry on 5xx errors (up to MAX_RETRIES)
 */
async function githubFetch<T>(
  url: string,
  token: string,
  attempt = 0,
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const cached = etagCache.get(url);
  if (cached) {
    headers["If-None-Match"] = cached.etag;
  }

  const res = await fetch(url, { headers });

  // Serve from cache when GitHub says nothing changed
  if (res.status === 304 && cached) {
    return cached.data as T;
  }

  // Rate limited — respect the Retry-After / x-ratelimit-reset header
  if (res.status === 429 || res.status === 403) {
    if (attempt >= MAX_RETRIES) {
      const resetHeader =
        res.headers.get("x-ratelimit-reset") ??
        res.headers.get("retry-after");
      const resetAt = resetHeader
        ? new Date(Number(resetHeader) * 1000)
        : new Date(Date.now() + 60_000);
      throw new GitHubRateLimitError(resetAt);
    }

    // Calculate backoff: honour reset header if present, else exponential
    const retryAfter = res.headers.get("retry-after");
    const resetAt = res.headers.get("x-ratelimit-reset");

    let backoffMs: number;
    if (retryAfter) {
      backoffMs = Number(retryAfter) * 1000;
    } else if (resetAt) {
      backoffMs = Math.max(0, Number(resetAt) * 1000 - Date.now()) + 500;
    } else {
      // Exponential backoff: 1s, 2s, 4s, 8s …
      backoffMs = Math.pow(2, attempt) * 1000;
    }

    await sleep(backoffMs);
    return githubFetch<T>(url, token, attempt + 1);
  }

  // Retry transient server errors with exponential backoff
  if (res.status >= 500 && attempt < MAX_RETRIES) {
    await sleep(Math.pow(2, attempt) * 1000);
    return githubFetch<T>(url, token, attempt + 1);
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new GitHubAPIError(res.status, `GitHub API error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as T;

  // Store ETag for future conditional requests
  const etag = res.headers.get("etag");
  if (etag) {
    etagCache.set(url, { etag, data });
  }

  return data;
}

// ---------------------------------------------------------------------------
// Pagination helper
// ---------------------------------------------------------------------------

/**
 * Fetch all pages of a GitHub list endpoint.
 * Uses `Link` header rel="next" to follow pagination automatically.
 */
async function fetchAllPages<T>(
  initialUrl: string,
  token: string,
): Promise<T[]> {
  const results: T[] = [];
  let url: string | null = `${initialUrl}${initialUrl.includes("?") ? "&" : "?"}per_page=100`;

  while (url) {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const cached = etagCache.get(url);
    if (cached) headers["If-None-Match"] = cached.etag;

    const res = await fetchWithBackoff(url, headers, token);

    if (res.status === 304 && cached) {
      results.push(...(cached.data as T[]));
    } else {
      const page = (await res.json()) as T[];
      results.push(...page);

      const etag = res.headers.get("etag");
      if (etag) etagCache.set(url, { etag, data: page });
    }

    // Parse Link header for next page
    const link = res.headers.get("link");
    url = parseNextLink(link);
  }

  return results;
}

/** Minimal rate-limit-aware fetch used inside pagination loop */
async function fetchWithBackoff(
  url: string,
  headers: Record<string, string>,
  token: string,
  attempt = 0,
): Promise<Response> {
  const res = await fetch(url, { headers });

  if ((res.status === 429 || res.status === 403) && attempt < MAX_RETRIES) {
    const retryAfter = res.headers.get("retry-after");
    const resetAt = res.headers.get("x-ratelimit-reset");
    let backoffMs = Math.pow(2, attempt) * 1000;
    if (retryAfter) backoffMs = Number(retryAfter) * 1000;
    else if (resetAt) backoffMs = Math.max(0, Number(resetAt) * 1000 - Date.now()) + 500;
    await sleep(backoffMs);
    return fetchWithBackoff(url, headers, token, attempt + 1);
  }

  if (res.status >= 500 && attempt < MAX_RETRIES) {
    await sleep(Math.pow(2, attempt) * 1000);
    return fetchWithBackoff(url, headers, token, attempt + 1);
  }

  return res;
}

/** Extract the `rel="next"` URL from a GitHub Link header */
function parseNextLink(header: string | null): string | null {
  if (!header) return null;
  const match = header.match(/<([^>]+)>;\s*rel="next"/);
  return match ? match[1] : null;
}

// ---------------------------------------------------------------------------
// Public API functions
// ---------------------------------------------------------------------------

/**
 * Fetch all repositories accessible to the authenticated user
 * (public + private), handling pagination automatically.
 *
 * @param accessToken - GitHub OAuth access token
 */
export async function getUserRepos(accessToken: string): Promise<GitHubRepo[]> {
  return fetchAllPages<GitHubRepo>(
    `${GITHUB_API}/user/repos?type=all&sort=updated`,
    accessToken,
  );
}

/**
 * Fetch the contents of a file or directory within a repository.
 *
 * - For directories, returns an array of `GitHubContent` items.
 * - For files, returns a single `GitHubContent` with base64 `content`.
 *
 * @param accessToken - GitHub OAuth access token
 * @param owner       - Repository owner (login)
 * @param repo        - Repository name
 * @param path        - Path within the repository (default: root "")
 * @param ref         - Branch, tag, or commit SHA (default: repo default branch)
 */
export async function getRepoContents(
  accessToken: string,
  owner: string,
  repo: string,
  path = "",
  ref?: string,
): Promise<GitHubContent | GitHubContent[]> {
  let url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;
  if (ref) url += `?ref=${encodeURIComponent(ref)}`;
  return githubFetch<GitHubContent | GitHubContent[]>(url, accessToken);
}

/**
 * Fetch the complete recursive file tree of a repository.
 *
 * Uses the Git Trees API with `recursive=1` to get every file path
 * in a single request (GitHub truncates at ~100k entries; the
 * `truncated` flag on the response indicates this).
 *
 * @param accessToken - GitHub OAuth access token
 * @param owner       - Repository owner (login)
 * @param repo        - Repository name
 * @param ref         - Branch, tag, or commit SHA (default: HEAD)
 */
export async function getRepoTree(
  accessToken: string,
  owner: string,
  repo: string,
  ref = "HEAD",
): Promise<GitHubTree> {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`;
  return githubFetch<GitHubTree>(url, accessToken);
}

// Re-export error types so callers can catch specifically
export { GitHubRateLimitError, GitHubAPIError };
