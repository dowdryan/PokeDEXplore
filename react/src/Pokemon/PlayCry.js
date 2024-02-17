import axios from 'axios';
import { useState, useEffect } from 'react';

const usePokemonCry = () => {
    const [cryUrl, setCryUrl] = useState(null);
    const fetchCryUrl = async (pokemonName) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const { cries } = response.data;
            const latestCryUrl = cries?.latest;
            setCryUrl(latestCryUrl);
        } catch (error) {
            console.error('Error fetching Pokemon cry:', error);
        }
    };
    useEffect(() => {
        fetchCryUrl();
    }, []);
    return [cryUrl, fetchCryUrl]; // Return the cry URL and the fetch function
};

export default usePokemonCry;
