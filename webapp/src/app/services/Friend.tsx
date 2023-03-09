import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const friendApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://4255db99-902a-464f-aa3a-e89ffa1a77fe.mock.pstmn.io' }),
    endpoints: (builder) => ({
        addFriend: builder.mutation({
            query: (providerURL : String) => ({
                url: `login`,
                method: 'POST',
                body: providerURL,
            })
        }),
    }),
})


export const {useAddFriendMutation} = friendApi
