import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';

function FetchSpeciesData({ pokemon }) {
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
            
            // Fixes "Paladox Pokemon" typo.
            if (englishGenus.genus.includes("Paladox")) {
              return setGenus(englishGenus.genus.replace("Paladox", "Paradox"))
            }
            
            setGenus(englishGenus.genus)
          } catch (error) {
            console.error('Error fetching Pokemon description:', error);
          }
        };
        fetchSpeciesData();
      }, [name]);
      return genus
}

export default FetchSpeciesData