import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function HomePage(): JSX.Element {

  const handleStart = () => {
    var url: string = window.location + "login";
    window.location.replace(url)
  };

  const handleAbout = () => {
    var url: string = window.location + "about";
    window.location.replace(url)
  };

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
              onClick={handleStart}>
              Start
            </Button>
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'blue.800' }}
              onClick={handleAbout}
              variant={"outlined"}>
              About...
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}