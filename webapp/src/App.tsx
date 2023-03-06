import React from 'react';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; //package for routes
import LoginForm from './components/Login';

import Index from "./routes";
import Error404 from "./routes/404error";
import HomePage from './components/Home';
import AboutPage from './components/About';

  
const router = createBrowserRouter([
  {
    path: "/login",
    element:<LoginForm />,
  },
  {
    path: "/",
    element:<HomePage />,
  },
  // TODO
  {
    path: "/about",
    element:<AboutPage />,
  }
  
  /*{
    path: "/",
    element: <Index />,
    errorElement: <Error404 />,
    children: [

    ]
  }*/
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
