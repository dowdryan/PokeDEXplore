import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FetchPokemonData from './fetchPokemonData';
import axios from 'axios';
jest.mock('axios');

const TestName = function () {
    const data = FetchPokemonData()
    return (<div>{data?.name}</div>)
}
const TestID = function () {
    const data = FetchPokemonData()
    return (<div>{data?.order}</div>)
}

// Test for sprites, stats
describe('FetchPokemonData', () => {
  it('fetches and displays the name of a Pokemon', async () => {
    const mockPokemonData = {name: 'pikachu'};
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/pikachu']}>
        <Routes>
            <Route exact path="/:name" element={<TestName />} /> 
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByText('pikachu')).toBeInTheDocument();
    });
  });

  it('fetches and displays the id of a Pokemon', async () => {
    const mockPokemonData = {order: 25}
    axios.get.mockResolvedValueOnce({ data: mockPokemonData });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/pikachu']}>
        <Routes>
            <Route exact path="/:name" element={<TestID />} /> 
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByText(25)).toBeInTheDocument();
    });
  });
});
