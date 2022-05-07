import axios from "axios";

const zipcode = async (cep) => {
  return axios.get("https://cep.awesomeapi.com.br/json/" + cep);
};

export default zipcode;
