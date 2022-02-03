import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { BiTrash, BiEdit } from 'react-icons/bi';
import { getQuestions } from '../../../services/questions';
import { useState, useEffect } from 'react';

const QuestionList = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  
  const functionForGetQuestion = async () => {
    try {
      const getAllQuestions = await getQuestions();
      setAllQuestions(getAllQuestions.data);
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    functionForGetQuestion();
  }, []);

  return (
    <Flex flexDirection="column" p="10px">
      {allQuestions.map((questions) => (
        <Box
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          key={questions.id}
          m="5px 10px"
          p="10px"
          bg="white"
          borderRadius="5px"
          fontSize="16px"
          boxShadow="xl">
          <Box>
            <Text fontWeight="bold">
              Question {questions.attributes.order} -{' '}
              {questions.attributes.type.charAt(0).toUpperCase() +
                questions.attributes.type.slice(1)}
            </Text>
            <Text>{questions.attributes.text}</Text>
          </Box>
          <Box>
            <Flex alignItems="center">
              <Button
                color="white"
                borderRadius="10px"
                bg="teal.400"
                p="3px 10px"
                _hover={{ bg: 'teal.600' }}
                _focus={{ outline: 'none' }}>
                Edit
                <Box ml="5px">
                  <BiEdit />
                </Box>
              </Button>
              <Button
                color="white"
                borderRadius="10px"
                bg="red.400"
                p="3px 10px"
                ml="5px"
                _hover={{ bg: 'red.600' }}
                _focus={{ outline: 'none' }}>
                Delete
                <Box ml="5px">
                  <BiTrash />
                </Box>
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default QuestionList;
