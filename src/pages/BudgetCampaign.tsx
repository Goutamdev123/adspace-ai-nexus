import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2, DollarSign, Percent } from "lucide-react";

// Type for budget items
interface BudgetItem {
  id: string;
  category: string;
  amount: number;
}

const BudgetCampaign = () => {
  // Speech input and suggestions
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const audioRef = useRef<HTMLDivElement>(null);

  // Budget form state
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: "media-buying", category: "Media Buying (OOH Displays)", amount: 25000 },
    { id: "creative-prod", category: "Creative Production & Design", amount: 10000 },
    { id: "tech-platform", category: "Technology & Platform Fees (AI/AR)", amount: 7500 },
    { id: "installation", category: "Installation & Logistics", amount: 5000 },
    { id: "measurement", category: "Measurement & Analytics", amount: 3000 },
    { id: "contingency", category: "Contingency (10%)", amount: 5500 },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryAmount, setNewCategoryAmount] = useState<number>(0);

  // Animate neon bars when listening
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

  // Speech recognition handler
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

  // Budget form handlers
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  const handleAmountChange = (id: string, value: string) => {
    const amount = parseFloat(value);
    setBudgetItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: isNaN(amount) ? 0 : amount } : item
      )
    );
  };

  const handleAddCustomCategory = () => {
    if (newCategoryName.trim() && newCategoryAmount >= 0) {
      setBudgetItems((prev) => [
        ...prev,
        {
          id: `custom-${Date.now()}`,
          category: newCategoryName.trim(),
          amount: newCategoryAmount,
        },
      ]);
      setNewCategoryName("");
      setNewCategoryAmount(0);
    }
  };

  const handleRemoveItem = (id: string) => {
    setBudgetItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getProgressBarColor = (index: number) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-teal-500",
      "bg-indigo-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-12 flex flex-col items-center">
      {/* Title and Speech Button */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text drop-shadow-lg mb-8">
        Futuristic AI Budget Campaign
      </h1>

      <Button
        onClick={handleStartListening}
        className="text-lg px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 hover:scale-105 transition-transform shadow-lg mb-6"
      >
        {listening ? "Listening..." : "Speak Your Campaign Idea"}
      </Button>

      {/* Neon Audio Visualizer */}
      {listening && (
        <div
          ref={audioRef}
          className="flex gap-1 h-10 items-end mb-8"
          aria-label="Audio visualizer"
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-1 rounded bg-cyan-400 shadow-[0_0_8px_cyan] transition-all"
              style={{ height: "20px" }}
            />
          ))}
        </div>
      )}

      {/* Animated AI Suggestions */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl mb-10 space-y-4"
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

      {/* Budget Form Card */}
      <Card className="bg-gray-900/80 backdrop-blur-md border border-purple-700/50 shadow-lg shadow-purple-900/40 max-w-5xl w-full">
        <CardHeader className="border-b border-gray-700/50 pb-4">
          <CardTitle className="text-2xl text-yellow-300 flex items-center gap-2">
            <DollarSign className="text-yellow-400" /> Budget Allocation Breakdown
          </CardTitle>
          <CardDescription className="text-gray-400">
            Allocate your campaign budget across various categories. Our AI can help optimize this based on your goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          {/* Budget Allocation Table */}
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-700/50">
                  <TableHead className="text-gray-300 font-bold w-2/5">Category</TableHead>
                  <TableHead className="text-gray-300 font-bold text-right w-1/5">Amount (USD)</TableHead>
                  <TableHead className="text-gray-300 font-bold text-right w-1/5">Percentage (%)</TableHead>
                  <TableHead className="text-gray-300 font-bold w-1/5"></TableHead> {/* Delete btn */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item, index) => {
                  const percentage = totalBudget > 0 ? (item.amount / totalBudget) * 100 : 0;
                  return (
                    <TableRow
                      key={item.id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-100 py-3">
                        {item.category}
                        <div className="w-full h-1 mt-1 rounded-full overflow-hidden">
                          <Progress value={percentage} className={`${getProgressBarColor(index)} h-full`} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          min={0}
                          value={item.amount}
                          onChange={(e) => handleAmountChange(item.id, e.target.value)}
                          className="max-w-[100px] bg-gray-800 text-yellow-400 font-semibold text-right"
                        />
                      </TableCell>
                      <TableCell className="text-right text-yellow-400 font-semibold">
                        {percentage.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center">
                        {item.id.startsWith("custom-") && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            aria-label={`Remove ${item.category}`}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Add Custom Category */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Input
              type="text"
              placeholder="New Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 bg-gray-800 text-yellow-400 placeholder-yellow-300"
            />
            <Input
              type="number"
              min={0}
              placeholder="Amount (USD)"
              value={newCategoryAmount || ""}
              onChange={(e) => setNewCategoryAmount(parseFloat(e.target.value) || 0)}
              className="w-36 bg-gray-800 text-yellow-400 placeholder-yellow-300"
            />
            <Button
              onClick={handleAddCustomCategory}
              disabled={!newCategoryName.trim() || newCategoryAmount <= 0}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <PlusCircle className="mr-2" size={18} /> Add Category
            </Button>
          </div>

          {/* Total Budget Summary */}
          <div className="text-right text-xl font-bold text-yellow-300">
            Total Budget: ${totalBudget.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCampaign;
