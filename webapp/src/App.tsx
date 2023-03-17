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
import Bar from './components/Bar';


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


// without navigation bar
// function App() {
//   return (
//       <RouterProvider router={router} />
//     );
// }

// export default App;



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
      
        {/* for testing purposes */}
        <Route path="/navbar" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;