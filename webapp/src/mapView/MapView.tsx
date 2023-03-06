import styled from "@emotion/styled";
import React, { Component,useState} from 'react';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap ,Marker,useMapEvents,Popup} from 'react-leaflet';

const dispatch = useDispatch();


const mapParams = {
    center: [-5.8447600,  43.3602900],
    zoomControl: true,
    zoom: 12,
};


const MapView = () => {
  var map = L.map('map')

  L.control
    .zoom({
      position: 'topright'
    })
    .addTo(map)


    return (
      <ScreenContainer id="mapid">
      <MapContainer center= {[-5.8447600,  43.3602900]} zoomControl= {true} zoom= {12}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </ScreenContainer>
    )

}


const ScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`  

export default MapView;