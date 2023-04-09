import {configureStore, ThunkAction, Action, createSlice} from '@reduxjs/toolkit';
import {locationApi} from "./services/Location";
import {displayedLocationsSlice} from "./services/DisplayedLocations"

export const authSlice = createSlice({
    name: 'auth',
    initialState:{ isLoggedIn: false },
    reducers: {
        confirm: (state) => {state.isLoggedIn = true},
        logout:  (state) => {state.isLoggedIn = false},
    }
})

export const store = configureStore({
    reducer: {
        [locationApi.reducerPath]: locationApi.reducer,
        "auth": authSlice.reducer,
        displayedLocations: displayedLocationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
          locationApi.middleware
      ),
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
