import styled from "@emotion/styled";
import React, { Component,useState,useEffect } from 'react';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap ,Marker,useMapEvents,Popup} from 'react-leaflet';
import PropTypes from 'prop-types';

const markersLayer = L.featureGroup();


function MapView(){
    const dispatch = useDispatch();

    useEffect(() => {
        const map = L.map('map',
            {
                center: [-5.8447600, 43.3602900],
                zoomControl: true,
                zoom: 12
            });

        L.control
            .zoom({
                position: 'topright'
            })
            .addTo(map)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    });
    return (
      <ScreenContainer>
          <div>a</div>
          <MapContainer id={'map'}>
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