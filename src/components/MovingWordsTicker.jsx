import React from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

/**
 * MovingWordsTicker Component
 * 
 * Infinite continuous horizontal scrolling ticker featuring authentic Momos & Stuff signature items,
 * specialties, and brand mantras tailored specifically to the restaurant's identity.
 * 
 * Phrases tailored to Momos & Stuff:
 * - SIKKIM STEAMED MOMOS
 * - KOREAN SPICY GLAZE
 * - HAND-FOLDED DAILY
 * - PANEER JHOL
 * - ICED UBE LATTE
 * - SOUL RAMEN
 * - FIERY HOUSE CHUTNEY
 * - BLUETEA MATCHA
 * - CRISPY KURKURE
 * - GUNJAN KHAU GALI
 * - OPEN TILL 3 AM
 * - SAUCE + STEAM = HAPPINESS
 */

const MOMOS_TICKER_ITEMS = [
  'SIKKIM STEAMED MOMOS',
  'KOREAN SPICY GLAZE',
  'HAND-FOLDED DAILY',
  'PANEER JHOL',
  'ICED UBE LATTE',
  'SOUL RAMEN',
  'FIERY HOUSE CHUTNEY',
  'BLUETEA MATCHA',
  'CRISPY KURKURE',
  'GUNJAN KHAU GALI',
  'OPEN TILL 3 AM',
  'SAUCE + STEAM = HAPPINESS',
];

export default function MovingWordsTicker({ className = '' }) {
  const prefersReduced = useReducedMotionPreference();

  // 4 repetitions to ensure seamless infinite looping across any ultra-wide screen
  const repeatedItems = [
    ...MOMOS_TICKER_ITEMS,
    ...MOMOS_TICKER_ITEMS,
    ...MOMOS_TICKER_ITEMS,
    ...MOMOS_TICKER_ITEMS,
  ];

  return (
    <div
      className={`relative w-full overflow-hidden bg-cream-warm border-y border-navy/20 py-4 sm:py-5 select-none group ${className}`}
      aria-label="Momos & Stuff Signature Flavors & Culture Ticker"
    >
      <span className="sr-only">
        Sikkim Steamed Momos, Korean Spicy Glaze, Hand-Folded Daily, Paneer Jhol, Iced Ube Latte, Soul Ramen, Fiery House Chutney, BlueTea Matcha, Crispy Kurkure, Gunjan Khau Gali, Open Till 3 AM, Sauce and Steam equals Happiness.
      </span>

      {/* Dynamic Keyframes for smooth 60fps infinite marquee loop */}
      <style>{`
        @keyframes momosWordsMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-momos-ticker {
          animation: momosWordsMarquee 28s linear infinite;
        }
        .group:hover .animate-momos-ticker {
          animation-play-state: paused;
        }
      `}</style>

      {/* Edge soft scrims */}
      <div
        className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-cream-warm via-cream-warm/80 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-cream-warm via-cream-warm/80 to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Scrolling Content Track */}
      <div
        className={`flex w-max items-center ${
          prefersReduced ? 'overflow-x-auto justify-center' : 'animate-momos-ticker will-change-transform'
        }`}
        aria-hidden="true"
      >
        {repeatedItems.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="inline-flex items-center shrink-0"
          >
            {/* Bold Momos & Stuff Wordmark Item */}
            <span className="font-display font-black text-sm sm:text-base md:text-lg uppercase tracking-[0.24em] text-navy hover:text-coral transition-colors duration-200">
              {item}
            </span>

            {/* Separator Dot with Coral Glow */}
            <span className="inline-block mx-5 sm:mx-8 text-coral font-black text-base sm:text-xl select-none">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}