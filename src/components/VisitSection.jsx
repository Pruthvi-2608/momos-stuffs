import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Navigation, ExternalLink } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import InstagramIcon from './InstagramIcon';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function VisitSection() {
  const { locations } = brandInfo;
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];

  return (
    <section id="visit" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs font-bold uppercase tracking-wider text-coral font-display"
          >
            Visit Our Outlets
          </motion.span>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black font-display text-navy tracking-tight"
          >
            Come for the Steam. Stay for the Vibe.
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2, ease: easeOut }}
            className="mt-3 text-body/80 text-sm sm:text-base leading-relaxed"
          >
            Find us in Gunjan Khau Gali, Vapi, open until 3:00 AM every single night, and our original kitchen in Silvassa.
          </motion.p>
        </div>

        {/* Clean Contact & Visit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Main Outlet Panel (Vapi Flagship): Fades and rises 12px over 400ms */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.42, ease: easeOut }}
            className="lg:col-span-7 bg-white rounded-3xl border border-navy/10 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Storefront Photo */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-dark">
              <img
                src="/assets/food/post_2_carousel_3.jpg"
                alt="Momos & Stuff Outlet at Gunjan Khau Gali, Vapi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-coral flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Gunjan Khau Gali, Vapi
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-navy/80 backdrop-blur-sm text-[11px] font-semibold text-mint-dark">
                  Open 3:00 PM – 3:00 AM
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/15 text-coral-dark text-xs font-bold tracking-wide uppercase">
                    Primary Outlet • Vapi
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-mint-dark">
                    <span className="w-2 h-2 rounded-full bg-mint-dark" />
                    Open Daily
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-navy tracking-tight">
                  Gunjan Khau Gali, Vapi
                </h3>
                
                {/* Selectable address */}
                <p className="text-sm text-body/80 mt-1 select-text">
                  Gunjan Road, Khau Gali, Gunjan, Vapi, Gujarat, India
                </p>

                {/* Verified detail rows (reveal with 50ms stagger) */}
                <div className="mt-6 space-y-3.5 p-5 rounded-2xl bg-cream border border-navy/10 text-sm">
                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-start gap-3 select-text"
                  >
                    <motion.div
                      initial={prefersReduced ? false : { scale: 0.92 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 mt-0.5"
                    >
                      <Clock className="w-5 h-5 text-sky-600" />
                    </motion.div>
                    <div>
                      <span className="font-semibold text-navy block">Hours</span>
                      <span className="text-body/80 text-xs sm:text-sm">3:00 PM – 3:00 AM Daily (Midnight Cravings Sorted)</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.16 }}
                    className="flex items-start gap-3 select-text"
                  >
                    <motion.div
                      initial={prefersReduced ? false : { scale: 0.92 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 mt-0.5"
                    >
                      <MapPin className="w-5 h-5 text-coral" />
                    </motion.div>
                    <div>
                      <span className="font-semibold text-navy block">Location</span>
                      <span className="text-body/80 text-xs sm:text-sm">Central Gunjan Khau Gali food street hub</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-navy/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={locations[0].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-navy text-cream font-display font-semibold text-xs sm:text-sm hover:bg-navy-light shadow-sm transition-all group"
                >
                  <Navigation className="w-4 h-4 text-sky group-hover:translate-x-1 transition-transform" />
                  <span>Get Directions (Google Maps)</span>
                </a>

                <a
                  href={brandInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-navy/20 text-navy font-display font-semibold text-xs sm:text-sm hover:bg-sky-50 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-coral" />
                  <span>DM on Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Silvassa Outlet & Direct Connect */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {/* Silvassa Original Outlet */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.42, delay: 0.1, ease: easeOut }}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-navy/10 shadow-sm flex-1 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-sky-100 text-navy text-xs font-bold uppercase tracking-wide mb-3">
                  Original Home • Silvassa
                </span>
                <h4 className="font-display font-bold text-xl text-navy">
                  Silvassa Smart City
                </h4>
                <p className="text-xs sm:text-sm text-body/80 mt-1 select-text">
                  Silvassa, Dadra and Nagar Haveli
                </p>
                <p className="text-xs text-muted mt-3 font-sans leading-relaxed">
                  Where the authentic Sikkim momo recipes were first introduced before expanding into Vapi.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-navy/10">
                <a
                  href={locations[1].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-navy-light group"
                >
                  <span>View Silvassa on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-coral group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Direct Connect Box */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.42, delay: 0.18, ease: easeOut }}
              className="p-6 rounded-3xl bg-navy text-cream shadow-sm"
            >
              <div className="flex items-center gap-2 text-coral mb-2">
                <InstagramIcon className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Direct Connect</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                Instagram DM Support
              </h4>
              <p className="text-xs text-cream/80 mt-1 leading-relaxed font-sans">
                Inquire about fresh batches, pre-orders, or private group bites anytime.
              </p>

              <a
                href={brandInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-sky text-navy font-display font-bold text-xs hover:bg-sky-300 transition-colors group"
              >
                <span>Chat with @momosandstuff_</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
