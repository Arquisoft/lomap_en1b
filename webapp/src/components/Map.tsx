import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, useMapEvent } from 'react-leaflet';
import React, { useState } from 'react';
import { Flex, Stack } from '@chakra-ui/react';
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
//    const [lati, setLat] = useState(0);
//    const [lngi, setLng] = useState(0);

    const map = useMapEvents({
        click: (e) => {
            //setLat();
            //setLng(e.latlng.lng);

            //Create the type
            const locMarker : MapMarker = {name : "", lat : e.latlng.lat, lng : e.latlng.lng, id: e.latlng.lat + " - " + e.latlng.lng};
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