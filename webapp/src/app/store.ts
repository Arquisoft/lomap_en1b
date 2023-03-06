import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {authApi} from "./services/Auth";
import {locationApi} from "./services/Location";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
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
