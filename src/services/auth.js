import createAxios from './http';
import jwtDecode from 'jwt-decode';

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

export const login = async ({ email, password }) => {
  try {
    const response = await createAxios.post('/api/auth/local', {
      identifier: email,
      password: password
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await createAxios.post('/api/auth/local/register', {
      username: name,
      email: email,
      password: password
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
