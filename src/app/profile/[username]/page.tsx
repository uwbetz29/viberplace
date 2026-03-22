import { getDb } from "@/lib/db";
import { AppCard } from "@/components/app-card";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const sql = getDb();

  const users = await sql`
    SELECT * FROM users WHERE username = ${username}
  `;

  if (users.length === 0) return notFound();

  const user = users[0];

  const apps = await sql`
    SELECT a.*, u.username, u.avatar_url
    FROM apps a
    JOIN users u ON a.user_id = u.id
    WHERE a.user_id = ${user.id} AND a.status = 'published'
    ORDER BY a.created_at DESC
  `;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Profile header */}
      <div className="flex items-center gap-6 mb-10">
        {user.avatar_url && (
          <img
            src={user.avatar_url as string}
            alt=""
            className="w-20 h-20 rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{user.name as string}</h1>
          <p className="text-foreground/40">@{user.username as string}</p>
          {user.bio && (
            <p className="text-foreground/60 mt-1">{user.bio as string}</p>
          )}
        </div>
      </div>

      {/* User's apps */}
      <h2 className="text-xl font-semibold mb-6">
        Apps ({apps.length})
      </h2>

      {apps.length === 0 ? (
        <p className="text-foreground/40">No apps submitted yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              id={app.id as number}
              name={app.name as string}
              slug={app.slug as string}
              tagline={app.tagline as string}
              url={app.url as string}
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
