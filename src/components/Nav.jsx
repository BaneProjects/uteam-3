import { Link } from 'react-router-dom';
import { HiLogout, HiOutlineUser } from 'react-icons/hi';

import {
  Box,
  Flex,
  Button,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './UserContext';
import logo from '../assets/logo.png';

const Nav = () => {
  const { user, logoutFunction, userPhoto, username } = useContext(AuthContext);

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
      <Flex justifyContent="flex-end" alignItems="center">
        <Box>
          {userPhoto && (
            <Img
              src={`https://uteam-api-7nngy.ondigitalocean.app${userPhoto}`}
              w="50px"
              mr={'10px'}
              borderRadius="50%"
              alignItems=""
              marginBottom={{ base: '20px', sm: '0' }}
              alt="logo"
            />
          )}
        </Box>
        <Box>
          <Menu>
            <MenuButton>{user && username}</MenuButton>

            <MenuList>
              {user && (
                <Link to={'/my-profile'}>
                  <Box>
                    <MenuItem color="black"  borderBottom={'1px'}>
                      <Text marginRight={'0.5rem'}>Profile</Text>

                      <HiOutlineUser />
                    </MenuItem>
                    <MenuItem
                      color="black"
                      onClick={() => {
                        logoutFunction(null);
                      }}>
                      <Text marginRight={'0.5rem'}>Logout</Text>

                      <HiLogout />
                    </MenuItem>
                  </Box>
                </Link>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      {!user && (
      <Box display="flex">
    
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
        
        {!user && (
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
      )}
    </Flex>
  );
};
export default Nav;