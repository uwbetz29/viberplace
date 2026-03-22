"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AppItem = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  url: string;
  image_url: string | null;
  tags: string[];
  status: string;
  created_at: string;
  updated_at: string;
};

function EditModal({
  app,
  onClose,
  onSaved,
}: {
  app: AppItem;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      tagline: form.get("tagline") as string,
      description: form.get("description") as string,
      url: form.get("url") as string,
      github_url: form.get("github_url") as string,
      image_url: form.get("image_url") as string,
      tags: (form.get("tags") as string)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const res = await fetch(`/api/apps/${app.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "Failed to save");
      setSaving(false);
      return;
    }

    onSaved();
  }

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent-light transition-colors text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold">Edit App</h2>
          <button onClick={onClose} className="text-foreground/40 hover:text-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">App Name</label>
            <input name="name" defaultValue={app.name} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Tagline</label>
            <input name="tagline" defaultValue={app.tagline} required maxLength={255} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea name="description" rows={3} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">App URL</label>
            <input name="url" type="url" defaultValue={app.url} required className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">GitHub URL</label>
            <input name="github_url" type="url" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Screenshot URL</label>
            <input name="image_url" type="url" defaultValue={app.image_url || ""} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Tags</label>
            <input name="tags" defaultValue={app.tags.join(", ")} className={inputClass} />
            <p className="text-xs text-foreground/40 mt-1">Comma-separated</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-accent hover:bg-accent/80 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-border hover:border-foreground/30 rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function DashboardAppList({ apps: initialApps }: { apps: AppItem[] }) {
  const router = useRouter();
  const [apps, setApps] = useState(initialApps);
  const [editingApp, setEditingApp] = useState<AppItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState<number | null>(null);

  async function toggleStatus(app: AppItem) {
    setLoading(app.id);
    const newStatus = app.status === "published" ? "unlisted" : "published";

    const res = await fetch(`/api/apps/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setApps((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
      );
    }
    setLoading(null);
  }

  async function deleteApp(id: number) {
    setLoading(id);
    const res = await fetch(`/api/apps/${id}`, { method: "DELETE" });

    if (res.ok) {
      setApps((prev) => prev.filter((a) => a.id !== id));
    }
    setConfirmDelete(null);
    setLoading(null);
  }

  return (
    <>
      <div className="space-y-3">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-surface border border-border rounded-xl p-5 hover:border-border/80 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* App icon placeholder */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                {app.image_url ? (
                  <img
                    src={app.image_url}
                    alt=""
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  <svg className="w-6 h-6 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                  </svg>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/apps/${app.slug}`}
                    className="font-semibold hover:text-accent-light transition-colors truncate"
                  >
                    {app.name}
                  </Link>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                      app.status === "published"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {app.status === "published" ? "Published" : "Unlisted"}
                  </span>
                </div>
                <p className="text-sm text-foreground/50 truncate">{app.tagline}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-foreground/30">
                  <span>
                    Created{" "}
                    {new Date(app.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {app.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      {app.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="bg-surface-light px-1.5 py-0.5 rounded text-foreground/40"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditingApp(app)}
                  className="p-2 border border-border rounded-lg hover:border-foreground/30 transition-colors"
                  title="Edit"
                >
                  <svg className="w-4 h-4 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button
                  onClick={() => toggleStatus(app)}
                  disabled={loading === app.id}
                  className="p-2 border border-border rounded-lg hover:border-foreground/30 transition-colors disabled:opacity-50"
                  title={app.status === "published" ? "Unpublish" : "Publish"}
                >
                  {app.status === "published" ? (
                    <svg className="w-4 h-4 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>

                {confirmDelete === app.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteApp(app.id)}
                      disabled={loading === app.id}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                    >
                      {loading === app.id ? "..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-3 py-1.5 border border-border rounded-lg text-xs transition-colors hover:border-foreground/30"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(app.id)}
                    className="p-2 border border-border rounded-lg hover:border-red-500/50 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingApp && (
        <EditModal
          app={editingApp}
          onClose={() => setEditingApp(null)}
          onSaved={() => {
            setEditingApp(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
