import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pokedex from './Pokemon/Pokedex';
import PokemonEntry from './Pokemon/PokemonEntry';
import Favorites from "./Pokemon/Favorite";
import NotFoundPage from "./NotFound"


/**
 * DOCUMENT HERE
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:name" element={<PokemonEntry />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* 404 doesn't work */}
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;