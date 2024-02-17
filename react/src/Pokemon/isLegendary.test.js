import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useLegendaryMythicalStatus from './isLegendary';
jest.mock('axios');
// Mocking useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));
// Mocking checkForAbility function
jest.mock('./Abilities', () => ({
    checkForAbility: jest.fn(),
}));

describe('useLegendaryMythicalStatus hook', () => {
    it('sets isLegendary to true for a legendary pokemon', async () => {
        useParams.mockReturnValue({ name: 'mewtwo' });
        axios.get.mockResolvedValueOnce({ data: { is_legendary: true } });
        const { result, waitForNextUpdate } = renderHook(() => useLegendaryMythicalStatus({}));
        await waitForNextUpdate();
        expect(result.current.isLegendary).toBe(true);
    });

    it('sets isMythical to true for a mythical pokemon', async () => {
        useParams.mockReturnValue({ name: 'mew' });
        axios.get.mockResolvedValueOnce({ data: { is_legendary: false, is_mythical: true } });
        const { result, waitForNextUpdate } = renderHook(() => useLegendaryMythicalStatus({}));
        await waitForNextUpdate();
        expect(result.current.isMythical).toBe(true);
    });

    it('sets isLegendary to true for a pokemon with specific abilities', async () => {
        useParams.mockReturnValue({ name: 'iron-valiant' });
        axios.get.mockResolvedValueOnce({ data: { is_legendary: false, is_mythical: false, id: 1006 } });
        require('./Abilities').checkForAbility.mockReturnValue(true);
        const { result, waitForNextUpdate } = renderHook(() => useLegendaryMythicalStatus({}));
        await waitForNextUpdate();
        expect(result.current.isLegendary).toBe(true);
    });

    it('sets isLegendary to true for a specific Pokémon ID', async () => {
        useParams.mockReturnValue({ name: 'type-null' });
        axios.get.mockResolvedValueOnce({ data: { id: 772 } });
        const { result, waitForNextUpdate } = renderHook(() => useLegendaryMythicalStatus({}));
        await waitForNextUpdate();
        expect(result.current.isLegendary).toBe(true);
    });
    
});
