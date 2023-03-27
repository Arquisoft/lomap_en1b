import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Friend } from '../../types'
import {MapMarker} from "../../types";

export const friendApi = createApi({
    reducerPath: 'friendship',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://4255db99-902a-464f-aa3a-e89ffa1a77fe.mock.pstmn.io' }),
    endpoints: (builder ) => ({
        /*
        getFriends: builder.query<Friend[], void>({
            query: (name) => ({
                url:`friendship`,
                credentials:"include"
            })
        }),

         */
        getFriends: builder.query<Friend[], void>({
            query: () => "friendsip",
            transformResponse: (response: Friend[]) => {
                let copy = [
                    {
                        "nickName" : "string",
                        "name": "string",
                        "webId" : "string",
                        "profilePic" : "string",
                        true
                    },
                    {
                        "nickName" : "string",
                        "name": "string",
                        "webId" : "string",
                        "profilePic" : "string",
                        true
                    }
                ];
                return copy;
            },
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
        removeFriend: builder.mutation<void, Friend>({
            query: (friend) => ({
                url: `location/${friend.podId}`,
                method: 'DELETE',
            }),
        }),
    }),
})


export const {useAddFriendMutation, useRemoveFriendMutation, useGetFriendsQuery} = friendApi
