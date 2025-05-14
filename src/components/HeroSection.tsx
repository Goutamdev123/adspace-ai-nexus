import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center h-screen text-white">
      {/* Hero Background */}
      <div className="absolute inset-0">
        {/* Assuming HeroBackground is your animated background component */}
        {/* <HeroBackground /> */}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          I'm a passionate developer building web applications.
        </p>
        <a
          href="#projects"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          View Projects
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
