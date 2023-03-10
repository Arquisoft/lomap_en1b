import styled from "@emotion/styled";
import React, { Component,useState,useEffect } from 'react';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Stack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap ,Marker,useMapEvents,Popup} from 'react-leaflet';
import { LatLng, LatLngExpression } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {useAppDispatch, useAppSelector} from '../app/hooks';
import type { MyLocation } from '../app/services/types/types';
import { Icon } from 'leaflet';
import {
    addMarker,selectMapState
} from './MapViewSlice'


export function LocationMarker() {
    const dispatch = useDispatch();
    // const [position, setPosition] : LatLng = {lat: 0, lng: 0};
    const [lati, setLat] = useState(0);
    const [lngi, setLng] = useState(0);

    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);

            console.log(e.latlng);

        const locMarker : MyLocation = {lat : e.latlng.lat, lng : e.latlng.lng, id: e.latlng.lat + " - " + e.latlng.lng};
        dispatch(addMarker(locMarker));
        },
    });
    const stateMap = useAppSelector(selectMapState);

    return (
        <div>
            {stateMap.markers.map(location => (
                    <Marker position={[location.lat, location.lng]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40] })}>
                        <Popup>You are here</Popup>
                    </Marker>

                ))}
        </div>
    )
}


export default function MapView() {
    const dispatch = useAppDispatch();
    const stateMap = useAppSelector(selectMapState);

     return (
        <ScreenContainer>
             <MapContainer center={stateMap.center} zoom={stateMap.zoom} scrollWheelZoom={true} style={{ height: "100vh", width: "100%"}}>
                 <LocationMarker/>
                 <TileLayer
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
             </MapContainer>
        </ScreenContainer>
     );

}

const ScreenContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`
