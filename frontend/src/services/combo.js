import api from "../config/api";
import { Combo } from '../models/products';

export const getAllCombos = async () => {
  const { data } = await api.get(`/stock/combo`);
  return data.map((combo) => new Combo(combo));
};
