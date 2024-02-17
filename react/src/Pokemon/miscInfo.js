import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Capitalize, 
  CapitalizeHyphen, 
  CapitalizeWordsRemoveHyphen, 
  CapitalizePokemonWithHyphen 
 } from '../Helpers/Helpers';
import axios from 'axios';

// Returns miscellaneous data about a pokemon, such as it's egg group, gender rate, etc. 
function MiscInfo() {
  const { name } = useParams();
  const [speciesData, setSpeciesData] = useState(null);
  const [eggGroups, setEggGroups] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state
  // const { CapitalizeHyphen } = Helpers;

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        setLoading(true);
        const exceptions = ['nidoran-m', 'nidoran-f', 'mr-mime', 'ho-oh', 'mime-jr',
        'porygon-z', 'type-null', 'jangmo-o', 'hakamo-o', 'kommo-o', 'tapu-koko',
        'tapu-lele', 'tapu-bulu', 'tapu-fini', 'mr-rime', 'ting-lu', 'chien-pao',
        'wo-chien', 'chi-yu', 'great-tusk', 'slither-wing', 'sandy-shocks', 
        'iron-treads', 'iron-bundle', 'iron-hands', 'iron-jugulis', 'iron-moth', 
        'iron-thorns', 'roaring-moon', 'iron-valiant', 'walking-wake', 'gouging-fire',
        'raging-bolt', 'iron-leaves', 'iron-boulder', 'iron-crown'];
        const cleanedName = exceptions.includes(name.toLowerCase()) ? name : name.replace(/-.*$/, '');
        // console.log(`https://pokeapi.co/api/v2/pokemon-species/${cleanedName.toLowerCase()}`)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${cleanedName.toLowerCase()}`);
        setSpeciesData(response.data);
        const eggGroupNames = await Promise.all(
          response.data.egg_groups.map(async (eggGroup) => {
            const eggGroupResponse = await axios.get(eggGroup.url);
            return eggGroupResponse.data.names.find((name) => name.language.name === 'en').name;
          })
        );

        setEggGroups(eggGroupNames);
      } catch (error) {
        console.error('Error fetching Pokemon description:', error);
      } finally {
        setLoading(false); // Set loading to false after the request is complete
      }
    };

    fetchSpeciesData();
  }, [name]);

  return (
    <div style={{textAlign: "center"}}>
      {loading ? (
        <p>Loading...</p>
      ) : speciesData ? (
        <>
          <p>Base Friendship: {speciesData.base_happiness}</p>
          <p>Catch Rate: {speciesData.capture_rate}</p>
          <p>Gender Ratio: {speciesData.gender_rate === -1 
              ? `Genderless` : speciesData.gender_rate === 8 
              ? 'Always Female' : speciesData.gender_rate === 0
              ? 'Always Male' : speciesData.gender_rate === 6
              ? 'Female 75%' : speciesData.gender_rate === 4
              ? '50% Male/Female' : speciesData.gender_rate === 1
              ? '87.5% Male' : speciesData.gender_rate === 7
              ? '87.5% Female' : speciesData.gender_rate
              }
          </p>
          <p>Growth Rate: {CapitalizeHyphen(speciesData.growth_rate.name === "Slow-Then-Very-Fast" ? "Erratic" : speciesData.growth_rate.name)}</p>
          <p>Egg Groups: {eggGroups.length > 0 ? eggGroups.join(', ') : 'Not available'}</p>
        </>
      ) : (
        <p>Error loading data.</p>
      )}
    </div>
  );
}

export default MiscInfo;
