import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Helpers from '../Helpers/Helpers';
import axios from 'axios';


function Abilities() {
    const { name } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const { CapitalizePokemonWithHyphen } = Helpers;
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
    return (
        <div className='Pokemon-Abilities'>
            {pokemonData && (
                <><p className='Pokemon-Ablility' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid black',
                    borderRadius: '5px',
                    padding: '5px',
                    margin: '0 auto',
                    width: 'fit-content',
                    marginBottom: "5px",
                }}>
                    {pokemonData.abilities
                        .filter((ability) => !ability.is_hidden && ability.slot !== 3)
                        .map((ability) => CapitalizePokemonWithHyphen(ability.ability.name.replace(/-/g, ' ')))
                        .join(', ')}
                </p>
            {/* Logic for displaying hidden abilities */}
                {pokemonData.abilities.some((ability) => ability.is_hidden && ability.slot === 3 
                && !pokemonData.abilities.some((regularAbility) => regularAbility.slot !== 3 && regularAbility.ability.name === ability.ability.name)) && (
                <p className='Pokemon-HiddenAblility' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid black',
                    borderRadius: '5px',
                    padding: '5px',
                    margin: '5px auto',
                    width: 'fit-content',
                    marginBottom: "5px",
                }}>{hiddenAbility}</p>)}</>
            )}
        </div>
    )
}

export default Abilities;
