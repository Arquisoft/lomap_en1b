import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";

export default function HomePage(): JSX.Element {

  const navigate = useNavigate();
  // @ts-ignore
  const loggedIn = useSelector(state  => state.auth.isLoggedIn );

  return (
    <Flex
      align={"center"}
      justify={"center"}
      w={'full'}
      h={'100vh'}
      backgroundImage={
        'url(https://images.pexels.com/photos/35969/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'4xl'} align={'center'} spacing={1}>
          <Text
            color={'white'}
            fontWeight={600}
            lineHeight={2}
            fontSize={"6xl"}>
            LoMap📍
          </Text>
          <Stack>
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'blue.800' }}
              onClick={loggedIn ? () => navigate('/map') :() => navigate('/login')}>
              Start
            </Button>
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'blue.800' }}
              onClick={() => navigate('/about')}
              variant={"outlined"}>
              About...
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}