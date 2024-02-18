import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import Learnset from './Learnset';
import axios from 'axios';
jest.mock('axios');

describe('Learnset component', () => {
  test('renders level-up moves table', async () => {
    const mockData = {
      moves: [
        {
          move: { name: 'tackle', url: 'https://pokeapi.co/api/v2/move/33/' },
          version_group_details: [{ move_learn_method: { name: 'level-up' }, level_learned_at: 5 }]
        },
        {
          move: { name: 'growl', url: 'https://pokeapi.co/api/v2/move/45/' },
          version_group_details: [{ move_learn_method: { name: 'level-up' }, level_learned_at: 10 }]
        }
      ]
    };
    axios.get.mockResolvedValue({ data: mockData });
    const { getByText } = render(<MemoryRouter initialEntries={['/bulbasaur']}>
    <Routes>
        <Route path="/:name" element={<Learnset pokemon={{ name: 'bulbasaur' }} />}/>
    </Routes>
  </MemoryRouter>)
    await waitFor(() => {
      expect(getByText('Level-Up Moves')).toBeInTheDocument();
      expect(getByText('Tackle')).toBeInTheDocument();
      expect(getByText('Growl')).toBeInTheDocument();
    });
  });
});
