
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const TimelineViewer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeframe, setCurrentTimeframe] = useState('30days');
  const [animationIndex, setAnimationIndex] = useState(0);
  
  // Generate sample data
  const generateTimelineData = () => {
    const data = [];
    const now = new Date();
    const timeframes = {
      '7days': 7,
      '30days': 30,
      '90days': 90
    };
    
    const days = timeframes[currentTimeframe];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      // Base values with some randomness
      const impressions = 300000 + Math.random() * 100000;
      const engagement = impressions * (0.08 + Math.random() * 0.04);
      const conversions = engagement * (0.03 + Math.random() * 0.02);
      
      // Add weekly patterns
      const dayOfWeek = date.getDay();
      const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.85 : 1;
      
      // Add trends over time (increasing)
      const timeFactor = 1 + (days - i) / days * 0.3;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        impressions: Math.round(impressions * weekendFactor * timeFactor),
        engagement: Math.round(engagement * weekendFactor * timeFactor),
        conversions: Math.round(conversions * weekendFactor * timeFactor),
        timestamp: date.getTime()
      });
    }
    
    return data;
  };
  
  const timelineData = generateTimelineData();
  
  const getCurrentDateLine = () => {
    const now = new Date();
    return now.getTime();
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToPrevious = () => {
    if (animationIndex > 0) {
      setAnimationIndex(animationIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (animationIndex < timelineData.length - 1) {
      setAnimationIndex(animationIndex + 1);
    }
  };
  
  // Handle animation
  useEffect(() => {
    let animationTimer;
    if (isPlaying) {
      animationTimer = setInterval(() => {
        setAnimationIndex(prevIndex => {
          if (prevIndex >= timelineData.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prevIndex + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(animationTimer);
  }, [isPlaying, timelineData.length]);
  
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Campaign Timeline Performance</CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={currentTimeframe === '7days' ? 'bg-muted' : ''}
            onClick={() => setCurrentTimeframe('7days')}
          >
            7D
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={currentTimeframe === '30days' ? 'bg-muted' : ''}
            onClick={() => setCurrentTimeframe('30days')}
          >
            30D
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={currentTimeframe === '90days' ? 'bg-muted' : ''}
            onClick={() => setCurrentTimeframe('90days')}
          >
            90D
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timelineData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#33C3F0" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickMargin={8}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => {
                  if (typeof value === 'number') {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value.toString();
                  }
                  return '';
                }}
                tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.375rem'
                }}
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                formatter={(value: any, name: string, props: any): string => {
                  if (typeof value === 'number') {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value.toString();
                  }
                  return '--';
                }}
              />
              <ReferenceLine
                x={timelineData[Math.floor(timelineData.length * 0.6)].date}
                stroke="#F97316"
                strokeDasharray="3 3"
                label={{ 
                  value: 'New Campaign', 
                  position: 'top',
                  fill: '#F97316',
                  fontSize: 10
                }}
              />
              {/* Highlight current animation frame */}
              {isPlaying && (
                <ReferenceLine
                  x={timelineData[animationIndex]?.date}
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              )}
              <Area 
                type="monotone" 
                dataKey="impressions" 
                stackId="1"
                stroke="#33C3F0" 
                fill="url(#colorImpressions)"
                name="Impressions"
              />
              <Area 
                type="monotone" 
                dataKey="engagement" 
                stackId="2"
                stroke="#8B5CF6" 
                fill="url(#colorEngagement)"
                name="Engagement"
              />
              <Area 
                type="monotone" 
                dataKey="conversions" 
                stackId="3"
                stroke="#4ADE80" 
                fill="url(#colorConversions)"
                name="Conversions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          <Button variant="outline" size="icon" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant={isPlaying ? "default" : "outline"} onClick={togglePlayPause}>
            {isPlaying ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isPlaying ? 'Pause Animation' : 'Play Animation'}
          </Button>
          <Button variant="outline" size="icon" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineViewer;
