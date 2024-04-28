interface Reservation {
  id: number;
  pin: number;
  status: "pending" | "available" | "rejected" | "completed";
  reason: string;
  managerComment: string | null;
  createdAt: string;
  updatedAt: string;
  requestUserId: string;
  managerUserId: string | null;
  createdUserId: string;
  updatedUserId: string | null;
}
