import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
//import type { Location } from './types' //TODO: Importar el tipo

export const locationApi = createApi({
    reducerPath: 'location',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8082/' }),
    endpoints: (builder) => ({
        getLocations: builder.query<Location, string>({
            query: (name) => `location/`,
        }),
        //TODO: Check if this makes any sense
        addLocation: builder.mutation<void, Omit<Location, 'id'>>({
            query: (newLocation) => ({
                url: `/locations`,
                method: 'POST',
                body: newLocation,
            })
        }),
    }),
})

//I created a Slice to store the location in the store so that we can test without using the API
interface LocationsState {
    locations: Location[];
}
const initialState: LocationsState = {
    locations: [],
};

const locationsSlice = createSlice({
    name: 'locationStore',
    initialState,
    reducers: {
        addLocation: (state, action: PayloadAction<Location>) =>{
            state.locations.push(action.payload);
        }
    },
});


export const {useGetLocationsQuery} = locationApi
export  const {addLocation} = locationsSlice.actions;
