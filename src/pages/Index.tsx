
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
  Rocket,
  Sparkles,
  Lightbulb,
  Infinity,
  Badge as BadgeIcon,
  Handshake,
  Users,
  Earth,
  Award,
  Star,
  Link as LinkIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { toast } from "sonner";

const features = [
  {
    title: "AI-Powered Analytics",
    description: "Our deep learning algorithms analyze footfall, impressions, and engagement in real-time",
    icon: <Microscope className="h-6 w-6 text-primary" />,
    image: "https://im.runware.ai/image/ws/0.5/ii/219a5961-3e2c-45a0-91a9-52c9e2c3fac1.webp"
  },
  {
    title: "Geospatial Mapping",
    description: "Precision location targeting with demographic data layers for optimal ad placement",
    icon: <MapPin className="h-6 w-6 text-primary" />,
    image: "https://im.runware.ai/image/ws/0.5/ii/9922cbbc-b70d-4244-9dc3-a5b0caa04e78.webp"
  },
  {
    title: "Real-time Metrics",
    description: "Monitor campaign performance with instant analytics and audience insights",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    image: "https://im.runware.ai/image/ws/0.5/ii/8aa34f20-bd1d-46aa-bd36-56281da8fe61.webp"
  },
  {
    title: "AR Enhancement",
    description: "Drive engagement with interactive augmented reality experiences directly from ads",
    icon: <Camera className="h-6 w-6 text-primary" />,
    image: "https://im.runware.ai/image/ws/0.5/ii/7c8403b5-b842-4e3a-ac81-d80f491706bf.webp"
  }
];

const businessBenefits = [
  {
    title: "ROI Maximization",
    description: "Average 37% higher return on investment compared to traditional advertising methods",
    icon: <TrendingUp className="h-6 w-6 text-primary" />
  },
  {
    title: "Brand Awareness",
    description: "Increase brand recall by up to 43% through targeted outdoor engagement",
    icon: <Globe className="h-6 w-6 text-primary" />
  },
  {
    title: "Customer Insights",
    description: "Gather rich demographic and behavioral data to inform future campaigns",
    icon: <Users className="h-6 w-6 text-primary" />
  },
  {
    title: "Hyperlocal Targeting",
    description: "Reach specific neighborhoods and demographics with precision targeting",
    icon: <Target className="h-6 w-6 text-primary" />
  }
];

const techHighlights = [
  {
    title: "Computer Vision",
    description: "Advanced object recognition algorithms count impressions and analyze engagement patterns",
    icon: <Rocket className="h-6 w-6 text-accent" />
  },
  {
    title: "Predictive Analytics",
    description: "ML models forecast campaign performance based on historical and real-time data",
    icon: <Lightbulb className="h-6 w-6 text-accent" />
  },
  {
    title: "Neural Networks",
    description: "Deep learning systems optimize ad placement based on evolving traffic patterns",
    icon: <Infinity className="h-6 w-6 text-accent" />
  },
  {
    title: "Augmented Reality",
    description: "WebXR technology enables immersive interactive experiences from static ads",
    icon: <Sparkles className="h-6 w-6 text-accent" />
  }
];

const successMetrics = [
  { metric: "43%", description: "Average increase in brand recall" },
  { metric: "3.7x", description: "Higher engagement than traditional ads" },
  { metric: "27%", description: "Improvement in conversion rates" },
  { metric: "5.2M", description: "Daily impressions tracked across India" }
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("technology");
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
    toast("Welcome to India's First AI-Powered Outdoor Ad Platform", {
      description: "Revolutionizing outdoor advertising with advanced AI and AR technology",
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
          {/* AI & AR Technology Hero Section */}
          <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background"></div>
              
              {/* 3D Floating Tech Elements */}
              <div className="perspective-1000 absolute inset-0">
                {/* Neural Network Node Animation */}
                <div className="absolute top-[20%] left-[15%] animate-float" style={{ animationDuration: "20s" }}>
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-primary/10 backdrop-blur-md"></div>
                    <div className="absolute top-1/2 left-full w-[150px] h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                    <div className="absolute top-full left-1/2 w-0.5 h-[120px] bg-gradient-to-b from-primary/50 to-transparent"></div>
                    <div className="absolute top-1/2 right-full w-[100px] h-0.5 bg-gradient-to-l from-primary/50 to-transparent"></div>
                  </div>
                </div>
                
                {/* Data Visualization Cube */}
                <div className="absolute bottom-[30%] right-[20%] animate-float perspective-800" style={{ animationDuration: "15s", animationDelay: "2s" }}>
                  <div className="relative preserve-3d transform-gpu rotate-y-45 rotate-x-45">
                    <div className="absolute w-40 h-40 bg-secondary/10 backdrop-blur-md border border-secondary/20 transform-gpu translate-z-20"></div>
                    <div className="absolute w-40 h-40 bg-primary/10 backdrop-blur-md border border-primary/20 transform-gpu translate-z-[-20px]"></div>
                    <div className="absolute w-40 h-40 bg-secondary/10 backdrop-blur-md border border-secondary/20 transform-gpu translate-y-[-20px] rotate-x-90"></div>
                    <div className="absolute w-40 h-40 bg-primary/10 backdrop-blur-md border border-primary/20 transform-gpu translate-y-20 rotate-x-90"></div>
                    <div className="absolute w-40 h-40 bg-secondary/10 backdrop-blur-md border border-secondary/20 transform-gpu translate-x-20 rotate-y-90"></div>
                    <div className="absolute w-40 h-40 bg-primary/10 backdrop-blur-md border border-primary/20 transform-gpu translate-x-[-20px] rotate-y-90"></div>
                  </div>
                </div>
                
                {/* AR Visualization */}
                <div className="absolute top-[40%] right-[35%] animate-float" style={{ animationDuration: "18s", animationDelay: "1s" }}>
                  <div className="relative">
                    <div className="w-24 h-24 rounded-lg bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-lg border-2 border-accent/50 rotate-45"></div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-accent/50 to-transparent"></div>
                  </div>
                </div>
                
                {/* Data Flow Lines */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDuration: "5s" }}></div>
                  <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-pulse" style={{ animationDuration: "7s" }}></div>
                  <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent animate-pulse" style={{ animationDuration: "6s" }}></div>
                  <div className="absolute top-0 left-3/4 w-0.5 h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDuration: "8s" }}></div>
                </div>
              </div>
            </div>
            
            <div className="container mx-auto px-6 py-16 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <Badge variant="outline" className="mb-4 bg-primary/20 text-primary px-3 py-1 text-sm font-medium">
                  India's First AI-Powered Outdoor Advertising Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Where <span className="text-primary">Advanced Technology</span> Meets <span className="text-accent">Outdoor Advertising</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Our platform combines artificial intelligence, computer vision, and augmented reality to transform static advertising into measurable, interactive experiences with precise ROI tracking.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <Button size="lg" className="gap-2">
                    Explore Platform <Rocket className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/ar-working-demo">
                      Try AR Demo <Camera className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                {successMetrics.map((item, index) => (
                  <div key={index} className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{item.metric}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Technology & Features Tabs */}
          <section className="py-20 px-6 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-2 bg-accent/20 text-accent">Advanced Technology</Badge>
                <h2 className="text-3xl font-bold mb-4">Cutting-Edge AI & AR Platform</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover how our proprietary technology stack delivers measurable results for businesses of all sizes across India.
                </p>
              </div>
              
              <Tabs defaultValue="technology" className="w-full max-w-5xl mx-auto" onValueChange={setActiveTab}>
                <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 mb-8">
                  <TabsTrigger value="technology" className="text-base">Advanced Technology</TabsTrigger>
                  <TabsTrigger value="benefits" className="text-base">Business Benefits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="technology" className="space-y-8 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {techHighlights.map((tech, index) => (
                      <Card key={index} className="bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm border-border overflow-hidden">
                        <CardContent className="p-6">
                          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                            {tech.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{tech.title}</h3>
                          <p className="text-muted-foreground">{tech.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Real-Time Neural Processing</h3>
                        <p className="text-muted-foreground mb-6">
                          Our proprietary neural networks process 1.8 million data points every second to deliver accurate audience measurements and engagement analytics across all campaigns.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Sparkles className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">Computer vision for demographic analysis</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Sparkles className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">Edge computing for minimized latency</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Sparkles className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">Temporal pattern recognition for behavior analysis</span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative h-64 rounded-xl overflow-hidden perspective-800">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 relative animate-spin-slow">
                            <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/50"></div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full"></div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-accent rounded-full"></div>
                            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                          </div>
                          <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-ping-slow"></div>
                          <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-ping-slow" style={{ animationDelay: "1s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="benefits" className="space-y-8 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {businessBenefits.map((benefit, index) => (
                      <Card key={index} className="bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm border-border overflow-hidden">
                        <CardContent className="p-6">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            {benefit.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-muted/30 rounded-xl p-6 md:p-8 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="relative h-64 rounded-xl overflow-hidden perspective-800 order-2 md:order-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-primary/30 blur-2xl"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-xl border border-white/10 backdrop-blur-md bg-background/50 transform-gpu rotate-6"></div>
                            <div className="relative rounded-xl border border-white/20 backdrop-blur-md bg-background/70 p-6 z-10 transform-gpu -rotate-3">
                              <div className="h-4 w-20 bg-primary/20 rounded-full mb-4"></div>
                              <div className="space-y-2">
                                <div className="h-3 w-full bg-muted rounded-full"></div>
                                <div className="h-3 w-5/6 bg-muted rounded-full"></div>
                                <div className="h-3 w-4/6 bg-muted rounded-full"></div>
                              </div>
                              <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <div className="h-4 w-4 rounded-full bg-primary"></div>
                                </div>
                                <div className="h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                  <div className="h-4 w-4 rounded-full bg-accent"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="order-1 md:order-2">
                        <h3 className="text-2xl font-bold mb-4">For Businesses of All Sizes</h3>
                        <p className="text-muted-foreground mb-6">
                          From startups to enterprise corporations, our platform helps businesses across India achieve measurable results from their outdoor advertising investments.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Award className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">Scalable campaigns for any budget</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Award className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">End-to-end campaign management</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Award className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm">AI-optimized placement for maximum ROI</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          {/* Core Technology Features with 3D Cards */}
          <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-grid-pattern opacity-5 transform rotate-180"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-grid-pattern opacity-5"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-16">
                <Badge className="mb-2 bg-primary/20 text-primary">Core Features</Badge>
                <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI & AR</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our platform combines cutting-edge technologies to deliver measurable results and engaging experiences.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group perspective-800"
                    onMouseEnter={() => setHoveredCard(feature.title)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className={`preserve-3d relative transition-transform duration-500 ${hoveredCard === feature.title ? 'transform-gpu -rotate-y-2 -rotate-x-2' : ''}`}>
                      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg h-full">
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={feature.image} 
                            alt={feature.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full border border-primary/20">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground mb-4">{feature.description}</p>
                          <Button variant="outline" className="w-full" asChild>
                            <Link to={index === 3 ? "/ar-working-demo" : "/performance"}>
                              Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      {/* 3D shadow effect */}
                      <div className="absolute -bottom-2 left-2 right-2 h-[calc(100%-20px)] bg-black/20 rounded-xl blur-md -z-10 transition-transform duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* How It Works Section */}
          <section className="py-20 px-6 bg-background">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-2 bg-secondary/20 text-secondary">Platform Overview</Badge>
                <h2 className="text-3xl font-bold mb-4">How Our Platform Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A seamless process from campaign planning to performance analysis, powered by artificial intelligence.
                </p>
              </div>
              
              <div className="relative max-w-4xl mx-auto">
                {/* Connection Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50 transform -translate-x-1/2 hidden md:block"></div>
                
                {/* Step 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative">
                  <div className="bg-card rounded-xl p-6 border border-border order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-3">1. AI-Powered Planning</h3>
                    <p className="text-muted-foreground mb-4">
                      Our AI algorithms analyze traffic patterns, demographics, and historical performance data to recommend optimal ad placements for your target audience.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Demographic targeting options</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Location-based recommendations</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Budget optimization algorithms</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="relative order-1 md:order-2">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10 hidden md:flex">1</div>
                    <div className="h-full flex items-center justify-center">
                      <div className="perspective-800">
                        <div className="relative preserve-3d transform-gpu rotate-y-6 rotate-x-3">
                          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                            <img src="https://im.runware.ai/image/ws/0.5/ii/3dc38624-fc6b-4d99-a316-006bc6f152dd.webp" alt="AI Planning" className="rounded-lg shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 relative">
                  <div className="relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold z-10 hidden md:flex">2</div>
                    <div className="h-full flex items-center justify-center">
                      <div className="perspective-800">
                        <div className="relative preserve-3d transform-gpu -rotate-y-6 rotate-x-3">
                          <div className="bg-gradient-to-r from-secondary/20 to-accent/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                            <img src="https://im.runware.ai/image/ws/0.5/ii/e5474035-227c-4282-a665-2b33f5dced0d.webp" alt="Real-time Tracking" className="rounded-lg shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-bold mb-3">2. Real-time Performance Tracking</h3>
                    <p className="text-muted-foreground mb-4">
                      Advanced computer vision systems and IoT sensors capture real-time data on impressions, engagement, and audience demographics.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span>Live impression counting</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span>Engagement duration metrics</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span>Anonymous demographic analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  <div className="bg-card rounded-xl p-6 border border-border order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-3">3. AR Enhancement & Analytics</h3>
                    <p className="text-muted-foreground mb-4">
                      Boost engagement with interactive AR experiences accessed through QR codes, while our platform analyzes performance data for future optimization.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Interactive AR experiences</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>Comprehensive analytics dashboard</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <BadgeIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>AI-powered optimization suggestions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="relative order-1 md:order-2">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold z-10 hidden md:flex">3</div>
                    <div className="h-full flex items-center justify-center">
                      <div className="perspective-800">
                        <div className="relative preserve-3d transform-gpu rotate-y-6 rotate-x-3">
                          <div className="bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                            <img src="https://im.runware.ai/image/ws/0.5/ii/483bee5a-5a52-49b6-b831-354cbb3aeab8.webp" alt="AR Enhancement" className="rounded-lg shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/10 to-background relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Badge className="mb-4 bg-primary/20 text-primary">India's First AI-Powered Platform</Badge>
                <h2 className="text-4xl font-bold mb-6">Transform Your Advertising Strategy</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join businesses across India that are experiencing measurable results with our AI-enhanced outdoor advertising platform.
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
                  <h3 className="font-bold mb-4">Platform</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">AI Analytics</Link></li>
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Geospatial Mapping</Link></li>
                    <li><Link to="/ar-working-demo" className="text-muted-foreground hover:text-primary transition-colors">AR Technology</Link></li>
                    <li><Link to="/performance" className="text-muted-foreground hover:text-primary transition-colors">Real-time Tracking</Link></li>
                    <li><Link to="/forecasts" className="text-muted-foreground hover:text-primary transition-colors">Predictive Analytics</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Business</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/business-solutions" className="text-muted-foreground hover:text-primary transition-colors">ROI Tracking</Link></li>
                    <li><Link to="/revenue" className="text-muted-foreground hover:text-primary transition-colors">Revenue Metrics</Link></li>
                    <li><Link to="/budget-campaign" className="text-muted-foreground hover:text-primary transition-colors">Campaign Planning</Link></li>
                    <li><Link to="/business-solutions" className="text-muted-foreground hover:text-primary transition-colors">Brand Awareness</Link></li>
                    <li><Link to="/business-solutions" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
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
                <p className="text-sm text-muted-foreground">© 2025 AdTech Platform. India's First AI-Powered Outdoor Advertising Platform. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
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
