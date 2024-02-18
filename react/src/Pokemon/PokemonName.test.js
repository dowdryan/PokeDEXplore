import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import axios from 'axios'; // Mocked axios instance
import { useParams } from 'react-router-dom'; // Mocked useParams
import FetchPokemonData from './Data/fetchPokemonData'; // Mocked FetchPokemonData
import PokemonName from './PokemonName';
jest.mock('axios');
jest.mock('./Data/fetchPokemonData', () => jest.fn());
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('PokemonName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading text initially', () => {
    useParams.mockReturnValue({ name: 'bulbasaur' });
    const { getByText } = render(<PokemonName />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders Pokemon name and genus after data is fetched', async () => {
    useParams.mockReturnValue({ name: 'bulbasaur' });
    FetchPokemonData.mockReturnValue({ id: 1, name: 'bulbasaur' });
    axios.get.mockResolvedValueOnce({
      data: {
        flavor_text_entries: [{ language: { name: 'en' }, flavor_text: 'Some flavor text' }],
        genera: [{ language: { name: 'en' }, genus: 'Seed Pokémon' }],
      },
    });
    const { getByText } = render(<PokemonName pokemon="bulbasaur" />);
    await waitFor(() => {
      expect(getByText('#1 | Bulbasaur')).toBeInTheDocument();
      expect(getByText('Seed Pokémon')).toBeInTheDocument();
    });
  });
});
