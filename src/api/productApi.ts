import api from "../helpers/api";
import { Product } from "../interfaces/Product";

export const apiLoadProducts = async () => {
  return api.get<Product[]>("/product");
};
