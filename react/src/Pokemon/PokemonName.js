import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fixTypo, CapitalizePokemonWithHyphen } from '../Helpers/Helpers';
import FetchPokemonData from './Data/fetchPokemonData';
import axios from 'axios';

/**
 * Returns the pokemon's name and genus
  * Displays "Loading..." if a genus cannot be found.
 */
function PokemonName({ pokemon }) {
  const pokemonData = FetchPokemonData(pokemon);
  const { name } = useParams();
  const [genus, setGenus] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
        setSpeciesData(response.data)
        const flavorTextEntries = response.data.flavor_text_entries;
        const englishFlavorText = flavorTextEntries.find((entry) => entry.language.name === 'en');
        setDescription(englishFlavorText 
          ? englishFlavorText.flavor_text
            .replace(/\f/g, ' ')
            .replace(/POKéMON/g, 'Pokémon')
            .replace(/TRAINER/g, 'Trainer')
          : 'No description available.')
        const englishGenus = response.data.genera.find(genus => genus.language.name === 'en');
        if (englishGenus.genus.includes("Paladox")) {
          setGenus(fixTypo(englishGenus.genus, "Paladox", "Paradox")) // Fixes "Paladox Pokemon" typo.
        } else {
          setGenus(englishGenus.genus)
        }
      } catch (error) {
        console.error('Error fetching Pokemon description:', error);
      }
    };
  
    // Reset genus state before fetching new data
    setGenus(null);
    fetchSpeciesData();
  }, [name]);

  return (
    <div className='Pokemon-Name'>
        {pokemonData && (
            <div>
              <h1 className='Pokemon-Name'>#{pokemonData.id} | {CapitalizePokemonWithHyphen(pokemonData.name)}</h1>
            </div>)}
            {genus ? (
              <div>
                <h3
                  className='Pokemon-Genus'
                  style={{ marginTop: '-10px', marginBottom: '10px'}}>
                  {genus}
                </h3>
              </div>
            ) : (
              <div>
                <h3
                  className='Pokemon-Genus'
                  style={{ marginTop: '-10px', marginBottom: '10px'}}
                >Loading...</h3>
              </div>
            )}
    </div>
  );
}

export default PokemonName;