import React, { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress"; // Assuming you have a progress component
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Assuming you have a table component
import { PlusCircle, Trash2, DollarSign, Percent } from "lucide-react";

// Define a type for a budget item
interface BudgetItem {
  id: string;
  category: string;
  amount: number;
}

const CampaignBudgetForm = () => {
  // Initial budget categories with some default values for demonstration
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

  // Calculate total budget dynamically
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  // Function to update an item's amount
  const handleAmountChange = (id: string, value: string) => {
    const amount = parseFloat(value);
    setBudgetItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, amount: isNaN(amount) ? 0 : amount } : item
      )
    );
  };

  // Function to add a new custom budget item
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

  // Function to remove a budget item
  const handleRemoveItem = (id: string) => {
    setBudgetItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Helper function to get a color for the progress bar based on index
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
    <Card className="bg-gray-800/60 backdrop-blur-sm border border-yellow-700/30 shadow-lg shadow-yellow-900/20">
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
                <TableHead className="text-gray-300 font-bold w-1/5"></TableHead> {/* For delete button */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetItems.map((item, index) => {
                const percentage = totalBudget > 0 ? (item.amount / totalBudget) * 100 : 0;
                return (
                  <TableRow key={item.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <TableCell className="font-medium text-gray-100 py-3">
                      {item.category}
                      <div className="w-full h-1 mt-1 rounded-full overflow-hidden">
                        <Progress value={percentage} className={`${getProgressBarColor(index)} h-full`} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleAmountChange(item.id, e.target.value)}
                        className="w-full bg-gray-700/50 border-purple-500/30 text-gray-50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right text-gray-200 font-semibold flex items-center justify-end h-full pt-4">
                      {percentage.toFixed(1)}% <Percent className="w-4 h-4 ml-1 text-purple-400" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:bg-red-900/40 hover:text-red-300"
                        title="Remove budget item"
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

        {/* Add Custom Budget Item */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-700/50 pt-6">
          <div className="space-y-2">
            <Label htmlFor="newCategoryName" className="text-gray-300">New Category</Label>
            <Input
              id="newCategoryName"
              placeholder="e.g., 'Influencer Marketing'"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="bg-gray-700/50 border-purple-500/30 text-gray-50 placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newCategoryAmount" className="text-gray-300">Amount (USD)</Label>
            <Input
              id="newCategoryAmount"
              type="number"
              placeholder="0"
              value={newCategoryAmount}
              onChange={(e) => setNewCategoryAmount(parseFloat(e.target.value) || 0)}
              className="bg-gray-700/50 border-purple-500/30 text-gray-50 placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-end pt-2 md:pt-0">
            <Button
              onClick={handleAddCustomCategory}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-md shadow-blue-500/30"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Custom Item
            </Button>
          </div>
        </div>

        {/* Total Budget Summary */}
        <div className="flex justify-end items-center mt-6 p-4 rounded-xl border border-purple-600/50 bg-gray-900/50 shadow-inner shadow-purple-900/20">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mr-4">
            Total Allocated Budget:
          </h3>
          <span className="text-3xl font-extrabold text-white">
            ${totalBudget.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignBudgetForm;
