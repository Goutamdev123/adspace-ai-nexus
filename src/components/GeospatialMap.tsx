
import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { MapPin, Satellite, Layers } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const GeospatialMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [region, setRegion] = useState('all');
  const [adType, setAdType] = useState('all');
  
  const mapDataPoints = [
    { id: 1, lat: 12.96, lng: 77.56, intensity: 0.9, name: "Bangalore CBD" },
    { id: 2, lat: 19.08, lng: 72.88, intensity: 0.85, name: "Mumbai Central" },
    { id: 3, lat: 28.65, lng: 77.23, intensity: 0.78, name: "Delhi Metro Area" },
    { id: 4, lat: 22.56, lng: 88.36, intensity: 0.72, name: "Kolkata East" },
    { id: 5, lat: 17.44, lng: 78.47, intensity: 0.68, name: "Hyderabad Tech Zone" },
    { id: 6, lat: 13.08, lng: 80.27, intensity: 0.65, name: "Chennai Central" },
    { id: 7, lat: 18.52, lng: 73.86, intensity: 0.62, name: "Pune University Area" },
    { id: 8, lat: 23.03, lng: 72.58, intensity: 0.58, name: "Ahmedabad River Front" },
  ];

  const loadGoogleMapsScript = (callback: () => void) => {
    // This is a placeholder for actual Google Maps API integration
    // In a real implementation, you would load the Google Maps script here
    console.log("Simulating Google Maps API loading");
    setTimeout(callback, 100);
  };

  const renderMap = () => {
    console.log("Rendering map with view mode:", viewMode);
    console.log("Region filter:", region);
    console.log("Ad type filter:", adType);
    
    // Generate a fake map view using CSS
    if (mapRef.current) {
      const mapElement = mapRef.current;
      mapElement.innerHTML = '';
      
      // Create base map with appropriate styling based on view mode
      const mapBase = document.createElement('div');
      mapBase.className = `absolute inset-0 ${viewMode === '3D' ? 'bg-adtech-dark-blue' : 'bg-gray-700'} rounded-lg overflow-hidden transition-all duration-300`;
      
      if (viewMode === '2D') {
        mapBase.style.backgroundImage = "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1949')";
        mapBase.style.backgroundSize = "cover";
        mapBase.style.backgroundPosition = "center";
        mapBase.style.opacity = "0.7";
      }
      
      mapElement.appendChild(mapBase);
      
      // Create visualization overlay
      const mapOverlay = document.createElement('div');
      mapOverlay.className = `absolute inset-0 ${viewMode === '3D' ? 'bg-gradient-radial from-transparent via-transparent to-adtech-dark-blue/60' : 'bg-gradient-to-t from-black/70 via-transparent to-transparent'}`;
      mapElement.appendChild(mapOverlay);
      
      // Add data points - filter based on region and ad type if needed
      const filteredPoints = mapDataPoints.filter(point => {
        // In a real implementation, we would apply actual region and ad type filters
        // For this demo, we'll just pretend to filter
        if (region !== 'all' && Math.random() > 0.7) return false;
        if (adType !== 'all' && Math.random() > 0.7) return false;
        return true;
      });
      
      filteredPoints.forEach((point) => {
        const dataPoint = document.createElement('div');
        const left = (point.lng - 70) * 30; // Simple linear transform for demo
        const top = 100 - (point.lat - 10) * 10; // Simple linear transform for demo
        
        dataPoint.className = `absolute rounded-full animate-pulse-glow cursor-pointer transition-all duration-300`;
        dataPoint.style.left = `${left}%`;
        dataPoint.style.top = `${top}%`;
        dataPoint.style.backgroundColor = `rgba(51, 195, 240, ${point.intensity})`;
        dataPoint.style.width = `${10 + point.intensity * 15}px`;
        dataPoint.style.height = `${10 + point.intensity * 15}px`;
        
        const pointLabel = document.createElement('div');
        pointLabel.className = 'absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium bg-adtech-dark-blue/80 px-2 py-0.5 rounded whitespace-nowrap';
        pointLabel.innerText = point.name;
        dataPoint.appendChild(pointLabel);
        
        dataPoint.addEventListener('mouseenter', () => {
          dataPoint.classList.add('scale-125');
          pointLabel.classList.add('font-bold');
        });
        
        dataPoint.addEventListener('mouseleave', () => {
          dataPoint.classList.remove('scale-125');
          pointLabel.classList.remove('font-bold');
        });
        
        dataPoint.addEventListener('click', () => {
          toast({
            title: `Selected: ${point.name}`,
            description: `Ad intensity: ${(point.intensity * 100).toFixed(0)}% | Potential reach: ${(point.intensity * 250000).toFixed(0)} impressions/day`,
            duration: 3000,
          });
        });
        
        mapElement.appendChild(dataPoint);
      });
      
      // Add mesh grid for 3D effect (only in 3D mode)
      if (viewMode === '3D') {
        for (let i = 0; i < 10; i++) {
          const gridLine = document.createElement('div');
          gridLine.className = 'absolute h-px w-full bg-adtech-blue/10';
          gridLine.style.top = `${i * 10}%`;
          mapElement.appendChild(gridLine);
          
          const vertLine = document.createElement('div');
          vertLine.className = 'absolute w-px h-full bg-adtech-blue/10';
          vertLine.style.left = `${i * 10}%`;
          mapElement.appendChild(vertLine);
        }
      }
      
      // Add some fake UI elements for the map
      const uiControls = document.createElement('div');
      uiControls.className = 'absolute bottom-4 right-4 flex gap-2';
      
      const zoomIn = document.createElement('button');
      zoomIn.className = 'bg-background/80 p-1 rounded';
      zoomIn.innerHTML = '+';
      uiControls.appendChild(zoomIn);
      
      const zoomOut = document.createElement('button');
      zoomOut.className = 'bg-background/80 p-1 rounded';
      zoomOut.innerHTML = '-';
      uiControls.appendChild(zoomOut);
      
      mapElement.appendChild(uiControls);
      
      // Add satellite icon for satellite mode
      if (viewMode === '2D') {
        const satelliteIndicator = document.createElement('div');
        satelliteIndicator.className = 'absolute top-4 right-4 flex items-center gap-1 bg-background/80 px-2 py-1 rounded-md text-xs';
        satelliteIndicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7.5c.5-.5 1.5-.5 2 0s.5 1.5 0 2-1.5.5-2 0-.5-1.5 0-2z"/><path d="m16 15.5-.5.5"/><path d="m12 9.5 1.5 1.5"/><path d="M9.5 14 12 16.5"/><path d="m16 15.5-1.5-1.5"/><path d="M10 16a6 6 0 0 0 6-6"/><path d="M2 2s4 4 6 6"/><path d="M10.5 11.5 14 15"/><path d="M16 16s4 4 6 6"/></svg> Satellite View';
        mapElement.appendChild(satelliteIndicator);
      }
    }
  };

  useEffect(() => {
    // Simulated map initialization
    loadGoogleMapsScript(() => {
      renderMap();
    });
  }, []);
  
  useEffect(() => {
    renderMap();
  }, [viewMode, region, adType]);

  const toggleViewMode = () => {
    setViewMode(viewMode === '3D' ? '2D' : '3D');
    toast({
      title: `Switched to ${viewMode === '3D' ? '2D' : '3D'} View`,
      description: `${viewMode === '3D' ? 'Satellite' : '3D'} visualization mode activated`,
      duration: 2000,
    });
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    toast({
      title: "Region Filter Applied",
      description: value === 'all' ? "Showing all regions" : `Filtered to ${value} region`,
      duration: 2000,
    });
  };

  const handleAdTypeChange = (value: string) => {
    setAdType(value);
    toast({
      title: "Ad Type Filter Applied",
      description: value === 'all' ? "Showing all ad types" : `Filtered to ${value} ad type`,
      duration: 2000,
    });
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[500px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h3 className="font-semibold text-lg flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-adtech-blue" />
              Geospatial Ad Coverage
            </h3>
            <p className="text-sm text-muted-foreground">3D visualization of active ad placement across regions</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select defaultValue="all" onValueChange={handleRegionChange}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Filter Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
                <SelectItem value="metro">Metro Cities Only</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all" onValueChange={handleAdTypeChange}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Filter Ad Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ad Types</SelectItem>
                <SelectItem value="walls">Walls</SelectItem>
                <SelectItem value="billboards">Billboards</SelectItem>
                <SelectItem value="digital">Digital Screens</SelectItem>
                <SelectItem value="transit">Transit</SelectItem>
                <SelectItem value="ar">AR Experiences</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-md">
          <div ref={mapRef} className="absolute inset-0 bg-adtech-dark-blue rounded-lg">
            {/* Map will be rendered here */}
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="outline" className="bg-background/80 hover:bg-background">Heat Intensity</Badge>
            <Badge variant="outline" className="bg-background/80 hover:bg-background">Agency Zones</Badge>
          </div>
          <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-2 rounded-md text-xs font-medium">
            5,482 Active Ad Spaces
          </div>
        </div>
        
        <div className="flex justify-end mt-4 gap-2">
          <Button 
            variant={viewMode === '2D' ? "default" : "outline"} 
            size="sm"
            onClick={toggleViewMode}
            className={viewMode === '2D' ? "bg-adtech-blue hover:bg-adtech-blue/90" : ""}
          >
            <Satellite className="h-4 w-4 mr-1" />
            2D View
          </Button>
          <Button 
            variant={viewMode === '3D' ? "default" : "outline"} 
            size="sm" 
            onClick={toggleViewMode}
            className={viewMode === '3D' ? "bg-adtech-blue hover:bg-adtech-blue/90" : ""}
          >
            <Layers className="h-4 w-4 mr-1" />
            3D View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeospatialMap;
