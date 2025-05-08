
import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { MapPin, Satellite, Layers, Map, TrafficCone, Car } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';

const GeospatialMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [region, setRegion] = useState('all');
  const [adType, setAdType] = useState('all');
  const [showVehicleTraffic, setShowVehicleTraffic] = useState(false);
  const [showFootTraffic, setShowFootTraffic] = useState(false);
  const [zoomLevel, setZoomLevel] = useState([50]);
  
  // Indian states data
  const indianStates = [
    { id: 1, name: "Andhra Pradesh", lat: 15.9129, lng: 79.7400, impressions: 680000, engagementRate: 0.72 },
    { id: 2, name: "Arunachal Pradesh", lat: 28.2180, lng: 94.7278, impressions: 120000, engagementRate: 0.65 },
    { id: 3, name: "Assam", lat: 26.2006, lng: 92.9376, impressions: 310000, engagementRate: 0.68 },
    { id: 4, name: "Bihar", lat: 25.0961, lng: 85.3131, impressions: 540000, engagementRate: 0.71 },
    { id: 5, name: "Chhattisgarh", lat: 21.2787, lng: 81.8661, impressions: 290000, engagementRate: 0.67 },
    { id: 6, name: "Goa", lat: 15.2993, lng: 74.1240, impressions: 180000, engagementRate: 0.78 },
    { id: 7, name: "Gujarat", lat: 22.2587, lng: 71.1924, impressions: 750000, engagementRate: 0.75 },
    { id: 8, name: "Haryana", lat: 29.0588, lng: 76.0856, impressions: 480000, engagementRate: 0.74 },
    { id: 9, name: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, impressions: 220000, engagementRate: 0.69 },
    { id: 10, name: "Jharkhand", lat: 23.6102, lng: 85.2799, impressions: 320000, engagementRate: 0.66 },
    { id: 11, name: "Karnataka", lat: 15.3173, lng: 75.7139, impressions: 820000, engagementRate: 0.79 },
    { id: 12, name: "Kerala", lat: 10.8505, lng: 76.2711, impressions: 670000, engagementRate: 0.81 },
    { id: 13, name: "Madhya Pradesh", lat: 22.9734, lng: 78.6569, impressions: 580000, engagementRate: 0.70 },
    { id: 14, name: "Maharashtra", lat: 19.7515, lng: 75.7139, impressions: 950000, engagementRate: 0.77 },
    { id: 15, name: "Manipur", lat: 24.6637, lng: 93.9063, impressions: 130000, engagementRate: 0.64 },
    { id: 16, name: "Meghalaya", lat: 25.4670, lng: 91.3662, impressions: 125000, engagementRate: 0.63 },
    { id: 17, name: "Mizoram", lat: 23.1645, lng: 92.9376, impressions: 110000, engagementRate: 0.62 },
    { id: 18, name: "Nagaland", lat: 26.1584, lng: 94.5624, impressions: 115000, engagementRate: 0.61 },
    { id: 19, name: "Odisha", lat: 20.9517, lng: 85.0985, impressions: 410000, engagementRate: 0.69 },
    { id: 20, name: "Punjab", lat: 31.1471, lng: 75.3412, impressions: 520000, engagementRate: 0.76 },
    { id: 21, name: "Rajasthan", lat: 27.0238, lng: 74.2179, impressions: 620000, engagementRate: 0.73 },
    { id: 22, name: "Sikkim", lat: 27.5330, lng: 88.5122, impressions: 105000, engagementRate: 0.68 },
    { id: 23, name: "Tamil Nadu", lat: 11.1271, lng: 78.6569, impressions: 880000, engagementRate: 0.80 },
    { id: 24, name: "Telangana", lat: 18.1124, lng: 79.0193, impressions: 720000, engagementRate: 0.78 },
    { id: 25, name: "Tripura", lat: 23.9408, lng: 91.9882, impressions: 135000, engagementRate: 0.65 },
    { id: 26, name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, impressions: 920000, engagementRate: 0.72 },
    { id: 27, name: "Uttarakhand", lat: 30.0668, lng: 79.0193, impressions: 240000, engagementRate: 0.71 },
    { id: 28, name: "West Bengal", lat: 22.9868, lng: 87.8550, impressions: 760000, engagementRate: 0.75 },
    { id: 29, name: "Delhi", lat: 28.7041, lng: 77.1025, impressions: 890000, engagementRate: 0.82 }
  ];
  
  // Major cities with high traffic data
  const trafficHotspots = [
    { id: 1, name: "Mumbai", lat: 19.0760, lng: 72.8777, vehicleIntensity: 0.95, footfallIntensity: 0.88 },
    { id: 2, name: "Delhi", lat: 28.7041, lng: 77.1025, vehicleIntensity: 0.97, footfallIntensity: 0.92 },
    { id: 3, name: "Bangalore", lat: 12.9716, lng: 77.5946, vehicleIntensity: 0.93, footfallIntensity: 0.85 },
    { id: 4, name: "Chennai", lat: 13.0827, lng: 80.2707, vehicleIntensity: 0.89, footfallIntensity: 0.86 },
    { id: 5, name: "Kolkata", lat: 22.5726, lng: 88.3639, vehicleIntensity: 0.91, footfallIntensity: 0.90 },
    { id: 6, name: "Hyderabad", lat: 17.3850, lng: 78.4867, vehicleIntensity: 0.88, footfallIntensity: 0.84 },
    { id: 7, name: "Pune", lat: 18.5204, lng: 73.8567, vehicleIntensity: 0.86, footfallIntensity: 0.82 },
    { id: 8, name: "Ahmedabad", lat: 23.0225, lng: 72.5714, vehicleIntensity: 0.84, footfallIntensity: 0.80 },
    { id: 9, name: "Jaipur", lat: 26.9124, lng: 75.7873, vehicleIntensity: 0.83, footfallIntensity: 0.79 },
    { id: 10, name: "Lucknow", lat: 26.8467, lng: 80.9462, vehicleIntensity: 0.82, footfallIntensity: 0.77 },
    { id: 11, name: "Kochi", lat: 9.9312, lng: 76.2673, vehicleIntensity: 0.81, footfallIntensity: 0.83 },
    { id: 12, name: "Chandigarh", lat: 30.7333, lng: 76.7794, vehicleIntensity: 0.80, footfallIntensity: 0.75 }
  ];

  const loadIndianMap = (callback: () => void) => {
    // Simulating map loading
    console.log("Loading India map data");
    setTimeout(callback, 100);
  };

  const renderIndianMap = () => {
    console.log(`Rendering Indian map in ${viewMode} mode with filters:`, { region, adType });
    console.log(`Traffic layers: Vehicle - ${showVehicleTraffic}, Foot - ${showFootTraffic}`);
    console.log(`Zoom level: ${zoomLevel[0]}%`);
    
    if (mapRef.current) {
      const mapElement = mapRef.current;
      mapElement.innerHTML = '';
      
      // Create base map with appropriate styling based on view mode
      const mapBase = document.createElement('div');
      mapBase.className = `absolute inset-0 ${viewMode === '3D' ? 'bg-adtech-dark-blue/90' : 'bg-gray-800'} rounded-lg overflow-hidden transition-all duration-300`;
      
      // Add satellite imagery in 2D mode
      if (viewMode === '2D') {
        // Use higher quality satellite image of India
        mapBase.style.backgroundImage = "url('https://images.unsplash.com/photo-1625493129826-56ddb4d5e100?q=80&w=2000&auto=format&fit=crop')";
        mapBase.style.backgroundSize = "cover";
        mapBase.style.backgroundPosition = "center";
        mapBase.style.opacity = "0.85";
      }
      
      mapElement.appendChild(mapBase);
      
      // Create visualization overlay
      const mapOverlay = document.createElement('div');
      mapOverlay.className = `absolute inset-0 ${viewMode === '3D' ? 'bg-gradient-radial from-transparent via-transparent to-adtech-dark-blue/60' : 'bg-gradient-to-t from-black/80 via-transparent to-transparent'}`;
      mapElement.appendChild(mapOverlay);
      
      // Render India state boundaries - simplified for demo
      const boundaryContainer = document.createElement('div');
      boundaryContainer.className = 'absolute inset-0';
      mapElement.appendChild(boundaryContainer);
      
      // Add Indian state data points
      const filteredStates = indianStates.filter(state => {
        if (region !== 'all') {
          // Simplified region filtering
          if (region === 'north' && state.lat < 23) return false;
          if (region === 'south' && state.lat > 23) return false;
          if (region === 'east' && state.lng < 83) return false;
          if (region === 'west' && state.lng > 83) return false;
          if (region === 'metro' && !['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'West Bengal'].includes(state.name)) return false;
        }
        return true;
      });
      
      filteredStates.forEach((state) => {
        const statePoint = document.createElement('div');
        
        // Convert geo coordinates to screen position (simple transform for visualization)
        const left = ((state.lng - 68) / (98 - 68)) * 100; // India's longitude spans roughly 68E to 98E
        const top = 100 - ((state.lat - 6) / (38 - 6)) * 100; // India's latitude spans roughly 6N to 38N
        
        const intensity = state.engagementRate; // Use engagement rate for intensity
        const size = (state.impressions / 1000000) * 25 + 15; // Scale based on impressions
        
        statePoint.className = `absolute rounded-full animate-pulse cursor-pointer transition-all duration-300`;
        statePoint.style.left = `${left}%`;
        statePoint.style.top = `${top}%`;
        statePoint.style.backgroundColor = `rgba(51, 195, 240, ${intensity})`;
        statePoint.style.width = `${size}px`;
        statePoint.style.height = `${size}px`;
        statePoint.style.transform = viewMode === '3D' ? `translateZ(${intensity * 50}px)` : 'none';
        statePoint.style.boxShadow = viewMode === '3D' ? `0 0 15px rgba(51, 195, 240, ${intensity * 0.7})` : 'none';
        
        const stateLabel = document.createElement('div');
        stateLabel.className = 'absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium bg-adtech-dark-blue/80 px-2 py-0.5 rounded whitespace-nowrap z-10';
        stateLabel.innerText = state.name;
        statePoint.appendChild(stateLabel);
        
        statePoint.addEventListener('mouseenter', () => {
          statePoint.classList.add('scale-125', 'z-50');
          stateLabel.classList.add('font-bold', 'bg-adtech-blue', 'text-white');
        });
        
        statePoint.addEventListener('mouseleave', () => {
          statePoint.classList.remove('scale-125', 'z-50');
          stateLabel.classList.remove('font-bold', 'bg-adtech-blue', 'text-white');
        });
        
        statePoint.addEventListener('click', () => {
          toast({
            title: `${state.name} Ad Performance`,
            description: `Impressions: ${state.impressions.toLocaleString()} | Engagement Rate: ${(state.engagementRate * 100).toFixed(1)}%`,
            duration: 4000,
          });
        });
        
        boundaryContainer.appendChild(statePoint);
      });
      
      // Add traffic hotspots if enabled
      if (showVehicleTraffic || showFootTraffic) {
        trafficHotspots.forEach((hotspot) => {
          if ((showVehicleTraffic && hotspot.vehicleIntensity > 0.8) || 
              (showFootTraffic && hotspot.footfallIntensity > 0.8)) {
            
            const left = ((hotspot.lng - 68) / (98 - 68)) * 100;
            const top = 100 - ((hotspot.lat - 6) / (38 - 6)) * 100;
            
            // Vehicle traffic indicators
            if (showVehicleTraffic) {
              const vehiclePoint = document.createElement('div');
              vehiclePoint.className = 'absolute animate-pulse z-20';
              vehiclePoint.style.left = `${left - 1}%`;
              vehiclePoint.style.top = `${top - 1}%`;
              
              const vehicleMarker = document.createElement('div');
              vehicleMarker.className = 'rounded-full bg-orange-500/70 border border-orange-400';
              vehicleMarker.style.width = `${Math.max(10, hotspot.vehicleIntensity * 35)}px`;
              vehicleMarker.style.height = `${Math.max(10, hotspot.vehicleIntensity * 35)}px`;
              vehicleMarker.style.boxShadow = '0 0 12px rgba(249, 115, 22, 0.7)';
              
              vehiclePoint.appendChild(vehicleMarker);
              
              // Add traffic icon
              const trafficIcon = document.createElement('div');
              trafficIcon.className = 'absolute -right-2 -bottom-2 bg-orange-500 rounded-full p-1 shadow-md';
              trafficIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M10 2h4"/><path d="m12 14 1.5-1.5"/><path d="M16 8h-2.5"/><path d="M7.5 8H5"/><path d="M14 22a5 5 0 0 0 7.5-1.5 8.5 8.5 0 0 0 0-10 5 5 0 0 0-7.54-1.5"/><path d="M4 16a5 5 0 0 1 7.54-1.5 8.5 8.5 0 0 1 0 10A5 5 0 0 1 4 23"/></svg>`;
              
              vehiclePoint.appendChild(trafficIcon);
              
              vehiclePoint.addEventListener('mouseover', () => {
                toast({
                  title: `${hotspot.name} Vehicle Traffic`,
                  description: `Current intensity: ${(hotspot.vehicleIntensity * 100).toFixed(0)}% | Peak hours: 9AM-11AM, 5PM-8PM`,
                  duration: 3000,
                });
              });
              
              mapElement.appendChild(vehiclePoint);
            }
            
            // Footfall traffic indicators
            if (showFootTraffic) {
              const footPoint = document.createElement('div');
              footPoint.className = 'absolute animate-pulse z-20';
              footPoint.style.left = `${left + 1}%`;
              footPoint.style.top = `${top + 1}%`;
              
              const footMarker = document.createElement('div');
              footMarker.className = 'rounded-full bg-purple-500/70 border border-purple-400';
              footMarker.style.width = `${Math.max(8, hotspot.footfallIntensity * 30)}px`;
              footMarker.style.height = `${Math.max(8, hotspot.footfallIntensity * 30)}px`;
              footMarker.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.7)';
              
              footPoint.appendChild(footMarker);
              
              // Add pedestrian icon - replacing with User icon since Pedestrian is not available
              const pedestrianIcon = document.createElement('div');
              pedestrianIcon.className = 'absolute -right-2 -bottom-2 bg-purple-500 rounded-full p-1 shadow-md';
              pedestrianIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`;
              
              footPoint.appendChild(pedestrianIcon);
              
              footPoint.addEventListener('mouseover', () => {
                toast({
                  title: `${hotspot.name} Footfall Traffic`,
                  description: `Current intensity: ${(hotspot.footfallIntensity * 100).toFixed(0)}% | Peak hours: 12PM-2PM, 6PM-9PM`,
                  duration: 3000,
                });
              });
              
              mapElement.appendChild(footPoint);
            }
          }
        });
      }
      
      // Add mesh grid for 3D effect (only in 3D mode)
      if (viewMode === '3D') {
        // Create perspective grid effect
        const gridContainer = document.createElement('div');
        gridContainer.className = 'absolute inset-0 transform-style-preserve-3d perspective-800';
        
        // Generate horizontal grid lines
        for (let i = 0; i <= 12; i++) {
          const gridLine = document.createElement('div');
          gridLine.className = 'absolute h-px w-full bg-adtech-blue/15';
          gridLine.style.top = `${i * 8}%`;
          gridLine.style.transform = `translateZ(${i * 2}px)`;
          gridContainer.appendChild(gridLine);
          
          // Generate vertical grid lines
          for (let j = 0; j <= 12; j++) {
            const vertLine = document.createElement('div');
            vertLine.className = 'absolute w-px h-full bg-adtech-blue/15';
            vertLine.style.left = `${j * 8}%`;
            vertLine.style.transform = `translateZ(${j * 2}px)`;
            gridContainer.appendChild(vertLine);
          }
        }
        
        mapElement.appendChild(gridContainer);
        
        // Add 3D map border effect
        const mapBorder = document.createElement('div');
        mapBorder.className = 'absolute inset-0 border-2 border-adtech-blue/30 rounded-lg pointer-events-none';
        mapBorder.style.boxShadow = 'inset 0 0 30px rgba(51, 195, 240, 0.2)';
        mapElement.appendChild(mapBorder);
      }
      
      // Add some fake UI controls for the map
      const uiControls = document.createElement('div');
      uiControls.className = 'absolute bottom-4 right-4 flex flex-col gap-2';
      
      const zoomControls = document.createElement('div');
      zoomControls.className = 'bg-background/80 p-2 rounded flex flex-col gap-1 items-center';
      
      const zoomIn = document.createElement('button');
      zoomIn.className = 'bg-background/90 hover:bg-background w-6 h-6 flex items-center justify-center rounded';
      zoomIn.innerHTML = '+';
      zoomIn.onclick = () => setZoomLevel([Math.min(100, zoomLevel[0] + 10)]);
      zoomControls.appendChild(zoomIn);
      
      const zoomOut = document.createElement('button');
      zoomOut.className = 'bg-background/90 hover:bg-background w-6 h-6 flex items-center justify-center rounded';
      zoomOut.innerHTML = '-';
      zoomOut.onclick = () => setZoomLevel([Math.max(10, zoomLevel[0] - 10)]);
      zoomControls.appendChild(zoomOut);
      
      uiControls.appendChild(zoomControls);
      mapElement.appendChild(uiControls);
      
      // Add compass icon for orientation in 3D mode
      if (viewMode === '3D') {
        const compass = document.createElement('div');
        compass.className = 'absolute top-4 right-4 bg-background/80 p-2 rounded-full';
        compass.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
        mapElement.appendChild(compass);
      }
      
      // Add satellite icon for satellite mode
      if (viewMode === '2D') {
        const satelliteIndicator = document.createElement('div');
        satelliteIndicator.className = 'absolute top-4 right-4 flex items-center gap-1 bg-background/80 px-2 py-1 rounded-md text-xs';
        satelliteIndicator.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.38 17a9 9 0 0 1 12.24 0"/><path d="M2.34 14a15 15 0 0 1 19.32 0"/><circle cx="12" cy="21" r="1"/><path d="M12 18v-2.5"/><path d="M9.04 11.29c.31-.48.83-.8 1.46-.8"/><path d="M14.36 10.05a3 3 0 0 0-4.24.27"/><path d="M16.15 7.35a6 6 0 0 0-8.3 0"/></svg> Satellite View';
        mapElement.appendChild(satelliteIndicator);
      }
      
      // Add active ad spaces counter
      const adCounter = document.createElement('div');
      adCounter.className = 'absolute bottom-4 left-4 bg-background/80 px-3 py-2 rounded-md text-xs font-medium';
      const adCount = filteredStates.reduce((sum, state) => sum + Math.round(state.impressions / 10000), 0);
      adCounter.innerHTML = `${adCount.toLocaleString()} Active Ad Spaces`;
      mapElement.appendChild(adCounter);
      
      // Add top OOH markets badge
      const topMarketsBadge = document.createElement('div');
      topMarketsBadge.className = 'absolute top-4 left-4 bg-adtech-blue/90 text-white px-2 py-1 rounded text-xs font-medium flex items-center shadow-lg';
      topMarketsBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 17 3-5-3-5"/><path d="m19 17-3-5 3-5"/></svg> Top OOH Markets`;
      mapElement.appendChild(topMarketsBadge);
      
      // Add grid lines overlay
      const gridLinesOverlay = document.createElement('div');
      gridLinesOverlay.className = 'absolute inset-0 pointer-events-none';
      gridLinesOverlay.style.backgroundImage = 'linear-gradient(to right, rgba(51, 195, 240, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(51, 195, 240, 0.05) 1px, transparent 1px)';
      gridLinesOverlay.style.backgroundSize = '5% 5%';
      mapElement.appendChild(gridLinesOverlay);
    }
  };

  useEffect(() => {
    // Simulated map initialization
    loadIndianMap(() => {
      renderIndianMap();
    });
  }, []);
  
  useEffect(() => {
    renderIndianMap();
  }, [viewMode, region, adType, showVehicleTraffic, showFootTraffic, zoomLevel]);

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

  const toggleTrafficLayer = (type: 'vehicle' | 'foot') => {
    if (type === 'vehicle') {
      setShowVehicleTraffic(!showVehicleTraffic);
      toast({
        title: showVehicleTraffic ? "Vehicle Traffic Layer Hidden" : "Vehicle Traffic Layer Visible",
        description: showVehicleTraffic ? "Hiding vehicle traffic density data" : "Showing vehicle traffic density across major cities",
        duration: 2000,
      });
    } else {
      setShowFootTraffic(!showFootTraffic);
      toast({
        title: showFootTraffic ? "Foot Traffic Layer Hidden" : "Foot Traffic Layer Visible",
        description: showFootTraffic ? "Hiding pedestrian traffic data" : "Showing pedestrian traffic patterns in major cities",
        duration: 2000,
      });
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[600px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h3 className="font-semibold text-lg flex items-center">
              <Map className="mr-2 h-5 w-5 text-adtech-blue" />
              Geospatial Ad Coverage - India
            </h3>
            <p className="text-sm text-muted-foreground">Visual representation of OOH advertising reach across India</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select defaultValue="all" onValueChange={handleRegionChange}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Filter Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All India</SelectItem>
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
                <SelectItem value="transit">Transit</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === '3D' ? "default" : "outline"}
                size="sm"
                className="h-8 gap-1"
                onClick={toggleViewMode}
              >
                {viewMode === '3D' ? (
                  <><Map className="h-3.5 w-3.5" /> 3D</>
                ) : (
                  <><Satellite className="h-3.5 w-3.5" /> 2D</>
                )}
              </Button>
                            
              <Button
                variant={showVehicleTraffic ? "default" : "outline"}
                size="sm"
                className="h-8 gap-1"
                onClick={() => toggleTrafficLayer('vehicle')}
              >
                <Car className="h-3.5 w-3.5" />
                {showVehicleTraffic ? (
                  <Badge variant="destructive" className="h-4 text-[10px] px-1">ON</Badge>
                ) : (
                  <span className="text-xs">Vehicle</span>
                )}
              </Button>
              
              <Button
                variant={showFootTraffic ? "default" : "outline"}
                size="sm"
                className="h-8 gap-1"
                onClick={() => toggleTrafficLayer('foot')}
              >
                <MapPin className="h-3.5 w-3.5" />
                {showFootTraffic ? (
                  <Badge variant="destructive" className="h-4 text-[10px] px-1">ON</Badge>
                ) : (
                  <span className="text-xs">Foot</span>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="relative flex-1 rounded-lg bg-muted/30 overflow-hidden mb-2">
          <div ref={mapRef} className="absolute inset-0"></div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-medium">Zoom Level: {zoomLevel[0]}%</div>
            <Button variant="link" size="sm" className="h-6 p-0" onClick={() => setZoomLevel([50])}>
              Reset
            </Button>
          </div>
          <Slider
            value={zoomLevel}
            min={10}
            max={100}
            step={1}
            onValueChange={setZoomLevel}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default GeospatialMap;
