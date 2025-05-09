
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  Smartphone, 
  CameraIcon, 
  Layers3D, 
  RotateCcw, 
  ZoomIn, 
  ChevronRightCircle, 
  Orbit, 
  ImagePlus,
  MonitorSmartphone,
  BarChart3,
  ArrowUpRight 
} from "lucide-react";

const ARExperienceDemo = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [rotateModel, setRotateModel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const scene3DRef = useRef<HTMLDivElement>(null);
  
  // Billboard 3D model rotation animation
  useEffect(() => {
    let animationFrame: number;
    let rotation = 0;

    const animate = () => {
      if (rotateModel && scene3DRef.current) {
        rotation += 0.005;
        const billboard3D = scene3DRef.current.querySelector('.billboard-3d');
        if (billboard3D) {
          (billboard3D as HTMLElement).style.transform = `rotateY(${rotation}rad) scale(${zoomLevel})`;
        }
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (rotateModel) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [rotateModel, zoomLevel]);

  // Handle zoom changes
  const handleZoomChange = (direction: 'in' | 'out') => {
    let newZoom = zoomLevel;
    if (direction === 'in') {
      newZoom = Math.min(zoomLevel + 0.1, 1.5);
    } else {
      newZoom = Math.max(zoomLevel - 0.1, 0.7);
    }
    setZoomLevel(newZoom);
  };

  // Demo AR launch
  const launchARDemo = () => {
    toast({
      title: "AR Experience Launching",
      description: "Opening camera to start the augmented reality experience...",
      duration: 3000,
    });
  };

  return (
    <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-br from-background/95 to-background">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Layers3D className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">AR Outdoor Advertising Experience</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary text-xs">NEW</Badge>
            </div>
            <CardDescription className="mt-1">
              Transform static billboards into interactive 3D experiences with just a smartphone camera
            </CardDescription>
          </div>
          <Button size="sm" onClick={launchARDemo} className="bg-primary hover:bg-primary/90 text-white gap-1.5">
            <Smartphone className="h-4 w-4" />
            Try AR Demo
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="experience" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="w-full justify-start bg-muted/50 p-1">
            <TabsTrigger value="experience" className="text-xs sm:text-sm">
              AR Experience
            </TabsTrigger>
            <TabsTrigger value="mockups" className="text-xs sm:text-sm">
              Demo Mockups
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-xs sm:text-sm">
              Performance Stats
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-0 pt-6">
          <TabsContent value="experience" className="mt-0">
            <div className="px-6">
              <div className="bg-gradient-to-br from-blue-950/30 via-indigo-950/20 to-purple-950/30 rounded-lg overflow-hidden border border-indigo-500/20 mb-6">
                <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                  {/* 3D Scene */}
                  <div ref={scene3DRef} className="absolute inset-0 flex items-center justify-center perspective-800">
                    {/* Floating 3D Billboard */}
                    <div className="billboard-3d relative w-[280px] h-[180px] preserve-3d transition-transform duration-300" style={{ transform: `rotateY(0rad) scale(${zoomLevel})` }}>
                      {/* Front face - Billboard */}
                      <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-600 to-purple-600 rounded-md border-4 border-white/30 shadow-lg shadow-purple-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551038247-3d9af20df552')] bg-cover bg-center opacity-70"></div>
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                          <h3 className="text-2xl font-bold text-center mb-2 text-shadow">Experience AR Ads</h3>
                          <p className="text-sm text-center text-shadow">Scan with your phone to unlock 3D content</p>
                        </div>
                      </div>
                      
                      {/* Back face */}
                      <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-700 to-purple-700 rounded-md border-4 border-white/30 shadow-lg rotate-y-180 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460574283810-2aab119d8511')] bg-cover bg-center opacity-50"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                          <div className="text-center">
                            <div className="flex justify-center mb-2">
                              <CameraIcon className="h-8 w-8 text-white" />
                            </div>
                            <p className="text-sm">Scan QR code to continue</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 3D Effect Edges */}
                      <div className="absolute top-0 left-0 right-0 h-4 transform -translate-z-2 bg-white/20 origin-bottom skew-x-45"></div>
                      <div className="absolute bottom-0 top-0 right-0 w-4 transform translate-z-2 bg-white/10 origin-left skew-y-45"></div>
                      
                      {/* Floating AR elements */}
                      <div className="absolute -right-16 -top-10 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-80 blur-md animate-pulse"></div>
                      <div className="absolute -left-12 -bottom-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-70 blur-md animate-pulse" style={{animationDelay: "1s"}}></div>
                      
                      {/* AR Interface Elements */}
                      <div className="absolute -right-24 top-10 transform rotate-12">
                        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-md border border-white/30">
                          <div className="text-xs text-white font-medium">Engagement</div>
                          <div className="text-lg text-white font-bold">+126%</div>
                        </div>
                      </div>
                      
                      <div className="absolute -left-28 bottom-10 transform -rotate-6">
                        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-md border border-white/30">
                          <div className="text-xs text-white font-medium">Conversion</div>
                          <div className="text-lg text-white font-bold">+84%</div>
                        </div>
                      </div>
                      
                      {/* 3D connection lines */}
                      <div className="absolute h-[1px] w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent top-20 -right-16"></div>
                      <div className="absolute h-[1px] w-16 bg-gradient-to-r from-white/80 via-white/80 to-transparent bottom-16 -left-16"></div>
                    </div>
                    
                    {/* Background elements */}
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-1 opacity-20 pointer-events-none">
                      {Array.from({length: 48}).map((_, i) => (
                        <div key={i} className="border border-white/10 rounded-sm"></div>
                      ))}
                    </div>
                    
                    {/* Floating particles */}
                    {Array.from({length: 20}).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute rounded-full bg-white/30 animate-float"
                        style={{
                          width: `${Math.random() * 4 + 2}px`,
                          height: `${Math.random() * 4 + 2}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 5}s`,
                          animationDuration: `${Math.random() * 10 + 15}s`
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Controls */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      size="icon"
                      variant={rotateModel ? "default" : "outline"}
                      onClick={() => setRotateModel(!rotateModel)}
                      className="h-9 w-9 bg-background/80 backdrop-blur-sm"
                    >
                      <Orbit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleZoomChange('in')}
                      disabled={zoomLevel >= 1.5}
                      className="h-9 w-9 bg-background/80 backdrop-blur-sm"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleZoomChange('out')}
                      disabled={zoomLevel <= 0.7}
                      className="h-9 w-9 bg-background/80 backdrop-blur-sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* AR Experience Labels */}
                  <div className="absolute top-4 left-4 bg-background/30 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-medium text-white">AR Experience Active</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <CameraIcon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Scan & Interact</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Point your smartphone camera at any compatible billboard to unlock interactive 3D experiences and exclusive content.</p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <MonitorSmartphone className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Cross-Platform</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Works seamlessly on iOS and Android devices. No app download required - just scan and experience instantly.</p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Engagement Analytics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Track real-time analytics on user interactions, view durations, hotspots, and conversion metrics for each AR campaign.</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-2">
                  <ImagePlus className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Create Your Own AR Campaign</h4>
                    <p className="text-xs text-muted-foreground">Convert existing billboards into interactive AR experiences</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="text-xs gap-1">
                  Get Started <ArrowUpRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mockups" className="mt-0">
            <div className="px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* AR Mockup Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="w-[280px] aspect-[16/9] mb-3 bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-md backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="mb-2">
                          <Layers3D className="h-8 w-8 mx-auto" />
                        </div>
                        <div className="text-sm font-semibold">3D Product Demo</div>
                      </div>
                    </div>
                    
                    <div className="bg-background/20 backdrop-blur-lg p-3 rounded-lg border border-white/10">
                      <div className="text-sm font-medium text-white">Urban Billboard AR Transform</div>
                      <div className="text-xs text-white/80 mt-1">Users can see product features and specifications through their smartphone camera</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-primary text-white border-primary">Urban Setting</Badge>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1433832597046-4f10e10ac764')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* AR Mockup Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="flex gap-3 mb-3">
                      <div className="h-24 w-24 bg-gradient-to-br from-orange-500/70 to-pink-500/70 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <div className="text-white text-center text-xs">Tap to Interact</div>
                      </div>
                      
                      <div className="h-16 w-16 bg-gradient-to-br from-blue-500/70 to-cyan-500/70 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center mt-8">
                        <div className="text-white text-center text-[10px]">Buy Now</div>
                      </div>
                    </div>
                    
                    <div className="bg-background/20 backdrop-blur-lg p-3 rounded-lg border border-white/10">
                      <div className="text-sm font-medium text-white">Interactive 3D Elements</div>
                      <div className="text-xs text-white/80 mt-1">Floating interactive elements allow direct engagement with products</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-primary text-white border-primary">Corporate Setting</Badge>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* AR Mockup Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="mb-3">
                      <div className="bg-background/30 backdrop-blur-md p-2 rounded-md border border-white/20">
                        <div className="text-white text-xs mb-1 font-medium">AR Drone Camera View</div>
                        <div className="grid grid-cols-3 gap-1">
                          {Array.from({length: 3}).map((_, i) => (
                            <div key={i} className="aspect-video bg-black/50 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-background/20 backdrop-blur-lg p-3 rounded-lg border border-white/10">
                      <div className="text-sm font-medium text-white">Drone AR Integration</div>
                      <div className="text-xs text-white/80 mt-1">View drone footage and specs through AR overlay when pointing at billboard</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-primary text-white border-primary">Product Demo</Badge>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')] bg-cover bg-center"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* AR Mockup Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1 h-24 bg-gradient-to-r from-green-500/40 to-green-500/10 backdrop-blur-sm rounded-md border border-white/20 p-2">
                        <div className="text-xs text-white font-medium mb-1">Before Restoration</div>
                        <div className="h-14 bg-black/40 rounded-sm"></div>
                      </div>
                      
                      <div className="flex-1 h-24 bg-gradient-to-r from-blue-500/40 to-blue-500/10 backdrop-blur-sm rounded-md border border-white/20 p-2">
                        <div className="text-xs text-white font-medium mb-1">After Restoration</div>
                        <div className="h-14 bg-black/40 rounded-sm"></div>
                      </div>
                    </div>
                    
                    <div className="bg-background/20 backdrop-blur-lg p-3 rounded-lg border border-white/10">
                      <div className="text-sm font-medium text-white">Environmental AR Campaign</div>
                      <div className="text-xs text-white/80 mt-1">Show the impact of environmental initiatives through before/after AR visualizations</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-primary text-white border-primary">Environmental</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4 border border-border flex items-center justify-between">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    Create Custom AR Mockups
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload your billboard designs and generate AR mockups for client presentations
                  </p>
                </div>
                <Button size="sm" onClick={() => toast({ title: "AR Mockup Creator", description: "Feature coming soon. Stay tuned for updates!", duration: 3000 })}>
                  Try Now
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-0">
            <div className="px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Avg. Engagement Time</div>
                  <div className="text-2xl font-bold">3.2 min</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ChevronRightCircle className="h-3 w-3 mr-1 rotate-45" />
                    76% higher than static ads
                  </div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Interaction Rate</div>
                  <div className="text-2xl font-bold">42.8%</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ChevronRightCircle className="h-3 w-3 mr-1 rotate-45" />
                    +18.4% month-over-month
                  </div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Brand Recall</div>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ChevronRightCircle className="h-3 w-3 mr-1 rotate-45" />
                    2.4× traditional media
                  </div>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Conv. Rate</div>
                  <div className="text-2xl font-bold">18.6%</div>
                  <div className="text-xs text-green-500 flex items-center mt-1">
                    <ChevronRightCircle className="h-3 w-3 mr-1 rotate-45" />
                    3.2× industry average
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg p-6 border border-border mb-6 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-2">AR Advertising ROI Impact</h3>
                  <p className="text-sm text-muted-foreground mb-4">Comparing traditional outdoor advertising with AR-enhanced campaigns</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Traditional Advertising</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engagement Rate</span>
                          <span className="font-medium">5-7%</span>
                        </div>
                        <div className="w-full bg-muted/50 h-2 rounded-full">
                          <div className="bg-muted h-2 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Brand Recall</span>
                          <span className="font-medium">36%</span>
                        </div>
                        <div className="w-full bg-muted/50 h-2 rounded-full">
                          <div className="bg-muted h-2 rounded-full" style={{ width: "36%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Conversion Rate</span>
                          <span className="font-medium">5.8%</span>
                        </div>
                        <div className="w-full bg-muted/50 h-2 rounded-full">
                          <div className="bg-muted h-2 rounded-full" style={{ width: "22%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>ROI</span>
                          <span className="font-medium">1.3x</span>
                        </div>
                        <div className="w-full bg-muted/50 h-2 rounded-full">
                          <div className="bg-muted h-2 rounded-full" style={{ width: "26%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">AR-Enhanced Advertising</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engagement Rate</span>
                          <span className="font-medium">42.8%</span>
                        </div>
                        <div className="w-full bg-primary/20 h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "82%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Brand Recall</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="w-full bg-primary/20 h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Conversion Rate</span>
                          <span className="font-medium">18.6%</span>
                        </div>
                        <div className="w-full bg-primary/20 h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>ROI</span>
                          <span className="font-medium">4.2x</span>
                        </div>
                        <div className="w-full bg-primary/20 h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "84%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full translate-y-1/3 -translate-x-1/4"></div>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4 border border-border flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h3 className="font-semibold">Request Detailed ROI Report</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get a customized analysis of how AR advertising can boost your campaign performance
                  </p>
                </div>
                <Button 
                  className="whitespace-nowrap" 
                  onClick={() => toast({ 
                    title: "ROI Report Requested", 
                    description: "A sample ROI report will be sent to your email shortly.", 
                    duration: 3000 
                  })}
                >
                  Get Report
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      {/* Add custom CSS for 3D effects */}
      <style jsx global>{`
        .perspective-800 {
          perspective: 800px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .translate-z-2 {
          transform: translateZ(2px);
        }
        .-translate-z-2 {
          transform: translateZ(-2px);
        }
        .skew-x-45 {
          transform: skewX(45deg);
        }
        .skew-y-45 {
          transform: skewY(45deg);
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </Card>
  );
};

export default ARExperienceDemo;
