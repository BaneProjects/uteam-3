import React from 'react';
import { useForm } from 'react-hook-form';
import { useUserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import {
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  FormControl,
  chakra,
  Box,
  Text
} from '@chakra-ui/react';
import { FiLock } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

const CHiOutlineMail = chakra(HiOutlineMail);
const CFiLock = chakra(FiLock);

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const email = register('username');
  const { logIn } = useUserContext();
  const onSubmit = (data) => {
    logIn(data.username);
    console.log('Form data', data);
  };
  console.log(errors);

  return (
    <Flex justifyContent="center" alignItems="center">
      <Box w="400px" color="teal.400" textAlign="center">
        <Text fontSize="24px" fontWeight="bold">
          uTeam - Login
        </Text>
        <Box bg="white" mt="20px" p="30px" borderRadius="5px" fontSize="16px" boxShadow="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Email
              </Text>
              <InputGroup color="black">
                <InputLeftElement children={<CHiOutlineMail color="gray.300" />} />
                <Input
                  name="username"
                  type="email"
                  id="emaill"
                  placeholder="Email address"
                  _focus={{ border: '1px solid #007C8C' }}
                  // ref={email}
                />
              </InputGroup>
            </FormControl>
            <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Password
              </Text>
              <InputGroup color="black">
                <InputLeftElement children={<CFiLock color="gray.300" />} />
                <Input
                  type="password"
                  placeholder="Password"
                  id="pass"
                  _focus={{ border: '1px solid #007C8C' }}
                />
              </InputGroup>
            </FormControl>
            <Flex justifyContent="space-between" alignItems="center">
              <Link to={'register'}>
                <Text _hover={{ color: 'teal.600' }}>Don’t have an account?</Text>
              </Link>
              <Button
                type="submit"
                color="white"
                borderRadius="10px"
                bg="teal.400"
                p="3px 20px"
                ml="10px"
                _hover={{ bg: 'teal.600' }}
                _focus={{ outline: 'none' }}>
                Login
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
