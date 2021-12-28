import React from "react";
import Login from "./Login";
import Home from "./Home";
import { useUserContext } from "../context/userContext";

const Auth = () => {
  const { user } = useUserContext();
  return <>{user.isGuestUser ? <Login /> : <Home />}</>;
};

export default Auth;