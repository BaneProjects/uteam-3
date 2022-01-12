import { createContext, useState, useContext } from "react";
import { login, register } from "../services/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const registerFunction = async (name, email, pass) => {
    try {
      await register(name, email, pass);
    } catch (error) {
      console.error(error);
    }
  };

  const loginFunction = async (email, pass) => {
    try {
      const authUser = await login(email, pass);
      if (authUser) {
        setUser(authUser);
        console.log("successful login");
        navigate("/profile");
      } else {
        console.log("failed login");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  const logoutFunction = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginFunction, logoutFunction, registerFunction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuthContext };
