import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';
import handleAPI from '../helpers/APIHandle';

function ContextProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const planetsData = await handleAPI();
      setPlanets(planetsData);
    };
    getPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ planets }>
      {children}
    </PlanetsContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default ContextProvider;
