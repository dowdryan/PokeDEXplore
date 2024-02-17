import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Fetches data from PokeApi
function FetchSpeciesData() {
    const { name } = useParams();
    const [speciesData, setSpeciesData] = useState(null);

    useEffect(() => {
        const fetchSpeciesData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
                setSpeciesData(response.data);
            } catch (error) {
                console.error('Error fetching Species data:', error);
            }
        };
        fetchSpeciesData();
    }, [name]);

    return speciesData;
}

export default FetchSpeciesData;