import React, { useState, useEffect } from 'react';

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; //package for routes
import Login from './components/Login';
import LoginForm from './components/LoginChakra';

import Index from "./routes";
import Error404 from "./routes/404error";

  useEffect(()=>{  },[]);

  
const router = createBrowserRouter([
  {
    path: "/login",
    element:<>Hello Login</>,
  },
  {
    path: "/",
    element: <Index />,
    errorElement: <Error404 />,
    children: [

    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="loginC" element={<LoginForm></LoginForm>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
