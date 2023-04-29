import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {Review} from "../../types";

export const reviewApi = createApi({
    reducerPath: 'review',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8082/' }),
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], string>({
            query: (locationID) => ({
                url:`review/https://storage.inrupt.com/2b40442a-5cc1-4c63-b066-a83317c39…f/private/lomap/reviews#034901c3-bb86-4ae6-bd59-ea90b6ad17e4`,
                credentials:"include",
            })
        }),
        /*
                getReviews: builder.query<Review[], string>({
            query: (locationID) => ({
                url:`review/`+JSON.stringify(locationID),
                credentials:"include",
            })
        }),
         */
        // Omit metemos una localización y da igual que no tenga un id asignado
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
            })
        })
    }),
})


export const {useAddReviewMutation, useGetReviewsQuery} = reviewApi
