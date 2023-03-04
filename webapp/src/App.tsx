import React, { useState, useEffect } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; //package for routes
import Login from './components/Login';

function App(): JSX.Element {

  useEffect(()=>{  },[]);

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login></Login>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
