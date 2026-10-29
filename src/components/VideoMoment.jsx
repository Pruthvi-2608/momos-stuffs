import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function VideoMoment() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const prefersReduced = useReducedMotionPreference();
  const easeOut = [0.22, 1, 0.36, 1];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-y border-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <motion.span
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-xs font-bold uppercase tracking-wider text-coral font-display"
          >
            Live Kitchen Moment
          </motion.span>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black font-display text-navy tracking-tight"
          >
            Watch the Steam Rise.
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2, ease: easeOut }}
            className="mt-3 text-body/80 text-sm sm:text-base leading-relaxed"
          >
            A quick glimpse into the steaming baskets and warm comforting bowls served nightly in Gunjan Khau Gali.
          </motion.p>
        </div>

        {/* Single Curated Authentic Reel Player */}
        <div className="max-w-md mx-auto">
          <motion.div
            initial={prefersReduced ? false : {
              clipPath: 'inset(12% round 28px)',
              opacity: 0
            }}
            whileInView={{
              clipPath: 'inset(0% round 28px)',
              opacity: 1
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: easeOut }}
            className="relative rounded-3xl overflow-hidden bg-navy shadow-floating border-2 border-white aspect-[9/14]"
          >
            {/* The single authentic video */}
            <video
              ref={videoRef}
              src="/assets/reels/post_1_DdWngepIWZ4.mp4"
              poster="/assets/gallery/post_1_DdWngepIWZ4_main.jpg"
              playsInline
              autoPlay={!prefersReduced}
              loop
              muted={isMuted}
              preload="metadata"
              className="w-full h-full object-cover"
              aria-label="Momos and warm ramen bowl reel footage"
            />

            {/* Gradient shadow overlay for legible controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/35 pointer-events-none" />

            {/* Top Bar: Tag & Volume Control */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <span className="px-3 py-1 rounded-full bg-navy/70 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                Fresh From The Steamer
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-navy/70 hover:bg-navy text-white backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky" />}
                </button>

                {/* Play/Pause Control: fades in & rises 4px */}
                <motion.button
                  type="button"
                  onClick={togglePlay}
                  initial={prefersReduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="p-2.5 rounded-full bg-navy/70 hover:bg-navy text-white backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-coral" />}
                </motion.button>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-5 left-5 right-5 z-20 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-coral block mb-0.5">
                Authentic Khau Gali Sizzle
              </span>
              <h3 className="font-display font-extrabold text-lg text-white mb-1 drop-shadow">
                Hot Ramen &amp; Steamed Momos
              </h3>
              <p className="text-xs text-cream/90 leading-relaxed font-sans">
                Handcrafted wrappers sealed tight and served piping hot with house spicy chutney.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
