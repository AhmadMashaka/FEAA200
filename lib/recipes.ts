import { Recipe, RecipeData } from "@/types/recipes";
import { FishSpecies } from "@/types/species";
import recipeData from "@/data/recipes.json";

export function getAllRecipes(): Recipe[] {
  return (recipeData as RecipeData).recipes;
}

export function getRecipesBySpecies(speciesId: string): Recipe[] {
  return getAllRecipes().filter((recipe) => recipe.speciesId === speciesId);
}

export function getRecipesByCountry(country: string): Recipe[] {
  return getAllRecipes().filter((recipe) =>
    recipe.country.toLowerCase().includes(country.toLowerCase())
  );
}

export function getRecipesBySpeciesAndCountry(
  speciesId: string,
  country: string
): Recipe[] {
  return getAllRecipes().filter(
    (recipe) =>
      recipe.speciesId === speciesId &&
      recipe.country.toLowerCase().includes(country.toLowerCase())
  );
}

export function getNonEndangeredSpecies(): FishSpecies[] {
  const { getAllSpecies } = require("./data");
  return getAllSpecies().filter(
    (species: FishSpecies) =>
      species.status !== "Endangered" &&
      species.status !== "Critically Endangered" &&
      species.status !== "Vulnerable"
  );
}

export function getRecipesForNonEndangeredSpecies(): Recipe[] {
  const nonEndangered = getNonEndangeredSpecies();
  const nonEndangeredIds = new Set(nonEndangered.map((s) => s.id));
  return getAllRecipes().filter((recipe) =>
    nonEndangeredIds.has(recipe.speciesId)
  );
}


