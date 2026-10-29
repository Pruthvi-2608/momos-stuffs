import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function AnnouncementBar() {
  const { announcement } = brandInfo;
  const prefersReduced = useReducedMotionPreference();
  if (!announcement) return null;

  return (
    <motion.aside
      aria-label="Opening announcements"
      initial={prefersReduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-navy text-cream py-2.5 px-4 text-xs sm:text-sm font-medium border-b border-navy-light/40 relative z-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden mx-auto sm:mx-0">
          <motion.span
            initial={prefersReduced ? false : { scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-2 h-2 rounded-full bg-coral shrink-0"
            aria-hidden="true"
          />
          <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-sky uppercase tracking-wider shrink-0">
            {announcement.badge}
          </span>
          <p className="truncate text-cream/90 font-sans">
            {announcement.text}
          </p>
        </div>

        <a
          href={announcement.ctaLink}
          className="hidden sm:inline-flex items-center gap-1.5 text-sky hover:text-white font-semibold transition-colors duration-200 shrink-0 text-xs group"
        >
          <span>{announcement.ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.aside>
  );
}
