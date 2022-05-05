import api from "../config/axios";
import { Drink } from "../models/products";

export const getAllDrinks = async () => {
  const { data } = await api.get(`stock/drink`);
  return data.map((drink) => new Drink(drink));
};
