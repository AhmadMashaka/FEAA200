"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Fish } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center glass-strong rounded-3xl shadow-2xl p-16 border border-white/20 max-w-2xl"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-9xl mb-6"
        >
          🐟
        </motion.div>
        <h1 className="text-8xl font-bold text-white mb-4 tracking-tight">404</h1>
        <h2 className="text-3xl font-semibold text-slate-300 mb-4">
          Species Not Found
        </h2>
        <p className="text-lg text-slate-400 mb-10 font-light">
          The fish species you're looking for doesn't exist in our database.
        </p>
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 glass rounded-xl px-8 py-4 text-white font-semibold border border-teal-400/30 bg-gradient-to-r from-teal-500/20 to-teal-600/20 hover:from-teal-500/30 hover:to-teal-600/30 transition-all glow-teal"
          >
            <ArrowLeft size={20} />
            <span>Return to Home</span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
