import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Capitalize, 
  CapitalizeHyphen, 
  CapitalizeWordsRemoveHyphen, 
  CapitalizePokemonWithHyphen 
 } from '../Helpers/Helpers';

// Fetches the pokemon's most recent pokedex description.
function PokedexDesc() {
    const { name } = useParams();
    const [description, setDescription] = useState('');
    const [speciesData, setSpeciesData] = useState(null);
    // const { Capitalize, CapitalizePokemonWithHyphen } = Helpers;

    useEffect(() => {
        const fetchSpeciesData = async () => {
          try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${CapitalizePokemonWithHyphen(name).toLowerCase()}`);
            setSpeciesData(response.data)
            const flavorTextEntries = response.data.flavor_text_entries;
            const englishFlavorText = flavorTextEntries.find((entry) => entry.language.name === 'en');
            setDescription(englishFlavorText 
            ? englishFlavorText.flavor_text
              .replace(/\f/g, ' ')
              .replace(/POKéMON/g, 'Pokémon')
              .replace(/TRAINER/g, 'Trainer')
            : 'No description available.')
          } catch (error) {
            console.error('Error fetching Pokemon description:', error);
          }
        };
        fetchSpeciesData();
      }, [name]);
    return (
        <div>
            {speciesData && (
                <p className='Pokemon-Description'
                    style={{
                      textAlign: 'center',
                      backgroundColor: "white",
                      color: "black",
                      border: '4px solid black',
                      borderRadius: '15px',
                      padding: '10px', 
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}>
                    {description}
                </p>
            )}
        </div>
    )
}

export default PokedexDesc

/**
 * Does not display entries for pokemon forms with hyphens 
   * (unless the link contains their dex number)
   * Ex: Giratina-Altered, Shaymin-Land, Landorus-Incarnate
   * Does display entries for both genders of Nidoran
 */