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
import { AuthContext } from '../UserContext';

const PendingDetails = () => {
  let { id } = useParams();
  const profileId = parseInt(id);

  const [question, setQuestions] = useState();

  const navigate = useNavigate();
  const filePicker = useRef(null);
  const [files, setFile] = useState(null);
  const { idCompany, fetchData } = useContext(AuthContext);

  const [single, handleChange, refresh] = usePendingSingle(idCompany, profileId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', files[0]);

    apiEditPendingDetails(formData, single).then(() => {
      refresh();
      fetchData();
    });
  };

  //set question by company id
  useEffect(() => {
    if (idCompany) {
      getQuestionsByCompanyId(idCompany).then((response) => {
        if (response && response.data && Array.isArray(response.data.data)) {
          setQuestions(response.data.data);
        }
      });
    }
  }, [idCompany]);

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
              minHeight="350px"
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
                {question &&
                  question.map((question, num) => {
                    const number = num + 1;
                    return (
                      <Box key={question.id}>
                        {question.attributes.type === 'text' && (
                          <Box borderBottom="2px solid gray">
                            <Box padding="20px">
                              <Text textAlign="left">
                                Question {number} - {question.attributes.text}
                              </Text>
                              <InputGroup color="black">
                                <Input type="text" />
                              </InputGroup>
                            </Box>
                          </Box>
                        )}
                        {question.attributes.type === 'long_text' && (
                          <Box borderBottom="2px solid gray">
                            <Box padding="20px">
                              <Text textAlign="left">
                                Question {number} - {question.attributes.text}
                              </Text>
                              <InputGroup color="black">
                                <Input type="text" />
                              </InputGroup>
                            </Box>
                          </Box>
                        )}

                        {question.attributes.type === 'image' && (
                          <Box borderBottom="2px solid gray">
                            <Box padding="20px">
                              <Text textAlign="left" marginBottom="20px">
                                Question {number} -{question.attributes.text}
                              </Text>

                              <Flex justifyContent="space-between">
                                <InputGroup
                                  width="50%"
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
                                  <Text
                                    htmlFor="file-upload"
                                    fontSize="12px"
                                    color="black.200"
                                    marginLeft="12px">
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
                                <Box>OVDE IDE SLIKA</Box>
                              </Flex>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
              </FormControl>
              <Flex justifyContent="flex-end" padding="20px">
                <Button
                  color="white"
                  borderRadius="10px"
                  bg="teal.400"
                  p="3px 20px"
                  ml="10px"
                  _hover={{ bg: 'teal.600' }}
                  _focus={{ outline: 'none' }}>
                  Save
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PendingDetails;
