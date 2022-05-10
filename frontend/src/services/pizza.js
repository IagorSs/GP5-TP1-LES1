import api from "../config/api";
import { Pizza } from "../models/products";

export const getAllPizzas = async () => {
  const { data } = await api.get(`stock/pizza`);
  return data.map((pizza) => new Pizza(pizza));
};
