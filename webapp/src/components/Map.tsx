import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from 'react-leaflet';
import React, { useState } from 'react';
import {
    Box, Button,
    Card,
    CardBody,
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

    const initialRef = React.useRef(null)
    var [name, setName] = React.useState('')
    var [category, setCategory] = React.useState('Bar')
    var [details, setDetails] = React.useState('')


    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);

            onOpen();
            setName('')
            setCategory('Bar')
            setDetails('')
        },

    })

    //Get all the locations
    const locations = useGetLocationsQuery();

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
                                const marker : MapMarker = {lat : lati, lng : lngi,
                                    name: name,category: category, details: details, id: lati + " - " + lngi};

                                const handleSubmit = (marker: MapMarker) => {
                                    useAddLocationMutation();
                                }
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
                                    <option>Bar</option>
                                    <option>Building</option>
                                    <option>House</option>
                                    <option>Institution</option>
                                    <option>Monument</option>
                                    <option>Park</option>
                                    <option>Restaurant</option>
                                    <option>Shop</option>
                                    <option>Sight</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Details</FormLabel>
                                <Input value={details}  type={"text"}
                                       onChange={(e)=>setDetails(e.currentTarget.value)}/>
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
                <MapContainer center={escuela} zoom={13} scrollWheelZoom={true}>
                    <LocationMarkerWithStore/>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map(location => (
                        <Marker key={location.id} position={[location.latitude, location.longitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40]})}>
                            <Popup>
                                <PopupContent name={location.name} locationType={location.locationType} id={location.id} latitude={location.latitude} longitude={location.longitude}/>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </Stack>
        </Flex>
    );
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
                </Stack>
            </CardBody>
        </Card>
    )
}