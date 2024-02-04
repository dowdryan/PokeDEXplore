import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';

function FetchPokemonData({ pokemon }) {
    const { name } = useParams();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const fetchPokemonData = async () => {
          try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            setPokemonData(response.data);
          } catch (error) {
            console.error('Error fetching Pokemon data:', error);
          }
        };
        fetchPokemonData();
    }, [name]);
    return pokemonData
}

export default FetchPokemonData