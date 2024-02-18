import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Pokedex from './Pokedex';

jest.mock('axios');

describe('Pokedex component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                results: [
                    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
                    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
                ]
            }
        });
    });

    test('renders pokemon list', async () => {
        render(
            <MemoryRouter>
                <Pokedex />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Bulbasaur (#0001)')).toBeInTheDocument();
            expect(screen.getByText('Ivysaur (#0002)')).toBeInTheDocument();
            expect(screen.getByText('Venusaur (#0003)')).toBeInTheDocument();
        });
    });

    // test('handles sorting options', async () => {
    //     render(
    //         <MemoryRouter>
    //             <Pokedex />
    //         </MemoryRouter>
    //     );

    //     // Wait for the component to fetch data and render
    //     await waitFor(() => {
    //         // Find the sorting select element
    //         const sortingSelect = screen.getByLabelText('Sort By:');

    //         // Change sorting option to "Descending"
    //         fireEvent.change(sortingSelect, { target: { value: 'Descending' } });

    //         // Assert that the Pokémon list is rendered in descending order
    //         const pokemonList = screen.getAllByTestId('pokemon-list-item');
    //         expect(pokemonList[0]).toHaveTextContent('ivysaur');
    //         expect(pokemonList[1]).toHaveTextContent('bulbasaur');
    //         expect(pokemonList[2]).toHaveTextContent('venusaur');
    //         // Add more assertions for other Pokémon as needed

    //         // Change sorting option to "Alphabetically"
    //         fireEvent.change(sortingSelect, { target: { value: 'Alphabetically' } });

    //         // Assert that the Pokémon list is rendered in alphabetical order
    //         expect(pokemonList[0]).toHaveTextContent('bulbasaur');
    //         expect(pokemonList[1]).toHaveTextContent('ivysaur');
    //         expect(pokemonList[2]).toHaveTextContent('venusaur');
    //         // Add more assertions for other Pokémon as needed
    //     });
    // });

    // Add more tests for handling filtering, search, click events, etc. as needed
});
