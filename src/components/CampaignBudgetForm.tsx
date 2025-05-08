
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { BadgePercent, BarChart3, DollarSign, LineChart, Milestone, Target } from "lucide-react";

// Form schema
const formSchema = z.object({
  budget: z.string().min(1, "Budget is required"),
  industry: z.string().min(1, "Industry is required"),
  duration: z.string().min(1, "Campaign duration is required"),
  objective: z.string().min(1, "Campaign objective is required"),
});

// Package types
interface AdPackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended: boolean;
  icon: React.ReactNode;
}

const CampaignBudgetForm = () => {
  const [showPackages, setShowPackages] = useState(false);
  const [packages, setPackages] = useState<AdPackage[]>([]);

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: "",
      industry: "",
      duration: "30",
      objective: "awareness",
    },
  });

  // Get recommended packages based on form data
  const getRecommendedPackages = (data: z.infer<typeof formSchema>) => {
    const budget = parseInt(data.budget);
    let recommendedPackages: AdPackage[] = [];

    // Basic package - always available
    recommendedPackages.push({
      name: "Starter",
      price: `₹${Math.round(budget * 0.7).toLocaleString()}`,
      description: "Essential advertising to get your business noticed",
      features: [
        "Basic ad placement",
        "Standard targeting",
        "Weekly performance reports",
        "Email support"
      ],
      recommended: budget < 50000,
      icon: <BarChart3 className="h-5 w-5 text-adtech-blue" />
    });

    // Mid-tier package for medium budgets
    if (budget >= 25000) {
      recommendedPackages.push({
        name: "Growth",
        price: `₹${Math.round(budget * 0.9).toLocaleString()}`,
        description: "Expanded reach and enhanced targeting for growing businesses",
        features: [
          "Premium ad placement",
          "Advanced audience targeting",
          "A/B testing capabilities",
          "Bi-weekly optimization",
          "Priority support"
        ],
        recommended: budget >= 50000 && budget < 100000,
        icon: <LineChart className="h-5 w-5 text-adtech-purple" />
      });
    }

    // Premium package for high budgets
    if (budget >= 100000) {
      recommendedPackages.push({
        name: "Enterprise",
        price: `₹${budget.toLocaleString()}`,
        description: "Comprehensive advertising solution for maximum impact",
        features: [
          "Premium ad placement across all platforms",
          "Custom audience targeting",
          "Advanced analytics dashboard",
          "Weekly optimization",
          "Dedicated account manager",
          "ROI guarantees"
        ],
        recommended: budget >= 100000,
        icon: <Target className="h-5 w-5 text-adtech-orange" />
      });
    }

    // Add a custom package based on specific industry and objective
    const industryFocus = data.industry === "retail" ? 
      "Retail-focused consumer targeting" : 
      data.industry === "technology" ? 
        "Tech-savvy audience segments" : 
        "Industry-specific audience targeting";
    
    const objectiveFocus = data.objective === "awareness" ? 
      "Brand awareness metrics" : 
      data.objective === "conversions" ? 
        "Conversion optimization" : 
        "Engagement tracking";

    recommendedPackages.push({
      name: "Custom",
      price: `₹${Math.round(budget * 0.85).toLocaleString()}`,
      description: `Tailored package for ${data.industry} industry with ${data.objective} focus`,
      features: [
        industryFocus,
        objectiveFocus,
        `${data.duration}-day campaign timeline`,
        "Personalized strategy session",
        "Custom reporting dashboard"
      ],
      recommended: true,
      icon: <Milestone className="h-5 w-5 text-adtech-green" />
    });

    return recommendedPackages;
  };

  // Submit handler
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success("Budget information submitted", {
      description: "Generating package recommendations...",
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      const recommendedPackages = getRecommendedPackages(data);
      setPackages(recommendedPackages);
      setShowPackages(true);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>
            Tell us about your advertising needs and budget
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Budget (₹)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="50000" 
                          className="pl-10" 
                          type="number" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="travel">Travel & Hospitality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Duration (Days): {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={7}
                        max={90}
                        step={1}
                        defaultValue={[parseInt(field.value)]}
                        onValueChange={(values) => field.onChange(values[0].toString())}
                        className="py-4"
                      />
                    </FormControl>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>7 days</span>
                      <span>30 days</span>
                      <span>90 days</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Objective</FormLabel>
                    <FormControl>
                      <Tabs 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="w-full"
                      >
                        <TabsList className="grid grid-cols-3 w-full">
                          <TabsTrigger value="awareness">Awareness</TabsTrigger>
                          <TabsTrigger value="engagement">Engagement</TabsTrigger>
                          <TabsTrigger value="conversions">Conversions</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showPackages && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Packages</CardTitle>
            <CardDescription>
              Based on your budget and requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {packages.map((pkg, index) => (
              <Card key={index} className={`overflow-hidden ${pkg.recommended ? 'border-2 border-adtech-blue' : ''}`}>
                {pkg.recommended && (
                  <div className="bg-adtech-blue text-white text-xs font-medium py-1 px-3 text-center">
                    RECOMMENDED
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {pkg.icon}
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <BadgePercent className="h-4 w-4 text-adtech-orange" />
                      <span className="text-sm text-muted-foreground">Best Value</span>
                    </div>
                  </div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-2xl font-bold mb-2">{pkg.price}</div>
                  <ul className="space-y-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-adtech-green/20 p-1 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-adtech-green" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={pkg.recommended ? "default" : "outline"}>
                    {pkg.recommended ? "Select This Package" : "View Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CampaignBudgetForm;
