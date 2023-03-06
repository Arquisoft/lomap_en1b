import {useLoginMutation} from "../app/services/Auth";
import {Box, Button, CloseButton, useDisclosure} from "@chakra-ui/react";

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

function Index(){
    const [login, { isLoading, error }] = useLoginMutation()

    const handleLogin =async (providerURI:String) => {
        try{
            await login(providerURI).unwrap();
        }catch (e){
            onOpen()
        }
    }
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: false })

    return isVisible ? (
        <Alert status='error'>
            <AlertIcon />
            <Box>
                <AlertTitle>ERROR!</AlertTitle>
                <AlertDescription>
                   There was an error while processing your request!
                </AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : (
        <Button isLoading={isLoading} onClick={() => handleLogin("test")}>Submit test login</Button>
    )
}


export default Index;