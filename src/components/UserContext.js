import { createContext, useState, useContext } from 'react';
import { login, register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const registerFunction = async (name, email, pass) => {
    try {
      const authUser = await register(name, email, pass);
      if (authUser.data.user) {
        setUser(authUser.data);
        setIsLoggedIn(true);
        localStorage.setItem('User', JSON.stringify(authUser.data));
        navigate('/profile');
        console.log('successful login');
        console.log(authUser.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginFunction = async (email, pass) => {
    try {
      const authUser = await login(email, pass);
      if (authUser) {
        setIsLoggedIn(true);
        navigate('/profile');
        localStorage.setItem('User', JSON.stringify(authUser));
        console.log('successful login');
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
    setIsLoggedIn(false);
    console.log('logout');
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loginFunction, logoutFunction, registerFunction, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuthContext };
