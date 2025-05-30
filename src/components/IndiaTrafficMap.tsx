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
      
      {/* Detailed India Map SVG Outline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] opacity-25 stroke-foreground fill-none">
          {/* More detailed India outline */}
          <path d="M28,15 C26,15.5 25,16 24,17 C23,18 22,19 21,20 C20,21 19,22 18,23 C17,24 16,25 15,26 C14,27 13,28 12,29 C11,30 10,31 9,32 C8,33 8,34.5 7.5,35.5 C7,36.5 7,37.5 7,38.5 C7,39.5 7.5,40.5 8,41.5 C8.5,42.5 9,43.5 9,44.5 C9,45.5 8.5,46.5 8,47.5 C7.5,48.5 7,49.5 7,50.5 C7,51.5 7.5,52.5 8,53.5 C8.5,54.5 9,55.5 9,56.5 C9,57.5 8.5,58.5 8,59.5 C7.5,60.5 7,61.5 7,62.5 C7,63.5 7.5,64.5 8,65.5 C8.5,66.5 9,67.5 9.5,68.5 C10,69.5 10.5,70.5 11,71.5 C11.5,72.5 12,73.5 12.5,74.5 C13,75.5 14,76 15,76.5 C16,77 17,77.5 17.5,78.5 C18,79.5 18,80.5 18,81.5 C18,82.5 17.5,83.5 17,84.5 C16.5,85.5 16,86.5 16,87.5 C16,88.5 16.5,89.5 17,90.5 C17.5,91.5 18.5,92 19.5,92.5 C20.5,93 21.5,93.5 22.5,93.5 C23.5,93.5 24.5,93 25.5,92.5 C26.5,92 27.5,91.5 28.5,91.5 C29.5,91.5 30.5,92 31.5,92.5 C32.5,93 33.5,93.5 34.5,93.5 C35.5,93.5 36.5,93 37.5,92.5 C38.5,92 39.5,91.5 40.5,91.5 C41.5,91.5 42.5,92 43.5,92.5 C44.5,93 45.5,93.5 46.5,93.5 C47.5,93.5 48.5,93 49.5,92.5 C50.5,92 51.5,91.5 52.5,91 C53.5,90.5 54.5,90 55.5,89.5 C56.5,89 57.5,88.5 58.5,88 C59.5,87.5 60.5,87 61.5,86.5 C62.5,86 63.5,85.5 64.5,85 C65.5,84.5 66.5,84 67.5,83.5 C68.5,83 69.5,82.5 70.5,82 C71.5,81.5 72.5,81 73.5,80.5 C74.5,80 75.5,79.5 76.5,79 C77.5,78.5 78.5,78 79,77 C79.5,76 80,75 80,74 C80,73 79.5,72 79,71 C78.5,70 78,69 78,68 C78,67 78.5,66 79,65 C79.5,64 80,63 80,62 C80,61 79.5,60 79,59 C78.5,58 78,57 78,56 C78,55 78.5,54 79,53 C79.5,52 80,51 80,50 C80,49 79.5,48 79,47 C78.5,46 78,45 78,44 C78,43 78.5,42 79,41 C79.5,40 80,39 80,38 C80,37 79.5,36 79,35 C78.5,34 78,33 78,32 C78,31 78.5,30 79,29 C79.5,28 80,27 80,26 C80,25 79.5,24 79,23 C78.5,22 78,21 77.5,20 C77,19 76.5,18 76,17 C75.5,16 74.5,15.5 73.5,15 C72.5,14.5 71.5,14 70.5,13.5 C69.5,13 68.5,12.5 67.5,12 C66.5,11.5 65.5,11 64.5,10.5 C63.5,10 62.5,9.5 61.5,9 C60.5,8.5 59.5,8 58.5,7.5 C57.5,7 56.5,6.5 55.5,6 C54.5,5.5 53.5,5 52.5,4.5 C51.5,4 50.5,3.5 49.5,3 C48.5,2.5 47.5,2 46.5,2 C45.5,2 44.5,2.5 43.5,3 C42.5,3.5 41.5,4 40.5,4.5 C39.5,5 38.5,5.5 37.5,6 C36.5,6.5 35.5,7 34.5,7.5 C33.5,8 32.5,8.5 31.5,9 C30.5,9.5 29.5,10 28.5,11 C27.5,12 27,13 27,14 C27,15 27.5,15 28,15 Z" strokeWidth="0.8"/>
          
          {/* Kashmir region */}
          <path d="M36,5 C35,6 34,7 33,8 C32,9 31,10 30,11 C29,12 28,13 27,14 C28,14 29,14 30,14 C31,14 32,13 33,12 C34,11 35,10 36,9 C37,8 38,7 39,6 C40,5 41,4 42,4 C41,4 40,4 39,4 C38,4 37,4 36,5 Z" strokeWidth="0.6"/>
          
          {/* Eastern states - Northeast */}
          <path d="M78,32 C79,31 80,30 81,29 C82,28 83,27 84,26 C85,25 86,24 87,23 C88,22 89,21 90,20 C91,19 92,18 93,17 C92,18 91,19 90,20 C89,21 88,22 87,23 C86,24 85,25 84,26 C83,27 82,28 81,29 C80,30 79,31 78,32 Z" strokeWidth="0.6"/>
          
          {/* Western coastal regions */}
          <path d="M16,60 C15,61 14,62 13,63 C12,64 11,65 10,66 C9,67 8,68 7,69 C8,69 9,69 10,69 C11,69 12,68 13,67 C14,66 15,65 16,64 C17,63 18,62 19,61 C18,61 17,61 16,60 Z" strokeWidth="0.6"/>
          
          {/* Southern tip */}
          <path d="M34,93 C33,92 32,91 31,90 C30,89 29,88 28,87 C29,88 30,89 31,90 C32,91 33,92 34,93 Z" strokeWidth="0.6"/>
          
          {/* Andaman and Nicobar Islands suggestion */}
          <path d="M93,60 C92.5,61 92,62 91.5,63 C91,64 90.5,65 90,66 C89.5,67 89,68 88.5,69 C88,70 87.5,71 87,72" strokeWidth="0.5" strokeDasharray="1,1"/>
        </svg>
      </div>
      
      {/* City Dots */}
      {cityData.map((city) => (
        <div 
          key={city.id}
          className="absolute"
          style={{ 
            left: ${city.x}%, 
            top: ${city.y}%, 
            zIndex: hoveredCity === city.id ? 30 : 20,
            transition: 'transform 0.3s ease-out'
          }}
          onMouseEnter={() => setHoveredCity(city.id)}
          onMouseLeave={() => setHoveredCity(null)}
        >
          {/* Pulsing effect */}
          <div 
            className={absolute rounded-full bg-primary/10 -translate-x-1/2 -translate-y-1/2 ${pulseClasses[city.size as keyof typeof pulseClasses]}} 
            style={{ 
              animationDuration: activeCities.includes(city.id) ? '3s' : '6s',
              animationDelay: city.pulseDelay,
              opacity: activeCities.includes(city.id) ? 0.7 : 0.3,
            }}
          ></div>
          
          {/* City dot */}
          <div className={absolute rounded-full -translate-x-1/2 -translate-y-1/2 ${sizeClasses[city.size as keyof typeof sizeClasses]}}></div>
          
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
      
      {/* State boundaries - simplified strokes */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary/10 fill-none">
          {/* Northern states */}
          <path d="M20,25 Q30,20 40,25 Q50,30 60,25" strokeWidth="0.5" />
          {/* Central states */}
          <path d="M15,45 Q30,40 45,45 Q60,50 75,45" strokeWidth="0.5" />
          {/* Southern states */}
          <path d="M18,65 Q30,60 38,65 Q45,70 55,65" strokeWidth="0.5" />
          {/* Eastern states */}
          <path d="M60,30 Q65,40 60,50 Q55,60 60,70" strokeWidth="0.5" />
          {/* Western states */}
          <path d="M20,30 Q15,45 20,60 Q25,70 20,80" strokeWidth="0.5" />
        </svg>
      </div>
      
      {/* Data flow lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-full h-0.5 data-flow-line"></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 data-flow-line"></div>
        <div className="absolute top-0 left-1/4 w-0.5 h-full data-flow-line"></div>
        <div className="absolute top-0 left-3/4 w-0.5 h-full data-flow-line"></div>
      </div>
      
      {/* Connection lines between major cities */}
      <svg className="absolute inset-0 w-full h-full stroke-primary/20 pointer-events-none">
        {/* Mumbai - Delhi */}
        <line x1="20%" y1="58%" x2="30%" y2="32%" strokeWidth="0.5" className="animate-dash-flow" />
        {/* Delhi - Kolkata */}
        <line x1="30%" y1="32%" x2="65%" y2="45%" strokeWidth="0.5" className="animate-dash-flow" />
        {/* Kolkata - Chennai */}
        <line x1="65%" y1="45%" x2="40%" y2="75%" strokeWidth="0.5" className="animate-dash-flow" />
        {/* Chennai - Bangalore */}
        <line x1="40%" y1="75%" x2="30%" y2="70%" strokeWidth="0.5" className="animate-dash-flow" />
        {/* Bangalore - Hyderabad */}
        <line x1="30%" y1="70%" x2="35%" y2="60%" strokeWidth="0.5" className="animate-dash-flow" />
        {/* Hyderabad - Mumbai */}
        <line x1="35%" y1="60%" x2="20%" y2="58%" strokeWidth="0.5" className="animate-dash-flow" />
      </svg>
      
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
