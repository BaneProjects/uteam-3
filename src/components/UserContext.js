import { createContext, useState, useMemo } from 'react';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  console.log(user);
  const login = (email, pass) => {
    setUser({ email: email, pass: pass });
  };
  const logout = (logout) => {
    setUser(logout);
  };
  return <AuthContext.Provider value={{ login, logout, providerValue }}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
