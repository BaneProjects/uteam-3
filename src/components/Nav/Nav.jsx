import { Link } from 'react-router-dom';
import { Text, Box, Flex, Button, Image, Img } from '@chakra-ui/react';

const Nav = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="10px"
      backgroundColor="#004d4d"
      color="white">
      {/* <Image src="/static/media/logo.8eb02d2a92d7b3e5871f.png" w="180px" h="40px" /> */}
      {/* <Img src="/static/media/logo.8eb02d2a92d7b3e5871f.png" w="380px" h="40px" /> */}
      {/* <img src="./logo.png" alt="ee" /> */}
      <Box>
        LOGO
      </Box>
      <Box display="flex">
        <Link to={'/'}>
          <Button
            borderRadius="10px"
            bg="teal.400"
            p="3px 20px"
            _hover={{ bg: 'teal.600' }}
            _focus={{ outline: 'none' }}>
            <Text>Login</Text>
          </Button>
        </Link>
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
      </Box>
    </Flex>
  );
};

export default Nav;
