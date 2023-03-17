import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import './App.css';
import LoginForm from './components/Login';
import MapElement from './components/Map';


import Index from "./routes";
import Error404 from "./routes/404error";

import Map from "./components/Map"

import HomePage from './components/Home';
import AboutPage from './components/About';

import NavBar from './components/NavBar';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <Error404 />,
  },
  {
    path: "/map",
    element: <MapElement />,
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
    path: "/navbar",
    element: <NavBar />,
  },
]);



function App() {
  <RouterProvider router={router} />;
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/map" element={<Map />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;