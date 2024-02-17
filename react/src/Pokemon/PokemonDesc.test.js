import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokedexDesc from './PokemonDesc';
jest.mock('axios');

const exampleDesc = {
  flavor_text_entries: [
    {
      flavor_text: 'Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/',
      },
      version: {
        name: 'red',
        url: 'https://pokeapi.co/api/v2/version/1/',
      },
    },
  ],
};

describe('PokemonDesc', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Renders Pokemon Description', async () => {
    axios.get.mockResolvedValueOnce({ data: exampleDesc });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/gengar']}>
        <Routes>
          <Route path="/:name" element={<PokedexDesc />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(getByText('Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.')).toBeInTheDocument()
    );
  });
});
