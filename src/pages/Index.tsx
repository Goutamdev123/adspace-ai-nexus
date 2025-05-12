
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ChartBar, 
  MapPin, 
  ChartPie, 
  Layers3,
  Camera,
  Globe,
  TrendingUp,
  Target,
  BarChart3,
  Boxes,
  Microscope,
  ArrowRight,
  Map,
  Building,
  Bus,
  Smartphone,
  PanelTop
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { toast } from "sonner";

const adTypes = [
  {
    id: "billboards",
    title: "Billboards",
    description: "Large format advertising with real-time analytics",
    image: "https://im.runware.ai/image/ws/0.5/ii/219a5961-3e2c-45a0-91a9-52c9e2c3fac1.webp",
    icon: <PanelTop />
  },
  {
    id: "walls",
    title: "Wall Media",
    description: "Painted and digital wall advertisements",
    image: "https://im.runware.ai/image/ws/0.5/ii/9922cbbc-b70d-4244-9dc3-a5b0caa04e78.webp",
    icon: <Building />
  },
  {
    id: "transit",
    title: "Transit Ads",
    description: "Mobile advertising with dynamic tracking",
    image: "https://im.runware.ai/image/ws/0.5/ii/8aa34f20-bd1d-46aa-bd36-56281da8fe61.webp",
    icon: <Bus />
  },
  {
    id: "drones",
    title: "Drone Advertising",
    description: "Innovative aerial advertising solutions",
    image: "https://im.runware.ai/image/ws/0.5/ii/7c8403b5-b842-4e3a-ac81-d80f491706bf.webp",
    icon: <Boxes />
  },
  {
    id: "digital",
    title: "Digital Billboards",
    description: "Dynamic LED displays with real-time updates",
    image: "https://im.runware.ai/image/ws/0.5/ii/3dc38624-fc6b-4d99-a316-006bc6f152dd.webp",
    icon: <Smartphone />
  }
];

const successStories = [
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

const features = [
  {
    title: "AI-Powered Analytics",
    description: "Advanced machine learning algorithms provide actionable insights",
    icon: <Microscope className="h-6 w-6 text-primary" />
  },
  {
    title: "Geospatial Mapping",
    description: "Precise location tracking for optimal ad placement",
    icon: <MapPin className="h-6 w-6 text-primary" />
  },
  {
    title: "Real-time Metrics",
    description: "Monitor performance with instant analytics dashboard",
    icon: <BarChart3 className="h-6 w-6 text-primary" />
  },
  {
    title: "AR Enhancement",
    description: "Augmented reality experiences increase engagement",
    icon: <Camera className="h-6 w-6 text-primary" />
  }
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);
  
  useEffect(() => {
    // Show a welcome toast when the page loads
    toast("Welcome to AdTech Platform", {
      description: "Revolutionizing outdoor advertising with AI and AR",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : (isSidebarOpen ? '16rem' : '4rem')
        }}
      >
        <DashboardHeader
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 overflow-auto">
          {/* Hero Section with 3D Effect */}
          <div className="relative overflow-hidden bg-gradient-to-br from-background to-muted min-h-[50vh] flex items-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background/80"></div>
              
              {/* 3D Floating Elements */}
              <div className="absolute top-[20%] right-[15%] w-32 h-32 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-xl animate-float"></div>
              <div className="absolute bottom-[25%] left-[10%] w-24 h-24 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
              <div className="absolute top-[40%] left-[25%] w-16 h-16 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-lg animate-float" style={{ animationDelay: "1s" }}></div>
              
              <div className="perspective-800">
                <div className="absolute top-1/4 right-1/4 transform-gpu preserve-3d rotate-12 animate-float">
                  <div className="w-40 h-40 bg-gradient-to-tr from-primary/40 to-transparent backdrop-blur-sm rounded-xl border border-white/10 shadow-lg transform-gpu rotate-y-12 translate-z-8"></div>
                </div>
                
                <div className="absolute bottom-1/3 right-1/3 transform-gpu preserve-3d -rotate-6 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="w-36 h-36 bg-gradient-to-tr from-secondary/40 to-transparent backdrop-blur-sm rounded-xl border border-white/10 shadow-lg transform-gpu -rotate-y-12 translate-z-8"></div>
                </div>
              </div>
            </div>
            
            <div className="container mx-auto px-6 py-16 relative z-10">
              <div className="max-w-3xl">
                <Badge className="mb-4 bg-primary/20 text-primary px-3 py-1 text-sm font-medium">
                  Next Generation Advertising Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                  Revolutionize Your <span className="text-primary">Outdoor Advertising</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                  AI-powered, measurable outdoor advertising platform with PAN-India coverage and hyper-local targeting capabilities.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/ar-working-demo">
                      Try AR Demo <Camera className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 mt-8">
                  <Badge variant="outline" className="bg-background/50">Pan-India Coverage</Badge>
                  <Badge variant="outline" className="bg-background/50">Hyper-Local Targeting</Badge>
                  <Badge variant="outline" className="bg-background/50">Real-time Analytics</Badge>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ad Types Section with 3D Cards */}
          <section className="py-16 px-6 bg-background">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-2 bg-secondary/20 text-secondary">Our Solutions</Badge>
                <h2 className="text-3xl font-bold mb-4">Outdoor Advertising Solutions</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive range of measurable outdoor advertising formats for businesses of all sizes.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adTypes.map((adType) => (
                  <div 
                    key={adType.id} 
                    className="group perspective-800"
                    onMouseEnter={() => setHoveredCard(adType.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className={`preserve-3d relative transition-transform duration-500 ${hoveredCard === adType.id ? 'transform-gpu -rotate-y-2 -rotate-x-2' : ''}`}>
                      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg h-full">
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={adType.image} 
                            alt={adType.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full border border-primary/20">
                            {adType.icon}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-bold mb-2">{adType.title}</h3>
                          <p className="text-muted-foreground mb-4">{adType.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-primary/20 text-primary border-primary/30">AI-Optimized</Badge>
                            <Badge className="bg-muted text-foreground border-muted-foreground/30">Measurable</Badge>
                          </div>
                          <Button variant="outline" className="w-full">Learn More</Button>
                        </div>
                      </div>
                      
                      {/* 3D shadow effect */}
                      <div className="absolute -bottom-2 left-2 right-2 h-[calc(100%-20px)] bg-black/20 rounded-xl blur-md -z-10 transition-transform duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button size="lg" asChild>
                  <Link to="/map-analytics">View All Ad Formats</Link>
                </Button>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-16 px-6 bg-gradient-to-br from-background via-primary/5 to-background">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-2 bg-accent/20 text-accent">Platform Features</Badge>
                <h2 className="text-3xl font-bold mb-4">Powered by Advanced Technology</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our platform combines AI, geospatial mapping, and augmented reality to deliver measurable outdoor advertising.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-gradient-glass border-white/10 backdrop-blur-md overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Success Stories Carousel */}
          <section className="py-16 px-6 bg-background">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-2 bg-primary/20 text-primary">Success Stories</Badge>
                <h2 className="text-3xl font-bold mb-4">Results That Speak For Themselves</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See how businesses are achieving measurable results with our advertising platform.
                </p>
              </div>
              
              <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                  {successStories.map((story, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-md h-full p-1">
                        <div className="h-48 overflow-hidden rounded-t-lg">
                          <img src={story.image} alt={story.brand} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold text-lg">{story.brand}</h4>
                          <p className="text-sm text-muted-foreground">{story.type}</p>
                          <p className="text-primary font-medium mt-2">{story.result}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 bg-background/80 backdrop-blur-sm" />
                <CarouselNext className="right-0 bg-background/80 backdrop-blur-sm" />
              </Carousel>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="gap-2">
                  View All Case Studies <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
          
          {/* Platform Benefits */}
          <section className="py-16 px-6 bg-muted/30">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-2 bg-secondary/20 text-secondary">Platform Benefits</Badge>
                  <h2 className="text-3xl font-bold mb-4">For Businesses of All Sizes</h2>
                  <p className="text-muted-foreground mb-6">
                    From small local shops to multinational corporations, our platform scales to meet your advertising needs.
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Globe className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Pan-India campaign management</span>
                        <p className="text-sm text-muted-foreground">Control all your advertising from a single dashboard</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Target className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Hyper-local targeting</span>
                        <p className="text-sm text-muted-foreground">Reach specific neighborhoods and demographics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Layers3 className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">End-to-end tracking</span>
                        <p className="text-sm text-muted-foreground">Real-time performance metrics and audience insights</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <TrendingUp className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">AI-powered recommendations</span>
                        <p className="text-sm text-muted-foreground">Maximize ROI with smart placement suggestions</p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="flex gap-3">
                    <Button>Start Your Campaign</Button>
                    <Button variant="outline" asChild>
                      <Link to="/business-solutions">Business Solutions</Link>
                    </Button>
                  </div>
                </div>
                
                <div className="perspective-800 hidden lg:block">
                  <div className="relative transform-gpu preserve-3d animate-float" style={{ animationDuration: "15s" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-2xl"></div>
                    <div className="relative bg-gradient-glass backdrop-blur-md border border-white/10 rounded-2xl p-8 transform-gpu -rotate-y-6">
                      <img 
                        src="https://im.runware.ai/image/ws/0.5/ii/e5474035-227c-4282-a665-2b33f5dced0d.webp" 
                        alt="Platform Overview" 
                        className="rounded-lg shadow-lg"
                      />
                      
                      <div className="absolute -right-12 -bottom-8 bg-card rounded-lg p-4 border border-border shadow-lg transform-gpu rotate-y-12 translate-z-12 w-48">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                            <ChartBar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Impressions</p>
                            <p className="font-bold">4.2M</p>
                          </div>
                        </div>
                        <div className="bg-muted/50 h-1.5 rounded-full mb-1">
                          <div className="bg-primary h-full rounded-full w-3/4"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                      </div>
                      
                      <div className="absolute -left-12 top-12 bg-card rounded-lg p-4 border border-border shadow-lg transform-gpu -rotate-y-12 translate-z-8 w-48">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center">
                            <Target className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Engagement</p>
                            <p className="font-bold">8.7%</p>
                          </div>
                        </div>
                        <div className="bg-muted/50 h-1.5 rounded-full mb-1">
                          <div className="bg-accent h-full rounded-full w-2/3"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">+2.3% from last month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 px-6 bg-gradient-to-br from-background via-primary/10 to-background relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Badge className="mb-4 bg-primary/20 text-primary">Get Started Today</Badge>
                <h2 className="text-4xl font-bold mb-6">Transform Your Advertising Strategy</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join businesses across India that are experiencing measurable results with our AI-enhanced platform.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg">Start Free Trial</Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/budget-campaign">Plan Your Budget</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="bg-muted/30 py-12 px-6 border-t border-border">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold mb-4">Solutions</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Billboards</Link></li>
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Wall Media</Link></li>
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Transit Ads</Link></li>
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Drone Advertising</Link></li>
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Digital Billboards</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/performance" className="text-muted-foreground hover:text-primary transition-colors">AI Analytics</Link></li>
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Geospatial Mapping</Link></li>
                    <li><Link to="/performance" className="text-muted-foreground hover:text-primary transition-colors">Real-time Metrics</Link></li>
                    <li><Link to="/ar-working-demo" className="text-muted-foreground hover:text-primary transition-colors">AR Experiences</Link></li>
                    <li><Link to="/business-solutions" className="text-muted-foreground hover:text-primary transition-colors">Business Solutions</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Company</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground">© 2025 AdTech Platform. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
