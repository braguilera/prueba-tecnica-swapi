export type Person = {
  nombre: string;
  altura: string;
  peso: string;
  "color de cabello": string;
  "color de piel": string;
  "color de ojos": string;
};

export type PeopleApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

export async function fetchTranslatedPeopleData(
  url: string,
  searchTerm?: string
): Promise<PeopleApiResponse> {
  try {
    const urlWithSearch = new URL(url);
    if (searchTerm) {
      urlWithSearch.searchParams.set("search", searchTerm);
    }

    const response = await fetch(urlWithSearch.toString());
    const data = await response.json();
    
    const translatedResults: Person[] = data.results.map((person: any) => ({
      nombre: person.name,
      altura: person.height,
      peso: person.mass,
      "color de cabello": person.hair_color,
      "color de piel": person.skin_color,
      "color de ojos": person.eye_color,
    }));
    
    return { ...data, results: translatedResults };
  } catch (error) {
    console.error("Error fetching and translating people:", error);
    throw error;
  }
}

// Tipo y función para Films
export type Film = {
  "título": string;
  episodio: number;
  director: string;
  productor: string;
  "fecha de estreno": string;
};

export type FilmsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

export async function fetchTranslatedFilmsData(
  url: string,
  searchTerm?: string
): Promise<FilmsApiResponse> {
  try {
    const urlWithSearch = new URL(url);
    if (searchTerm) {
      urlWithSearch.searchParams.set("search", searchTerm);
    }

    const response = await fetch(urlWithSearch.toString());
    const data = await response.json();
    
    const translatedResults: Film[] = data.results.map((film: any) => ({
      "título": film.title,
      episodio: film.episode_id,
      director: film.director,
      productor: film.producer,
      "fecha de estreno": film.release_date,
    }));
    
    return { ...data, results: translatedResults };
  } catch (error) {
    console.error("Error fetching and translating films:", error);
    throw error;
  }
}

// Tipo y función para Planets
export type Planet = {
  nombre: string;
  "periodo de rotacion": string;
  "periodo orbital": string;
  "díametro": string;
  clima: string;
  gravedad: string;
  terreno: string;
  "superficie de agua": string;
  poblacion: string;
};

export type PlanetsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

export async function fetchTranslatedPlanetsData(
  url: string,
  searchTerm?: string
): Promise<PlanetsApiResponse> {
  try {
    const urlWithSearch = new URL(url);
    if (searchTerm) {
      urlWithSearch.searchParams.set("search", searchTerm);
    }

    const response = await fetch(urlWithSearch.toString());
    const data = await response.json();
    
    const translatedResults: Planet[] = data.results.map((planet: any) => ({
      nombre: planet.name,
      "periodo de rotacion": planet.rotation_period,
      "periodo orbital": planet.orbital_period,
      "díametro": planet.diameter,
      clima: planet.climate,
      gravedad: planet.gravity,
      terreno: planet.terrain,
      "superficie de agua": planet.surface_water,
      poblacion: planet.population,
    }));
    
    return { ...data, results: translatedResults };
  } catch (error) {
    console.error("Error fetching and translating planets:", error);
    throw error;
  }
}
