export type ConservationStatus = 
  | "Critically Endangered"
  | "Endangered"
  | "Vulnerable"
  | "Near Threatened"
  | "Least Concern"
  | "Stable";

export type PopulationTrend = "Increasing" | "Decreasing" | "Stable";

export interface FishSpecies {
  id: string;
  name: string;
  scientificName: string;
  status: ConservationStatus;
  population: number;
  populationTrend: PopulationTrend;
  countries: string[];
  noFishingZones: string[];
  image?: string;
  description: string;
  sources: string[];
  habitat: string;
  maxLength: string;
  maxWeight: string;
}

export interface SpeciesData {
  species: FishSpecies[];
}

export type SortOption = "population" | "alphabetical" | "status";

