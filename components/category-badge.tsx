"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/data";

const categoryStyles: Record<Category, string> = {
  Plumbing: "bg-sky-50 text-sky-700 border-sky-200",
  Electrical: "bg-amber-50 text-amber-700 border-amber-200",
  Painting: "bg-rose-50 text-rose-700 border-rose-200",
  Joinery: "bg-orange-50 text-orange-700 border-orange-200",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        categoryStyles[category]
      )}
    >
      {category}
    </span>
  );
}
