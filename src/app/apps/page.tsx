import { getDb } from "@/lib/db";
import { AppCard } from "@/components/app-card";

export default async function BrowseApps() {
  const sql = getDb();

  const apps = await sql`
    SELECT a.*, u.username, u.avatar_url
    FROM apps a
    JOIN users u ON a.user_id = u.id
    WHERE a.status = 'published'
    ORDER BY a.created_at DESC
  `;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Apps</h1>
        <p className="text-foreground/60 mt-2">
          Discover apps built by vibe coders
        </p>
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-20 text-foreground/40">
          <p className="text-xl mb-2">No apps yet</p>
          <p>Be the first to submit one!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              id={app.id as number}
              name={app.name as string}
              slug={app.slug as string}
              tagline={app.tagline as string}
              image_url={app.image_url as string | null}
              tags={app.tags as string[]}
              username={app.username as string}
              avatar_url={app.avatar_url as string | null}
            />
          ))}
        </div>
      )}
    </div>
  );
}
