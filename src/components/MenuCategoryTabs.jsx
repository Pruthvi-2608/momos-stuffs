import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function MenuCategoryTabs({ categories, activeCategory, onSelectCategory }) {
  const prefersReduced = useReducedMotionPreference();

  return (
    <div
      role="group"
      aria-label="Menu categories"
      className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 sm:mb-12 gap-2 sm:gap-2.5 no-scrollbar scrollbar-none"
    >
      {categories.map((cat, idx) => {
        const isActive = activeCategory === cat.id;

        return (
          <motion.button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            aria-pressed={isActive}
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.045 }}
            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
              isActive
                ? 'text-navy shadow-sm'
                : 'text-body/75 hover:text-navy bg-white/70 border border-navy/10 hover:border-navy/20'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="menuActiveTab"
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute inset-0 bg-sky-200/90 border border-sky-400/60 rounded-full -z-10"
                aria-hidden="true"
              />
            )}
            <span>{cat.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
