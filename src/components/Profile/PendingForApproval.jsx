import { Flex, Box, Image, Heading, Button, Text } from '@chakra-ui/react';
import SideBar from './SideBar';
import { useContext } from 'react';
import { AuthContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { usePending } from '../../hooks/usePending';
import { Spiner } from './Questions/Spiner';
import { DeliteProfileById } from '../../services/profile';

const PendingForApproval = () => {
  const { idCompany } = useContext(AuthContext);
  const navigate = useNavigate();

  const [profiles] = usePending(idCompany);
  const deleteUserById = (id) => {
    DeliteProfileById(id).then(() => {
      console.log('success delete');
    });
  };

  return (
    <>
      <Flex w="100vw" flexDirection={{ base: 'column', md: 'row' }}>
        <Box
          display="flex"
          bg="teal.400"
          h={{ base: '70px', md: '100vh' }}
          w={{ base: '100%', md: '230px' }}>
          <SideBar />
        </Box>

        <Flex flexWrap="wrap" justifyContent="center" margin="0px auto">
          {!profiles.fetching ? (
            profiles.data.map((profile) => {
              return (
                <Box key={profile.id}>
                  {profile.status === 'pending' && (
                    <Box
                      minWidth="200px"
                      border="1px solid black"
                      height="250px"
                      margin="20px"
                      padding="10px"
                      borderRadius="10px"
                      bgGradient="linear(to-r, green.200, gray.300)"
                      boxShadow="2px 3px #888888">
                      <Box>
                        <Flex
                          width="100%"
                          height="76px"
                          justifyContent="center"
                          marginBottom="30px">
                          {profile.image && (
                            <Image
                              src={process.env.REACT_APP_API_URL + profile.image}
                              borderRadius="50%"
                              border="2px solid #004D4D"></Image>
                          )}
                        </Flex>

                        {profile.name && (
                          <Flex justifyContent="space-between">
                            <Heading as="h6" fontSize="16px">
                              {profile.name}
                            </Heading>
                            <Box
                              bg="teal.600"
                              p="2px 10px"
                              color="white"
                              borderRadius="5px"
                              fontSize="12px"
                              marginLeft="10px">
                              {profile.status}
                            </Box>
                          </Flex>
                        )}
                      </Box>
                      <Box marginBottom="10px" marginTop="10px" height="30px">
                        {profile.dateJoined && <Text>{'Joined - ' + profile.dateJoined}</Text>}
                      </Box>
                      <Flex justifyContent="space-between">
                        <Button
                          height="30px"
                          color="white"
                          borderRadius="10px"
                          bg="teal.400"
                          _hover={{ bg: 'teal.600' }}
                          _focus={{ outline: 'none' }}
                          onClick={(e) => {
                            navigate('/pending-details/' + profile.id);
                          }}>
                          Details
                        </Button>
                        <Button
                          onClick={() => {
                            deleteUserById(profile.id);
                          }}
                          height="30px"
                          color="white"
                          borderRadius="10px"
                          bg="red"
                          _hover={{ bg: 'red.600' }}
                          _focus={{ outline: 'none' }}>
                          Delete
                        </Button>
                      </Flex>
                    </Box>
                  )}
                </Box>
              );
            })
          ) : (
            <Box w="250px" height="270px" marginTop="100px">
              {' '}
              <Spiner />
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default PendingForApproval;
