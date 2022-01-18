import { AuthContext, useAuthContext } from './UserContext';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log('test protected', isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
