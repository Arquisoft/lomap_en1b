import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store, authSlice } from '../app/store'
function ConfirmLogin(){
    const navigate = useNavigate()
    // @ts-ignore
    const loggedIn = useSelector(state  => state.auth.isLoggedIn );

    useEffect(() => {
        if(!loggedIn) navigate("/map");
        store.dispatch(authSlice.actions.confirm());
        navigate("/map");
    }, [])

    return (<Spinner />)
}


export default ConfirmLogin;