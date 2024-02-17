import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Capitalize, 
    CapitalizeHyphen, 
    CapitalizeWordsRemoveHyphen, 
    CapitalizePokemonWithHyphen 
   } from '../Helpers/Helpers';
import FetchPokemonData from './Data/fetchPokemonData';
import useLegendaryMythicalStatus from './isLegendary';
import { checkForAbility } from './Abilities';
import { fetchFormSpriteUrl, fetchPokemonForms } from './Forms';
import usePokemonCry from './PlayCry'; // Import the usePokemonCry hook
import unknownIcon from '../unknownIcon.png';
import UltraWormhole from './UltraWormhole.jpg';
// import axios from 'axios';
import './PokemonSprite.css';

// import PokemonName from './PokemonName'
// import Types from "./Types"
// import PokemonDesc from './PokemonDesc';
// import HeightWidth from './Height-Width';
// import { Abilities } from './Abilities';
// import Stats from './Stats';
// import Learnset from './Learnset';
// import Evolutions from './Evolutions';
// import MiscInfo from './miscInfo';


function PokemonSprite({ pokemon }) {
    const { name } = useParams();
    // const { Capitalize, CapitalizePokemonWithHyphen, CapitalizeWordsRemoveHyphen } = Helpers;
    const [formData, setFormData] = useState(null);
    const pokemonData = FetchPokemonData(pokemon);
    const imageRef = useRef(null);
    const [formSpriteUrl, setFormSpriteUrl] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);
    const [isUltraWormhole, setIsUltraWormhole] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const { isLegendary, isMythical } = useLegendaryMythicalStatus(pokemonData);
    const [cryUrl, fetchCryUrl] = usePokemonCry(); // Use the usePokemonCry hook to get the cry URL

    const handleFormChange = async (event) => {
        const selectedFormName = event.target.value;
        setSelectedForm(selectedFormName);
        const formSpriteUrl = await fetchFormSpriteUrl(selectedFormName);
        setFormSpriteUrl(formSpriteUrl);
        fetchCryUrl(selectedFormName); // Fetch cry URL for the selected form
        // Fetch abilities for selected form
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
                fetchCryUrl(forms[0]?.pokemon.name); // Fetch cry URL for the initial form
            } catch (error) {
                console.error('Error fetching Pokemon description:', error);
            }
        };
        fetchFormData();
    }, [name]);

    useEffect(() => {
        if (checkForAbility(pokemonData, 'beast-boost')) {
            setIsUltraWormhole(true);
        } else {
            setIsUltraWormhole(false);
        }
    }, [pokemonData]);

    return (
        <div className='Pokemon-Sprite' style={{ position: 'relative' }}>
            {pokemonData && (
                <div>
                    {/* <PokemonName pokemon={pokemonData.id}/> */}
                    <img
                        className='Pokemon-Sprite'
                        ref={imageRef}
                        src={formSpriteUrl || unknownIcon}
                        alt={`${Capitalize(selectedForm)} Sprite`}
                        style={{
                            display: 'block',
                            margin: 'auto',
                            width: '318px',
                            height: '318px',
                            border: '8px solid #000',
                            borderRadius: '15px',
                            imageRendering: 'pixelated',
                            backgroundImage: isUltraWormhole ? `url(${UltraWormhole})` : 'none',
                            backgroundSize: isUltraWormhole ? '100% 100%' : 'auto',
                            background: isUltraWormhole
                                ? 'radial-gradient(circle, rgba(230, 255, 255, 1) 30%, rgba(20, 90, 100, 1))'
                                : isLegendary || isMythical
                                ? 'radial-gradient(circle, rgba(255, 215, 0, 1) 35%, rgba(255, 69, 0, 1))'
                                : 'radial-gradient(circle, rgba(230, 255, 255, 1) 30%, rgba(20, 90, 100, 1))',
                            boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    />
                    <div className='audio-icon'
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            color: '#fff',
                            fontSize: '24px',
                            cursor: 'pointer',
                            zIndex: '10',
                        }}
                        onClick={() => setIsAudioPlaying((prevState) => !prevState)} // Toggle audio playback
                    >Play</div>
                    {isAudioPlaying && cryUrl && (
                        <audio autoPlay>
                            <source src={cryUrl} type='audio/ogg' />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            )}

            {formData && formData.varieties && formData.varieties.length > 1 && (
                <div style={{ textAlign: 'center', marginTop: '5px' }}>
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
            {/* {pokemonData && (
                <div>
                    <Types pokemon={pokemonData.id}/>
                    <Abilities/>
                    <HeightWidth pokemon={pokemonData.id}/>
                    <MiscInfo/>
                    <PokemonDesc/>
                    <Stats pokemon={pokemonData.id}/>
                    <Learnset pokemon={pokemonData.id}/>
                    <Evolutions pokemon={pokemonData.id}/>
                </div>
            )} */}
        </div>
    );
}

export default PokemonSprite;
