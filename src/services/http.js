import axios from "axios";

const baseURL = "http://localhost:1337";
const createAxios = axios.create(
  {
    baseURL,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

export default createAxios;
