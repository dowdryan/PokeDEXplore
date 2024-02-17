// FIX
import React from 'react';
// import { useParams } from 'react-router-dom';
import { render, act, screen } from '@testing-library/react';
// import FetchPokemonData from './Data/fetchPokemonData';
import Types from './Types';
import axios from 'axios';
jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: () => ({ name: 'charizard'  }),
}));

describe('Types', () => {
  it('displays the Pokemon types with correct styling', async () => {
    const pokemon = {
      types: [
        {
          "slot": 1,
          "type": {
            "name": "fire",
            "url": "https://pokeapi.co/api/v2/type/10/"
          }
        },
        {
          "slot": 2,
          "type": {
            "name": "flying",
            "url": "https://pokeapi.co/api/v2/type/3/"
          }
        }
      ],
    };
    axios.get.mockResolvedValue({ data: pokemon});
    await act(async () => {
      const { debug, findByText } = render(<Types pokemon={pokemon} />);
      screen.debug()
      const fireType = await findByText('Fire');
      expect(fireType).toBeInTheDocument();
      expect(fireType).toHaveStyle('background-color: #EE8130');
      expect(fireType).toHaveStyle('border: 2px solid #EE8130');
  
      // const flyingType = getByText('Flying');
      // expect(flyingType).toBeInTheDocument();
      // expect(flyingType).toHaveStyle('background-color: #A98FF3');
      // expect(flyingType).toHaveStyle('border: 2px solid #A98FF3');
    });
  });
});