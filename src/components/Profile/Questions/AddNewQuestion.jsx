import { Flex, Input, Button, InputGroup, FormControl, Box, Text } from '@chakra-ui/react';
import SideBar from '../SideBar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Select from 'react-select';
import { addNewQuestion } from '../../../services/questions';

const AddNewQuestion = () => {
  const [newQuestion, setNewQuestion] = useState();
  const [option, setOption] = useState({ label: 'Text', value: 'text' });
  const options = [
    { label: 'Text', value: 'text' },
    { label: 'Long Text', value: 'long_text' },
    { label: 'Image', value: 'image' }
  ];
  const functionForOrder = () => {
    return (Math.random() * 1000000).toFixed();
  };

  const saveAddNewQuestion = async (e) => {
    e.preventDefault();
    const valueQuestion = {
      text: newQuestion,
      type: option.value,
      order: functionForOrder()
    };
    try {
      await addNewQuestion(valueQuestion);
    } catch (error) {
      console.log(error);
    }
  };

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
          p={{ base: '10px 0', sm: '0 20px' }}
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="center"
          borderBottom="1px solid #43b3ac">
          <Text fontSize={{ base: '22px', sm: '28px' }}>Add New Question</Text>
          <Link to={'/questions'}>
            <Button
              color="white"
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              BACK
            </Button>
          </Link>
        </Flex>
        <Box minH="90vh" display="flex" alignItems="center" justifyContent="center">
          <Box
            bg="white"
            mt="20px"
            p="30px 0"
            mb={{ base: '30px', xl: '0' }}
            borderRadius="5px"
            fontSize="16px"
            boxShadow="xl"
            color="teal.400"
            textAlign="center"
            width={{ base: '300px', sm: '450px' }}>
            <Box p="0 30px 0 30px">
              <FormControl mb="20px">
                {option.value === 'text' || option.value === 'long_text' ? (
                  <Box>
                    <Text textAlign="left" mb="2.5px">
                      {option.value === 'text' ? 'Question text' : 'Question long text'}
                    </Text>
                    <Input
                      color="black"
                      onChange={(e) => setNewQuestion(e.target.value)}
                      type={option.value === 'text' ? 'text' : 'long_text'}
                      placeholder={option.value === 'text' ? 'Question text' : 'Question long text'}
                      _focus={{ border: '1px solid #007C8C' }}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Text textAlign="left" mb="2.5px">
                      Question image
                    </Text>
                    <Input
                      color="black"
                      onChange={(e) => setNewQuestion(e.target.value)}
                      type="image"
                      placeholder="Question Image"
                      _focus={{ border: '1px solid #007C8C' }}
                    />
                  </Box>
                )}
              </FormControl>
              <FormControl mb="20px">
                <Text textAlign="left" mb="2.5px">
                  Question type
                </Text>
                <Select
                  variant="outline"
                  defaultValue={options[0].value}
                  value={option}
                  options={options}
                  onChange={(value) => setOption(value)}
                  
                />
              </FormControl>
              <Button
                onClick={saveAddNewQuestion}
                color="white"
                borderRadius="10px"
                bg="teal.400"
                p="3px 40px"
                mt="20px"
                _hover={{ bg: 'teal.600' }}
                _focus={{ outline: 'none' }}>
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default AddNewQuestion;
