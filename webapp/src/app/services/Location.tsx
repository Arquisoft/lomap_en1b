import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { MapMarker } from '../../types';
import {Friend} from "../../types";

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
    tagTypes: ['Locations'],
    endpoints: (builder) => ({
        // MyLocation: what is returned
        // void: the type of data we pass as a parameter
        getLocations: builder.query<MapMarker[], void>({
            query: (name) => ({
                url:`location`,
                credentials:"include"
            }),
            providesTags:['Locations']
        }),
        //TODO: THIS IS A MOCK. Delete once friends api is completely functional
        getFriends: builder.query<Friend[], void>({
            query: (name) => ({
                url:`location`,
                credentials:"include"
            }),
            transformResponse: (response: Friend[]) => {
                const copy: Friend[] = [{
                    "nickName": "nickname1",
                    "name": "name1",
                    "webId": "webId1",
                    "profilePic": "profilePic1",
                    "loMapOnly": true
                },
                    {
                        "nickName": "nickname2",
                        "name": "name2",
                        "webId": "webId2",
                        "profilePic": "profilePic2",
                        "loMapOnly": true
                    },
                    {
                        "nickName": "nickname3",
                        "name": "name3",
                        "webId": "webId3",
                        "profilePic": "profilePic3",
                        "loMapOnly": true
                    },
                    {
                        "nickName": "nickname4",
                        "name": "name4",
                        "webId": "webId4",
                        "profilePic": "profilePic4",
                        "loMapOnly": false
                    },
                    {
                        "nickName": "nickname5",
                        "name": "name5",
                        "webId": "webId5",
                        "profilePic": "profilePic5",
                        "loMapOnly": true
                    },
                    {
                        "nickName": "nickname6",
                        "name": "name6",
                        "webId": "webId6",
                        "profilePic": "profilePic6",
                        "loMapOnly": true
                    },
                    {
                        "nickName": "nickname7",
                        "name": "name7",
                        "webId": "webId7",
                        "profilePic": "profilePic7",
                        "loMapOnly": false
                    }];

                return copy;
            },
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
            }),
            invalidatesTags: ['Locations']
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

export const { useGetLocationsQuery, useAddLocationMutation, useGetFriendsQuery} = locationApi
//export const { addLocation } = locationSlice.actions;
//export const { getLocations}
//export default locationSlice.reducer;
//export const selectAllLocations = (state: RootState) => state.location.locations;
