import React, { useState, useRef } from 'react';
import Helpers from '../Helpers/Helpers';
import FetchPokemonData from '../Data/fetchPokemonData';
import FetchSpeciesData from '../Data/fetchSpeciesData';
import "./PokemonSprite.css"
import unknownIcon from "../unknownIcon.png"

function PokemonSprite({ pokemon }) {
    const { Capitalize } = Helpers;
    const [backSprite, setBackSprite] = useState(false);
    const [isShinyChecked, setShinyChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const pokemonData = FetchPokemonData(pokemon);
    const speciesData = FetchSpeciesData(pokemon);
    const imageRef = useRef(null);

    const handleBackSpriteCheckboxChange = () => {
        setBackSprite(!backSprite);
    };
    const handleShinyCheckboxChange = () => {
        setShinyChecked(!isShinyChecked);
    };

    return (
        <div className='Pokemon-Sprite' style={{ position: 'relative' }}>
            {pokemonData && (
                <div>
                    {/* <favoritePokemon pokemon={pokemonData.name})/> */}
                    <input className="backSprite"
                        type="checkbox"
                        checked={setBackSprite}
                        onChange={handleBackSpriteCheckboxChange}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)} />
                    <input className="star"
                        type="checkbox"
                        checked={isShinyChecked}
                        onChange={handleShinyCheckboxChange}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            backgroundColor: isShinyChecked ? '#000000' : 'initial',
                        }} />
                    <img className='Pokemon-Sprite'
                        ref={imageRef}
                        // Pixel Art Sprites
                        src={isShinyChecked 
                                ? (backSprite ? pokemonData.sprites.back_shiny : pokemonData.sprites.front_shiny)
                                : (backSprite ? pokemonData.sprites.back_default : pokemonData.sprites.front_default)
                            }
                        // Home Sprites
                        // src={isShinyChecked ? pokemonData.sprites.front_shiny : pokemonData.sprites.other.home?.front_default}
                        // Official Artwork
                        // src={isShinyChecked ? pokemonData.sprites.front_shiny : pokemonData.sprites.other['official-artwork'].front_default}
                        alt={`${Capitalize(pokemonData.name)} Sprite`}
                        style={{
                            display: 'block',
                            margin: 'auto',
                            width: '318px',
                            height: '318px',
                            border: '8px solid #000',
                            borderRadius: '15px',
                            imageRendering: 'pixelated',
                            background: 'radial-gradient(circle, rgba(230, 255, 255, 1) 30%, rgba(20, 90, 100, 1))',
                            boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    />
                </div>
            )}
            
            
            {speciesData && (
                <div>
                    {/* Form Select */}
                    <select style={{
                        display: 'block',
                        margin: 'auto',
                        marginTop: "10px",
                        marginBottom: "-5px",
                        textAlign: "center"
                    }}>
                        <option>Charizard</option>
                        <option>Mega Charizard X</option>
                        <option>Mega Charizard Y</option>
                        <option>Gigantamax Charizard</option>
                    </select>
                </div>
            )}
        </div>
    );
}

export default PokemonSprite;

// Get forms from pokemon-species
// If pokemon has more than 1 form add button to switch forms
    // Except for: Koraidon, Miraidon
// Arceus and Silvally forms are listed in pokemon/:name

// If pokemon is legendary or mythical, change background color to gold.