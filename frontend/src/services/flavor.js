import api from "../config/axios";

export const getAllFlavors = async () => {
  const { data } = await api.get(`/stock/pizza/flavor`);
  return data.map((pizzaFlavor) => pizzaFlavor);
};
