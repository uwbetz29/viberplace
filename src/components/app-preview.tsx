"use client";

import { useState } from "react";

type DeviceSize = "desktop" | "tablet" | "phone";

const DEVICE_SIZES: Record<DeviceSize, { width: string; label: string; icon: React.ReactNode }> = {
  desktop: {
    width: "100%",
    label: "Desktop",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  tablet: {
    width: "768px",
    label: "Tablet",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25V4.5a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  phone: {
    width: "375px",
    label: "Phone",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
};

export function AppPreview({ url, appName }: { url: string; appName: string }) {
  const [device, setDevice] = useState<DeviceSize>("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-surface">
      {/* Browser chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-light border-b border-border">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* URL bar */}
          <div className="hidden sm:flex items-center gap-2 bg-background/50 rounded-lg px-3 py-1.5 text-xs text-foreground/40 min-w-[200px] max-w-[400px]">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="truncate">{url}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Device toggles */}
          <div className="flex items-center bg-background/50 rounded-lg p-0.5">
            {(Object.keys(DEVICE_SIZES) as DeviceSize[]).map((size) => (
              <button
                key={size}
                onClick={() => setDevice(size)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  device === size
                    ? "bg-accent text-white shadow-sm"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
                title={DEVICE_SIZES[size].label}
              >
                {DEVICE_SIZES[size].icon}
                <span className="hidden md:inline">{DEVICE_SIZES[size].label}</span>
              </button>
            ))}
          </div>

          {/* Open in new tab */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent hover:bg-accent/80 text-white text-xs font-medium transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span className="hidden sm:inline">Open App</span>
          </a>
        </div>
      </div>

      {/* Preview frame */}
      <div
        className="bg-white flex justify-center transition-all duration-300"
        style={{ minHeight: device === "phone" ? "667px" : "500px" }}
      >
        <div
          className="w-full transition-all duration-300 relative"
          style={{
            maxWidth: DEVICE_SIZES[device].width,
            height: device === "phone" ? "667px" : "500px",
          }}
        >
          {/* Loading state */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-3 z-10">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
              <p className="text-sm text-foreground/50">Loading {appName}...</p>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-4 z-10">
              <div className="w-16 h-16 rounded-2xl bg-surface-light flex items-center justify-center text-3xl">
                🔒
              </div>
              <div className="text-center">
                <p className="font-medium mb-1">Preview unavailable</p>
                <p className="text-sm text-foreground/50 max-w-xs">
                  This app doesn&apos;t allow embedding. Click below to open it directly.
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent/80 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Open {appName} →
              </a>
            </div>
          )}

          <iframe
            src={url}
            title={`Preview of ${appName}`}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Mini preview for app cards - shows on hover
export function MiniPreview({ url, appName }: { url: string; appName: string }) {
  const [showPreview, setShowPreview] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="relative aspect-video bg-surface-light overflow-hidden"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Static placeholder / screenshot area */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showPreview && !hasError ? "opacity-0" : "opacity-100"}`}>
        <div className="text-foreground/20 text-4xl font-bold">
          {appName[0]?.toUpperCase()}
        </div>
      </div>

      {/* Live preview iframe - only loads on hover */}
      {showPreview && !hasError && (
        <div className="absolute inset-0">
          <iframe
            src={url}
            title={`Preview of ${appName}`}
            className="w-full h-full border-0 pointer-events-none"
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
            style={{ transform: "scale(0.5)", transformOrigin: "top left", width: "200%", height: "200%" }}
            onError={() => setHasError(true)}
          />
          {/* Hover overlay label */}
          <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live preview
          </div>
        </div>
      )}
    </div>
  );
}
