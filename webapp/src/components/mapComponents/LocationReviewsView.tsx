import {MapMarker, Review} from "../../types";
import {
    Box,
    Button,
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
    ModalOverlay,
    Stack, Text, Textarea, Image,
    useDisclosure, Flex, DrawerFooter, Spacer, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, PopoverCloseButton
} from "@chakra-ui/react";
import React, {ChangeEvent, useState} from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import {useAddReviewMutation, useGetReviewsQuery} from "../../app/services/Reviews";

export default function DetailsDrawer(marker: MapMarker) {
    console.log("[MARKER_ID: " + marker.id + "]");

    const {data: reviews, error, isLoading} = useGetReviewsQuery(marker.id);
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>
                Reviews
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
                                            <Image src={URL.createObjectURL(review.photo)} loading={"lazy"} fallbackSrc='https://via.placeholder.com/150'/>
                                            <ReactStars count={5} value={review.score} isHalf={true} size={28} activeColor="#ffd700" edit={false}/>
                                            <Box borderWidth='0.5px' >{review.comment}</Box>

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
    const {isOpen, onClose, onOpen} = useDisclosure();

    const initialRef = React.useRef(null)
    let [textComment, setTextComment] = React.useState("")
    let [rating, changeRating] = React.useState(0.0)

    const [file, setFile] = useState(new File([],""));
    const handleSetFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files != null && files.length > 0) {
            setFile(files[0]);
        }
    };

    const resetAndOpen = () => {
        onOpen()
        setTextComment("");
        changeRating(0.0);
        setFile(new File([],""));
    }

    const notAnySet = textComment.trim().length == 0 && file.name.trim() == "" && rating==0.0;

    return  (
        <>
            <Button colorScheme='teal' onClick={resetAndOpen}>
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
                                    const review : Review = {markerId:marker.id, comment:textComment, photo: file ,score:rating, encodedPhoto: ""};

                                    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                                        event.preventDefault();
                                        if(review.photo) {
                                            getBase64(file)
                                                .then(result => {
                                                    review.encodedPhoto = result;
                                                    addReviewMutation(review);
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                });
                                        }
                                    };

                                    const getBase64 = (file:File) => {
                                        return new Promise<string>(resolve => {
                                            let encoded = "";
                                            let reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onload = () => {
                                                encoded = reader.result as string;
                                                const base64String = (reader.result as string).replace('data:', '').replace(/^.+,/, '');
                                                resolve(base64String);
                                            };
                                        });
                                    };

                                    handleSubmit(event)
                                    addReviewMutation(review);
                                }}>
                                {(file.name != "") &&
                                    <Image src={URL.createObjectURL(file)} loading={"lazy"}
                                           fallbackSrc='https://via.placeholder.com/150'/>
                                }
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
                            <Button form={"formMarker"} type={"submit"} onClick={onClose}
                                    isDisabled={notAnySet}>Submit</Button>
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