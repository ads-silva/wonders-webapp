import api from "../utils/api";
import { AuthPayload, AuthResponse } from "../interfaces/Auth";
import { User } from "../interfaces/User";

export const apiAuth = async (LoginPayload: AuthPayload) => {
  return api.post<AuthResponse>("/auth", LoginPayload);
};

export const apiLoadMe = async () => {
  return api.get<User>("/me");
};
