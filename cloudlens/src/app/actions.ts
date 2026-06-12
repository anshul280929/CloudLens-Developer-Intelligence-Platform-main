"use server";

import { db } from "@/db";
import { repositories, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getUserRepos } from "@/lib/github";
import { revalidatePath } from "next/cache";

export async function syncRepositories() {
  const session = await auth();
  if (!session?.user || !session.accessToken) {
    throw new Error("Unauthorized");
  }

  let dbUserId = (session.user as any).id;
  if (!dbUserId && session.user.email) {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });
    dbUserId = dbUser?.id;
  }

  if (!dbUserId) {
    throw new Error("User not found in database");
  }

  try {
    // Fetch from GitHub API
    const githubRepos = await getUserRepos(session.accessToken);

    if (githubRepos.length === 0) {
      return { success: true, count: 0 };
    }

    // Insert or update in chunks to avoid parameter count limit
    const CHUNK_SIZE = 100;
    for (let i = 0; i < githubRepos.length; i += CHUNK_SIZE) {
      const chunk = githubRepos.slice(i, i + CHUNK_SIZE);
      
      const values = chunk.map((repo) => ({
        userId: dbUserId,
        githubId: String(repo.id),
        name: repo.name,
        fullName: repo.full_name,
        owner: repo.owner.login,
        isPrivate: repo.private,
        defaultBranch: repo.default_branch,
        lastCommitAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
        htmlUrl: repo.html_url,
        description: repo.description,
        language: repo.language,
        scanStatus: "pending" as const,
      }));

      await db.insert(repositories).values(values).onConflictDoUpdate({
        target: [repositories.userId, repositories.githubId],
        set: {
          name: sql`excluded.name`,
          fullName: sql`excluded."fullName"`,
          owner: sql`excluded.owner`,
          isPrivate: sql`excluded."isPrivate"`,
          defaultBranch: sql`excluded."defaultBranch"`,
          lastCommitAt: sql`excluded."lastCommitAt"`,
          htmlUrl: sql`excluded."htmlUrl"`,
          description: sql`excluded.description`,
          language: sql`excluded.language`,
          updatedAt: sql`now()`,
        },
      });
    }

    revalidatePath("/dashboard/repositories");
    return { success: true, count: githubRepos.length };
  } catch (error) {
    console.error("Error syncing repositories:", error);
    throw new Error("Failed to sync repositories");
  }
}
