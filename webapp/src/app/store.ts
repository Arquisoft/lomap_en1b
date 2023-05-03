import {configureStore, createSlice, PreloadedState, combineReducers} from '@reduxjs/toolkit';
import {locationApi} from "./services/Location";
import {friendApi} from "./services/Friend";
import {reviewApi} from "./services/Reviews";
import {userApi} from "./services/User";
import * as querystring from "querystring";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{ isLoggedIn: false },
    reducers: {
        confirm: (state) => {state.isLoggedIn = true},
        logout:  (state) => {state.isLoggedIn = false},
    }
})

export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn


const rootReducer = combineReducers({
    [userApi.reducerPath]:userApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [friendApi.reducerPath]: friendApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    "auth": authSlice.reducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer:  rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                locationApi.middleware,
                userApi.middleware,
                friendApi.middleware,
                reviewApi.middleware
            ),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
