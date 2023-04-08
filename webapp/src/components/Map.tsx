import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from 'react-leaflet';
import React, {useEffect, useState} from 'react';
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
import {useAddLocationMutation, useGetLocationsQuery, setDisplayedLocations, selectDisplayedLocations} from "../app/services/Location";
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
    const escuela: LatLngExpression = {lat: 43.354, lng: -5.851};
    //const {data: locations, error, isLoading} = useGetLocationsQuery();
    let locations : MapMarker[] = [
        { id:"asdasdasdfh", name:"Bar", locationType: LocationType.bar, latitude:43.354, longitude:-5.851},
        { id:"asdasasdadj", name:"Restaurant", locationType: LocationType.restaurant, latitude:43.374, longitude:-5.871},
        { id:"asdagfgsdfg", name:"Shop", locationType: LocationType.shop, latitude:43.314, longitude:-5.811},
        { id:"asdagfggdfl", name:"Sight", locationType: LocationType.sight, latitude:43.334, longitude:-5.831}];
    setDisplayedLocations(locations);
    const displayedLocations = useSelector(selectDisplayedLocations);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}>

            <Stack>
                <MapContainer center={escuela} zoom={13} scrollWheelZoom={true}>
                    <FilterModal/>
                    <LocationMarkerWithStore/>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {displayedLocations?.map((location: MapMarker) => (
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
    const [checkedItems, setCheckedItems] = React.useState([true,true,true,true,true,true,true])
    return(
      <>
        <Button colorScheme='blue' zIndex={'1300'} float={'right'} width={'10rem'} onClick={onOpen}>Filter Locations</Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={'md'}>
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <ModalCloseButton/>
                </ModalHeader>
                <ModalBody>
                    <Stack spacing={2} direction='column'>
                        <Checkbox isChecked={checkedItems[FilterEnum.Bars]}onChange={(e) =>
                            [e.target.checked,filterLocations(checkedItems)]}>Bars</Checkbox>

                        <Checkbox isChecked={checkedItems[FilterEnum.Restaurants]} onChange={(e) =>
                            [e.target.checked,filterLocations(checkedItems)]}>Restaurants</Checkbox>

                        <Checkbox isChecked={checkedItems[FilterEnum.Shops]} onChange={(e) =>
                            [e.target.checked,filterLocations(checkedItems)]}>Shops</Checkbox>

                        <Checkbox isChecked={checkedItems[FilterEnum.Sights]} onChange={(e) =>
                            [e.target.checked,filterLocations(checkedItems)]}>Sights</Checkbox>

                        <Checkbox isChecked={checkedItems[FilterEnum.Monuments]} onChange={(e) =>
                            [e.target.checked,filterLocations(checkedItems)]}>Monuments</Checkbox>

                        <Checkbox isChecked={checkedItems[FilterEnum.MyLocations]} onChange={(e) =>
                            [e.target.checked,filterLocations(checkedItems)]}>My Locations</Checkbox>

                        <Checkbox isChecked={checkedItems[FilterEnum.SharedLocations]} onChange={(e) =>
                            [e.target.checked,filterLocations(checkedItems)]}>Shared Locations</Checkbox>
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

function filterLocations(checkedItems: boolean[]) {
    let filteredLoc: MapMarker[] = [];
    let finalLoc : MapMarker[] = [];
    //const {data: locations, error, isLoading} = useGetLocationsQuery();
    let locations : MapMarker[] = [
        { id:"asdasdasdfh", name:"Bar", locationType: LocationType.bar, latitude:43.354, longitude:-5.851},
        { id:"asdasasdadj", name:"Restaurant", locationType: LocationType.restaurant, latitude:43.374, longitude:-5.871},
        { id:"asdagfgsdfg", name:"Shop", locationType: LocationType.shop, latitude:43.314, longitude:-5.811},
        { id:"asdagfggdfl", name:"Sight", locationType: LocationType.sight, latitude:43.334, longitude:-5.831}];
    filteredLoc.concat(locations);
    //if(checkedItems[FilterEnum.MyLocations]) {
    //    filteredLoc.concat(locations?.filter((loc) => loc.locationType === LocationType.bar)!);
    //}
    //if(checkedItems[FilterEnum.SharedLocations]) {
    //    filteredLoc.concat(locations?.filter((loc) => loc.locationType === LocationType.bar)!);
    //}
    if(checkedItems[FilterEnum.Bars]) {
        finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.bar));
    }
    if(checkedItems[FilterEnum.Restaurants]) {
        finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.restaurant));
    }
    if(checkedItems[FilterEnum.Shops]) {
        finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.shop));
    }
    if(checkedItems[FilterEnum.Sights]) {
        finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.sight));
    }
    if(checkedItems[FilterEnum.Monuments]) {
        finalLoc.concat(filteredLoc.filter((loc) => loc.locationType === LocationType.monument));
    }
    setDisplayedLocations(finalLoc);
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