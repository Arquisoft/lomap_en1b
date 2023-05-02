import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Friend } from '../../types'
import {MapMarker} from "../../types";

export const friendApi = createApi({
    reducerPath: 'friendship',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.lomap.mariopdev.com/' }),
    endpoints: (builder ) => ({

        getFriends: builder.query<Friend[], void>({
            query: (name) => ({
                url:`friendship`,
                credentials:"include"
            })
        }),
        addFriend: builder.mutation<void , Friend>({
            query: (newFriend) => ({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                url: `friendship`,
                credentials:"include",
                method: 'POST',
                mode:"cors",
                body: JSON.stringify({friend: newFriend })
            }),
        }),
        //TODO: Once restapi implementation is done, use the correct URL. This is just a placeholder
        removeFriend: builder.mutation<void, Friend>({
            query: (friend) => ({
                url: `location/${friend.webId}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const {useAddFriendMutation, useRemoveFriendMutation,useGetFriendsQuery} = friendApi
