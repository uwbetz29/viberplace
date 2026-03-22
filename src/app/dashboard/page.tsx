import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DashboardAppList } from "@/components/dashboard-app-list";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const sql = getDb();
  const username = (session.user as any).username as string;

  const users = await sql`SELECT id, role FROM users WHERE username = ${username}`;
  if (users.length === 0) redirect("/");

  const userId = users[0].id;
  const isAdmin = users[0].role === "admin";

  const apps = await sql`
    SELECT * FROM apps
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-foreground/50 mt-1">Manage your apps on Viberplace</p>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Console
            </Link>
          )}
          <Link
            href="/submit"
            className="flex items-center gap-2 text-sm bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Submit New App
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="text-2xl font-bold">{apps.length}</div>
          <div className="text-sm text-foreground/50">Total Apps</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="text-2xl font-bold text-green-400">
            {apps.filter((a) => a.status === "published").length}
          </div>
          <div className="text-sm text-foreground/50">Published</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="text-2xl font-bold text-yellow-400">
            {apps.filter((a) => a.status === "unlisted").length}
          </div>
          <div className="text-sm text-foreground/50">Unlisted</div>
        </div>
      </div>

      {/* App list */}
      {apps.length === 0 ? (
        <div className="text-center py-16 bg-surface border border-border rounded-2xl">
          <svg className="w-12 h-12 text-foreground/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="text-lg font-medium mb-1">No apps yet</p>
          <p className="text-foreground/40 text-sm mb-6">Submit your first app to get started</p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Submit Your First App
          </Link>
        </div>
      ) : (
        <DashboardAppList
          apps={apps.map((a) => ({
            id: a.id as number,
            name: a.name as string,
            slug: a.slug as string,
            tagline: a.tagline as string,
            url: a.url as string,
            image_url: a.image_url as string | null,
            tags: a.tags as string[],
            status: a.status as string,
            created_at: a.created_at as string,
            updated_at: a.updated_at as string,
          }))}
        />
      )}
    </div>
  );
}
