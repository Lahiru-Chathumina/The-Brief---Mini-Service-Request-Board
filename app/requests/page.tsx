"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, MapPin, ArrowRight } from "lucide-react";
import { getRequests, type JobRequest, type Category, type JobStatus, CATEGORIES, STATUS_OPTIONS } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { CategoryBadge } from "@/components/category-badge";

function RequestsContent() {
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState<JobRequest[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">(
    (searchParams.get("category") as Category) || "All"
  );
  const [statusFilter, setStatusFilter] = useState<JobStatus | "All">("All");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  const filtered = useMemo(() => {
    return requests
      .filter((r) => {
        if (categoryFilter !== "All" && r.category !== categoryFilter) return false;
        if (statusFilter !== "All" && r.status !== statusFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            r.location.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [requests, categoryFilter, statusFilter, search]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Service Requests
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {filtered.length} request{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Link
          href="/post-request"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          Post a Request
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, description, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-4 rounded-lg border bg-white p-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as Category | "All")}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium text-gray-500">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as JobStatus | "All")}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setCategoryFilter("All");
                setStatusFilter("All");
                setSearch("");
              }}
              className="mt-auto text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-7 w-7 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No requests found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filters, or post a new request.
          </p>
          <Link
            href="/post-request"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Post a Request
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((request) => (
            <Link
              key={request.id}
              href={`/requests/${request.id}`}
              className="group flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {request.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {request.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <CategoryBadge category={request.category} />
                <StatusBadge status={request.status} />
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin className="h-3.5 w-3.5" />
                {request.location}
              </div>
              <div className="mt-auto pt-4">
                <span className="inline-flex items-center text-sm font-medium text-emerald-600 transition-colors group-hover:text-emerald-700">
                  View Details
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RequestsPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-10 w-full rounded-lg bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map(i => <div key={i} className="h-48 rounded-xl bg-gray-200" />)}
          </div>
        </div>
      </div>
    }>
      <RequestsContent />
    </Suspense>
  );
}
