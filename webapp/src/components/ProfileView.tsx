import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

export default function SocialProfileSimple() {
    return (
        <Center style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Box
                maxW={'100vh'}
                maxH={'800vh'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'1xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={
                        'https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=2000'
                    }
                    mb={4}
                    pos={'relative'}
                    _after={
                        {
                            content: '""',
                            w: 4,
                            h: 4,
                            bg: 'green.300',
                            border: '2px solid white',
                            rounded: 'full',
                            pos: 'absolute',
                            bottom: 0,
                            right: 3,
                        }
                    }
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    Lucía Pérez Sánchez 
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    @luciaps
                </Text>
                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>
                    [Insertar biografía aquí jaja]
                    
                    {/* {' '}
                    <Link href={'#'} color={'blue.400'}>
                        #tag
                    </Link>
                    {' '} */}

                </Text>

                {/* <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #art
                    </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #photography
                    </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontWeight={'400'}>
                        #music
                    </Badge>
                </Stack> */}

                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'md'}
                        rounded={'full'}
                        bg={'gray.300'}
                        _hover={{
                            bg: 'gray.400',
                        }}
                        _focus={{
                            bg: 'gray.600',
                        }}>
                        Locations
                    </Button>
                    <Button
                        flex={1}
                        fontSize={'md'}
                        rounded={'full'}
                        bg={'gray.300'}
                        // boxShadow={
                        //     '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        // }
                        _hover={{
                            bg: 'gray.400',
                        }}
                        _focus={{
                            bg: 'gray.600',
                        }}>
                        Friends
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}