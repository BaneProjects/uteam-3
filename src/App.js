import React, { useContext } from 'react';
import Login from './components/Login';
import { Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Nav from './components/Nav';
import Profile from './components/Profile/Profile';
import { ChakraProvider } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { AuthContext } from './components/UserContext';
function App() {
  const { userData } = useContext(AuthContext);
  console.log('test', userData.user);
  return (
    <ChakraProvider>
      <Box backgroundColor="gray.200" idth="100wh" minH="100vh">
        <Nav />
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
export default App;
