import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {authSlice, isLoggedInSelector} from '../app/store'
import { useAppDispatch, useAppSelector } from '../app/hooks'



function ConfirmLogin(){
    const navigate = useNavigate()
    const loggedIn = useAppSelector(isLoggedInSelector);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!loggedIn) navigate("/map");
        dispatch(authSlice.actions.confirm());
        navigate("/map");
    }, [])

    return (<Spinner />)
}


export default ConfirmLogin;