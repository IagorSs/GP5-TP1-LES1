import wait from '../tmp/wait';
import api from '../config/axios';

export const register = (body) => api.post('/user/new', body);

export const login = async () => {
  // TODO
  await wait(1500);

  return "jwt_token";
}

export const logout = () => {
  // TODO
}
