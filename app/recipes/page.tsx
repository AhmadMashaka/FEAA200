"use client";

import { motion } from "framer-motion";
import RecipeCard from "@/components/RecipeCard";
import { getRecipesForNonEndangeredSpecies, getNonEndangeredSpecies } from "@/lib/recipes";
import { Search, Filter, UtensilsCrossed } from "lucide-react";
import { useState, useMemo } from "react";

export default function RecipesPage() {
  const allRecipes = getRecipesForNonEndangeredSpecies();
  const nonEndangeredSpecies = getNonEndangeredSpecies();

  const [searchQuery, setSearchQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  // Get unique cuisines and countries
  const cuisines = useMemo(() => {
    const cuisineSet = new Set(allRecipes.map(r => r.cuisine));
    return Array.from(cuisineSet).sort();
  }, [allRecipes]);

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    let filtered = [...allRecipes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.speciesName.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query) ||
          r.country.toLowerCase().includes(query)
      );
    }

    if (cuisineFilter) {
      filtered = filtered.filter((r) => r.cuisine === cuisineFilter);
    }

    if (difficultyFilter) {
      filtered = filtered.filter((r) => r.difficulty === difficultyFilter);
    }

    return filtered;
  }, [searchQuery, cuisineFilter, difficultyFilter, allRecipes]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-4">
            <UtensilsCrossed className="text-teal-400" size={48} />
            <div>
              <h1 className="text-5xl font-bold text-white tracking-tight">
                Sustainable Fish Recipes
              </h1>
              <p className="text-xl text-slate-300 font-light mt-2">
                Cook delicious dishes using non-endangered fish species
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="glass-strong rounded-2xl p-6 border border-teal-400/30 bg-teal-500/10 mt-6">
            <p className="text-teal-200 text-sm">
              <span className="font-bold text-teal-300">🌊 Sustainable Cooking:</span> All recipes feature fish species that are not endangered. 
              We have <span className="font-semibold">{nonEndangeredSpecies.length} sustainable species</span> and <span className="font-semibold">{allRecipes.length} authentic recipes</span> from cuisines around the world.
            </p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl shadow-2xl p-8 mb-10 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Bar */}
            <div className="md:col-span-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes, fish, or cuisine..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Cuisine Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 pointer-events-none z-10" size={20} />
              <select
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-navy text-white">All Cuisines</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine} className="bg-navy text-white">
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="relative">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-navy text-white">All Difficulty Levels</option>
                <option value="Easy" className="bg-navy text-white">Easy</option>
                <option value="Medium" className="bg-navy text-white">Medium</option>
                <option value="Hard" className="bg-navy text-white">Hard</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-center">
            <p className="text-slate-300">
              Showing <span className="text-teal-400 font-bold text-xl">{filteredRecipes.length}</span> of{" "}
              <span className="text-white font-semibold">{allRecipes.length}</span> recipes
            </p>
          </div>
        </motion.div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-strong rounded-3xl shadow-2xl p-16 text-center border border-white/20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl text-white font-semibold mb-2">No recipes found</p>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

