import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from 'react-leaflet';
import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    Checkbox,
    CheckboxGroup,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
    CardFooter,
    ButtonGroup, Spinner, AlertIcon, AlertTitle, AlertDescription, Alert, useToast, createStandaloneToast
} from '@chakra-ui/react';
import "../css/react_leaflet.css";
import 'leaflet/dist/leaflet.css';
import {Icon, LatLngExpression} from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {useDispatch, useSelector} from 'react-redux';
import {useAddLocationMutation, useGetLocationsQuery} from "../app/services/Location";
import type {MapMarker} from '../types';
import {LocationType} from "../locationType";
import DetailsDrawer from './mapComponents/LocationReviewsView'

export function LocationMarkerWithStore() {
    const dispatch = useDispatch();
    const [lati, setLat] = useState(0);
    const [lngi, setLng] = useState(0);
    const {isOpen, onClose, onOpen} = useDisclosure();
    let [addLocationMutation, {isLoading, isError, error}] = useAddLocationMutation();

    const initialRef = React.useRef(null)
    var [name, setName] = React.useState('')
    var [category, setCategory] = React.useState('bar')
    var [isShared, setShared] = React.useState(false)

    var [locationAdded, setLocationAdded] = React.useState(false)
    const { ToastContainer, toast } = createStandaloneToast()
    const idToast = 'addedLocSuccess-Toast'

    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);

            onOpen();
            setName('')
            setCategory('bar')
            setShared(false)
        },

    })

    //Use .map to iterate and generate the corresponding markers
    //This need to be optimiced because I think it generates again
    //all the markers on top of each other
    return  (
        <>
        {locationAdded && !toast.isActive(idToast) ?
                (setLocationAdded(false),toast({
                        id: idToast,
                        title: 'Marker Added',
                        description: "New Location added succesfully.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })) :
                (<Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered={true} size={'lg'}>
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader>
                                <ModalCloseButton/>
                            </ModalHeader>
                            <ModalBody>
                                <form id={"formMarker"} onSubmit={
                                    (event) => {
                                        event.preventDefault();
                                        const marker: MapMarker = {
                                            latitude: lati,
                                            longitude: lngi,
                                            name: name,
                                            locationType: category as LocationType,
                                            id: lati + " - " + lngi,
                                            isShared: isShared,
                                            owner: ""
                                        };

                                        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                                            event.preventDefault();
                                            addLocationMutation(marker);
                                            if(!isError) {
                                                setLocationAdded(true);
                                            }
                                        };
                                        handleSubmit(event)
                                        setName('')
                                        setCategory('bar')
                                        setShared(false)
                                    }}>
                                    <Stack spacing={2} direction='column'>
                                        <FormControl isRequired={true}>
                                            <FormLabel>Name</FormLabel>
                                            <Input value={name} type={"text"} ref={initialRef}
                                                   onChange={(e) => setName(e.currentTarget.value)}/>
                                        </FormControl>
                                        <FormControl isRequired={true}>
                                            <FormLabel>Category</FormLabel>
                                            <Select value={category}
                                                    onChange={(e) => setCategory(e.currentTarget.value)}>
                                                <option>bar</option>
                                                <option>restaurant</option>
                                                <option>shop</option>
                                                <option>sight</option>
                                                <option>monument</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl isRequired={false}>
                                            <Checkbox isChecked={isShared}
                                                      onChange={(e) => setShared(e.target.checked)}>
                                                Public
                                            </Checkbox>
                                        </FormControl>
                                    </Stack>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button form={"formMarker"} type={"submit"} onClick={onClose}>Place Marker</Button>
                            </ModalFooter>
                        </ModalContent>
                    </ModalOverlay>
                </Modal>)
        }
        </>
    );
}

export default function MapElement(): JSX.Element {
    const escuela: LatLngExpression = {lat: 43.354, lng: -5.851};
    const {data: locations, error, isLoading} = useGetLocationsQuery();
    const dispatch = useDispatch()

    const [showBars, setShowBars] = useState(true)
    const [showRestaurants, setShowRestaurants] = useState(true)
    const [showShops, setShowShops] = useState(true)
    const [showSights, setShowSights] = useState(true)
    const [showMonuments, setShowMonuments] = useState(true)
    const [showSharedLocations, setShowSharedLocations] = useState(true)

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>

            <Stack>
                <Flex>
                    <FilterModal
                        showRestaurants={() => showRestaurants} setShowRestaurants={setShowRestaurants}
                        showBars={() => showBars} setShowBars={setShowBars}
                        showShops={() => showShops} setShowShops={setShowShops}
                        showSights={() => showSights} setShowSights={setShowSights}
                        showMonuments={() => showMonuments} setShowMonuments={setShowMonuments}
                        showSharedLocations={() => showSharedLocations} setShowSharedLocations={setShowSharedLocations}
                    />
                </Flex>
                <MapContainer center={escuela} zoom={13} scrollWheelZoom={true}>
                    <LocationMarkerWithStore />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {isLoading
                        ?
                        (<Alert zIndex={'1400'} status={'info'} variant='solid'>
                            <AlertIcon  height='50px'/>
                            <AlertTitle fontSize={17}>Loading markers </AlertTitle>
                            <AlertDescription> <Spinner thickness='3.2px' size={'lg'}></Spinner></AlertDescription>
                        </Alert>) :
                    <>
                    ({locations?.filter( loc => {
                        if(loc.isShared && showSharedLocations == false) return false
                        if(loc.locationType == LocationType.restaurant && showRestaurants) return true
                        if(loc.locationType == LocationType.bar && showBars) return true
                        if(loc.locationType == LocationType.shop && showShops) return true
                        if(loc.locationType == LocationType.sight && showSights) return true
                        if(loc.locationType == LocationType.monument && showMonuments) return true

                    })
                        .map((location: MapMarker) => (
                        <Marker key={location.id}
                                position={[location.latitude, location.longitude]}
                                icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40]})}>
                            <Popup>
                                <PopupContent name={location.name}
                                              locationType={location.locationType}
                                              id={location.id}
                                              latitude={location.latitude}
                                              longitude={location.longitude}
                                              isShared={location.isShared}
                                              owner={location.owner}
                                />
                            </Popup>
                        </Marker>
                    ))})
                    </>
                    }
                </MapContainer>
            </Stack>
        </Flex>
    );
}

interface FilterModalProps {
    showRestaurants : () => boolean,
    setShowRestaurants :  React.Dispatch<React.SetStateAction<boolean>>,
    showBars : () => boolean,
    setShowBars : React.Dispatch<React.SetStateAction<boolean>>,
    showShops : () => boolean,
    setShowShops : React.Dispatch<React.SetStateAction<boolean>>,
    showSights : () => boolean,
    setShowSights : React.Dispatch<React.SetStateAction<boolean>>,
    showMonuments : () => boolean,
    setShowMonuments  : React.Dispatch<React.SetStateAction<boolean>>,
    showSharedLocations  : () => boolean,
    setShowSharedLocations : React.Dispatch<React.SetStateAction<boolean>>,
}

export const FilterModal : FC<FilterModalProps> = ( props ) : JSX.Element => {
    const {isOpen, onClose, onOpen} = useDisclosure();

    const data = {
        types: [
            { id: "bars", name: "Bars", value: props.showBars, onChange: props.setShowBars },
            { id: "restaurants", name: "Restaurants", value: props.showRestaurants, onChange: props.setShowRestaurants },
            { id: "shops", name: "Shops", value: props.showShops, onChange: props.setShowShops },
            { id: "sights", name: "Sights", value: props.showSights, onChange: props.setShowSights },
            { id: "monuments", name: "Monuments", value: props.showMonuments, onChange: props.setShowMonuments },
            { id: "sharedLocations", name: "Shared Locations", value: props.showSharedLocations, onChange: props.setShowSharedLocations }
        ]
    };

    const propsChecked = (props.showBars() && props.showRestaurants() && props.showShops()
    && props.showMonuments() && props.showSharedLocations() && props.showSights());

    return (
        <>
            <Button colorScheme='blue' zIndex={'1300'} float={'right'} width={'10rem'} onClick={onOpen}>Filter
                Locations</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'md'}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            <ModalCloseButton/>
                        </ModalHeader>
                        <ModalBody>
                            <CheckboxGroup>
                                <Checkbox
                                    isChecked={propsChecked}
                                    onChange={(e) =>
                                        data.types.forEach(element=> element.onChange(e.target.checked))
                                    }>
                                    Show all
                                </Checkbox>
                                <Stack pl={6} mt={1} spacing={2} direction='column'>
                                        {data.types.map((type, index) => (
                                            <Checkbox
                                                 key={type.id}
                                                isChecked={type.value()}
                                                onChange={e => type.onChange(!type.value())}
                                                >
                                                {type.name}
                                            </Checkbox>
                                        ))}
                                </Stack>
                            </CheckboxGroup>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}

export function PopupContent(marker: MapMarker){

    const deleteAction = ()=> {

    }
    return(
            <Card size={'sm'}>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4' minWidth={'sm'}>
                        <Box>
                            <Heading size='sm' textTransform='uppercase'>
                                Name
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {marker.name}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='sm' textTransform='uppercase'>
                                Category
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {marker.locationType}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <ButtonGroup spacing='2'>
                        <DetailsDrawer name={marker.name}
                                       locationType={marker.locationType}
                                       id={marker.id}
                                       latitude={marker.latitude}
                                       longitude={marker.longitude}
                                       isShared={marker.isShared}
                                       owner={marker.owner}/>
                        {marker.owner=="" ?<Button colorScheme={"red"} onClick={deleteAction}>
                            Delete marker
                        </Button> : <></> }
                    </ButtonGroup>
                </CardFooter>
            </Card>
    )
}
