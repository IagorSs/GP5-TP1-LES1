import axios from "axios";

// const zipcode = axios.create({
//   baseURL: "https://viacep.com.br/ws/",
// });

const zipcode = async (cep) => {
  return axios.get("https://viacep.com.br/ws/" + cep + "/json");
};

// const zipcode = async (cep) => {
//   try {
//     await axios.get("https://viacep.com.br/ws/" + cep + "/json");
//     // console.log(resp.data);
//   } catch (err) {
//     // Handle Error Here
//     console.error(err);
//   }
// };

export default zipcode;

// const axios = require("axios");

// const zipcode = async (complement) => {
//   try {
//     await axios.get("https://viacep.com.br/ws/" + complement + "/json");
//     // console.log(resp.data);
//   } catch (err) {
//     // Handle Error Here
//     console.error(err);
//   }
// };

// zipcode();
