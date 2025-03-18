type EndpointType = 'films' | 'people' | 'planets';

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api/';

//Return endpoint complete
export const getEndpoint = (type: 'film' | 'people' | 'planet'): string => {
  const endpoints: Record<EndpointType, string> = {
    films: `${SWAPI_BASE_URL}films/`,
    people: `${SWAPI_BASE_URL}people/`,
    planets: `${SWAPI_BASE_URL}planets/`
  };

  switch(type) {
    case 'film': return endpoints.films;
    case 'people': return endpoints.people;
    case 'planet': return endpoints.planets;
    default: throw new Error('Tipo de endpoint no válido');
  }
};