import React, { useState, useEffect } from 'react';
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import CampaignBudgetForm from "@/components/CampaignBudgetForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BudgetCampaign = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [campaignDetails, setCampaignDetails] = useState({
    name: "",
    sector: "Business", // Business or Government
    industry: "",
    goal: "",
    budget: "",
    duration: "",
    location: "",
    audience: "",
    complianceRequired: false,
    speechInput: "",
  });

  const isMobile = useIsMobile();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  const handleChange = (field: string, value: any) => {
    setCampaignDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSpeechToText = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech Recognition not supported.");
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      handleChange('speechInput', transcript);
      await fetchAISuggestions(transcript);
    };

    recognition.start();
  };

  const fetchAISuggestions = async (input: string) => {
    try {
      // Mocked backend AI call
      const res = await fetch('/api/generate-campaign-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, ...campaignDetails }),
      });

      const data = await res.json();
      setAiSuggestions(data.suggestions || "No suggestions returned.");
    } catch (error) {
      console.error("AI Suggestion Error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/submit-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignDetails),
      });

      if (!res.ok) throw new Error("Submission failed");
      alert("Campaign submitted!");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-background w-full">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col transition-all duration-300"
           style={{ marginLeft: isMobile ? 0 : (isSidebarOpen ? '16rem' : '4rem') }}>
        <DashboardHeader toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-1 p-4 md:p-6 overflow-auto space-y-6">
          <h2 className="text-3xl font-bold">Smart Outdoor Campaign Planner</h2>
          <p className="text-muted-foreground">
            Use AI + Speech to plan high-impact outdoor campaigns with AR, tracking, and government-ready compliance.
          </p>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Campaign Name" value={campaignDetails.name} onChange={e => handleChange("name", e.target.value)} />
            <Input placeholder="Industry (Retail, Transport, Civic, etc.)" value={campaignDetails.industry} onChange={e => handleChange("industry", e.target.value)} />
            <Input placeholder="Goal (Awareness, App Installs, Public Health)" value={campaignDetails.goal} onChange={e => handleChange("goal", e.target.value)} />
            <Input placeholder="Budget (in USD)" value={campaignDetails.budget} onChange={e => handleChange("budget", e.target.value)} />
            <Input placeholder="Duration (e.g. 30 days)" value={campaignDetails.duration} onChange={e => handleChange("duration", e.target.value)} />
            <Input placeholder="Location / Geo-target" value={campaignDetails.location} onChange={e => handleChange("location", e.target.value)} />
            <Input placeholder="Target Audience" value={campaignDetails.audience} onChange={e => handleChange("audience", e.target.value)} />
            <select className="p-2 rounded-md border" value={campaignDetails.sector} onChange={e => handleChange("sector", e.target.value)}>
              <option value="Business">Business</option>
              <option value="Government">Government</option>
            </select>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={campaignDetails.complianceRequired} onChange={e => handleChange("complianceRequired", e.target.checked)} />
              <span>Requires Regulatory/Government Compliance</span>
            </label>
          </div>

          {/* Speech-to-AI */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Describe Campaign with Voice</label>
            <Textarea value={campaignDetails.speechInput} readOnly placeholder="Use your voice to describe the campaign..." />
            <Button variant="outline" onClick={handleSpeechToText}>
              🎙️ {isListening ? "Listening..." : "Start Voice Input"}
            </Button>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions && (
            <div className="border p-4 rounded-lg bg-muted">
              <h4 className="font-semibold mb-2">AI Campaign Suggestions:</h4>
              <p>{aiSuggestions}</p>
            </div>
          )}

          {/* Budget Form and Submit */}
          <CampaignBudgetForm />
          <Button className="mt-6" onClick={handleSubmit}>🚀 Launch Campaign</Button>
        </main>
      </div>
    </div>
  );
};

export default BudgetCampaign;
