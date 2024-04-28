export interface Reservation {
  id: number;
  pin: number;
  status: "pending" | "available" | "rejected" | "completed";
  reason: string;
  managerComment?: string | null;
  createdAt: string;
  updatedAt?: string;
  requestUserId?: string;
  managerUserId?: string | null;
  createdUserId?: string;
  updatedUserId?: string | null;
}

export interface ReseravtionPayload {
  reason: string;
  products: {
    productId: number;
    amount: number;
  }[];
}

export interface ReservationDetailsResponse {
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
  products: {
    id: number;
    name: string;
    description: string;
    reservation: {
      amount: number;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}
