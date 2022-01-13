import { Link } from 'react-router-dom';
import { Box, Flex, Button, Img } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './UserContext';
import logo from '../assets/logo.png';

const Nav = () => {
  const { user, isLoggedIn, logoutFunction } = useContext(AuthContext);
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="10px"
      backgroundColor="#004d4d"
      color="white"
      w="100vw"
      maxWidth="100%"
      flexDirection={{ base: 'column', sm: 'row' }}>
      <Img src={logo} w="220px" marginBottom={{ base: '20px', sm: '0' }} alt="logo" />
      <Box display="flex">
        {user || isLoggedIn ? (
          <Link to={'/profile'}>
            <Button
              borderRadius="10px"
              bg="teal.400"
              mr={{ base: '10px', sm: '10px' }}
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
              mr={{ base: '10px', sm: '10px' }}
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Login
            </Button>
          </Link>
        )}
        {user || isLoggedIn ? (
          <Link to={'/'}>
            <Button
              onClick={() => {
                logoutFunction(null);
              }}
              borderRadius="10px"
              bg="teal.400"
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
