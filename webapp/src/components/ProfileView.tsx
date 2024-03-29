import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    useColorModeValue,
    Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {useGetUserDataQuery} from "../app/services/User";
import React from "react";

export default function ProfileView() : JSX.Element {
    const navigate = useNavigate();
    const {data: user, error, isLoading} = useGetUserDataQuery();
    const boxBg = useColorModeValue('white', 'gray.900')
    const textColor = useColorModeValue('gray.700', 'gray.400')

    return (
        <Center style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {isLoading
                ? (<h2>Loading profile <Spinner></Spinner> </h2>)
                : ( <Box
                        maxW={'100vh'}
                        maxH={'800vh'}
                        w={'full'}
                        bg= {boxBg}
                        boxShadow={'1xl'}
                        rounded={'lg'}
                        p={6}
                        textAlign={'center'}>

                        <Avatar
                            size={'xl'}
                            src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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
                            {user!.name}
                        </Heading>
                        <Text fontWeight={600} color={'gray.500'} mb={4}>
                            {user!.webId}
                        </Text>

                        <Stack mt={8} direction={'row'} spacing={4}>
                            <Button
                                onClick={() => navigate('/map')}
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
                                Map
                            </Button>
                            <Button
                                onClick={() => navigate('/friends')}
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
                                Friends
                            </Button>
                        </Stack>
                    </Box>
                )}
        </Center>
    );
}