import {MapMarker} from "../../types";
import {
    Box,
    Button, Checkbox,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel, Heading, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select,
    Stack, Text, Textarea, Image,
    useDisclosure, Flex, HStack, DrawerFooter, Spacer, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, PopoverCloseButton
} from "@chakra-ui/react";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddLocationMutation} from "../../app/services/Location";
import {useMapEvents} from "react-leaflet";
import {LocationType} from "../../locationType";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

export default function DetailsDrawer(marker: MapMarker) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const comments : String[] = ["Comentario prueba 1","Comentario prueba 2","Comentario prueba 2","Comentario prueba 2","Comentario prueba 2","Comentario prueba 2","Comentario prueba 2","Comentario prueba 2"];

    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>
                Details
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={'xs'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize={24}><br/><br/>{marker.name}
                        <Flex gap={2}>
                            <ReactStars
                            count={5}
                            value={3}
                            size={24}
                            activeColor="#ffd700"
                            /> 3
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <h1>Reviews</h1>
                                <Stack spacing={'24px'} direction='column'>
                                    {comments.map( (comment) => (
                                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                            <Image src='gibbresh.png' loading={"lazy"} fallbackSrc='https://via.placeholder.com/150'/>
                                            <ReactStars count={5} value={3} size={24} activeColor="#ffd700"/>
                                            {comment}
                                        </Box>
                                        ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <AddCommentForm/>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export function AddCommentForm() {
    const dispatch = useDispatch();
    const {isOpen, onClose, onOpen} = useDisclosure();

    const initialRef = React.useRef(null)
    var [textComment, setTextComment] = React.useState('')
    var [isShared, setShared] = React.useState(false)

    var [rating, changeRating] = React.useState(0)

    //Use .map to iterate and generate the corresponding markers
    //This need to be optimiced because I think it generates again
    //all the markers on top of each other
    return  (
        <>
            <Button colorScheme='teal' onClick={onOpen}>
                Add a Review
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered={true} size={'lg'}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader fontSize={24}>
                            Add Review
                            <Spacer />
                                <InformationPopup/>
                            <ModalCloseButton/>
                        </ModalHeader>
                        <ModalBody>
                            <form>
                                <Box borderColor="gray.300" borderStyle="dashed" borderWidth="2px"
                                    rounded="md" shadow="sm" role="group" transition="all 150ms ease-in-out"
                                    _hover={{
                                        shadow: "md"
                                    }}
                                >
                                    <Box position="relative" height="100%" width="100%">
                                        <Box
                                            position="relative"
                                            top="0" left="0"
                                            height="100%" width="100%"
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Stack height="100%" width="100%" display="flex"
                                                alignItems="center" justify="center" spacing="4">

                                                <Stack p="8" textAlign="center" spacing="1">
                                                    <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                                                        Drop images here
                                                    </Heading>
                                                    <Text fontWeight="light">or click to upload an image</Text>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                        <Input
                                            type="file"
                                            height="100%" width="100%"
                                            position="absolute"
                                            top="0" left="0"
                                            opacity="0"
                                            aria-hidden="true"
                                            accept="image/*"
                                        />
                                    </Box>
                                </Box>
                                <Stack spacing={2} direction='column'>
                                    <FormControl>
                                        <Text mb='8px'>Comments: {textComment}</Text>
                                        <Textarea
                                            value={textComment}
                                            onChange={(e)=>setTextComment(e.currentTarget.value)}
                                            size='sm'
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Rating</FormLabel>
                                        <ReactStars
                                            count={5}
                                            value={rating}
                                            onChange={changeRating}
                                            size={24}
                                            activeColor="#ffd700"
                                        />
                                    </FormControl>
                                </Stack>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button form={"formMarker"} type={"submit"} onClick={onClose}>Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
}

export function InformationPopup(){
    return(
        <>
            <Popover>
                <PopoverTrigger>
                    <Button>?</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Adding Reviews</PopoverHeader>
                    <PopoverBody>While adding a review you can upload an image, add a score or/and add
                    a text comment without or adding any of the other two but you must submit at least one.</PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
}