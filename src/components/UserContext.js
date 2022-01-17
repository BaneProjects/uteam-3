import { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import createAxios from '../services/http';

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    createAxios
      .get('http://localhost:1337/api/users/me')
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        setUser(null);
        navigate('/');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const registerFunction = async (payload) => {
    try {
      let authUser = await register(payload);
      if (authUser.data.user) {
        console.log('token', authUser.data.jwt);
        setUser(authUser.data);
        localStorage.setItem('token', authUser.data.jwt);
        navigate('/my-profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginFunction = async (payload) => {
    try {
      const authUser = await login(payload);
      console.log(payload);
      if (authUser) {
        localStorage.setItem('token', authUser.data.jwt);
        setUser(authUser);

        navigate('/my-profile');
      } else {
        console.log('failed login');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  const logoutFunction = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loginFunction, logoutFunction, registerFunction }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuthContext };
