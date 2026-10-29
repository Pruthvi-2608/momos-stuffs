import React from 'react';
import { motion } from 'motion/react';
import SteamDoodle from './SteamDoodle';

export default function SectionHeading({ 
  badge, 
  title, 
  description, 
  align = 'center',
  showSteam = false
}) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-2xl mb-12 md:mb-16 ${alignClass}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-300/60 text-navy font-semibold text-xs tracking-wide uppercase mb-3.5 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
          {badge}
        </motion.div>
      )}

      <div className="relative inline-block">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-navy tracking-tight leading-tight"
        >
          {title}
        </motion.h2>
        
        {showSteam && (
          <div className="absolute -top-7 -right-8 hidden sm:block pointer-events-none">
            <SteamDoodle className="w-8 h-8 text-sky-400" />
          </div>
        )}
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-body/80 leading-relaxed max-w-xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
