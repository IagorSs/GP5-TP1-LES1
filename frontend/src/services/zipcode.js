import axios from "axios";

const zipcode = async (cep) => {
  return axios.get("https://viacep.com.br/ws/" + cep + "/json");
};

export default zipcode;
