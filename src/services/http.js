import axios from 'axios';
import jwtDecode from 'jwt-decode';

const baseURL = 'http://localhost:1337';
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

createAxios.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  console.log('intercepted!', req);
  // Throws an error for bad token
  try {
    console.log(jwtDecode(token));
  } catch (error) {
    console.log("token doesn't work: ", error);
  }
  if (token) {
    console.log('token:', token);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default createAxios;
