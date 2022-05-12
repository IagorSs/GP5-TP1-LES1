import api, { setApiToken, removeApiToken } from "../config/api";
import jwt_decode from "jwt-decode";

export const register = (body) => api.post("/user/new", body);

export const setUserToken = (jwtToken, setUser) => {
  setApiToken(jwtToken);

  setUser(jwt_decode(jwtToken));

  window.localStorage.setItem("@pizzaria-pizzada/user-token", jwtToken);
};

export const login = async (body, setUser) => {
  const {
    data: { token },
  } = await api.post("/user/login", body);

  setUserToken(token, setUser);
};

export const logout = (setUser) => {
  removeApiToken();

  setUser(null);

  window.localStorage.removeItem("@pizzaria-pizzada/user-token");
};

export const address = () => api.get("/user/address");

export const registerOrder = async (body) => api.post(`user/order/new`, body);

export const getOrders = () => api.get(`user/history`);
