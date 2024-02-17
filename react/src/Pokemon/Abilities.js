import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Capitalize, 
    CapitalizeHyphen, 
    CapitalizeWordsRemoveHyphen, 
    CapitalizePokemonWithHyphen 
   } from '../Helpers/Helpers';
import axios from 'axios';

/**
 * Returns true if pokemon has the given ability
 */
function checkForAbility(pokemonData, abilityName) {
    return pokemonData?.abilities.some(ability => ability.ability.name === abilityName);
}

/**
 * Renders Pokemon's abilities and hidden abilites in a custom div
 */
function Abilities() {
    const { name } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    // const { CapitalizePokemonWithHyphen } = Helpers;
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
            {pokemonData && ( <>
            {/* Renders regular abilities */}
                <p className='Pokemon-Ablility' style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid black',
                    borderRadius: '5px',
                    padding: '5px',
                    margin: '0 auto',
                    width: 'fit-content',
                    marginBottom: "5px",
                    backgroundColor: "white",
                    color: "black",
                    border: '4px solid black',
                    borderRadius: '10px',
                }}>{pokemonData.abilities.filter((ability) => !ability.is_hidden).length === 1 ? (
                        "Ability: ") : ("Abilities: ")}
                    {pokemonData.abilities
                        .filter((ability) => !ability.is_hidden && ability.slot !== 3)
                        .map((ability) => CapitalizePokemonWithHyphen(ability.ability.name.replace(/-/g, ' ')))
                        .join(', ')}
                </p>
            {/* Renders hidden abilities */}
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
                    backgroundColor: "white",
                    color: "black",
                    border: '4px solid black',
                    borderRadius: '10px',
                }}>Hidden Ability: {hiddenAbility}</p>)}</>
            )}
        </div>
    )
}

export { checkForAbility, Abilities };
