import React from "react";

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/d54f72f0-08fc-441b-a25b-9fe4f0dcd62f (1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HeroBackground;
