// FIX

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import fetchFormSpriteUrl from './Forms.js';
import FetchPokemonData from './Data/fetchPokemonData';
import axios from 'axios';
jest.mock('axios');


const TestURL = () => {
    const data = FetchPokemonData();
    const sprite = data?.sprites.front_default
    return (
        <>
            <div>{sprite}</div>
        </>
    );
}

describe('Forms', () => {
// 
    const { getByText } = render(
    );
})