import api from "../config/api";

export const getAllFlavors = async () => {
  const { data } = await api.get(`/stock/pizza/flavor`);
  return data.map((pizzaFlavor) => pizzaFlavor);
};
