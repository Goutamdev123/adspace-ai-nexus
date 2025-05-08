
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const WallAnalyzer = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setImage(event.target.result);
        setResults(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis process
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalyzing(false);
            // Fake analysis results
            const suitability = Math.random() * 100;
            setResults({
              suitabilityScore: suitability.toFixed(1),
              estimatedTraffic: {
                daily: Math.round(2000 + Math.random() * 3000),
                weekly: Math.round(14000 + Math.random() * 21000)
              },
              potentialEarnings: {
                monthly: Math.round(60000 + Math.random() * 40000),
                yearly: Math.round(720000 + Math.random() * 480000)
              },
              recommendations: [
                "Wall has optimal visibility from main road",
                suitability > 70 ? "Excellent lighting conditions for nighttime ads" : "Consider adding lighting for nighttime visibility",
                "Surface texture suitable for standard adhesives",
                suitability > 50 ? "No obstructions detected" : "Partial obstruction detected - tree may block ~15% visibility"
              ]
            });
            
            toast({
              title: "Analysis Complete",
              description: "AI has successfully analyzed the uploaded wall image",
              duration: 3000
            });
          }, 500);
          return 100;
        }
        return next;
      });
    }, 120);
  };

  const resetAnalysis = () => {
    setImage(null);
    setResults(null);
    setAnalyzing(false);
  };

  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">AI Wall Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!image && (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">Upload an image of a wall to analyze its ad potential</p>
              <input
                type="file"
                id="wall-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button asChild>
                <label htmlFor="wall-image">Select Image</label>
              </Button>
            </div>
          )}

          {image && !analyzing && !results && (
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src={image} alt="Wall" className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetAnalysis}>
                  Cancel
                </Button>
                <Button className="bg-adtech-blue hover:bg-adtech-blue/90" onClick={startAnalysis}>
                  Analyze Wall
                </Button>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <img src={image!} alt="Wall" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
                  <p className="text-sm font-medium mb-2">AI analyzing image...</p>
                  <div className="w-48">
                    <Progress value={progress} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Detecting visibility, lighting, obstacles</p>
                </div>
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img src={image!} alt="Wall" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span>Suitability Score:</span>
                      <span className={`font-bold ${
                        Number(results.suitabilityScore) > 70 
                          ? "text-adtech-green" 
                          : Number(results.suitabilityScore) > 50 
                            ? "text-adtech-blue" 
                            : "text-adtech-orange"
                      }`}>{results.suitabilityScore}/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Daily Traffic</p>
                    <p className="text-lg font-bold">{results.estimatedTraffic.daily.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Potential Monthly Earnings</p>
                    <p className="text-lg font-bold">₹{results.potentialEarnings.monthly.toLocaleString()}</p>
                  </div>
                  
                  <Button size="sm" className="w-full bg-adtech-blue hover:bg-adtech-blue/90 mt-1">
                    Full Report
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium mb-2">AI Recommendations:</p>
                <ul className="text-xs space-y-1">
                  {results.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-adtech-blue mr-2"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={resetAnalysis}>
                  Analyze Another
                </Button>
                <Button size="sm">
                  Save to Portfolio
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WallAnalyzer;
