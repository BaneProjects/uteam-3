import { Link } from 'react-router-dom';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './UserContext';
const Nav = () => {
  const { userData, logout } = useContext(AuthContext);
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="10px"
      backgroundColor="#004d4d"
      color="white">
      <Box>LOGO</Box>
      <Box display="flex">
        {userData.user ? (
          <Link to={'/profile'}>
            <Button
              borderRadius="10px"
              bg="teal.400"
              mr="10px"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Profile
            </Button>
          </Link>
        ) : (
          <Link to={'/'}>
            <Button
              borderRadius="10px"
              bg="teal.400"
              mr="10px"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Login
            </Button>
          </Link>
        )}
        {userData.user ? (
          <Link to={'/'}>
            <Button
              onClick={() => {
                logout(null);
              }}
              borderRadius="10px"
              bg="teal.400"
              mr="10px"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Logout
            </Button>
          </Link>
        ) : (
          <Link to={'/register'}>
            <Button
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              mr="10px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Register
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Nav;
