"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  "All Apps",
  "Productivity",
  "AI & ML",
  "Tools",
  "Games",
  "Finance",
  "Health",
  "Education",
  "Social",
  "Utilities",
  "Fun",
];

function getCategoryId(label: string) {
  if (label === "All Apps") return "all";
  if (label === "AI & ML") return "ai";
  return label.toLowerCase();
}

export function CategoryTabs({ activeCategory }: { activeCategory: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    router.push(`/apps${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      {CATEGORIES.map((label) => {
        const id = getCategoryId(label);
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
              activeCategory === id
                ? "bg-accent text-white shadow-md"
                : "bg-surface border border-border text-foreground/60 hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
