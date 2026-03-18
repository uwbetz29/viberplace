"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SubmitForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
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

    const res = await fetch("/api/apps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "Something went wrong");
      setSubmitting(false);
      return;
    }

    const { slug } = await res.json();
    router.push(`/apps/${slug}`);
  }

  const inputClass =
    "w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent-light transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">App Name *</label>
        <input
          name="name"
          required
          placeholder="My Cool App"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tagline *</label>
        <input
          name="tagline"
          required
          placeholder="A one-liner that describes your app"
          maxLength={255}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          rows={4}
          placeholder="Tell people what your app does, how it works, why you built it..."
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">App URL *</label>
        <input
          name="url"
          type="url"
          required
          placeholder="https://myapp.vercel.app"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">GitHub URL</label>
        <input
          name="github_url"
          type="url"
          placeholder="https://github.com/you/your-app"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Screenshot URL
        </label>
        <input
          name="image_url"
          type="url"
          placeholder="https://example.com/screenshot.png"
          className={inputClass}
        />
        <p className="text-xs text-foreground/40 mt-1">
          Direct link to a screenshot or preview image
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tags</label>
        <input
          name="tags"
          placeholder="productivity, ai, tool"
          className={inputClass}
        />
        <p className="text-xs text-foreground/40 mt-1">Comma-separated</p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent hover:bg-accent/80 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        {submitting ? "Submitting..." : "Submit App"}
      </button>
    </form>
  );
}
