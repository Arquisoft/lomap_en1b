import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {Review} from "../../types";

export const reviewApi = createApi({
    reducerPath: 'review',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.lomap.mariopdev.com/' }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], string>({
            query: (locationID) => ({
                url:`review/${locationID}`,
                credentials:"include",
            }),
            providesTags:['Reviews']
        }),
        addReview: builder.mutation<void, Review>({
            query: (newReview) => ({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                url: `review`,
                credentials:"include",
                method: 'POST',
                mode:"cors",
                body: JSON.stringify({review: newReview}),
            }),
            invalidatesTags:['Reviews']
        })
    }),
})


export const {useAddReviewMutation, useGetReviewsQuery} = reviewApi
