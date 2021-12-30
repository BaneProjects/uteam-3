import React, { useContext } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Nav from './components/Nav';
import Profile from './components/Profile/Profile';
import { ChakraProvider } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { AuthContext } from './components/UserContext';
function App() {
  const { providerValue } = useContext(AuthContext);
  console.log('test', providerValue);
  return (
    <ChakraProvider>
      <Box backgroundColor="gray.200" idth="100wh" minH="100vh">
        <Router>
          <Nav></Nav>
          <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
            <Routes>
              {/* <Route path={"/"} element={providerValue.user ? <Profile/> : <Login />} /> */}
              {providerValue.user ? <Route path={"/profile"} element={<Profile />}/> : <Route path={"/"} element={<Login />}/>}
              <Route path="/register" element={<Register />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ChakraProvider>
  );
}
export default App;
