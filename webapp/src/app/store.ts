import {configureStore, ThunkAction, Action, createSlice} from '@reduxjs/toolkit';
import {locationApi} from "./services/Location";
import {friendApi} from "./services/Friend";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{ isLoggedIn: false },
    reducers: {
        confirm: (state) => {state.isLoggedIn = true},
        logout:  (state) => {state.isLoggedIn = false},
    }
})

export const store = configureStore({
<<<<<<< HEAD
    reducer: {
        [locationApi.reducerPath]: locationApi.reducer,
        "auth": authSlice.reducer
=======
  reducer: {
    [locationApi.reducerPath]: locationApi.reducer,
      [friendApi.reducerPath]: friendApi.reducer,
>>>>>>> bd24d27d8c0abe58ea1bdbe1a7bd81549a0237a9
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
          locationApi.middleware,
          friendApi.middleware
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
