import {
  Flex,
  Box,
  Heading,
  Button,
  FormControl,
  Input,
  InputGroup,
  Text,
  Img
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useContext, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePendingSingle } from '../../hooks/usePendingSingle';
import { apiEditPendingDetails } from '../../services/pendingUpdate';
import { ChangeUserStatusById, DeliteProfileById } from '../../services/profile';
import { getQuestionsByCompanyId } from '../../services/question';
import { updateAnswer, updateAnswerWithPhoto } from '../../services/updateAnswer';
import { AuthContext } from '../UserContext';

const getLastItemFromArray = (arr) => {
  if (arr.length === 0) {
    return null;
  }
  return arr[arr.length - 1]; // return last item
};

const PendingDetails = () => {
  let { id } = useParams();
  const profileId = parseInt(id);
  const [multiQA, setMultiQA] = useState([]);

  console.log('test', multiQA);
  const navigate = useNavigate();
  const filePicker = useRef(null);
  const filePicker2 = useRef(null);
  const [files, setFile] = useState(null);
  const { idCompany, fetchData } = useContext(AuthContext);

  const [single, handleChange, refresh] = usePendingSingle(idCompany, profileId);

  const handleSubmit = (e) => {
    //submit for basic info
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', files[0]);

    apiEditPendingDetails(formData, single).then(() => {
      refresh();
      fetchData();
    });
  };

  //set questions by company id
  useEffect(() => {
    if (idCompany) {
      getQuestionsByCompanyId(idCompany).then((response) => {
        console.log('QA', response);
        if (response && response.data && Array.isArray(response.data.data)) {
          const questions = response.data.data;

          const _answers = questions.map((question) => {
            const _answer = getLastItemFromArray(question.attributes.answers.data);
            let _answer_id = null;
            let _answer_text = null;
            if (_answer && _answer.id && _answer.attributes && _answer.attributes.answer) {
              _answer_id = _answer.id;
              _answer_text = _answer.attributes.answer;
            }
            const qa = {
              question_id: question.id,
              type: question.attributes.type,
              text: question.attributes.text,
              answer_id: _answer_id,
              answer: _answer_text,
              files: null
            };
            return qa;
          });
          setMultiQA(_answers);
        }
      });
    }
  }, [idCompany]);

  const multiHandleChange = (id, e) => {
    console.log('e', e);
    const target = e.target;

    let value = null;
    if (target.type === 'checkbox') {
      value = target.cheked;
    } else if (target.type === 'file') {
      value = null;
    } else {
      value = target.value;
    }
    const changedMultiAnswers = multiQA.map((q) => {
      if (q.question_id === id) {
        if (target.type === 'file') {
          const files = target.files;
          const changedAnswer = {
            ...q,
            files: files
          };
          return changedAnswer;
        } else {
          // the field is input text
          const changedAnswer = {
            ...q,
            answer: value
          };
          return changedAnswer;
        }
      }
      return q;
    });

    setMultiQA(changedMultiAnswers);
  };

  const handleClickSaveAnswers = (question_id) => {
    const qaforSubmit = multiQA.filter((q) => {
      if (q.question_id === question_id) {
        return true;
      }
      return false;
    });
    if (qaforSubmit[0]) {
      const dataZaSubmitAnswers = qaforSubmit[0]; //this is the data from which the data should be reported and packed for api

      if (dataZaSubmitAnswers.type === 'text' || dataZaSubmitAnswers.type === 'long_text') {
        const data = {
          question: dataZaSubmitAnswers.question_id,
          profile: profileId,
          answer: dataZaSubmitAnswers.answer
        };
        updateAnswer(dataZaSubmitAnswers.answer_id, data).then((res) => {
          console.log('resonseodupdate', res);
        });
      } else if (dataZaSubmitAnswers.type === 'image') {
        console.log('slika je');

        const formData = new FormData();
        formData.append('files', dataZaSubmitAnswers.files[0]);
        updateAnswerWithPhoto(formData).then(() => {
          const data = {
            question: dataZaSubmitAnswers.question_id,
            profile: profileId,
            answer: dataZaSubmitAnswers.answer
          };
          updateAnswer(dataZaSubmitAnswers.answer_id, data).then((res) => {
            console.log('updateResponsePhoto', res);
          });
        });
      }
    }
  };

  const changeUserStatus = () => {
    ChangeUserStatusById(profileId).then((response) => {
      console.log('promena-statusa', response);
    });
  };
  const deleteUser = (id) => {
    DeliteProfileById(id).then((res) => {
      console.log('deleted', res);
    });
  };

  return (
    <Flex w="100vw" flexDirection={{ base: 'column', md: 'row' }}>
      <Flex
        flexDirection={{ base: 'column', xl: 'row' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}
        alignItems={{ base: 'center', md: 'flex-start' }}
        margin="0 auto">
        <Flex w="" flexDirection="column" margin="0px 10px 0px">
          <Box>
            <Heading height="60px" display="flex" alignItems="center" s="h4" size="md">
              Moderate team member entry
            </Heading>
          </Box>
          <Box
            width="350px"
            borderRadius="5px"
            border-top="none"
            bg="white"
            boxShadow="0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 5px 16px 0 rgba(0, 0, 0, 0.17)">
            <Box w="100%">
              <Heading as="h5" size="sm" borderBottom="2px solid gray" padding="20px">
                Basic info
              </Heading>
            </Box>
            <FormControl mb="20px" padding="20px">
              <Box marginBottom="20px">
                <Text textAlign="left">Name</Text>
                <InputGroup color="black">
                  <Input name="name" value={single.name} onChange={handleChange} type="text" />
                </InputGroup>
              </Box>
              <Box>
                <Text textAlign="left">Profile photo</Text>
                <InputGroup
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb="20px"
                  border="1px solid #cbd5e0"
                  borderRadius={'5px'}
                  padding={'5px'}>
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
                    chose file
                  </Button>
                  /
                  <Text htmlFor="file-upload" fontSize="12px" color="black.200">
                    {files ? files[0].name : 'Upload file'}
                  </Text>
                  <Input
                    required
                    type="file"
                    ref={filePicker}
                    display="none"
                    onChange={(e) => setFile(e.target.files)}
                  />
                </InputGroup>
                <Flex alignItems="center" justifyContent="space-between">
                  <Box>
                    <Img
                      src={process.env.REACT_APP_API_URL + single.image}
                      height="72px"
                      width="72px"
                      borderRadius="50%"></Img>
                  </Box>
                  <Button
                    color="white"
                    borderRadius="10px"
                    bg="teal.400"
                    p="3px 20px"
                    ml="10px"
                    _hover={{ bg: 'teal.600' }}
                    _focus={{ outline: 'none' }}
                    onClick={handleSubmit}>
                    Save
                  </Button>
                </Flex>
              </Box>
            </FormControl>
          </Box>
          <Button
            w="100px"
            marginTop="20px"
            color="white"
            borderRadius="10px"
            bg="teal.400"
            p="3px 20px"
            ml="10px"
            _hover={{ bg: 'teal.600' }}
            _focus={{ outline: 'none' }}
            onClick={(e) => navigate('/pending-for-approval')}>
            Back
          </Button>
        </Flex>
        <Flex>
          <Flex flexDirection="column">
            <Box display="flex" justifyContent="flex-end" alignItems="center" height="60px">
              <Button
                onClick={changeUserStatus}
                color="white"
                borderRadius="10px"
                bg="teal.400"
                p="3px 20px"
                ml="10px"
                _hover={{ bg: 'teal.600' }}
                _focus={{ outline: 'none' }}>
                Approve
              </Button>
              <Button
                onClick={() => deleteUser(single.id)}
                color="white"
                borderRadius="10px"
                bg="red"
                p="3px 20px"
                ml="10px"
                _hover={{ bg: 'red.600' }}
                _focus={{ outline: 'none' }}>
                Delete
              </Button>
            </Box>

            <Box
              minWidth="350px"
              borderRadius="5px"
              minHeight="300px"
              border-top="none"
              bg="white"
              boxShadow="0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 5px 16px 0 rgba(0, 0, 0, 0.17)">
              <Box w="100%">
                <Heading
                  display="flex"
                  as="h5"
                  size="sm"
                  borderBottom="2px solid gray"
                  padding="20px">
                  Answer
                </Heading>
              </Box>
              <FormControl>
                {multiQA &&
                  multiQA.map((q, index) => {
                    const number = index + 1;
                    return (
                      <Box key={q.question_id}>
                        {q.type === 'text' && (
                          <Box borderBottom="2px solid gray">
                            <Box padding="20px">
                              <Text textAlign="left">
                                Question {number} - {q.text}
                              </Text>
                              <Flex>
                                <InputGroup color="black">
                                  <Input
                                    type="text"
                                    name="answer"
                                    value={q.answer}
                                    onChange={(e) => {
                                      multiHandleChange(q.question_id, e);
                                    }}
                                  />
                                </InputGroup>
                                <Button
                                  marginLeft="5px"
                                  color="white"
                                  borderRadius="10px"
                                  bg="teal.400"
                                  p="3px 20px"
                                  ml="10px"
                                  _hover={{ bg: 'teal.600' }}
                                  _focus={{ outline: 'none' }}
                                  onClick={(e) => {
                                    handleClickSaveAnswers(q.question_id);
                                  }}>
                                  save
                                </Button>
                              </Flex>
                            </Box>
                          </Box>
                        )}
                        {q.type === 'long_text' && (
                          <Box borderBottom="2px solid gray">
                            <Box padding="20px">
                              <Text textAlign="left">
                                Question {number} - {q.text}
                              </Text>

                              <Flex>
                                <InputGroup color="black">
                                  <Input
                                    type="text"
                                    name="answer"
                                    value={q.answer}
                                    onChange={(e) => {
                                      multiHandleChange(q.question_id, e);
                                    }}
                                  />
                                </InputGroup>
                                <Button
                                  marginLeft="5px"
                                  color="white"
                                  borderRadius="10px"
                                  bg="teal.400"
                                  p="3px 20px"
                                  ml="10px"
                                  _hover={{ bg: 'teal.600' }}
                                  _focus={{ outline: 'none' }}
                                  onClick={(e) => {
                                    handleClickSaveAnswers(q.question_id);
                                  }}>
                                  save
                                </Button>
                              </Flex>
                            </Box>
                          </Box>
                        )}

                        {q.type === 'image' && (
                          <Flex borderBottom="2px solid gray">
                            <Flex padding="20px" flexDirection="column">
                              <Text textAlign="left" marginBottom="20px">
                                Question {number} -{q.text}
                              </Text>

                              <Flex justifyContent="space-between" flexDirection="column">
                                <InputGroup
                                  display="flex"
                                  alignItems="center"
                                  mb="20px"
                                  border="1px solid #cbd5e0"
                                  borderRadius={'5px'}
                                  padding={'5px'}>
                                  <Button
                                    _focus={{ outline: 'none' }}
                                    _hover={{
                                      background: 'teal.600'
                                    }}
                                    color="white"
                                    bg="teal.400"
                                    borderRadius="10px"
                                    onClick={() => {
                                      filePicker2.current.click();
                                    }}>
                                    {' '}
                                    chose file
                                  </Button>
                                  /
                                  <Text htmlFor="file-upload" fontSize="12px" color="black.200">
                                    {files ? files[0].name : 'Upload file'}
                                  </Text>
                                  <Input
                                    required
                                    type="file"
                                    name="answer"
                                    value={q.files}
                                    ref={filePicker2}
                                    display="none"
                                    onChange={(e) => {
                                      multiHandleChange(q.question_id, e);
                                    }}
                                  />
                                </InputGroup>
                                <Box display="flex" flexDirection="column">
                                  {<Img src={q.answer}></Img>}
                                </Box>
                                <Button
                                  marginLeft="5px"
                                  color="white"
                                  w="80px"
                                  marginTop="20px"
                                  borderRadius="10px"
                                  bg="teal.400"
                                  p="3px 20px"
                                  ml="10px"
                                  _hover={{ bg: 'teal.600' }}
                                  _focus={{ outline: 'none' }}
                                  onClick={(e) => {
                                    handleClickSaveAnswers(q.question_id);
                                  }}>
                                  save
                                </Button>
                              </Flex>
                            </Flex>
                          </Flex>
                        )}
                      </Box>
                    );
                  })}
              </FormControl>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PendingDetails;
