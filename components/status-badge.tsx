"use client";

import { cn } from "@/lib/utils";
import type { JobStatus } from "@/lib/data";

const statusStyles: Record<JobStatus, string> = {
  Open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Closed: "bg-gray-100 text-gray-500 border-gray-200",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        statusStyles[status]
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "Open" && "bg-emerald-500",
          status === "In Progress" && "bg-amber-500",
          status === "Closed" && "bg-gray-400"
        )}
      />
      {status}
    </span>
  );
}
