import { getDb } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AppDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sql = getDb();

  const rows = await sql`
    SELECT a.*, u.username, u.avatar_url, u.name as author_name
    FROM apps a
    JOIN users u ON a.user_id = u.id
    WHERE a.slug = ${id} AND a.status = 'published'
  `;

  if (rows.length === 0) return notFound();

  const app = rows[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/apps"
        className="text-sm text-foreground/40 hover:text-foreground/60 mb-6 inline-block"
      >
        &larr; Back to apps
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* App image */}
          <div className="aspect-video bg-surface border border-border rounded-xl overflow-hidden mb-6">
            {app.image_url ? (
              <img
                src={app.image_url as string}
                alt={app.name as string}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-foreground/20 text-6xl font-bold">
                {(app.name as string)[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{app.name as string}</h1>
          <p className="text-lg text-foreground/60 mb-6">
            {app.tagline as string}
          </p>

          {app.description && (
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground/80 whitespace-pre-wrap">
                {app.description as string}
              </p>
            </div>
          )}

          {(app.tags as string[])?.length > 0 && (
            <div className="flex gap-2 mt-6">
              {(app.tags as string[]).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-surface-light text-foreground/50 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <a
            href={app.url as string}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try this app &rarr;
          </a>

          {app.github_url && (
            <a
              href={app.github_url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-border hover:border-foreground/30 text-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View on GitHub
            </a>
          )}

          {/* Creator info */}
          <div className="bg-surface border border-border rounded-xl p-4 mt-6">
            <p className="text-xs text-foreground/40 mb-3">Built by</p>
            <Link
              href={`/profile/${app.username}`}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              {app.avatar_url && (
                <img
                  src={app.avatar_url as string}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{app.author_name as string}</p>
                <p className="text-sm text-foreground/40">
                  @{app.username as string}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
