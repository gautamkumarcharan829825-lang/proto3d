/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureSection from './components/FeatureSection';
import TechSection from './components/TechSection';
import Footer from './components/Footer';
import { useProductCustomization } from './hooks/useProductCustomization';

export default function App() {
  const customization = useProductCustomization();

  const handleScrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProduct = () => {
    const el = document.getElementById('product-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#111111]">
      {/* Primary Top Bar */}
      <Navbar onExploreClick={handleScrollToProduct} />

      {/* Main Interactive Showcase Experience */}
      <main className="flex-1">
        <Hero
          customization={customization}
          onExploreClick={handleScrollToFeatures}
        />
        <FeatureSection />
        <TechSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
