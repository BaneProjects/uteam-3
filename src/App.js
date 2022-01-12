import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { AuthContext } from "./components/UserContext";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile/Profile";
import PageNotFound from "./components/PageNotFound";

function App() {
  const { user } = useContext(AuthContext);
  console.log("test", user);
  return (
    <ChakraProvider>
      <Box backgroundColor="gray.200" width="100%" minH="100vh">
        <Nav />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:pageName" element={<PageNotFound />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
export default App;
