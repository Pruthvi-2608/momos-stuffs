import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, MapPin, Clock } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { brandInfo } from '../data/siteContent';

/**
 * Menu Book Spreads Data
 * STRICT REQUIREMENT: Zero food images or videos inside the book spreads!
 * The only image allowed in the entire book is the actual Momos & Stuff logo on the cover.
 */
const SPREADS = [
  // Spread 0: Book Cover
  {
    type: 'cover',
    title: 'Our Menu',
    subtitle: 'A little book of comfort.',
    tagline: 'Handcrafted Himalayan Dumplings & Cozy Sips',
    location: 'Gunjan Khau Gali, Vapi • Est. 2024',
  },

  // Spread 1: Signature Momos (Pages 1 & 2)
  {
    type: 'spread',
    spreadNum: '01',
    leftPage: {
      pageNum: 1,
      categoryNum: '01',
      categoryTag: 'Himalayan Heritage',
      categoryTitle: 'Sikkim Steamed & Broths',
      categorySubtitle: 'Hand-pleated wrappers with pure Himalayan warmth',
      items: [
        {
          name: 'Authentic Sikkim Steamed Momos',
          price: '₹140 / 8 pcs',
          badge: 'Traditional',
          desc: 'Rooted in traditional Sikkim recipes. Soft, delicate wrappers filled with freshly minced garden vegetables and herbs, served with fiery momo chutney.',
          tag: 'Steamed to order',
        },
        {
          name: 'Paneer Jhol Momos',
          price: '₹160 / 8 pcs',
          badge: 'House Special',
          desc: 'Tender dumplings stuffed with spiced cottage cheese, steeped in a warm, fragrant Himalayan sesame-tomato broth (jhol) with crushed timur pepper.',
          tag: 'Himalayan Jhol',
        },
      ],
      footnote: 'Every dumpling wrapper is rolled paper-thin daily to lock in rich savory juices.',
    },
    rightPage: {
      pageNum: 2,
      categoryNum: '02',
      categoryTag: 'Street Craft',
      categoryTitle: 'Korean Glazed & Fried',
      categorySubtitle: 'Wok-tossed in bold glazes & double amber crunch',
      items: [
        {
          name: 'Korean Spicy Momo',
          price: '₹170 / 8 pcs',
          badge: 'Bestseller',
          desc: 'Crispy on the outside, juicy on the inside, coated in a tangy Korean-inspired spicy sauce and finished with toasted sesame.',
          tag: 'Fiery Kick',
        },
        {
          name: 'Crispy Golden Fried Momos',
          price: '₹150 / 8 pcs',
          badge: 'Crunchy',
          desc: 'Deep-fried to a golden amber crunch while keeping the filling juicy and flavorful. Paired with house garlic dip and spicy chili sauce.',
          tag: 'Evening Favorite',
        },
      ],
      footnote: 'Sauce + Steam = Pure Happiness ✨',
    },
  },

  // Spread 2: Soul Bowls & Café Sips (Pages 3 & 4)
  {
    type: 'spread',
    spreadNum: '02',
    leftPage: {
      pageNum: 3,
      categoryNum: '03',
      categoryTag: 'Comfort Bowls',
      categoryTitle: 'Soul Ramen & Soups',
      categorySubtitle: 'Slow-simmered broths for cool evenings',
      items: [
        {
          name: 'Soul Comfort Ramen Bowl',
          price: '₹220',
          badge: 'Date Night Pick',
          desc: 'Steaming hot savory broth filled with springy noodles, seasoned garden vegetables, charred sweetcorn, and fragrant mountain aromatics.',
          tag: 'Rich Simmered Broth',
        },
        {
          name: 'Himalayan Clear Broth Bowl',
          price: '₹90',
          badge: 'Traditional Pair',
          desc: 'Clear herbal broth simmered with roasted garlic, ginger, crushed black peppercorn, and fresh cilantro. The authentic Sikkim momo pairing.',
          tag: 'Light & Herbal',
        },
      ],
      footnote: 'Simmered low and slow for maximum warmth on late-night stops.',
    },
    rightPage: {
      pageNum: 4,
      categoryNum: '04',
      categoryTag: 'Botanical Craft',
      categoryTitle: 'Café Sips & Shakes',
      categorySubtitle: 'Crafted fresh with vibrant botanical layers',
      items: [
        {
          name: 'Must-Try Ube Latte',
          price: '₹150',
          badge: 'Viral Signature',
          desc: 'Vibrant purple yam crafted with silky steamed milk and subtle vanilla-nutty sweetness. A colorful, velvety treat that pairs wonderfully with spicy bites.',
          tag: 'Velvety Microfoam',
        },
        {
          name: 'BlueTea Matcha',
          price: '₹160',
          badge: 'Artisan Brew',
          desc: 'Layered botanical perfection: earthy Japanese green matcha swirled with vibrant butterfly pea flower blue tea and chilled cream.',
          tag: 'Antioxidant Rich',
        },
        {
          name: 'Café Thick Shakes',
          price: '₹140',
          badge: 'Chilled',
          desc: 'Thick, creamy handcrafted milkshakes whipped to silky decadence. Cools the palate after fiery chili momos.',
          tag: 'Whipped to Order',
        },
      ],
      footnote: 'Handcrafted fresh at our beverage counter with real whole milk and cream.',
    },
  },

  // Spread 3: Sweet Treats & Café Culture (Pages 5 & 6)
  {
    type: 'spread',
    spreadNum: '03',
    leftPage: {
      pageNum: 5,
      categoryNum: '05',
      categoryTag: 'Sweet Retreats',
      categoryTitle: 'Desserts & Confections',
      categorySubtitle: 'Sweet indulgences to round out your feast',
      items: [
        {
          name: 'London Viral Chocolate Strawberries',
          price: '₹180',
          badge: 'Viral Trend',
          desc: 'Fresh plump strawberries smothered in warm, velvety melted Belgian milk chocolate that hardens slightly into pure bliss.',
          tag: 'Belgian Chocolate',
        },
        {
          name: 'Choco Hazelnut Frappe',
          price: '₹160',
          badge: 'Chilled Sweet',
          desc: 'Rich roasted hazelnut blended with dark cocoa, chilled milk, and whipped sweet foam with chocolate dust.',
          tag: 'Silky Frappe',
        },
      ],
      footnote: 'Crafted in limited seasonal batches for maximum freshness.',
    },
    rightPage: {
      pageNum: 6,
      categoryNum: '06',
      categoryTag: 'Our Gathering',
      categoryTitle: 'The Café Culture',
      categorySubtitle: 'Memories, laughter, and midnight comfort',
      storyText:
        'Momos & Stuff was born out of a genuine love for authentic Himalayan comfort food. What started as a beloved momo spot in Silvassa has now brought its steaming steamers and cheerful vibes to Gunjan Khau Gali.',
      visitDetails: {
        hours: 'Open 3:00 PM – 3:00 AM Daily',
        location: 'Gunjan Khau Gali, Vapi, Gujarat',
        phoneOrder: 'Dine-In • Takeaway • Counter Order',
        handle: '@momosandstuff_',
      },
      footnote: 'Where memory chose to stay & late-night cravings find their home ✨',
    },
  },
];

/**
 * MenuBook Component
 *
 * Implements a realistic CSS 3D interactive menu book:
 * - Cover with the actual supplied logo image (`/assets/brand/logo.jpg`).
 * - Arrow-controlled 3D page flips around the central spine (`rotateY(0deg) -> rotateY(-180deg)`).
 * - Warm cream paper texture, deep navy editorial typography, subtle coral accents.
 * - Central spine crease, page-edge depth, and realistic lighting.
 * - Zero food images or videos inside the spreads.
 * - Responsive 2-page desktop layout / 1-page mobile layout with touch swipes.
 */
export default function MenuBook() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next'); // 'next' or 'prev'
  const [flipProgress, setFlipProgress] = useState(0); // 0 to 180 degrees
  const prefersReduced = useReducedMotionPreference();
  const bookContainerRef = useRef(null);

  // Touch swipe handling for mobile
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const totalSpreads = SPREADS.length;

  // Turn to next spread with smooth 3D page rotation
  const handleNext = useCallback(() => {
    if (isFlipping || currentSpread >= totalSpreads - 1) return;
    setIsFlipping(true);
    setFlipDirection('next');

    if (prefersReduced) {
      setCurrentSpread((prev) => prev + 1);
      setIsFlipping(false);
      return;
    }

    // 720ms refined CSS 3D page turn
    let start = performance.now();
    const duration = 720;

    const animateFlip = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic-bezier curve
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setFlipProgress(eased * 180);

      if (progress < 1) {
        requestAnimationFrame(animateFlip);
      } else {
        setCurrentSpread((prev) => prev + 1);
        setFlipProgress(0);
        setIsFlipping(false);
      }
    };

    requestAnimationFrame(animateFlip);
  }, [isFlipping, currentSpread, totalSpreads, prefersReduced]);

  // Turn to previous spread with reverse 3D page rotation
  const handlePrev = useCallback(() => {
    if (isFlipping || currentSpread <= 0) return;
    setIsFlipping(true);
    setFlipDirection('prev');

    if (prefersReduced) {
      setCurrentSpread((prev) => prev - 1);
      setIsFlipping(false);
      return;
    }

    // 720ms reverse page turn
    let start = performance.now();
    const duration = 720;

    const animateFlip = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setFlipProgress(180 - eased * 180);

      if (progress < 1) {
        requestAnimationFrame(animateFlip);
      } else {
        setCurrentSpread((prev) => prev - 1);
        setFlipProgress(0);
        setIsFlipping(false);
      }
    };

    requestAnimationFrame(animateFlip);
  }, [isFlipping, currentSpread, prefersReduced]);

  // Direct jump to any spread
  const handleJumpToSpread = useCallback((targetIndex) => {
    if (isFlipping || targetIndex === currentSpread) return;
    if (targetIndex > currentSpread) {
      setFlipDirection('next');
    } else {
      setFlipDirection('prev');
    }
    setCurrentSpread(targetIndex);
  }, [isFlipping, currentSpread]);

  // Keyboard navigation when book is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext(); // swipe left -> turn next
      } else {
        handlePrev(); // swipe right -> turn previous
      }
    }
  };

  const currentData = SPREADS[currentSpread];
  const isCover = currentSpread === 0;

  return (
    <div
      ref={bookContainerRef}
      className="relative w-full max-w-5xl mx-auto flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label="Interactive 3D Menu Book"
    >
      {/* Spread Navigation Tabs (Direct Jump) */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 px-2">
        {SPREADS.map((spread, idx) => {
          const isActive = idx === currentSpread;
          let label = 'Cover';
          if (idx === 1) label = '01 • Momos';
          if (idx === 2) label = '02 • Bowls & Sips';
          if (idx === 3) label = '03 • Sweets & Story';

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleJumpToSpread(idx)}
              disabled={isFlipping}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-display font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy shadow-sm ${
                isActive
                  ? 'bg-navy text-cream shadow-md scale-105'
                  : 'bg-white/80 hover:bg-white text-navy/70 border border-navy/10'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Main 3D Book Stage */}
      <div className="relative w-full flex items-center justify-center px-4 sm:px-12 py-2">

        {/* Previous Page Arrow (Left) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isFlipping || currentSpread === 0}
          aria-label="Previous menu page"
          className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-navy border border-navy/15 shadow-soft-lg flex items-center justify-center z-30 transition-all duration-200 group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
            currentSpread === 0 || isFlipping
              ? 'opacity-30 cursor-not-allowed pointer-events-none'
              : 'opacity-100 hover:-translate-x-1 hover:border-navy/30'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-navy group-hover:text-coral transition-colors" />
        </button>

        {/* Next Page Arrow (Right) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isFlipping || currentSpread === totalSpreads - 1}
          aria-label="Next menu page"
          className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-navy border border-navy/15 shadow-soft-lg flex items-center justify-center z-30 transition-all duration-200 group active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
            currentSpread === totalSpreads - 1 || isFlipping
              ? 'opacity-30 cursor-not-allowed pointer-events-none'
              : 'opacity-100 hover:translate-x-1 hover:border-navy/30'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-navy group-hover:text-coral transition-colors" />
        </button>

        {/* 3D BOOK BODY CONTAINER */}
        <div
          className="relative w-full max-w-4xl aspect-[1.48/1] min-h-[480px] sm:min-h-[540px] md:min-h-[580px] rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-300"
          style={{ perspective: '2200px' }}
        >

          {/* Underneath Book Drop Shadow on the Sky-Blue Table Surface */}
          <div
            className="absolute -inset-4 sm:-inset-6 bg-navy/20 rounded-[36px] blur-2xl pointer-events-none -z-10 transform translate-y-6"
            aria-hidden="true"
          />

          {/* Layered Paper Edge Stacking Illusion (Left & Right) */}
          <div
            className="absolute inset-y-1 -left-2 w-3 rounded-l-md bg-[#EFE9DA] border-l border-navy/10 shadow-sm pointer-events-none -z-1"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-1 -right-2 w-3 rounded-r-md bg-[#EFE9DA] border-r border-navy/10 shadow-sm pointer-events-none -z-1"
            aria-hidden="true"
          />

          {/* ======================================================== */}
          {/* SPREAD 0: FRONT COVER VIEW                               */}
          {/* ======================================================== */}
          {isCover ? (
            <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-gradient-to-r from-[#FDFBF7] via-[#FAF6ED] to-[#F5EFE1] border-2 border-[#E5DAC3] shadow-inner relative">
              
              {/* Left Side: Inside Cover / Welcome Editorial Note */}
              <div className="hidden md:flex md:col-span-5 flex-col justify-between p-8 sm:p-10 border-r border-navy/10 bg-[#FAF6EC] relative">
                {/* Subtle Paper Texture Lines */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-200/50 text-navy font-mono text-[11px] font-bold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-coral" />
                    <span>Gunjan Khau Gali Flagship</span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-navy tracking-tight mt-3">
                    A boutique café for dumpling lovers.
                  </h3>

                  <p className="text-body/80 text-xs sm:text-sm leading-relaxed mt-2 font-sans">
                    Every dish inside this menu is crafted from authentic Himalayan recipes, hand-pinched daily in Gunjan Khau Gali and steamed to hot perfection.
                  </p>

                  {/* Highlights Pill List */}
                  <div className="pt-4 space-y-2 text-xs text-navy font-medium">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                      <span>Thin hand-pleated dough with rich broth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                      <span>Fiery Korean glazes & golden amber crunch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                      <span>Open late night till 3:00 AM daily</span>
                    </div>
                  </div>
                </div>

                {/* Spine Stitch & Bookmark Ribbon */}
                <div className="pt-6 border-t border-navy/10 flex items-center justify-between text-[11px] text-navy/60 font-mono">
                  <span>MOMOS & STUFF • VAPI</span>
                  <span>EST. 2024</span>
                </div>
              </div>

              {/* Right Side: The Official Front Cover with Real Supplied Logo */}
              <div className="col-span-1 md:col-span-7 flex flex-col items-center justify-center p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FFFDF8] to-[#F8F2E4]">
                
                {/* Vintage Double-Border Filigree */}
                <div className="absolute inset-4 sm:inset-6 border-2 border-[#153B58]/20 rounded-2xl pointer-events-none" />
                <div className="absolute inset-5 sm:inset-7 border border-[#153B58]/10 rounded-xl pointer-events-none" />

                {/* Corner Decorative Dots */}
                <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-navy/30" />
                <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-navy/30" />
                <div className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-navy/30" />
                <div className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-navy/30" />

                {/* Header Tag */}
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-coral mb-4">
                  Authentic Sikkim Recipes
                </span>

                {/* THE ACTUAL SUPPLIED LOGO IMAGE (Preserved proportions, dumpling mascot & branding) */}
                <div className="relative my-2 sm:my-3 p-3 rounded-full bg-white shadow-soft-lg border-2 border-sky-200/80 group">
                  <img
                    src={brandInfo.logoUrl}
                    alt="Momos & Stuff Official Logo"
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-navy text-cream text-[10px] font-mono font-bold tracking-wider uppercase shadow-sm">
                    Verified Original
                  </div>
                </div>

                {/* Book Titles */}
                <h2 className="mt-4 font-display font-black text-3xl sm:text-4xl md:text-5xl text-navy tracking-tight uppercase">
                  Our Menu
                </h2>

                <p className="mt-1 text-sm sm:text-base font-serif italic text-navy/75">
                  A little book of comfort.
                </p>

                <div className="w-16 h-0.5 bg-coral/40 my-3 rounded-full" />

                {/* Call to Open Action Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-3 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-navy text-cream font-display font-bold text-xs sm:text-sm shadow-soft hover:bg-navy-light hover:shadow-soft-lg active:scale-95 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                >
                  <BookOpen className="w-4 h-4 text-coral" />
                  <span>Open Menu Book</span>
                  <ChevronRight className="w-4 h-4 text-cream group-hover:translate-x-1 transition-transform" />
                </button>

                <span className="mt-3 text-[10px] text-navy/50 font-mono">
                  Press right arrow key or swipe to flip pages
                </span>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* SPREADS 1, 2, 3: TWO-PAGE OPEN BOOK SPREAD              */
            /* ======================================================== */
            <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-[#FDFBF7] border-2 border-[#E5DAC3] relative">

              {/* Central Spine Shadow & Crease Overlay (Desktop) */}
              <div
                className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 pointer-events-none z-20"
                style={{
                  background:
                    'linear-gradient(to right, rgba(15,37,55,0.15) 0%, rgba(15,37,55,0.03) 30%, transparent 50%, rgba(15,37,55,0.03) 70%, rgba(15,37,55,0.15) 100%)',
                }}
              />
              <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-navy/15 pointer-events-none z-20" />

              {/* ---------------------------------------------------- */}
              {/* LEFT PAGE (Cream Paper with Deep Navy Typography)   */}
              {/* ---------------------------------------------------- */}
              <div className="h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-navy/10 bg-gradient-to-br from-[#FDFBF7] via-[#FAF6EC] to-[#F5EFE0] relative overflow-hidden">
                
                {/* Top Category Header */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-navy/10">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-coral">
                      {currentData.leftPage.categoryNum} • {currentData.leftPage.categoryTag}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-navy/40 uppercase">
                      Momos & Stuff
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-navy tracking-tight mt-2.5">
                    {currentData.leftPage.categoryTitle}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-navy/70 italic font-serif mt-0.5">
                    {currentData.leftPage.categorySubtitle}
                  </p>

                  {/* Dishes List */}
                  <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
                    {currentData.leftPage.items?.map((dish, i) => (
                      <div key={i} className="group">
                        {/* Title and Price with Dotted Leader */}
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-display font-bold text-navy text-sm sm:text-base leading-snug">
                            {dish.name}
                          </h4>
                          <span className="hidden sm:inline-block flex-1 border-b border-dotted border-navy/25 mx-2 relative -top-1" />
                          <span className="font-mono font-bold text-xs sm:text-sm text-coral shrink-0">
                            {dish.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] sm:text-xs text-body/85 leading-relaxed mt-1 font-sans">
                          {dish.desc}
                        </p>

                        {/* Subtle Tag */}
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-navy/5 text-navy font-semibold">
                            {dish.badge}
                          </span>
                          <span className="text-[9px] font-mono text-navy/50">• {dish.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Left Footnote & Page Number */}
                <div className="pt-4 border-t border-navy/10 flex items-center justify-between text-[10px] sm:text-[11px] text-navy/60 font-mono mt-4">
                  <span className="italic font-serif line-clamp-1">{currentData.leftPage.footnote}</span>
                  <span className="font-bold text-navy shrink-0 ml-2">• {currentData.leftPage.pageNum} •</span>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* RIGHT PAGE (Matching Cream Paper & Layout)           */}
              {/* ---------------------------------------------------- */}
              <div className="h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 bg-gradient-to-bl from-[#FDFBF7] via-[#FFFDF8] to-[#F5EFE0] relative overflow-hidden">
                
                {/* Top Category Header */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-navy/10">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-coral">
                      {currentData.rightPage.categoryNum} • {currentData.rightPage.categoryTag}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-navy/40 uppercase">
                      Khau Gali, Vapi
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl md:text-[26px] text-navy tracking-tight mt-2.5">
                    {currentData.rightPage.categoryTitle}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-navy/70 italic font-serif mt-0.5">
                    {currentData.rightPage.categorySubtitle}
                  </p>

                  {/* Right Page Dishes List OR Culture Story */}
                  {currentData.rightPage.items ? (
                    <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5">
                      {currentData.rightPage.items.map((dish, i) => (
                        <div key={i} className="group">
                          {/* Title and Price with Dotted Leader */}
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="font-display font-bold text-navy text-sm sm:text-base leading-snug">
                              {dish.name}
                            </h4>
                            <span className="hidden sm:inline-block flex-1 border-b border-dotted border-navy/25 mx-2 relative -top-1" />
                            <span className="font-mono font-bold text-xs sm:text-sm text-coral shrink-0">
                              {dish.price}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-[11px] sm:text-xs text-body/85 leading-relaxed mt-1 font-sans">
                            {dish.desc}
                          </p>

                          {/* Subtle Tag */}
                          <div className="mt-1 flex items-center gap-1.5">
                            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-navy/5 text-navy font-semibold">
                              {dish.badge}
                            </span>
                            <span className="text-[9px] font-mono text-navy/50">• {dish.tag}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Spread 3 Right: Heritage Story & Verified Hours Box */
                    <div className="mt-4 space-y-4">
                      <p className="text-xs sm:text-sm text-body/85 leading-relaxed font-sans">
                        {currentData.rightPage.storyText}
                      </p>

                      {/* Verified Business Details Card Inside Page */}
                      <div className="p-4 rounded-xl bg-white/80 border border-navy/10 space-y-2.5 shadow-sm text-xs text-navy">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-coral shrink-0" />
                          <span className="font-bold">{currentData.rightPage.visitDetails.hours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-navy shrink-0" />
                          <span>{currentData.rightPage.visitDetails.location}</span>
                        </div>
                        <div className="pt-2 border-t border-navy/10 flex items-center justify-between text-[11px] font-mono">
                          <span>{currentData.rightPage.visitDetails.phoneOrder}</span>
                          <span className="text-coral font-bold">{currentData.rightPage.visitDetails.handle}</span>
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-sky-200/50 text-navy font-mono text-[10px] font-bold uppercase tracking-wider">
                          From Sikkim to Vapi with Love
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Right Footnote & Page Number */}
                <div className="pt-4 border-t border-navy/10 flex items-center justify-between text-[10px] sm:text-[11px] text-navy/60 font-mono mt-4">
                  <span className="font-bold text-navy shrink-0 mr-2">• {currentData.rightPage.pageNum} •</span>
                  <span className="italic font-serif line-clamp-1 text-right">{currentData.rightPage.footnote}</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CSS 3D TURNING SHEET (Active while flipping)             */}
          {/* ======================================================== */}
          {isFlipping && !prefersReduced && (
            <div
              className={`hidden md:block absolute top-0 bottom-0 w-1/2 pointer-events-none z-30 transition-none ${
                flipDirection === 'next' ? 'right-0' : 'left-0'
              }`}
              style={{
                transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${flipDirection === 'next' ? -flipProgress : 180 - flipProgress}deg)`,
              }}
            >
              {/* Front Face of Turning Page */}
              <div
                className="absolute inset-0 bg-[#FAF6EC] border border-[#E5DAC3] shadow-2xl rounded-r-2xl overflow-hidden p-8 flex flex-col justify-between"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="space-y-4">
                  <div className="w-24 h-2 bg-navy/10 rounded-full" />
                  <div className="w-48 h-5 bg-navy/15 rounded-md" />
                  <div className="space-y-2 pt-4">
                    <div className="w-full h-3 bg-navy/10 rounded" />
                    <div className="w-5/6 h-3 bg-navy/10 rounded" />
                    <div className="w-4/6 h-3 bg-navy/10 rounded" />
                  </div>
                </div>
                {/* Dynamic Page Turning Shading Gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, rgba(0,0,0,${Math.sin((flipProgress * Math.PI) / 180) * 0.25}), transparent)`,
                  }}
                />
              </div>

              {/* Back Face of Turning Page */}
              <div
                className="absolute inset-0 bg-[#FDFBF7] border border-[#E5DAC3] shadow-2xl rounded-l-2xl overflow-hidden p-8 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="space-y-4">
                  <div className="w-28 h-2 bg-navy/10 rounded-full" />
                  <div className="w-52 h-5 bg-navy/15 rounded-md" />
                  <div className="space-y-2 pt-4">
                    <div className="w-full h-3 bg-navy/10 rounded" />
                    <div className="w-4/5 h-3 bg-navy/10 rounded" />
                    <div className="w-3/4 h-3 bg-navy/10 rounded" />
                  </div>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to left, rgba(0,0,0,${Math.sin((flipProgress * Math.PI) / 180) * 0.25}), transparent)`,
                  }}
                />
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Book Bottom Footer Indicators & Instructions */}
      <div className="mt-6 flex flex-wrap items-center justify-between w-full max-w-4xl px-4 text-xs text-navy/70 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
          <span>Spread {currentSpread === 0 ? 'Cover' : `0${currentSpread} of 0${totalSpreads - 1}`}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-navy/50">
            Use arrow keys or click chevrons to browse
          </span>
          <span className="px-3 py-1 rounded-full bg-white/80 border border-navy/10 text-navy font-bold shadow-xs">
            {isCover ? 'Cover' : `Pages ${currentData.leftPage?.pageNum} & ${currentData.rightPage?.pageNum}`}
          </span>
        </div>
      </div>
    </div>
  );
}
