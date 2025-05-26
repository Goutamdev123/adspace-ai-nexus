import React, { useState, useEffect } from "react";
// Assuming DashboardHeader and DashboardSidebar are part of a larger app structure.
// For a truly unique and standalone "page" as requested, I'll omit them here
// to focus on the core functionality and clean UI for this specific task.
// If you want them back, simply re-add them.
// import DashboardHeader from "@/components/DashboardHeader";
// import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile"; // Still useful for responsiveness

import CampaignBudgetForm from "@/components/CampaignBudgetForm"; // Your detailed budget form

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Mic, Rocket, Brain, Lightbulb, MessageSquare, Loader2 } from "lucide-react";

// Define the shape of the minimal campaign brief for AI input
interface CampaignBrief {
  textInput: string; // Combined text input for campaign idea
  // The AI will infer details like budget, industry, goal, etc., from this text
}

const BudgetCampaign = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark for futuristic feel
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // New state for AI generation loading
  const [aiSuggestions, setAiSuggestions] = useState<string>(""); // AI suggestions for outdoor services
  const [campaignBrief, setCampaignBrief] = useState<CampaignBrief>({
    textInput: "",
  });

  const isMobile = useIsMobile();

  // Effect to apply dark mode on initial render
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Function to handle speech-to-text input
  const handleSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      // Using custom alert message instead of browser's alert()
      setAiSuggestions("Voice input requires a browser that supports Web Speech API (e.g., Chrome).");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true; // Show interim results for dynamic feedback
    recognition.continuous = true; // Allow continuous speaking

    let finalTranscript = "";

    recognition.onstart = () => {
      setIsListening(true);
      setAiSuggestions("Listening... Speak your campaign idea clearly."); // Immediate feedback
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
      // Update text input field with both final and interim results
      setCampaignBrief((prev) => ({ ...prev, textInput: finalTranscript + interimTranscript }));
    };

    recognition.onend = async () => {
      setIsListening(false);
      console.log("Voice input ended.");
      // Trigger AI suggestions only after the user has finished speaking
      if (finalTranscript) {
        await fetchAISuggestions(finalTranscript);
      } else {
        setAiSuggestions("No voice input detected. Please try again or type your brief.");
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error("Speech Recognition Error:", event.error);
      setAiSuggestions(`Error: ${event.error}. Please ensure microphone access is allowed and try again.`);
    };

    if (isListening) {
      recognition.stop(); // Stop if already listening
    } else {
      recognition.start(); // Start listening
    }
  };

  // Function to fetch AI suggestions from backend
  const fetchAISuggestions = async (input: string) => {
    setIsGenerating(true); // Set loading state
    setAiSuggestions("🚀 Analyzing your vision and generating smart outdoor marketing suggestions...");
    try {
      const payload = {
        prompt: input,
        // You can add more structured data here if your AI model benefits from it,
        // but for a simplified UI, the free-form text is primary.
      };

      // API Key is automatically provided by Canvas if left empty
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: `Generate traditional outdoor marketing service suggestions for a company based on this campaign brief: "${input}". Focus on services like billboards, digital screens, transit ads, street furniture, experiential, and AR integrations. Provide specific examples relevant to inferred industry, goal, budget, and location. Structure the output as a clear, concise list of recommendations with a brief rationale for each.` }] }] })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to fetch AI suggestions.");
      }

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setAiSuggestions(text);
      } else {
        setAiSuggestions("No unique suggestions at this time. Try rephrasing your brief!");
      }

    } catch (error: any) {
      console.error("AI Suggestion Error:", error);
      setAiSuggestions(`Error generating suggestions: ${error.message || "Unknown error"}. Please refine your input.`);
    } finally {
      setIsGenerating(false); // Clear loading state
    }
  };

  // Function to simulate campaign submission (replace with actual backend call)
  const handleSubmitCampaign = async () => {
    if (!campaignBrief.textInput && !aiSuggestions) {
      alert("Please provide a campaign brief or generate AI suggestions first.");
      return;
    }

    try {
      // In a real application, you'd send campaignBrief.textInput, aiSuggestions,
      // and potentially data from CampaignBudgetForm to your backend.
      alert("✅ Campaign plan submitted! Our team will review your AI-powered brief.");
      // Reset form
      setCampaignBrief({ textInput: "" });
      setAiSuggestions("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Failed to submit campaign plan. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-950 via-black to-purple-950 text-gray-50 font-sans relative overflow-hidden">
      {/* Background Grids/Particles for Futuristic feel */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(ellipse at top left, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        backgroundBlendMode: 'overlay',
        filter: 'blur(50px)'
      }}></div>
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.03] animate-pulse-slow"></div>

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="text-center pb-4 border-b border-gray-700/50">
          <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            <Sparkles className="text-purple-400 animate-pulse-fast" size={36} /> Visionary Ads AI Studio
          </h1>
          <p className="text-gray-300 mt-2 text-lg max-w-2xl mx-auto">
            Brief our AI, get smart outdoor marketing suggestions, and plan your budget with ease.
          </p>
        </div>

        {/* Section 1: Campaign Brief & AI Voice Assistant */}
        <Card className="bg-gray-800/60 backdrop-blur-sm border border-blue-700/30 shadow-lg shadow-blue-900/20">
          <CardHeader className="border-b border-gray-700/50 pb-4">
            <CardTitle className="text-2xl text-blue-300 flex items-center gap-2">
              <Brain className="text-purple-400" /> Your Campaign Brief
            </CardTitle>
            <CardDescription className="text-gray-400">
              Tell us about your campaign idea. You can type or use the AI Voice Assistant.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <Label htmlFor="campaignBrief" className="text-gray-300 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-400" /> Describe Your Campaign Vision
              </Label>
              <div className="relative">
                <Textarea
                  id="campaignBrief"
                  value={campaignBrief.textInput}
                  onChange={(e) => setCampaignBrief({ textInput: e.target.value })}
                  placeholder="E.g., 'I need an outdoor campaign for a new smartphone targeting young tech enthusiasts in urban areas with a budget of $50,000 for 3 months. We want to highlight innovation and sustainability.'"
                  className="bg-gray-700/50 border-blue-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-gray-400 min-h-[120px] resize-y"
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
                disabled={isGenerating} // Disable while AI is generating
              >
                <Mic className="w-5 h-5 mr-2" />
                {isListening ? "Stop AI Voice Input" : "Activate AI Voice Input"}
              </Button>
            </div>
            <Button
              onClick={() => fetchAISuggestions(campaignBrief.textInput)}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white shadow-md shadow-teal-500/30"
              disabled={isGenerating || !campaignBrief.textInput.trim()} // Disable if no text or generating
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Suggestions...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5 mr-2" /> Get AI Suggestions
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Section 2: AI-Powered Outdoor Marketing Service Suggestions */}
        {aiSuggestions && (
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-green-700/30 shadow-lg shadow-green-900/20 animate-fade-in">
            <CardHeader className="border-b border-gray-700/50 pb-4">
              <CardTitle className="text-2xl text-green-300 flex items-center gap-2">
                <Lightbulb className="text-green-400" /> AI-Powered Outdoor Marketing Service Suggestions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Based on your brief, our AI recommends these traditional outdoor marketing services.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-gray-900/50 p-4 rounded-xl border border-green-600/50 text-gray-100 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {aiSuggestions}
              </div>
              <p className="text-gray-500 text-sm mt-3">
                *These suggestions are generated by AI based on your input and general industry best practices.
                The actual services provided by [Your Company Name] will be tailored upon further consultation.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Section 3: Detailed Budget Allocation (from CampaignBudgetForm) */}
        <Card className="bg-gray-800/60 backdrop-blur-sm border border-yellow-700/30 shadow-lg shadow-yellow-900/20">
          <CardHeader className="border-b border-gray-700/50 pb-4">
            <CardTitle className="text-2xl text-yellow-300 flex items-center gap-2">
              <DollarSign className="text-yellow-400" /> Detailed Budget Allocation Planner
            </CardTitle>
            <CardDescription className="text-gray-400">
              Refine your campaign budget across specific categories.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <CampaignBudgetForm /> {/* Your detailed budget allocation component */}
          </CardContent>
        </Card>

        {/* Final Action: Submit Campaign Button */}
        <div className="text-center pt-4">
          <Button
            className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white rounded-full shadow-lg shadow-purple-500/30 transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            onClick={handleSubmitCampaign}
            disabled={isGenerating || (!campaignBrief.textInput.trim() && !aiSuggestions.trim())} // Disable if no brief/suggestions or generating
          >
            <Rocket className="w-6 h-6 animate-pulse" /> Finalize & Submit Campaign Plan
          </Button>
          <p className="text-gray-500 text-sm mt-3">Ready to transform your vision into reality?</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetCampaign;
