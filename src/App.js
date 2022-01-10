import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { AuthContext } from './components/UserContext';
import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile/Profile';

function App() {
  const { userData } = useContext(AuthContext);
  console.log('test', userData.user);
  return (
    <ChakraProvider>
      <Box backgroundColor="gray.200" width="100%" minH="100vh">
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
