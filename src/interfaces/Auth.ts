import { User } from "./User";

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  authToken: string;
  user: User;
}
