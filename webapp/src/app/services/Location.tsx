import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
//import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { RootState } from "../store";
import type { MapMarker } from '../../types';

/**
 * Creates slices automatically and they comunicate with the API.
 * A slice can comunicate with the API or not.
 *
 *
 * Two types: query for obtaining data (retrieving) [read-only] and mutation for modifying data [write]
 */
export const locationApi = createApi({
    reducerPath: 'location',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8082/' }),
    endpoints: (builder) => ({
        // MyLocation: what is returned
        // void: the type of data we pass as a parameter
        getLocations: builder.query<MapMarker[], void>({
            query: (name) => `location`,
        }),
        // Omit metemos una localización y da igual que no tenga un id asignado
        addLocation: builder.mutation<void, MapMarker>({
            query: (newLocation) => ({
                url: `location`,
                method: 'POST',
                body: newLocation,
            })
        }),
        removeLocation: builder.mutation<void, MapMarker>({
            query: (location) => ({
                url: `location/${location.id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

//I created a Slice to store the location in the store so that we can test without using the API
interface LocationsState {
    locations: MapMarker[];
}
const initialState: LocationsState = {
    locations: [],
};

// actions dont change the state
// reducers change the state
//export const locationSlice = createSlice({
//    name: 'locationTest',
//    initialState,
    // métodos: reducers y actions
    // reducers -> the only way to change the state of the locations, but only the part of the state u want to change
//    reducers: {
//        addLocation: (state, action: PayloadAction<MapMarker>) => {
//            state.locations.push(action.payload); // payload: the param you pass
//            state.locations.forEach(location => {
//                console.log(location.lat + " - " + location.lng);
//            }); // just for printing console
//            console.log();
//        }
//    },
//});

export const { useGetLocationsQuery, useAddLocationMutation} = locationApi
//export const { addLocation } = locationSlice.actions;
//export const { getLocations}
//export default locationSlice.reducer;
//export const selectAllLocations = (state: RootState) => state.location.locations;
