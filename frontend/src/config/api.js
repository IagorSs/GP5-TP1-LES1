import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

export const setApiToken = (token) => {
  axiosInstance.defaults.headers.token = token;
}

export const removeApiToken = () => {
  delete axiosInstance.defaults.headers.token;
}

export default axiosInstance;
