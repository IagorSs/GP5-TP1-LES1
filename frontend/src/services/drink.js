import api from "../config/axios";
import { Drink } from "../models/products";

export const getDrinks = async () => {
  const { data } = await api.get(`stock/drink/all`);

  // TODO deve vir do backend somente o vetor
  const drinks = Object.values(data);

  return drinks.map((drink) => new Drink(drink));
};
