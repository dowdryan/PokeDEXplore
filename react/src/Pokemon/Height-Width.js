import React from 'react';
import FetchPokemonData from './Data/fetchPokemonData';

// Returns the pokemon's height and width
function HeightWidth({ pokemon }) {
    const pokemonData = FetchPokemonData(pokemon);
    return (
        <>
            {pokemonData && (
                <div className='Pokemon-Height-Width' style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid black',
                    borderRadius: '5px',
                    padding: '0px 2px 0px',
                    margin: 'auto',
                    width: 'fit-content',
                }}>
                    <p className='Pokemon-Height' style={{
                        marginRight: "10px",
                    }}>{(pokemonData.height / 10).toFixed(1)}m</p>
                    <p className='Pokemon-Weight'>{(pokemonData.weight / 10).toFixed(1)}kg</p>
                </div>
            )}
        </>
    );
}

export default HeightWidth;
