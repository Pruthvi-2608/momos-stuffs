import React from 'react';
import { MapPin, Clock, ArrowUp } from 'lucide-react';
import { brandInfo } from '../data/siteContent';
import InstagramIcon from './InstagramIcon';
import PixelDriftWordmark from './PixelDriftWordmark';

const footerLinks = [
  { label: 'Menu', href: '#menu' },
  { label: 'Signature', href: '#signature' },
  { label: 'Our Story', href: '#story' },
  { label: 'Moments', href: '#moments' },
  { label: 'Visit & Hours', href: '#visit' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy text-cream pt-16 pb-12 border-t border-navy-light/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Wordmark Signature Zone with Pixel Drift */}
        <div className="pb-12 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-xs uppercase tracking-widest text-sky font-display font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span>The Little Blue Dumpling Club</span>
              <span className="text-cream/40 font-mono text-[10px] hidden sm:inline">• Hover or drag for 3D Pixel Lens</span>
            </div>

            <a
              href={brandInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-cream text-xs font-semibold transition-colors shrink-0"
              aria-label="Momos & Stuff on Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-coral" />
              <span>Follow {brandInfo.instagramHandle}</span>
            </a>
          </div>

          {/* The Mandatory Pixel Drift Wordmark */}
          <div className="w-full flex justify-center py-2">
            <PixelDriftWordmark className="max-w-5xl" />
          </div>
        </div>

        {/* Middle Navigation & Business Information */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={brandInfo.logoUrl}
                alt="Momos & Stuff"
                className="w-12 h-12 rounded-full object-contain border border-sky/40 bg-white"
              />
              <div>
                <span className="font-display font-bold text-lg text-white block leading-tight">
                  Momos &amp; Stuff
                </span>
                <span className="text-xs text-sky font-medium">
                  {brandInfo.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream/75 max-w-sm leading-relaxed font-sans">
              Handcrafting traditional Sikkim-style momos, Korean spicy dumplings, and artisan sips in Gunjan Khau Gali, Vapi &amp; Silvassa.
            </p>
          </div>

          {/* Quick Anchor Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Locations & Timings */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Outlets &amp; Hours
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Vapi Flagship:</strong>
                  <span className="font-sans">Gunjan Road, Khau Gali, Gunjan, Vapi, Gujarat</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Vapi Hours:</strong>
                  <span className="font-sans">3:00 PM – 3:00 AM Daily</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Silvassa Outlet:</strong>
                  <span className="font-sans">Silvassa Smart City, Dadra and Nagar Haveli</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>
            &copy; {currentYear} Momos &amp; Stuff. All rights reserved. Handcrafted with passion in Vapi &amp; Silvassa.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky" />
          </button>
        </div>

      </div>
    </footer>
  );
}
