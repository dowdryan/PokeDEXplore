import React from "react";
import { Routes, Route } from "react-router-dom";
import Pokedex from '../Pokemon/Pokedex';
import PokemonEntry from '../Pokemon/PokemonEntry';
import Favorites from "../Pokemon/Favorite";

// Lists all available routes.
function NotFound() {
    return (
      <div>
        <h2>404 Not Found</h2>
        <p>The page you're looking for does not exist.</p>
      </div>
    );
  }

function RoutesList() {
    console.debug("Routes");
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            {/* <Route path="/login" element={<LoginForm login={login} />} /> */}
            <Route path="/:name" element={<PokemonEntry />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RoutesList;
