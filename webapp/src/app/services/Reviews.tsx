import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {Review} from "../../types";

export const reviewApi = createApi({
    reducerPath: 'locationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://4255db99-902a-464f-aa3a-e89ffa1a77fe.mock.pstmn.io' }),
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], void>({
            query: (locationID) => ({
                url:`review/${locationID}`,
                credentials:"include"
            })
        }),
        // Omit metemos una localización y da igual que no tenga un id asignado
        addReview: builder.mutation<void, Review>({
            query: (newLocation) => ({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                url: `review`,
                credentials:"include",
                method: 'POST',
                mode:"cors",
                body: JSON.stringify({location: newLocation })
            })
        })
    }),
})


export const {useAddReviewMutation, useGetReviewsQuery} = reviewApi
