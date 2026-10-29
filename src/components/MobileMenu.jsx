import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Clock, ArrowRight } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import InstagramIcon from './InstagramIcon';

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Accessible Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 md:hidden"
            aria-hidden="true"
          />

          {/* Drawer: enters with opacity 0->1 and x 12px->0 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-cream z-50 md:hidden shadow-2xl flex flex-col justify-between p-6 overflow-y-auto border-l border-navy/10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-navy/10">
                <div className="flex items-center gap-3">
                  <img
                    src={brandInfo.logoUrl}
                    alt="Momos & Stuff"
                    className="w-10 h-10 rounded-full object-contain border border-sky/40 bg-white"
                  />
                  <div>
                    <span className="font-display font-bold text-navy text-base block leading-tight">
                      Momos &amp; Stuff
                    </span>
                    <span className="text-[11px] text-muted">
                      Gunjan, Vapi
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-sky-100 text-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-6 flex flex-col gap-1.5">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.2 }}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-navy font-display font-semibold text-base hover:bg-sky-100/70 active:bg-sky-200 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-navy/40" />
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Drawer Footer Details */}
            <div className="pt-6 border-t border-navy/10 space-y-4">
              <div className="space-y-2 text-xs text-body/90">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                  <span>Gunjan Khau Gali, Vapi, Gujarat</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Open 3:00 PM – 3:00 AM Daily</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#menu"
                  onClick={onClose}
                  className="w-full text-center py-3 px-5 rounded-full bg-navy text-cream font-semibold font-display shadow-sm hover:bg-navy-light transition-colors text-sm"
                >
                  Explore Menu
                </a>
                <a
                  href={brandInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-navy/15 text-navy font-medium text-xs hover:bg-sky-50 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-coral" />
                  <span>Follow {brandInfo.instagramHandle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
