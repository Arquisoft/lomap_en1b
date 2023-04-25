import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {Review} from "../../types";

export const reviewApi = createApi({
    reducerPath: 'review',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8082/' }),
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
