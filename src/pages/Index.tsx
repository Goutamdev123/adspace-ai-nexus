import { useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";

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
    <div className="relative w-full h-screen overflow-hidden">
      <Particles id="tsparticles" init={particlesInit} options={particleOptions} />

      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center text-center px-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 max-w-2xl">
          <CardContent>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to My Website
            </h1>
            <p className="text-white/80 text-lg mb-6">
              This is a sleek landing page with an interactive 3D background using tsParticles.
            </p>
            <Button variant="secondary">Get Started</Button>
          </CardContent>
        </Card>
      </div>

      <div className="absolute bottom-0 w-full z-0">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-40"
          particleColor="#ffffff"
        />
      </div>
    </div>
  );
}
