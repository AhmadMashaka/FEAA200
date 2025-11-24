"use client";

import Link from "next/link";
import { FishSpecies } from "@/types/species";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface SpeciesCardProps {
  species: FishSpecies;
  index?: number;
}

export default function SpeciesCard({ species, index = 0 }: SpeciesCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-gradient-to-r from-red-600 to-red-700";
      case "Endangered":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "Vulnerable":
        return "bg-gradient-to-r from-orange-500 to-orange-600";
      case "Near Threatened":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600";
      case "Least Concern":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "Stable":
        return "bg-gradient-to-r from-teal-500 to-teal-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Decreasing":
        return <TrendingDown size={16} />;
      case "Increasing":
        return <TrendingUp size={16} />;
      default:
        return <Minus size={16} />;
    }
  };

  // Generate unique gradient based on species ID for visual variety
  const gradients = [
    "from-teal-500/40 via-blue-600/30 to-navy/50",
    "from-cyan-500/40 via-teal-600/30 to-blue-700/50",
    "from-blue-500/40 via-indigo-600/30 to-purple-700/50",
    "from-teal-400/40 via-cyan-600/30 to-blue-800/50",
    "from-indigo-500/40 via-blue-600/30 to-teal-700/50",
    "from-cyan-400/40 via-teal-500/30 to-blue-900/50",
  ];
  const gradientIndex = parseInt(species.id) % gradients.length;
  const selectedGradient = gradients[gradientIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/species/${species.id}`}>
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.3 }}
          className={`glass rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:glow-teal transition-all duration-300 border border-white/10 bg-gradient-to-br ${selectedGradient} relative`}
        >
          {/* Status badge - top right */}
          <div className={`absolute top-4 right-4 ${getStatusColor(species.status)} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-10`}>
            {species.status}
          </div>

          {/* Content section - centered vertically */}
          <div className="p-6 pt-8 flex flex-col justify-center min-h-[280px]">
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight pr-20">
              {species.name}
            </h3>
            <p className="text-sm text-teal-200 italic mb-5 font-light">
              {species.scientificName}
            </p>
            
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-slate-300">Population:</span>
                <span className="font-bold text-white">
                  {species.population.toLocaleString()}
                </span>
              </div>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                species.populationTrend === "Decreasing" ? "bg-red-500/20 text-red-300" :
                species.populationTrend === "Increasing" ? "bg-green-500/20 text-green-300" :
                "bg-teal-500/20 text-teal-300"
              }`}>
                {getTrendIcon(species.populationTrend)}
                <span className="font-semibold text-xs">
                  {species.populationTrend}
                </span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-slate-400">
                Found in <span className="text-teal-300 font-semibold">{species.countries.length}</span> {species.countries.length === 1 ? "country" : "countries"}
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
