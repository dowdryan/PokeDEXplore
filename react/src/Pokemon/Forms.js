import axios from 'axios';
import Helpers from '../Helpers/Helpers';

// Changes the pokemon's sprite based on it's form
const fetchFormSpriteUrl = async (pokemonName) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data.sprites.front_default;
    } catch (error) {
        console.error('Error fetching sprite URL:', error);
        return null;
    }
};

// Fetches the pokemon's specific form
const fetchPokemonForms = async (pokemonName) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        return response.data.varieties;
    } catch (error) {
        console.error('Error fetching Pokemon forms:', error);
        return [];
    }
};

export { fetchFormSpriteUrl, fetchPokemonForms };