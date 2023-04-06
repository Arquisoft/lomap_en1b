import React from "react";
import { Tr, Td, Avatar, Button } from "@chakra-ui/react";
import { Friend } from "../../types";
import { friendApi } from "../../app/services/Friend";

export const Entry = (friend: Friend) => {
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