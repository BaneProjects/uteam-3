import { Text, Box, Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { useUserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const Nav = () => {
  const { user, logOut } = useUserContext();
  console.log(user);
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="10px"
      backgroundColor="#004d4d"
      color="white">
      <Box>LOGO</Box>
      <Box display="flex">
        {user.isGuestUser ? (
          <Link to={''}>
            <Button
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              <Text>Login</Text>
            </Button>
          </Link>
        ) : (
          <Button
            onClick={logOut}
            borderRadius="10px"
            bg="teal.400"
            p="3px 20px"
            _hover={{ bg: 'teal.600' }}
            _focus={{ outline: 'none' }}>
            <Text>LogOut</Text>
          </Button>
        )}
        {user.isGuestUser ? (
          <Link to={'register'}>
            <Button
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              ml="10px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              <Text>Register</Text>
            </Button>
          </Link>
        ) : (
          <Button
            borderRadius="10px"
            bg="teal.400"
            p="3px 20px"
            ml="10px"
            _hover={{ bg: 'teal.600' }}
            _focus={{ outline: 'none' }}>
            <Text>MyProfile</Text>
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Nav;
