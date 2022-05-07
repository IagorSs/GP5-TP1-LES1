import api from "../config/axios";

export const getAllCombos = async () => {
  const { data } = await api.get(`/stock/combo`);
  return data.map((combo) => combo);
};
