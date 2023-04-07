import React from "react";
import { Tr, Td, Avatar, Button } from "@chakra-ui/react";
import {Friend, MapMarker} from "../../types";
import { friendApi } from "../../app/services/Friend";
import {useRemoveFriendMutation} from "../../app/services/Friend";
import {LocationType} from "../../locationType";

export const Entry = (friend: Friend) => {
    let [removeFriendMutation, {isLoading, isError, error}] = useRemoveFriendMutation();


    return (
        <Tr>
            {/* <Td>{friend.profilePic}</Td> */}
            <Td>
                <Avatar
                    size={'md'}
                    src={
                        // TODO: profile picture of the user that is logged in 
                        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                    }
                /></Td>
            <Td>{friend.webId}</Td>
            <Td>{friend.nickName}</Td>
            <Td>{friend.name}</Td>
            <Td>
                {friend.loMapOnly ? (
                    <Button
                        size="sm"
                        colorScheme="gray"
                        variant="ghost"
                   
                        border="2px"
                        borderColor="gray.300"
                        onSubmit={
                            (event) => {
                                event.preventDefault();
                                const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
                                    event.preventDefault();
                                    removeFriendMutation(friend);
                                };
                                handleSubmit(event)
                            }

                        }
                    >
                        Remove
                    </Button>
                )
                : ("")}
            </Td>
            {/* <Td>
        <BtnEdit /> <BtnRemove />
      </Td> */}
        </Tr>
    );
};