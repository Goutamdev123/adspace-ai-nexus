import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const BudgetCampaign = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const audioRef = useRef<HTMLDivElement>(null);

  // Neon audio visualizer
  useEffect(() => {
    if (!listening) return;
    const interval = setInterval(() => {
      if (audioRef.current) {
        const bars = audioRef.current.children;
        Array.from(bars).forEach((bar: any) => {
          bar.style.height = `${Math.random() * 30 + 10}px`;
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [listening]);

  const handleStartListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser");
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

      // Simulated AI suggestions
      setSuggestions([
        `Optimized Campaign for "${speech}"`,
        "Estimated Reach: 1M+",
        "Location: Urban Metro Zones",
        "Medium: AR Hoardings + Digital Sync",
      ]);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        AI-Powered Budget Campaign
      </h1>

      <Button
        className="px-6 py-3 text-lg rounded-full bg-gradient-to-r from-blue-500 to-purple-700 shadow-lg hover:scale-105 transition-all"
        onClick={handleStartListening}
      >
        {listening ? "Listening..." : "Speak Your Campaign Idea"}
      </Button>

      {listening && (
        <div ref={audioRef} className="flex gap-1 mt-4 h-10 items-end">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-sm bg-neon-glow transition-all"
              style={{ height: "20px" }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 w-full max-w-xl space-y-4"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-4 bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] border border-purple-500/40 shadow-xl rounded-lg text-center"
              >
                {suggestion}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetCampaign;
