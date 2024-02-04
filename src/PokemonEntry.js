import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helpers from './Helpers/Helpers';
import PokemonName from './Pokemon/PokemonName'
import PokemonSprite from './Pokemon/PokemonSprite'
import PokemonDesc from './Pokemon/PokemonDesc';
import HeightWidth from './Pokemon/Height-Width';
import Abilities from './Pokemon/Abilities';
import Types from "./Pokemon/Types"
import Stats from './Pokemon/Stats';
import Learnset from './Pokemon/Learnset';
import Evolutions from './Pokemon/Evolutions';
import MiscInfo from './Pokemon/miscInfo';
import axios from 'axios';
import "./PokemonEntry.css"


function PokemonEntry() {
  const { name } = useParams();
  const { CapitalizePokemonWithHyphen } = Helpers;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [hiddenAbility, setHiddenAbility] = useState(null);

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

  return (
    <div className='Pokemon-Info' style={{
      // marginLeft: "75px",
      // marginRight: "50px",
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
              // marginTop: "20px",
              marginLeft: "30px",
              fontSize: "20px",
              textDecoration: "none",
              color: "white",
              // '&:hover': {
              //   color: "blue"
              // },
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
export default PokemonEntry