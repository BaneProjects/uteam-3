import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { AuthContext } from './components/UserContext';
import Nav from './components/Nav';
import Register from './components/Register';
import Login from './components/Login';
import MyProfile from './components/Profile/MyProfile';
import PageNotFound from './components/PageNotFound';
import PendingForApproval from './components/Profile/PendingForApproval';
import CompanyInfo from './components/Profile/CompanyInfo';
import Team from './components/Profile/Team';
import Questions from './components/Profile/Questions';

function App() {
  return (
    <ChakraProvider>
      <Box backgroundColor="gray.200" width="100%" minH="100vh">
        <Nav />
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:pageName" element={<PageNotFound />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/pending-for-approval" element={<PendingForApproval />} />
            <Route path="/company-info" element={<CompanyInfo />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
export default App;
