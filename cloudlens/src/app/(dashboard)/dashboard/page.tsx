import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <div className="rounded-radius-lg border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-text mb-1">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}!
        </h2>
        <p className="text-sm text-text2">
          Your dashboard is ready. Start by syncing your repositories.
        </p>
      </div>
    </div>
  );
}
