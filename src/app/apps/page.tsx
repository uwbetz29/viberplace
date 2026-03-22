import { getDb } from "@/lib/db";
import { AppCard } from "@/components/app-card";
import { CategoryTabs } from "@/components/category-tabs";
import Link from "next/link";

export default async function BrowseApps({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const sql = getDb();

  // Get all published apps
  const apps = category
    ? await sql`
        SELECT a.*, u.username, u.avatar_url
        FROM apps a
        JOIN users u ON a.user_id = u.id
        WHERE a.status = 'published' AND ${category} = ANY(a.tags)
        ORDER BY a.created_at DESC
      `
    : await sql`
        SELECT a.*, u.username, u.avatar_url
        FROM apps a
        JOIN users u ON a.user_id = u.id
        WHERE a.status = 'published'
        ORDER BY a.created_at DESC
      `;

  // Get the newest app for the featured section
  const featured = apps.length > 0 ? apps[0] : null;
  const remainingApps = apps.length > 1 ? apps.slice(1) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {category ? (
            <>
              <span className="text-foreground/40">Apps /</span>{" "}
              <span className="capitalize">{category}</span>
            </>
          ) : (
            "Discover Apps"
          )}
        </h1>
        <p className="text-foreground/50 mt-1">
          Apps built by vibe coders — try them live, right here
        </p>
      </div>

      {/* Category tabs */}
      <div className="mb-8">
        <CategoryTabs activeCategory={category || "all"} />
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-xl font-medium mb-2">No apps yet</p>
          <p className="text-foreground/50 mb-6">
            {category
              ? `No apps in the "${category}" category yet.`
              : "Be the first to submit one!"}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/get-started"
              className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Get Started
            </Link>
            {category && (
              <Link
                href="/apps"
                className="border border-border hover:border-foreground/30 text-foreground px-6 py-3 rounded-xl font-medium transition-colors"
              >
                View All Apps
              </Link>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Featured app - App of the Day style */}
          {featured && !category && (
            <Link
              href={`/apps/${featured.slug}`}
              className="block mb-10 group"
            >
              <div className="relative rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all hover:shadow-[0_0_40px_rgba(124,58,237,0.1)]">
                {/* Featured image */}
                <div className="aspect-[21/9] bg-gradient-to-br from-accent/20 via-surface to-surface-light relative overflow-hidden">
                  {featured.image_url ? (
                    <img
                      src={featured.image_url as string}
                      alt={featured.name as string}
                      className="w-full h-full object-cover opacity-60"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent" />
                  )}

                  {/* Overlay content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
                    <div className="text-xs font-bold text-accent-light uppercase tracking-widest mb-2">
                      Latest on Viberplace
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                      {featured.name as string}
                    </h2>
                    <p className="text-white/70 text-sm md:text-base max-w-lg">
                      {featured.tagline as string}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-xs font-bold text-white bg-accent px-4 py-1.5 rounded-full group-hover:bg-accent/80 transition-colors">
                        TRY IT
                      </span>
                      <div className="flex items-center gap-2">
                        {featured.avatar_url && (
                          <img
                            src={featured.avatar_url as string}
                            alt=""
                            className="w-5 h-5 rounded-full"
                          />
                        )}
                        <span className="text-xs text-white/50">
                          by @{featured.username as string}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* App grid */}
          <div>
            {!category && remainingApps.length > 0 && (
              <h2 className="text-lg font-semibold mb-4">All Apps</h2>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(category ? apps : remainingApps).map((app) => (
                <AppCard
                  key={app.id as number}
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
          </div>
        </>
      )}
    </div>
  );
}
