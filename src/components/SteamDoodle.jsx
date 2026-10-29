import React from 'react';
import { motion } from 'motion/react';

export default function SteamDoodle({ className = "w-10 h-10 text-sky-500" }) {
  return (
    <svg 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M20 48C17 40 23 32 20 24C18 20 15 16 18 10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ 
          pathLength: [0.2, 1, 0.8],
          opacity: [0.4, 0.85, 0.4],
          y: [2, -4, 2]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.path
        d="M30 52C27 42 33 34 30 22C28 16 25 12 28 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ 
          pathLength: [0.3, 1, 0.7],
          opacity: [0.5, 1, 0.5],
          y: [3, -5, 3]
        }}
        transition={{ 
          duration: 3.4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      <motion.path
        d="M40 48C37 38 43 30 40 20C38 15 35 12 38 8"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ 
          pathLength: [0.2, 1, 0.8],
          opacity: [0.4, 0.85, 0.4],
          y: [2, -4, 2]
        }}
        transition={{ 
          duration: 3.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.6
        }}
      />
    </svg>
  );
}
