// FIX
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Evolutions from './Evolutions';
jest.mock('axios');


describe('Evolutions Component', () => {
  it('renders loading initially', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        evolution_chain: { url: 'https://someurl.com' }
      }
    });
    const { getByText } = render(<Evolutions pokemon="pikachu" />);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/pikachu');
    });
  });

  it('renders evolution chain after data is fetched', async () => {
    const mockData = {
      data: {
        chain: {
          species: { name: 'pikachu' },
          evolves_to: [{ species: { name: 'raichu' } }]
        }
      }
    };
    axios.get.mockResolvedValueOnce(mockData);
    const { getByText } = render(<Evolutions pokemon="pikachu" />);
    await waitFor(() => {
      expect(getByText('Evolutions:')).toBeInTheDocument();
      expect(getByText('pikachu')).toBeInTheDocument();
      expect(getByText('raichu')).toBeInTheDocument();
    });
  });

  it('handles error when fetching data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    const { getByText } = render(<Evolutions pokemon="pikachu" />);
    await waitFor(() => {
      expect(getByText('Error fetching data: Failed to fetch')).toBeInTheDocument();
    });
  });
});
