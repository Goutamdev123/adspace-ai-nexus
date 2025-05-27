import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  PlusCircle,
  Trash2,
  DollarSign,
  Percent,
} from "lucide-react";

interface BudgetItem {
  id: string;
  category: string;
  amount: number;
}

const CampaignBudgetForm = () => {
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
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  const handleAmountChange = (id: string, value: string) => {
    const amount = parseFloat(value);
    setBudgetItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, amount: isNaN(amount) ? 0 : amount } : item
      )
    );
  };

  const handleAddCustomCategory = () => {
    if (newCategoryName.trim() && newCategoryAmount >= 0) {
      setBudgetItems((prevItems) => [
        ...prevItems,
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
    setBudgetItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border border-purple-700/30 shadow-[0_0_30px_#6b21a8]">
      <CardHeader className="border-b border-purple-500/30 pb-4">
        <CardTitle className="text-2xl md:text-3xl text-purple-300 flex items-center gap-2">
          <DollarSign className="text-purple-400" /> Budget Allocation Breakdown
        </CardTitle>
        <CardDescription className="text-gray-400">
          Use our futuristic planner to split and control your campaign budget.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-10">
        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-purple-800/10">
                <TableHead className="text-purple-300 font-bold w-2/5">Category</TableHead>
                <TableHead className="text-purple-300 text-right w-1/5">Amount (USD)</TableHead>
                <TableHead className="text-purple-300 text-right w-1/5">%</TableHead>
                <TableHead className="w-1/5" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetItems.map((item, index) => {
                const percentage = totalBudget > 0 ? (item.amount / totalBudget) * 100 : 0;
                return (
                  <TableRow
                    key={item.id}
                    className="border-b border-purple-600/20 hover:bg-purple-800/10"
                  >
                    <TableCell className="text-white font-semibold py-4">
                      {item.category}
                      <div className="w-full h-1 mt-1 rounded-full overflow-hidden">
                        <Progress
                          value={percentage}
                          className={`${getProgressBarColor(index)} h-full`}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-white">
                      <Input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleAmountChange(item.id, e.target.value)}
                        className="bg-gray-800 border-purple-500/30 text-white text-right focus:ring-purple-600"
                      />
                    </TableCell>
                    <TableCell className="text-right text-purple-300 font-bold pt-3">
                      {percentage.toFixed(1)}% <Percent className="inline w-4 h-4 ml-1 text-purple-400" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:bg-red-800/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Add Custom Item */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-purple-600/20 pt-6">
          <div className="space-y-2">
            <Label className="text-purple-300">New Category</Label>
            <Input
              placeholder="e.g. Influencer Marketing"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="bg-gray-800 border-purple-500/30 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-purple-300">Amount (USD)</Label>
            <Input
              type="number"
              value={newCategoryAmount}
              onChange={(e) =>
                setNewCategoryAmount(parseFloat(e.target.value) || 0)
              }
              className="bg-gray-800 border-purple-500/30 text-white"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleAddCustomCategory}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-md shadow-purple-700/40 text-white"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Custom Item
            </Button>
          </div>
        </div>

        {/* Total Summary */}
        <div className="flex justify-end items-center mt-6 p-4 rounded-xl border border-purple-500/40 bg-purple-900/10 shadow-inner shadow-purple-800/20">
          <h3 className="text-xl font-bold text-purple-300 mr-4">
            Total Budget:
          </h3>
          <span className="text-3xl font-extrabold text-white tracking-wide">
            ${totalBudget.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignBudgetForm;
