import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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

      // Simulated AI suggestions
      setSuggestions([
        `Smart Campaign for "${speech}"`,
        "Target: Urban Millennials & Gen-Z",
        "Reach Estimate: 1.5M+",
        "Channel: AR Billboards + AI QR Engagement",
        "Budget Split: 60% AR, 30% Digital, 10% Print",
      ]);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
        Futuristic AI Budget Campaign
      </h1>

      <Button
        onClick={handleStartListening}
        className="text-lg px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 hover:scale-105 transition-transform shadow-lg"
      >
        {listening ? "Listening..." : "Speak Your Campaign Idea"}
      </Button>

      {listening && (
        <div
          ref={audioRef}
          className="flex gap-1 h-10 items-end mt-4"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-1 rounded bg-neon-glow transition-all"
              style={{ height: "20px" }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl mt-6 space-y-4"
          >
            {suggestions.map((text, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-gradient-to-r from-[#1e1e1e] to-[#2c2c2c] border border-purple-600/30 shadow-xl rounded-xl p-4 text-center text-base md:text-lg"
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BudgetCampaign;
