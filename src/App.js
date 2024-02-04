import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import Navigation from "./Routes/Navigation";
import RoutesList from "./Routes/Routes";

function App() {
  return (
    <BrowserRouter>
        <RoutesList/>
    </BrowserRouter>
  );
}

export default App;
