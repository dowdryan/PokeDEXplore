import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoutesList from "./Routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
