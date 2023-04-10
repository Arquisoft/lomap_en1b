import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";


function CheckLogin(){
    const navigate = useNavigate()
    // @ts-ignore
    const loggedIn = useSelector(state  => state.auth.isLoggedIn );


    useEffect(() => {
        if(!loggedIn) navigate("/login");
    }, [])

    return (<Outlet />)
}


export default CheckLogin;