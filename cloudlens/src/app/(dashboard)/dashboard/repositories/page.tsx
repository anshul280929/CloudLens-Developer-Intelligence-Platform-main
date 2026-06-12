import { db } from "@/db";
import { repositories, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { RepositoryList } from "@/components/RepositoryList";

export const dynamic = "force-dynamic";

export default async function RepositoriesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  let dbUserId = (session.user as any).id;
  if (!dbUserId && session.user.email) {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });
    dbUserId = dbUser?.id;
  }

  if (!dbUserId) {
    redirect("/api/auth/signin");
  }

  const userRepos = await db
    .select()
    .from(repositories)
    .where(eq(repositories.userId, dbUserId))
    .orderBy(desc(repositories.lastCommitAt));

  return (
    <div className="space-y-6">
      <RepositoryList initialRepos={userRepos} />
    </div>
  );
}
