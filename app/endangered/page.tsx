"use client";

import SpeciesCard from "@/components/SpeciesCard";
import { getEndangeredSpecies } from "@/lib/data";
import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, AlertOctagon } from "lucide-react";

export default function EndangeredPage() {
  const endangeredSpecies = getEndangeredSpecies();

  const criticallyEndangered = endangeredSpecies.filter(
    (s) => s.status === "Critically Endangered"
  );
  const endangered = endangeredSpecies.filter(
    (s) => s.status === "Endangered"
  );
  const vulnerable = endangeredSpecies.filter(
    (s) => s.status === "Vulnerable"
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
            Endangered Species
          </h1>
          <p className="text-xl text-slate-300 font-light">
            Species that require urgent conservation attention
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="glass-strong rounded-3xl shadow-2xl p-8 border border-red-500/30 bg-gradient-to-br from-red-600/30 to-red-700/20"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertOctagon className="text-red-300" size={32} />
              <h3 className="text-sm font-bold text-red-200 uppercase tracking-wider">
                Critically Endangered
              </h3>
            </div>
            <p className="text-6xl font-bold text-white mb-2">{criticallyEndangered.length}</p>
            <p className="text-sm text-red-200 font-medium">Species</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="glass-strong rounded-3xl shadow-2xl p-8 border border-red-400/30 bg-gradient-to-br from-red-500/30 to-red-600/20"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="text-red-200" size={32} />
              <h3 className="text-sm font-bold text-red-100 uppercase tracking-wider">Endangered</h3>
            </div>
            <p className="text-6xl font-bold text-white mb-2">{endangered.length}</p>
            <p className="text-sm text-red-200 font-medium">Species</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="glass-strong rounded-3xl shadow-2xl p-8 border border-orange-500/30 bg-gradient-to-br from-orange-500/30 to-orange-600/20"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="text-orange-200" size={32} />
              <h3 className="text-sm font-bold text-orange-100 uppercase tracking-wider">Vulnerable</h3>
            </div>
            <p className="text-6xl font-bold text-white mb-2">{vulnerable.length}</p>
            <p className="text-sm text-orange-200 font-medium">Species</p>
          </motion.div>
        </div>

        {/* Critically Endangered */}
        {criticallyEndangered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                CRITICALLY ENDANGERED
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {criticallyEndangered.length} Species
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {criticallyEndangered.map((species, index) => (
                <SpeciesCard key={species.id} species={species} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Endangered */}
        {endangered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                ENDANGERED
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {endangered.length} Species
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {endangered.map((species, index) => (
                <SpeciesCard key={species.id} species={species} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Vulnerable */}
        {vulnerable.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                VULNERABLE
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {vulnerable.length} Species
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vulnerable.map((species, index) => (
                <SpeciesCard key={species.id} species={species} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {endangeredSpecies.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-3xl shadow-2xl p-16 text-center border border-white/20"
          >
            <div className="text-6xl mb-4">✅</div>
            <p className="text-2xl text-white font-semibold mb-2">
              No endangered species found
            </p>
            <p className="text-slate-400">in the database</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
