import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import handleAPI from '../helpers/APIHandle';

function ContextProvider({ children }) {
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const planetsData = await handleAPI();
      setPlanetList(planetsData);
    };
    getPlanets();
  }, []);

  const context = {
    planetList,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default ContextProvider;
