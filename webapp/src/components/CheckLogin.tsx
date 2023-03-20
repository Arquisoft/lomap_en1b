import {logout} from "../app/services/Auth";
import {Button} from "@chakra-ui/react";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";


function CheckLogin(){
    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = /*useSelector((state) => state.loggedin )*/ true;
        if(!loggedIn) navigate("/login");
    }, [])

    return (<Outlet />)
}


export default CheckLogin;