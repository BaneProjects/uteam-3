import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Nav from './components/Nav/Nav';
import { ChakraProvider } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import CompanyAdmin from './components/CompanyAdmin/CompanyAdmin';

function App() {
  return (
    <ChakraProvider>
      <Box backgroundColor="gray.200" idth="100wh" minH="100vh">
        <Router>
          <Nav></Nav>
          <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Box>
        </Router>
      </Box>
    </ChakraProvider>
  );
}
export default App;
