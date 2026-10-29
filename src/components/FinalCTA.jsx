import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function FinalCTA() {
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];

  return (
    <section className="py-20 md:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Deep-Navy Rounded Panel */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="relative rounded-[32px] sm:rounded-[40px] bg-navy text-cream p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl text-center flex flex-col items-center"
        >
          {/* Subtle background ambient glow */}
          <div
            className="absolute -top-24 -right-24 w-80 h-80 bg-sky/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 bg-coral/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Steam Line Drawing (once over 800ms) */}
          <div className="mb-4 text-sky" aria-hidden="true">
            <svg className="w-20 h-6" viewBox="0 0 80 24" fill="none">
              <motion.path
                d="M10 20C18 10 22 14 30 6C38 -2 42 22 50 14C58 6 62 10 70 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={prefersReduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </svg>
          </div>

          {/* Short Heading: reveals over 450-550ms */}
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-tight max-w-xl"
          >
            Your next comfort-food moment starts here.
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16, ease: easeOut }}
            className="mt-4 text-sm sm:text-base text-cream/80 max-w-lg leading-relaxed font-sans"
          >
            Steaming baskets of authentic Sikkim momos, fiery Korean glazes, and refreshing café sips are waiting for you in Gunjan Khau Gali tonight.
          </motion.p>

          {/* Actions: Button enters 80ms later */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.24, ease: easeOut }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-sky text-navy font-display font-bold text-sm sm:text-base shadow-soft hover:bg-sky-300 transition-colors duration-200 group"
            >
              <span>Explore the Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <a
              href="#visit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-display font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors duration-200"
            >
              <MapPin className="w-4 h-4 text-coral" />
              <span>Visit Us Tonight</span>
            </a>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
