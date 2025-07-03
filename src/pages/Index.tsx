import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

const successMetrics = [
  { metric: "43%", description: "Average increase in brand recall" },
  { metric: "3.7x", description: "Higher engagement than traditional ads" },
  { metric: "27%", description: "Improvement in conversion rates" },
  { metric: "5.2M", description: "Daily impressions tracked across India" }
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

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    const handleVideoPlay = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Video play prevented:", e));
      }
    };

    if (isMobile) {
      document.addEventListener('click', handleVideoPlay, { once: true });
      setIsSidebarOpen(false);
    }

    toast({
      title: "Welcome to AdTech Platform!",
      description: "Thank you for being here.",
    });

    return () => {
      if (isMobile) {
        document.removeEventListener('click', handleVideoPlay);
      }
    };
  }, [isMobile]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Video background only for hero section */}
      <div className="relative">
        <div className="fixed inset-0 z-0">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/074a3d5b-2179-4749-b1d5-564c72b95ef1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
        </div>

        <DashboardSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        <div
          className="flex-1 flex flex-col transition-all duration-300 relative z-10"
          style={{
            marginLeft: isMobile ? 0 : (isSidebarOpen ? '16rem' : '4rem')
          }}
        >
          <DashboardHeader
            toggleSidebar={toggleSidebar}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />

          {/* Hero Section with video background */}
          <section className="relative min-h-screen flex items-center">
            <div className="container mx-auto px-6 py-16 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <Badge variant="outline" className="mb-4 bg-primary/20 text-primary px-3 py-1 text-sm font-medium">
                  India's First AI-Powered Outdoor Advertising Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Making <span className="text-primary">Outdoor Advertising</span> as Measurable as <span className="text-accent">Digital Marketing</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Our advanced AI and AR technologies bring digital-grade tracking, analytics, and engagement to traditional outdoor media.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <Button size="lg" className="gap-2">
                    Explore Platform <Rocket className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/ar-working-demo" className="flex items-center">
                      Try AR Demo <Camera className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                {successMetrics.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-xl p-4 text-center transition-all hover:border-primary/50"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{item.metric}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Rest of content without video background */}
      <div
        className="flex-1 flex flex-col transition-all duration-300 relative z-10 bg-background"
        style={{
          marginLeft: isMobile ? 0 : (isSidebarOpen ? '16rem' : '4rem')
        }}
      >
        <main className="flex-1">
          {/* Tracking Technologies Section */}
          <section className="py-20 px-6 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-2 bg-accent/20 text-accent">Industry-First Tracking</Badge>
                <h2 className="text-3xl font-bold mb-4">End-to-End Outdoor Ad Measurement</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Track every impression, engagement, and conversion with digital precision.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {/* Left Side: Tracking Technologies */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4">How We Track Outdoor Advertising</h3>
                  
                  {trackingTechnologies.map((tech, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-4 bg-card/50 rounded-lg border border-border/30 transition-all hover:border-accent/50"
                    >
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
                
                {/* Right Side: Data Accuracy */}
                <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Data Collection Accuracy</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Our multi-layered verification ensures industry-leading accuracy.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {dataAccuracyMetrics.map((metric, index) => (
                        <div 
                          key={index} 
                          className="bg-muted/20 rounded-lg p-4 border border-border/30 flex flex-col items-center transition-all hover:border-primary/30"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            {metric.icon}
                          </div>
                          <div className="text-2xl font-bold">{metric.metric}</div>
                          <div className="text-xs text-muted-foreground text-center">{metric.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <TrafficHeatmap />
                </div>
              </div>
              
              {/* India Map */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-center">Live Traffic Data Across India</h3>
                <IndiaTrafficMap />
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Real-time monitoring of 5,000+ locations across India
                </p>
              </div>
              
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-card border border-border/30 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
                    
                    <h3 className="text-2xl font-bold mb-4">Digital-Grade Campaign Metrics</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { 
                          icon: <Eye className="h-3 w-3 text-primary" />,
                          title: "Impressions",
                          desc: "Accurate count of unique viewers" 
                        },
                        { 
                          icon: <Users className="h-3 w-3 text-primary" />,
                          title: "Demographics",
                          desc: "Audience profiles" 
                        },
                        { 
                          icon: <Activity className="h-3 w-3 text-primary" />,
                          title: "Engagement",
                          desc: "Dwell time and interaction rates" 
                        },
                        { 
                          icon: <TrendingUp className="h-3 w-3 text-primary" />,
                          title: "Conversions",
                          desc: "QR scans and AR activations" 
                        }
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className="p-4 bg-muted/10 rounded-lg border border-border/20 transition-colors hover:bg-muted/20"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                              {item.icon}
                            </div>
                            <h4 className="font-medium">{item.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <TrackingTechnologies />
              </div>
            </div>
          </section>
          
          {/* Technology Stack Section */}
          <section className="py-20 px-6 bg-gradient-to-br from-background/90 via-primary/5 to-background/90 relative">
            <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>
            
            <div className="container mx-auto relative z-10">
              <div className="text-center mb-12">
                <Badge className="mb-2 bg-primary/20 text-primary">Advanced Technology Stack</Badge>
                <h2 className="text-3xl font-bold mb-4">The Science Behind Our Platform</h2>
              </div>

              {/* 3D Robot */}
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-md h-[400px]">
                  <Robot3D />
                </div>
              </div>

              {/* Technology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {advancedTechnologies.map((tech, index) => (
                  <div 
                    key={index} 
                    className="bg-card border border-border/30 rounded-xl p-6 h-full transition-all hover:border-primary/50"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
                        {tech.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground text-center">{tech.description}</p>
                  </div>
                ))}
              </div>

              {/* Data Processing */}
              <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Advanced Data Processing</h3>
                    
                    <div className="space-y-4">
                      {[
                        "Real-time Processing",
                        "Multi-source Integration",
                        "Privacy-first Approach",
                        "Machine Learning Models"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visualization */}
                  <div className="bg-muted/10 p-8 flex items-center justify-center">
                    <div className="w-full max-w-md bg-gradient-to-br from-card to-background border border-border/30 rounded-lg p-4 shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold">Data Processing Pipeline</h4>
                        <Badge variant="outline">Live</Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[85%]"></div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {["Input", "Process", "Analyze", "Output"].map((step, i) => (
                            <div 
                              key={i} 
                              className="p-2 rounded text-xs text-center bg-muted/20 border border-border/20"
                            >
                              {step}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-muted/10 rounded p-2 border border-border/20">
                            <div className="text-xs font-medium">Processing Units</div>
                            <div className="text-lg font-bold text-primary">1,249</div>
                          </div>
                          <div className="bg-muted/10 rounded p-2 border border-border/20">
                            <div className="text-xs font-medium">Data Throughput</div>
                            <div className="text-lg font-bold text-accent">42 TB/day</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Business Benefits Section */}
          <section className="py-20 px-6 bg-background/90 backdrop-blur-sm relative">
            <div className="container mx-auto">
              <div className="text-center mb-16">
                <Badge className="mb-2 bg-secondary/20 text-secondary">Business Impact</Badge>
                <h2 className="text-3xl font-bold mb-4">Transform Your Advertising Strategy</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {businessBenefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm border border-border/30 overflow-hidden rounded-xl transition-all hover:border-primary/50"
                  >
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
              
              {/* Comparison Section */}
              <div className="bg-card border border-border/30 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">From Local Businesses to Enterprise Brands</h3>
                    
                    <div className="space-y-5">
                      {[
                        {
                          icon: <Building className="h-5 w-5 text-primary" />,
                          title: "Local Businesses",
                          desc: "Target neighborhoods with precision"
                        },
                        {
                          icon: <Rocket className="h-5 w-5 text-primary" />,
                          title: "Growing Startups",
                          desc: "Build brand awareness efficiently"
                        },
                        {
                          icon: <Globe className="h-5 w-5 text-primary" />,
                          title: "Enterprise Brands",
                          desc: "Coordinate multi-city campaigns"
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted/20 flex items-center justify-center shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted/10 p-8">
                    <h3 className="text-xl font-bold mb-4">Traditional vs. AI-Powered</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/20 rounded-lg p-4 border border-border/30">
                        <h4 className="font-medium text-sm mb-3">Traditional Outdoor</h4>
                        <ul className="space-y-2">
                          {[
                            "Estimated impressions",
                            "No demographic data",
                            "Unknown engagement",
                            "No conversion tracking"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                                <BadgeIcon className="h-3 w-3 text-destructive" />
                              </div>
                              <span className="text-xs text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                        <h4 className="font-medium text-sm mb-3 text-primary">AI-Powered Platform</h4>
                        <ul className="space-y-2">
                          {[
                            "Precise impression counts",
                            "Detailed demographic insights",
                            "Engagement time measurement",
                            "Conversion tracking"
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-xs">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/10 to-background relative">
            <div className="container mx-auto relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <Badge className="mb-4 bg-primary/20 text-primary">India's First AI-Powered Platform</Badge>
                <h2 className="text-4xl font-bold mb-6">Transform Your Advertising Strategy</h2>
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
          <footer className="bg-muted/20 py-12 px-6 border-t border-border/30">
            <div className="container mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold mb-4">Platform</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">AI Analytics</Link></li>
                    <li><Link to="/map-analytics" className="text-muted-foreground hover:text-primary transition-colors">Geospatial Mapping</Link></li>
                    <li><Link to="/ar-working-demo" className="text-muted-foreground hover:text-primary transition-colors">AR Technology</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-4">Business</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link to="/business-solutions" className="text-muted-foreground hover:text-primary transition-colors">ROI Tracking</Link></li>
                    <li><Link to="/revenue" className="text-muted-foreground hover:text-primary transition-colors">Revenue Metrics</Link></li>
                    <li><Link to="/budget-campaign" className="text-muted-foreground hover:text-primary transition-colors">Campaign Planning</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-4">Resources</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold mb-4">Company</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-border/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground">© 2025 AdTech Platform. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                  <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
                  <a href="#" className="text-muted-foreground hover:text-primary">LinkedIn</a>
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
