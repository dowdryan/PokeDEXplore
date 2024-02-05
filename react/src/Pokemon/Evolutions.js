import React, { useState, useEffect } from 'react';
import Helpers from '../Helpers/Helpers';
import FetchPokemonData from '../Data/fetchPokemonData';
import axios from 'axios';

// Lists all available evolutions for a pokemon
function Evolutions({ pokemon }) {
  const pokemonData = FetchPokemonData(pokemon);
  const { CapitalizePokemonWithHyphen } = Helpers;
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
        const evolutionChainUrl = response.data.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);
        const evolutionArray = [];
        const extractEvolutions = (evolutionChain) => {
          const evolutions = [];
          const recursiveExtract = (evolutionChain) => {
            if (!evolutionChain) return;
            const speciesName = CapitalizePokemonWithHyphen(evolutionChain.species.name);
            evolutions.push(speciesName);
            if (evolutionChain.evolves_to && evolutionChain.evolves_to.length > 0) {
              evolutionChain.evolves_to.forEach((evolution) => {
                recursiveExtract(evolution);
              });
            }
          };
          recursiveExtract(evolutionChain);
          return evolutions;
        };
        evolutionArray.push(...extractEvolutions(evolutionResponse.data.chain));
        setEvolutionChain(evolutionArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [pokemon]);

  if (!evolutionChain) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <hr></hr>
      <h3>Evolutions:</h3>
      {evolutionChain.length === 1 ? (
        <p>{CapitalizePokemonWithHyphen(pokemonData.name)} does not evolve.</p>
      ) : (
        <ul>
          {evolutionChain.map((evolution, index) => (
            <li key={index}>
              {evolution}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Evolutions;