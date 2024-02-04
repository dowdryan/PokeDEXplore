// RoutesList.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Pokedex from '../Pokedex';
import PokemonEntry from '../PokemonEntry';
// import LoginForm from '../auth/LoginForm';

function RoutesList({ login, signup }) {
    console.debug("Routes");
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            {/* <Route path="/login" element={<LoginForm login={login} />} /> */}
            <Route path="/:name" element={<PokemonEntry />} />
        </Routes>
    );
}

export default RoutesList;
