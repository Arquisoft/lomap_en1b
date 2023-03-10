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
import { Icon } from 'leaflet';
import {
    addMarker,selectMapState,MarkerObj
} from './MapViewSlice'


export function LocationMarker() {
    const dispatch = useAppDispatch();
    // const [position, setPosition] : LatLng = {lat: 0, lng: 0};
    const [lati, setLat] = useState(0);
    const [lngi, setLng] = useState(0);

    const map = useMapEvents({
        click: (e) => {
            setLat(e.latlng.lat);
            setLng(e.latlng.lng);

            console.log(e.latlng);
        },
    });
    return(<Marker position={[lati, lngi]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40] })}>
        <Popup>You are here</Popup>
    </Marker>);
    dispatch(addMarker(new MarkerObj(lati,lngi)));
}

function MapView() {

    const stateMap = useAppSelector(selectMapState);

    if (stateMap.markers.length > 0) {
        return (
                <ScreenContainer>   <div>a</div>
                 <MapContainer center={stateMap.center} zoom={stateMap.zoom} scrollWheelZoom={true} style={{ height: "100vh", width: "100%"}}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {stateMap.markers.map(el => (
                        <Marker position={[el.latitude, el.longitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 45], iconAnchor: [10, 40] })}>
                            <Popup>You are here</Popup>
                        </Marker>

                    ))}
                </MapContainer>
            </ScreenContainer>
        );
    } else {
         return (
            <ScreenContainer>
                 <MapContainer center={stateMap.center} zoom={stateMap.zoom} scrollWheelZoom={true} style={{ height: "100vh", width: "100%"}}>
                     <TileLayer
                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                 </MapContainer>
            </ScreenContainer>
         );
   }
}

const ScreenContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

export default MapView;