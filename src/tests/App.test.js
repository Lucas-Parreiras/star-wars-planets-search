import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithProvider from '../helpers/renderWithProvider';
import testData from '../../cypress/mocks/testData';

const URL = 'https://swapi.dev/api/planets';
const PLANET = 'planet-name';

let container = null;
beforeEach(() => {
  // configurar o elemento do DOM como o alvo da renderização
  container = document.createElement('div');
  document.body.appendChild(container);
});

describe('Testes relativos a aplicação StarWars', () => {
  it('Teste da chamada da API e renderização da tabela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    await act(async () => renderWithProvider(<App />, container));
    const planet1 = await screen.getByText(/Tatooine/i);
    const planet2 = screen.getByText(/Alderaan/i);

    expect(planet1).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Teste de filtragem por nome', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    const DEZ = 10;
    await act(async () => renderWithProvider(<App />, container));
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 'oo');
    expect(nameInput).toHaveValue('oo');
    const filteredPlanet1 = screen.getByRole('cell', { name: /tatooine/i });
    const filteredPlanet2 = screen.getByRole('cell', { name: /naboo/i });
    expect(filteredPlanet1).toBeInTheDocument();
    expect(filteredPlanet2).toBeInTheDocument();
    expect(screen.getAllByTestId(PLANET)).toHaveLength(2);
    userEvent.clear(nameInput);
    expect(screen.getAllByTestId(PLANET)).toHaveLength(DEZ);
  });

  it('Teste de filtragem usando os seletores', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    const numberTest = 7300;
    await act(async () => renderWithProvider(<App />, container));
    const selectColumn = screen.getByTestId('column-filter');
    const selectOperator = screen.getByTestId('comparison-filter');
    const numberInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const planetNotInFilter = screen.getByText(/Tatooine/i);
    const planetInFilter = screen.getByText(/Hoth/i);
    expect(selectColumn).toBeInTheDocument();
    expect(selectColumn).toHaveValue('population');
    expect(selectOperator).toBeInTheDocument();
    expect(selectOperator).toHaveValue('maior que');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveValue(0);
    expect(filterBtn).toBeInTheDocument();

    userEvent.selectOptions(selectColumn, 'diameter');
    expect(selectColumn).toHaveValue('diameter');
    userEvent.selectOptions(selectOperator, 'menor que');
    expect(selectOperator).toHaveValue('menor que');
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '7300');
    expect(numberInput).toHaveValue(numberTest);
    userEvent.click(filterBtn);
    expect(planetNotInFilter).not.toBeInTheDocument();
    expect(planetInFilter).toBeInTheDocument();
  });

  it('Teste de ordenação de planetas', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    await act(async () => renderWithProvider(<App />, container));
    const columnToOrder = screen.getByTestId('column-sort');
    const ASCBtn = screen.getByTestId('column-sort-input-asc');
    const DESCBtn = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    expect(columnToOrder).toBeInTheDocument();
    expect(ASCBtn).toBeInTheDocument();
    expect(DESCBtn).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();

    userEvent.selectOptions(columnToOrder, 'population');
    userEvent.click(DESCBtn);
    userEvent.click(sortBtn);

    const planets = screen.getAllByTestId(PLANET);
    expect(planets[0]).toHaveTextContent(/Coruscant/i);
    expect(planets[2]).toHaveTextContent(/Alderaan/i);
    expect(planets[4]).toHaveTextContent(/Endor/i);
    expect(planets[9]).toHaveTextContent(/Dagobah/i);

    userEvent.selectOptions(columnToOrder, 'orbital_period');
    userEvent.click(ASCBtn);
    userEvent.click(sortBtn);

    const planets2 = screen.getAllByTestId(PLANET);
    expect(planets2[0]).toHaveTextContent(/Tatooine/i);
    expect(planets2[2]).toHaveTextContent(/Dagobah/i);
    expect(planets2[4]).toHaveTextContent(/Coruscant/i);
    expect(planets2[9]).toHaveTextContent(/Bespin/i);

    userEvent.selectOptions(columnToOrder, 'rotation_period');
    userEvent.click(DESCBtn);
    userEvent.click(sortBtn);

    const planets3 = screen.getAllByTestId(PLANET);
    expect(planets3[0]).toHaveTextContent(/Kamino/i);
    expect(planets3[2]).toHaveTextContent(/Alderaan/i);
    expect(planets3[4]).toHaveTextContent(/Yavin IV/i);
    expect(planets3[9]).toHaveTextContent(/Bespin/i);
  });
});
