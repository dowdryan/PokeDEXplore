import React, { useState } from 'react';
import Helpers from '../Helpers/Helpers';
import FetchPokemonData from '../Data/fetchPokemonData';

// Gets the pokemon's type(s)
function Types({ pokemon }) {
    const { Capitalize } = Helpers;
    const pokemonData = FetchPokemonData(pokemon);
    const getTypeColor = (types) => {
        const typeColors = {
          normal: "#A8A77A",
          grass: "#7AC74C",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        };
        return typeColors[types] || "#FFFFFF"; // Default to white if the type is not found
    };
    return (
        <div>
            {pokemonData ? (
                <p className='Pokemon-Types' style={{ textAlign: 'center' }}>
                    {pokemonData.types.map((type, index) => (
                        <React.Fragment key={type.type.name}>
                        <span style={{
                            backgroundColor: getTypeColor(type.type.name),
                            border: `2px solid ${getTypeColor(type.type.name)}`,
                            borderRadius: '5px',
                            color: 'white',
                            marginRight: '5px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)', // Subtle shadow effect
                        }}>
                        {Capitalize(type.type.name)}
                        </span>
                    {index < pokemonData.types.length - 1 && <span>| </span>}
                    </React.Fragment>
                    ))}
                </p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Types