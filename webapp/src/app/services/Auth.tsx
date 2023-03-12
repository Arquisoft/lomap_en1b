import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: 'locationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://4255db99-902a-464f-aa3a-e89ffa1a77fe.mock.pstmn.io' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (providerURL : String) => ({
                url: `login`,
                method: 'POST',
                body: providerURL,
            })
        }),
        logout: builder.query({
            query: () => '/logout'
        }),
    }),
})


export const {useLoginMutation, useLogoutQuery} = authApi
