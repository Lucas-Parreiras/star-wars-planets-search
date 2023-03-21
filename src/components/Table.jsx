import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';
import PlanetLine from './PlanetLine';

const selectOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Table() {
  const [availableOptions, setAvailableOptions] = useState(selectOptions);
  const [columnToSort, setColumnToSort] = useState('population');
  const [sortDirection, setSortDirection] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [numericFilter, setNumericFilter] = useState(0);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const { planetList } = useContext(PlanetsContext);

  const filterBtnHandle = () => {
    const comparisonObj = {
      'maior que': (a, b) => a > b,
      'menor que': (a, b) => a < b,
      'igual a': (a, b) => a == b,
    };

    const comparison = comparisonObj[filterComparison];

    const listToFilter = filteredList !== 0 ? filteredList : planetList;

    const selectedOptionIndex = availableOptions
      .findIndex((option) => option === filterColumn);
    availableOptions.splice(selectedOptionIndex, 1);
    setAvailableOptions(availableOptions);

    const filter1 = listToFilter
      .filter((planet) => comparison(Number(planet[filterColumn]), numericFilter));
    setFilteredList(filter1);
  };

  const orderBtnHandle = () => {
    const listToSort = filteredList;
    const ASC = 1;
    const DESC = -1;
    const direction = (sortDirection === 'ASC' ? ASC : DESC);
    if (columnToSort === 'population') {
      let newList = [];
      const planetWithPop = listToSort
        .filter((planet) => planet.population !== 'unknown');
      const planetWithoutPop = listToSort
        .filter((planet) => planet.population === 'unknown');
      newList = [
        ...planetWithPop
          .sort((a, b) => direction * (Number(a[columnToSort]) - (b[columnToSort]))),
        ...planetWithoutPop,
      ];
      setFilteredList(newList);
      setColumnToSort('diameter');
    } else {
      const orderedList = listToSort
        .sort((a, b) => direction * (Number(a[columnToSort]) - Number(b[columnToSort])));
      setFilteredList(orderedList);
      setColumnToSort('population');
    }
  };

  useEffect(() => {
    const filteredPlanets = planetList
      .filter(({ name }) => name.toLowerCase().includes(planetName));
    setFilteredList(filteredPlanets);
  }, [planetName, planetList]);

  return (
    <div>
      <input
        type="text"
        onChange={ ({ target: { value } }) => setPlanetName(value.toLowerCase()) }
        value={ planetName }
        data-testid="name-filter"
      />
      <label htmlFor="filter1">
        Coluna:
        <select
          data-testid="column-filter"
          id="filter1"
          onChange={ ({ target }) => setFilterColumn(target.value) }
        >
          {availableOptions.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="filter2">
        Operador:
        <select
          data-testid="comparison-filter"
          id="filter2"
          onChange={ ({ target }) => setFilterComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        name="numericFilter"
        id="filter3"
        data-testid="value-filter"
        value={ numericFilter }
        onChange={ ({ target }) => setNumericFilter(target.value) }
      />
      <button
        type="button"
        onClick={ filterBtnHandle }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <label htmlFor="orderFilter">
        Ordenar:
        <select
          data-testid="column-sort"
          id="orderFilter"
          onChange={ ({ target }) => setColumnToSort(target.value) }
        >
          {
            selectOptions
              .map((item) => (<option key={ item } value={ item }>{ item }</option>))
          }
        </select>
      </label>
      <label htmlFor="ascBtn">
        ASC
        <input
          type="radio"
          name="sortBtns"
          id="ascBtn"
          value="ASC"
          data-testid="column-sort-input-asc"
          onClick={ () => setSortDirection('ASC') }
        />
      </label>
      <label htmlFor="descBtn">
        DESC
        <input
          type="radio"
          name="sortBtns"
          id="descBtn"
          value="DESC"
          data-testid="column-sort-input-desc"
          onClick={ () => setSortDirection('DESC') }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => orderBtnHandle() }
      >
        Ordenar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {(filteredList.length !== 0 ? filteredList : planetList).map(
            ({
              name,
              rotation_period,
              orbital_period,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <PlanetLine
                key={ name }
                name={ name }
                rotationPeriod={ rotation_period }
                orbitalPeriod={ orbital_period }
                diameter={ diameter }
                climate={ climate }
                gravity={ gravity }
                terrain={ terrain }
                surfaceWater={ surface_water }
                population={ population }
                films={ films }
                created={ created }
                edited={ edited }
                url={ url }
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
