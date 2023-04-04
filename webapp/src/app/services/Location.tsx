import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { RootState } from "../store";
import type { MapMarker } from '../../types';
import {RootState} from "../store";
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
            query: (name) => ({
                url:`location`,
                credentials:"include"
            })
        }),
        // Omit metemos una localización y da igual que no tenga un id asignado
        addLocation: builder.mutation<void, MapMarker>({
            query: (newLocation) => ({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                url: `location`,
                credentials:"include",
                method: 'POST',
                mode:"cors",
                body: JSON.stringify({location: newLocation })
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
export const { useGetLocationsQuery, useAddLocationMutation} = locationApi

//I created a Slice to store the location in the store so that we can test without using the API
interface DisplayedLocationsState {
    displayedLocations: MapMarker[];
}
const initialState: DisplayedLocationsState = {
    displayedLocations: [],
};

// actions dont change the state
// reducers change the state

export const displayedLocationsSlice = createSlice({
    name: 'displayedLocationsSlice',
    initialState: initialState,
    reducers: {
        setDisplayedLocations: (state, action) => {
            initialState.displayedLocations = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDisplayedLocations } = displayedLocationsSlice.actions
export const selectDisplayedLocations = (state: RootState) => state.displayedLocations.displayedLocations;

//export const { getLocations}
//export default locationSlice.reducer;
//export const selectAllLocations = (state: RootState) => state.location.locations;
