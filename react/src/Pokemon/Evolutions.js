import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CapitalizePokemonWithHyphen } from '../Helpers/Helpers';
import FetchPokemonData from './Data/fetchPokemonData';
import axios from 'axios';


// Lists and renders all available evolutions for a pokemon
function Evolutions({ pokemon }) {
  const pokemonData = FetchPokemonData(pokemon);
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

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  if (!evolutionChain) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{textAlign: "center"}}>
      <hr></hr>
      <h3>Evolutions:</h3>
      {evolutionChain.length === 1 ? (
        <p>{CapitalizePokemonWithHyphen(pokemonData.name)} does not evolve.</p>
      ) : (
        <ul>
          {evolutionChain.map((evolution, index) => (
            <p key={index}>
              <Link to={`/${evolution}`} onClick={handleClick} style={{textDecoration: "none"}}>{evolution}</Link>
            </p>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Evolutions;
