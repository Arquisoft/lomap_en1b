import React, { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Grid,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  useColorModeValue,
  FormControl,
  Input,
  FormLabel,
  Button,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import {useGetFriendsQuery, useAddFriendMutation} from "../../app/services/Friend";
import {Friend} from '../../types';
import { Entry } from './Entry';

export function AddFriendsView(){
  let [addFriendMutation, {isLoading, isError, error}] = useAddFriendMutation();
  let [webId, setWebId] = React.useState('');
  let [nickName, setNickName] = React.useState('');

  return (
      <Stack spacing={4} bg={useColorModeValue('gray.50', 'gray.800')} paddingBottom={'1'} paddingTop={'1'}>
          <Heading lineHeight={1.1} fontSize={{ base: '1xl', md: '3xl' }}>
              Add a new friend
          </Heading>
          <HStack maxW={'100vw'}>
              <form id={"addFriend"} onSubmit={
                  (event) => {
                      event.preventDefault();
                      const newFriend: Friend = {
                          webId: webId, nickName: nickName,
                          loMapOnly: false, name: "", profilePic: "",
                      };
                      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                          event.preventDefault();
                          addFriendMutation(newFriend);

                      };

                      handleSubmit(event)

                      setWebId("");
                      setNickName("");
                  }}/>
                  <Box>
                      <FormControl isRequired>
                          <FormLabel>Introduce your friend's WebId:</FormLabel>
                          <Input id="friendWbId"
                                 placeholder="asdfghjkl123456"
                                 _placeholder={{color: 'gray.500'}}
                                 type="text"
                                 value = {webId}
                                 onChange={(e) => setWebId(e.currentTarget.value)}
                          />
                      </FormControl>
                  </Box>
                  <Box>
                      <FormControl isRequired>
                          <FormLabel>Nickname:</FormLabel>
                          <Input id="nickname"
                                 placeholder="Motosarius"
                                 _placeholder={{color: 'gray.500'}}
                                 type="text"
                                 value = {nickName}
                                 onChange={(e) => setNickName(e.currentTarget.value)}
                          />
                      </FormControl>
                  </Box>

              {/* Applies the action "submit" to the form with id "addFriend" */}
              <Button form={"addFriend"} type={"submit"}
                  bg={'orange.400'}
                  color={'white'}
                  _hover={{
                      bg: 'orange.500',
                  }}>
                  { isLoading? <Spinner /> : "Add" }
              </Button>

          </HStack>
      </Stack>

  );
}

export default function FriendsView(): JSX.Element {
  let { data: friends, error, isLoading, isFetching } = useGetFriendsQuery();

  return (
    <Container maxW={'100vw'} >
      <Stack padding={'2'}>
        <Heading
          
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Friends{' '}
          <Text as={'span'} color={'orange.400'}>
            made easy
          </Text>
        </Heading>

          <AddFriendsView/>

        {/* Tabla amigos */}
        <Grid>
          <Heading lineHeight={1.1} fontSize={{ base: '1xl', md: '3xl' }} color={'orange.400'} paddingTop={'1.5'}>
            Your friends
          </Heading>
          {isLoading || isFetching
              ? (<h2>Loading friends <Spinner></Spinner> </h2>)
              : (<Table variant="striped" colorScheme="black" size="sm">
                            <Thead>
                              <Tr>
                                <Th scope="col">Photo</Th>
                                <Th scope="col">WebID</Th>
                                <Th scope="col">NickName</Th>
                                <Th scope="col">Name</Th>
                                <Th scope="col">Actions</Th>
                              </Tr>
                            </Thead>

                            <Tbody>
                              {friends?.map((friend, index) => (
                                  <Entry {...friend} key={index} />
                              ))}
                            </Tbody>
                          </Table>
          )}
        </Grid>

      </Stack>
    </Container>
  );
}