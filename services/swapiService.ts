// src/services/swapiService.ts

// Tipo y función para People (ya definidos)
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

export async function fetchTranslatedPeopleData(url: string): Promise<PeopleApiResponse> {
  try {
    const response = await fetch(url);
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
  titulo: string;
  episodio: number;
  introduccion: string;
  director: string;
  productor: string;
  fecha_estreno: string;
};

export type FilmsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
};

export async function fetchTranslatedFilmsData(url: string): Promise<FilmsApiResponse> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const translatedResults: Film[] = data.results.map((film: any) => ({
      titulo: film.title,
      episodio: film.episode_id,
      introduccion: film.opening_crawl,
      director: film.director,
      productor: film.producer,
      fecha_estreno: film.release_date,
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
  periodo_rotacion: string;
  periodo_orbital: string;
  diametro: string;
  clima: string;
  gravedad: string;
  terreno: string;
  agua_superficie: string;
  poblacion: string;
};

export type PlanetsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};

export async function fetchTranslatedPlanetsData(url: string): Promise<PlanetsApiResponse> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const translatedResults: Planet[] = data.results.map((planet: any) => ({
      nombre: planet.name,
      periodo_rotacion: planet.rotation_period,
      periodo_orbital: planet.orbital_period,
      diametro: planet.diameter,
      clima: planet.climate,
      gravedad: planet.gravity,
      terreno: planet.terrain,
      agua_superficie: planet.surface_water,
      poblacion: planet.population,
    }));
    return { ...data, results: translatedResults };
  } catch (error) {
    console.error("Error fetching and translating planets:", error);
    throw error;
  }
}
