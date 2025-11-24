"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { getSpeciesById } from "@/lib/data";
import { getRecipesBySpeciesId } from "@/lib/recipes";
import { ArrowLeft, Clock, ChefHat, Globe, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

interface RecipeDetailPageProps {
  params: Promise<{ speciesId: string }>;
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { speciesId } = use(params);
  const species = getSpeciesById(speciesId);
  const recipes = getRecipesBySpeciesId(speciesId);

  if (!species) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-white">Species not found</p>
          <Link href="/recipes" className="text-teal-400 mt-4 inline-block">
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <Link href="/recipes">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center space-x-2 text-teal-400 mb-8 hover:text-teal-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Recipes</span>
            </motion.button>
          </Link>

          <div className="glass-strong rounded-3xl p-16 text-center">
            <p className="text-2xl text-white font-semibold mb-2">No recipes available</p>
            <p className="text-slate-400">
              {species.status === "Endangered" || species.status === "Critically Endangered"
                ? "This species is endangered. We only feature recipes for sustainable, non-endangered fish."
                : "Recipes for this species are coming soon."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-teal-400";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Back Button */}
        <Link href="/recipes">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center space-x-2 text-teal-400 mb-8 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Recipes</span>
          </motion.button>
        </Link>

        {/* Species Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="glass-strong rounded-3xl p-8 border border-white/20">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
                  {species.name}
                </h1>
                <p className="text-xl text-slate-300 italic mb-4">{species.scientificName}</p>
                <p className="text-slate-400 mb-4">{species.description}</p>
              </div>
              <StatusBadge status={species.status} />
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <div className="glass rounded-xl px-4 py-2 border border-white/10">
                <span className="text-teal-400 font-semibold">{recipes.length}</span>
                <span className="text-slate-300 ml-2">Recipes</span>
              </div>
              <div className="glass rounded-xl px-4 py-2 border border-white/10">
                <span className="text-teal-400 font-semibold">{species.countries.length}</span>
                <span className="text-slate-300 ml-2">Countries</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recipes by Country */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">Recipes from Around the World</h2>

          <div className="space-y-8">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-3xl p-8 border border-white/20"
              >
                {/* Recipe Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{recipe.title}</h3>
                    <div className="flex items-center space-x-4 text-slate-300">
                      <div className="flex items-center space-x-2">
                        <Globe size={18} className="text-teal-400" />
                        <span>{recipe.country}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500">•</span>
                        <span className="text-teal-300 font-semibold">{recipe.cuisine}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recipe Meta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="glass rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock size={18} className="text-teal-400" />
                      <span className="text-slate-400 text-sm font-semibold">Prep Time</span>
                    </div>
                    <p className="text-white font-bold">{recipe.time}</p>
                  </div>
                  <div className="glass rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <ChefHat size={18} className="text-teal-400" />
                      <span className="text-slate-400 text-sm font-semibold">Difficulty</span>
                    </div>
                    <p className={`font-bold ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users size={18} className="text-teal-400" />
                      <span className="text-slate-400 text-sm font-semibold">Serves</span>
                    </div>
                    <p className="text-white font-bold">4-6 people</p>
                  </div>
                </div>

                {/* Cultural Background */}
                {recipe.culturalBackground && (
                  <div className="mb-6 p-5 bg-teal-500/10 rounded-2xl border border-teal-400/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen size={18} className="text-teal-400" />
                      <span className="text-teal-300 font-semibold">Cultural Background</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{recipe.culturalBackground}</p>
                  </div>
                )}

                {/* Ingredients */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-2 h-8 bg-teal-400 rounded-full mr-3"></span>
                    Ingredients
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-3 text-slate-300 bg-white/5 rounded-lg p-3"
                      >
                        <span className="text-teal-400 mt-1">✓</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cooking Steps */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                    <span className="w-2 h-8 bg-teal-400 rounded-full mr-3"></span>
                    Instructions
                  </h4>
                  <ol className="space-y-4">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="flex space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center text-teal-300 font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-slate-300 pt-1 flex-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Serving Suggestions */}
                {recipe.servingSuggestions && (
                  <div className="p-5 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-2xl border border-white/10">
                    <h4 className="text-lg font-bold text-teal-300 mb-2">Serving Suggestions</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{recipe.servingSuggestions}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

