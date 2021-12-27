import {
  Flex,
  Input,
  Button,
  FormControl,
  Box,
  chakra,
  Text,
  InputLeftElement,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

const CFiUser = chakra(FiUser);
const CHiOutlineMail = chakra(HiOutlineMail);
const CFiLock = chakra(FiLock);

const Register = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box w="400px" color="teal.400" textAlign="center">
        <Text fontSize="24px" fontWeight="bold">
          uTeam - Register
        </Text>
        <Box bg="white" mt="20px" p="30px" borderRadius="5px" fontSize="16px" boxShadow="xl">
          <FormControl mb="20px">
            <Text textAlign="left" mb="2.5px">
              Name
            </Text>
            <InputGroup color="black">
              <InputLeftElement children={<CFiUser color="gray.300" />} />
              <Input
                type="text"
                placeholder="Name"
                _focus={{ border: '1px solid #007C8C' }}></Input>
            </InputGroup>
          </FormControl>
          <FormControl mb="20px">
            <Text textAlign="left" mb="2.5px">
              Email
            </Text>
            <InputGroup color="black">
              <InputLeftElement children={<CHiOutlineMail color="gray.300" />} />
              <Input
                type="email"
                placeholder="Email address"
                _focus={{ border: '1px solid #007C8C' }}></Input>
            </InputGroup>
          </FormControl>
          <FormControl mb="20px">
            <Text textAlign="left" mb="2.5px">
              Password
            </Text>
            <InputGroup color="black">
              <InputLeftElement pointerEvents="none" children={<CFiLock color="gray.300" />} />
              <Input
                type="password"
                placeholder="Password"
                _focus={{ border: '1px solid #007C8C' }}
              />
            </InputGroup>
          </FormControl>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to={'/'}>
              <Text _hover={{ color: 'teal.600' }}>Already have an account?</Text>
            </Link>
            <Button
              color="white"
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              ml="10px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Register
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
export default Register;
