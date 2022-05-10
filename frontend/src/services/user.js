import api from '../config/api';

export const register = (body) => api.post('/user/new', body);

export const login = async (body) => {
  const { data: { token: jwtToken } } = await api.post('/user/login', body);

  console.log({jwtToken})
  // TODO put jwtToken to api req

  // TODO decoded jwt
  const user = {};

  // TODO return to put in React context
  return user;
}

export const logout = () => {
  // TODO
}
