
import React, { useEffect, useState } from 'react';
import { MapPin, Activity } from 'lucide-react';

// Major Indian cities with their approximate positions in the visualization
const cities = [
  { id: 1, name: 'Mumbai', x: 20, y: 58, size: 'lg', pulseDelay: '0s' },
  { id: 2, name: 'Delhi', x: 30, y: 32, size: 'xl', pulseDelay: '0.5s' },
  { id: 3, name: 'Bangalore', x: 30, y: 70, size: 'lg', pulseDelay: '1s' },
  { id: 4, name: 'Hyderabad', x: 35, y: 60, size: 'md', pulseDelay: '1.5s' },
  { id: 5, name: 'Chennai', x: 40, y: 75, size: 'lg', pulseDelay: '2s' },
  { id: 6, name: 'Kolkata', x: 65, y: 45, size: 'lg', pulseDelay: '2.5s' },
  { id: 7, name: 'Ahmedabad', x: 18, y: 45, size: 'md', pulseDelay: '3s' },
  { id: 8, name: 'Pune', x: 25, y: 62, size: 'md', pulseDelay: '3.5s' },
  { id: 9, name: 'Jaipur', x: 25, y: 38, size: 'sm', pulseDelay: '4s' },
  { id: 10, name: 'Lucknow', x: 40, y: 38, size: 'sm', pulseDelay: '4.5s' },
  { id: 11, name: 'Bhopal', x: 32, y: 50, size: 'sm', pulseDelay: '5s' },
  { id: 12, name: 'Chandigarh', x: 28, y: 25, size: 'sm', pulseDelay: '5.5s' },
  { id: 13, name: 'Kochi', x: 28, y: 82, size: 'sm', pulseDelay: '6s' },
  { id: 14, name: 'Indore', x: 25, y: 48, size: 'sm', pulseDelay: '6.5s' },
  { id: 15, name: 'Surat', x: 17, y: 52, size: 'sm', pulseDelay: '7s' },
];

// Random traffic data generator for simulation
const generateTrafficData = () => {
  return cities.map(city => ({
    ...city,
    traffic: Math.floor(Math.random() * 1000) + 200,
    impressions: Math.floor(Math.random() * 5000) + 1000,
    engagementRate: (Math.random() * 5 + 1).toFixed(1)
  }));
};

// Size classes for different city importance
const sizeClasses = {
  sm: 'w-2 h-2 bg-primary/70',
  md: 'w-3 h-3 bg-primary/80',
  lg: 'w-4 h-4 bg-primary/90',
  xl: 'w-5 h-5 bg-primary'
};

// Pulse animation strength classes
const pulseClasses = {
  sm: 'animate-ping-slow w-4 h-4',
  md: 'animate-ping-slow w-6 h-6',
  lg: 'animate-ping-slow w-8 h-8',
  xl: 'animate-ping-slow w-10 h-10'
};

const IndiaTrafficMap = () => {
  const [cityData, setCityData] = useState(generateTrafficData());
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);
  const [activeCities, setActiveCities] = useState<number[]>([1, 2, 3, 5, 6]); // Initially active cities

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setCityData(generateTrafficData());
      
      // Randomly change which cities are more active
      const active = Array.from({ length: 5 }, () => Math.floor(Math.random() * cities.length) + 1);
      setActiveCities(active);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full lg:h-[500px] h-[400px] bg-gradient-to-b from-background to-muted/10 rounded-xl overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* India Map Outline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] opacity-20 stroke-foreground fill-none">
          <path d="M36,15 C32,16 30,17 25,21 C20,25 14,27 12,32 C10,37 15,38 13,42 C11,46 6,46 7,50 C8,54 10,56 9,60 C8,64 8,68 10,72 C12,76 15,75 17,78 C19,81 15,84 17,87 C19,90 27,87 29,90 C31,93 32,95 36,94 C40,93 42,89 45,92 C48,95 47,88 51,89 C55,90 55,96 58,93 C61,90 60,85 64,85 C68,85 70,89 73,86 C76,83 75,77 79,78 C83,79 85,83 85,79 C85,75 80,74 80,70 C80,66 85,65 83,61 C81,57 75,59 73,55 C71,51 75,47 72,44 C69,41 64,43 62,40 C60,37 62,32 58,30 C54,28 52,34 48,32 C44,30 45,25 42,22 C39,19 40,14 36,15 Z" strokeWidth="0.5"/>
        </svg>
      </div>
      
      {/* City Dots */}
      {cityData.map((city) => (
        <div 
          key={city.id}
          className="absolute"
          style={{ 
            left: `${city.x}%`, 
            top: `${city.y}%`, 
            zIndex: hoveredCity === city.id ? 30 : 20,
            transition: 'transform 0.3s ease-out'
          }}
          onMouseEnter={() => setHoveredCity(city.id)}
          onMouseLeave={() => setHoveredCity(null)}
        >
          {/* Pulsing effect */}
          <div 
            className={`absolute rounded-full bg-primary/10 -translate-x-1/2 -translate-y-1/2 ${pulseClasses[city.size as keyof typeof pulseClasses]}`} 
            style={{ 
              animationDuration: activeCities.includes(city.id) ? '3s' : '6s',
              animationDelay: city.pulseDelay,
              opacity: activeCities.includes(city.id) ? 0.7 : 0.3,
            }}
          ></div>
          
          {/* City dot */}
          <div className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 ${sizeClasses[city.size as keyof typeof sizeClasses]}`}></div>
          
          {/* City info tooltip */}
          {hoveredCity === city.id && (
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-full bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg w-48 z-30">
              <div className="font-bold text-sm mb-1">{city.name}</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>Traffic: {city.traffic}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3 text-accent" />
                  <span>Imp: {city.impressions}</span>
                </div>
              </div>
              <div className="text-xs mt-1">Engagement: {city.engagementRate}%</div>
            </div>
          )}
        </div>
      ))}
      
      {/* Data flow lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-full h-0.5 data-flow-line"></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 data-flow-line"></div>
        <div className="absolute top-0 left-1/4 w-0.5 h-full data-flow-line"></div>
        <div className="absolute top-0 left-3/4 w-0.5 h-full data-flow-line"></div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-2 text-xs">
        <div className="font-semibold mb-1">Live Traffic Data</div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span>High traffic</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary/70"></div>
          <span>Medium traffic</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute top-3 right-3 bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-2 text-xs">
        <div className="font-semibold mb-1">Real-time Metrics</div>
        <div className="text-xs">
          <div>Active locations: 325</div>
          <div>Total impressions: 1.2M today</div>
          <div>Data accuracy: 97.3%</div>
        </div>
      </div>
    </div>
  );
};

export default IndiaTrafficMap;
