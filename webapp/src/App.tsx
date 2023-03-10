import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css';
import MapElement from './components/Map';

import Index from "./routes";
import Error404 from "./routes/404error";

const router = createBrowserRouter([
  {
    path: "/map",
    element:<MapElement/>,
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
}

export default App;
