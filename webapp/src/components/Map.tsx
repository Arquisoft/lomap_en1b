import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from 'react-leaflet';
import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    Card,
    CardBody, Checkbox, CheckboxGroup,
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
import {setDisplayedLocations, selectDisplayedLocations} from "../app/services/DisplayedLocations";
import type { MapMarker } from '../types';
import {LocationType} from "../locationType";
//import {addLocation, selectAllLocations} from "../app/services/Location";
export enum FilterEnum {
    Bars, Restaurants, Shops, Sights,
    Monuments, MyLocations, SharedLocations,
}

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
    var [isShared, setShared] = React.useState(false)


    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);

            onOpen();
            setName('')
            setCategory('Bar')
            setDetails('')
            setShared(false)
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
                                    name: name,locationType: category as LocationType, id: lati + " - " + lngi,shared: isShared};

                                const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                                    event.preventDefault();
                                    addLocationMutation(marker);
                                };
                                handleSubmit(event)
                                setName('')
                                setCategory('Bar')
                                setDetails('')
                                setShared(false)
                            }}>
                            <Stack spacing={2} direction='column'>
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
        </Modal>
    );
}

export default function MapElement(): JSX.Element {
    const escuela: LatLngExpression = {lat: 43.354, lng: -5.851};
    const {data: locations, error, isLoading} = useGetLocationsQuery();
    setDisplayedLocations(locations!);
    let disLocations = useSelector(selectDisplayedLocations);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>

            <Stack>
                <Flex>
                    <FilterModal/>
                </Flex>
                <MapContainer center={escuela} zoom={13} scrollWheelZoom={true}>
                    <LocationMarkerWithStore/>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {disLocations.map((location: MapMarker) => (
                        <Marker key={location.id}
                                position={[location.latitude, location.longitude]}
                                icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40]})}>
                            <Popup>
                                <PopupContent name={location.name}
                                              locationType={location.locationType}
                                              id={location.id}

                                              latitude={location.latitude}
                                              longitude={location.longitude}
                                              shared={location.shared}
                                />
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
    const [checkedItems, setCheckedItems] = React.useState([true, true, true, true, true, true, true])
    const data = {
        types: [
            { id: "bars", name: "Bars" },
            { id: "restaurants", name: "Restaurants" },
            { id: "shops", name: "Shops" },
            { id: "sights", name: "Sights" },
            { id: "monuments", name: "Monuments" },
            { id: "myLocations", name: "My Locations" },
            { id: "sharedLocations", name: "Shared Locations" }
        ]
    };
    const {data: locations, error, isLoading} = useGetLocationsQuery();
    const filterLocations = function (checked: boolean, index: number) {
        let items = checkedItems;
        items = [
            ...items.slice(0, index),
            checked,
            ...items.slice(index + 1)
        ]
        setCheckedItems(items)
        let filteredLoc: MapMarker[] = [];
        let finalLoc : MapMarker[] = [];

        filteredLoc = filteredLoc.concat(locations!);
        //if(items[FilterEnum.MyLocations]) {
        //    filteredLoc = filteredLoc.concat(locations?.filter((loc) => loc.locationType === LocationType.bar)!);
        //}
        //if(items[FilterEnum.SharedLocations]) {
        //    filteredLoc = filteredLoc.concat(locations?.filter((loc) => loc.locationType === LocationType.bar)!);
        //}
        if(items[FilterEnum.Bars]) {
            finalLoc = finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.bar));
        }
        if(items[FilterEnum.Restaurants]) {
            finalLoc = finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.restaurant));
        }
        if(items[FilterEnum.Shops]) {
            finalLoc = finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.shop));
        }
        if(items[FilterEnum.Sights]) {
            finalLoc = finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.sight));
        }
        if(items[FilterEnum.Monuments]) {
            finalLoc = finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.monument));
        }
        console.log(finalLoc);
        setDisplayedLocations(finalLoc);
    };
    const displayedLoc = useSelector(selectDisplayedLocations);
    console.log(displayedLoc);


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
                            <Stack spacing={2} direction='column'>
                            <CheckboxGroup>
                                    {data.types.map((type, index) => (
                                        <Checkbox
                                            key={type.id}
                                            isChecked={checkedItems[index]}
                                            onChange={(e) => filterLocations(e.target.checked,index)}>
                                            {type.name}
                                        </Checkbox>
                                    ))}
                            </CheckboxGroup>
                            </Stack>
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