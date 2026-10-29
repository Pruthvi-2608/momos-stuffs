import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

const statements = [
  {
    num: "01",
    label: "Himalayan Roots",
    title: "From Sikkim to Vapi",
    description: "Authentic recipes crafted with ultra-thin handmade wrappers and traditional spiced fillings."
  },
  {
    num: "02",
    label: "Handcrafted Daily",
    title: "Folded Fresh to Order",
    description: "Never pre-frozen. Steamed hot or pan-tossed in signature Korean glazes moments before serving."
  },
  {
    num: "03",
    label: "Night Foodie Hub",
    title: "Late-Night Till 3:00 AM",
    description: "Serving evening foodies and midnight cravings daily at Gunjan Khau Gali food street."
  }
];

export default function BrandNotes() {
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];

  return (
    <section className="py-12 md:py-16 bg-white border-y border-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Eyebrow */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="text-center sm:text-left mb-8 md:mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-muted font-display">
            The Craft Behind The Dumplings
          </span>
        </motion.div>

        {/* 3 Editorial Statements Separated by Animated Thin Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
          {statements.map((item, idx) => (
            <div key={item.num} className="relative flex flex-col justify-between">
              
              {/* Vertical divider on desktop */}
              {idx > 0 && (
                <motion.div
                  initial={prefersReduced ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.1, ease: 'easeOut' }}
                  className="hidden md:block absolute -left-5 top-0 bottom-0 w-[1px] bg-navy/15 origin-top"
                  aria-hidden="true"
                />
              )}

              {/* Horizontal rule on mobile between items */}
              {idx > 0 && (
                <motion.div
                  initial={prefersReduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="block md:hidden w-full h-[1px] bg-navy/15 origin-left mb-8"
                  aria-hidden="true"
                />
              )}

              {/* Statement Content */}
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: easeOut }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-xs text-coral tracking-widest">
                    {item.num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy/60 font-display">
                    {item.label}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-navy tracking-tight pt-1">
                  {item.title}
                </h3>

                <p className="text-sm text-body/80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
