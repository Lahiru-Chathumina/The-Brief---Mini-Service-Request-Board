import { fetchRequests, fetchRequestById, createRequest, updateRequestStatus as apiUpdateRequestStatus } from "./api";

export type JobStatus = "Open" | "In Progress" | "Closed";

export type Category = "Plumbing" | "Electrical" | "Painting" | "Joinery";

export interface JobRequest {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  contactName: string;
  contactEmail: string;
  status: JobStatus;
  createdAt: string;
}

export const CATEGORIES: Category[] = ["Plumbing", "Electrical", "Painting", "Joinery"];

export const STATUS_OPTIONS: JobStatus[] = ["Open", "In Progress", "Closed"];

export async function getRequests(): Promise<JobRequest[]> {
  return await fetchRequests();
}

export async function getRequestById(id: string): Promise<JobRequest | null> {
  return await fetchRequestById(id);
}

export async function addRequest(request: Omit<JobRequest, "id" | "status" | "createdAt">): Promise<JobRequest | null> {
  return await createRequest(request);
}

export async function updateRequestStatus(id: string, status: JobStatus): Promise<JobRequest | null> {
  return await apiUpdateRequestStatus(id, status);
}
