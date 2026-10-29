import React from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandNotes from './components/BrandNotes';
import MenuSection from './components/MenuSection';
import SignatureMoment from './components/SignatureMoment';
import StorySection from './components/StorySection';
import InstagramGallery from './components/InstagramGallery';
import VisitSection from './components/VisitSection';
import FinalCTA from './components/FinalCTA';
import MovingWordsTicker from './components/MovingWordsTicker';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-body selection:bg-sky-200 selection:text-navy">
      {/* 4.1 Announcement Ribbon */}
      <AnnouncementBar />

      {/* 4.2 Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 4.3 Hero */}
        <Hero />

        {/* 4.4 Brand Notes (Slim editorial band) */}
        <BrandNotes />

        {/* 4.5 Menu (Strictly Image & Video Free) */}
        <MenuSection />

        {/* 4.6 Signature Editorial Moment (Outside menu) */}
        <SignatureMoment />

        {/* 4.7 Our Story */}
        <StorySection />

        {/* 4.8 Instagram Moments */}
        <InstagramGallery />

        {/* 4.9 Visit / Contact */}
        <VisitSection />

        {/* 4.10 Final CTA */}
        <FinalCTA />
      </main>

      {/* Moving Words Ticker — Seamless infinite bold marquee banner right above dark footer */}
      <MovingWordsTicker />

      {/* 4.11 Footer with Pixel Drift Wordmark */}
      <Footer />
    </div>
  );
}
