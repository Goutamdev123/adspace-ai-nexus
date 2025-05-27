import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const suggestions = [
  "Optimize your outdoor campaign with AI.",
  "Get location-based tracking in real-time.",
  "Let AR-powered hoardings speak your brand.",
  "Run multi-city campaigns with smart budgeting.",
  "Generate campaign ideas via voice!"
];

const BudgetCampaign = () => {
  const [listening, setListening] = useState(false);

  const toggleListening = () => {
    setListening(prev => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 flex flex-col items-center justify-center">
      
      {/* Neon AI Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[200px] h-[200px] bg-purple-500 rounded-full blur-3xl opacity-30 animate-ping"></div>
        <div className="absolute bottom-[15%] right-[15%] w-[200px] h-[200px] bg-blue-500 rounded-full blur-3xl opacity-30 animate-ping"></div>
      </div>

      {/* Main Card */}
      <Card className="z-10 w-full max-w-2xl rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-6">
        <CardContent>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-300 tracking-wide">AI Campaign Generator</h1>
          
          {/* Visualizer */}
          <div className="flex justify-center items-center mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-6 bg-cyan-400 rounded-md animate-pulse`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animation: listening ? 'pulseWave 1s infinite' : 'none'
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Dynamic Suggestions */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3,
                }
              }
            }}
            className="space-y-3 mb-8"
          >
            {suggestions.map((text, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-white/90 bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/10 transition"
              >
                {text}
              </motion.li>
            ))}
          </motion.ul>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleListening}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:scale-105 transition-transform"
            >
              {listening ? 'Stop Listening' : 'Start Speaking'}
            </Button>
            <Button
              className="bg-white text-black hover:bg-slate-200 transition"
            >
              Generate Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCampaign;
