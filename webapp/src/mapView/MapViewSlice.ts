import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import L from 'leaflet';

export interface MapState {
    center: [number,number],
    zoomControl: boolean,
    zoom: number,
    markers: MarkerObj[]
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
    center: [43.354, -5.851 ],
    zoomControl: true,
    zoom: 12,
    markers:[]
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addMarker : (state,marker) => {
            initialState.markers.push(marker.payload);
        }
        /**
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
         */
    },
});

export const selectMapState = (state: RootState) => state.map;

export const { addMarker } = mapSlice.actions;

export default mapSlice.reducer;
