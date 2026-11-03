import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import EnjoyeatStory from './EnjoyeatStory';
import ChooseCrunchPage from './ChooseCrunchPage';
import StoryToShopBurstWrapper from './components/StoryToShopBurstWrapper';
import BenefitsSection from './BenefitsSection';
import RecipesSection from './RecipesSection';
import WholesaleSection from './WholesaleSection';
import ContactSection from './ContactSection';
import MobileAlternatingSection from './components/MobileAlternatingSection';
import './App.css';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#EFE7D6] text-[#1E1E1C] selection:bg-[#44533E] selection:text-white" style={{ overflow: "clip" }}>
      {/* Site-wide navigation bar */}
      <Navbar />

      {/* Main Pages with Smooth Page-Shift Transitions */}
      <main className="w-full" style={{ overflow: "clip" }}>
        {/* Page 1: Hero */}
        <HeroSection />

        {/* Page 2: Our Story */}
        <EnjoyeatStory />

        {/* Page 3: Shop (ChooseCrunchPage) */}
        <ChooseCrunchPage />

        {/* Page 4: Benefits */}
        <BenefitsSection />

        {/* Page 5: Recipes & Use Cases */}
        <RecipesSection />

        {/* Page 6: Wholesale */}
        <WholesaleSection />

        {/* Page 7: Contact */}
        <ContactSection />
      </main>
    </div>
  );
}
