import React from 'react';
import { render } from '@testing-library/react';
import HeightWidth from './Height-Width';
jest.mock('./Data/fetchPokemonData', () => jest.fn());

describe('HeightWidth component', () => {
    it("Renders a Pokemon's Height/Weight", () => {
        const pokemonData = {
            height: 145,
            weight: 3980,
        };
        require('./Data/fetchPokemonData').mockReturnValue(pokemonData);
        const { getByText } = render(<HeightWidth pokemon="wailord" />);
        const heightElement = getByText('14.5m |');
        const weightElement = getByText('398.0kg');
        expect(heightElement).toBeInTheDocument();
        expect(weightElement).toBeInTheDocument();
    });
});
