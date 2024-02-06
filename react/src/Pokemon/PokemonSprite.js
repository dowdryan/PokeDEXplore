import React, { useState, useRef, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import Helpers from '../Helpers/Helpers';
import FetchPokemonData from './Data/fetchPokemonData';
import "./PokemonSprite.css"
import unknownIcon from "../unknownIcon.png"
import { fetchFormSpriteUrl, fetchPokemonForms } from './Forms';

// Fetches the pokemon's sprite
function PokemonSprite({ pokemon }) {
    const { name } = useParams();
    const { Capitalize, CapitalizePokemonWithHyphen, CapitalizeWordsRemoveHyphen } = Helpers;
    const [formData, setFormData] = useState(null);
    const pokemonData = FetchPokemonData(pokemon);
    const imageRef = useRef(null);
    const [formSpriteUrl, setFormSpriteUrl] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);


    const handleFormChange = async (event) => {
        const selectedFormName = event.target.value;
        setSelectedForm(selectedFormName);
        
        const formSpriteUrl = await fetchFormSpriteUrl(selectedFormName);
        setFormSpriteUrl(formSpriteUrl);
    };

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const exceptions = ['nidoran-m', 'nidoran-f', 'ho-oh', 'porygon-z', 'jangmo-o', 'hakamo-o', 'kommo-o', 'ting-lu', 'chien-pao', 'wo-chien', 'chi-yu'];
                const additionalExceptions = ['mr-mime', 'mime-jr', 'type-null', 'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini', 'great-tusk', 'mr-rime', 'scream-tail', 'brute-bonnet', 'flutter-mane', 'slither-wing', 'sandy-shocks', 'iron-treads', 'iron-bundle', 'iron-hands', 'iron-jugulis', 'iron-moth', 'iron-thorns', 'roaring-moon', 'iron-valiant', 'walking-wake', 'gouging-fire', 'raging-bolt', 'iron-leaves', 'iron-boulder', 'iron-crown'];
                let pokemonName;
                if (exceptions.includes(name.toLowerCase()) || additionalExceptions.includes(name.toLowerCase())) {
                    pokemonName = name.toLowerCase();
                } else {
                    pokemonName = CapitalizePokemonWithHyphen(name).toLowerCase();
                }
                const forms = await fetchPokemonForms(pokemonName);
                setFormData({ varieties: forms });
                setSelectedForm(forms[0]?.pokemon.name);
                const initialFormSpriteUrl = await fetchFormSpriteUrl(forms[0]?.pokemon.name);
                setFormSpriteUrl(initialFormSpriteUrl);
            } catch (error) {
                console.error('Error fetching Pokemon description:', error);
            }
        };
        fetchFormData();
    }, [name]);
    
    

    return (
        <div className='Pokemon-Sprite' style={{ position: 'relative' }}>
            {/* <input type="checkbox" id="star" style={{
                visibility: "visible",
                fontSize: "30px",
                cursor: "pointer",
                color: "red",
                position: "absolute",
                top: "1px",
                left: "645px"
            }}/> */}
            {pokemonData && (
                <div>
                    <img className='Pokemon-Sprite'
                        ref={imageRef}
                        src={formSpriteUrl || unknownIcon} // Use formSpriteUrl if available, otherwise use a default icon
                        alt={`${Capitalize(selectedForm)} Sprite`}
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
            
            
            {formData && formData.varieties && formData.varieties.length > 1 && ( // Check if there is more than one form
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <select
                    style={{ width: '200px', textAlign: 'center' }}
                    value={selectedForm}
                    onChange={handleFormChange}
                >
                    {formData.varieties &&
                        formData.varieties.map((variety) => (
                            <option key={variety.pokemon.name} value={variety.pokemon.name}>
                                {CapitalizeWordsRemoveHyphen(variety.pokemon.name)}
                            </option>
                        ))}
                </select>
            </div>
        )}
        </div>
    );
}

export default PokemonSprite;