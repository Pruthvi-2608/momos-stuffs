import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

// Curated authentic food items from the verified Instagram dataset
const HERO_SLIDES = [
  {
    id: 0,
    src: '/assets/food/post_11_DQPayD4jMSw_main.jpg',
    tag: 'Signature Classic',
    title: 'Authentic Sikkim Steamed Momos',
    price: '₹140 / 8 pcs',
    desc: 'Thin hand-pleated dumplings served with fiery momo chutney & Himalayan herb broth.',
  },
  {
    id: 1,
    src: '/assets/food/post_6_carousel_1.jpg',
    tag: 'Fiery Street Favorite',
    title: 'Korean Spicy Glazed Dumplings',
    price: '₹170 / 8 pcs',
    desc: 'Crispy exterior, succulent filling, tossed in sweet-heat gochujang and toasted sesame.',
  },
  {
    id: 2,
    src: '/assets/food/post_17_DYw8PC5M2be_main.jpg',
    tag: 'Signature Sips',
    title: 'Sky-Blue Artisan Brew & Latte',
    price: 'From ₹90',
    desc: 'Handcrafted iced BlueTea matcha & refreshing comfort sips, served cold in Gunjan Khau Gali.',
  },
  {
    id: 3,
    src: '/assets/food/post_2_carousel_0.jpg',
    tag: 'Handcrafted Specialties',
    title: 'The Momos & Stuff Feast Board',
    price: 'From ₹120',
    desc: 'Signature steamed baskets, crispy kurkure momos, seasoned fries & rich café frappes.',
  },
];

/**
 * Helper: draw rounded rectangle path
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * ParticleMorphImage
 *
 * Requirements:
 * 1. Deep navy aesthetic: Card dissolves completely into particles.
 * 2. Particles form a glowing, rotating 3D SPHERE in the center before changing to every image.
 * 3. Mid-sphere, particles morph colors from the current card/dish to the next card/dish.
 * 4. The 3D sphere bursts open and reassembles with precision into the next card and dish.
 * 5. Automatic transition every 6s, with manual previous/next and indicator controls.
 */
export default function ParticleMorphImage({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const prefersReduced = useReducedMotionPreference();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Cached pixel grids and pre-rendered card canvases
  const pixelCacheRef = useRef({});
  const cardCanvasesRef = useRef({});
  const loadedImagesRef = useRef({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Animation transition state
  const morphStateRef = useRef({
    active: false,
    startTime: 0,
    duration: 2100, // 2.1s smooth 3-stage sphere morph
    fromIndex: 0,
    toIndex: 0,
    progress: 0,
  });

  // Target canvas dimensions
  const dimsRef = useRef({ width: 520, height: 420, dpr: 1 });

  // 1. Preload all authentic food photos
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const total = HERO_SLIDES.length;

    HERO_SLIDES.forEach((slide, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = slide.src;

      img.onload = () => {
        if (!isMounted) return;
        loadedImagesRef.current[idx] = img;
        loadedCount++;
        if (loadedCount === total) {
          generateParticleCaches();
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        console.warn('Failed to load hero food image:', slide.src);
        loadedCount++;
        if (loadedCount === total) {
          setImagesLoaded(true);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Pre-render full card and sample the entire card into ~28,000 particles
  const generateParticleCaches = useCallback(() => {
    const { width, height } = dimsRef.current;
    if (!width || !height) return;

    const step = 2.6; // High density particle step (~28,000 particles)
    const cols = Math.floor(width / step);
    const rows = Math.floor(height / step);

    HERO_SLIDES.forEach((slide, idx) => {
      const img = loadedImagesRef.current[idx];
      if (!img) return;

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      // Card Geometry
      const cardMargin = 12;
      const cardX = cardMargin;
      const cardY = cardMargin;
      const cardW = width - cardMargin * 2;
      const cardH = height - cardMargin * 2;
      const cardRadius = 24;

      // Draw Card Outer Frame (Crisp white/cream backdrop with subtle glow ring)
      offCtx.save();
      roundRect(offCtx, cardX, cardY, cardW, cardH, cardRadius);
      offCtx.fillStyle = '#FFFFFF';
      offCtx.shadowColor = 'rgba(103, 212, 248, 0.25)';
      offCtx.shadowBlur = 18;
      offCtx.fill();
      offCtx.restore();

      // Card Border Stroke
      offCtx.save();
      roundRect(offCtx, cardX, cardY, cardW, cardH, cardRadius);
      offCtx.lineWidth = 2;
      offCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      offCtx.stroke();
      offCtx.restore();

      // Inner Food Image Area
      const innerPad = 12;
      const innerX = cardX + innerPad;
      const innerY = cardY + innerPad;
      const innerW = cardW - innerPad * 2;
      const innerH = cardH - innerPad * 2;
      const innerRadius = 18;

      offCtx.save();
      roundRect(offCtx, innerX, innerY, innerW, innerH, innerRadius);
      offCtx.clip();

      // Cover-fit food image inside inner area
      const imgAspect = img.width / img.height;
      const innerAspect = innerW / innerH;
      let drawW, drawH, drawX, drawY;

      if (imgAspect > innerAspect) {
        drawH = innerH;
        drawW = innerH * imgAspect;
        drawX = innerX + (innerW - drawW) / 2;
        drawY = innerY;
      } else {
        drawW = innerW;
        drawH = innerW / imgAspect;
        drawX = innerX;
        drawY = innerY + (innerH - drawH) / 2;
      }

      offCtx.drawImage(img, drawX, drawY, drawW, drawH);

      // Gradient overlay at bottom of photo for title readability
      const gradH = 110;
      const grad = offCtx.createLinearGradient(0, innerY + innerH - gradH, 0, innerY + innerH);
      grad.addColorStop(0, 'rgba(10, 26, 42, 0)');
      grad.addColorStop(0.35, 'rgba(10, 26, 42, 0.65)');
      grad.addColorStop(1, 'rgba(10, 26, 42, 0.94)');
      offCtx.fillStyle = grad;
      offCtx.fillRect(innerX, innerY + innerH - gradH, innerW, gradH);

      // Card Header Badges
      // Top Left Category Pill
      const pillY = innerY + 12;
      const pillX = innerX + 12;
      offCtx.save();
      roundRect(offCtx, pillX, pillY, 136, 24, 12);
      offCtx.fillStyle = 'rgba(11, 26, 41, 0.88)';
      offCtx.fill();
      // Coral dot
      offCtx.beginPath();
      offCtx.arc(pillX + 10, pillY + 12, 3.5, 0, Math.PI * 2);
      offCtx.fillStyle = '#E86343';
      offCtx.fill();
      // Tag text
      offCtx.font = '600 10px sans-serif';
      offCtx.fillStyle = '#FFFFFF';
      offCtx.fillText(slide.tag.toUpperCase(), pillX + 18, pillY + 15.5);
      offCtx.restore();

      // Top Right Index Pill
      const idxPillW = 54;
      const idxPillX = innerX + innerW - idxPillW - 12;
      offCtx.save();
      roundRect(offCtx, idxPillX, pillY, idxPillW, 24, 12);
      offCtx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      offCtx.fill();
      offCtx.font = 'bold 10px monospace';
      offCtx.fillStyle = '#0B1A29';
      offCtx.fillText(`0${idx + 1} / 04`, idxPillX + 10, pillY + 15.5);
      offCtx.restore();

      // Card Bottom Title & Price
      const textBaseY = innerY + innerH - 34;
      offCtx.save();
      // Dish Title
      offCtx.font = 'bold 15px sans-serif';
      offCtx.fillStyle = '#FFFFFF';
      offCtx.fillText(slide.title, innerX + 14, textBaseY);

      // Price Tag (in sky blue / coral)
      offCtx.font = 'bold 13px sans-serif';
      offCtx.fillStyle = '#67D4F8';
      const priceMetrics = offCtx.measureText(slide.price);
      offCtx.fillText(slide.price, innerX + innerW - priceMetrics.width - 14, textBaseY);

      // Description line
      offCtx.font = '400 11px sans-serif';
      offCtx.fillStyle = 'rgba(255, 255, 255, 0.82)';
      const shortDesc = slide.desc.length > 58 ? slide.desc.slice(0, 56) + '...' : slide.desc;
      offCtx.fillText(shortDesc, innerX + 14, textBaseY + 18);
      offCtx.restore();

      offCtx.restore(); // inner clip

      // Cache this pre-rendered complete card for resting state
      cardCanvasesRef.current[idx] = offscreen;

      // Extract pixel grid for particle simulation
      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const particles = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * step + step / 2;
          const y = r * step + step / 2;
          const px = Math.min(width - 1, Math.floor(x));
          const py = Math.min(height - 1, Math.floor(y));
          const pIdx = (py * width + px) * 4;

          const red = imgData[pIdx];
          const green = imgData[pIdx + 1];
          const blue = imgData[pIdx + 2];
          const alpha = imgData[pIdx + 3] / 255;

          if (alpha < 0.08) continue; // Skip transparent edges outside the card

          // Deterministic parameters for dispersion
          const angle = Math.atan2(y - height / 2, x - width / 2);
          const distFromCenter = Math.hypot(x - width / 2, y - height / 2);
          const noise = ((Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1);

          particles.push({
            x,
            y,
            r: red,
            g: green,
            b: blue,
            a: alpha,
            angle,
            dist: distFromCenter,
            noise: Math.abs(noise),
          });
        }
      }

      // Assign each particle its 3D SPHERE position using Fibonacci spiral distribution
      const N = particles.length;
      const R_sphere = Math.min(width, height) * 0.35; // Sphere radius ~140px

      for (let i = 0; i < N; i++) {
        const zNorm = 1 - (2 * i) / (N - 1 || 1); // -1.0 to 1.0
        const radiusAtZ = Math.sqrt(Math.max(0, 1 - zNorm * zNorm));
        const goldenAngle = 2.399963229728653; // radians
        const theta = i * goldenAngle;

        particles[i].sx = R_sphere * radiusAtZ * Math.cos(theta);
        particles[i].sy = R_sphere * radiusAtZ * Math.sin(theta);
        particles[i].sz = R_sphere * zNorm;
      }

      pixelCacheRef.current[idx] = particles;
    });
  }, []);

  // Update canvas sizing on resize
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const rect = container.getBoundingClientRect();
      const width = Math.min(540, Math.max(300, Math.floor(rect.width)));
      const height = Math.round(width * 0.81);
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      dimsRef.current = { width, height, dpr };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (imagesLoaded) {
        generateParticleCaches();
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [imagesLoaded, generateParticleCaches]);

  // Trigger the 3D Sphere Card Morph transition
  const triggerMorph = useCallback((toIdx) => {
    if (toIdx === currentIndex || morphStateRef.current.active) return;

    morphStateRef.current = {
      active: true,
      startTime: performance.now(),
      duration: 2100, // 2.1s smooth 3-stage sphere transition
      fromIndex: currentIndex,
      toIndex: toIdx,
      progress: 0,
    };

    setIsTransitioning(true);
  }, [currentIndex]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % HERO_SLIDES.length;
    triggerMorph(nextIdx);
  }, [currentIndex, triggerMorph]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    triggerMorph(prevIdx);
  }, [currentIndex, triggerMorph]);

  const handleDotClick = useCallback((idx) => {
    if (idx !== currentIndex) {
      triggerMorph(idx);
    }
  }, [currentIndex, triggerMorph]);

  // Auto-play timer: advances every 6 seconds when not hovered or transitioning
  useEffect(() => {
    if (prefersReduced || isHovered || isTransitioning) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [prefersReduced, isHovered, isTransitioning, handleNext]);

  // Main 60 FPS Particle Morph Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderLoop = (timestamp) => {
      const { width, height, dpr } = dimsRef.current;
      const morph = morphStateRef.current;

      if (!width || !height) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const fromParticles = pixelCacheRef.current[morph.fromIndex];
      const toParticles = pixelCacheRef.current[morph.toIndex !== undefined ? morph.toIndex : currentIndex];
      const activeCardCanvas = cardCanvasesRef.current[currentIndex];

      if (morph.active && fromParticles && toParticles) {
        // Calculate transition progress [0.0 -> 1.0]
        const elapsed = timestamp - morph.startTime;
        const progress = Math.min(1.0, elapsed / morph.duration);
        morph.progress = progress;

        const centerX = width / 2;
        const centerY = height / 2;

        // 3-STAGE TRANSITION TIMELINE:
        // Stage 1 (0.00 -> 0.35): Card dissolves, particles disperse and collapse toward the 3D Sphere
        // Stage 2 (0.35 -> 0.70): Particles form and rotate in a glowing 3D SPHERE, morphing colors
        // Stage 3 (0.70 -> 1.00): Sphere bursts open and reassembles into the target Card

        let sphereWeight = 0; // 0 = card grid, 1 = 3D sphere
        let colorBlend = 0;

        if (progress < 0.35) {
          // Dissolve & pull into sphere
          const p = progress / 0.35;
          sphereWeight = p * p * (3 - 2 * p); // smoothstep
          colorBlend = p * 0.3;
        } else if (progress <= 0.70) {
          // Locked in rotating 3D sphere
          sphereWeight = 1.0;
          colorBlend = 0.3 + ((progress - 0.35) / 0.35) * 0.45; // blend to 0.75
        } else {
          // Burst from sphere into target card
          const p = (progress - 0.70) / 0.30;
          const snapP = Math.pow(p, 2.2); // acceleration
          sphereWeight = 1.0 - snapP;
          colorBlend = 0.75 + p * 0.25; // blend to 1.0
        }

        // 3D Sphere continuous rotation parameters
        const sphereTime = elapsed * 0.0028;
        const rotY = sphereTime + progress * Math.PI * 1.4;
        const rotX = 0.26; // aesthetic tilt angle

        // Central Ambient Sphere Glow (active during sphere phase)
        if (sphereWeight > 0.15) {
          const glowAlpha = Math.min(0.35, sphereWeight * 0.35);
          const glowRadius = Math.min(width, height) * 0.38;
          const radialGlow = ctx.createRadialGradient(
            centerX,
            centerY,
            10,
            centerX,
            centerY,
            glowRadius
          );
          radialGlow.addColorStop(0, `rgba(103, 212, 248, ${glowAlpha})`);
          radialGlow.addColorStop(0.5, `rgba(56, 189, 248, ${glowAlpha * 0.4})`);
          radialGlow.addColorStop(1, 'rgba(10, 26, 42, 0)');
          ctx.fillStyle = radialGlow;
          ctx.beginPath();
          ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        const count = Math.min(fromParticles.length, toParticles.length);
        const pSize = 2.6;
        const focalDist = 380;

        for (let i = 0; i < count; i++) {
          const pA = fromParticles[i];
          const pB = toParticles[i];

          // 1. Calculate 3D rotated position on the SPHERE
          const sx = pA.sx;
          const sy = pA.sy;
          const sz = pA.sz;

          // Rotate around Y
          const xRotY = sx * Math.cos(rotY) + sz * Math.sin(rotY);
          const zRotY = -sx * Math.sin(rotY) + sz * Math.cos(rotY);

          // Rotate around tilted X
          const yRotX = sy * Math.cos(rotX) - zRotY * Math.sin(rotX);
          const zFinal = sy * Math.sin(rotX) + zRotY * Math.cos(rotX);

          // 3D Perspective Projection
          const persp = focalDist / (focalDist + zFinal);
          const sphereX = centerX + xRotY * persp;
          const sphereY = centerY + yRotX * persp;

          // 2. Card Grid Positions (Card A -> Card B)
          const cardGridX = pA.x + (pB.x - pA.x) * Math.pow(progress, 2);
          const cardGridY = pA.y + (pB.y - pA.y) * Math.pow(progress, 2);

          // 3. Dispersion swirl offset (explodes card border and photo into sparks)
          const dispersionArc = Math.sin(progress * Math.PI);
          const swirlSpeed = (20 + 60 * pA.noise) * dispersionArc * (1 - sphereWeight * 0.85);
          const swirlAngle = pA.angle + rotY * (0.6 + pA.noise * 0.4);
          const driftX = Math.cos(swirlAngle) * swirlSpeed;
          const driftY = Math.sin(swirlAngle) * swirlSpeed;

          // 4. Blend between Card Grid and 3D Sphere
          const finalX = (cardGridX * (1 - sphereWeight) + sphereX * sphereWeight) + driftX;
          const finalY = (cardGridY * (1 - sphereWeight) + sphereY * sphereWeight) + driftY;

          // 5. Color interpolation (Card A -> Card B)
          const r = Math.round(pA.r + (pB.r - pA.r) * colorBlend);
          const g = Math.round(pA.g + (pB.g - pA.g) * colorBlend);
          const b = Math.round(pA.b + (pB.b - pA.b) * colorBlend);

          // 6. Particle size and alpha with 3D depth perception
          const depthScale = 0.55 + 0.45 * persp;
          const currentSize = pSize * depthScale;
          const depthAlpha = 0.45 + 0.55 * persp;

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.globalAlpha = depthAlpha * (0.85 + pA.noise * 0.15);

          ctx.fillRect(
            Math.round(finalX - currentSize / 2),
            Math.round(finalY - currentSize / 2),
            Math.round(currentSize),
            Math.round(currentSize)
          );
        }

        // Completion check: resolve to crisp sharp card immediately
        if (progress >= 1.0) {
          morph.active = false;
          const nextIdx = morph.toIndex;
          setCurrentIndex(nextIdx);
          setIsTransitioning(false);

          const nextCardCanvas = cardCanvasesRef.current[nextIdx];
          if (nextCardCanvas) {
            ctx.globalAlpha = 1.0;
            ctx.drawImage(nextCardCanvas, 0, 0, width, height);
          }
        }
      } else if (activeCardCanvas) {
        // RESTING STATE: Draw the pre-rendered full card with 100% clarity & sharpness!
        ctx.globalAlpha = 1.0;
        ctx.drawImage(activeCardCanvas, 0, 0, width, height);
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [currentIndex]);

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Glow Halo behind Card / Sphere */}
      <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/15 via-[#67D4F8]/20 to-sky-400/15 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Canvas Displaying Card and 3D Sphere Particle Morph */}
      <div className="relative aspect-[4/3.24] w-full rounded-3xl flex items-center justify-center overflow-visible">
        <canvas
          ref={canvasRef}
          className="block max-w-full max-h-full rounded-3xl pointer-events-auto"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />

        {/* Fallback sharp image for prefers-reduced-motion */}
        {prefersReduced && (
          <img
            src={activeSlide.src}
            alt={activeSlide.title}
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          />
        )}

        {/* Interactive Navigation Chevrons (Smoothly fade during sphere morph) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isTransitioning}
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0B1A28]/85 hover:bg-[#0B1A28] border border-white/20 text-cream flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 disabled:cursor-not-allowed z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67D4F8] ${
            isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Previous food photo"
        >
          <ChevronLeft className="w-5 h-5 text-cream" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isTransitioning}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0B1A28]/85 hover:bg-[#0B1A28] border border-white/20 text-cream flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 disabled:cursor-not-allowed z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67D4F8] ${
            isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Next food photo"
        >
          <ChevronRight className="w-5 h-5 text-cream" />
        </button>
      </div>

      {/* Bottom Pagination Indicators & Auto-Play Status */}
      <div className="mt-4 w-full flex items-center justify-between px-3">
        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero food slides">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Slide ${idx + 1}: ${slide.title}`}
                onClick={() => handleDotClick(idx)}
                disabled={isTransitioning}
                className={`relative h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67D4F8] ${
                  isActive ? 'w-8 bg-[#67D4F8]' : 'w-2 bg-white/25 hover:bg-white/45'
                }`}
              />
            );
          })}
        </div>

        {/* 3D Sphere Morph Status Chip */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-cream/75">
          <Sparkles className="w-3.5 h-3.5 text-[#67D4F8] animate-spin-slow" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#67D4F8]">
            {isTransitioning ? 'Sphere Morphing...' : '3D Particle Sphere'}
          </span>
        </div>
      </div>
    </div>
  );
}
