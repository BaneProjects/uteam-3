import axios from 'axios';

const baseURL = 'https://uteam-api-7nngy.ondigitalocean.app';
// const baseURL = 'http://localhost:1337';
// const baseURL = process.env.REACT_APP_API_URL;
const createAxios = axios.create(
  {
    baseURL
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export default createAxios;
