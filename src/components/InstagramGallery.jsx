import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import InstagramIcon from './InstagramIcon';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

/**
 * Editorial Bento Gallery Tile Data
 * Strictly using authentic photographs and verified quotes from the Instagram scrape dataset.
 */
const featuredPost = {
  id: 'post-0',
  image: '/assets/food/post_0_carousel_0.jpg',
  tag: 'Café Opening • Gunjan Khau Gali',
  badge: 'Featured Story',
  caption: '“Yesterday was all love, smiles & momos! Thank you, Vapi, for welcoming Momos & Stuff into your hearts with such warmth.”',
  author: '@momosandstuff_',
  location: 'Gunjan Khau Gali, Vapi',
  url: 'https://www.instagram.com/p/DdO4FJTDLBE/',
  date: 'Opening Celebration'
};

const supportingPosts = [
  {
    id: 'post-8',
    image: '/assets/food/post_8_DeCDnbTCxvw_main.jpg',
    tag: 'Cozy Corner Date',
    caption: '“A little café date, soulful plates & the coziest vibes at Momos & Stuff.”',
    author: '@pragatiiiii_10',
    url: 'https://www.instagram.com/p/DeCDnbTCxvw/',
  },
  {
    id: 'post-9',
    image: '/assets/food/post_9_Debz-5WocUG_main.jpg',
    tag: 'Specialty Sips & Bites',
    caption: '“From spicy Korean momos to savoury Paneer Jhol and the must-try iced Ube Latte!”',
    author: '@pragatiiiii_10',
    url: 'https://www.instagram.com/p/Debz-5WocUG/',
  },
  {
    id: 'post-1',
    image: '/assets/gallery/post_1_DdWngepIWZ4_main.jpg',
    tag: 'Soul Ramen & Evenings',
    caption: '“Hot Himalayan broths, hand-pinched momos, and late-evening laughter under warm lights.”',
    author: '@momosandstuff_',
    url: 'https://www.instagram.com/p/DdWngepIWZ4/',
  },
  {
    id: 'post-11',
    image: '/assets/food/post_11_DQPayD4jMSw_main.jpg',
    tag: 'Steam & Pure Happiness',
    caption: '“Sauce + Steam = Pure Happiness! Freshly pleated Himalayan momos with fiery house chutney.”',
    author: '@momosandstuff_',
    url: 'https://www.instagram.com/p/DQPayD4jMSw/',
  }
];

/**
 * BentoCard Component
 * Implements:
 * 1. SVG outline stroke-dashoffset animation on featured card.
 * 2. Expanding organic mask animation (~800ms) with staggered entrance (~100ms apart).
 * 3. 350ms hover scale to 1.03, caption reveal, and 3-4px arrow shift.
 * 4. Image stays 100% visible after reveal.
 */
function BentoCard({ item, delay = 0, isFeatured = false, prefersReduced, isSectionInView }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative rounded-3xl overflow-hidden bg-cream border border-navy/15 shadow-soft block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy transition-all duration-300 hover:shadow-soft-lg ${
        isFeatured
          ? 'w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[550px] flex flex-col justify-end'
          : 'w-full h-full min-h-[220px] sm:min-h-[240px] lg:h-[265px]'
      }`}
      aria-label={`View Instagram post by ${item.author}: ${item.tag}`}
    >
      {/* 
        Signature Animation 1:
        Thin Navy SVG Outline with stroke-dashoffset animation around the featured card.
      */}
      {isFeatured && (
        <svg
          className="absolute inset-[1px] w-[calc(100%-2px)] h-[calc(100%-2px)] pointer-events-none z-30 overflow-visible"
          aria-hidden="true"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="24"
            ry="24"
            fill="none"
            stroke="#153B58"
            strokeWidth="1.5"
            strokeDasharray="3000"
            style={{
              strokeDashoffset: isSectionInView ? 0 : 3000,
              transition: prefersReduced
                ? 'none'
                : 'stroke-dashoffset 850ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          />
        </svg>
      )}

      {/* 
        Signature Animation 2 & 3:
        Expanding Organic Mask Animation over ~800ms.
        Real photograph sampled directly from the Instagram scrape dataset.
      */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        onAnimationEnd={() => setRevealed(true)}
        style={{
          clipPath: revealed || prefersReduced ? 'none' : undefined,
          animation:
            prefersReduced || !isSectionInView
              ? 'none'
              : `bentoMaskReveal 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards`,
          opacity: prefersReduced || isSectionInView ? 1 : 0
        }}
      >
        {/* Genuine photograph with 350ms gentle 1.03 scale on hover */}
        <img
          src={item.image}
          alt={item.tag}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
      </div>

      {/* Resting State Badge (Corner pill) */}
      <div className="absolute top-3.5 left-3.5 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none z-10">
        <span className="px-3 py-1 rounded-full bg-navy/80 backdrop-blur-md text-cream text-[11px] font-semibold flex items-center gap-1.5 shadow-sm border border-white/10">
          <InstagramIcon className="w-3 h-3 text-coral" />
          <span>{item.tag}</span>
        </span>
      </div>

      {/* Resting State Pill for Featured Card (Bottom status bar) */}
      {isFeatured && (
        <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none z-10 hidden sm:block">
          <div className="bg-navy/75 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-cream flex items-center justify-between shadow-soft">
            <div>
              <div className="flex items-center gap-1.5 text-coral text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{item.badge}</span>
              </div>
              <p className="text-xs font-semibold text-white mt-0.5">{item.location}</p>
            </div>
            <span className="text-[11px] text-sky flex items-center gap-1 font-medium bg-white/10 px-2.5 py-1 rounded-full">
              Hover to Read
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      )}

      {/* 
        Signature Animation 4:
        Hover Caption Reveal & 3–4px Arrow Shift
        Deep navy typography & warm cream styling on hover.
      */}
      <div className="absolute inset-0 bg-navy/85 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 p-5 sm:p-7 flex flex-col justify-between text-cream z-20 pointer-events-none">
        {/* Top Tag & Arrow with 3–4px Shift */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-cream text-[11px] font-semibold tracking-wide border border-white/10">
            {item.tag}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-sky border border-white/10 shadow-sm">
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 transition-transform duration-200" />
          </div>
        </div>

        {/* Caption & Author Meta */}
        <div>
          <p className={`text-cream leading-relaxed mb-3.5 font-sans ${isFeatured ? 'text-sm sm:text-base line-clamp-4' : 'text-xs sm:text-sm line-clamp-3'}`}>
            {item.caption}
          </p>
          <div className="flex items-center justify-between text-xs text-cream/75 pt-3 border-t border-white/20">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <InstagramIcon className="w-3.5 h-3.5 text-coral" />
              <span>{item.author}</span>
            </span>
            <span className="text-[11px] text-sky font-semibold tracking-wide">
              View on Instagram →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

/**
 * InstagramGallery — Editorial Bento Gallery Section
 *
 * Requirements:
 * 1. Premium editorial Bento Gallery layout: 1 large featured café shot on left + 4 supporting shots on right.
 * 2. Authentic photographs from the Instagram scrape dataset.
 * 3. Sky-blue background surface, deep navy typography, and warm cream accents.
 * 4. Signature Animations:
 *    - Thin navy SVG outline around featured image using stroke-dashoffset animation.
 *    - Organic expanding mask reveal (~800ms) for real photograph.
 *    - Staggered supporting images (~100ms apart).
 *    - On hover: scale 1.03 over 350ms, reveal caption, 3-4px arrow shift.
 *    - All images 100% visible after reveal.
 */
export default function InstagramGallery() {
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="moments"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#A9DCE8]/35 via-sky-50/70 to-[#A9DCE8]/25"
    >
      {/* Dynamic CSS Keyframes for Organic Mask Reveal */}
      <style>{`
        @keyframes bentoMaskReveal {
          0% {
            clip-path: circle(0% at 50% 50%);
            opacity: 0;
            transform: scale(1.06);
          }
          30% {
            opacity: 1;
          }
          100% {
            clip-path: circle(140% at 50% 50%);
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Ambient Lighting & Sky-Blue Halos */}
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-white/50 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-navy/10 text-xs font-bold uppercase tracking-wider text-navy font-display mb-3 shadow-xs"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-coral" />
            <span>Community Moments</span>
          </motion.div>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-navy tracking-tight"
          >
            Captured in Gunjan, Vapi.
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2, ease: easeOut }}
            className="mt-3 text-body/85 text-sm sm:text-base leading-relaxed"
          >
            Real laughter, steaming Himalayan broths, and evening dates straight from our Instagram feed.
          </motion.p>
        </div>

        {/* 
          Editorial Bento Grid Layout
          - Left: 1 Large Featured Café Photograph (lg:col-span-7)
          - Right: 4 Supporting Photographs in 2x2 Grid (lg:col-span-5)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Featured Large Café Tile */}
          <div className="lg:col-span-7">
            <BentoCard
              item={featuredPost}
              delay={0.05}
              isFeatured={true}
              prefersReduced={prefersReduced}
              isSectionInView={isSectionInView}
            />
          </div>

          {/* 4 Supporting Tiles in 2x2 Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {supportingPosts.map((post, idx) => (
              <BentoCard
                key={post.id}
                item={post}
                delay={0.15 + idx * 0.1} // Staggered by 100ms
                isFeatured={false}
                prefersReduced={prefersReduced}
                isSectionInView={isSectionInView}
              />
            ))}
          </div>
        </div>

        {/* Profile CTA */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.4, ease: easeOut }}
          className="mt-12 text-center"
        >
          <a
            href={brandInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-navy text-cream font-display font-semibold text-xs sm:text-sm hover:bg-navy-light shadow-soft transition-all duration-200 group border border-navy/20"
          >
            <InstagramIcon className="w-4 h-4 text-coral group-hover:scale-110 transition-transform" />
            <span>Follow {brandInfo.instagramHandle} on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}