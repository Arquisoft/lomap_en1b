import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { Friend } from "../../types";

export const Entry = (friend : Friend) => {
  return (
    <Tr>
      <Td>{friend.profilePic}</Td>
      <Td>{friend.webId}</Td>
      <Td>{friend.nickName}</Td>
      <Td>{friend.name}</Td>
      <Td>Aqui van los botones</Td>
      {/* <Td>
        <BtnEdit /> <BtnRemove />
      </Td> */}
    </Tr>
  );
};