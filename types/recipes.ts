export interface Recipe {
  id: string;
  speciesId: string;
  speciesName: string;
  country: string;
  cuisine: string;
  title: string;
  ingredients: string[];
  steps: string[];
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  culturalBackground?: string;
  servingSuggestions?: string;
}

export interface RecipeData {
  recipes: Recipe[];
}


