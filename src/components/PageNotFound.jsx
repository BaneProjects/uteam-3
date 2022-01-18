import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { AuthContext } from './UserContext';
import { useContext } from 'react';

const PageNotFound = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const goHome = () => {
    navigate('/');
  };

  const goProfile = () => {
    navigate('/my-profile');
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Box>PAGE NOT FOUND</Box>
      <Button
        onClick={isLoggedIn ? goProfile : goHome}
        mt="10px"
        color="white"
        borderRadius="10px"
        bg="teal.400"
        p="3px 20px"
        _hover={{ bg: 'teal.600' }}
        _focus={{ outline: 'none' }}>
        {isLoggedIn ? 'Profile' : 'Home'}
      </Button>
    </Box>
  );
};

export default PageNotFound;
