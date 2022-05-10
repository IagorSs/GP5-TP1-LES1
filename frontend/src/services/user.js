import api, { setApiToken, removeApiToken } from '../config/api';
import jwt_decode from "jwt-decode";

export const register = (body) => api.post('/user/new', body);

export const login = async (body, setUser) => {
  const { data: { token: jwtToken } } = await api.post('/user/login', body);

  setApiToken(jwtToken);

  setUser(jwt_decode(jwtToken));
}

export const logout = (setUser) => {
  removeApiToken();
  
  setUser(null);
}
