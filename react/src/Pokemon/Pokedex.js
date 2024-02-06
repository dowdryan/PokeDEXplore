import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Helpers from '../Helpers/Helpers';
import axios from 'axios';
import unknownIcon from "../unknownIcon.png"

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [sortOption, setSortOption] = useState('Ascending');
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestedPokemon, setSuggestedPokemon] = useState([]);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [clickedPokemon, setClickedPokemon] = useState(null); // State to track clicked link
    const { CapitalizePokemonWithHyphen } = Helpers;

    const getPokemonId = (url) => {
        const urlParts = url.split('/');
        const pokemonId = urlParts[urlParts.length - 2];
        return pokemonId.padStart(4, '0');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025');
                let sortedList = response.data.results;
                if (sortOption === 'Descending') {
                    sortedList = sortedList.reverse();
                } else if (sortOption === 'Alphabetically') {
                    sortedList = sortedList.sort((a, b) => a.name.localeCompare(b.name));
                } else if (sortOption === 'ReverseAlphabetically') {
                    sortedList = sortedList.sort((a, b) => b.name.localeCompare(a.name));
                }
                setPokemonList(sortedList);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchData();
    }, [sortOption]);

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

    return (
        <div>
            <label htmlFor="Sort">Sort By:</label>
            <select
                name="Sort"
                id="Sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
                <option value="Alphabetically">Alphabetically</option>
                <option value="ReverseAlphabetically">Reverse Alphabetically</option>
            </select>

            <div style={{ position: 'relative', margin: '10px' }}>
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleAutocomplete(e.target.value);
                    }}
                    style={{ marginRight: '5px' }}
                />
                <button onClick={handleSearch}>Search</button>
                {suggestedPokemon.length > 0 && (
                    <ul style={{
                            listStyle: 'none',
                            padding: '0',
                            textAlign: 'center',
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            width: '100%',
                            background: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            zIndex: '1',
                        }}>
                        {suggestedPokemon.map((pokemon) => (
                            <li key={pokemon.name}>
                                <Link to={`/${pokemon.name}`} style={{ color: '#000', display: 'block', padding: '8px' }}>
                                    {CapitalizePokemonWithHyphen(pokemon.name)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* <Link to="/favorites">Favorites</Link> */}
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginLeft: "80px",
                marginRight: "80px",
                backgroundColor: "#28282B",
                border: "10px solid black",
                borderRadius: "0.3%",
                marginBottom: "40px",}}>
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
                        transition: 'border-color 0.3s ease-in-out, border-width 0.3s ease-in-out, margin 0.3s ease-in-out', // added margin transition
                    };
                    const hoveredStyles = {
                        border: `6px solid ${hoveredPokemon === pokemon.name ? '#66b3ff' : '#a8a8aB'}`, // double border size when hovered
                        margin: hoveredPokemon === pokemon.name ? '7px' : '10px', // set margin to 7 during hover, otherwise 10
                    };

                    return (
                        <div key={pokemon.name} style={{ 
                            ...itemStyles, 
                            ...(hoveredPokemon === pokemon.name && hoveredStyles) }} 
                            onMouseEnter={() => handleMouseEnter(pokemon.name)} 
                            onMouseLeave={handleMouseLeave}>
                            <a href={`/${pokemon.name}`} onClick={() => handleClick(pokemon.name)}>
                                <img
                                    src={`https://projectpokemon.org/images/sprites-models/sv-sprites-home/${getPokemonId(pokemon.url)}.png`}
                                    alt={`${getPokemonId(pokemon.url)}`}
                                    style={{
                                        maxWidth: '120px',
                                        maxHeight: '120px',
                                        marginTop: "5px",
                                        marginLeft: "7px",
                                        marginRight: "10px",
                                        backgroundColor: "#b2b2b2",
                                        border: "6px solid #999999",
                                        borderRadius: "20%"
                                    }}
                                    onError={(e) => {
                                        e.target.src = unknownIcon;
                                        console.error('Image failed to load, using unknownIcon:', e);
                                    }}
                                />
                            </a>
                            <Link to={`/${pokemon.name}`} style={{
                                color: '#fff',
                                WebkitTapHighlightColor: 'transparent',
                                textDecoration: "none",
                                fontSize: "1.25rem",
                                textAlign: "center",
                                marginTop: "10px",
                            }}>
                                {CapitalizePokemonWithHyphen(pokemon.name)} (#{getPokemonId(pokemon.url)})
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Pokedex;
