import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { UserData } from '../../types'

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.lomap.mariopdev.com/' }),
    endpoints: (builder ) => ({
        getUserData: builder.query<UserData, void>({
            query: (name) => ({
                url:`userData`,
                credentials:"include"
            })
        }),
    }),
})
export const {useGetUserDataQuery} = userApi
