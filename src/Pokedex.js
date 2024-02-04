import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Helpers from './Helpers/Helpers';
import axios from 'axios';
import unknownIcon from "./unknownIcon.png"

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [sortOption, setSortOption] = useState('Ascending');
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestedPokemon, setSuggestedPokemon] = useState([]);
    const { CapitalizePokemonWithHyphen } = Helpers;

    const getPokemonId = (url) => {
        const urlParts = url.split('/');
        const pokemonId = urlParts[urlParts.length - 2];
        return pokemonId.padStart(4, '0');
    };

    // const toggleReverseSort = () => {
    //     setSortOption((prevSortOption) => {
    //         if (prevSortOption === 'Ascending') {
    //             return 'Descending';
    //         } else if (prevSortOption === 'Descending') {
    //             return 'Alphabetically';
    //         } else if (prevSortOption === 'Alphabetically') {
    //             return 'ReverseAlphabetically';
    //         } else {
    //             return 'Ascending';
    //         }
    //     });
    // };

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
    }, [sortOption]); // Update the list when sortOption changes

    const handleSearch = () => {
        // Redirect to the page of the first matching Pokemon
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

        // Limit the suggestions to the first 10
        setSuggestedPokemon(filteredPokemon.slice(0, 10));
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

            {/* Search Bar */}
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

                {/* Autocomplete Dropdown */}
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
            </div>

            <div style={styles.pokemonList}>
                {pokemonList.map((pokemon) => (
                    <div key={pokemon.name} style={styles.pokemonItem}>
                        <a href={`/${pokemon.name}`}>
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
                ))}
            </div>
        </div>
    );
}

const styles = {
    pokemonList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: "75px",
        marginRight: "50px",
        backgroundColor: "#28282B",
        border: "10px solid black",
        borderRadius: "0.3%",
        // marginTop: "40px",
        marginBottom: "40px"
    },
    PokemonName: {
        color: "#0088cc",
    },
    pokemonItem: {
        width: '30%',
        margin: '10px',
        boxSizing: 'border-box',
        backgroundColor: "gray",
        border: "3px solid #a8a8aB",
        borderRadius: "5%",
        boxShadow: '10px 10px 0 rgba(40, 40, 43, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
};

export default Pokedex;