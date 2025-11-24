"use client";

import { useState, useMemo } from "react";
import SpeciesCard from "@/components/SpeciesCard";
import {
  getAllSpecies,
  getAllCountries,
  filterSpecies,
  sortSpecies,
  SortOption,
} from "@/lib/data";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, Globe, AlertTriangle } from "lucide-react";

export default function Home() {
  const allSpecies = getAllSpecies();
  const allCountries = getAllCountries();
  const statusOptions = [
    "Critically Endangered",
    "Endangered",
    "Vulnerable",
    "Near Threatened",
    "Least Concern",
    "Stable",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [endangeredOnly, setEndangeredOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("alphabetical");

  const filteredAndSortedSpecies = useMemo(() => {
    let filtered = filterSpecies(
      allSpecies,
      searchQuery,
      countryFilter,
      statusFilter,
      endangeredOnly
    );
    return sortSpecies(filtered, sortBy);
  }, [searchQuery, countryFilter, statusFilter, endangeredOnly, sortBy]);

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
            Explore Global Fish Species
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Discover information about fish species, their conservation status, and global distribution
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl shadow-2xl p-8 mb-10 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Search Bar */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or scientific name..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Country Filter */}
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 pointer-events-none z-10" size={20} />
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-navy text-white">All Countries</option>
                {allCountries.map((country) => (
                  <option key={country} value={country} className="bg-navy text-white">
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <AlertTriangle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 pointer-events-none z-10" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-navy text-white">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status} className="bg-navy text-white">
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Endangered Only Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="endangeredOnly"
                checked={endangeredOnly}
                onChange={(e) => setEndangeredOnly(e.target.checked)}
                className="w-5 h-5 rounded bg-white/10 border-white/20 text-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
              />
              <label htmlFor="endangeredOnly" className="text-white font-medium cursor-pointer">
                Show only endangered species
              </label>
            </div>

            {/* Sort By */}
            <div className="relative">
              <SortAsc className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400 pointer-events-none z-10" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="alphabetical" className="bg-navy text-white">Alphabetical</option>
                <option value="population" className="bg-navy text-white">Population</option>
                <option value="status" className="bg-navy text-white">Status</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="text-right">
              <p className="text-slate-300 text-sm mb-1">Results</p>
              <p className="text-2xl font-bold text-white">
                <span className="text-teal-400">{filteredAndSortedSpecies.length}</span>
                <span className="text-slate-400 text-lg"> / {allSpecies.length}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Species Grid */}
        {filteredAndSortedSpecies.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAndSortedSpecies.map((species, index) => (
              <SpeciesCard key={species.id} species={species} index={index} />
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
            <p className="text-2xl text-white font-semibold mb-2">No species found</p>
            <p className="text-slate-400">Try adjusting your search criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
