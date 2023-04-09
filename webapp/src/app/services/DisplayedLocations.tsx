import {MapMarker} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


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
        setDisplayedLocations: (state, action : PayloadAction<MapMarker[]>) => {
            state.displayedLocations = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDisplayedLocations } = displayedLocationsSlice.actions
export const selectDisplayedLocations = (state: RootState) => state.displayedLocations;



