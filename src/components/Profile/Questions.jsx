import { Flex, Box, Text, Button, Input, Spinner } from '@chakra-ui/react';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import createAxios from '../../services/http';
import { _sortQuestionsbyOrder } from '../../utils/sort-utils';
import QuestionItem from './QuestionItem';
import ReactDragListView from 'react-drag-listview';

const Questions = () => {
  const [questions, setQuestions] = useState([]); // takodje state za drag and drop
  const [editingQuestionsInputs, setEditingQuestionsInputs] = useState([]); // here is values za for each input field of each question
  const [editingQuestionId, setEditingQuestionId] = useState(null); // data which question is in edit mode
  const [spinner, setSpinner] = useState(false);

  const _handleChangeEditingQuestions = (e, id) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setEditingQuestionsInputs({
      ...editingQuestionsInputs,
      [id]: value
    });
  };

  const refresh = () => {
    setSpinner(true);
    createAxios.get('api/questions').then((res) => {
      console.log('quetion', res);
      setSpinner(false);
      if (res && res.data && Array.isArray(res.data.data)) {
        const sortiraniQuestions = _sortQuestionsbyOrder(res.data.data);
        setQuestions(sortiraniQuestions);
        // we are now filling in the inputs
        let inputValues = {};
        res.data.data.forEach((question) => {
          inputValues[question.id] = question.attributes.text;
        });
        setEditingQuestionsInputs(inputValues);
      }
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  const _handleDelete = (id) => {
    setSpinner(true);
    createAxios.delete('api/questions/' + id).then((res) => {
      console.log('quetion', res);

      refresh();
    });
  };

  const _handleSave = (id) => {
    // save edited question
    const dataForSubmit = editingQuestionsInputs[id];
    const validator = () => {
      if (typeof dataForSubmit === 'string' && dataForSubmit !== '') {
        return true;
      }
      return false;
    };
    if (validator(dataForSubmit)) {
      console.log('validated');
      setSpinner(true);
      createAxios.put('api/questions/' + id, { data: { text: dataForSubmit } }).then((res) => {
        console.log('api edit question respose', res);

        refresh(); // to fetch the question again and see the changes from the database
        setEditingQuestionId(null); //to return from edit mode to normal mode
      });
    } else {
      window.alert('niste popunili polje!');
    }
  };

  const jsxSpinner = (
    <Flex justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Flex>
  );

  // ovo su podesavanja za ReactDragListView widget
  const dndState = questions; // adaptirmo naziv da znam oda je questions takodje state za drag and drop
  const setDndState = setQuestions; // adaptirmo naziv da znam oda je questions takodje state za drag and drop
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...dndState];
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setDndState(data);
    },
    nodeSelector: '.dnd-item', // ovo je selector za element koji se draguje
    handleSelector: '.drag-me-area' // ovo je slektor za elemnt na kojem detektujemo dragovanje. mora da na njega bas stavimo kursor
  };

  return (
    <>
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
                <CloseIcon transform={'rotate(45deg)'} marginRight={'10px'} /> Add new question
              </Button>
            </Link>
          </Flex>

          {spinner && jsxSpinner}
          <ReactDragListView {...dragProps}>
            {questions.map((question) => {
              const id = question.id;
              // const type = question.attributes.type;
              return (
                <QuestionItem
                  key={id}
                  question={question}
                  editingQuestionId={editingQuestionId}
                  editingQuestionsInputs={editingQuestionsInputs}
                  _handleChangeEditingQuestions={_handleChangeEditingQuestions}
                  _handleSave={_handleSave}
                  setEditingQuestionId={setEditingQuestionId}
                  _handleDelete={_handleDelete}
                />
              );
            })}
          </ReactDragListView>
        </Box>
      </Flex>
    </>
  );
};

export default Questions;
