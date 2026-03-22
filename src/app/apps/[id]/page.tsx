import { getDb } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppPreview } from "@/components/app-preview";

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

  // Get other apps by same developer
  const moreByDev = await sql`
    SELECT id, name, slug, tagline, image_url, tags
    FROM apps
    WHERE user_id = ${app.user_id} AND id != ${app.id} AND status = 'published'
    ORDER BY created_at DESC
    LIMIT 4
  `;

  const createdDate = new Date(app.created_at as string).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/apps"
        className="text-sm text-foreground/40 hover:text-foreground/60 mb-6 inline-flex items-center gap-1 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Browse Apps
      </Link>

      {/* App Store style header */}
      <div className="flex items-start gap-5 mb-8 mt-4">
        {/* App icon */}
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-[22px] md:rounded-[28px] bg-surface-light border border-border overflow-hidden shrink-0 shadow-lg">
          {app.image_url ? (
            <img
              src={app.image_url as string}
              alt={app.name as string}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl md:text-5xl font-bold text-accent-light bg-gradient-to-br from-accent/20 to-accent/5">
              {(app.name as string)[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-1 truncate">
            {app.name as string}
          </h1>
          <p className="text-foreground/60 mb-3">{app.tagline as string}</p>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={app.url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-md"
            >
              TRY IT
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>

            {app.github_url && (
              <a
                href={app.github_url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border hover:border-foreground/30 text-foreground/70 hover:text-foreground px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
            )}

            <Link
              href={`/profile/${app.username}`}
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors text-sm"
            >
              {app.avatar_url && (
                <img
                  src={app.avatar_url as string}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
              )}
              @{app.username as string}
            </Link>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-6 py-4 border-y border-border mb-8 text-sm overflow-x-auto">
        <div className="text-center shrink-0">
          <p className="text-foreground/40 text-xs uppercase tracking-wide">
            Listed
          </p>
          <p className="font-medium mt-0.5">{createdDate}</p>
        </div>
        <div className="w-px h-8 bg-border shrink-0" />
        <div className="text-center shrink-0">
          <p className="text-foreground/40 text-xs uppercase tracking-wide">
            Developer
          </p>
          <p className="font-medium mt-0.5">{app.author_name as string}</p>
        </div>
        {(app.tags as string[])?.length > 0 && (
          <>
            <div className="w-px h-8 bg-border shrink-0" />
            <div className="text-center shrink-0">
              <p className="text-foreground/40 text-xs uppercase tracking-wide">
                Category
              </p>
              <p className="font-medium mt-0.5 text-accent-light">
                {(app.tags as string[])[0]}
              </p>
            </div>
          </>
        )}
        <div className="w-px h-8 bg-border shrink-0" />
        <div className="text-center shrink-0">
          <p className="text-foreground/40 text-xs uppercase tracking-wide">
            Price
          </p>
          <p className="font-medium mt-0.5">Free</p>
        </div>
      </div>

      {/* Live Preview */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live Preview
        </h2>
        <AppPreview url={app.url as string} appName={app.name as string} />
      </section>

      {/* Description */}
      {app.description && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">About this app</h2>
          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
              {app.description as string}
            </p>
          </div>
        </section>
      )}

      {/* Tags */}
      {(app.tags as string[])?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex gap-2 flex-wrap">
            {(app.tags as string[]).map((tag: string) => (
              <span
                key={tag}
                className="text-sm bg-surface border border-border text-foreground/60 px-4 py-2 rounded-full hover:border-accent/50 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* More by this developer */}
      {moreByDev.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              More by {app.author_name as string}
            </h2>
            <Link
              href={`/profile/${app.username}`}
              className="text-sm text-accent-light hover:text-accent-light/80 transition-colors"
            >
              See all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {moreByDev.map((other) => (
              <Link
                key={other.id as number}
                href={`/apps/${other.slug}`}
                className="bg-surface border border-border rounded-xl p-4 hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-light border border-border overflow-hidden mb-3">
                  {other.image_url ? (
                    <img
                      src={other.image_url as string}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-accent-light bg-gradient-to-br from-accent/20 to-accent/5">
                      {(other.name as string)[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-sm group-hover:text-accent-light transition-colors truncate">
                  {other.name as string}
                </h3>
                <p className="text-xs text-foreground/50 mt-1 line-clamp-1">
                  {other.tagline as string}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Developer card */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold mb-4">Developer</h2>
        <Link
          href={`/profile/${app.username}`}
          className="flex items-center gap-4 bg-surface border border-border rounded-2xl p-5 hover:border-accent/50 transition-colors group"
        >
          {app.avatar_url ? (
            <img
              src={app.avatar_url as string}
              alt=""
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-surface-light flex items-center justify-center text-xl font-bold text-accent-light">
              {(app.author_name as string)[0]?.toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold group-hover:text-accent-light transition-colors">
              {app.author_name as string}
            </p>
            <p className="text-sm text-foreground/40">
              @{app.username as string}
            </p>
          </div>
          <svg
            className="w-5 h-5 text-foreground/30 group-hover:text-accent-light transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </section>
    </div>
  );
}
