// FIX

import React from 'react';
import { render } from '@testing-library/react';
import Stats from './Stats';

describe('Stats component', () => {
  test('renders without crashing', () => {
    render(<Stats />);
  });

  test('renders stats correctly with provided pokemon data', () => {
    const pokemonData = {
      stats: [
        { stat: { name: 'hp' }, base_stat: 45 },
        { stat: { name: 'attack' }, base_stat: 49 },
        { stat: { name: 'defense' }, base_stat: 49 },
        { stat: { name: 'special-attack' }, base_stat: 65 },
        { stat: { name: 'special-defense' }, base_stat: 65 },
        { stat: { name: 'speed' }, base_stat: 45 },
      ],
    };

    const { getByText } = render(<Stats pokemon={pokemonData} />);

    expect(getByText('HP:')).toBeInTheDocument();
    expect(getByText('Attack:')).toBeInTheDocument();
    expect(getByText('Defense:')).toBeInTheDocument();
    expect(getByText('Sp. Attack:')).toBeInTheDocument();
    expect(getByText('Sp. Defense:')).toBeInTheDocument();
    expect(getByText('Speed:')).toBeInTheDocument();
    expect(getByText('Total: 318')).toBeInTheDocument();
  });
});
