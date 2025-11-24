"use client";

import { motion } from "framer-motion";
import { ExternalLink, Fish, Shield, Globe, Database, Filter } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl shadow-2xl p-10 md:p-16 border border-white/20 mb-10"
        >
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">About</h1>

          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-300 leading-relaxed font-light"
            >
              Welcome to the <span className="text-teal-400 font-semibold">Fish Species Explorer</span>, a comprehensive
              database designed to help users explore global fish species, their
              conservation status, population trends, and geographic distribution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mt-10 mb-6 tracking-tight flex items-center space-x-3">
                <Fish className="text-teal-400" size={32} />
                <span>Our Mission</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                Our mission is to raise awareness about marine biodiversity and the
                conservation status of fish species worldwide. By providing accessible
                information about fish populations, their habitats, and the threats they
                face, we aim to promote marine conservation and sustainable fishing
                practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-white mt-10 mb-6 tracking-tight flex items-center space-x-3">
                <Database className="text-teal-400" size={32} />
                <span>Features</span>
              </h2>
              <ul className="space-y-4">
                {[
                  { icon: Database, text: "Comprehensive Species Database: Browse detailed information about various fish species from around the world" },
                  { icon: Shield, text: "Conservation Status: View IUCN conservation status classifications for each species" },
                  { icon: Fish, text: "Population Data: Access population estimates and trends for different species" },
                  { icon: Globe, text: "Geographic Distribution: Explore which countries each species is found in" },
                  { icon: Shield, text: "No-Fishing Zones: Learn about protected areas and marine sanctuaries" },
                  { icon: Filter, text: "Advanced Filtering: Filter species by country, conservation status, and more" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start space-x-4 glass rounded-2xl p-5 border border-white/10"
                    >
                      <Icon className="text-teal-400 mt-1 flex-shrink-0" size={24} />
                      <span className="text-slate-300 font-light">{item.text}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mt-10 mb-6 tracking-tight flex items-center space-x-3">
                <Globe className="text-teal-400" size={32} />
                <span>Data Sources</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light mb-6">
                Our data is compiled from various authoritative sources including:
              </p>
              <ul className="space-y-3">
                {[
                  { name: "International Union for Conservation of Nature (IUCN)", url: "https://www.iucn.org/" },
                  { name: "Food and Agriculture Organization (FAO)", url: "https://www.fao.org/" },
                  { name: "FishBase", url: "https://www.fishbase.se/" },
                ].map((source, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors group glass rounded-xl p-4 border border-white/10"
                    >
                      <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                      <span className="font-medium">{source.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mt-10 mb-6 tracking-tight">
                Conservation Status Categories
              </h2>
              <div className="space-y-4">
                {[
                  { status: "Critically Endangered", color: "from-red-600 to-red-700", desc: "Extremely high risk of extinction in the wild" },
                  { status: "Endangered", color: "from-red-500 to-red-600", desc: "Very high risk of extinction in the wild" },
                  { status: "Vulnerable", color: "from-orange-500 to-orange-600", desc: "High risk of extinction in the wild" },
                  { status: "Near Threatened", color: "from-yellow-500 to-yellow-600", desc: "Close to qualifying for a threatened category" },
                  { status: "Least Concern", color: "from-green-500 to-green-600", desc: "Widespread and abundant" },
                  { status: "Stable", color: "from-teal-500 to-teal-600", desc: "Population is stable and not declining" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="flex items-center space-x-4 glass rounded-2xl p-5 border border-white/10"
                  >
                    <span className={`bg-gradient-to-r ${item.color} text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg`}>
                      {item.status}
                    </span>
                    <span className="text-slate-300 font-light">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl font-bold text-white mt-10 mb-6 tracking-tight">
                Contact & Support
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                This application was developed as part of a FEAA (Faculty of Economics
                and Business Administration) course project. For questions or
                suggestions, please refer to the project documentation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-10 p-6 glass rounded-2xl border border-teal-400/30 bg-teal-500/10"
            >
              <p className="text-sm text-teal-200">
                <strong className="text-teal-300">Note:</strong> This is a sample application with simulated
                data for educational purposes. For accurate, real-time conservation
                data, please refer to official sources such as the IUCN Red List.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
