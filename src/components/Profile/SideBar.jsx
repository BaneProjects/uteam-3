import {
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  FormControl,
  Box,
  Text,
  Link
} from '@chakra-ui/react';

const SideBar = () => {
  return (
    <Flex flexDirection="column">
      <Link href="#">Pending for approval</Link>
      <Link href="#">Team</Link>
      <Link href="#">Questions</Link>
      <Link href="#">Company info</Link>
      <Link href="#">My Profile</Link>
    </Flex>
  );
};

export default SideBar;
