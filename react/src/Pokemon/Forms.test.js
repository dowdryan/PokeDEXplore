import axios from 'axios';
import { fetchFormSpriteUrl, fetchPokemonForms } from './Forms'; // Replace 'yourFileName' with the actual filename

jest.mock('axios');

describe('fetchFormSpriteUrl', () => {
  it('fetches the sprite URL for a given pokemon', async () => {
    const pokemonName = 'pikachu';
    const mockData = {
      sprites: {
        front_default: 'https://pokeapi.co/sprites/pikachu.png',
        other: {
          'official-artwork': { front_default: 'https://pokeapi.co/official-artwork/pikachu.png' }
        }
      }
    };
    axios.get.mockResolvedValue({ data: mockData });
    const spriteUrl = await fetchFormSpriteUrl(pokemonName);
    expect(spriteUrl).toBe(mockData.sprites.front_default);
    expect(axios.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  });

  it('fetches the forms of a given pokemon', async () => {
    const pokemonName = 'meowth';
    const mockData = {
      varieties: [
        { pokemon: { name: 'meowth', url: 'https://pokeapi.co/api/v2/pokemon/52/' } },
        { pokemon: { name: 'meowth-alola', url: 'https://pokeapi.co/api/v2/pokemon/10052/' } },
        { pokemon: { name: 'meowth-galar', url: 'https://pokeapi.co/api/v2/pokemon/10161/' } }
      ]
    };
    axios.get.mockResolvedValue({ data: mockData });
    const forms = await fetchPokemonForms(pokemonName);
    expect(forms).toEqual(mockData.varieties);
    expect(axios.get).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
  });

});
