import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const cities = [
  { id: 1, name: 'Mumbai', x: 20, y: 58, size: 'lg', traffic: 750, impressions: 4200, engagementRate: '3.2' },
  { id: 2, name: 'Delhi', x: 30, y: 32, size: 'xl', traffic: 900, impressions: 5000, engagementRate: '4.1' },
  { id: 3, name: 'Bangalore', x: 30, y: 70, size: 'lg', traffic: 680, impressions: 3600, engagementRate: '2.9' },
  { id: 4, name: 'Hyderabad', x: 35, y: 60, size: 'md', traffic: 540, impressions: 3100, engagementRate: '2.5' },
  { id: 5, name: 'Chennai', x: 40, y: 75, size: 'lg', traffic: 620, impressions: 3500, engagementRate: '3.0' },
  { id: 6, name: 'Kolkata', x: 65, y: 45, size: 'lg', traffic: 700, impressions: 3900, engagementRate: '3.4' },
  { id: 7, name: 'Ahmedabad', x: 18, y: 45, size: 'md', traffic: 490, impressions: 2800, engagementRate: '2.2' },
  { id: 8, name: 'Pune', x: 25, y: 62, size: 'md', traffic: 510, impressions: 2900, engagementRate: '2.6' },
  { id: 9, name: 'Jaipur', x: 25, y: 38, size: 'sm', traffic: 430, impressions: 2500, engagementRate: '2.0' },
  { id: 10, name: 'Lucknow', x: 40, y: 38, size: 'sm', traffic: 440, impressions: 2600, engagementRate: '2.1' },
  { id: 11, name: 'Bhopal', x: 32, y: 50, size: 'sm', traffic: 460, impressions: 2700, engagementRate: '2.3' },
  { id: 12, name: 'Chandigarh', x: 28, y: 25, size: 'sm', traffic: 410, impressions: 2400, engagementRate: '2.0' },
  { id: 13, name: 'Kochi', x: 28, y: 82, size: 'sm', traffic: 420, impressions: 2300, engagementRate: '1.9' },
  { id: 14, name: 'Indore', x: 25, y: 48, size: 'sm', traffic: 400, impressions: 2200, engagementRate: '1.8' },
  { id: 15, name: 'Surat', x: 17, y: 52, size: 'sm', traffic: 390, impressions: 2100, engagementRate: '1.7' },
];

const sizeClasses = {
  sm: 'w-2 h-2 bg-primary/70',
  md: 'w-3 h-3 bg-primary/80',
  lg: 'w-4 h-4 bg-primary/90',
  xl: 'w-5 h-5 bg-primary',
};

const IndiaTrafficMap = () => {
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);

  return (
    <div className="relative w-full lg:h-[500px] h-[400px] bg-gradient-to-b from-background to-muted/10 rounded-xl overflow-hidden">
      {/* Optional background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Optional SVG Map Outline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] opacity-25 stroke-foreground fill-none">
          <path d="M28,15 C26,15.5 25,16 ... Z" strokeWidth="0.8" />
          {/* Other map paths removed for brevity */}
        </svg>
      </div>

      {/* Static City Dots */}
      {cities.map((city) => (
        <div
          key={city.id}
          className="absolute"
          style={{
            left: `${city.x}%`,
            top: `${city.y}%`,
            zIndex: hoveredCity === city.id ? 30 : 20,
          }}
          onMouseEnter={() => setHoveredCity(city.id)}
          onMouseLeave={() => setHoveredCity(null)}
        >
          <div
            className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 ${sizeClasses[city.size as keyof typeof sizeClasses]}`}
          ></div>

          {hoveredCity === city.id && (
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-full bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg w-48 z-30">
              <div className="font-bold text-sm mb-1">{city.name}</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>Traffic: {city.traffic}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Impressions: {city.impressions}</span>
                </div>
                <div className="flex items-center gap-1 col-span-2">
                  <span>Engagement Rate: {city.engagementRate}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IndiaTrafficMap;
