import api from "../config/api";

export const getAllFlavors = () => api.get(`/stock/pizza/flavor`);
