import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import CampaignBudgetForm from "./CampaignBudgetForm"; // Make sure this path is correct
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Lightbulb, Info } from "lucide-react";

const BudgetCampaign = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const audioRef = useRef<HTMLDivElement>(null);

  // Animate visualizer bars when listening
  useEffect(() => {
    if (!listening) return;

    const interval = setInterval(() => {
      if (audioRef.current) {
        const bars = audioRef.current.children;
        Array.from(bars).forEach((bar: any) => {
          bar.style.height = `${Math.random() * 40 + 15}px`;
          bar.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
          bar.style.boxShadow = `0 0 8px hsl(${Math.random() * 360}, 100%, 70%)`;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [listening]);

  const handleStartListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      setListening(false);

      // Simulated AI suggestions with more futuristic details
      setSuggestions([
        `🚀 Smart Campaign: "${speech}"`,
        "🎯 Target: Urban Millennials & Gen-Z",
        "📈 Reach Estimate: 1.5M+ impressions",
        "📡 Channels: AR Billboards + AI QR Engagement + Digital",
        "💰 Budget Split: 60% AR, 30% Digital, 10% Print",
        "🔍 Real-time analytics & AI-driven optimization",
        "🤖 Powered by AI & AR technologies",
      ]);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-purple-900 text-white px-6 py-12 flex flex-col items-center max-w-7xl mx-auto">
      <header className="text-center mb-10 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
          Futuristic AI Budget Campaign Planner
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Speak your campaign idea and let AI generate an optimized budget plan for your next-level marketing strategy.
        </p>
      </header>

      {/* Voice Input Section */}
      <section className="mb-12 w-full max-w-4xl flex flex-col items-center">
        <Button
          onClick={handleStartListening}
          className={`text-lg px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 hover:scale-105 transition-transform shadow-lg ${
            listening ? "animate-pulse" : ""
          }`}
          aria-label="Start voice input"
        >
          {listening ? "Listening..." : "🎙️ Speak Your Campaign Idea"}
        </Button>

        {/* Neon Audio Visualizer */}
        {listening && (
          <div
            ref={audioRef}
            className="flex gap-1 h-12 items-end mt-6"
            aria-hidden="true"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-lg bg-neon-glow transition-all duration-100 ease-in-out"
                style={{ height: "25px" }}
              />
            ))}
          </div>
        )}

        {/* Transcribed Text */}
        {transcript && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 max-w-xl text-center text-lg italic text-cyan-400 drop-shadow-md"
          >
            "{transcript}"
          </motion.p>
        )}
      </section>

      {/* Suggestions / AI Campaign Plan */}
      <section className="w-full max-w-4xl mb-16">
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
              aria-live="polite"
            >
              {suggestions.map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-gradient-to-r from-[#1e1e1e] to-[#2c2c2c] border border-purple-700 shadow-xl rounded-2xl p-5 text-center text-lg md:text-xl font-semibold tracking-wide text-purple-300 hover:shadow-purple-600/70"
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Budget Breakdown Form Section */}
      <section className="w-full max-w-5xl mb-16">
        <CampaignBudgetForm />
      </section>

      {/* Summary & Tips Section */}
      <section className="w-full max-w-5xl bg-gradient-to-br from-purple-900 via-black to-purple-900 rounded-3xl p-8 shadow-lg border border-purple-700/50 text-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div className="flex items-center gap-4">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <div>
              <h3 className="text-2xl font-bold text-white">AI Optimization</h3>
              <p className="text-sm text-gray-400 max-w-md">
                Our AI models continuously optimize your campaign budget for maximum ROI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <WaveSawTool className="w-8 h-8 text-pink-500" />
            <div>
              <h3 className="text-2xl font-bold text-white">AR Integration</h3>
              <p className="text-sm text-gray-400 max-w-md">
                Engage audiences through immersive AR billboards and interactive experiences.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-2xl font-bold text-white">Smart Insights</h3>
              <p className="text-sm text-gray-400 max-w-md">
                Real-time analytics and actionable insights guide your campaign decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
          <Info className="w-4 h-4" />
          <span>
            Remember to balance your budget across channels for the best impact.
          </span>
        </div>
      </section>
    </div>
  );
};

export default BudgetCampaign;
