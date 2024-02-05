import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helpers from '../Helpers/Helpers';
import PokemonName from './PokemonName'
import PokemonSprite from './PokemonSprite'
import PokemonDesc from './PokemonDesc';
import HeightWidth from './Height-Width';
import Abilities from './Abilities';
import Types from "./Types"
import Stats from './Stats';
import Learnset from './Learnset';
import Evolutions from './Evolutions';
import MiscInfo from './miscInfo';
import axios from 'axios';
import "./PokemonEntry.css"

// 
function PokemonEntry() {
  const { name } = useParams();
  const { CapitalizePokemonWithHyphen } = Helpers;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [hiddenAbility, setHiddenAbility] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]); // State to hold user favorites

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        setPokemonData(response.data);
        setHiddenAbility(response.data.abilities
          .filter((ability) => ability.is_hidden)
          .map((ability) => CapitalizePokemonWithHyphen(ability.ability.name.replace(/-/g, ' ')))
          .join(', '))
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };
    fetchPokemonData();
  }, [name]);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
        setSpeciesData(response.data)
      } catch (error) {
        console.error('Error fetching Pokemon description:', error);
      }
    };
    fetchSpeciesData();
  }, [name]);

  useEffect(() => {
    // Fetch user favorites when the component mounts
    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user-favorites');
        setUserFavorites(response.data);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    };

    fetchUserFavorites();
  }, []);

  const handleFavoriteToggle = async (id, name) => {
    try {
      // Check if the Pokémon id is already a favorite
      const isFavorite = userFavorites.some((favorite) => favorite.id === id);
  
      if (!isFavorite) {
        // If not, add it to favorites
        await axios.post('http://localhost:5000/api/add-favorite', { id, name });
        setUserFavorites([...userFavorites, { id, name }]);
      } else {
        // If it is, remove it from favorites
        await axios.post('http://localhost:5000/api/remove-favorite', { id });
        setUserFavorites(userFavorites.filter((favorite) => favorite.id !== id));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className='Pokemon-Info' style={{
      backgroundColor: "#28282B",
      border: "20px solid black",
      borderRadius: "5%",
      color: "#fff",
      marginTop: "40px",
      marginBottom: "120px"
    }}>
      {pokemonData && (
        <>
        <div className='Pokemon-Prev-Next'>
          {pokemonData.id > 1 && (
            <Link to={`/${pokemonData.id - 1}`} style={{
              marginLeft: "30px",
              fontSize: "20px",
              textDecoration: "none",
              color: "white",
            }}>&lt;({pokemonData.id - 1}) Previous</Link>
          )}
          {pokemonData.id < 1025 && (
            <Link to={`/${pokemonData.id + 1}`} className="next-link" style={{
              marginRight: "30px",
              fontSize: "20px",
              textDecoration: "none",
              color: "white",
            }}>Next ({pokemonData.id + 1})&gt;</Link>
          )}
          <label>
  Favorite {pokemonData.id}
  <input
    type="checkbox"
    checked={userFavorites.some((favorite) => favorite.id === pokemonData.id)}
    onChange={() => handleFavoriteToggle(pokemonData.id, pokemonData.name)}
  />
</label>
        </div>
          <PokemonName pokemon={pokemonData.id}/>
          <PokemonSprite pokemon={pokemonData.id}/>
          <Types pokemon={pokemonData.id}/>
          <Abilities/>
          <HeightWidth pokemon={pokemonData.id}/>
          <MiscInfo/>
          <PokemonDesc/>
          <Stats pokemon={pokemonData.id}/>
          <Learnset pokemon={pokemonData.id}/>
          <Evolutions pokemon={pokemonData.id}/>
        </>
      )}
    </div>
  );
}

export default PokemonEntry;
