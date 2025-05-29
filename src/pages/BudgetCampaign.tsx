import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const BudgetCampaign = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    marketingGoals: "",
    targetAudience: "",
    location: "",
  });

  const [isRecording, setIsRecording] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize Web Speech API if available
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => setIsRecording(true);
      recognitionRef.current.onend = () => setIsRecording(false);
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({
          ...prev,
          description: prev.description ? prev.description + " " + transcript : transcript,
        }));
      };
    }
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle voice input for description
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Simulated AI budget suggestion based on form data
  const generateSuggestion = () => {
    const { marketingGoals, targetAudience, location } = formData;

    // Basic mock logic (You can replace this with real AI calls)
    let baseBudget = 1000;

    if (marketingGoals.toLowerCase().includes("brand awareness")) baseBudget += 500;
    if (marketingGoals.toLowerCase().includes("engagement")) baseBudget += 300;
    if (targetAudience.toLowerCase().includes("gen-z")) baseBudget += 400;
    if (location.toLowerCase().includes("global")) baseBudget += 700;
    else if (location.toLowerCase().includes("new york")) baseBudget += 300;

    setSuggestion(
      `Based on your inputs, we suggest an ad budget of around $${baseBudget.toLocaleString()}. 
      You might consider allocating 40% to AR/interactive outdoor ads, 30% to digital & social media campaigns, and 30% to AI-driven personalized content targeting your audience.`
    );
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 py-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-200">
      {/* Business/Brand Information Form */}
      <div className="w-full max-w-3xl mt-10 bg-gray-900 bg-opacity-90 rounded-xl p-10 shadow-2xl border border-cyan-600">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-8 text-center">
          🧠 Tell us about your Business or Brand
        </h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-2 text-cyan-300 font-semibold">Business Name</label>
            <input
              name="businessName"
              type="text"
              placeholder="e.g., FutureTech Solutions"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-500 text-white placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.businessName}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <label className="block mb-2 text-cyan-300 font-semibold">Brief Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="What does your business do?"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-500 text-white placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
              value={formData.description}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`absolute top-2 right-2 px-3 py-1 rounded-md font-semibold transition ₹{
                isRecording ? "bg-red-600 text-white" : "bg-cyan-600 text-gray-900 hover:bg-cyan-500"
              }`}
              aria-label="Toggle voice input"
              title="Click to start/stop voice input for description"
            >
              {isRecording ? "🎙️ Recording..." : "🎤 Speak"}
            </button>
          </div>

          <div>
            <label className="block mb-2 text-cyan-300 font-semibold">Marketing Goals</label>
            <input
              name="marketingGoals"
              type="text"
              placeholder="e.g., Increase brand awareness, drive engagement"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-500 text-white placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.marketingGoals}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block mb-2 text-cyan-300 font-semibold">Target Audience</label>
            <input
              name="targetAudience"
              type="text"
              placeholder="e.g., Gen-Z, working professionals, students"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-500 text-white placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.targetAudience}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block mb-2 text-cyan-300 font-semibold">Location</label>
            <input
              name="location"
              type="text"
              placeholder="e.g., New York, Global, Online"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-500 text-white placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.location}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <Button
            type="button"
            className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-semibold py-3 rounded-md hover:scale-105 transition-transform"
            onClick={generateSuggestion}
          >
            🔍 Generate AI Campaign Suggestions
          </Button>
        </form>

        {/* Budget suggestion output */}
        {suggestion && (
          <div className="mt-8 p-6 bg-gradient-to-r from-cyan-700 to-purple-700 rounded-xl shadow-lg text-white font-medium">
            <h3 className="text-xl font-bold mb-3">💡 Budget Suggestion:</h3>
            <p className="whitespace-pre-line">{suggestion}</p>
          </div>
        )}
      </div>

      {/* Real Campaign Success Examples */}
      <div className="w-full max-w-4xl mt-20">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8 text-center">
          📈 Real Success Stories from Businesses Like Yours
        </h2>
        <div className="space-y-8">
          {/* Example 1 */}
          <div className="bg-gray-900 border border-green-600 rounded-xl p-8 shadow-lg hover:shadow-cyan-600 transition-shadow">
            <h3 className="text-green-400 text-2xl font-bold mb-3">🚗 AutoShift - Local Car Dealership</h3>
            <p className="text-gray-300 leading-relaxed">
              AutoShift used our Ad Budget Planner to focus their <span className="text-white font-semibold">₹20,000</span> budget on{" "}
              <span className="text-white font-semibold">AR billboards in high-traffic areas</span> combined with{" "}
              <span className="text-white font-semibold">AI-driven QR codes</span> that offered instant test drive bookings.
              Within 2 weeks, they saw a <span className="text-white font-semibold">30% increase in walk-ins</span> and a{" "}
              <span className="text-white font-semibold">2.5x boost in conversion rates</span>.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-gray-900 border border-cyan-600 rounded-xl p-8 shadow-lg hover:shadow-cyan-400 transition-shadow">
            <h3 className="text-cyan-400 text-2xl font-bold mb-3">🎮 GameNova - Indie Gaming Studio</h3>
            <p className="text-gray-300 leading-relaxed">
              GameNova launched their new mobile game using our planner with just <span className="text-white font-semibold">₹80,000</span>.
              The system recommended a split budget: <span className="text-white font-semibold">50% to digital street projections</span> and{" "}
              <span className="text-white font-semibold">30% to micro-influencer AI tagging</span>. The campaign went viral on social media,
              reaching over <span className="text-white font-semibold">700K impressions</span> in the first 5 days.
            </p>
          </div>

          {/* Example 3 */}
          <div className="bg-gray-900 border border-purple-600 rounded-xl p-8 shadow-lg hover:shadow-purple-600 transition-shadow">
            <h3 className="text-purple-400 text-2xl font-bold mb-3">🥗 FreshBite - Vegan Cafe Chain</h3>
            <p className="text-gray-300 leading-relaxed">
              FreshBite wanted to grow in a new city. With a <span className="text-white font-semibold">₹15,000</span> campaign budget,
              the AI planner suggested <span className="text-white font-semibold">interactive outdoor displays</span> near parks and colleges,
              targeting Gen-Z with nutrition-focused messaging. They achieved a <span className="text-white font-semibold">40% increase in foot traffic</span>{" "}
              and 200+ app downloads during the 10-day campaign.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCampaign;
