import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {authApi} from "./services/Auth";
import {addLocation, locationApi} from "./services/Location";
import locationReducer from "./services/Location";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [location.reducerPath]: location.reducer,
    locationAPI: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
          authApi.middleware,
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
