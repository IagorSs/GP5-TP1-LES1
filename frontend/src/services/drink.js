import api from "../config/api";
import { Drink } from "../models/products";

export const getAllDrinks = async () => {
  const { data } = await api.get(`stock/drink`);
  return data.map((drink) => new Drink(drink));
};

export const registerDrink = async (body) => {
  const { data } = await api.post(`stock/drink/new`, body);
  // return data.map((drink) => new Drink(drink));
};
