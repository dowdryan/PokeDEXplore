import React from 'react';
import Helpers from '../Helpers/Helpers';
import FetchPokemonData from '../Data/fetchPokemonData';
import FetchSpeciesData from '../Data/fetchSpeciesData';

function PokemonName({ pokemon }) {
  const { CapitalizePokemonWithHyphen } = Helpers;
  const pokemonData = FetchPokemonData(pokemon);
  let genus = FetchSpeciesData(pokemon);

  return (
    <div className='Pokemon-Name'>
        {pokemonData && (
            <div>
              <h1 className='Pokemon-Name'>#{pokemonData.id} | {CapitalizePokemonWithHyphen(pokemonData.name)}</h1>
            </div>)}
        {genus && (
            <div>
                <h3 className='Pokemon-Genus' 
                    style={{ marginTop: '-10px', marginBottom: '10px'}}>
                    {(genus)}
                </h3>
            </div>
        )}
    </div>
  );
}

export default PokemonName;
