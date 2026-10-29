import React from 'react';
import { motion } from 'motion/react';
import { brandInfo } from '../data/siteContent';
import InstagramIcon from './InstagramIcon';
import MenuBook from './MenuBook';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

/**
 * MenuSection — 3D Interactive Menu Book on Sky-Blue Surface
 *
 * Requirements:
 * 1. Realistic open book on sky-blue surface inspired by the logo.
 * 2. Front cover features the authentic supplied logo image (/assets/brand/logo.jpg).
 * 3. 3D page-turning animation controlled by visible arrows and keyboard.
 * 4. STRICT REQUIREMENT: Absolutely NO food images or videos inside the menu book!
 *    The only image is the official logo on the cover.
 * 5. Authentic dishes, verified details, generous whitespace, editorial typography.
 */
export default function MenuSection() {
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];

  return (
    <section
      id="menu"
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#A5DFEF]/35 via-[#9ED9EA]/20 to-[#B2E4F0]/30"
    >
      {/* Subtle Sky-Blue Table Surface Atmosphere & Ambient Halos */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-sky-300/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-20 w-80 h-80 bg-white/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 -right-20 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.span
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs font-bold uppercase tracking-wider text-coral font-display"
          >
            Handcrafted Menu Book
          </motion.span>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black font-display text-navy tracking-tight"
          >
            Find your kind of comfort.
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2, ease: easeOut }}
            className="mt-3 text-body/85 text-sm sm:text-base leading-relaxed"
          >
            Turn the pages of our café menu book — printed fresh with traditional Sikkim steamed baskets, fiery Korean glazes, and artisan sips. No pre-frozen dough.
          </motion.p>
        </div>

        {/* The Realistic Interactive 3D Menu Book */}
        <MenuBook />

        {/* Bottom Editorial Inquiry & Counter Callout */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-navy/10 text-center max-w-3xl mx-auto shadow-soft-lg flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h4 className="font-display font-bold text-navy text-lg">
              Ask about today's fresh special batch
            </h4>
            <p className="text-xs sm:text-sm text-body/80 mt-1">
              Drop by Gunjan Khau Gali (open 3:00 PM – 3:00 AM) or message us directly on Instagram for custom orders.
            </p>
          </div>

          <a
            href={brandInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-cream font-display font-semibold text-xs sm:text-sm hover:bg-navy-light shadow-sm transition-all duration-200 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
          >
            <InstagramIcon className="w-4 h-4 text-coral" />
            <span>DM {brandInfo.instagramHandle}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
