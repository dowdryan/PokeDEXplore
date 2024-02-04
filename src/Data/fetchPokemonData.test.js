import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import FetchPokemonData from './FetchPokemonData';
import axios from 'axios';

jest.mock('axios');

// describe('FetchPokemonData', () => {
//   it('fetches and displays the name of a Pokemon', async () => {
//     const mockPokemonData = {
//       name: 'pikachu',
//       // Add other relevant data here
//     };

//     axios.get.mockResolvedValueOnce({ data: mockPokemonData });

//     const { getByText } = render(
//       <MemoryRouter initialEntries={['/pokemon/pikachu']}>
//         <Route path="/pokemon/:name">
//           <FetchPokemonData />
//         </Route>
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(getByText('pikachu')).toBeInTheDocument();
//     });
//   });
// });