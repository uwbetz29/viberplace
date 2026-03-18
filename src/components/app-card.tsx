import Link from "next/link";

interface AppCardProps {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  image_url: string | null;
  tags: string[];
  username: string;
  avatar_url: string | null;
}

export function AppCard({
  slug,
  name,
  tagline,
  image_url,
  tags,
  username,
  avatar_url,
}: AppCardProps) {
  return (
    <Link
      href={`/apps/${slug}`}
      className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors"
    >
      <div className="aspect-video bg-surface-light flex items-center justify-center">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-foreground/20 text-4xl font-bold">
            {name[0]?.toUpperCase()}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold group-hover:text-accent-light transition-colors">
          {name}
        </h3>
        <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
          {tagline}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {avatar_url && (
              <img src={avatar_url} alt="" className="w-5 h-5 rounded-full" />
            )}
            <span className="text-xs text-foreground/40">{username}</span>
          </div>
          {tags.length > 0 && (
            <span className="text-xs bg-surface-light text-foreground/50 px-2 py-1 rounded">
              {tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
