import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Capitalize, 
    CapitalizeHyphen, 
    CapitalizeWordsRemoveHyphen, 
    CapitalizePokemonWithHyphen 
   } from '../Helpers/Helpers';
import axios from 'axios';
import unknownIcon from '../unknownIcon.png';
import "./Favorite.css"

// Stores a favorited pokemon in the backend
function Favorites() {
    const [apiData, setApiData] = useState(null);
    const [sortOption, setSortOption] = useState('Order Added'); // Default sorting option
    // const { CapitalizePokemonWithHyphen } = Helpers;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to the Express API for user favorites
                const response = await axios.get('http://localhost:5000/api/user-favorites')
                // Format IDs with leading zeros
                const formattedFavorites = response.data.map(({ id, name }) => {
                    const formattedId = (id >= 10 && id <= 99) ? `00${id}` :
                                       (id >= 0 && id <= 9) ? `000${id}` :
                                       (id >= 100 && id <= 999) ? `0${id}` : `${id}`;
                    return { id: formattedId, name };
                });
                const sortedFavorites = sortFavorites(formattedFavorites, sortOption) // Sort the favorites based on the selected option
                setApiData(sortedFavorites);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [sortOption]);

    // Function to sort favorites based on the selected option
    const sortFavorites = (favorites, option) => {
        if (option === 'Numerical') {
            return favorites.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
        } else if (option === 'Alphabetical') {
            return favorites.sort((a, b) => a.name.localeCompare(b.name))
        }
        // For "Order added", return the favorites as is
        return favorites;
    };

    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label htmlFor="Sort">Sort By:</label>
                <select
                    name="Sort"
                    id="Sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="Order added">Order Added</option>
                    <option value="Numerical">Numerical</option>
                    <option value="Alphabetical">Alphabetical</option>
                </select>
            </div>
            <div style={styles.pokemonList}>
                {apiData &&
                    apiData.map(({ id, name }) => (
                        <Link to={`/${parseInt(id, 10)}`} id="Pokemon-Link" style={{ textDecoration: 'none', color: '#fff', marginRight: "10px" }}>
                            <div key={id} style={{
                                width: '100%',
                                margin: '10px',
                                boxSizing: 'border-box',
                                backgroundColor: "gray",
                                border: `3px solid #a8a8aB`,
                                borderRadius: "5%",
                                // boxShadow: '10px 10px 0 rgba(40, 40, 43, 0.7)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                // transition: 'border-color 0.3s ease-in-out, background-color 0.2s ease-in-out, border-radius 0.2s ease-in-out', // added transitions for border color, background color, and border radius
                                }}>
                                <img
                                    src={`https://projectpokemon.org/images/sprites-models/sv-sprites-home/${id}.png`}
                                    alt={`${id}`}
                                    style={{
                                        maxWidth: '120px',
                                        maxHeight: '120px',
                                        marginTop: '5px',
                                        marginLeft: '10px',
                                        marginRight: '10px',
                                        backgroundColor: '#b2b2b2',
                                        border: '6px solid #999999',
                                        borderRadius: '20%',
                                    }}
                                    onError={(e) => {
                                        e.target.src = unknownIcon;
                                        console.error('Image failed to load, using unknownIcon:', e);
                                    }}
                                />
                                <div style={{ textAlign: 'center', marginTop: '5px' }}>{CapitalizePokemonWithHyphen(name)}</div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

const styles = {
    pokemonList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // Ensure Pokémon start from the left
        marginLeft: '75px',
        marginRight: '50px',
        backgroundColor: '#28282B',
        border: '10px solid black',
        borderRadius: '25px',
        paddingRight: "10px",
        marginTop: '40px',
        marginBottom: '40px',
        // marginLeft: '80px', // Add margin to create space between Pokémon
        marginRight: '75px', // Add margin to create space between Pokémon
    },
};


export default Favorites;
