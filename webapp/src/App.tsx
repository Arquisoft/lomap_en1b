import React from 'react';
import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Index from "./routes";
import Error404 from "./routes/404error";
import MapView from "./features/mapView/MapView"

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
  },
  {
    path: "/map",
    element: <MapView />,
    errorElement: <Error404 />,
    children: [

    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
