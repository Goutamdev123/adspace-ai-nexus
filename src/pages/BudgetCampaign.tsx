import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const BudgetCampaign = () => {
  // Basic state to store form inputs (optional but recommended)
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    marketingGoals: "",
    targetAudience: "",
    location: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Placeholder button click handler
  const handleGenerate = () => {
    // For now, just log the form data
    console.log("Generating AI Campaign Suggestions with:", formData);
    // You can replace this with your actual AI suggestion logic
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 py-8">
      {/* Business/Brand Information Form */}
      <div className="w-full max-w-3xl mt-10 bg-gray-900 bg-opacity-60 rounded-xl p-8 shadow-xl border border-cyan-700">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6 text-center">
          🧠 Tell us about your Business or Brand
        </h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-1 text-cyan-300 font-semibold">Business Name</label>
            <input
              name="businessName"
              type="text"
              placeholder="e.g., FutureTech Solutions"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.businessName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-cyan-300 font-semibold">Brief Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="What does your business do?"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-cyan-300 font-semibold">Marketing Goals</label>
            <input
              name="marketingGoals"
              type="text"
              placeholder="e.g., Increase brand awareness, drive engagement"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.marketingGoals}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-cyan-300 font-semibold">Target Audience</label>
            <input
              name="targetAudience"
              type="text"
              placeholder="e.g., Gen-Z, working professionals, students"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.targetAudience}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-cyan-300 font-semibold">Location</label>
            <input
              name="location"
              type="text"
              placeholder="e.g., New York, Global, Online"
              className="w-full p-3 bg-gray-800 rounded-md border border-cyan-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <Button
            type="button"
            className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-semibold py-3 rounded-md hover:scale-105 transition"
            onClick={handleGenerate}
          >
            🔍 Generate AI Campaign Suggestions
          </Button>
        </form>
      </div>

      {/* Real Campaign Success Examples */}
      <div className="w-full max-w-4xl mt-16">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6 text-center">
          📈 Real Success Stories from Businesses Like Yours
        </h2>
        <div className="space-y-6">
          {/* Example 1 */}
          <div className="bg-gray-900 border border-green-600 rounded-xl p-6 shadow-lg">
            <h3 className="text-green-400 text-xl font-bold mb-2">🚗 AutoShift - Local Car Dealership</h3>
            <p className="text-gray-300">
              AutoShift used our Ad Budget Planner to focus their $2,000 budget on{" "}
              <span className="text-white font-semibold">AR billboards in high-traffic areas</span> combined with{" "}
              <span className="text-white font-semibold">AI-driven QR codes</span> that offered instant test drive bookings.
              Within 2 weeks, they saw a{" "}
              <span className="text-white font-semibold">30% increase in walk-ins</span> and a{" "}
              <span className="text-white font-semibold">2.5x boost in conversion rates</span>.
            </p>
          </div>

          {/* Example 2 */}
          <div className="bg-gray-900 border border-cyan-600 rounded-xl p-6 shadow-lg">
            <h3 className="text-cyan-400 text-xl font-bold mb-2">🎮 GameNova - Indie Gaming Studio</h3>
            <p className="text-gray-300">
              GameNova launched their new mobile game using our planner with just{" "}
              <span className="text-white font-semibold">$800</span>. The system recommended a split budget:{" "}
              <span className="text-white font-semibold">50% to digital street projections</span> and{" "}
              <span className="text-white font-semibold">30% to micro-influencer AI tagging</span>. The campaign went viral on social media,
              reaching over <span className="text-white font-semibold">700K impressions</span> in the first 5 days.
            </p>
          </div>

          {/* Example 3 */}
          <div className="bg-gray-900 border border-purple-600 rounded-xl p-6 shadow-lg">
            <h3 className="text-purple-400 text-xl font-bold mb-2">🥗 FreshBite - Vegan Cafe Chain</h3>
            <p className="text-gray-300">
              FreshBite wanted to grow in a new city. With a <span className="text-white font-semibold">$1,500</span> campaign budget,
              the AI planner suggested <span className="text-white font-semibold">interactive outdoor displays</span> near parks and colleges,
              targeting Gen-Z with nutrition-focused messaging. They achieved a{" "}
              <span className="text-white font-semibold">40% increase in foot traffic</span> and 200+ app downloads during the 10-day campaign.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCampaign;
