import { useCallback } from "react";
import { Particles } from 'node_modules/@tsparticles/react';
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import MetricsCard from "@/components/MetricsCard";
import IndiaTrafficMap from "@/components/IndiaTrafficMap";
import BangaloreTraffic from "@/components/BangaloreTraffic";
import BusinessBenefits from "@/components/BusinessBenefits";
import OutdoorAdvertisements from "@/components/OutdoorAdvertisements";
import TrackingTechnologies from "@/components/TrackingTechnologies";
import TrafficHeatmap from "@/components/TrafficHeatmap";
import AIRecommendations from "@/components/AIRecommendations";

const particleOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: "out",
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};

export default function Index() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-transparent">
      {/* 3D Particle Background */}
      <Particles id="tsparticles" init={particlesInit} options={particleOptions} />
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="absolute bottom-0 w-full h-40 z-0"
        particleColor="#ffffff"
      />

      {/* Your original content */}
      <div className="relative z-10 flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <DashboardHeader />
          <MetricsCard />
          <IndiaTrafficMap />
          <BangaloreTraffic />
          <BusinessBenefits />
          <OutdoorAdvertisements />
          <TrackingTechnologies />
          <TrafficHeatmap />
          <AIRecommendations />
        </main>
      </div>
    </div>
  );
}
