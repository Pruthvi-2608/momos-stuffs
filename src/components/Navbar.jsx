import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, ArrowRight } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import MobileMenu from './MobileMenu';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

const navLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Signature', href: '#signature' },
  { label: 'Our Story', href: '#story' },
  { label: 'Moments', href: '#moments' },
  { label: 'Visit', href: '#visit' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={prefersReduced ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-navy/10 py-3'
            : 'bg-cream/80 backdrop-blur-sm border-b border-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#hero"
            className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-xl p-1"
            aria-label="Momos & Stuff Home"
          >
            <div className="relative shrink-0">
              <img
                src={brandInfo.logoUrl}
                alt="Momos & Stuff Official Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-contain border border-sky/40 bg-white transition-transform duration-300 group-hover:scale-105"
              />
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-mint rounded-full border-2 border-cream ring-1 ring-mint/60"
                title="Open Today in Gunjan, Vapi"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display font-extrabold text-navy text-lg sm:text-xl tracking-tight leading-tight group-hover:text-navy-light transition-colors">
                Momos &amp; Stuff
              </span>
              <span className="text-[11px] font-medium text-muted tracking-wide">
                Gunjan, Vapi • Open Till 3 AM
              </span>
            </div>
          </a>

          {/* Concise Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 bg-white/75 backdrop-blur-md border border-navy/10 rounded-full px-6 py-2 shadow-sm">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + idx * 0.05 }}
                className="relative py-1 text-sm font-semibold font-display text-navy/85 hover:text-navy transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-md"
              >
                <span>{link.label}</span>
                {/* ScaleX Hover Underline */}
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-navy scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 pointer-events-none rounded-full"
                  aria-hidden="true"
                />
              </motion.a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-cream font-display font-semibold text-sm shadow-soft hover:-translate-y-0.5 hover:shadow-soft-lg active:translate-y-0 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2.5 rounded-2xl bg-white/90 border border-navy/10 text-navy hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Accessible Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
