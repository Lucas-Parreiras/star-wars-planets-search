const handleAPI = async () => {
  const URL = 'https://swapi.dev/api/planets';
  const response = await fetch(URL);
  const data = await response.json();
  const planetsData = data.results;
  const planetsDataWithOutResidents = planetsData.map((item) => {
    delete item.residents;
    return item;
  });
  return planetsDataWithOutResidents;
};

export default handleAPI;
