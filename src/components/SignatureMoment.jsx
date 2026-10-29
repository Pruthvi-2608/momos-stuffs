import React from 'react';
import { motion } from 'motion/react';
import { Flame, Check, ArrowRight } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function SignatureMoment() {
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];

  return (
    <section id="signature" className="py-20 md:py-28 bg-navy text-cream relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-sky/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-coral/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Asymmetrical 60/40 split: 7 cols Image (approx 58%), 5 cols Text */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Backing decorative frame */}
              <div
                className="absolute inset-0 bg-coral/25 rounded-3xl rotate-1 transform pointer-events-none"
                aria-hidden="true"
              />

              {/* Clip-Path Reveal: inset 14% -> 0%, scale 1.035 -> 1 */}
              <motion.div
                initial={prefersReduced ? false : {
                  clipPath: 'inset(14% round 24px)',
                  scale: 1.035,
                  opacity: 0
                }}
                whileInView={{
                  clipPath: 'inset(0% round 24px)',
                  scale: 1,
                  opacity: 1
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden bg-navy-dark border-2 border-white/10 shadow-2xl group"
              >
                <img
                  src="/assets/food/post_6_carousel_1.jpg"
                  alt="Signature Korean Spicy Momo coated in fiery tangy glaze and toasted sesame"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-coral">
                      House Sensation
                    </span>
                    <p className="font-display font-extrabold text-xl sm:text-2xl drop-shadow-sm">
                      Korean Spicy Momo
                    </p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-coral/90 flex items-center justify-center text-white shadow-lg shrink-0">
                    <Flame className="w-5 h-5" />
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Editorial label */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-coral text-xs font-semibold tracking-wider uppercase mb-4"
            >
              <Flame className="w-3.5 h-3.5 text-coral" />
              <span>Signature Spotlight</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.1, ease: easeOut }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight"
            >
              Crispy. Tangy. Spicy.{' '}
              <span className="text-sky">Full of flavour.</span>
            </motion.h2>

            {/* Thin Decorative Drawing Line */}
            <motion.div
              initial={prefersReduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
              className="w-24 h-0.5 bg-coral origin-left mt-4 mb-5"
              aria-hidden="true"
            />

            {/* Paragraph */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.18, ease: easeOut }}
              className="text-sm sm:text-base text-cream/80 leading-relaxed font-normal"
            >
              Crispy on the outside, juicy on the inside, and tossed in our authentic Korean-inspired sweet-spicy chili glaze with fragrant toasted sesame seeds. It strikes the perfect balance of heat, crunch, and umami.
            </motion.p>

            {/* Feature points */}
            <motion.ul
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.25, ease: easeOut }}
              className="mt-6 space-y-3"
            >
              {[
                "Deep golden crisp crust with tender juicy core",
                "Fiery-tangy Korean red chili glaze reduction",
                "Finished with fragrant white toasted sesame",
                "Pairs perfectly with our chilled Ube Latte"
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-cream/90">
                  <div className="w-4 h-4 rounded-full bg-sky/20 text-sky flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </motion.ul>

            {/* Action CTA */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.32, ease: easeOut }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky text-navy font-display font-bold text-xs sm:text-sm hover:bg-sky-300 transition-colors shadow-soft"
              >
                <span>Find on Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#visit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white font-display font-semibold text-xs sm:text-sm hover:bg-white/10 transition-colors"
              >
                <span>Visit Gunjan Khau Gali</span>
              </a>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
