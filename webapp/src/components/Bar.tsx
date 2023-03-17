import { Link, useMatch, useResolvedPath, To } from "react-router-dom";
import React from 'react';
import logo from '../images/logo_img.jpg';
import { CustomLink } from "../CustomLink";

import { Button } from '@chakra-ui/react';


export default function Bar() {
    return (
        <nav className="menu">
            <ul>
                <Link to="/" className="site-title">
                    <img src={logo} alt="Logo" id="logo_img"></img>
                </Link>
                <CustomLink to="/" >Home</CustomLink>
                <CustomLink to="/login" >Login</CustomLink>
                <CustomLink to="/map">Map</CustomLink>
            </ul>
            <Button style={{ marginTop: 20 }} variant="contained" color="primary">
                Logout
            </Button>
        </nav>
    )
}