# ☁️ CloudLens — Master Project To-Do List

> **Status:** Starting from scratch — zero progress  
> **Last Reset:** May 15, 2026  
> **Source:** Derived from PRD v1.0, Design System v1.0, Tech Stack 2026  

---

## Phase 0: Project Scaffolding & Dev Environment

### 0A — Repository & Tooling Bootstrap
- [x] **Task 0.1:** Initialize the Next.js 15 project with App Router, TypeScript, ESLint, and `src/` directory structure using `create-next-app`.
- [x] **Task 0.2:** Configure `tsconfig.json` path aliases (`@/components`, `@/lib`, `@/db`, `@/styles`, etc.).
- [x] **Task 0.3:** Install and configure Tailwind CSS v4 with PostCSS.
- [x] **Task 0.4:** Install `shadcn/ui` CLI and initialize the component library (set base color, CSS variables mode, and style).
- [x] **Task 0.5:** Install Framer Motion for animation support.
- [x] **Task 0.6:** Install Drizzle ORM (`drizzle-orm`, `drizzle-kit`) and the PostgreSQL driver (`@neondatabase/serverless` or `postgres`).
- [x] **Task 0.7:** Install NextAuth.js v5 (`next-auth@beta`, `@auth/drizzle-adapter`).
- [x] **Task 0.8:** Create a `.env.local` template file documenting all required environment variables (`DATABASE_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
- [x] **Task 0.9:** Set up Prettier and ESLint with consistent formatting rules for the project.
- [x] **Task 0.10:** Create a `.gitignore` tailored for Next.js, Node.js, and environment files.

### 0B — Database & Schema Foundation
- [x] **Task 0.11:** Provision a PostgreSQL database on Neon (free tier) and add the connection string to `.env.local`.
- [x] **Task 0.12:** Configure `drizzle.config.ts` with the database connection, schema path, and output directory.
- [x] **Task 0.13:** Define the core database schema in `src/db/schema.ts`:
  - `users` table (id, name, email, image, githubId, createdAt)
  - `accounts` table (NextAuth adapter requirements)
  - `sessions` table (NextAuth adapter requirements)
  - `verificationTokens` table (NextAuth adapter requirements)
- [x] **Task 0.14:** Run `drizzle-kit push` or `drizzle-kit migrate` to apply the initial schema to the database.
- [x] **Task 0.15:** Create a reusable database client module (`src/db/index.ts`) exporting the Drizzle instance.

### 0C — Authentication Setup
- [x] **Task 0.16:** Create a GitHub OAuth App on GitHub Developer Settings and add Client ID / Secret to `.env.local`.
- [x] **Task 0.17:** Configure NextAuth.js in `src/lib/auth.ts` (or `auth.ts` at root) with the GitHub provider, Drizzle adapter, and session strategy (JWT).
- [x] **Task 0.18:** Create the API route handler for NextAuth at `src/app/api/auth/[...nextauth]/route.ts`.
- [x] **Task 0.19:** Create an auth middleware (`middleware.ts`) to protect `/dashboard` and other authenticated routes.
- [x] **Task 0.20:** Build a `SessionProvider` wrapper component and integrate it into the root layout.
- [x] **Task 0.21:** Verify the full GitHub OAuth sign-in flow works end-to-end (sign in → session created → user persisted in DB → redirect to dashboard).

---

## Phase 1: Design System Implementation & Core UI

### 1A — Tailwind & Global Styles
- [x] **Task 1.1:** Configure `tailwind.config.ts` with the CloudLens Design System tokens:
  - Colors: `--bg (#07090E)`, `--surface (#0D1220)`, `--elevated (#131B2A)`, `--code-bg (#090D17)`, `--accent (#2EFFA0)`, `--accent-glow`, `--accent-bdr`, `--blue (#4E8FFF)`, `--amber (#F5B120)`, `--red (#FF5252)`, `--text (#DCE8F8)`, `--text2 (#7B92B2)`, `--text3 (#445870)`, borders.
  - Spacing scale: 4px base grid (space-1 through space-15).
  - Border radius: `--radius (8px)`, `--radius-lg (12px)`.
- [x] **Task 1.2:** Add Google Fonts — Syne (700, 800), DM Sans (300–600), DM Mono (400, 500) — via `next/font/google` or `<link>` in the root layout.
- [x] **Task 1.3:** Set up the font-family CSS variables (`--ff-d`, `--ff-b`, `--ff-m`) and apply `DM Sans` as the default body font.
- [x] **Task 1.4:** Create `src/app/globals.css` with base resets, scrollbar styling, selection color, smooth scrolling, and anti-aliased text rendering matching the design system.

### 1B — Base UI Components (shadcn/ui + Custom)
- [x] **Task 1.5:** Generate/customize the `Button` component with four variants (Primary, Secondary, Ghost, Danger), two sizes (Default, Small), and the specified hover/active states (translateY lift, glow shadow, border brighten).
- [x] **Task 1.6:** Add a `loading` prop to the Button component that replaces the icon with a 16px spinner SVG and disables pointer events without resizing.
- [x] **Task 1.7:** Create the `Badge` component with cloud provider variants (AWS, GCP, Azure, Vercel, Stripe, Supabase) using each brand's primary hue.
- [x] **Task 1.8:** Create scan status badge variants (Complete/green, Scanning/amber+pulse, Failed/red, Never Scanned/muted) with the pulsating dot animation reserved exclusively for the "Scanning" state.
- [x] **Task 1.9:** Create the `Input` component with the search icon, placeholder styling, and the accent glow focus effect (`box-shadow: 0 0 0 3px var(--accent-glow)`).
- [x] **Task 1.10:** Create the `Card` component base with `--surface` background, `--border` border, `--radius-lg` radius, and hover border-brighten transition.

### 1C — Composite UI Components
- [x] **Task 1.11:** Build the `RepoCard` component (repo name in DM Mono, owner, scan status badge, provider badges with counts, footer with service count + timestamp + "View →" ghost button).
- [x] **Task 1.12:** Build the `AlertCard` component (left accent border, provider badge, title, description with inline code, footer with repo name + timestamp).
- [x] **Task 1.13:** Build the `FeatureCard` component for the landing page (icon container, title in Syne, description in DM Sans).
- [x] **Task 1.14:** Build the `TerminalCodeBlock` component with the macOS-style three-dot header, DM Mono body, and syntax highlighting classes (`.kw`, `.str`, `.cmt`, `.val`, `.cmd`, `.prm`).
- [x] **Task 1.15:** Build the `StatusBar` component (Neon-style terminal status indicator with dot + uppercase monospace label).

### 1D — Layout Shell
- [ ] **Task 1.16:** Build the `Sidebar` component for the dashboard layout with:
  - CloudLens logo mark (4-square SVG icon) + wordmark in Syne 800
  - Navigation links grouped by category (Overview, Repositories, Services, Alerts, Costs, AI Insights, Settings)
  - Active link accent highlight
  - Sticky positioning, full-height, border-right separator
- [ ] **Task 1.17:** Build the `Header` component for the dashboard with:
  - Page title (dynamic based on current route)
  - Search input (global repo/service search)
  - Notification bell icon (placeholder — functional in Phase 2)
  - GitHub avatar + username from session
- [ ] **Task 1.18:** Create the authenticated dashboard layout (`src/app/(dashboard)/layout.tsx`) composing Sidebar + Header + main content area.
- [ ] **Task 1.19:** Create the public layout (`src/app/(public)/layout.tsx`) with a top navigation bar (CloudLens logo, nav links, "Connect GitHub →" CTA button).
- [ ] **Task 1.20:** Implement responsive behavior — sidebar collapses to a hamburger menu on mobile (<768px), cards stack vertically, padding adjusts.

---

## Phase 2: Landing Page

- [ ] **Task 2.1:** Build the Hero section with:
  - Dual-tone Syne headline (context in `--text`, value proposition in `--accent`)
  - Subtitle in DM Sans 17px `--text2`
  - Large "Connect GitHub →" primary CTA button
  - Terminal code block showing a sample CloudLens scan output
- [ ] **Task 2.2:** Build the Features grid section with 3-column `FeatureCard` layout showcasing: Auto-detect, GitHub OAuth, Weekly Digests (and more as needed).
- [ ] **Task 2.3:** Build the "How It Works" section with a 3-step visual flow (Connect → Scan → Monitor).
- [ ] **Task 2.4:** Build the Pricing table section with Free / Pro / Team / Enterprise tiers matching the PRD monetization section.
- [ ] **Task 2.5:** Build the Footer with links, CloudLens branding, and the tagline.
- [ ] **Task 2.6:** Add Framer Motion entrance animations (fade-in + slide-up) to hero, features, and pricing sections on scroll.
- [ ] **Task 2.7:** Add SEO metadata (`<title>`, `<meta description>`, Open Graph tags) for the landing page.
- [ ] **Task 2.8:** Wire the "Connect GitHub →" CTA to trigger the NextAuth GitHub sign-in flow.

---

## Phase 3: GitHub Integration & Repository Listing

### 3A — GitHub API Integration
- [ ] **Task 3.1:** Store the GitHub OAuth `access_token` from the NextAuth account record for API calls.
- [ ] **Task 3.2:** Create a GitHub API service module (`src/lib/github.ts`) with functions:
  - `getUserRepos(accessToken)` — fetch all user repos (public + private), handling pagination.
  - `getRepoContents(accessToken, owner, repo, path)` — fetch file/directory contents.
  - `getRepoTree(accessToken, owner, repo)` — fetch the full file tree recursively.
- [ ] **Task 3.3:** Implement GitHub API rate limit handling with ETags/conditional requests and exponential backoff.

### 3B — Repository Database Model
- [ ] **Task 3.4:** Extend the database schema with a `repositories` table:
  - `id`, `userId`, `githubId`, `name`, `fullName`, `owner`, `isPrivate`, `defaultBranch`, `lastCommitAt`, `htmlUrl`, `description`, `language`, `scanStatus` (enum: `pending`, `scanning`, `complete`, `failed`), `lastScannedAt`, `createdAt`, `updatedAt`.
- [ ] **Task 3.5:** Create a `scans` table:
  - `id`, `repositoryId`, `status`, `startedAt`, `completedAt`, `filesScanned`, `servicesFound`, `errorMessage`.
- [ ] **Task 3.6:** Create a `detectedServices` table:
  - `id`, `scanId`, `repositoryId`, `serviceName`, `serviceCategory` (enum: database, auth, hosting, payments, monitoring, email, storage, compute, cdn, ci-cd, other), `provider`, `confidenceScore` (decimal 0–1), `detectionSource` (enum: dependency, config, import, envVar, cicd), `evidenceFile`, `evidenceLine`, `evidenceSnippet`, `createdAt`.
- [ ] **Task 3.7:** Run database migration to apply the new tables.

### 3C — Repository Sync & UI
- [ ] **Task 3.8:** Create a server action `syncRepositories()` that fetches repos from GitHub API and upserts them into the `repositories` table.
- [ ] **Task 3.9:** Build the "All Repositories" dashboard page (`src/app/(dashboard)/repositories/page.tsx`) displaying a grid of `RepoCard` components with:
  - Repo name, owner, visibility badge (public/private)
  - Scan status badge
  - Last scanned timestamp
  - "Scan Now" button
- [ ] **Task 3.10:** Add search/filter functionality on the repositories page (by name, scan status, language).
- [ ] **Task 3.11:** Add a "Sync Repos" button that triggers `syncRepositories()` and refreshes the list.
- [ ] **Task 3.12:** Implement loading skeletons for the repository grid while data is fetching.
- [ ] **Task 3.13:** Implement empty state UI when no repositories are connected.

---

## Phase 4: Service Detection Engine

### 4A — Core Detection Rules
- [ ] **Task 4.1:** Create the service registry (`src/lib/detection/registry.ts`) — a structured catalog of the 20 launch services with metadata:
  - Service name, provider, category, logo/icon, dashboard URL, known free-tier limits
  - For each service: list of detection patterns (package names, import paths, env var prefixes, config file patterns, CI/CD references)
- [ ] **Task 4.2:** Build the dependency file parser (`src/lib/detection/parsers/dependencies.ts`) — parse `package.json` (dependencies + devDependencies), `requirements.txt`, `go.mod`, `Gemfile`, `pom.xml`, `build.gradle` to extract package names and match against the registry.
- [ ] **Task 4.3:** Build the config file parser (`src/lib/detection/parsers/config.ts`) — scan common config files (`.env*`, `docker-compose.yml`, `vercel.json`, `netlify.toml`, `firebase.json`, `serverless.yml`, `wrangler.toml`) for service references.
- [ ] **Task 4.4:** Build the import statement parser (`src/lib/detection/parsers/imports.ts`) — regex scan `.ts`, `.js`, `.py`, `.go`, `.java` files for SDK import patterns (e.g., `@aws-sdk/*`, `@supabase/supabase-js`, `stripe`, `firebase/*`).
- [ ] **Task 4.5:** Build the environment variable parser (`src/lib/detection/parsers/envVars.ts`) — scan for environment variable naming conventions (`AWS_*`, `SUPABASE_*`, `STRIPE_*`, `NEON_*`, etc.).
- [ ] **Task 4.6:** Build the CI/CD pipeline parser (`src/lib/detection/parsers/cicd.ts`) — scan `.github/workflows/*.yml`, `.gitlab-ci.yml`, `Jenkinsfile`, `Dockerfile` for service references.

### 4B — Confidence Scoring
- [ ] **Task 4.7:** Implement the confidence scoring algorithm (`src/lib/detection/scoring.ts`):
  - Direct SDK import → 0.9 base score
  - Dependency file match → 0.85 base score
  - Config file reference → 0.8 base score
  - CI/CD reference → 0.7 base score
  - Environment variable pattern → 0.5 base score
  - Multiple sources for same service → boost score (cap at 1.0)
- [ ] **Task 4.8:** Implement deduplication logic — merge multiple detections of the same service across files into a single result with the highest confidence.

### 4C — Scan Orchestration
- [ ] **Task 4.9:** Build the scan orchestrator (`src/lib/detection/scanner.ts`) that:
  1. Fetches the repository file tree via GitHub API
  2. Identifies scannable files (filters by relevant extensions and filenames)
  3. Fetches file contents for scannable files (batched to respect rate limits)
  4. Runs each parser on appropriate files
  5. Aggregates results, applies confidence scoring, deduplicates
  6. Returns the final list of detected services
- [ ] **Task 4.10:** Create the scan API endpoint / server action (`scanRepository(repoId)`) that:
  1. Sets repo `scanStatus` to `scanning`
  2. Creates a new `scans` record
  3. Invokes the scan orchestrator
  4. Persists `detectedServices` results to the database
  5. Updates the scan record with completion status and counts
  6. Sets repo `scanStatus` to `complete` (or `failed` on error)
- [ ] **Task 4.11:** Wire the "Scan Now" button on each `RepoCard` to trigger `scanRepository()` with optimistic UI updates (badge switches to "Scanning" with pulse).

---

## Phase 5: Dashboard Core Pages

### 5A — Dashboard Overview
- [ ] **Task 5.1:** Build the Dashboard Overview page (`src/app/(dashboard)/page.tsx`) with:
  - Stat cards: Total Repos, Total Services Detected, Services by Status (🟢🟡🔴), Providers Count
  - Recent scans list (last 5 scans with repo name, status, services found, timestamp)
  - Quick actions: "Sync Repos", "Scan All"
- [ ] **Task 5.2:** Create reusable `StatCard` component (icon, label, value, trend indicator).

### 5B — All Services View
- [ ] **Task 5.3:** Build the "All Services" page (`src/app/(dashboard)/services/page.tsx`) with:
  - Grid of service cards showing: service name, provider badge, category, confidence score, number of repos using it
  - Filters: by provider, by category, by confidence level (high/medium/low), by repository
  - Search by service name
- [ ] **Task 5.4:** Create the `ServiceCard` component (service name, provider badge, category tag, confidence bar, repo count, "View Details" link).

### 5C — Repository Detail Page
- [ ] **Task 5.5:** Build the Repository Detail page (`src/app/(dashboard)/repositories/[id]/page.tsx`) with:
  - Repository header (name, owner, visibility, language, last commit date, GitHub link)
  - Scan status + "Re-scan" button
  - Detected services list with full evidence (file path, line number, code snippet, confidence score, detection source)
  - Per-project cost summary (placeholder — real data in Phase 8)
- [ ] **Task 5.6:** Create the `ServiceEvidenceRow` component showing detection details for each service within a repo.

### 5D — Settings Page
- [ ] **Task 5.7:** Build the Settings page (`src/app/(dashboard)/settings/page.tsx`) with:
  - Profile section (GitHub avatar, username, email — read-only from session)
  - Connected account info (GitHub — connected, with "Disconnect" option)
  - Notification preferences (placeholder toggles — functional in Phase 6)
  - Danger zone: "Delete Account" button

---

## Phase 6: Smart Alerts & Notifications

### 6A — Background Job Infrastructure
- [ ] **Task 6.1:** Install and configure Inngest (`inngest`, `inngest/next`) in the Next.js project.
- [ ] **Task 6.2:** Create the Inngest client and serve route at `src/app/api/inngest/route.ts`.
- [ ] **Task 6.3:** Migrate the scan logic to an Inngest function (`repo.scan`) to run as a background job with retries and timeout handling.

### 6B — Alert Data Model & Engine
- [ ] **Task 6.4:** Add an `alerts` table to the database schema:
  - `id`, `userId`, `repositoryId`, `serviceId`, `type` (enum: expiry, inactivity, outage, security, cost), `severity` (enum: info, warning, critical), `title`, `message`, `status` (enum: active, dismissed, snoozed, resolved), `snoozedUntil`, `createdAt`, `updatedAt`.
- [ ] **Task 6.5:** Create a background job (`alerts.check-inactivity`) that cross-references repo inactivity (>30 days since last commit) against active detected services and generates inactivity alerts.
- [ ] **Task 6.6:** Create a background job (`alerts.check-expiry`) to poll known service trial/free-tier expiration policies and generate expiry warning alerts (7 days, 3 days, 1 day before).
- [ ] **Task 6.7:** Create a background job (`alerts.check-outages`) that polls Statuspage APIs for AWS, Vercel, Stripe, and other major services every 5 minutes and generates outage alerts.

### 6C — Notification Center UI
- [ ] **Task 6.8:** Build the Notification Center UI — bell icon in the header with unread badge count, dropdown panel listing recent alerts sorted by severity.
- [ ] **Task 6.9:** Implement alert actions: Dismiss, Snooze (7 days), Mark as Resolved, "I cancelled this."
- [ ] **Task 6.10:** Build the full Alerts page (`src/app/(dashboard)/alerts/page.tsx`) with filterable/sortable alert history.

### 6D — Email Notifications
- [ ] **Task 6.11:** Install Resend (`resend`) and React Email (`@react-email/components`).
- [ ] **Task 6.12:** Design the Monthly Email Digest template (active services count, total estimated cost, services needing attention, new detections).
- [ ] **Task 6.13:** Create a scheduled Inngest job (`email.monthly-digest`) that sends the digest on the 1st of each month.

---

## Phase 7: AI-Powered Intelligence

### 7A — AI Infrastructure
- [ ] **Task 7.1:** Install the Vercel AI SDK (`ai`, `@ai-sdk/openai`, `@ai-sdk/google`).
- [ ] **Task 7.2:** Configure API keys for GPT-4o-mini and/or Gemini 1.5 Flash in environment variables.
- [ ] **Task 7.3:** Create the AI service module (`src/lib/ai/index.ts`) with a model abstraction layer for switching between providers.

### 7B — AI-Enhanced Detection
- [ ] **Task 7.4:** Implement the "Deep Scan" AI fallback — for repos with <3 services detected or average confidence <0.5, send the file tree + select file samples to the LLM for enhanced service identification.
- [ ] **Task 7.5:** Implement the exposed API key / secret detection pipeline — prompt the LLM to analyze code samples for hardcoded credentials, API keys, and secrets.
- [ ] **Task 7.6:** Create the AI Recommendations engine — analyze a user's service inventory and suggest: missing stack components, service consolidation opportunities, and cheaper alternatives.

### 7C — AI UI Integration
- [ ] **Task 7.7:** Build the AI Insights page (`src/app/(dashboard)/insights/page.tsx`) with:
  - Recommendations feed (consolidation, missing services, cost savings)
  - Security findings (exposed keys, credentials)
  - Per-recommendation action buttons ("Dismiss", "Mark Fixed")
- [ ] **Task 7.8:** Add AI insight badges/cards to the Repository Detail page showing repo-specific recommendations and security findings.

### 7D — RAG Pipeline (Advanced)
- [ ] **Task 7.9:** Enable the `pgvector` extension on the Neon database.
- [ ] **Task 7.10:** Create an embeddings table and implement a basic RAG pipeline for querying cloud provider service policies (free-tier limits, pricing changes, deprecations).

---

## Phase 8: Visual Architecture Map

- [ ] **Task 8.1:** Install React Flow (`reactflow`).
- [ ] **Task 8.2:** Build a data transformer (`src/lib/architecture/transformer.ts`) that converts the database service inventory into React Flow nodes (services) and edges (relationships between services within a repo).
- [ ] **Task 8.3:** Build the Architecture Map page/component (`src/app/(dashboard)/repositories/[id]/architecture/page.tsx`) with:
  - Interactive, draggable node-based diagram
  - Color-coded nodes by status (green = healthy, amber = warning, red = critical)
  - Provider-grouped node clusters
- [ ] **Task 8.4:** Implement the click-to-detail side panel — clicking a node reveals service information, detection evidence, cost, and a "Go to Dashboard" link.
- [ ] **Task 8.5:** Add export functionality — download the architecture map as PNG or SVG.

---

## Phase 9: CLI & GitHub Action

### 9A — CLI Tool
- [ ] **Task 9.1:** Build the API Token management UI in dashboard settings — generate, revoke, and list API tokens for CLI/CI use.
- [ ] **Task 9.2:** Initialize the `@cloudlens/cli` package project structure (separate directory or monorepo workspace).
- [ ] **Task 9.3:** Implement local codebase scanning logic within the CLI (reuse detection engine modules).
- [ ] **Task 9.4:** Implement CLI → CloudLens API communication to push local scan results to the backend.

### 9B — GitHub Action
- [ ] **Task 9.5:** Create the `cloudlens/action` GitHub Action (Docker or composite action) that runs a scan on PRs.
- [ ] **Task 9.6:** Implement PR comment reporting — post a summary comment warning about blacklisted services, newly detected services, or exposed secrets.

---

## Phase 10: Cost Tracker & Burn Rate

- [ ] **Task 10.1:** Install Recharts (`recharts`) and build reusable Bar and Line chart components styled with the design system.
- [ ] **Task 10.2:** Build the Costs page (`src/app/(dashboard)/costs/page.tsx`) with:
  - Monthly burn rate header stat
  - Cost breakdown bar chart (by service)
  - Cost trend line chart (over time)
  - Per-project cost breakdown
  - "Wasted Spend" metric (costs for services in inactive repos)
- [ ] **Task 10.3:** Implement OAuth connection flows for external service accounts (Vercel, AWS) to pull real billing data.
- [ ] **Task 10.4:** Create background jobs to sync billing data from connected OAuth provider APIs on a schedule.
- [ ] **Task 10.5:** Implement budget threshold alerts — user sets a monthly budget, alert fires when projected spend exceeds it.

---

## Phase 11: Teams, Gamification & Enterprise

- [ ] **Task 11.1:** Extend the database schema for Organizations, Team Members (with roles: owner, admin, member, viewer), and invitation system.
- [ ] **Task 11.2:** Build Organization management UI (create org, invite users via email, manage permissions, transfer ownership).
- [ ] **Task 11.3:** Build the Organization-wide dashboard aggregating service data across all team members' repos.
- [ ] **Task 11.4:** Build the Developer Offboarding UI — checklist of services to revoke access for when a developer leaves, with direct dashboard links.
- [ ] **Task 11.5:** Implement gamification: Developer Health Score (0–100) calculated from scan frequency, alert response time, and service hygiene; achievement badges.
- [ ] **Task 11.6:** Implement SAML SSO integration for Enterprise tier users.

---

## Phase 12: Production Readiness & Launch

- [ ] **Task 12.1:** Set up Sentry for error monitoring and configure source maps.
- [ ] **Task 12.2:** Set up PostHog for product analytics (WAU, onboarding funnel, scan events, alert interactions).
- [ ] **Task 12.3:** Configure GitHub Actions CI/CD pipeline (lint, type-check, build, deploy preview on PR, deploy production on merge to main).
- [ ] **Task 12.4:** Deploy the application to Vercel with production environment variables.
- [ ] **Task 12.5:** Performance audit — ensure dashboard loads in <2 seconds, scans complete in <30 seconds.
- [ ] **Task 12.6:** Accessibility audit — verify WCAG 2.1 AA compliance on all interactive elements.
- [ ] **Task 12.7:** Write a `README.md` with project overview, setup instructions, architecture diagram, and contributing guide.
- [ ] **Task 12.8:** Create the Product Hunt launch page and prepare launch assets.

---

> **Total Tasks:** 100  
> **Estimated Timeline:** ~28 weeks (7 months) for full platform  
> **MVP (Phases 0–5):** ~6 weeks  
> *Built with 🔍 by CloudLens — "A lens into every cloud service you use."*
