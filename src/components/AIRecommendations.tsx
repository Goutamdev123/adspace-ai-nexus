
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartPie, TrendingUp, Settings, Search } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Increase ad visibility in Mumbai Metro Area",
      description: "Based on traffic patterns, ads in this zone could achieve 35% higher visibility if deployed on north-facing walls.",
      impact: "High",
      impactColor: "bg-adtech-green text-background",
      confidence: 92,
      roi: 2.7,
      location: "Mumbai",
      applied: false
    },
    {
      id: 2,
      title: "Switch to eco-friendly materials in Bangalore",
      description: "Local demographic data shows 78% of target audience prefers brands with sustainable practices.",
      impact: "Medium",
      impactColor: "bg-adtech-blue text-background",
      confidence: 87,
      roi: 1.8,
      location: "Bangalore",
      applied: false
    },
    {
      id: 3,
      title: "Optimize Delhi budget allocation",
      description: "Current spend in south Delhi can be reduced by 18% with minimal impact on conversion rates.",
      impact: "Medium",
      impactColor: "bg-adtech-blue text-background",
      confidence: 81,
      roi: 2.1,
      location: "Delhi",
      applied: false
    }
  ]);

  const applyRecommendation = (id) => {
    setRecommendations(prev => prev.map(rec => 
      rec.id === id ? {...rec, applied: true} : rec
    ));
    
    toast({
      title: "Recommendation Applied",
      description: "Changes will reflect in your campaign shortly.",
      duration: 3000,
    });
  };

  const generateRecommendation = () => {
    const newRec = {
      id: recommendations.length + 1,
      title: "Expand to high-traffic Hyderabad IT corridor",
      description: "Tech professional concentration yields 42% higher engagement for digital product ads in this region.",
      impact: "High",
      impactColor: "bg-adtech-green text-background",
      confidence: 89,
      roi: 3.2,
      location: "Hyderabad",
      applied: false
    };
    
    setRecommendations([newRec, ...recommendations]);
    
    toast({
      title: "New Recommendation Generated",
      description: "Our AI found a promising new opportunity for your campaign.",
      duration: 3000,
    });
  };

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-adtech-purple">
            <ChartPie className="h-4 w-4" />
          </span>
          AI-Powered Recommendations
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs flex items-center gap-1"
          onClick={generateRecommendation}
        >
          <Settings className="h-3 w-3" />
          Generate New
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="p-3 mb-3 rounded-md bg-adtech-purple/10 border border-adtech-purple/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-adtech-purple" />
              <div>
                <h3 className="text-sm font-medium">ROI Booster</h3>
                <p className="text-xs text-muted-foreground">Our AI recommendations boost campaign ROI by an average of 27%</p>
              </div>
            </div>
            <Badge className="bg-adtech-purple text-white">Auto-optimizing</Badge>
          </div>
        </div>
        
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-none">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="p-3 rounded-md border border-border bg-card hover:bg-accent/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm flex items-center gap-1">
                  {rec.title}
                  <Badge className="ml-1 text-[10px] h-5" variant="outline">{rec.location}</Badge>
                </h4>
                <Badge className={rec.impactColor}>{rec.impact}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className="text-xs">AI Confidence:</div>
                  <div className="ml-2 w-[100px]">
                    <Progress value={rec.confidence} className="h-2" />
                  </div>
                  <div className="ml-2 text-xs font-medium">{rec.confidence}%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-xs font-medium text-adtech-green">Expected ROI: {rec.roi}x</div>
                </div>
                <Button 
                  variant={rec.applied ? "secondary" : "ghost"} 
                  size="sm" 
                  className="text-xs"
                  onClick={() => applyRecommendation(rec.id)}
                  disabled={rec.applied}
                >
                  {rec.applied ? "Applied" : "Apply"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            <Search className="h-3 w-3 inline mr-1" /> 
            AI analyzed 1,247 locations for optimal placement
          </div>
          <Button variant="link" size="sm" className="text-xs p-0 h-auto">
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
