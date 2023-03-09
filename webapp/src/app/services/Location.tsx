import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
//import type { Location } from './types' //TODO: Importar el tipo

export const locationApi = createApi({
    reducerPath: 'location',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8082/' }),
    endpoints: (builder) => ({
        getLocations: builder.query<Location, string>({
            query: (name) => `location/`,
        }),
        addLocation: builder.query<Location, string>({
            query: (name) => `location/`,
        }),
    }),
})

export const {useGetLocationsQuery} = locationApi