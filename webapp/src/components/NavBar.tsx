import {
    Avatar,
    Box,
    Flex,
    Stack,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    useDisclosure,
    Button
} from '@chakra-ui/react';
//import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';


import  { NavLink } from 'react-router-dom';
import '../css/nav.css';
import { logout } from '../app/services/Auth';

import { useNavigate } from 'react-router-dom';

// const NavLink = ({ children }: { children: ReactNode }) => (
//     <Link
//         px={2}
//         py={1}
//         rounded={'md'}
//         _hover={{
//             textDecoration: 'none',
//             bg: useColorModeValue('blue.200', 'blue.700'),
//         }}
//         href={'#'}>
//         {children}
//     </Link>
// );

/* {isOpen ? (
    <Box pb={4} display={{ md: 'none' }}>
        <Stack as={'nav'} spacing={4}>
            // TODO links of my profile page and log out
            <NavLink to="">My profile</NavLink>
            // logout not implemented yet
            <NavLink to="" onClick={logout}>Log out</NavLink>
        </Stack>
    </Box>
) : null} */





export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    return (
            <Box id={"navBar"} bg={useColorModeValue('white', 'blue')} px={4}>
                <Flex fontSize={16} h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Avatar
                            size={'md'}
                            src={
                                // logo picture
                                'https://cdn2.iconfinder.com/data/icons/on-point-social-media/141/Maps-512.png'
                            }
                        />
                        <HStack
                            as={'nav'}
                            spacing={5}
                            display={{ base: '0em', md: '42em' 
                                    //TODO responsive design
                                }}>

                            <NavLink to="/" className="nav_link">Home</NavLink>
                            <NavLink to="/login" className="nav_link">Login</NavLink>
                            <NavLink to="/map" className="nav_link">Map</NavLink>
                            <NavLink to="/about" className="nav_link">About</NavLink>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'md'}
                                    src={
                                        // TODO: profile picture of the user that is logged in 
                                        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                                    }
                                />
                            </MenuButton>
                            <MenuList fontSize={20} >
                                <MenuItem onClick={() => navigate('/profile')}>My profile</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={logout}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            // TODO links of my profile page and log out
                            <NavLink to="">My profile</NavLink>
                            // logout not implemented yet 
                            <NavLink to="/">Log out</NavLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
    );
}


