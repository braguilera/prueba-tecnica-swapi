// Type and function for Person
export type Person = {
  nombre: string;
  altura: string;
  peso: string;
  "color de cabello": string;
  "color de piel": string;
  "color de ojos": string;
  peliculas: string[];
};

export type PeopleApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

export async function fetchTranslatedPeopleData(url: string, searchTerm?: string): Promise<PeopleApiResponse> {
  try {
    const urlWithSearch = new URL(url);
    if (searchTerm) {
      urlWithSearch.searchParams.set("search", searchTerm);
    }

    const response = await fetch(urlWithSearch.toString());
    const data = await response.json();
    
    const translatedResults: Person[] = data.results.map((person: any) => ({
      nombre: person.name,
      altura: person.height !== "unknown" ? `${person.height} cm` : "Desconocido",
      peso: person.mass !== "unknown" ? `${person.mass} kg` : "Desconocido",
      "color de cabello": person.hair_color,
      "color de piel": person.skin_color,
      "color de ojos": person.eye_color,
      peliculas: person.films,
    }));
    
    return { ...data, results: translatedResults };
  } catch (error) {
    console.error("Error fetching and translating people:", error);
    throw error;
  }
}

// Type and function for Film
export type Film = {
  "título": string;
  episodio: number;
  director: string;
  productor: string;
  "fecha de estreno": string;
  sinopsis: string;
  personas: string[];
};

export type FilmsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

export async function fetchTranslatedFilmsData(url: string, searchTerm?: string): Promise<FilmsApiResponse> {
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
      sinopsis: film.opening_crawl,
      personas: film.characters,
    }));
    
    return { ...data, results: translatedResults };
  } catch (error) {
    console.error("Error fetching and translating films:", error);
    throw error;
  }
}

// Type and function for Planet
export type Planet = {
  nombre: string;
  "periodo de rotacion": string;
  "periodo orbital": string;
  "diámetro": string;
  clima: string;
  gravedad: string;
  terreno: string;
  "superficie de agua": string;
  poblacion: string;
  peliculas: string[];
};

export type PlanetsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

export async function fetchTranslatedPlanetsData(url: string, searchTerm?: string): Promise<PlanetsApiResponse> {
  try {
    const urlWithSearch = new URL(url);
    if (searchTerm) {
      urlWithSearch.searchParams.set("search", searchTerm);
    }

    const response = await fetch(urlWithSearch.toString());
    const data = await response.json();
    
    const translatedResults: Planet[] = data.results.map((planet: any) => ({
      nombre: planet.name,
      "periodo de rotacion": planet.rotation_period !== "unknown" ? `${planet.rotation_period} días` : "Desconocido",
      "periodo orbital": planet.orbital_period !== "unknown" ? `${planet.orbital_period} días` : "Desconocido",
      "diámetro": planet.diameter !== "unknown" ? `${planet.diameter} km` : "Desconocido",
      clima: planet.climate,
      gravedad: planet.gravity,
      terreno: planet.terrain,
      "superficie de agua": planet.surface_water !== "unknown" ? `${planet.surface_water}%` : "Desconocido",
      poblacion: planet.population,
      peliculas: planet.films,
    }));

    return { ...data, results: translatedResults };
  } catch (error) {
    console.error("Error fetching and translating planets:", error);
    throw error;
  }
}
