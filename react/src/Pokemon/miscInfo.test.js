// FIX

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import FetchSpeciesData from './Data/fetchSpeciesData';
import MiscInfo from './miscInfo';
jest.mock('axios');

const TestInfo = () => {
    const data = FetchSpeciesData()
    const happiness = data?.base_happiness
    const captureRate = data?.capture_rate
    // const gender = data?.growth_rate.name
    // console.log(happiness)
    return (
        <>
            <div>
                <p>Base Friendship: {happiness}</p>
                <p>Catch Rate: {captureRate}</p>
                {/* <p>Gender Ratio: {gender}</p> */}
                {/* <p>Growth Rate: </p>
                <p>Egg Groups: </p> */}
            </div>
        </>
    )
} 


describe('MiscInfo', () => {
  it('displays miscellanious info about a Pokémon', async () => {
    const mockAxios = new MockAdapter(axios);
    const mockData = {
        base_happiness: 70,
        capture_rate: 60,
        // egg_groups: [
        //   { name: 'field', url: 'https://pokeapi.co/api/v2/egg-group/1'},
        //   { name: 'water2', url: 'https://pokeapi.co/api/v2/egg-group/2'}
        // ],
        // gender_rate: 4,
        // growth_rate: {
        //     "name": "fast-then-very-slow",
        //     "url": "https://pokeapi.co/api/v2/growth-rate/6/"
        // },
    };
    mockAxios.onGet('https://pokeapi.co/api/v2/pokemon-species/wailord').reply(200, mockData);
    axios.get.mockResolvedValue({ data: mockData });
    const { getByText } = render(
      <MemoryRouter initialEntries={['/wailord']}>
        <Routes>
            <Route path="/:name" element={<TestInfo />}/>
        </Routes>
      </MemoryRouter>
    );

    // await waitFor(() => {
    //   expect(screen.getByText('Loading...')).toBeInTheDocument();
    // });

    await waitFor(() => {
      expect(getByText('Base Friendship: 70')).toBeInTheDocument();
      expect(getByText('Catch Rate: 60')).toBeInTheDocument();
    //   expect(getByText('Gender Ratio:  50% Male/Female')).toBeInTheDocument();
    //   expect(getByText('Growth Rate: Fast-Then-Very-Slow')).toBeInTheDocument();
    //   expect(getByText('Egg Groups: Field, Water 2')).toBeInTheDocument();
    });
  });
});
