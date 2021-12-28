import Auth from './components/Auth';
import Nav from './components/Nav';
import { UserContextProvider } from './context/userContext';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Register from './components/Register';

function App() {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Box backgroundColor="gray.200" idth="100wh" minH="100vh">
          <Router>
            <Nav></Nav>
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Box>
          </Router>
        </Box>
      </UserContextProvider>
    </ChakraProvider>
  );
}
export default App;
