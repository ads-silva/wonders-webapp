import api from "../helpers/api";
import {
  ReseravtionPayload,
  Reservation,
  ReservationDetailsResponse,
} from "../interfaces/Reservation";

export const apiGetReservations = async () => {
  return api.get<Reservation[]>("/reservation");
};

export const apiSaveReservation = async (payload: ReseravtionPayload) => {
  return api.post<Reservation>("/reservation", payload);
};

export const apiGetReservationById = async (id: string) => {
  return api.get<ReservationDetailsResponse>(`/reservation/${id}`);
};
