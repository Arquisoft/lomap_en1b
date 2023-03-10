import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import type { MyLocation } from './types';

export const locationApi = createApi({
    reducerPath: 'locationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8082/' }),
    endpoints: (builder) => ({
        getLocations: builder.query<MyLocation[], void>({
            query: (name) => `location/`,
        }),
        addLocation: builder.mutation<void, Omit<MyLocation, 'id'>>({
            query: (newLocation) => ({
                url: `/locations`,
                method: 'POST',
                body: newLocation,
            })
        }),
        removeLocation: builder.mutation<void, MyLocation>({
            query: (location) => ({
                url: `/locations/${location}`,
                method: 'DELETE',
            }),
        }),
    }),
})

//I created a Slice to store the location in the store so that we can test without using the API
interface LocationsState {
    locations: MyLocation[];
}
const initialState: LocationsState = {
    locations: [],
};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<MyLocation>) =>{
            state.locations.push(action.payload);
        }
    },
});
export const selectAllLocations = (state: RootState) => state.location.locations;
export const {useGetLocationsQuery, useAddLocationMutation} = locationApi
export  const {addLocation} = locationSlice.actions;
export default locationSlice.reducer;
