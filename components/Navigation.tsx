"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Globe, AlertTriangle, Info, UtensilsCrossed } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/countries", label: "Countries", icon: Globe },
    { href: "/endangered", label: "Endangered", icon: AlertTriangle },
    { href: "/recipes", label: "Recipes", icon: UtensilsCrossed },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-3xl"
            >
              🐟
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent tracking-tight">
              Fish Species Explorer
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-teal-500/30 to-teal-600/30 text-white glow-teal"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-400/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
