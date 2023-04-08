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
//import {useGetFriendsQuery} from "../../app/services/Friend";
import {useAddLocationMutation, useGetFriendsQuery} from "../../app/services/Location";
import {useAddFriendMutation} from "../../app/services/Friend";
import {Friend, MapMarker} from '../../types';
import { Entry } from './Entry';
import {Form} from "react-router-dom";
import {LocationType} from "../../locationType";

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
              <Form id={"addFriend"} onSubmit={
                  (event) => {
                      event.preventDefault();
                      const newFriend: Friend = {
                          webId: webId, nickName: nickName,
                          loMapOnly: false, name: "", profilePic: "",
                      };
                      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                          event.preventDefault();
                          //TODO: Remove this after testing it all works correctly
                          console.log("webid: " + newFriend.webId);
                          console.log("nickname: " + newFriend.nickName);

                          addFriendMutation(newFriend);
                      };
                      handleSubmit(event)
                      /* TODO:

                      Right now when we do this, the textfield is not restored so:
                       - visually there is something written
                       - You can submit the form because the is something written
                       - But the field that is sent is empty
                       - We need to restore the textfield someway or dont erase the content here

                      setWebId("");
                      setNickName("");
                       */

                  }}></Form>
                  <Box>
                      <FormControl isRequired>
                          <FormLabel>Introduce your friend's WebId:</FormLabel>
                          <Input id="friendWbId"
                                 placeholder="asdfghjkl123456"
                                 _placeholder={{color: 'gray.500'}}
                                 type="text"
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
                  Add
              </Button>

          </HStack>
      </Stack>

  );
}
/*
<HStack maxW={'100vw'}>
    <Box>
        <FormControl isRequired>
            <FormLabel>Introduce your friend's WebId:</FormLabel>
            <Input id="friendWbId"
                   placeholder="asdfghjkl123456"
                   _placeholder={{ color: 'gray.500' }}
                   type="text" />
        </FormControl>
    </Box>
    <Box>
        <FormControl isRequired>
            <FormLabel>Nickname:</FormLabel>
            <Input id="nickname"
                   placeholder="Motosarius"
                   _placeholder={{ color: 'gray.500' }}
                   type="text"
            />
        </FormControl>
    </Box>
    <Button
        bg={'orange.400'}
        color={'white'}
        _hover={{
            bg: 'orange.500',
        }}>
        Add
    </Button>
</HStack>

 */


export default function FriendsView(): JSX.Element {
  let { data: friends, error, isLoading } = useGetFriendsQuery();

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
          {isLoading
              ? (<h2>Cargando amigos <Spinner></Spinner> </h2>)
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

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={'span'} fontWeight={700} color={'white'}>
    {children}
  </Text>
);

const stats = [
  {
    title: 'Team members',
    content: (
      <>
        {/* <StatsText>Sara María Ramírez Perez</StatsText> alias motosara <br/>
        <StatsText>Iván Vega García</StatsText> alias señor iván <br/>
        <StatsText>Mario Pérez</StatsText> alias (...)<br/>
        <StatsText>Elías Llera García-Riaño</StatsText> alias eli <br/>
        <StatsText>Silvia Suárez Prendes</StatsText> alias laquellora <br/>
        <StatsText>Dana</StatsText> alias cuac <br/> */}

        Sara María Ramírez Perez UO276188 <br />
        Iván Vega García UO276670 <br />
        Mario Pérez Fernández UO283720 <br />
        Elías Llera García-Riaño  UO271407 <br />
        Silvia Suárez Prendes UO277412 <br />
        Andrés Álvarez Murillo UO278249 <br />

      </>
    ),
  },
];