import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css';

import Index from "./routes";
import Error404 from "./routes/404error";
import LoginConfirm from "./routes/LoginConfirm";

const router = createBrowserRouter([
  {
    path: "/auth",
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
    path: "/auth/loginconfirm",
    element: <LoginConfirm />,
    errorElement: <Error404 />,
    children: [

    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
