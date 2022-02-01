import { Flex, Box, Text, Button, Input } from '@chakra-ui/react';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
const Questions = () => {
  const [a, seta] =useState("Do you have any pets?");
  const[editQuetion, setQuetion] = useState(false)

  const edditFunction = () => {
       
    setQuetion(true)

  }



  return (
    <Flex minHeight="100vh" w="100vw" flexDirection={{ base: 'column', md: 'row' }}>
      <Box
    
        display="flex"
        bg="teal.400"
        minHeight={{ base: '70px', md: '100vh' }}
        w={{ base: '100%', md: '330px' }}>
        <SideBar />{' '}
      </Box>
      <Box w="100%">
        <Flex
          minHeight="10vh"
          justifyContent="space-between"
          p={{ base: '8px 0', sm: '0 20px' }}
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="center"
          borderBottom="1px solid #43b3ac">
          <Text fontSize={{ base: '22px', sm: '28px' }}>Questions</Text>
          <Link to={'/add-new-question'}>
            
            <Button
              color="white"
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
                  <CloseIcon transform={"rotate(45deg)"} marginRight={"10px"}/>  Add new quetion
             </Button>
           
            
           
          </Link>
        </Flex>
        <Flex justifyContent="space-between" border="1px solid #43b3ac" m="10px" borderRadius="10px" p="10px"    background="white" boxShadow=" 2px 3px 7px black">
          <Box w="100%">
            <Box>Question 1 - Text</Box>
 
             {
              editQuetion ? <Input type="text" variant='unstyled' value={a}   onChange={(e) => seta(e.target.value)} placeholder="Do you have any pets?"/> : <Text>Do you have any pets?</Text>
             }
            
          </Box>
          <Flex alignItems="center">
            <Button
            onClick={edditFunction}
              color="white"
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Edit
              <EditIcon marginLeft="8px"/>
            </Button>
            <Button
              color="white"
              borderRadius="10px"
              bg="red"
              p="3px 20px"
              ml="5px"
              _hover={{ bg: 'red.600' }}
              _focus={{ outline: 'none' }}>
              Delete
              <DeleteIcon marginLeft="5px"/>
            </Button>


          </Flex>
        </Flex>
        <Flex justifyContent="space-between" border="1px solid #43b3ac" m="10px" borderRadius="10px" p="10px"  background="white" boxShadow=" 2px 3px 7px black">
          <Box>
            <Box>Question 2 - Text</Box>
            <Box>Take a picture of your Christmas tree?</Box>
          </Box>
          <Flex alignItems="center">
            <Button
              color="white"
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Edit
              <EditIcon marginLeft="8px"/>
            </Button>
            <Button
              color="white"
              borderRadius="10px"
              bg="red"
              p="3px 20px"
              ml="5px"
              _hover={{ bg: 'red.600' }}
              _focus={{ outline: 'none' }}>
              Delete
              <DeleteIcon marginLeft="5px"/>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Questions;