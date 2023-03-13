import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Friend } from './types'

export const friendApi = createApi({
    reducerPath: 'friends',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://4255db99-902a-464f-aa3a-e89ffa1a77fe.mock.pstmn.io' }),
    endpoints: (builder) => ({
        addFriend: builder.mutation<void, Omit<Friend, 'id'>>({
            query: (newFriend) => ({
                url: `/locations`,
                method: 'POST',
                body: newFriend,
            })
        }),
        getFriends: builder.query<Friend[], void>({
            query: (name) => `friends/`,
        }),
    }),
})


export const {useAddFriendMutation, useGetFriendsQuery} = friendApi
