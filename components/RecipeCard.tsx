"use client";

import Link from "next/link";
import { Recipe } from "@/types/recipes";
import { motion } from "framer-motion";
import { Clock, ChefHat, Globe } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "Hard":
        return "bg-red-500/20 text-red-300 border-red-400/30";
      default:
        return "bg-teal-500/20 text-teal-300 border-teal-400/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/recipes/${recipe.speciesId}`}>
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:glow-teal transition-all duration-300 border border-white/10 bg-gradient-to-br from-teal-500/20 via-blue-600/20 to-navy/30"
        >
          <div className="p-6">
            {/* Header with cuisine badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Globe className="text-teal-400" size={20} />
                <span className="text-sm font-semibold text-teal-300">
                  {recipe.cuisine}
                </span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight line-clamp-2">
              {recipe.title}
            </h3>

            {/* Species name */}
            <p className="text-sm text-teal-200 mb-4">
              Using: <span className="font-semibold">{recipe.speciesName}</span>
            </p>

            {/* Time and Chef Icon */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="text-slate-400" size={18} />
                <span className="text-sm text-slate-300">{recipe.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChefHat className="text-slate-400" size={18} />
                <span className="text-sm text-slate-300">{recipe.country}</span>
              </div>
            </div>

            {/* Cultural background preview */}
            {recipe.culturalBackground && (
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                {recipe.culturalBackground}
              </p>
            )}

            {/* View Recipe Button */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-sm font-semibold text-teal-400 group-hover:text-teal-300">
                View Recipe →
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

