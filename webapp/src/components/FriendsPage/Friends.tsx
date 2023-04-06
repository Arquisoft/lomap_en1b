import { ReactNode } from 'react';
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
} from '@chakra-ui/react';
import {friendApi} from "../../app/services/Friend";
import { Friend } from '../../types';
import { Entry } from './Entry';

const friendsMock : Friend[] = [{
      "nickName" : "nickname1",
      "name": "name1",
      "webId" : "webId1",
      "profilePic" : "profilePic1",
      "loMapOnly" : true
  },
  {
      "nickName" : "nickname2",
      "name": "name2",
      "webId" : "webId2",
      "profilePic" : "profilePic2",
      "loMapOnly" : true
  },
  {
      "nickName" : "nickname3",
      "name": "name3",
      "webId" : "webId3",
      "profilePic" : "profilePic3",
      "loMapOnly" : true
  },
  {
      "nickName" : "nickname4",
      "name": "name4",
      "webId" : "webId4",
      "profilePic" : "profilePic4",
      "loMapOnly" : false
  },
  {
      "nickName" : "nickname5",
      "name": "name5",
      "webId" : "webId5",
      "profilePic" : "profilePic5",
      "loMapOnly" : true
  },
  {
      "nickName" : "nickname6",
      "name": "name6",
      "webId" : "webId6",
      "profilePic" : "profilePic6",
      "loMapOnly" : true
  },
  {
      "nickName" : "nickname7",
      "name": "name7",
      "webId" : "webId7",
      "profilePic" : "profilePic7",
      "loMapOnly" : false
  }];

export default function FriendsView(): JSX.Element {

  return (
    
    
    <Grid>

        {friendsMock.length > 0 ? (
         <Table variant="striped" colorScheme="black" size="sm">
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
            {friendsMock.map((friend, index) => (
              <Entry {...friend} key={index} />
            ))}
          </Tbody>
        </Table>
        ) : (
          <h2>No tienes amigos... </h2>
        )}
    </Grid>



    
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