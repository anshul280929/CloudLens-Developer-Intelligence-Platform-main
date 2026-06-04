import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>
        Signed in as: <strong>{session?.user?.email ?? "(no session)"}</strong>
      </p>
      <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
