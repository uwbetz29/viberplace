"use client";

import Link from "next/link";
import { useState } from "react";

interface AppCardProps {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  url: string;
  image_url: string | null;
  tags: string[];
  username: string;
  avatar_url: string | null;
}

export function AppCard({
  slug,
  name,
  tagline,
  url,
  image_url,
  tags,
  username,
  avatar_url,
}: AppCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <Link
      href={`/apps/${slug}`}
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIframeLoaded(false);
      }}
    >
      {/* Preview area */}
      <div className="relative aspect-video bg-surface-light overflow-hidden">
        {/* Static image or letter */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isHovered && iframeLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          {image_url ? (
            <img
              src={image_url}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-surface-light">
              <span className="text-5xl font-bold text-accent-light/30">
                {name[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Live preview on hover */}
        {isHovered && (
          <div className="absolute inset-0">
            <iframe
              src={url}
              title={`Preview of ${name}`}
              className="border-0 pointer-events-none"
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
              style={{
                transform: "scale(0.5)",
                transformOrigin: "top left",
                width: "200%",
                height: "200%",
              }}
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        )}

        {/* Live indicator */}
        {isHovered && iframeLoaded && (
          <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        )}

        {/* Hover overlay with CTA */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-3 transition-opacity duration-300 ${
            isHovered && !iframeLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white text-xs font-medium bg-accent/80 px-3 py-1 rounded-full">
            Loading preview...
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Mini app icon */}
          <div className="w-10 h-10 rounded-xl bg-surface-light border border-border overflow-hidden shrink-0">
            {image_url ? (
              <img
                src={image_url}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-bold text-accent-light bg-gradient-to-br from-accent/20 to-accent/5">
                {name[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold group-hover:text-accent-light transition-colors truncate">
              {name}
            </h3>
            <p className="text-sm text-foreground/50 line-clamp-1">{tagline}</p>
          </div>

          {/* "GET" style button */}
          <div className="shrink-0">
            <span className="text-xs font-bold text-accent-light bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all">
              TRY
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            {avatar_url && (
              <img src={avatar_url} alt="" className="w-4 h-4 rounded-full" />
            )}
            <span className="text-xs text-foreground/40">@{username}</span>
          </div>
          {tags.length > 0 && (
            <div className="flex gap-1.5">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-surface-light text-foreground/40 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
