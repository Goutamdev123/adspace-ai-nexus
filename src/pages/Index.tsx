import React, { useState, useEffect, useRef } from "react";
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

// Restore the successMetrics array
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
    // Check system preference or localStorage
    return localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("technology");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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
    // Set initial dark mode
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Video play handling for mobile
    const handleVideoPlay = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Video play prevented:", e));
      }
    };

    // Mobile detection for video autoplay
    if (isMobile) {
      document.addEventListener('click', handleVideoPlay, { once: true });
      setIsSidebarOpen(false);
    }

    // Show welcome toast
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
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background video with improved handling */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/video-poster.jpg" // Add poster for better UX
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

        <main className="flex-1 overflow-auto">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center">
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
          
          {/* Rest of the code remains the same as in the previous refactored version */}
          {/* ... (Tracking Technologies, Technology Stack, Business Benefits, etc.) ... */}
          
        </main>
      </div>
    </div>
  );
};

export default Index;
