import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';
import PlanetLine from './PlanetLine';

function Table() {
  const [planets, setPlanets] = useState([]);
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

    const filter1 = planetList
      .filter((planet) => comparison(Number(planet[filterColumn]), numericFilter));
    setPlanets(filter1);
  };

  useEffect(() => {
    const filteredPlanets = planetList
      .filter(({ name }) => name.toLowerCase().includes(planetName));
    setPlanets(filteredPlanets);
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          {
            planets.map(({
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
            }) => (<PlanetLine
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
            />))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
