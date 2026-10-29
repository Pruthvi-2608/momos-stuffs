import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

/**
 * PixelDriftWordmark
 *
 * Implements a rich, living Particle Wordmark for "Momos & Stuff":
 * - The entire wordmark is visibly composed of thousands of luminous, shimmering particles
 *   in the brand palette (radiant warm cream/white, momo-coral, steam sky blue, and golden honey).
 * - Organic ambient shimmer: even at rest, particles exhibit subtle Brownian twinkling and
 *   gentle floating micro-harmonics, so it unmistakably looks like living particles.
 * - Ambient Steam Satellites: tiny steam dust embers drift gently around and above the letters.
 * - Interactive Cursor Dynamics: moving the cursor disperses, swirls, and scatters particles
 *   outward like a magnetic particle cloud with fluid drag and inertia.
 * - Elastic Reassembly: as the cursor moves away, spring forces gracefully pull every particle
 *   back into its precise home coordinate, reforming the crisp, readable "Momos & Stuff".
 * - Click Burst: emits an expanding shockwave ripple that disperses particles in a circular wave.
 * - Full accessibility: semantic heading in the DOM and prefers-reduced-motion support.
 */
export default function PixelDriftWordmark({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const prefersReduced = useReducedMotionPreference();

  // Mouse & Touch tracking state
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    isInside: false,
    shockwaveRadius: 0,
    shockwaveActive: false,
    shockwaveCenter: { x: 0, y: 0 },
  });

  const particlesRef = useRef([]);
  const steamParticlesRef = useRef([]);
  const dimsRef = useRef({ width: 0, height: 0, dpr: 1, fontSize: 80 });
  const [isReady, setIsReady] = useState(false);

  // Initialize and rasterize the wordmark into particle nodes
  const initWordmark = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(320, Math.floor(rect.width));
    // Prominent responsive font scale
    const fontSize = Math.min(94, Math.max(38, Math.round(width * 0.092)));
    const height = Math.max(150, Math.round(fontSize * 2.3));
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    dimsRef.current = { width, height, dpr, fontSize };

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Offscreen canvas for precise sampling
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    // Authentic Momos Typography: Rounded Plus Jakarta Sans, 800 weight, Title Case
    offCtx.fillStyle = '#FFFFFF';
    offCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    if ('letterSpacing' in offCtx) {
      offCtx.letterSpacing = '-0.015em';
    }
    offCtx.fillText('Momos & Stuff', width / 2, height / 2);

    const imgData = offCtx.getImageData(0, 0, width, height).data;

    // Fine grid step to generate high-density particles
    const step = Math.max(3.0, Math.round(fontSize / 23));

    const particles = [];
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4;
        const alpha = imgData[idx + 3];

        if (alpha > 85) {
          const nx = Math.floor(x / step);
          const ny = Math.floor(y / step);

          // Deterministic hash for varied particle properties
          const seed = (Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453) % 1;
          const rand = Math.abs(seed);

          // Brand color palette:
          // 65% Radiant Cream / Pure White (#FFFFFF / #FFFDF8)
          // 20% Momo Coral (#FF6536 / #F29A83)
          // 10% Steam Sky Blue (#A9DCE8 / #7ECBE0)
          // 5% Golden Dumpling Glow (#FDBA74)
          let color = '#FFFFFF';
          let isAccent = false;
          if (rand > 0.80) {
            color = '#FF6536'; // Momo coral/chili
            isAccent = true;
          } else if (rand > 0.70) {
            color = '#A9DCE8'; // Steam sky blue
            isAccent = true;
          } else if (rand > 0.65) {
            color = '#FDBA74'; // Warm dumpling honey
            isAccent = true;
          }

          // Varied particle sizes: mix of fine dust, standard dots, and glowing embers
          let size = Math.max(2.4, step * 0.76);
          if (rand < 0.22) {
            size = Math.max(1.8, step * 0.54); // tiny fine dust particle
          } else if (rand > 0.84) {
            size = Math.max(3.0, step * 1.0); // glowing accent ember
          }

          particles.push({
            ox: x,
            oy: y,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size,
            color,
            isAccent,
            phase: rand * Math.PI * 2,
            twinkleSpeed: 1.2 + rand * 2.0,
            baseAlpha: 0.85 + (alpha / 255) * 0.15,
          });
        }
      }
    }

    particlesRef.current = particles;

    // Generate floating ambient "steam dust" particles around the letters
    const steamCount = Math.min(55, Math.round(width / 18));
    const steam = [];
    for (let i = 0; i < steamCount; i++) {
      steam.push({
        x: Math.random() * width,
        y: height * 0.3 + Math.random() * height * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.25 - Math.random() * 0.45,
        size: 1.5 + Math.random() * 2.2,
        color: Math.random() > 0.4 ? '#A9DCE8' : '#FFFDF8',
        alpha: 0.2 + Math.random() * 0.45,
        maxLife: 160 + Math.random() * 120,
        life: Math.random() * 160,
      });
    }
    steamParticlesRef.current = steam;

    setIsReady(true);
  }, []);

  // Window resize handler
  useEffect(() => {
    initWordmark();
    const handleResize = () => {
      initWordmark();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initWordmark]);

  // Main 60 FPS Particle Physics and Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime = performance.now();

    const renderLoop = (timestamp) => {
      const elapsed = (timestamp - startTime) / 1000;
      const { width, height, dpr, fontSize } = dimsRef.current;
      const particles = particlesRef.current;
      const steam = steamParticlesRef.current;
      const mouse = mouseRef.current;

      if (!width || !height || particles.length === 0) {
        animFrameRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Calculate mouse velocity for momentum transfer
      if (mouse.prevX !== -1000) {
        mouse.vx = (mouse.x - mouse.prevX) * 0.5;
        mouse.vy = (mouse.y - mouse.prevY) * 0.5;
      }
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // Cursor repulsion radius
      const cursorRadius = fontSize * 1.35;
      const cursorRadiusSq = cursorRadius * cursorRadius;

      // Handle shockwave wave expansion
      if (mouse.shockwaveActive) {
        mouse.shockwaveRadius += 10;
        if (mouse.shockwaveRadius > width * 0.7) {
          mouse.shockwaveActive = false;
        }
      }

      // 1. Render & Update Floating Steam Dust Particles
      if (!prefersReduced) {
        for (let s = 0; s < steam.length; s++) {
          const sp = steam[s];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.life++;

          // Reset when risen past top
          if (sp.y < 10 || sp.life > sp.maxLife) {
            sp.x = width * 0.12 + Math.random() * width * 0.76;
            sp.y = height * 0.65 + Math.random() * height * 0.2;
            sp.life = 0;
            sp.vy = -0.25 - Math.random() * 0.4;
          }

          ctx.fillStyle = sp.color;
          ctx.globalAlpha = sp.alpha * Math.sin((sp.life / sp.maxLife) * Math.PI);
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Render & Update Core Letter Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReduced) {
          // A. Micro-harmonic ambient float (gives living organic particle shimmer)
          const ambientOffsetX = Math.sin(elapsed * p.twinkleSpeed + p.phase) * 0.65;
          const ambientOffsetY = Math.cos(elapsed * (p.twinkleSpeed * 1.1) + p.phase) * 0.65;
          const homeX = p.ox + ambientOffsetX;
          const homeY = p.oy + ambientOffsetY;

          // B. Cursor Repulsion & Drag Dynamics
          if (mouse.isInside) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < cursorRadiusSq && distSq > 0.001) {
              const dist = Math.sqrt(distSq);
              const force = Math.pow((cursorRadius - dist) / cursorRadius, 1.6);

              // Radial push away from cursor
              const pushX = (dx / dist) * force * 15;
              const pushY = (dy / dist) * force * 15;

              // Tangential swirl around cursor
              const swirlX = -(dy / dist) * force * 3.5;
              const swirlY = (dx / dist) * force * 3.5;

              // Mouse momentum transfer
              p.vx += pushX + swirlX + mouse.vx * force * 0.35;
              p.vy += pushY + swirlY + mouse.vy * force * 0.35;
            }
          }

          // C. Click Shockwave Wave
          if (mouse.shockwaveActive) {
            const sdx = p.x - mouse.shockwaveCenter.x;
            const sdy = p.y - mouse.shockwaveCenter.y;
            const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
            const waveDiff = Math.abs(sdist - mouse.shockwaveRadius);

            if (waveDiff < 32 && sdist > 0.001) {
              const waveForce = (1 - waveDiff / 32) * 14;
              p.vx += (sdx / sdist) * waveForce;
              p.vy += (sdy / sdist) * waveForce;
            }
          }

          // D. Elastic Spring Force pulling back to home letter position
          const springK = 0.075;
          const damping = 0.85;

          const ax = (homeX - p.x) * springK;
          const ay = (homeY - p.y) * springK;

          p.vx = (p.vx + ax) * damping;
          p.vy = (p.vy + ay) * damping;

          p.x += p.vx;
          p.y += p.vy;
        } else {
          p.x = p.ox;
          p.y = p.oy;
        }

        // Particle Twinkle Alpha
        const twinkle = prefersReduced
          ? 1.0
          : 0.78 + Math.sin(elapsed * p.twinkleSpeed * 1.5 + p.phase) * 0.22;

        ctx.globalAlpha = p.baseAlpha * twinkle;
        ctx.fillStyle = p.color;

        // Render as distinct square pixel particle with high contrast
        const renderSize = p.size;
        ctx.fillRect(
          Math.round(p.x - renderSize / 2),
          Math.round(p.y - renderSize / 2),
          Math.round(renderSize),
          Math.round(renderSize)
        );
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
  }, [prefersReduced]);

  // Pointer & Touch Events
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.isInside = true;
  };

  const handleMouseEnter = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.prevX = x;
    mouseRef.current.prevY = y;
    mouseRef.current.isInside = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isInside = false;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    mouseRef.current.prevX = -1000;
    mouseRef.current.prevY = -1000;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current.shockwaveActive = true;
    mouseRef.current.shockwaveRadius = 5;
    mouseRef.current.shockwaveCenter = { x, y };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-5xl mx-auto select-none cursor-pointer flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="region"
      aria-label="Momos & Stuff animated particle wordmark"
      tabIndex={0}
    >
      {/* 
        The Wordmark is rendered directly as a rich, shimmering field of particles on canvas!
      */}
      <canvas
        ref={canvasRef}
        className="block mx-auto max-w-full pointer-events-auto"
      />

      {/* Screen Reader Semantic Element */}
      <h2 className="sr-only">Momos &amp; Stuff</h2>
    </div>
  );
}