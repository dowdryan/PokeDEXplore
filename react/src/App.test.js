// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders Pokedex component for the default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Assuming Pokedex component has some unique content or identifier
    expect(screen.getByText(/Pokedex/i)).toBeInTheDocument();
  });


  it('renders PokemonEntry component for the "/:name" route', () => {
    render(
      <MemoryRouter initialEntries={['/bulbasaur']}>
        <App />
      </MemoryRouter>
    );
    // Assuming PokemonEntry component has some unique content or identifier
    expect(screen.getByText(/Pokemon Entry/i)).toBeInTheDocument();
  });


  it('renders Calculator component for the "/calculator" route', () => {
    render(
      <MemoryRouter initialEntries={['/calculator']}>
        <App />
      </MemoryRouter>
    );

    // Assuming Calculator component has some unique content or identifier
    expect(screen.getByText(/Calculator/i)).toBeInTheDocument();
  });
});
