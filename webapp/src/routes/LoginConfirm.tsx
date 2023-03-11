import {useLocation, useNavigate} from "react-router-dom";
import {confirmLogin} from "../app/services/Auth";
import React from "react";
import {Spinner} from "@chakra-ui/react";


function LoginConfirm(){
    const navigate = useNavigate()
    const location = useLocation()
    confirmLogin(location.search).then(_ => navigate("/map")).catch(_ => navigate("/login"))


    return (<>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
        />
    </>);
}


export default LoginConfirm;