import api from "../config/api";

export const getAllCombos = async () => {
  const { data } = await api.get(`/stock/combo`);
  return data.map((combo) => combo);
};
