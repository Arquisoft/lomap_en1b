import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import L from 'leaflet';

export interface MapState {
    center: [number,number],
    zoomControl: boolean,
    zoom: number,
    markers: [{latitude: number, longitude:number}],
}

export class MarkerObj {
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    latitude = 0.0;
    longitude = 0.0;
}

const initialState: MapState = {
    markers: [{latitude: 42.354, longitude: -5.851}],
    center: [43.354, -5.851 ],
    zoomControl: true,
    zoom: 12
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addMarker: (state, action) => {
            var lat = action.payload.valueOf()[0];
            var long = action.payload.valueOf()[1];
            state.markers.push(lat);
        }
    },
});

export const selectMapState = (state: RootState) => state.map;

export const { addMarker } = mapSlice.actions;

export default mapSlice.reducer;
