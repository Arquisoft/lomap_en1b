import {MapMarker, Review} from "../../types";
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
import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import {useAddReviewMutation, useGetReviewsQuery} from "../../app/services/Reviews";

export default function DetailsDrawer(marker: MapMarker) {
    const {data: reviews, error, isLoading} = useGetReviewsQuery();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    //const reviews : Review[] = [{markerId:"a", comment:"prueba", photo:new File([],"nombre"),score:2.5 }];

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
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <h1>Reviews</h1>
                                <Stack spacing={'24px'} direction='column'>
                                    {reviews?.map( (review) => (
                                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                            <Image src={review.photo.name} loading={"lazy"} fallbackSrc='https://via.placeholder.com/150'/>
                                            <ReactStars count={5} value={review.score} isHalf={true} size={28} activeColor="#ffd700" edit={false}/>
                                            {review.comment}
                                        </Box>
                                        ))}
                                </Stack>
                            </Box>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <AddCommentForm  name={marker.name}
                                         locationType={marker.locationType}
                                         id={marker.id}
                                         latitude={marker.latitude}
                                         longitude={marker.longitude}
                                         shared={marker.shared}/>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export function AddCommentForm(marker: MapMarker) {
    const [addReviewMutation, {isLoading, isError, error}] = useAddReviewMutation();
    const dispatch = useDispatch();
    const {isOpen, onClose, onOpen} = useDisclosure();

    const initialRef = React.useRef(null)
    let [textComment, setTextComment] = React.useState('')
    let [rating, changeRating] = React.useState(0)

    const [file, setFile] = useState(new File([],"a"));
    const handleSetFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files != null && files.length > 0) {
            setFile(files[0]);
        }
    };

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
                            <form id={"formMarker"} onSubmit = {
                                (event) => {
                                    event.preventDefault();
                                    const review : Review = {markerId:marker.id, comment:textComment, photo: file,score:rating};

                                    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                                        event.preventDefault();

                                        addReviewMutation(review);
                                    };
                                    handleSubmit(event)
                                }}>
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
                                            type="File"
                                            height="100%" width="100%"
                                            position="absolute"
                                            top="0" left="0"
                                            opacity="0"
                                            aria-hidden="true"
                                            accept="image/*"
                                            onChange={(event)=>handleSetFile(event)}
                                        />
                                        <image>

                                        </image>
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
                                            size={32}
                                            isHalf={true}
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