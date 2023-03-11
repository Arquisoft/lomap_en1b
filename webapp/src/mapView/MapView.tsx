import styled from "@emotion/styled";
import 'leaflet/dist/leaflet.css';
import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, useMap ,Marker,useMapEvents,Popup} from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import type { MapMarker } from '../app/services/types/types';
import { Icon } from 'leaflet';
import {
    addMarker,selectMapState
} from './MapViewSlice'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, Button, useDisclosure,
    Card, CardHeader, CardBody, CardFooter, Stack, StackDivider, Box, Heading, Text
} from '@chakra-ui/react'


export function LocationMarker() {
    const dispatch = useDispatch();
    // const [position, setPosition] : LatLng = {lat: 0, lng: 0};
    const [lati, setLat] = useState(0);
    const [lngi, setLng] = useState(0);
    const {isOpen, onClose, onOpen} = useDisclosure();

    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);

            onOpen();
        },
    });
    const initialRef = React.useRef(null)
    var [name, setName] = React.useState('')
    var [category, setCategory] = React.useState('')
    var [details, setDetails] = React.useState('')

    return (
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered={true} size={'md'}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>
                    </ModalHeader>
                    <ModalBody>
                        <form id={"formMarker"} onSubmit = {
                            (event) => {
                                event.preventDefault();
                                const locMarker : MapMarker = {lat : lati, lng : lngi,
                                    name: name,category: category, details: details, id: lati + " - " + lngi};
                                dispatch(addMarker(locMarker));
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
                                <Input value={category} type={"text"}
                                       onChange={(e)=>setCategory(e.currentTarget.value)}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Details</FormLabel>
                                <Input value={details}  type={"text"}
                                       onChange={(e)=>setDetails(e.currentTarget.value)}/>
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button form={"formMarker"} type={"submit"} onClick={onClose}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    )
}

export default function MapView() {
    const stateMap = useSelector(selectMapState);

     return (
        <ScreenContainer>
             <MapContainer center={stateMap.center} zoom={stateMap.zoom} scrollWheelZoom={true} style={{ height: "100vh", width: "100%"}}>
                 <LocationMarker/>
                 {stateMap.markers.map(location => (
                     <Marker key={location.id} position={[location.lat, location.lng]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40]})}>
                         <Popup>
                             <PopupContent name={location.name} category={location.category} details={location.details} id={location.id} lat={location.lat} lng={location.lng}/>
                         </Popup>
                     </Marker>
                 ))}
                 <TileLayer
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
             </MapContainer>
        </ScreenContainer>
     );
}

export function PopupContent(marker: MapMarker){
    return(
        <Card>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Name:
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {marker.name}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Category:
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {marker.category}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase'>
                            Details:
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            {marker.details}
                        </Text>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}

const ScreenContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`
