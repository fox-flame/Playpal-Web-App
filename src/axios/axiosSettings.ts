import axios from "axios";

const myAxios = axios.create({
  baseURL: "https://playpal.herokuapp.com", //backend url to hit base
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default myAxios;
