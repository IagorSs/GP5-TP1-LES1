import api from "../config/axios";
import { Pizza } from "../models/products";

export const getAllPizzas = async () => {
  const { data } = await api.get(`stock/pizza`);
  return data.map((pizza) => new Pizza(pizza));
};
