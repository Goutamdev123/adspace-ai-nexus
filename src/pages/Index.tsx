import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Rocket, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useIsMobile from "@/hooks/useIsMobile";

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
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    toast({
      title: "Welcome to India's First AI-Powered Outdoor Ad Platform",
      description:
        "Revolutionizing outdoor advertising with advanced AI and AR technology",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className="flex-1 flex flex-col transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : isSidebarOpen ? "16rem" : "4rem",
        }}
      >
        <DashboardHeader
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 overflow-auto">
          {/* 🎥 Hero section with background video */}
          <div className="relative w-full min-h-screen overflow-hidden">
            {/* Video background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
              <source src="/background.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Foreground content */}
            <div className="container mx-auto px-6 py-16 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <Badge
                  variant="outline"
                  className="mb-4 bg-primary/20 text-primary px-3 py-1 text-sm font-medium"
                >
                  India's First AI-Powered Outdoor Advertising Platform
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                  Making <span className="text-primary">Outdoor Advertising</span>{" "}
                  as Measurable as{" "}
                  <span className="text-accent">Digital Marketing</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Our advanced AI and AR technologies bring digital-grade tracking,
                  analytics, and engagement to traditional outdoor media, providing
                  businesses with precise ROI measurements and audience insights.
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
