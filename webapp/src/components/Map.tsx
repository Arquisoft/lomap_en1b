import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from 'react-leaflet';
import React, { useState } from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import "../css/react_leaflet.css";
import 'leaflet/dist/leaflet.css';
import { LatLng, LatLngExpression } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';
import {useDispatch, useSelector} from "react-redux";
import type { MyLocation } from '../app/services/types';
import {addLocation, selectAllLocations} from "../app/services/Location";

export function LocationMarker() {
    // const [position, setPosition] : LatLng = {lat: 0, lng: 0};
    const [lati, setLat] = useState(0);
    const [lngi, setLng] = useState(0);
    
    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);


        },
    })

    return  (
        <Marker position={[lati, lngi]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40] })}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export function LocationMarkerWithStore() {
    // const [position, setPosition] : LatLng = {lat: 0, lng: 0};
    const dispatch = useDispatch();
//    const [lati, setLat] = useState(0);
//    const [lngi, setLng] = useState(0);

    const map = useMapEvents({
        click: (e) => {
            //setLat();
            //setLng(e.latlng.lng);

            //Create the type
            const locMarker : MyLocation = {lat : e.latlng.lat, lng : e.latlng.lng, id: e.latlng.lat + " - " + e.latlng.lng};
            //Store the location
            dispatch(addLocation(locMarker)); // dispatch executes a reducer or action 
        },

    })

    //Get all the locations
    const locations = useSelector(selectAllLocations);

    //Use .map to iterate and generate the corresponding markers
    //This need to be optimiced because I think it generates again
    //all the markers on top of each other
    return  (
        <div>
            {locations.map(location => (
                <Marker key={location.id} position={[location.lat, location.lng]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40] })}>
                    <Popup>You are here</Popup>
                </Marker>
            ))}
        </div>

    );
}


export default function MapElement(): JSX.Element {
    const escuela: LatLngExpression = { lat: 43.354, lng: -5.851 };
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
                    <Marker position={escuela} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40] })}>
                        <Popup>
                            School of Software Engineering <br /> Universidad de Oviedo.
                        </Popup>
                    </Marker>

                </MapContainer>
            </Stack>
        </Flex>
    );
}