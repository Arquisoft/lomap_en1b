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
import type { MapMarker } from '../app/services/types';
import {addLocation, selectAllLocations} from "../app/services/Location";

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
    const locations = useSelector(selectAllLocations);

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
                                const locMarker : MapMarker = {lat : lati, lng : lngi,
                                    name: name,category: category, details: details, id: lati + " - " + lngi};
                                dispatch(addLocation(locMarker));
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
    const locations = useSelector(selectAllLocations);
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
                        <Marker key={location.id} position={[location.lat, location.lng]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40]})}>
                            <Popup>
                                <PopupContent name={location.name} category={location.category} details={location.details} id={location.id} lat={location.lat} lng={location.lng}/>
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
                            {marker.category}
                        </Text>
                    </Box>
                    <Box>
                        <Heading size='sm' textTransform='uppercase'>
                            Details
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



/*
type Marcador = {
    latitude: number;
    longitud: number;
    texto: string;
};


let marcador1 : Marcador = {latitude: 43.354, longitud: -5.851, texto:"Escuela, Marcador 1"};
let marcador2 : Marcador = {latitude: 43.36483, longitud: -5.85427, texto:"Marcador2"};
let marcador3 : Marcador = {latitude: 43.35520, longitud: -5.85514, texto:"Marcador3"};

let listaMarcadores : Marcador[] = [];  //lista de marcadores
listaMarcadores.push(marcador1, marcador2, marcador3);

export function LocationMarker() {
    let marcador : Marcador = {
        latitude: 0,
        longitud: 0,
        texto: ''
    };

    const map = useMapEvents({
        click: (e) => {
            marcador.latitude = e.latlng.lat;
            marcador.longitud = e.latlng.lng;
            marcador.texto = "Prueba click";
            listaMarcadores.push(marcador);
            console.log(listaMarcadores);
            // setLat(e.latlng.lat);
            // setLng(e.latlng.lng);
        },
    })

    

    return null;
}

export default function MapElement(): JSX.Element {
    const escuela: LatLngExpression = { lat: 43.354, lng: -5.851 };

    const AddMarker = () => {

        let marcador : Marcador = {
            latitude: 0,
            longitud: 0,
            texto: ''
        };

        const map = useMapEvents({
            click: (e) => {
                marcador.latitude = e.latlng.lat;
                marcador.longitud = e.latlng.lng;
                marcador.texto = "Prueba click";
                // setLat(e.latlng.lat);
                // setLng(e.latlng.lng);
            },
        })

        listaMarcadores.push(marcador);
        console.log(listaMarcadores);
    };



    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>

            <Stack>
                <MapContainer center={escuela} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LocationMarker/>
                    {/* Prints a marker per each location element stored in the list listaMarcadores.
                        TODO must be replaced with PODS
                        No se updatea cuando se añade un marcador :( 
                            REDUX dispatch???
                    */
                   
                   /*     }
                    {listaMarcadores.length > 0 && (
                        listaMarcadores.map( (marcador : Marcador) =>
                            (
                                <Marker position={[marcador.latitude, marcador.longitud]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40] })}>
                                    <Popup>
                                        {marcador.texto}
                                    </Popup>
                                </Marker>
                            )
                        )
                    )}

                </MapContainer>
            </Stack>
        </Flex>
    );
}
*/