import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { checkForAbility } from './Abilities';
import FetchPokemonData from './Data/fetchPokemonData';
import axios from 'axios';
jest.mock('axios');


// These are the abilities for the pokemon "Absol"
const ExampleAbilities = {
    abilities: [
        {
            ability: {
                name: "pressure",
                url: "https://pokeapi.co/api/v2/ability/46/"
        },
            is_hidden: false,
            slot: 1
        },
        {
            ability: {
                name: "super-luck",
                url: "https://pokeapi.co/api/v2/ability/105/"
        },
            is_hidden: false,
            slot: 2
        },
        {
            ability: {
                name: "justified",
                url: "https://pokeapi.co/api/v2/ability/46/"
        },
            is_hidden: true,
            slot: 3
        }
    ]
}

const TestAbility = () => {
    const data = FetchPokemonData();
    const ability = data?.abilities.find(ability => ability.ability.name === "pressure" && !ability.is_hidden)
    const abilityName = ability ? ability.ability.name : null;
    return (
        <>
            <div>{abilityName}</div>
        </>
    );
};

const TestAbilities = () => {
    const data = FetchPokemonData();
    const abilities = data?.abilities.filter(ability => {
        return (
            (ability.ability.name === "pressure" || // Use || to check for either "pressure" or "super-luck"
            ability.ability.name === "super-luck") && !ability.is_hidden
        );
    });
    const abilitiesNames = abilities ? abilities.map(ability => ability.ability.name) : []; // Check if abilities is undefined or empty before mapping
    return (
        <>
            <div>{abilitiesNames.join(', ')}</div>
        </>
    );
};

const TestHiddenAbility = () => {
    const data = FetchPokemonData();
    const ability = data?.abilities.find(ability => ability.ability.name === "justified" && ability.is_hidden)
    const abilityName = ability ? ability.ability.name : null;
    return (
        <>
            <div>{abilityName}</div>
        </>
    );
};

const TestAllAbilities = () => {
    const data = FetchPokemonData();
    const abilities = data?.abilities.filter(ability => {
        return (
            ability.ability.name === "pressure" || // Use || to check for either "pressure" or "super-luck"
            ability.ability.name === "super-luck" ||
            ability.ability.name === "justified"
        );
    });
    const abilitiesNames = abilities ? abilities.map(ability => ability.ability.name) : []; // Check if abilities is undefined or empty before mapping
    return (
        <>
            <div>{abilitiesNames.join(', ')}</div>
        </>
    );
};

describe('Abilities', () => {
    it('Returns and Renders an Ability in the webpage', async () => {
        axios.get.mockResolvedValue({ data: ExampleAbilities });
        const { getByText } = render(
            <MemoryRouter initialEntries={['/absol']}>
                <Routes>
                    <Route path="/:name" element={<TestAbility />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
          expect(getByText("pressure")).toBeInTheDocument();
        });
    });

    it('Returns and Renders Both Non-Hidden Abilities in the webpage', async () => {
        axios.get.mockResolvedValue({ data: ExampleAbilities });
        const { getByText } = render(
            <MemoryRouter initialEntries={['/absol']}>
                <Routes>
                    <Route path="/:name" element={<TestAbilities />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(getByText("pressure, super-luck")).toBeInTheDocument();
        });
    });

    it('Returns and Renders All Abilities in the webpage', async () => {
        axios.get.mockResolvedValue({ data: ExampleAbilities });
        const { getByText } = render(
            <MemoryRouter initialEntries={['/absol']}>
                <Routes>
                    <Route path="/:name" element={<TestAllAbilities />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(getByText("pressure, super-luck, justified")).toBeInTheDocument();
        });
    });

    it('Returns and Renders the hidden ability in the webpage', async () => {
        axios.get.mockResolvedValue({ data: ExampleAbilities });
        const { getByText } = render(
            <MemoryRouter initialEntries={['/absol']}>
                <Routes>
                    <Route path="/:name" element={<TestHiddenAbility />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(getByText("justified")).toBeInTheDocument();
        });
    });

    it('checkForAbility: Returns true if the Pokemon has a given ability', () => {
        const hasAbility = checkForAbility(ExampleAbilities, "pressure");
        expect(hasAbility).toBe(true);
    });

    it('checkForAbility: Returns true if the Pokemon does not have the given ability', () => {
        const hasAbility = checkForAbility(ExampleAbilities, "intimidate")
        expect(hasAbility).toBe(false)
    });
});
