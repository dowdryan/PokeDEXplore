// FIX

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Learnset from './Learnset';

jest.mock('axios');

describe('Learnset component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: {
                moves: [
                    { 
                        move: {
                            name: 'move1',
                            url: 'https://pokeapi.co/api/v2/move/1/'
                        },
                        version_group_details: [
                            { move_learn_method: { name: 'level-up' }, level_learned_at: 1 },
                            { move_learn_method: { name: 'machine' } }
                        ]
                    },
                    // Add more move objects as needed for testing different scenarios
                ]
            }
        });
    });

    test('renders level-up moves table', async () => {
        render(
            <MemoryRouter initialEntries={['/charizard']}>
                <Route path="/:name">
                    <Learnset />
                </Route>
            </MemoryRouter>
        );

        // Wait for the component to fetch data and render
        await waitFor(() => {
            // Assert that the table headers are rendered
            expect(screen.getByText('Level-Up Moves')).toBeInTheDocument();
            expect(screen.getByText('Level')).toBeInTheDocument();
            expect(screen.getByText('Move')).toBeInTheDocument();
            expect(screen.getByText('Type')).toBeInTheDocument();
            expect(screen.getByText('Category')).toBeInTheDocument();
            expect(screen.getByText('Power')).toBeInTheDocument();
            expect(screen.getByText('Accuracy')).toBeInTheDocument();
            expect(screen.getByText('PP')).toBeInTheDocument();
            expect(screen.getByText('Move Description')).toBeInTheDocument();

            // Assert that the move details are rendered
            expect(screen.getByText('1')).toBeInTheDocument(); // Example level
            expect(screen.getByText('move1')).toBeInTheDocument(); // Example move name
            // Add more assertions for move details as needed
        });
    });
});
