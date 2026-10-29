import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Clock, Sparkles } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import InstagramIcon from './InstagramIcon';
import ParticleMorphImage from './ParticleMorphImage';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

/**
 * Hero Section — Sky-Blue Signature Viewport
 *
 * Requirements fulfilled:
 * 1. Background: Full-viewport sky-blue color directly sampled from the official Momos & Stuff logo
 *    with soft organic paper-like cream/white contours.
 * 2. Typography: Deep navy (#153B58) headings with warm cream (#FFF9F0) and momo-coral accents.
 * 3. Particle-Swarm Image Morph: Real particle-based transition swapping between authentic
 *    Instagram food images every 5-6 seconds, with manual controls and continuous loop.
 * 4. Text & Interactions: Refined line-by-line reveal, smooth CTAs, verified business chips.
 */
export default function Hero() {
  const prefersReduced = useReducedMotionPreference();
  const easeOutCubic = [0.22, 1, 0.36, 1];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden bg-gradient-to-b from-[#081522] via-[#0D2235] to-[#0A1A2A] text-cream"
    >
      {/* Subtle Organic Background Glows & Soft Atmospheric Steam */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-24 -translate-y-1/2 w-[540px] h-[540px] rounded-full bg-[#67D4F8]/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-coral/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      
      {/* Subtle organic wavy steam line in the deep navy field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 -z-10" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none">
          <path
            d="M-100 250 C 300 120, 600 380, 1000 200 C 1200 120, 1400 280, 1600 180"
            stroke="rgba(103, 212, 248, 0.12)"
            strokeWidth="70"
            strokeLinecap="round"
          />
          <path
            d="M-100 550 C 250 420, 700 680, 1100 480 C 1300 400, 1500 520, 1650 450"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="90"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Editorial Headline, Supporting Copy, and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Eyebrow Label with Dumpling Steam Sparkle */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: easeOutCubic }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-cream font-display font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-coral shrink-0 animate-pulse" aria-hidden="true" />
              <span>Authentic Sikkim Recipes • Gunjan, Vapi</span>
              <span className="hidden sm:inline text-white/30 font-mono text-[10px]">•</span>
              <span className="hidden sm:inline text-sky-200/80 text-[11px] lowercase tracking-normal font-sans">freshly steamed</span>
            </motion.div>

            {/* Line-by-Line Editorial Headline Reveal */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black font-display text-cream tracking-tight leading-[1.04]">
              {/* Line 1 */}
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: easeOutCubic }}
                  className="block text-cream"
                >
                  Little bites.
                </motion.span>
              </div>

              {/* Line 2 with Handcrafted Steam Arc & Sky Blue Focal Word */}
              <div className="overflow-hidden pb-3">
                <motion.span
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.18, ease: easeOutCubic }}
                  className="block text-cream"
                >
                  Big{' '}
                  <span className="relative inline-block text-[#67D4F8] drop-shadow-[0_0_28px_rgba(103,212,248,0.4)]">
                    comfort.
                    {/* Organic sky-blue steam underline */}
                    <svg
                      className="absolute -bottom-2.5 left-0 w-full h-3.5 text-[#67D4F8]"
                      viewBox="0 0 190 12"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M2 8C50 2 140 2 188 8"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={prefersReduced ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.85, delay: 0.5, ease: 'easeOut' }}
                      />
                    </svg>
                  </span>
                </motion.span>
              </div>
            </h1>

            {/* Supporting Copy */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35, ease: easeOutCubic }}
              className="mt-6 text-base sm:text-lg lg:text-[19px] text-cream/85 leading-relaxed max-w-xl font-medium"
            >
              Handcrafted Himalayan momos, fiery Korean glazes, and cozy café sips. Hand-folded fresh daily and served steaming hot in Gunjan Khau Gali until 3:00 AM.
            </motion.p>

            {/* Verified Meta Chips */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.44, ease: easeOutCubic }}
              className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-cream font-semibold"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-[#67D4F8] shrink-0" />
                <span>Open 3:00 PM – 3:00 AM Daily</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-coral shrink-0" />
                <span>Khau Gali, Gunjan, Vapi</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <motion.a
                href="#menu"
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.52, ease: easeOutCubic }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#67D4F8] text-navy font-display font-black text-sm sm:text-base shadow-lg shadow-sky-400/25 hover:bg-[#83E1FD] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-400/35 active:translate-y-0 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#67D4F8]"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href={brandInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.58, ease: easeOutCubic }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-cream font-display font-bold text-sm sm:text-base shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <InstagramIcon className="w-4 h-4 text-coral" />
                <span>{brandInfo.instagramHandle}</span>
              </motion.a>
            </div>

          </div>

          {/* Right Column: Particle-Swarm Image Morph Showcase */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.25, ease: easeOutCubic }}
              className="w-full max-w-md lg:max-w-lg relative"
            >
              {/* Real Particle-Swarm Food Image Morph Canvas */}
              <ParticleMorphImage />

              {/* Floating Late-Night Badge */}
              <motion.div
                animate={prefersReduced ? {} : { y: [0, -5, 0] }}
                transition={prefersReduced ? {} : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-3 sm:-left-6 bg-[#0A1B2C]/90 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shadow-floating flex items-center gap-3 z-20 pointer-events-none"
              >
                <div className="w-9 h-9 rounded-full bg-sky-400/20 flex items-center justify-center text-[#67D4F8] shrink-0">
                  <Sparkles className="w-4.5 h-4.5 text-[#67D4F8]" />
                </div>
                <div>
                  <div className="font-display font-bold text-cream text-xs sm:text-sm">
                    Midnight Cravings
                  </div>
                  <div className="text-[11px] text-sky-200/70 font-medium">
                    Served hot till 3:00 AM
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}