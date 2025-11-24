import { FishSpecies, SpeciesData, SortOption } from "@/types/species";
import speciesData from "@/data/species.json";

export function getAllSpecies(): FishSpecies[] {
  return (speciesData as SpeciesData).species;
}

export function getSpeciesById(id: string): FishSpecies | undefined {
  return getAllSpecies().find((species) => species.id === id);
}

export function getSpeciesByCountry(country: string): FishSpecies[] {
  return getAllSpecies().filter((species) =>
    species.countries.some((c) =>
      c.toLowerCase().includes(country.toLowerCase())
    )
  );
}

export function getEndangeredSpecies(): FishSpecies[] {
  return getAllSpecies().filter(
    (species) =>
      species.status === "Endangered" ||
      species.status === "Critically Endangered" ||
      species.status === "Vulnerable"
  );
}

export function getAllCountries(): string[] {
  const countriesSet = new Set<string>();
  getAllSpecies().forEach((species) => {
    species.countries.forEach((country) => countriesSet.add(country));
  });
  return Array.from(countriesSet).sort();
}

export function filterSpecies(
  species: FishSpecies[],
  searchQuery: string,
  countryFilter: string,
  statusFilter: string,
  endangeredOnly: boolean
): FishSpecies[] {
  let filtered = [...species];

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.scientificName.toLowerCase().includes(query)
    );
  }

  // Country filter
  if (countryFilter) {
    filtered = filtered.filter((s) =>
      s.countries.some((c) =>
        c.toLowerCase().includes(countryFilter.toLowerCase())
      )
    );
  }

  // Status filter
  if (statusFilter) {
    filtered = filtered.filter((s) => s.status === statusFilter);
  }

  // Endangered only filter
  if (endangeredOnly) {
    filtered = filtered.filter(
      (s) =>
        s.status === "Endangered" ||
        s.status === "Critically Endangered" ||
        s.status === "Vulnerable"
    );
  }

  return filtered;
}

export function sortSpecies(
  species: FishSpecies[],
  sortBy: SortOption
): FishSpecies[] {
  const sorted = [...species];

  switch (sortBy) {
    case "population":
      return sorted.sort((a, b) => b.population - a.population);
    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "status":
      const statusOrder: Record<string, number> = {
        "Critically Endangered": 0,
        "Endangered": 1,
        "Vulnerable": 2,
        "Near Threatened": 3,
        "Least Concern": 4,
        "Stable": 5,
      };
      return sorted.sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status]
      );
    default:
      return sorted;
  }
}

export function getRelatedSpecies(
  currentSpecies: FishSpecies,
  limit: number = 3
): FishSpecies[] {
  const allSpecies = getAllSpecies();
  const related: FishSpecies[] = [];

  // Find species with similar status
  const sameStatus = allSpecies.filter(
    (s) => s.id !== currentSpecies.id && s.status === currentSpecies.status
  );

  // Find species in same countries
  const sameCountries = allSpecies.filter(
    (s) =>
      s.id !== currentSpecies.id &&
      s.countries.some((c) => currentSpecies.countries.includes(c))
  );

  // Combine and deduplicate
  const combined = [...sameStatus, ...sameCountries];
  const unique = combined.filter(
    (s, index, self) => index === self.findIndex((t) => t.id === s.id)
  );

  return unique.slice(0, limit);
}


