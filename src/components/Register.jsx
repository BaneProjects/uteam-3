import {
  Flex,
  Input,
  Button,
  FormControl,
  Box,
  chakra,
  Text,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CFiUser = chakra(FiUser);
const CHiOutlineMail = chakra(HiOutlineMail);
const CFiLock = chakra(FiLock);

const Register = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (user) => {
    console.log('test register', JSON.stringify(user));
    axios
      .post('http://localhost:1337/api/auth/local/register', {
        username: user.name,
        email: user.email,
        password: user.password
      })
      .then((response) => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        alert('Uspesno ste registrovani!');
        navigate('/');
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  };
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box w={{ base: '300px', sm: '400px' }} color="teal.400" textAlign="center">
        <Text fontSize="24px" fontWeight="bold">
          uTeam - Register
        </Text>
        <Box bg="white" mt="20px" p="30px" borderRadius="5px" fontSize="16px" boxShadow="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Name
              </Text>
              <InputGroup color="black">
                <InputLeftElement children={<CFiUser color="gray.300" />} />
                <Input
                  {...register('name')}
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
                  {...register('email')}
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
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  _focus={{ border: '1px solid #007C8C' }}
                />
              </InputGroup>
            </FormControl>
            {/* <FormControl mb="20px">
              <Text textAlign="left" mb="2.5px">
                Profile Photo
              </Text>
              <Input p="3px" type="file" {...register('profilePhoto')} />
            </FormControl> */}
            <Flex justifyContent="space-between" alignItems="center">
              <Link to={'/'}>
                <Text _hover={{ color: 'teal.600' }}>Already have an account?</Text>
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
                Register
              </Button>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
export default Register;
