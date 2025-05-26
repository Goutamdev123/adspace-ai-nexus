import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
// Assuming CampaignBudgetForm handles detailed budget allocation, we'll keep it.
import CampaignBudgetForm from "@/components/CampaignBudgetForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mic, Rocket, Brain, Target, DollarSign, Clock, MapPin, Users, Lightbulb, TrendingUp, ShieldCheck, MessageSquare, Briefcase, ChevronDown } from "lucide-react";

// Assuming these are custom components for the AI look
// import AIGradientBorder from "@/components/AIGradientBorder";
// import PulsatingDot from "@/components/PulsatingDot";

const BudgetCampaign = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark for futuristic feel
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    sector: "Business", // Business, Government, Non-Profit, Education
    industry: "", // e.g., Retail, Fintech, Healthcare, Logistics, Hospitality
    goal: "", // e.g., Brand Awareness, Lead Generation, Product Launch, Public Information, Regulatory Compliance
    budget: "",
    duration: "", // e.g., "30 days", "3 months"
    location: "", // Specific regions, cities, or national
    audience: "", // Demographics, psychographics, behaviors
    complianceRequired: false,
    speechInput: "",
    kpis: "", // Key Performance Indicators (e.g., ROI, reach, conversions)
    contentThemes: "", // Main messages, creative concepts
    channelPreference: [], // OOH, Digital, Social, Print, Hybrid
    competitorInsights: "", // Known competitors or market trends
    brandGuidelines: "", // Specific brand voice, visual identity notes
  });

  const isMobile = useIsMobile();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  useEffect(() => {
    // Ensure dark mode is applied on initial render if it's the default state
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile, isDarkMode]);

  const handleChange = (field: string, value: any) => {
    setCampaignDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input requires a browser that supports Web Speech API (e.g., Chrome).");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true; // Show interim results for a more futuristic feel
    recognition.continuous = true; // Allow continuous speaking

    let finalTranscript = "";

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Listening for voice input...");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      // Update speech input field with both final and interim results for dynamic feedback
      handleChange("speechInput", finalTranscript + interimTranscript);
    };

    recognition.onend = async () => {
      setIsListening(false);
      console.log("Voice input ended.");
      // Only trigger AI suggestions after the user has finished speaking
      if (finalTranscript) {
        await fetchAISuggestions(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error("Speech Recognition Error:", event.error);
      alert(`Speech recognition error: ${event.error}. Please try again.`);
    };

    recognition.start();
  };

  const fetchAISuggestions = async (input: string) => {
    setAiSuggestions("Generating smart suggestions..."); // Provide immediate feedback
    try {
      const res = await fetch("/api/generate-campaign-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          ...campaignDetails,
          // Include more relevant details for better AI context
          detailedInput: {
            kpis: campaignDetails.kpis,
            contentThemes: campaignDetails.contentThemes,
            channelPreference: campaignDetails.channelPreference,
            competitorInsights: campaignDetails.competitorInsights,
            brandGuidelines: campaignDetails.brandGuidelines,
          }
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch AI suggestions.");
      }

      const data = await res.json();
      setAiSuggestions(data.suggestions || "No unique suggestions at this time. Try adding more details!");
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      setAiSuggestions(`Error generating suggestions: ${error.message || "Unknown error"}.`);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!campaignDetails.name || !campaignDetails.goal || !campaignDetails.budget) {
      alert("Please fill in Campaign Name, Goal, and Budget before launching.");
      return;
    }

    try {
      // Simulate loading state
      alert("🚀 Initiating campaign launch sequence...");
      const res = await fetch("/api/submit-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignDetails),
      });

      if (!res.ok) throw new Error("Campaign submission failed. Please check details.");
      alert("✅ Campaign successfully deployed! Get ready for impact.");
      // Optionally, clear form or redirect after successful submission
      setCampaignDetails({
        name: "", sector: "Business", industry: "", goal: "", budget: "", duration: "",
        location: "", audience: "", complianceRequired: false, speechInput: "",
        kpis: "", contentThemes: "", channelPreference: [], competitorInsights: "", brandGuidelines: "",
      });
      setAiSuggestions("");
    } catch (error) {
      console.error("Submit error:", error);
      alert(`❌ Error launching campaign: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 via-black to-purple-950 text-gray-50 font-sans relative overflow-hidden">
      {/* Background Grids/Particles for Futuristic feel */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(ellipse at top left, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        backgroundBlendMode: 'overlay',
        filter: 'blur(50px)'
      }}></div>
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03] animate-pulse-slow"></div>

      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className="flex-1 flex flex-col transition-all duration-500 relative z-10"
        style={{
          marginLeft: isMobile ? 0 : isSidebarOpen ? "16rem" : "4rem",
        }}
      >
        <DashboardHeader
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 p-4 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Section 1: Page Header with AI Vibe */}
          <div className="relative pb-4 border-b border-gray-700/50">
            <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              <Sparkles className="text-purple-400 animate-pulse-fast" size={32} /> Smart Campaign Architect
            </h1>
            <p className="text-gray-300 mt-2 text-lg max-w-2xl">
              Leverage AI to design your next impactful outdoor campaign, ensuring optimal budget allocation, compliance, and reach.
            </p>
            {/* <AIGradientBorder /> // Custom component for animated border */}
          </div>

          {/* Section 2: Core Campaign Details */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-purple-700/30 shadow-lg shadow-purple-900/20">
            <CardHeader className="border-b border-gray-700/50 pb-4">
              <CardTitle className="text-2xl text-purple-300 flex items-center gap-2">
                <Brain className="text-blue-400" /> Define Campaign Blueprint
              </CardTitle>
              <CardDescription className="text-gray-400">
                Provide foundational information for our AI to craft your optimal strategy.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Campaign Name */}
              <div className="space-y-2">
                <Label htmlFor="campaignName" className="text-gray-300">Campaign Name <span className="text-red-400">*</span></Label>
                <Input
                  id="campaignName"
                  placeholder="e.g., 'Winter Collection Launch 2025'"
                  value={campaignDetails.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g., 'E-commerce Retail', 'Public Transport'"
                  value={campaignDetails.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Sector */}
              <div className="space-y-2">
                <Label htmlFor="sector" className="text-gray-300">Sector</Label>
                <Select value={campaignDetails.sector} onValueChange={(val) => handleChange("sector", val)}>
                  <SelectTrigger className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 data-[placeholder]:text-gray-400">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-50">
                    <SelectItem value="Business">🏢 Business (Commercial)</SelectItem>
                    <SelectItem value="Government">🏛️ Government (Public Sector)</SelectItem>
                    <SelectItem value="Non-Profit">🤝 Non-Profit / NGO</SelectItem>
                    <SelectItem value="Education">🎓 Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-gray-300">Campaign Goal <span className="text-red-400">*</span></Label>
                <Input
                  id="goal"
                  placeholder="e.g., 'Increase brand awareness by 20%', 'Drive app installs'"
                  value={campaignDetails.goal}
                  onChange={(e) => handleChange("goal", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-gray-300">Allocated Budget (USD) <span className="text-red-400">*</span></Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="e.g., '50000'"
                  value={campaignDetails.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-gray-300">Campaign Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., '30 days', 'Q3 2025'"
                  value={campaignDetails.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">Target Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., 'New York City, USA', 'Pan-India'"
                  value={campaignDetails.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Audience */}
              <div className="space-y-2">
                <Label htmlFor="audience" className="text-gray-300">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., 'Gen Z, tech-savvy urban dwellers', 'Families with young children'"
                  value={campaignDetails.audience}
                  onChange={(e) => handleChange("audience", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* KPIs */}
              <div className="space-y-2">
                <Label htmlFor="kpis" className="text-gray-300">Key Performance Indicators (KPIs)</Label>
                <Input
                  id="kpis"
                  placeholder="e.g., 'Website visits, lead conversions, brand recall'"
                  value={campaignDetails.kpis}
                  onChange={(e) => handleChange("kpis", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Content Themes */}
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="contentThemes" className="text-gray-300">Key Content Themes / Messaging Ideas</Label>
                <Textarea
                  id="contentThemes"
                  placeholder="e.g., 'Innovation, Sustainability, Community Impact. Use vibrant colors and bold typography.'"
                  value={campaignDetails.contentThemes}
                  onChange={(e) => handleChange("contentThemes", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400 min-h-[80px]"
                />
              </div>

              {/* Channel Preference (Multi-select or checkboxes would be better for actual implementation) */}
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="channelPreference" className="text-gray-300">Preferred Channels (e.g., OOH, Digital, Print)</Label>
                <Input
                  id="channelPreference"
                  placeholder="e.g., 'Billboards, Digital Signage, Social Media Ads'"
                  value={campaignDetails.channelPreference.join(", ")} // Display as comma-separated
                  onChange={(e) => handleChange("channelPreference", e.target.value.split(",").map(s => s.trim()))} // Convert back to array
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                />
              </div>

              {/* Competitive Insights */}
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="competitorInsights" className="text-gray-300">Competitive Insights / Market Analysis</Label>
                <Textarea
                  id="competitorInsights"
                  placeholder="e.g., 'Competitor X is strong in digital, we need OOH dominance. Market trend is towards experiential campaigns.'"
                  value={campaignDetails.competitorInsights}
                  onChange={(e) => handleChange("competitorInsights", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400 min-h-[80px]"
                />
              </div>

              {/* Brand Guidelines */}
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="brandGuidelines" className="text-gray-300">Brand Guidelines / Specific Requirements</Label>
                <Textarea
                  id="brandGuidelines"
                  placeholder="e.g., 'Must adhere to brand color palette #XXXXXX, use sans-serif fonts, maintain a professional tone.'"
                  value={campaignDetails.brandGuidelines}
                  onChange={(e) => handleChange("brandGuidelines", e.target.value)}
                  className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400 min-h-[80px]"
                />
              </div>

              {/* Compliance Checkbox */}
              <div className="flex items-center space-x-2 col-span-full mt-4">
                <Checkbox
                  id="complianceRequired"
                  checked={campaignDetails.complianceRequired}
                  onCheckedChange={(checked) => handleChange("complianceRequired", checked)}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:text-white border-purple-500"
                />
                <Label htmlFor="complianceRequired" className="text-gray-300 cursor-pointer">
                  <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-400" />
                  This campaign requires Government/Regulatory Compliance
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: AI Voice Input & Predictive Assistance */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-blue-700/30 shadow-lg shadow-blue-900/20">
            <CardHeader className="border-b border-gray-700/50 pb-4">
              <CardTitle className="text-2xl text-blue-300 flex items-center gap-2">
                <Mic className="text-purple-400" /> AI Voice Command & Elaboration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Describe your campaign vision verbally. Our AI will transcribe and generate instant suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="relative">
                <Textarea
                  value={campaignDetails.speechInput}
                  readOnly
                  placeholder="Speak your campaign ideas, and our AI will capture them here. E.g., 'I want a global campaign targeting young professionals for our new eco-friendly smart device.'"
                  className="bg-gray-700/50 border-blue-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400 min-h-[120px] resize-none"
                />
                {isListening && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-blue-400">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Listening...
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={handleSpeechToText}
                className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${isListening ? 'bg-red-600/70 hover:bg-red-700/80 text-white' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 border-none'}`}
              >
                <Mic className="w-5 h-5 mr-2" />
                {isListening ? "Stop Voice Input" : "Activate AI Voice Assistant"}
              </Button>
            </CardContent>
          </Card>

          {/* Section 4: AI Generated Insights & Suggestions */}
          {aiSuggestions && (
            <Card className="bg-gray-800/60 backdrop-blur-sm border border-green-700/30 shadow-lg shadow-green-900/20 animate-fade-in">
              <CardHeader className="border-b border-gray-700/50 pb-4">
                <CardTitle className="text-2xl text-green-300 flex items-center gap-2">
                  <Lightbulb className="text-green-400" /> AI-Powered Insights
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Our intelligence engine has processed your input and offers these strategic enhancements.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-green-600/50 text-gray-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {aiSuggestions}
                </div>
                {/* Optional: Add buttons to apply/refine suggestions */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="secondary" className="bg-gray-700 hover:bg-gray-600 text-gray-50">Refine Suggestions</Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Apply Best Practices</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 5: Detailed Budget Allocation (from CampaignBudgetForm) */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-yellow-700/30 shadow-lg shadow-yellow-900/20">
            <CardHeader className="border-b border-gray-700/50 pb-4">
              <CardTitle className="text-2xl text-yellow-300 flex items-center gap-2">
                <DollarSign className="text-yellow-400" /> Dynamic Budget Allocation
              </CardTitle>
              <CardDescription className="text-gray-400">
                Detail how your budget will be distributed across various campaign elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <CampaignBudgetForm /> {/* This component is assumed to be detailed */}
            </CardContent>
          </Card>

          {/* Final Action: Launch Campaign Button */}
          <div className="text-center pt-4">
            <Button
              className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white rounded-full shadow-lg shadow-purple-500/30 transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              <Rocket className="w-6 h-6 animate-pulse" /> Initiate Campaign Launch
            </Button>
            <p className="text-gray-500 text-sm mt-3">Ready to transform your vision into reality?</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BudgetCampaign;
