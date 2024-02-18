import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import Stats from './Stats';
import axios from 'axios';
jest.mock('axios');

describe('Stats component', () => {
  test('renders stats correctly with provided pokemon data', async () => {
    const statsData = {
      stats: [
        { stat: { name: 'hp' }, base_stat: 120 },
        { stat: { name: 'attack' }, base_stat: 120 },
        { stat: { name: 'defense' }, base_stat: 120 },
        { stat: { name: 'special-attack' }, base_stat: 120 },
        { stat: { name: 'special-defense' }, base_stat: 120 },
        { stat: { name: 'speed' }, base_stat: 120 },
      ],
    };
    axios.get.mockResolvedValue({ data: statsData });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/arceus']}>
        <Routes>
            <Route path="/:name" element={<Stats pokemon={{ name: 'arceus' }} />}/>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByText('HP')).toBeInTheDocument();
      expect(getByText('Attack')).toBeInTheDocument();
      expect(getByText('Defense')).toBeInTheDocument();
      expect(getByText('Sp. Attack')).toBeInTheDocument();
      expect(getByText('Sp. Defense')).toBeInTheDocument();
      expect(getByText('Speed')).toBeInTheDocument();
      expect(getByText(': 720')).toBeInTheDocument();
    });
  });
});
