import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { checkForAbility } from './Abilities';
import axios from 'axios';

/**
 * Determines if pokemon should be rendered as a legendary or mythical
 */
function useLegendaryMythicalStatus(pokemonData) {
    const { name } = useParams();
    const [isLegendary, setIsLegendary] = useState(false);
    const [isMythical, setIsMythical] = useState(false);

    
    /**
     * Paradox Pokemon are not technically legendary, but are treated as such in the games, so I will give them the legendary background
     * Sets Type: Null whose id = 772) as legendary, since the API does not.
    */
    useEffect(() => {
        const fetchSpeciesData = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`);
                if (response.data.is_legendary 
                    || (checkForAbility(pokemonData, 'protosynthesis') // Paradox pokemon can have protosynthesis as an ability
                    || checkForAbility(pokemonData, 'quark-drive')) // Paradox pokemon can have quark drive as an ability
                    ) {
                        setIsLegendary(true);
                        return console.log("Legendary!");
                } else if (response.data.id === 772) { 
                    setIsLegendary(true); // Manually sets Type: Null as legendary (That's a pokemon's name. Seriously.)
                    return console.log("Legendary!");
                } else if (response.data.is_mythical) {
                    setIsMythical(true);
                    return console.log("Mythical!");
                } else {
                    return setIsMythical(false);
                }
            } catch (error) {
                console.error('Error fetching Pokemon description:', error);
            }
        };
        fetchSpeciesData();
    }, [name, pokemonData]);

    useEffect(() => {
        setIsLegendary(false);
        setIsMythical(false);
    }, [name]);

    return { isLegendary, isMythical };
}


export default useLegendaryMythicalStatus;