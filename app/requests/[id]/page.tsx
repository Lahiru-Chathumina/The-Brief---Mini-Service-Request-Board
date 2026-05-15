"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, User, Mail, Clock, CheckCircle2, XCircle } from "lucide-react";
import { getRequestById, updateRequestStatus, type JobRequest, type JobStatus } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { CategoryBadge } from "@/components/category-badge";

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<JobRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const fetchRequest = async () => {
      try {
        const found = await getRequestById(id);
        setRequest(found ?? null);
      } catch (error) {
        console.error("Error fetching request:", error);
        setRequest(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [params.id]);

  async function handleStatusUpdate(status: JobStatus) {
    if (!request) return;
    try {
      const updated = await updateRequestStatus(request.id, status);
      if (updated) {
        setRequest(updated);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-32 rounded-lg bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">Request not found</h2>
        <p className="mt-2 text-sm text-gray-500">
          This request may have been removed or the link is incorrect.
        </p>
        <Link
          href="/requests"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Requests
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(request.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/requests"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Requests
      </Link>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {request.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <CategoryBadge category={request.category} />
              <StatusBadge status={request.status} />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-700">
              {request.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-500">Location</p>
                <p className="mt-0.5 text-sm text-gray-700">{request.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-500">Posted</p>
                <p className="mt-0.5 text-sm text-gray-700">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
              <User className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-500">Contact Name</p>
                <p className="mt-0.5 text-sm text-gray-700">{request.contactName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-500">Contact Email</p>
                <p className="mt-0.5 text-sm text-gray-700">{request.contactEmail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Actions */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-sm font-medium text-gray-500">Update Status</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {request.status !== "In Progress" && request.status !== "Closed" && (
              <button
                onClick={() => handleStatusUpdate("In Progress")}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark as In Progress
              </button>
            )}
            {request.status !== "Closed" && (
              <button
                onClick={() => handleStatusUpdate("Closed")}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
              >
                <XCircle className="h-4 w-4" />
                Mark as Closed
              </button>
            )}
            {request.status === "Closed" && (
              <p className="text-sm text-gray-400">This request has been closed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
