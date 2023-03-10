import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import type { MapMarker } from '../app/services/types/types';
import L from 'leaflet';

export interface MapState {
    center: [number,number],
    zoomControl: boolean,
    zoom: number,
    markers: MapMarker[],
}


const initialState: MapState = {
    markers: [{lat : 43.354, lng : -5.851, id: "sdfsdf", name: "EII", category: "escuela"}],
    center: [43.354, -5.851],
    zoomControl: true,
    zoom: 12
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addMarker: (state, action: PayloadAction<MapMarker>) => {
            state.markers.push(action.payload);
        }
    },
});

export const selectMapState = (state: RootState) => state.map;

export const { addMarker } = mapSlice.actions;

export default mapSlice.reducer;
