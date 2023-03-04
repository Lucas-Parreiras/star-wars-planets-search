import PropTypes from 'prop-types';
import React from 'react';

function PlanetLine({
  name,
  rotationPeriod,
  orbitalPeriod,
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
  key,
}) {
  return (
    <tr key={ key }>
      <td>{ name }</td>
      <td>{ rotationPeriod }</td>
      <td>{ orbitalPeriod }</td>
      <td>{ diameter }</td>
      <td>{ climate }</td>
      <td>{ gravity }</td>
      <td>{ terrain }</td>
      <td>{ surfaceWater }</td>
      <td>{ population }</td>
      <td>{ films }</td>
      <td>{ created }</td>
      <td>{ edited }</td>
      <td>{ url }</td>
    </tr>
  );
}

PlanetLine.propTypes = {
  climate: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  diameter: PropTypes.string.isRequired,
  edited: PropTypes.string.isRequired,
  films: PropTypes.string.isRequired,
  gravity: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  orbitalPeriod: PropTypes.string.isRequired,
  population: PropTypes.string.isRequired,
  rotationPeriod: PropTypes.string.isRequired,
  surfaceWater: PropTypes.string.isRequired,
  terrain: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
};

export default PlanetLine;
