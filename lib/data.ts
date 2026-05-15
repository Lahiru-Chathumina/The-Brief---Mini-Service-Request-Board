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

const STORAGE_KEY = "home-service-requests";

export function getRequests(): JobRequest[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  return JSON.parse(raw);
}

export function saveRequests(requests: JobRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function getRequestById(id: string): JobRequest | undefined {
  return getRequests().find((r) => r.id === id);
}

export function addRequest(request: Omit<JobRequest, "id" | "status" | "createdAt">): JobRequest {
  const newRequest: JobRequest = {
    ...request,
    id: crypto.randomUUID(),
    status: "Open",
    createdAt: new Date().toISOString(),
  };
  const requests = getRequests();
  requests.unshift(newRequest);
  saveRequests(requests);
  return newRequest;
}

export function updateRequestStatus(id: string, status: JobStatus): JobRequest | undefined {
  const requests = getRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return undefined;
  requests[index].status = status;
  saveRequests(requests);
  return requests[index];
}

function seedData(): JobRequest[] {
  const now = Date.now();
  return [
    {
      id: "seed-1",
      title: "Leaking Kitchen Faucet",
      description: "The kitchen faucet has been dripping steadily for a week. Need a plumber to replace the washer or the entire fixture if necessary. The sink area is accessible and the shutoff valve works.",
      category: "Plumbing",
      location: "Bristol, BS1",
      contactName: "Sarah Mitchell",
      contactEmail: "sarah.mitchell@email.com",
      status: "Open",
      createdAt: new Date(now - 86400000).toISOString(),
    },
    {
      id: "seed-2",
      title: "Rewire Living Room Outlets",
      description: "Two outlets in the living room are not working properly. One sparks when plugging in devices. Need a qualified electrician to inspect and rewire as needed. House built in 1965, original wiring suspected.",
      category: "Electrical",
      location: "Manchester, M14",
      contactName: "James Holden",
      contactEmail: "j.holden@email.com",
      status: "In Progress",
      createdAt: new Date(now - 172800000).toISOString(),
    },
    {
      id: "seed-3",
      title: "Exterior Fence Painting",
      description: "Back garden fence needs a fresh coat of weatherproof stain. Approximately 15 metres of fencing, currently untreated wood. Would like it done before the rainy season starts.",
      category: "Painting",
      location: "Edinburgh, EH6",
      contactName: "Fiona Clarke",
      contactEmail: "fiona.c@email.com",
      status: "Open",
      createdAt: new Date(now - 259200000).toISOString(),
    },
    {
      id: "seed-4",
      title: "Custom Bookshelf Installation",
      description: "Looking for a joiner to build and install a floor-to-ceiling bookshelf along one wall of the study. Approx 3m wide by 2.4m tall. Oak veneer preferred. Must include adjustable shelving.",
      category: "Joinery",
      location: "Bath, BA1",
      contactName: "David Chen",
      contactEmail: "david.chen@email.com",
      status: "Closed",
      createdAt: new Date(now - 432000000).toISOString(),
    },
    {
      id: "seed-5",
      title: "Bathroom Tile Regrouting",
      description: "The grout in the bathroom shower area is cracking and mouldy in places. Need someone to remove old grout and regrout the entire shower enclosure. Tiles are standard ceramic, approx 4 sq metres.",
      category: "Plumbing",
      location: "Leeds, LS2",
      contactName: "Rachel Adams",
      contactEmail: "rachel.a@email.com",
      status: "Open",
      createdAt: new Date(now - 345600000).toISOString(),
    },
    {
      id: "seed-6",
      title: "Replace Fuse Box with Consumer Unit",
      description: "Old-style fuse box needs replacing with a modern consumer unit with RCD protection. 3-bedroom semi-detached house. Must be Part P certified electrician.",
      category: "Electrical",
      location: "Cardiff, CF11",
      contactName: "Owen Price",
      contactEmail: "owen.price@email.com",
      status: "Open",
      createdAt: new Date(now - 518400000).toISOString(),
    },
  ];
}
