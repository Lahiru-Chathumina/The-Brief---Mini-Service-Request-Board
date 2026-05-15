import type { JobRequest, JobStatus } from "./data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchRequests(): Promise<JobRequest[]> {
  try {
    const response = await fetch(`${API_URL}/api/requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch requests");
    return await response.json();
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
}

export async function fetchRequestById(id: string): Promise<JobRequest | null> {
  try {
    const response = await fetch(`${API_URL}/api/requests/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch request");
    return await response.json();
  } catch (error) {
    console.error("Error fetching request:", error);
    return null;
  }
}

export async function createRequest(
  request: Omit<JobRequest, "id" | "status" | "createdAt">
): Promise<JobRequest | null> {
  try {
    const response = await fetch(`${API_URL}/api/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error("Failed to create request");
    return await response.json();
  } catch (error) {
    console.error("Error creating request:", error);
    return null;
  }
}

export async function updateRequestStatus(
  id: string,
  status: JobStatus
): Promise<JobRequest | null> {
  try {
    const response = await fetch(`${API_URL}/api/requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error("Failed to update request");
    return await response.json();
  } catch (error) {
    console.error("Error updating request:", error);
    return null;
  }
}
