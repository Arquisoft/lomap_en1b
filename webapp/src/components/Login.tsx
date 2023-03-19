import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    FormLabel,
  } from '@chakra-ui/react';
import { SetStateAction, useState } from 'react';
import {login} from "../app/services/Auth";
  
  
  export default function LoginForm(): JSX.Element {

    const [providerValue, setProviderValue] = useState('');
    
    const handleInputProvider : React.ChangeEventHandler<HTMLInputElement> = (e) => setProviderValue(e.target.value);
    
    const handleLogin =  () => {
      login(providerValue)
    };

    const handleButton = (prov: SetStateAction<string>)=>{
      setProviderValue(prov)
      handleLogin() 
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Login with your SOLID POD!
          </Heading>
        

          <FormControl isRequired id="provider">
            <FormLabel>Type your POD provider URL</FormLabel>
            <Input
              placeholder="https://example.com"
              isRequired = {true}
              _placeholder={{ color: 'gray.500' }}
              type="url"
              value={providerValue}
              onChange={handleInputProvider}
            />
          </FormControl>

          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              variant="contained"
              color={'white'}
              _hover={{
                bg: 'blue.800',
              }}
              onClick={handleLogin}>
              Log in 
            </Button>
          </Stack>

          <Stack>
            <Text
              fontSize={{ base: 'sm', sm: 'md' }}
              color={useColorModeValue('gray.800', 'gray.400')}>
              Or choose your provider:
            </Text>

            <Button
              bg={'purple.400'}
              variant="outlined"
              color={'white'}
              _hover={{
                bg: 'purple.800',
              }}
              onClick={() => handleButton("https://solidcommunity.net/login")}>
              Solid Community
            </Button>

            <Button
              bg={'purple.400'}
              variant="outlined"
              color={'white'}
              _hover={{
                bg: 'purple.800',
              }}
              onClick={() => handleButton("https://solidweb.org/login")
              }>
              Solid Web
            </Button>

            <Button
              bg={'purple.400'}
              variant="outlined"
              color={'white'}
              _hover={{
                bg: 'purple.800',
              }}
              onClick={() => 
                setProviderValue("https://inrupt.net/login")
              }>
              Inrupt.net
            </Button>

            <Button
              bg={'purple.400'}
              variant="outlined"
              color={'white'}
              _hover={{
                bg: 'purple.800',
              }}
              onClick={() => handleButton("https://auth.inrupt.com/login?response_type=code&client_id=291nuca1atm91cstojs8ndsbkh&scope=openid+openid+profile&redirect_uri=https%3A%2F%2Flogin.inrupt.com%2Fcallback&state=1874cb6e-8358-4974-b916-2457141b23c4")
              }>
              pod.Inrupt.net
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
