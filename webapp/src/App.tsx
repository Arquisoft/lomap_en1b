import React from 'react';
import { Outlet } from 'react-router-dom'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import './App.css';
import LoginForm from './components/Login';
import MapElement from './components/Map';


import Error404 from "./routes/404error";

import Map from "./components/Map"

import HomePage from './components/Home';
import AboutPage from './components/About';

import NavBar from './components/NavBar';
import FriendsView from './components/FriendsPage/FriendsView';


const router = createBrowserRouter([
  {
    path: "/",
    element: <> <NavBar></NavBar><Outlet /> </>,
    children: [
      {
        path: "/map",
        element: <MapElement />,
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
      {
        path: "/friends",
        element: <FriendsView />,
      },
    ]
  },
]);





function App() {
   return (<RouterProvider router={router} />);
}




export default App;