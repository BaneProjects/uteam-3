import { Flex, Box, Text, Button, Input } from '@chakra-ui/react';
import { CloseIcon, DeleteIcon, EditIcon, CheckIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import { useRef } from 'react';
import { _sortQuestionsbyOrder } from '../../utils/sort-utils';

const QuestionItem = (props) => {
  const question = props.question;
  const id = question.id;
  const type = question.attributes.type;
  const {
    editingQuestionId,
    editingQuestionsInputs,
    _handleChangeEditingQuestions,
    setEditingQuestionId,
    _handleSave,
    _handleDelete
  } = props;

  const inputRef = useRef();

  return (
    <Flex
      key={id}
      justifyContent="space-between"
      border="1px solid #43b3ac"
      m="10px"
      borderRadius="10px"
      p="10px"
      background="white"
      boxShadow=" 1px 1px 0px black"
      className="drag-me-area dnd-item">
      <Flex w="100%" flexDirection="column">
        <Box fontWeight="500">
          {' '}
          <ArrowUpDownIcon cursor="pointer" className="drag-me-area" /> Quetion{' '}
          {question.attributes.order} - {type}
        </Box>

        {editingQuestionId === id ? (
          <Input 
           marginLeft="20px"
            ref={inputRef}
            type="text"
            variant="unstyled"
            value={editingQuestionsInputs[id]}
            onChange={(e) => {
              _handleChangeEditingQuestions(e, id);
            }}
          />
        ) : (
          <Text marginLeft="20px">{question.attributes.text}</Text>
        )}
      </Flex>

      <Flex alignItems="center">
        {editingQuestionId === id && (
          <>
            <Button
              onClick={(e) => {
                _handleSave(id);
              }}
              color="white"
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Save
              <CheckIcon marginLeft="8px" />
            </Button>
            <Button
              onClick={(e) => setEditingQuestionId(null)}
              color="white"
              ml="5px"
              borderRadius="10px"
              bg="red"
              p="3px 20px"
              _hover={{ bg: 'red.600' }}
              _focus={{ outline: 'none' }}>
              Cancel
              <CloseIcon marginLeft="8px" w="13px" />
            </Button>
          </>
        )}

        {editingQuestionId !== id && (
          <>
            <Button
              onClick={(e) => {
                setEditingQuestionId(id);
              }}
              color="white"
              borderRadius="10px"
              bg="teal.400"
              p="3px 20px"
              _hover={{ bg: 'teal.600' }}
              _focus={{ outline: 'none' }}>
              Edit
              <EditIcon marginLeft="8px" />
            </Button>
            <Button
              onClick={(e) => {
                _handleDelete(id);
              }}
              color="white"
              borderRadius="10px"
              bg="red"
              p="3px 20px"
              ml="5px"
              _hover={{ bg: 'red.600' }}
              _focus={{ outline: 'none' }}>
              Delete
              <DeleteIcon marginLeft="5px" />
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default QuestionItem;
