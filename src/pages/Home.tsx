// src/pages/Home.tsx

import React from 'react';
import HeroSection from '@/components/HeroSection'; // Assuming your HeroSection component is in the components folder
import HeroBackground from '@/components/HeroBackground'; // Same for HeroBackground

const Home: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <HeroBackground />
      <HeroSection />
    </div>
  );
};

export default Home;
