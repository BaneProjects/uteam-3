import { createContext, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  let [user, setUser] = useState(null);
  const userData = useMemo(() => ({ user }), [user]);
  const login = (email, pass) => {
    axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: pass
      })
      .then((response) => {
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        setUser({ email: email, pass: pass });
        navigate('/profile');
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
        setUser(null);
        navigate('/');
      });
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ userData, login, logout }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
