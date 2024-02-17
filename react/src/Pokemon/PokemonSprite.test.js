// FIX

import React from 'react';
import { render } from '@testing-library/react';
import PokemonSprite from './PokemonSprite';

describe('PokemonSprite', () => {
  it('displays the sprite image', () => {
    // Mock useParams hook
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ name: 'pikachu' }), // Mock the name parameter
    }));

    // Mock FetchPokemonData function
    jest.mock('./Data/fetchPokemonData', () => jest.fn(() => ({ id: 25 })));

    // Render the PokemonSprite component
    const { getByAltText } = render(<PokemonSprite pokemon="pikachu" />);

    // Expect the sprite image to be displayed
    const spriteImage = getByAltText('Pikachu Sprite');
    expect(spriteImage).toBeInTheDocument();
  });
});
