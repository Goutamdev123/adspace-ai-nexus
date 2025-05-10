import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  Smartphone, 
  CameraIcon, 
  Layers3, 
  Cuboid, 
  CircleArrowLeft, 
  CircleArrowRight 
} from "lucide-react";

const ARWorkingDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState("process");
  const arViewerRef = useRef<HTMLDivElement>(null);
  const [showARObject, setShowARObject] = useState(false);
  
  const steps = [
    {
      title: "Scan Billboard",
      description: "Point your camera at any billboard with AR marker",
      icon: <CameraIcon className="h-5 w-5" />
    },
    {
      title: "AR Recognition",
      description: "The app recognizes the billboard and overlays AR content",
      icon: <Layers3 className="h-5 w-5" />
    },
    {
      title: "Interact",
      description: "Interact with 3D models, videos, and exclusive content",
      icon: <Cuboid className="h-5 w-5" />
    },
    {
      title: "Engage & Convert",
      description: "Participate in promotions, games, or direct purchases",
      icon: <Smartphone className="h-5 w-5" />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(steps.length - 1);
    }
  };

  const launchARDemo = () => {
    setShowARObject(true);
    toast({
      title: "AR Demo Activated",
      description: "Simulating AR experience in demo mode",
      duration: 3000,
    });

    // Reset after some time for demo purposes
    setTimeout(() => {
      setShowARObject(false);
    }, 10000);
  };

  return (
    <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-background/95 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Cuboid className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">AR Working Demo</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary text-xs">INTERACTIVE</Badge>
            </div>
            <CardDescription className="mt-1">
              See how AR transforms outdoor advertising into interactive experiences
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="process" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="w-full justify-start bg-muted/50 p-1">
            <TabsTrigger value="process" className="text-xs sm:text-sm">
              How It Works
            </TabsTrigger>
            <TabsTrigger value="demo" className="text-xs sm:text-sm">
              Interactive Demo
            </TabsTrigger>
            <TabsTrigger value="setup" className="text-xs sm:text-sm">
              Setup Guide
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-0 pt-6">
          <TabsContent value="process" className="mt-0 px-6">
            <div className="flex flex-col items-center">
              {/* Step Progress */}
              <div className="relative w-full max-w-md mb-8">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted transform -translate-y-1/2"></div>
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-primary transform -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
                <div className="relative flex justify-between">
                  {steps.map((step, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-center w-8 h-8 rounded-full z-10 transition-all duration-300 ${
                        index <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Current Step Details */}
              <div className="bg-muted/20 p-6 rounded-lg border border-border w-full max-w-md mb-6 min-h-[200px] flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  {steps[currentStep].icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
                <p className="text-muted-foreground">{steps[currentStep].description}</p>
                
                {currentStep === 0 && (
                  <div className="mt-4 animate-pulse">
                    <CameraIcon className="h-12 w-12 text-primary/60" />
                  </div>
                )}
                
                {currentStep === 1 && (
                  <div className="mt-4 relative">
                    <div className="h-16 w-24 border-2 border-primary/60 rounded-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551038247-3d9af20df552')] bg-cover bg-center opacity-70"></div>
                    </div>
                    <div className="absolute -right-4 -top-4 h-8 w-8 bg-primary rounded-full flex items-center justify-center animate-ping opacity-50">
                      <Layers3 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="relative h-16 w-16">
                      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary to-blue-500 animate-spin opacity-20" style={{ animationDuration: '8s' }}></div>
                      <Cuboid className="h-12 w-12 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="mt-4 flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                        <div className="h-8 w-8 bg-green-500/40 rounded-full flex items-center justify-center">
                          <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-green-500 font-medium">Engagement +126%</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center justify-between w-full max-w-md">
                <Button variant="outline" size="icon" onClick={handlePrev}>
                  <CircleArrowLeft className="h-4 w-4" />
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </div>
                
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <CircleArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-8 bg-muted/20 rounded-lg p-4 border border-border">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-primary" />
                Get Started with AR Advertising
              </h3>
              <p className="text-sm text-muted-foreground">
                Our platform transforms static billboards into interactive brand experiences. 
                Launch your first AR campaign in minutes.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="demo" className="mt-0 px-6">
            <div className="flex flex-col items-center">
              <div 
                ref={arViewerRef} 
                className="w-full h-[300px] md:h-[400px] rounded-lg border border-border relative overflow-hidden mb-6 bg-[url('https://images.unsplash.com/photo-1523365280197-dbf36c202d5c')] bg-cover bg-center"
              >
                <div className="absolute top-4 left-4 bg-background/30 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/10 z-10">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${showARObject ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                    <span className="text-xs font-medium text-white">{showARObject ? 'AR Active' : 'Ready to Scan'}</span>
                  </div>
                </div>
                
                {!showARObject && (
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="bg-background/40 backdrop-blur-md p-6 rounded-lg text-center max-w-xs">
                      <CameraIcon className="h-10 w-10 mx-auto mb-3 text-white" />
                      <h3 className="text-white text-lg font-bold mb-2">Point Camera Here</h3>
                      <p className="text-white/80 text-sm mb-4">Aim your device at a billboard to activate AR experience</p>
                      <Button onClick={launchARDemo} className="bg-primary hover:bg-primary/90">
                        Simulate AR Scan
                      </Button>
                    </div>
                  </div>
                )}
                
                {showARObject && (
                  <>
                    {/* AR overlay with 3D object */}
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* 3D Product */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-40 w-40 preserve-3d animate-slow-spin">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-blue-600/80 rounded-lg shadow-lg preserve-3d rotate-y-15 translate-z-8"></div>
                    </div>
                    
                    {/* Interactive elements */}
                    <div className="absolute bottom-20 right-10 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 animate-bounce-slow">
                      <div className="text-white text-sm font-medium">Tap to View Details</div>
                    </div>
                    
                    <div className="absolute top-20 left-10 bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 animate-fade-in">
                      <div className="text-white text-sm font-medium">Special Offer</div>
                      <div className="text-white text-xs">20% Off with code: AR20</div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="w-full flex flex-col md:flex-row gap-4 mb-6">
                <Button 
                  onClick={launchARDemo}
                  className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                  disabled={showARObject}
                >
                  <Smartphone className="h-4 w-4" />
                  {showARObject ? 'AR Experience Active' : 'Try AR Demo'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <CameraIcon className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">No App Required</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Works directly in mobile browsers, no app download needed
                  </p>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers3 className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Multi-layer Content</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Display 3D models, videos, promotions and interactive elements
                  </p>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <h3 className="font-medium">Works Everywhere</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Compatible with most iOS and Android devices with cameras
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="setup" className="mt-0 px-6">
            <div className="space-y-6">
              <div className="bg-muted/20 rounded-lg border border-border overflow-hidden">
                <div className="bg-muted/40 p-4 border-b border-border">
                  <h3 className="font-medium">Setting Up Your First AR Campaign</h3>
                </div>
                <div className="p-4">
                  <ol className="space-y-4 list-decimal list-inside">
                    <li className="text-sm">
                      <span className="font-medium">Upload Your Billboard Designs</span>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">
                        Upload high-resolution images of your billboard designs through our dashboard
                      </p>
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Add AR Content</span>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">
                        Upload 3D models, videos, promotional content, or use our templates
                      </p>
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Configure Triggers</span>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">
                        Set billboard recognition patterns or add QR codes for easier scanning
                      </p>
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Set Interactive Elements</span>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">
                        Add clickable areas, forms, calls-to-action, or gamification elements
                      </p>
                    </li>
                    <li className="text-sm">
                      <span className="font-medium">Launch & Monitor</span>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">
                        Publish your AR campaign and track engagement metrics in real-time
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <h3 className="font-medium mb-2">Technical Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span>Modern smartphone with camera (iOS 12+ / Android 8+)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span>Internet connection (4G/5G or WiFi)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span>Updated mobile browser (Chrome, Safari, Firefox)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span>Camera permissions enabled</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-muted/20 p-4 rounded-lg border border-border">
                  <h3 className="font-medium mb-2">Supported Content Types</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      </div>
                      <span>3D Models (.glb, .gltf, .obj)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Videos (.mp4, .webm)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Images (.png, .jpg, .svg)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      </div>
                      <span>Interactive HTML content</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Ready to Create Your First AR Campaign?</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Our team can help set up your first AR campaign in under 24 hours
                  </p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => toast({ 
                    title: "Demo Request Sent", 
                    description: "Our team will contact you shortly for a personalized demo", 
                    duration: 3000 
                  })}
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      {/* CSS for 3D effects */}
      <style jsx="true" global="true">{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-15 {
          transform: rotateY(15deg);
        }
        .translate-z-8 {
          transform: translateZ(8px);
        }
        @keyframes slow-spin {
          0% { transform: translate(-50%, -50%) rotateY(0deg); }
          100% { transform: translate(-50%, -50%) rotateY(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 8s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </Card>
  );
};

export default ARWorkingDemo;
