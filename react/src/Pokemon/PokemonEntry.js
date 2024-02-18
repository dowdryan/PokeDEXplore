import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CapitalizePokemonWithHyphen } from '../Helpers/Helpers';
import PokemonName from './PokemonName'
import PokemonSprite from './PokemonSprite'
import PokemonDesc from './PokemonDesc';
import HeightWidth from './Height-Width';
import { Abilities } from './Abilities';
import Types from "./Types"
import Stats from './Stats';
import Learnset from './Learnset';
import Evolutions from './Evolutions';
import MiscInfo from './miscInfo';
import axios from 'axios';
import "./PokemonEntry.css"

/**
 * Serves as a pokemon's unique page.
 * Fetches data from PokeAPI and renders it into a page for an individual pokemon.
  * Data includes:
    * Name
    * ID
    * Sprite
    * Types
    * Stats
    * etc.
 */
function PokemonEntry() {
  const { name } = useParams();
  // const { CapitalizePokemonWithHyphen } = Helpers;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [hiddenAbility, setHiddenAbility] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // State to indicate loading state


  /**
   * Fetches data from "https://pokeapi.co/api/v2/pokemon/"
   */
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        setPokemonData(response.data);
        setHiddenAbility(response.data.abilities
          .filter((ability) => ability.is_hidden)
          .map((ability) => CapitalizePokemonWithHyphen(ability.ability.name.replace(/-/g, ' ')))
          .join(', '))
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };
    fetchPokemonData();
  }, [name]);

  /**
   * Fetches data from "https://pokeapi.co/api/v2/pokemon-species/"
   */
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


  /**
   * Fetches all of the user's favorited pokemon
   */
  useEffect(() => {
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


  /**
   * Used to add/remove favorites
   */
  const handleFavoriteToggle = async (id, name) => {
    try {
      const isFavorite = userFavorites.some((favorite) => favorite.id === id);
  
      if (!isFavorite) {
        await axios.post('http://localhost:5000/api/add-favorite', { id, name });
        setUserFavorites([...userFavorites, { id, name }]);
      } else {
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
      borderRadius: "50px",
      color: "#fff",
      marginTop: "40px",
      marginBottom: "120px"}}>
      {/* Loading Screen */}
      {loading ? (
        <div className="loading-circle">Loading...</div>
      ) : (
        <>
          <div className='Pokemon-Prev-Next'>
            {/* Directs user to the previous pokemon */}
            {pokemonData.id > 1 && (
              <Link to={`/${pokemonData.id - 1}`} style={{
                marginLeft: "30px",
                fontSize: "20px",
                textDecoration: "none",
                color: "white",
              }}>&lt;({pokemonData.id - 1}) Previous</Link>
            )}
            {/* Directs user to the next pokemon */}
            {pokemonData.id < 1025 && (
              <Link to={`/${pokemonData.id + 1}`} className="next-link" style={{
                marginRight: "30px",
                fontSize: "20px",
                textDecoration: "none",
                color: "white",
              }}>Next ({pokemonData.id + 1})&gt;</Link>
            )}
            {/* Checkbox for favoriting a pokemon */}
            <label>
              Favorite {pokemonData.id}
              <input
                type="checkbox"
                checked={userFavorites.some((favorite) => favorite.id === pokemonData.id)}
                onChange={() => handleFavoriteToggle(pokemonData.id, pokemonData.name)}
              />
            </label>
          </div>
          {/* Functions made in seperate files are called here */}
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
