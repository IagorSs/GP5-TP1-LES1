import api from "../config/api";

export const registerOrder = (body) => api.post(`order/new`, body);
