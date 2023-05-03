import { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

export default function AboutPage(): JSX.Element {
  return (
    <Box bg={'gray.800'} position={'relative'}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: 'none', lg: 'flex' }}
        backgroundImage="url('/templates/stats-grid-with-image.png')"
        backgroundSize={'cover'}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position={'absolute'}
        width={'50%'}
        insetY={0}
        right={0}>
        <Flex
          bgGradient={'linear(to-r, gray.800 10%, transparent)'}
          w={'full'}
          h={'full'}
        />
      </Flex>
      <Container maxW={'7xl'} zIndex={10} position={'relative'}>
        <Stack direction={{ base: 'column', lg: 'row' }}>
          <Stack
            flex={1}
            color={'gray.400'}
            justify={{ lg: 'center' }}
            py={{ base: 4, md: 20, xl: 40 }}>
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={'heading'}
                fontWeight={700}
                textTransform={'uppercase'}
                mb={3}
                fontSize={'xl'}
                color={'gray.500'}>
                About LoMap
              </Text>
              <Heading
                color={'white'}
                mb={5}
                fontSize={{ base: '3xl', md: '5xl' }}>
                LoMap project
              </Heading>
              <Text fontSize={'2xl'} color={'gray.300'}>
              LoMap intends to be an easy-to-use tool for people to create, customize, and share personal maps filling them with the places they live.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={'heading'}
                    fontSize={'3xl'}
                    color={'white'}
                    mb={3}>
                    {stat.title}
                  </Text>
                  <Text fontSize={'xl'} color={'gray.400'}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}


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