import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
// Assuming CampaignBudgetForm handles detailed budget allocation
import CampaignBudgetForm from "@/components/CampaignBudgetForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mic, Rocket, Brain, DollarSign, MapPin, Briefcase, Lightbulb, ShieldCheck, MessageSquare } from "lucide-react";

// Define the shape of campaign details relevant to this simplified page
interface CampaignDetails {
  name: string;
  sector: string;
  industry: string;
  goal: string;
  budget: string;
  duration: string;
  location: string;
  audience: string;
  complianceRequired: boolean;
  speechInput: string;
  // Other potential fields for AI context, but not directly editable on this simplified form:
  kpis?: string;
  contentThemes?: string;
  channelPreference?: string[];
  competitorInsights?: string;
  brandGuidelines?: string;
}

const BudgetCampaign = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark for futuristic feel
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string>(""); // AI suggestions for outdoor services
  const [campaignDetails, setCampaignDetails] = useState<CampaignDetails>({
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
  });

  const isMobile = useIsMobile();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  useEffect(() => {
    // Apply dark mode on initial render
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Collapse sidebar on mobile
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile, isDarkMode]);

  const handleChange = (field: keyof CampaignDetails, value: any) => {
    setCampaignDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input requires a browser that supports Web Speech API (e.g., Chrome).");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true; // Show interim results for dynamic feedback
    recognition.continuous = true; // Allow continuous speaking

    let finalTranscript = "";

    recognition.onstart = () => {
      setIsListening(true);
      setAiSuggestions("Listening... Speak your campaign ideas!"); // Immediate feedback
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
      // Update speech input field with both final and interim results
      handleChange("speechInput", finalTranscript + interimTranscript);
    };

    recognition.onend = async () => {
      setIsListening(false);
      console.log("Voice input ended.");
      // Trigger AI suggestions only after the user has finished speaking
      if (finalTranscript) {
        await fetchAISuggestions(finalTranscript);
      } else {
        setAiSuggestions("No voice input detected. Please try again.");
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error("Speech Recognition Error:", event.error);
      alert(`Speech recognition error: ${event.error}. Please try again.`);
      setAiSuggestions(`Error: ${event.error}. Please ensure microphone access is allowed.`);
    };

    if (isListening) {
      recognition.stop(); // Stop if already listening
    } else {
      recognition.start(); // Start listening
    }
  };

  const fetchAISuggestions = async (input: string) => {
    setAiSuggestions("🚀 Analyzing input and generating smart outdoor marketing suggestions..."); // Provide immediate feedback
    try {
      const res = await fetch("/api/generate-campaign-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send all relevant campaign details for rich AI context
          ...campaignDetails,
          speechInput: input, // Ensure speech input is passed
          // We can also pass other implicit data points if needed,
          // but for a simplified UI, these core details are crucial.
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch AI suggestions.");
      }

      const data = await res.json();
      // Expect the AI to return suggestions for *traditional outdoor marketing services*
      // provided by your company, based on budget, industry, and goal.
      setAiSuggestions(data.suggestions || "No unique suggestions at this time. Try adding more details!");
    } catch (error: any) {
      console.error("AI Suggestion Error:", error);
      setAiSuggestions(`Error generating suggestions: ${error.message || "Unknown error"}. Please refine your input.`);
    }
  };

  const handleSubmit = async () => {
    // Basic validation for essential fields before launching
    if (!campaignDetails.name || !campaignDetails.goal || !campaignDetails.budget) {
      alert("Please fill in Campaign Name, Goal, and Budget before launching.");
      return;
    }

    try {
      alert("🚀 Initiating campaign launch sequence...");
      // This backend call would ideally take the final campaign details
      // including insights from AI suggestions and potentially the detailed budget allocation.
      const res = await fetch("/api/submit-campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignDetails), // You might want to include detailed budget here later
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Campaign submission failed.");
      }
      alert("✅ Campaign successfully deployed! Get ready for impact.");
      // Optionally, clear form or redirect after successful submission
      setCampaignDetails({
        name: "", sector: "Business", industry: "", goal: "", budget: "", duration: "",
        location: "", audience: "", complianceRequired: false, speechInput: "",
      });
      setAiSuggestions("");
    } catch (error: any) {
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
              <Sparkles className="text-purple-400 animate-pulse-fast" size={32} /> Campaign AI Studio
            </h1>
            <p className="text-gray-300 mt-2 text-lg max-w-2xl">
              Quickly brief our AI about your campaign, get instant outdoor marketing service suggestions, and plan your budget.
            </p>
          </div>

          {/* Section 2: AI Voice Input & Initial Campaign Brief */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-blue-700/30 shadow-lg shadow-blue-900/20">
            <CardHeader className="border-b border-gray-700/50 pb-4">
              <CardTitle className="text-2xl text-blue-300 flex items-center gap-2">
                <Brain className="text-purple-400" /> Initial Campaign Brief & AI Input
              </CardTitle>
              <CardDescription className="text-gray-400">
                Tell us about your campaign: you can type, or use the AI Voice Assistant for a natural conversation.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Voice Input Area */}
              <div className="space-y-4">
                <Label htmlFor="speechInput" className="text-gray-300 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" /> Describe Your Campaign Vision (Voice or Text)
                </Label>
                <div className="relative">
                  <Textarea
                    id="speechInput"
                    value={campaignDetails.speechInput}
                    onChange={(e) => handleChange("speechInput", e.target.value)}
                    placeholder="Speak or type your campaign ideas here. E.g., 'I need an outdoor campaign for a new smartphone targeting young tech enthusiasts in urban areas with a budget of $50,000.'"
                    className="bg-gray-700/50 border-blue-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400 min-h-[100px] resize-y"
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
                  {isListening ? "Stop AI Voice Input" : "Activate AI Voice Input"}
                </Button>
              </div>

              {/* Core Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="campaignName" className="text-gray-300">Campaign Name <span className="text-red-400">*</span></Label>
                  <Input
                    id="campaignName"
                    placeholder="e.g., 'Product Launch Blitz'"
                    value={campaignDetails.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-gray-300">Your Business / Industry</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., 'Tech Gadgets', 'Real Estate', 'Food & Beverage'"
                    value={campaignDetails.industry}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal" className="text-gray-300">Main Campaign Goal <span className="text-red-400">*</span></Label>
                  <Input
                    id="goal"
                    placeholder="e.g., 'Increase brand awareness', 'Drive sales'"
                    value={campaignDetails.goal}
                    onChange={(e) => handleChange("goal", e.target.value)}
                    className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-gray-300">Approx. Total Budget (USD) <span className="text-red-400">*</span></Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., '50000'"
                    value={campaignDetails.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-300">Target Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., 'Delhi, India', 'New York City'"
                    value={campaignDetails.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-gray-300">Target Audience Brief</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., 'Young professionals, age 25-35'"
                    value={campaignDetails.audience}
                    onChange={(e) => handleChange("audience", e.target.value)}
                    className="bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400"
                  />
                </div>
                <div className="flex items-center space-x-2 col-span-full mt-4">
                  <Checkbox
                    id="complianceRequired"
                    checked={campaignDetails.complianceRequired}
                    onCheckedChange={(checked) => handleChange("complianceRequired", checked as boolean)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:text-white border-purple-500"
                  />
                  <Label htmlFor="complianceRequired" className="text-gray-300 cursor-pointer">
                    <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-400" />
                    Campaign requires Government/Regulatory Compliance
                  </Label>
                </div>
              </div>
              <Button
                onClick={() => fetchAISuggestions(campaignDetails.speechInput || JSON.stringify(campaignDetails))} // Trigger suggestions on button click
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white shadow-md shadow-teal-500/30"
              >
                <Lightbulb className="w-5 h-5 mr-2" /> Get AI Suggestions
              </Button>
            </CardContent>
          </Card>

          {/* Section 3: AI-Powered Outdoor Marketing Service Suggestions */}
          {aiSuggestions && (
            <Card className="bg-gray-800/60 backdrop-blur-sm border border-green-700/30 shadow-lg shadow-green-900/20 animate-fade-in">
              <CardHeader className="border-b border-gray-700/50 pb-4">
                <CardTitle className="text-2xl text-green-300 flex items-center gap-2">
                  <Lightbulb className="text-green-400" /> AI-Powered Outdoor Marketing Service Suggestions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Based on your brief, our AI recommends these traditional outdoor marketing services to achieve your goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-green-600/50 text-gray-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {aiSuggestions}
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  *These suggestions are generated by AI based on your input and general industry best practices.
                  **The actual services provided by [Your Company Name] will be tailored upon further consultation.**
                </p>
                {/* Optional: Add buttons to apply/refine suggestions or jump to detailed planning */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="secondary" className="bg-gray-700 hover:bg-gray-600 text-gray-50">Refine Suggestions</Button>
                  {/* You could add a button here to pre-fill parts of CampaignBudgetForm based on suggestions */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section 4: Detailed Budget Allocation (from CampaignBudgetForm) */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-yellow-700/30 shadow-lg shadow-yellow-900/20">
            <CardHeader className="border-b border-gray-700/50 pb-4">
              <CardTitle className="text-2xl text-yellow-300 flex items-center gap-2">
                <DollarSign className="text-yellow-400" /> Detailed Budget Allocation Planner
              </CardTitle>
              <CardDescription className="text-gray-400">
                Break down your campaign budget into specific categories. Our AI can help optimize this.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <CampaignBudgetForm /> {/* This component handles detailed budget allocation */}
            </CardContent>
          </Card>

          {/* Final Action: Launch Campaign Button */}
          <div className="text-center pt-4">
            <Button
              className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white rounded-full shadow-lg shadow-purple-500/30 transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              <Rocket className="w-6 h-6 animate-pulse" /> Finalize & Submit Campaign
            </Button>
            <p className="text-gray-500 text-sm mt-3">Ready to transform your vision into reality?</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BudgetCampaign;
