import React from "react";
import { useUserContext } from "../context/userContext";

const Home = () => {
  const { user } = useUserContext();

  return (
    <div className="ui container center">
     <h3>You are now logged in as , {user.name}</h3>
    </div>
  );
};

export default Home;
