
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Map, 
  Target, 
  TrendingUp, 
  Globe, 
  Layers, 
  Camera,
  Search,
  ArrowRight
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const adTypes = [
  {
    id: "billboards",
    title: "Billboards",
    description: "Large format advertising space on major highways and urban locations",
    image: "https://images.unsplash.com/photo-1506768205634-62e73d4f4458",
    aiGeneratedImage: "https://im.runware.ai/image/ws/0.5/ii/219a5961-3e2c-45a0-91a9-52c9e2c3fac1.webp",
    aiInsight: "AI predicts 32% higher engagement rates in areas with 15+ second viewing time",
    measurable: "Track impressions and engagement in real-time across 1200+ locations",
    arSupported: true
  },
  {
    id: "walls",
    title: "Wall Media",
    description: "Painted and digital advertisements on building walls in high-traffic urban areas",
    image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2",
    aiGeneratedImage: "https://im.runware.ai/image/ws/0.5/ii/9922cbbc-b70d-4244-9dc3-a5b0caa04e78.webp",
    aiInsight: "Our AI suggests wall ads in residential areas generate 28% more local business visits",
    measurable: "Heat mapping shows exact eyeball traffic with demographic breakdowns",
    arSupported: true
  },
  {
    id: "transit",
    title: "Transit Ads",
    description: "Mobile advertising on buses, taxis, trains and metro stations with wide coverage",
    image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313",
    aiGeneratedImage: "https://im.runware.ai/image/ws/0.5/ii/8aa34f20-bd1d-46aa-bd36-56281da8fe61.webp",
    aiInsight: "Transit ads on route 42 show 3.4x ROI compared to static locations per AI analysis",
    measurable: "GPS tracking monitors impression counts through dynamic route mapping",
    arSupported: true
  },
  {
    id: "drones",
    title: "Drone Advertising",
    description: "Innovative aerial advertising using programmed drone fleets at events and gatherings",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108",
    aiGeneratedImage: "https://im.runware.ai/image/ws/0.5/ii/7c8403b5-b842-4e3a-ac81-d80f491706bf.webp",
    aiInsight: "Drone formations at sunset hours show 47% higher recall rates based on AI tracking",
    measurable: "Altitude and formation analytics measure optimal viewing patterns",
    arSupported: false
  },
  {
    id: "digital",
    title: "Digital Billboards",
    description: "Dynamic LED displays allowing real-time content updates and scheduling",
    image: "https://images.unsplash.com/photo-1523296888195-03d9092335d6",
    aiGeneratedImage: "https://im.runware.ai/image/ws/0.5/ii/3dc38624-fc6b-4d99-a316-006bc6f152dd.webp",
    aiInsight: "AI-optimized content rotation increases engagement by 38% versus static scheduling",
    measurable: "Real-time analytics show exact impression counts and engagement metrics",
    arSupported: true
  }
];

const caseStudies = [
  {
    brand: "Urban Cafe",
    type: "Wall Media",
    result: "143% increase in foot traffic",
    image: "https://im.runware.ai/image/ws/0.5/ii/c8d78d55-f42e-4cdf-9af9-093a20dce4c7.webp"
  },
  {
    brand: "Fashion Outlet",
    type: "Digital Billboard",
    result: "87% boost in brand recognition",
    image: "https://im.runware.ai/image/ws/0.5/ii/e5474035-227c-4282-a665-2b33f5dced0d.webp"
  },
  {
    brand: "Tech Startup",
    type: "Drone Show",
    result: "218% increase in app downloads",
    image: "https://im.runware.ai/image/ws/0.5/ii/483bee5a-5a52-49b6-b831-354cbb3aeab8.webp"
  }
];

const OutdoorAdvertisements = () => {
  const [selectedAd, setSelectedAd] = useState(adTypes[0]);
  const [viewMode, setViewMode] = useState("overview");

  return (
    <Card className="border-0 shadow-md bg-gradient-to-br from-background/95 to-background overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Outdoor Advertising Solutions
            </CardTitle>
            <CardDescription>
              Trackable, measurable outdoor advertising for businesses of all sizes
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              <Globe className="h-3 w-3 mr-1" />
              Pan-India Coverage
            </Badge>
            <Badge variant="secondary">
              <Target className="h-3 w-3 mr-1" />
              Hyper-Local Targeting
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-muted/30 rounded-lg overflow-hidden relative min-h-[280px] md:min-h-[400px]">
              <img 
                src={selectedAd.aiGeneratedImage || selectedAd.image} 
                alt={selectedAd.title} 
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent">
                {viewMode === "ar" && selectedAd.arSupported && (
                  <div className="absolute top-4 right-4 bg-background/80 text-primary text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm border border-primary/20 animate-pulse">
                    <Camera className="h-3 w-3 inline-block mr-1" />
                    AR Preview Active
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="bg-background/80 backdrop-blur-md p-4 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{selectedAd.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedAd.description}</p>
                      
                      <div className="mt-2 flex gap-2">
                        <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                          <TrendingUp className="h-3 w-3 mr-1" /> 
                          AI-Optimized
                        </Badge>
                        
                        <Badge className="bg-muted text-foreground border-muted-foreground/30">
                          <Layers className="h-3 w-3 mr-1" />
                          Measurable
                        </Badge>
                        
                        {selectedAd.arSupported && (
                          <Badge className="bg-adtech-purple/20 text-adtech-purple border-adtech-purple/30 hover:bg-adtech-purple/30">
                            <Camera className="h-3 w-3 mr-1" />
                            AR-Enhanced
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant={viewMode === "overview" ? "default" : "outline"}
                        onClick={() => setViewMode("overview")}
                      >
                        Overview
                      </Button>
                      {selectedAd.arSupported && (
                        <Button 
                          size="sm" 
                          variant={viewMode === "ar" ? "default" : "outline"}
                          onClick={() => setViewMode("ar")}
                          className={viewMode === "ar" ? "bg-adtech-purple hover:bg-adtech-purple/90" : ""}
                        >
                          AR Preview
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {viewMode === "overview" && (
                    <div className="mt-3 bg-background/50 p-3 rounded-md text-sm border border-border/50">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <strong className="text-xs text-muted-foreground">AI INSIGHT</strong>
                          <p className="text-xs">{selectedAd.aiInsight}</p>
                        </div>
                        <div className="flex-1">
                          <strong className="text-xs text-muted-foreground">MEASUREMENT</strong>
                          <p className="text-xs">{selectedAd.measurable}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {viewMode === "ar" && selectedAd.arSupported && (
                    <div className="mt-3 bg-background/50 p-3 rounded-md border border-adtech-purple/30 text-sm">
                      <p className="text-xs flex items-center gap-1">
                        <Camera className="h-3 w-3 text-adtech-purple" />
                        <span className="text-adtech-purple font-medium">AR Experience Available</span> - 
                        Customers can scan this ad with their phone to unlock interactive content
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Success Stories with AI-Enhanced Outdoor Ads</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {caseStudies.map((study, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-muted/30 rounded-lg overflow-hidden border border-border">
                        <div className="h-32 overflow-hidden">
                          <img src={study.image} alt={study.brand} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm">{study.brand}</h4>
                          <p className="text-xs text-muted-foreground">{study.type}</p>
                          <p className="text-xs font-medium text-primary mt-2">{study.result}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 lg:-left-6 bg-background/80 backdrop-blur-sm" />
                <CarouselNext className="-right-4 lg:-right-6 bg-background/80 backdrop-blur-sm" />
              </Carousel>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                Select Ad Format
              </h3>
              
              <div className="space-y-2">
                {adTypes.map((adType) => (
                  <div
                    key={adType.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedAd.id === adType.id
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-muted border border-transparent"
                    }`}
                    onClick={() => setSelectedAd(adType)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{adType.title}</h4>
                      {adType.arSupported && (
                        <Badge variant="outline" className="text-[10px] h-5 bg-background/50">AR</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-medium text-sm mb-3">Platform Benefits</h3>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="h-3 w-3 text-primary" />
                  </div>
                  <span>Pan-India campaign management from a single dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="h-3 w-3 text-primary" />
                  </div>
                  <span>Hyper-local targeting to reach specific neighborhoods</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers className="h-3 w-3 text-primary" />
                  </div>
                  <span>End-to-end tracking and real-time performance metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <span>AI-powered recommendations to maximize ROI</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Camera className="h-3 w-3 text-primary" />
                  </div>
                  <span>AR capabilities for immersive brand experiences</span>
                </li>
              </ul>
            </div>
            
            <Button className="w-full">Explore All Ad Formats</Button>
            
            <div className="bg-gradient-to-r from-primary/20 to-adtech-purple/20 rounded-lg p-4 border border-primary/30">
              <h3 className="font-medium text-sm">Ready to scale your advertising?</h3>
              <p className="text-xs text-muted-foreground mt-1 mb-3">Our AI-enhanced platform delivers results for any business size</p>
              <Button size="sm" className="w-full">
                Start Now 
                <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="mb-3 sm:mb-0">
              <h3 className="text-sm font-medium">Scales With Your Business</h3>
              <p className="text-xs text-muted-foreground">From local shops to multinational brands - tailored solutions for every budget</p>
            </div>
            
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-background/50">Small Business</Badge>
              <Badge variant="outline" className="bg-background/50">Medium Enterprise</Badge>
              <Badge variant="outline" className="bg-background/50">Large Corporation</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutdoorAdvertisements;
