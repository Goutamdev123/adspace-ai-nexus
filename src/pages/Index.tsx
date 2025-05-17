import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import Robot3D from "@/components/Robot3D";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import { 
  Microscope, 
  MapPin, 
  BarChart3, 
  Camera, 
  TrendingUp,
  Globe,
  Users,
  Target,
  Eye,
  Wifi,
  Smartphone as SmartphoneIcon,
  Satellite,
  PieChart,
  Activity,
  LineChart,
  Cpu,
  Zap,
  Database,
  Glasses,
  Rocket,
  Lightbulb,
  Infinity as InfinityIcon,
  Sparkles,
  Check,
  Building,
  Ban as BadgeIcon
} from "lucide-react";
import TrafficHeatmap from "@/components/TrafficHeatmap";
import IndiaTrafficMap from "@/components/IndiaTrafficMap";
import TrackingTechnologies from "@/components/TrackingTechnologies";


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

const trackingTechnologies = [
  {
    title: "Computer Vision",
    description: "Advanced AI algorithms that analyze camera feeds to count viewers, measure engagement time, and determine demographic profiles with 97.3% accuracy",
    icon: <Eye className="h-6 w-6 text-accent" />
  },
  {
    title: "IoT Sensors Network",
    description: "Over 5,000 dedicated sensors across India measuring foot traffic, vehicle counts, dwell time, and environmental conditions with real-time data transmission",
    icon: <Wifi className="h-6 w-6 text-accent" />
  },
  {
    title: "Mobile Device Recognition",
    description: "Privacy-compliant Bluetooth and WiFi tracking providing movement patterns, frequency of exposure, and cross-location behavior insights",
    icon: <SmartphoneIcon className="h-6 w-6 text-accent" />
  },
  {
    title: "Satellite & GIS Integration",
    description: "High-resolution location data combined with demographic overlays for optimal placement decisions and traffic flow analysis",
    icon: <Satellite className="h-6 w-6 text-accent" />
  }
];

const dataAccuracyMetrics = [
  { metric: "97.3%", description: "Audience counting accuracy", icon: <Users className="h-4 w-4 text-primary" /> },
  { metric: "±2.1%", description: "Demographic classification margin", icon: <PieChart className="h-4 w-4 text-primary" /> },
  { metric: "99.5%", description: "Data transmission reliability", icon: <Activity className="h-4 w-4 text-primary" /> },
  { metric: "86.4%", description: "Engagement prediction accuracy", icon: <LineChart className="h-4 w-4 text-primary" /> }
];

const advancedTechnologies = [
  {
    name: "Neural Networks",
    description: "Our proprietary deep learning models process visual data to identify and classify audiences in real-time",
    icon: <Cpu className="h-8 w-8 text-primary" />
  },
  {
    name: "Edge Computing",
    description: "On-device processing minimizes latency and ensures data privacy by analyzing information locally before secure transmission",
    icon: <Zap className="h-8 w-8 text-accent" />
  },
  {
    name: "Big Data Platform",
    description: "Petabyte-scale analytics infrastructure processes 5.7 million data points daily from across India",
    icon: <Database className="h-8 w-8 text-secondary" />
  },
  {
    name: "AR WebXR Technology",
    description: "Browser-based augmented reality experiences that require no app downloads for instant engagement",
    icon: <Glasses className="h-8 w-8 text-primary" />
  },
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
    icon: <InfinityIcon className="h-6 w-6 text-accent" />
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
    toast({
      title: "Welcome to India's First AI-Powered Outdoor Ad Platform",
      description: "Revolutionizing outdoor advertising with advanced AI and AR technology",
    });
  }, []);

  
 return (
  <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background video fixed behind everything */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
      >
        <source src="/074a3d5b-2179-4749-b1d5-564c72b95ef1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for better contrast */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-10" />
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
          <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background/90 via-primary/5 to-background/90 overflow-hidden">
                     
                       
            <div className="container mx-auto px-6 py-16 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <Badge variant="outline" className="mb-4 bg-primary/20 text-primary px-3 py-1 text-sm font-medium">
                  India's First AI-Powered Outdoor Advertising Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Making <span className="text-primary">Outdoor Advertising</span> as Measurable as <span className="text-accent">Digital Marketing</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Our advanced AI and AR technologies bring digital-grade tracking, analytics, and engagement to traditional outdoor media, providing businesses with precise ROI measurements and audience insights.
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
          
          {/* Tracking Technologies Section */}
          <section className="py-20 px-6 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-2 bg-accent/20 text-accent">Industry-First Tracking</Badge>
                <h2 className="text-3xl font-bold mb-4">End-to-End Outdoor Ad Measurement</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Track every impression, engagement, and conversion with the same precision you expect from digital marketing platforms.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Left Side: Tracking Technologies */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4">How We Track Outdoor Advertising</h3>
                  
                  {trackingTechnologies.map((tech, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-card/30 rounded-lg border border-border/50">
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        {tech.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{tech.title}</h4>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Right Side: Data Accuracy & Visualization */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Data Collection Accuracy</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Our multi-layered data verification system ensures industry-leading accuracy across all metrics and dimensions.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {dataAccuracyMetrics.map((metric, index) => (
                        <div key={index} className="bg-muted/30 rounded-lg p-4 border border-border/50 flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            {metric.icon}
                          </div>
                          <div className="text-2xl font-bold">{metric.metric}</div>
                          <div className="text-xs text-muted-foreground text-center">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Live Heatmap */}
                  <TrafficHeatmap />
                </div>
              </div>
              
              {/* India Map with live traffic data visualization */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-center">Live Traffic Data Across India</h3>
                <IndiaTrafficMap />
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Real-time monitoring of 5,000+ locations across India with 97.3% data accuracy.
                  <br />Hover over cities to see detailed metrics.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-card border border-border rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
                    
                    <h3 className="text-2xl font-bold mb-4">Digital-Grade Campaign Metrics</h3>
                    <p className="text-muted-foreground mb-6">
                      Our platform provides all the metrics you expect from digital marketing, applied to your outdoor advertising campaigns.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Eye className="h-3 w-3 text-primary" />
                          </div>
                          <h4 className="font-medium">Impressions</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Accurate count of unique viewers exposed to your outdoor ads</p>
                      </div>
                      
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-3 w-3 text-primary" />
                          </div>
                          <h4 className="font-medium">Demographics</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Age, gender, and socioeconomic profiles of your audience</p>
                      </div>
                      
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Activity className="h-3 w-3 text-primary" />
                          </div>
                          <h4 className="font-medium">Engagement</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Dwell time, attention metrics, and interaction rates</p>
                      </div>
                      
                      <div className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <TrendingUp className="h-3 w-3 text-primary" />
                          </div>
                          <h4 className="font-medium">Conversions</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">Store visits, QR code scans, and AR experience activations</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 lg:order-2">
                  <TrackingTechnologies />
                </div>
              </div>
            </div>
          </section>
          
          {/* Technology Stack Section */}
          <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-grid-pattern opacity-5 transform rotate-180"></div>
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-grid-pattern opacity-5"></div>
            </div>
            
           <div className="container mx-auto relative z-10">
    <div className="text-center mb-12">
      <Badge className="mb-2 bg-primary/20 text-primary">Advanced Technology Stack</Badge>
      <h2 className="text-3xl font-bold mb-4">The Science Behind Our Platform</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Leveraging cutting-edge technologies to bring digital-grade analytics to outdoor advertising.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {advancedTechnologies.map((tech, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 h-full">
              <div className="flex items-center justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                  {tech.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{tech.name}</h3>
              <p className="text-sm text-muted-foreground text-center">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Robot Section */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md h-[400px]">
          <Robot3D />
        </div>
      </div>
    </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {advancedTechnologies.map((tech, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-6 h-full">
                    <div className="flex items-center justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center">
                        {tech.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">{tech.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Advanced Data Processing</h3>
                    <p className="text-muted-foreground mb-6">
                      Our proprietary data processing pipeline combines multiple data sources to create comprehensive insights about your advertising performance.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">Real-time Processing</h4>
                          <p className="text-sm text-muted-foreground">Data is processed in real-time with less than 200ms latency</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">Multi-source Integration</h4>
                          <p className="text-sm text-muted-foreground">Camera feeds, IoT sensors, mobile data, and third-party data sources</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">Privacy-first Approach</h4>
                          <p className="text-sm text-muted-foreground">All data is anonymized and aggregated with strict privacy controls</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">Machine Learning Models</h4>
                          <p className="text-sm text-muted-foreground">Continuously improving algorithms for greater accuracy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-8 flex items-center justify-center">
                    <div className="relative perspective-800">
                      <div className="preserve-3d transform-gpu rotate-y-10 rotate-x-5 w-full max-w-md">
                        <div className="bg-gradient-to-br from-card to-background border border-border rounded-lg p-4 shadow-lg">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold">Data Processing Pipeline</h4>
                            <Badge variant="outline">Live</Badge>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary w-[85%]"></div>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2">
                              <div className="bg-primary/10 p-2 rounded text-xs text-center">Input</div>
                              <div className="bg-secondary/10 p-2 rounded text-xs text-center">Process</div>
                              <div className="bg-accent/10 p-2 rounded text-xs text-center">Analyze</div>
                              <div className="bg-primary/10 p-2 rounded text-xs text-center">Output</div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-muted rounded p-2">
                                <div className="text-xs font-medium">Processing Units</div>
                                <div className="text-lg font-bold text-primary">1,249</div>
                              </div>
                              <div className="bg-muted rounded p-2">
                                <div className="text-xs font-medium">Data Throughput</div>
                                <div className="text-lg font-bold text-accent">42 TB/day</div>
                              </div>
                            </div>
                            
                            <div className="h-16 bg-muted/50 rounded-lg p-2">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Camera Feeds</span>
                                <span>97.3%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-primary w-[97%]"></div>
                              </div>
                              
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>IoT Sensors</span>
                                <span>99.5%</span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-accent w-[99%]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 3D shadow effect */}
                      <div className="absolute -bottom-2 left-4 right-4 h-[calc(100%-20px)] bg-black/20 rounded-xl blur-md -z-10 transform rotate-x-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Business Benefits Section */}
          <section className="py-20 px-6 bg-background relative overflow-hidden">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-2 bg-secondary/20 text-secondary">Business Impact</Badge>
                <h2 className="text-3xl font-bold mb-4">Transform Your Outdoor Advertising Strategy</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join businesses across India that are experiencing measurable results with our AI-enhanced outdoor advertising platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {businessBenefits.map((benefit, index) => (
                  <div key={index} className="bg-gradient-to-br from-background to-muted/30 backdrop-blur-sm border-border border overflow-hidden rounded-xl">
                    <div className="p-6">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <Badge variant="outline" className="mb-4">FOR ALL BUSINESSES</Badge>
                    <h3 className="text-2xl font-bold mb-4">From Local Businesses to Enterprise Brands</h3>
                    <p className="text-muted-foreground mb-6">
                      Our platform scales to meet the needs of businesses of all sizes, providing actionable insights regardless of your budget or campaign scope.
                    </p>
                    
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center shrink-0">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">Local Businesses</h4>
                          <p className="text-sm text-muted-foreground">Target neighborhoods with precision and measure foot traffic to your location from nearby advertising.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center shrink-0">
                          <Rocket className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">Growing Startups</h4>
                          <p className="text-sm text-muted-foreground">Build brand awareness efficiently with data-driven placement and measurable results for investors.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center shrink-0">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">Enterprise Brands</h4>
                          <p className="text-sm text-muted-foreground">Coordinate multi-city campaigns with consistent measurement and integration with your existing marketing stack.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-8">
                    <h3 className="text-xl font-bold mb-4">From Outdoor to Digital Tracking</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Compare the traditional outdoor advertising approach with our AI-powered analytics platform.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-3">Traditional Outdoor Advertising</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                              <BadgeIcon className="h-3 w-3 text-destructive" />
                            </div>
                            <span className="text-xs text-muted-foreground">Estimated impressions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                              <BadgeIcon className="h-3 w-3 text-destructive" />
                            </div>
                            <span className="text-xs text-muted-foreground">No demographic data</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                              <BadgeIcon className="h-3 w-3 text-destructive" />
                            </div>
                            <span className="text-xs text-muted-foreground">Unknown engagement rates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                              <BadgeIcon className="h-3 w-3 text-destructive" />
                            </div>
                            <span className="text-xs text-muted-foreground">No conversion tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                              <BadgeIcon className="h-3 w-3 text-destructive" />
                            </div>
                            <span className="text-xs text-muted-foreground">Limited optimization options</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                        <h4 className="font-medium text-sm mb-3 text-primary">Our AI-Powered Platform</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs">Precise impression counts</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs">Detailed demographic insights</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs">Engagement time measurement</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs">QR & AR conversion tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-xs">AI-powered campaign optimization</span>
                          </li>
                        </ul>
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
                <Badge className="mb-4 bg-primary/20 text-primary">India's First AI-Powered Outdoor Ad Platform</Badge>
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
