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
                let copy : Friend[] = [{
                    "nickName" : "nickname1",
                    "name": "name1",
                    "webId" : "webId1",
                    "profilePic" : "profilePic1",
                    "loMapOnly" : true
                },
                    {
                        "nickName" : "nickname2",
                        "name": "name2",
                        "webId" : "webId2",
                        "profilePic" : "profilePic2",
                        "loMapOnly" : true
                    },
                    {
                        "nickName" : "nickname3",
                        "name": "name3",
                        "webId" : "webId3",
                        "profilePic" : "profilePic3",
                        "loMapOnly" : true
                    },
                    {
                        "nickName" : "nickname4",
                        "name": "name4",
                        "webId" : "webId4",
                        "profilePic" : "profilePic4",
                        "loMapOnly" : false
                    },
                    {
                        "nickName" : "nickname5",
                        "name": "name5",
                        "webId" : "webId5",
                        "profilePic" : "profilePic5",
                        "loMapOnly" : true
                    },
                    {
                        "nickName" : "nickname6",
                        "name": "name6",
                        "webId" : "webId6",
                        "profilePic" : "profilePic6",
                        "loMapOnly" : true
                    },
                    {
                        "nickName" : "nickname7",
                        "name": "name7",
                        "webId" : "webId7",
                        "profilePic" : "profilePic7",
                        "loMapOnly" : false
                    }];

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
                url: `location/${friend.webId}`,
                method: 'DELETE',
            }),
        }),
    }),
})


export const {useAddFriendMutation, useRemoveFriendMutation,useGetFriendsQuery} = friendApi