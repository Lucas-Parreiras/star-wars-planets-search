import React, { useContext } from 'react';
import PlanetsContext from '../hooks/PlanetsContext';
import PlanetLine from './PlanetLine';

function Table() {
  const value = useContext(PlanetsContext);

  return (
    <div>
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
            value.map(({
              name,
              rotation_period,
              orbital_period,
              diameter,
              climate,
              gravity,
              terrain,
              surfaceWater,
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
              surfaceWater={ surfaceWater }
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
