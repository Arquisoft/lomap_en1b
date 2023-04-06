import React from 'react';
import { Outlet } from 'react-router-dom'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css';
import LoginForm from './components/Login';
import MapElement from './components/Map';


import Error404 from "./routes/404error";

import HomePage from './components/Home';
import AboutPage from './components/About';

import NavBar from './components/NavBar';
import CheckLogin from "./components/CheckLogin";
import ConfirmLogin from "./components/ConfirmLogin";


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


      {
        path: "/",
        element: <CheckLogin />,
        children: [
          {
            path: "/map",
            element: <MapElement />,
          }
        ]
      },
    ]
  },
]);





function App() {
   return (<RouterProvider router={router} />);
}




export default App;