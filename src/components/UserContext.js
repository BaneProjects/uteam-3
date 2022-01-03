import { createContext, useState, useMemo } from 'react';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const userData = useMemo(() => ({ user }), [user]);

  // console.log(user);
  const login = (email, pass) => {
    setUser({ email: email, pass: pass });
  };
  const logout = () => {
    setUser(null);
  };
  return <AuthContext.Provider value={{ login, logout, userData }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
