import React from 'react';
import { Outlet } from 'react-router-dom'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import './App.css';
import LoginForm from './components/Login';
import MapElement from './components/Map';


import Error404 from "./routes/404error";

import HomePage from './components/Home';
import AboutPage from './components/About';
import ProfileView from './components/ProfileView';
import ConfirmLogin from './components/ConfirmLogin';
import CheckLogin from './components/CheckLogin';
import FriendsView from './components/FriendsPage/FriendsView';

import NavBar from './components/NavBar';


const router = createBrowserRouter([
  {
    path: "/",
    element: <> <NavBar /><Outlet /> </>,
    children: [

      // vvv Public routes vvv
      {
        path: "/login/confirm",
        element: <ConfirmLogin />,
        errorElement: <Error404 />,
      },
      {
        path: "/login",
        element: <LoginForm />,
        errorElement: <Error404 />,
      },
      {
        path: "/",
        element: <HomePage />,
        errorElement: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      //Protected routes
      {
        path: "/",
        element: <CheckLogin />,
        children: [
          {
            path: "/map",
            element: <MapElement />,

          },
          {
            path: "/friends",
            element: <FriendsView />,
          },
          {
            path: "/profile",
            element:<ProfileView />,
          },
        ]
      },
    ]
  },
]);





function App() {
  return (<RouterProvider router={router} />);
}




export default App;