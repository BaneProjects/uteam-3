import { Flex, Box } from '@chakra-ui/react';
import SideBar from './SideBar';

const Profile = () => {
  return (
    <Flex minHeight="100vh" w="100vw" flexDirection={{ base: 'column', md: 'row' }}>
      <Box
        display="flex"
        bg="teal.400"
        h={{ base: '70px', md: '100vh' }}
        w={{ base: '100%', md: '230px' }}>
        <SideBar />
      </Box>
      {/* <Box w="" border="1px solid black">ASAS</Box> */}
    </Flex>
  );
};

export default Profile;
