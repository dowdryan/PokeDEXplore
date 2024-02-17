import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Capitalize, 
    CapitalizeHyphen, 
    CapitalizeWordsRemoveHyphen, 
    CapitalizePokemonWithHyphen 
   } from '../Helpers/Helpers';
import unknownIcon from "../unknownIcon.png"
import axios from 'axios';
import './Pokedex.css';

function Pokedex() {
    // const { CapitalizePokemonWithHyphen } = Helpers;
    const [loading, setLoading] = useState(true); // Loading state
    const [pokemonList, setPokemonList] = useState([]);
    const [originalPokemonList, setOriginalPokemonList] = useState([]); // Store original unfiltered list
    const [suggestedPokemon, setSuggestedPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [clickedPokemon, setClickedPokemon] = useState(null); // State to track clicked link
    const [sortOption, setSortOption] = useState('Ascending');
    
    const getPokemonId = (url) => {
        const urlParts = url.split('/');
        const pokemonId = urlParts[urlParts.length - 2];
        return pokemonId.padStart(4, '0');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025');
                const pokemonData = response.data.results;
                setPokemonList(pokemonData);
                setOriginalPokemonList(pokemonData); // Set original unfiltered list
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const matchingPokemon = pokemonList.find(
            (pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase()
        );
        if (matchingPokemon) {
            window.location.href = `/${matchingPokemon.name}`;
        } else {
            alert(`Pokemon with name "${searchTerm}" not found!`);
        }
    };

    const handleAutocomplete = (input) => {
        const filteredPokemon = pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().startsWith(input.toLowerCase())
        );
        setSuggestedPokemon(filteredPokemon.slice(0, 10));
    };

    const handleMouseEnter = (pokemonName) => {
        setHoveredPokemon(pokemonName);
    };

    const handleMouseLeave = () => {
        setHoveredPokemon(null);
    };

    const handleClick = (pokemonName) => {
        setClickedPokemon(pokemonName);
    };

    const handleFilter = (filterOption) => {
        let filteredList = [];
        if (filterOption === 'Legendary') {
            // ADD LEGENDARY FILTER HERE
        } else if (filterOption === 'Mythical') {
            // ADD MYTHICAL FILTER HERE
        } else if (filterOption === 'Descending') {
            filteredList = [...originalPokemonList].reverse();
        } else if (filterOption === 'Alphabetically') {
            filteredList = [...originalPokemonList].sort((a, b) => a.name.localeCompare(b.name));
        } else if (filterOption === 'ReverseAlphabetically') {
            filteredList = [...originalPokemonList].sort((a, b) => b.name.localeCompare(a.name));
        } else if (filterOption === 'All') {
            filteredList = originalPokemonList;
        } else if (filterOption === 'Start with Letter A') {
            filteredList = originalPokemonList.filter(pokemon => pokemon.name.toLowerCase().startsWith('a'));
        } else if (filterOption === 'Starter Pokemon') {
            filteredList = originalPokemonList.filter(pokemon => {
                const pokemonId = parseInt(getPokemonId(pokemon.url));
                return (pokemonId >= 1 && pokemonId <= 9) // Kanto Starters
                    || (pokemonId >= 152 && pokemonId <= 160) // Johto Starters
                    || (pokemonId >= 252 && pokemonId <= 260) // Hoenn Starters
                    || (pokemonId >= 387 && pokemonId <= 395) // Sinnoh Starters
                    || (pokemonId >= 495 && pokemonId <= 503) // Unova Starters
                    || (pokemonId >= 650 && pokemonId <= 658) // Kalos Starters 
                    || (pokemonId >= 722 && pokemonId <= 730) // Alola Starters
                    || (pokemonId >= 810 && pokemonId <= 818) // Galar Starters
                    || (pokemonId >= 906 && pokemonId <= 914) // Paldea Starters
            });
        }
        setPokemonList(filteredList);
    };
    
    

    return (
        <div>
            {/* Loading Screen */}
            {loading ? (
                <div style={{
                    fontSize: "50px",
                    textAlign: "center"
                }}>Loading...</div>
            ) : (
                <div>
                    <div style={{ position: 'relative', margin: '10px', textAlign: 'center' }}>
                        {/* Search Bar */}
                        <input type="text" className='Search-Bar'
                            placeholder="Search Pokemon"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                handleAutocomplete(e.target.value);
                            }}
                        />

                        {/* Search Button */}
                        <button onClick={handleSearch} className='Search-Button'>Search</button>
                        
                        {/* Search Suggestions */}
                        {suggestedPokemon.length > 0 && (
                            <ul className="Suggest-Search">
                                {suggestedPokemon.map((pokemon) => (
                                    <li key={pokemon.name}>
                                        <Link to={`/${pokemon.name}`} style={{ color: '#000', display: 'block', padding: '8px', textDecoration: "none" }}>
                                            {CapitalizePokemonWithHyphen(pokemon.name)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        {/* Sort */}
                        <label htmlFor="Sort" style={{ marginRight: '5px', marginBottom: "5px" }}>Sort By:</label>
                        <select
                            name="Sort"
                            id="Sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                            <option value="Alphabetically">Alphabetically</option>
                            <option value="ReverseAlphabetically">Reverse Alphabetically</option>
                        </select>
                        
                        {/* Filter */}
                        <label htmlFor="Filter" style={{ marginRight: '5px', marginBottom: "5px", marginLeft: "10px" }}>Filter By:</label>
                        <select
                            name="Filter"
                            id="Filter"
                            onChange={(e) => handleFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Start with Letter A">Start with Letter A</option>
                            <option value="Type">Type</option>
                            <option value="Starter Pokemon">Starter Pokemon</option>
                            <option value="Regional Variants">Regional Variants</option>
                            <option value="Pseudo-Legendary">Pseudo-Legendary</option>
                            <option value="Legendary">Legendary</option>
                            <option value="Mythical">Mythical</option>
                            <option value="Ultra Beast">Ultra Beast</option>
                            <option value="Paradox Pokemon">Paradox Pokemon</option>
                            <option value="Fossils">Fossils</option>
                        </select>

                    </div>
                    <div className="Pokemon-Container">
                        {pokemonList.map((pokemon) => {
                            const itemStyles = {
                                width: '30%',
                                margin: '10px',
                                boxSizing: 'border-box',
                                backgroundColor: "gray",
                                border: `3px solid ${clickedPokemon === pokemon.name ? '#003366' : (hoveredPokemon === pokemon.name ? '#66b3ff' : '#a8a8aB')}`, // Change border color when clicked
                                borderRadius: "5%",
                                boxShadow: '10px 10px 0 rgba(40, 40, 43, 0.7)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'border-color 0.3s ease-in-out, background-color 0.2s ease-in-out, border-radius 0.2s ease-in-out', // added transitions for border color, background color, and border radius
                            };

                            const hoveredStyles = {
                                border: `9px solid ${hoveredPokemon === pokemon.name ? '#66b3ff' : '#a8a8aB'}`,
                                margin: hoveredPokemon === pokemon.name ? '7px' : '10px',
                                backgroundColor: hoveredPokemon === pokemon.name ? '#b3e0ff' : 'gray',
                            };

                            return (
                                <div key={pokemon.name} style={{ 
                                    ...itemStyles, 
                                    ...(hoveredPokemon === pokemon.name && hoveredStyles) }} 
                                    onMouseEnter={() => handleMouseEnter(pokemon.name)} 
                                    onMouseLeave={handleMouseLeave}>
                                    <a href={`/${pokemon.name}`} onClick={() => handleClick(pokemon.name)}>
                                        <img src={getPokemonSprite(pokemon)} className='Menu-Sprite' alt={`${getPokemonId(pokemon.url)}`} onError={(e) => {
                                            e.target.src = unknownIcon;
                                            console.error('Image failed to load, using unknownIcon:', e);
                                        }} />
                                    </a>
                                    <Link to={`/${pokemon.name}`} className="Pokemon-Link">
                                        {CapitalizePokemonWithHyphen(pokemon.name)} (#{getPokemonId(pokemon.url)})
                                    </Link>
                                </div>
                            );
                            
                            function getPokemonSprite(pokemon) {
                                const pokemonId = getPokemonId(pokemon.url);
                                if (pokemonId > 1008) {
                                    return `https://img.pokemondb.net/sprites/scarlet-violet/normal/${pokemon.name}.png`;
                                } else {
                                    return `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${pokemonId}.png`;
                                }
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pokedex;