import api from "../helpers/api";

export const apiGetReservations = async () => {
  return api.get<Reservation[]>("/reservation");
};
