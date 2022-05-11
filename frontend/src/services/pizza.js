import api from "../config/api";
import { Pizza } from "../models/products";

export const getAllPizzas = async () => {
  const { data } = await api.get(`stock/pizza`);
  return data.map((pizza) => new Pizza(pizza));
};

export const registerPizza = async (body) => {
  const { data } = await api.post(`stock/pizza/new`, body);
  // return data.map((pizza) => new Pizza(pizza));
};
