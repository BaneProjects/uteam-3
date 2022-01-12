import { Flex, Box } from "@chakra-ui/react";
import SideBar from "./SideBar";
// import { useContext } from 'react';
// import { AuthContext } from '../UserContext';

const Profile = () => {
  // const { user } = useContext(AuthContext);
  // const namee = user.email;
  // console.log("toto", namee)
  return (
    <Flex
      minHeight="100vh"
      w="100vw"
      flexDirection={{ base: "column", md: "row" }}
    >
      {/* <Box>Zdravo {namee}</Box> */}
      <Box
        display="flex"
        bg="teal.400"
        h={{ base: "70px", md: "100vh" }}
        w={{ base: "100%", md: "230px" }}
      >
        <SideBar />
      </Box>
      {/* <Box w="" border="1px solid black">ASAS</Box> */}
    </Flex>
  );
};

export default Profile;
