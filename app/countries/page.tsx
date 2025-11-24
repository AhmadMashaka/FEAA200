"use client";

import { useState } from "react";
import SpeciesCard from "@/components/SpeciesCard";
import { getAllCountries, getSpeciesByCountry } from "@/lib/data";
import { motion } from "framer-motion";
import { Globe, AlertTriangle, Shield, Fish } from "lucide-react";

export default function CountriesPage() {
  const allCountries = getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState("");

  const speciesInCountry = selectedCountry
    ? getSpeciesByCountry(selectedCountry)
    : [];

  const endangeredCount = speciesInCountry.filter(
    (s) =>
      s.status === "Endangered" ||
      s.status === "Critically Endangered" ||
      s.status === "Vulnerable"
  ).length;

  const hasNoFishingZones = speciesInCountry.some(
    (s) => s.noFishingZones.length > 0
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Explore by Country
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Select a country to see all fish species found there
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl shadow-2xl p-8 mb-10 border border-white/20"
        >
          <label htmlFor="country-select" className="block text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
            Select Country
          </label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 pointer-events-none z-10" size={20} />
            <select
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full md:w-1/2 pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm appearance-none cursor-pointer"
            >
              <option value="" className="bg-navy text-white">Choose a country...</option>
              {allCountries.map((country) => (
                <option key={country} value={country} className="bg-navy text-white">
                  {country}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Country Stats */}
            <div className="glass-strong rounded-3xl shadow-2xl p-10 mb-10 border border-white/20">
              <div className="flex items-center space-x-3 mb-8">
                <Globe className="text-teal-400" size={32} />
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  {selectedCountry} - Species Overview
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-8 border border-white/10 bg-gradient-to-br from-teal-500/20 to-teal-600/10"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Fish className="text-teal-400" size={24} />
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Species</p>
                  </div>
                  <p className="text-5xl font-bold text-white">
                    {speciesInCountry.length}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-8 border border-white/10 bg-gradient-to-br from-red-500/20 to-red-600/10"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertTriangle className="text-red-400" size={24} />
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Endangered Species</p>
                  </div>
                  <p className="text-5xl font-bold text-white">
                    {endangeredCount}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-8 border border-white/10 bg-gradient-to-br from-green-500/20 to-green-600/10"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="text-green-400" size={24} />
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">No-Fishing Zones</p>
                  </div>
                  <p className="text-5xl font-bold text-white">
                    {hasNoFishingZones ? "Yes" : "No"}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Species List */}
            {speciesInCountry.length > 0 ? (
              <>
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-white tracking-tight">
                    Species Found in {selectedCountry}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {speciesInCountry.map((species, index) => (
                    <div key={species.id} className="relative">
                      <SpeciesCard species={species} index={index} />
                      {(species.status === "Endangered" ||
                        species.status === "Critically Endangered" ||
                        species.status === "Vulnerable") && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg glow-teal z-10"
                        >
                          ⚠️ Endangered
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-3xl shadow-2xl p-16 text-center border border-white/20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-2xl text-white font-semibold mb-2">No species data available</p>
                <p className="text-slate-400">for {selectedCountry}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {!selectedCountry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl shadow-2xl p-16 text-center border border-white/20"
          >
            <Globe className="mx-auto text-6xl text-teal-400 mb-6" size={64} />
            <p className="text-2xl text-white font-semibold mb-2">
              Select a country to explore
            </p>
            <p className="text-slate-400">
              Choose from the dropdown above to view species
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
