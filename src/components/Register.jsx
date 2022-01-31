import {
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Box,
  chakra,
  Text,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import { HiOutlineMail, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { useAuthContext } from './UserContext';
import { useRef, useState } from 'react';
const CFiUser = chakra(FiUser);
const CHiOutlineMail = chakra(HiOutlineMail);
const CFiLock = chakra(FiLock);
const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registerFunction } = useAuthContext();
  const filePicker = useRef(null);
  const [files, setFile] = useState();
  const onSubmit = async (user) => {
    const formData = new FormData();
    formData.append('files', files[0]);
    await registerFunction(user, formData);
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
                Company
              </Text>
              <InputGroup color="black">
                <InputLeftElement children={<HiOutlineOfficeBuilding opacity={'0.2'} />} />
                <Input
                  {...register('company')}
                  type="text"
                  placeholder="Enter a Company"
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
            <InputGroup display="flex" justifyContent="space-between" alignItems="center" mb="20px">
              <Button
                _focus={{ outline: 'none' }}
                _hover={{
                  background: 'teal.600'
                }}
                color="white"
                bg="teal.400"
                borderRadius="10px"
                onClick={() => {
                  filePicker.current.click();
                }}>
                {' '}
                Choose Photo
              </Button>
              <Text htmlFor="file-upload" fontSize="12px" color="black.200">
                {files ? files[0].name : 'No file chosen'}
              </Text>
              <Input
                type="file"
                ref={filePicker}
                display="none"
                onChange={(e) => setFile(e.target.files)}
              />
            </InputGroup>
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
