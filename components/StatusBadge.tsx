"use client";

import { ConservationStatus } from "@/types/species";
import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: ConservationStatus;
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const getStatusColor = (status: ConservationStatus) => {
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

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${getStatusColor(status)} ${sizeClasses[size]} text-white rounded-full font-bold inline-block shadow-lg glow-teal`}
    >
      {status}
    </motion.span>
  );
}
