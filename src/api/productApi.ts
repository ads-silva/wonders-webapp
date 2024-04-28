import api from "../helpers/api";

export const apiLoadProducts = async () => {
  return api.get<Product[]>("/product");
};
