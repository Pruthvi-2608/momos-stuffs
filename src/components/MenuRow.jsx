import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function MenuRow({ item, index, totalInCol }) {
  const prefersReduced = useReducedMotionPreference();
  const seqNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      className={`group relative p-4 sm:p-5 rounded-2xl transition-colors duration-200 ${
        item.featured
          ? 'bg-sky-50/70 border border-sky-200/80 hover:bg-sky-100/60'
          : 'bg-white/60 hover:bg-sky-50/50 border border-navy/5 hover:border-sky-200/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        
        {/* Sequence Number */}
        <span className="font-display font-bold text-xs text-coral/80 group-hover:text-coral group-hover:translate-x-0.5 transition-all duration-200 pt-0.5 shrink-0 tracking-wider">
          {seqNumber}
        </span>

        {/* Item Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-base sm:text-lg text-navy tracking-tight group-hover:text-navy-light transition-colors">
              {item.name}
            </h3>

            {item.featured && (
              <span className="inline-block px-2 py-0.5 rounded-full bg-white text-[10px] font-bold uppercase tracking-wider text-navy/70 border border-navy/10 shrink-0">
                Featured
              </span>
            )}

            {item.flavor && (
              <span className="text-[11px] font-medium text-coral/90 hidden sm:inline-block">
                • {item.flavor}
              </span>
            )}
          </div>

          <p className="mt-1 text-xs sm:text-sm text-body/80 leading-relaxed font-sans">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-cream text-[10px] font-medium text-navy/70 border border-navy/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price / Note aligned to far edge */}
        <div className="text-right shrink-0 flex flex-col items-end pt-0.5">
          {item.price ? (
            <span className="font-display font-bold text-base sm:text-lg text-navy tracking-tight">
              {item.price}
            </span>
          ) : (
            <span className="font-display font-semibold text-xs sm:text-sm text-navy/75 bg-cream px-2.5 py-1 rounded-full border border-navy/10 whitespace-nowrap">
              {item.priceNote || 'Ask at counter'}
            </span>
          )}

          <span className="text-[10px] text-muted mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 flex items-center gap-0.5">
            <span>Fresh batch</span>
            <ArrowUpRight className="w-2.5 h-2.5 text-coral" />
          </span>
        </div>

      </div>

      {/* Thin Animated Divider */}
      <motion.div
        initial={prefersReduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.3, delay: 0.1 + (index % 6) * 0.04, ease: 'easeOut' }}
        className="mt-4 w-full h-[1px] bg-navy/10 origin-left"
        aria-hidden="true"
      />
    </motion.div>
  );
}
