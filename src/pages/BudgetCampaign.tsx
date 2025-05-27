import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import CampaignBudgetForm from "./CampaignBudgetForm";  // <- import added here

const industries = [
  "Technology",
  "Retail",
  "Healthcare",
  "Education",
  "Entertainment",
  "Automotive",
  "Finance",
  "Travel",
];

const faqItems = [
  {
    question: "How accurate are the AI suggestions?",
    answer:
      "The suggestions are generated based on speech input and preset algorithms. They are a starting point, and you can customize further.",
  },
  {
    question: "Can I use multiple industries?",
    answer:
      "Currently, you can select one industry at a time. We plan to support multi-industry targeting soon.",
  },
  {
    question: "Is my speech data saved?",
    answer:
      "No, all speech recognition is done locally in your browser for privacy and security.",
  },
];

const BudgetCampaign = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLDivElement>(null);

  // Animate visualizer bars when listening
  useEffect(() => {
    if (!listening) return;

    const interval = setInterval(() => {
      if (audioRef.current) {
        const bars = audioRef.current.children;
        Array.from(bars).forEach((bar: any) => {
          bar.style.height = `${Math.random() * 50 + 10}px`;
          bar.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
          bar.style.filter = `drop-shadow(0 0 6px hsl(${Math.random() * 360}, 80%, 60%))`;
        });
      }
    }, 120);

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

      // AI suggestions tailored by industry
      setSuggestions([
        `🚀 Smart Campaign Idea for: "${speech}"`,
        `🏭 Industry: ${selectedIndustry}`,
        "🎯 Target Audience: Urban Millennials & Gen-Z",
        "📈 Reach Estimate: 1.5M+ Impressions",
        "📡 Channels: AR Billboards + AI QR Engagement",
        "💰 Budget Split: 60% AR, 30% Digital, 10% Print",
      ]);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  // Toggle FAQ item open state
  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white px-6 py-12 flex flex-col items-center max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-lg text-center">
        Futuristic AI Budget Campaign
      </h1>

      {/* Insert CampaignBudgetForm here */}
      <CampaignBudgetForm />

      {/* Industry Selector */}
      <div className="mb-8 w-full max-w-xs">
        <label htmlFor="industry" className="block mb-2 font-semibold text-lg text-cyan-300">
          Select Industry:
        </label>
        <select
          id="industry"
          className="w-full p-3 rounded-md bg-gray-900 border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Microphone Button */}
      <Button
        onClick={handleStartListening}
        className={`relative z-10 rounded-full w-28 h-28 flex items-center justify-center
          ${listening ? "bg-gradient-to-r from-pink-500 to-red-500 animate-pulse" : "bg-gradient-to-r from-blue-600 to-purple-700 hover:scale-105"}
          shadow-lg shadow-purple-700/70`}
        aria-label="Start voice input"
      >
        <svg
          className="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
          <path d="M19 11a1 1 0 10-2 0 5 5 0 01-10 0 1 1 0 10-2 0 7 7 0 006 6.92V21a1 1 0 102 0v-3.08A7 7 0 0019 11z" />
        </svg>
        {listening && (
          <span className="absolute top-0 right-0 w-6 h-6 bg-red-600 rounded-full animate-ping"></span>
        )}
      </Button>

      {/* Audio Visualizer */}
      {listening && (
        <div
          ref={audioRef}
          className="flex gap-2 mt-8 w-40 h-24 items-end justify-center"
          aria-label="Audio visualizer"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-2 rounded-md bg-cyan-500"
              style={{ height: "20px", transition: "height 0.1s ease, background-color 0.3s ease" }}
            />
          ))}
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <p className="mt-6 text-center text-sm text-gray-400 max-w-lg italic select-text">
          🎙 You said: <span className="text-white font-semibold">{transcript}</span>
        </p>
      )}

      {/* Suggestions Section */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-xl w-full mt-12 space-y-4"
          >
            {suggestions.map((text, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                className="bg-gradient-to-r from-cyan-900 to-purple-900 border border-purple-700 rounded-xl p-5 shadow-lg text-lg md:text-xl font-semibold tracking-wide select-text"
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaign Overview */}
      {suggestions.length > 0 && (
        <div className="w-full max-w-4xl mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gradient-to-tr from-cyan-800 to-purple-900 rounded-xl p-6 shadow-lg">
            <h3 className="text-cyan-400 text-3xl font-bold mb-2">🎯 Target Audience</h3>
            <p className="text-white font-medium text-lg">Urban Millennials & Gen-Z</p>
          </div>
          <div className="bg-gradient-to-tr from-purple-800 to-pink-900 rounded-xl p-6 shadow-lg">
            <h3 className="text-pink-400 text-3xl font-bold mb-2">📈 Reach</h3>
            <p className="text-white font-medium text-lg">1.5M+ Impressions</p>
          </div>
          <div className="bg-gradient-to-tr from-blue-800 to-cyan-900 rounded-xl p-6 shadow-lg">
            <h3 className="text-blue-400 text-3xl font-bold mb-2">📡 Channels</h3>
            <p className="text-white font-medium text-lg">AR Billboards + AI QR Engagement</p>
          </div>
        </div>
      )}

      {/* Budget Allocation Bar */}
      {suggestions.length > 0 && (
        <div className="w-full max-w-3xl mt-12 bg-gray-900 rounded-xl p-6 shadow-inner border border-cyan-600">
          <h3 className="text-cyan-400 text-2xl font-semibold mb-4">Budget Allocation</h3>
          <div className="flex space-x-4 h-8 rounded overflow-hidden text-sm font-semibold select-none">
            <div
              className="bg-cyan-500 flex items-center justify-center"
              style={{ width: "60%" }}
            >
              AR (60%)
            </div>
            <div
              className="bg-purple-600 flex items-center justify-center"
              style={{ width: "30%" }}
            >
              Digital (30%)
            </div>
            <div
              className="bg-pink-600 flex items-center justify-center"
              style={{ width: "10%" }}
            >
              Print (10%)
            </div>
          </div>
        </div>
      )}

      {/* Additional Campaign Tips */}
      <div className="w-full max-w-4xl mt-16">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 text-center">
          Campaign Tips & Tricks
        </h2>
        <ul className="space-y-4 text-lg text-gray-300">
          <li>✨ Use AR to create immersive brand experiences that engage users longer.</li>
          <li>📊 Leverage data analytics to optimize your campaign in real-time.</li>
          <li>🔗 Integrate AI-driven QR codes for seamless offline-to-online transitions.</li>
          <li>💡 Tailor messaging to specific audience segments for maximum impact.</li>
          <li>📱 Combine outdoor campaigns with digital social media boosts.</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl mt-16">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <div key={idx} className="bg-gray-900 rounded-lg border border-cyan-700 shadow-lg">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-cyan-300 hover:bg-cyan-900 rounded-lg focus:outline-none"
                aria-expanded={faqOpenIndex === idx}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-header-${idx}`}
              >
                {item.question}
                <span className="ml-4 text-xl">
                  {faqOpenIndex === idx ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {faqOpenIndex === idx && (
                  <motion.div
                    key="content"
                    id={`faq-panel-${idx}`}
                    role="region"
                    aria-labelledby={`faq-header-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-300 text-base"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetCampaign;
