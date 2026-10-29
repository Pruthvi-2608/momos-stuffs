import React from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function StorySection() {
  const { story } = brandInfo;
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];

  return (
    <section id="story" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Grounded Editorial Story */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow: fades in */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-sky/40 text-navy font-semibold text-xs tracking-wider uppercase mb-5 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 text-coral fill-coral/30" />
              <span>{story.tag}</span>
            </motion.div>

            {/* Heading: reveals line-by-line */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-navy tracking-tight leading-[1.12]">
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.55, ease: easeOut }}
                  className="block text-navy"
                >
                  From the Hills of Sikkim
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span
                  initial={prefersReduced ? false : { y: '105%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
                  className="block text-navy"
                >
                  to the Heart of Vapi.
                </motion.span>
              </div>
            </h2>

            {/* SVG Steam Accent */}
            <div className="my-4 text-sky-500" aria-hidden="true">
              <svg className="w-32 h-4" viewBox="0 0 120 16" fill="none">
                <motion.path
                  d="M2 12C20 4 45 4 60 12C75 20 100 20 118 8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={prefersReduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "100px" }}
                  transition={{ duration: 0.85, ease: 'easeOut' }}
                />
              </svg>
            </div>

            {/* Paragraph */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.35, delay: 0.15, ease: easeOut }}
              className="space-y-4 text-sm sm:text-base text-body/85 leading-relaxed font-sans"
            >
              <p>{story.p1}</p>
              <p>{story.p2}</p>
            </motion.div>

            {/* Grounded Quote Card */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.4, delay: 0.25, ease: easeOut }}
              className="mt-6 p-4 sm:p-5 rounded-2xl bg-cream border border-navy/10 flex items-center gap-4 max-w-lg"
            >
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center shrink-0 text-navy font-bold text-xs">
                M&amp;S
              </div>
              <div>
                <p className="font-display font-bold text-navy text-sm sm:text-base">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <span className="text-xs text-muted">
                  Traditional recipes • Hand-folded daily
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Authentic Store Visual with Clip Inset Reveal */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <motion.div
                initial={prefersReduced ? false : {
                  clipPath: 'inset(12% round 24px)',
                  opacity: 0
                }}
                whileInView={{
                  clipPath: 'inset(0% round 24px)',
                  opacity: 1
                }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.75, delay: 0.1, ease: easeOut }}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-sky-100 shadow-soft-lg border-2 border-white group"
              >
                <img
                  src="/assets/food/post_0_carousel_3.jpg"
                  alt="Cozy interior ambiance at Momos & Stuff"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-coral uppercase tracking-wide mb-1">
                    <MapPin className="w-3.5 h-3.5 text-coral" />
                    <span>Gunjan Khau Gali &amp; Silvassa</span>
                  </div>
                  <p className="font-display font-semibold text-sm sm:text-base text-cream">
                    Where memory chose to stay • Cozy food nook
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
