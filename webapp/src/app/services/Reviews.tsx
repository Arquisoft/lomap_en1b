import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reviewApi = createApi({
    reducerPath: 'locationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://4255db99-902a-464f-aa3a-e89ffa1a77fe.mock.pstmn.io' }),
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: () => '/logout'
        }),
    }),
})


export const {} = reviewApi
