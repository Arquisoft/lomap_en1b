import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from 'react-leaflet';
import React, { useState } from 'react';
import {
    Box, Button,
    Card,
    CardBody, Checkbox,
    Flex, FormControl, FormLabel,
    Heading, Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Select,
    Stack,
    StackDivider,
    Text, useDisclosure
} from '@chakra-ui/react';
import "../css/react_leaflet.css";
import 'leaflet/dist/leaflet.css';
import { LatLng, LatLngExpression } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';
import {useSelector, useDispatch} from 'react-redux';
import {useAddLocationMutation, useGetLocationsQuery} from "../app/services/Location";
import type { MapMarker } from '../types';
import {LocationType} from "../locationType";
//import {addLocation, selectAllLocations} from "../app/services/Location";

export function LocationMarkerWithStore() {
    // const [position, setPosition] : LatLng = {lat: 0, lng: 0};
    const dispatch = useDispatch();
    const [lati, setLat] = useState(0);
    const [lngi, setLng] = useState(0);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [addLocationMutation, { isLoading, isError, error }] = useAddLocationMutation();
    

    const initialRef = React.useRef(null)
    var [name, setName] = React.useState('')
    var [category, setCategory] = React.useState('Bar')
    var [details, setDetails] = React.useState('')


    const map = useMapEvents({
        click: (e) => {
            e.target.
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);

            onOpen();
            setName('')
            setCategory('Bar')
            setDetails('')
        },

    })

    //Use .map to iterate and generate the corresponding markers
    //This need to be optimiced because I think it generates again
    //all the markers on top of each other
    return  (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered={true} size={'lg'}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                        <ModalCloseButton/>
                    </ModalHeader>
                    <ModalBody>
                        <form id={"formMarker"} onSubmit = {
                            (event) => {
                                event.preventDefault();
                                const marker : MapMarker = {latitude : lati, longitude : lngi,
                                    name: name,locationType: category as LocationType, id: lati + " - " + lngi};

                                const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                                    event.preventDefault();
                                    addLocationMutation(marker);
                                };
                                handleSubmit(event)
                                setName('')
                                setCategory('')
                                setDetails('')
                            }}>
                            <FormControl isRequired={true}>
                                <FormLabel>Name</FormLabel>
                                <Input value={name} type={"text"} ref={initialRef}
                                       onChange={(e)=>setName(e.currentTarget.value)}/>
                            </FormControl>
                            <FormControl isRequired={true}>
                                <FormLabel>Category</FormLabel>
                                <Select value={category} onChange={(e)=>setCategory(e.currentTarget.value)}>
                                    <option>bar</option>
                                    <option>restaurant</option>
                                    <option>shop</option>
                                    <option>sight</option>
                                    <option>monument</option>
                                </Select>
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button form={"formMarker"} type={"submit"} onClick={onClose}>Place Marker</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
}

export default function MapElement(): JSX.Element {
    const escuela: LatLngExpression = { lat: 43.354, lng: -5.851 };
    const { data: locations, error, isLoading } = useGetLocationsQuery();
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>

            <Stack>
                <MapContainer center={escuela} zoom={13} scrollWheelZoom={true}>        <LocationMarkerWithStore/>
                    <Button colorScheme='blue' zIndex={'1300'} float={'right'} width={'10rem'} onClick={FilterModal}>Filter</Button>

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations?.map((location: MapMarker) => (
                        <Marker key={location.id}
                                position={[location.latitude, location.longitude]}
                                icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40]})}>
                            <Popup>
                                <PopupContent name={location.name}
                                              locationType={location.locationType}
                                              id={location.id}
                                              latitude={location.latitude}
                                              longitude={location.longitude}/>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Stack>
        </Flex>
    );
}

export function FilterModal() {
    const {isOpen, onClose, onOpen} = useDisclosure();
    onOpen();
    const [checkedItems, setCheckedItems] = React.useState([true,true,true,true,true,true,true])

    const allChecked = checkedItems.every(Boolean)

    return(<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'lg'}>
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <ModalCloseButton/>
                </ModalHeader>
                <ModalBody>
                    <Checkbox isChecked={checkedItems[0]}onChange={(e) => setCheckedItems([e.target.checked, checkedItems[0]])}
                    >Bars
                    </Checkbox>
                    <Checkbox isChecked={checkedItems[1]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                    >Restaurants
                    </Checkbox>
                    <Checkbox isChecked={checkedItems[2]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[2]])}
                    >Shops
                    </Checkbox>
                    <Checkbox isChecked={checkedItems[3]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[3]])}
                    >Sights
                    </Checkbox>
                    <Checkbox isChecked={checkedItems[4]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[4]])}
                    >Monuments
                    </Checkbox>
                    <Checkbox isChecked={checkedItems[5]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[5]])}
                    >My Locations
                    </Checkbox>
                    <Checkbox isChecked={checkedItems[6]} onChange={(e) => setCheckedItems([e.target.checked, checkedItems[6]])}
                    >Shared Locations
                    </Checkbox>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    </Modal>);
}


export function PopupContent(marker: MapMarker){
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
                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                            Address
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            https://nominatim.openstreetmap.org/reverse?format=geojson&lat= {marker.latitude}&lon={marker.longitude}.["features"].["display_name"]
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}