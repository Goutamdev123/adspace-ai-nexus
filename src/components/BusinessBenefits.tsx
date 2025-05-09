
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight, 
  BarChart3, 
  TargetIcon, 
  Users, 
  TrendingUp, 
  PieChart, 
  LineChart, 
  Zap, 
  CheckCircle2, 
  Building2
} from 'lucide-react';

const BusinessBenefits = () => {
  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Business-Focused AR Advertising Solutions</CardTitle>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">Enterprise Ready</Badge>
        </div>
        <p className="text-muted-foreground mt-2">
          Transform traditional outdoor advertising with cutting-edge AR and AI technology that delivers genuine engagement and measurable results
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="benefits">Business Benefits</TabsTrigger>
            <TabsTrigger value="solutions">Solutions</TabsTrigger>
            <TabsTrigger value="results">Case Studies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/30 rounded-lg p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <TargetIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Direct Consumer Engagement</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlike traditional static advertisements, AR enables real-time, interactive experiences with consumers, creating meaningful brand connections that are impossible with conventional ads.
                </p>
                <div className="bg-background rounded-md p-3 border border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span>Consumer Engagement</span>
                    <div className="flex items-center">
                      <span className="font-medium text-green-500">+126%</span>
                      <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Transparent Performance Metrics</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Our platform provides comprehensive analytics on every aspect of your campaign. Track impressions, engagement duration, interaction types, and conversion rates in real time.
                </p>
                <div className="bg-background rounded-md p-3 border border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span>Data Trackability</span>
                    <div className="flex items-center">
                      <span className="font-medium text-green-500">100%</span>
                      <CheckCircle2 className="h-3 w-3 ml-1 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Proven ROI Improvement</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  AR-enhanced billboards consistently outperform traditional outdoor advertising with a significant ROI boost, making your advertising budget work harder through genuine user engagement.
                </p>
                <div className="bg-background rounded-md p-3 border border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span>Average ROI Increase</span>
                    <div className="flex items-center">
                      <span className="font-medium text-green-500">+324%</span>
                      <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-5 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Authentic Brand Relationships</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Build genuine connections with consumers through memorable interactive experiences that transcend traditional advertising, resulting in higher brand loyalty and advocacy.
                </p>
                <div className="bg-background rounded-md p-3 border border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span>Brand Recall Rate</span>
                    <div className="flex items-center">
                      <span className="font-medium text-green-500">92%</span>
                      <TrendingUp className="h-3 w-3 ml-1 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-border/40">
              <h3 className="text-lg font-semibold mb-3">Key Differentiators from Digital Marketing</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-[24px_1fr] gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Physical World Integration</h4>
                    <p className="text-sm text-muted-foreground">Unlike purely digital ads that can be ignored, our AR experiences are anchored to real-world locations, creating contextually relevant engagement.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-[24px_1fr] gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Transparent Metrics</h4>
                    <p className="text-sm text-muted-foreground">No more questionable clicks or bot traffic - our platform measures actual physical interactions from real people engaging with your advertisement.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-[24px_1fr] gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Experience-Based Marketing</h4>
                    <p className="text-sm text-muted-foreground">Move beyond simple impressions to create memorable brand experiences that consumers actively choose to engage with.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-[24px_1fr] gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">AI-Driven Optimization</h4>
                    <p className="text-sm text-muted-foreground">Our platform continuously analyses engagement patterns and automatically optimizes your campaigns for maximum effectiveness.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="solutions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-full md:col-span-1">
                <div className="bg-primary/10 rounded-lg p-5 h-full border border-primary/20">
                  <h3 className="font-semibold text-lg mb-4">End-to-End Platform</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Campaign Creation</h4>
                        <p className="text-xs text-muted-foreground">Design AR experiences with our no-code builder or custom development services</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <LineChart className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Real-time Analytics</h4>
                        <p className="text-xs text-muted-foreground">Monitor campaign performance with detailed dashboards and reports</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">AI Optimization</h4>
                        <p className="text-xs text-muted-foreground">Automatic performance optimization based on user behavior analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-full md:col-span-2">
                <div className="bg-muted/30 rounded-lg p-5 h-full border border-border">
                  <h3 className="font-semibold text-lg mb-4">Implementation Process</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <span className="font-bold text-primary">1</span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">Analysis</h4>
                      <p className="text-xs text-muted-foreground">AI evaluation of optimal billboard locations based on traffic patterns</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <span className="font-bold text-primary">2</span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">Design</h4>
                      <p className="text-xs text-muted-foreground">Creative AR experience development tailored to your brand and campaign goals</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <span className="font-bold text-primary">3</span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">Deployment</h4>
                      <p className="text-xs text-muted-foreground">Quick installation with QR codes or NFC tags on existing billboards</p>
                    </div>
                    
                    <div className="flex flex-col items-center text-center p-3 bg-background rounded-lg border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <span className="font-bold text-primary">4</span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">Optimization</h4>
                      <p className="text-xs text-muted-foreground">Continuous improvement based on real-time performance metrics</p>
                    </div>
                  </div>
                  
                  <div className="mt-5 p-4 bg-background rounded-lg border border-border">
                    <h4 className="font-medium mb-2">Campaign Timeline</h4>
                    <div className="flex items-center">
                      <div className="flex-1 h-1.5 bg-muted relative">
                        <div className="absolute h-1.5 bg-primary" style={{ width: '75%' }}></div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-primary rounded-full -translate-y-1/3"></div>
                        <div className="absolute top-0 left-1/3 w-3 h-3 bg-primary rounded-full -translate-y-1/3"></div>
                        <div className="absolute top-0 left-2/3 w-3 h-3 bg-primary rounded-full -translate-y-1/3"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-muted rounded-full -translate-y-1/3 border border-primary"></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>Day 1: Setup</span>
                      <span>Week 1: Launch</span>
                      <span>Month 1: Optimize</span>
                      <span>Month 3: Scale</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/30 rounded-lg p-5 border border-border">
                <h3 className="font-semibold mb-4">AI-Powered Campaign Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Dynamic Content Adaptation</span>
                    </div>
                    <Badge>Standard</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Behavioral Analysis</span>
                    </div>
                    <Badge>Standard</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Traffic Pattern Recognition</span>
                    </div>
                    <Badge>Premium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Demographic Targeting</span>
                    </div>
                    <Badge>Premium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Predictive ROI Modeling</span>
                    </div>
                    <Badge>Enterprise</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-5 border border-border">
                <h3 className="font-semibold mb-4">Advanced Tracking Capabilities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">View & Engagement Duration Metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Interaction Heatmaps & User Journeys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Conversion Attribution Tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Cross-Campaign Performance Comparison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-sm">Real-time KPI Dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="gap-2">
                Schedule Platform Demo <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/20 rounded-lg overflow-hidden border border-border">
                <div className="h-36 bg-[url('https://images.unsplash.com/photo-1506169894395-36397e4c7b3c')] bg-cover bg-center"></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <Badge className="mb-2">Retail</Badge>
                      <h3 className="font-bold">Global Apparel Brand</h3>
                    </div>
                    <div className="bg-primary/10 text-primary font-bold px-2 py-1 rounded-md">
                      +218% ROI
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Transformed 48 static billboards across 12 cities into interactive AR showcases 
                    allowing consumers to virtually try on products by simply scanning with their phones.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Engagement Rate</div>
                      <div className="font-semibold">42.8%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Conversion Rate</div>
                      <div className="font-semibold">18.6%</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/20 rounded-lg overflow-hidden border border-border">
                <div className="h-36 bg-[url('https://images.unsplash.com/photo-1551712566-813c33eb952c')] bg-cover bg-center"></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <Badge className="mb-2">Automotive</Badge>
                      <h3 className="font-bold">Premium Car Manufacturer</h3>
                    </div>
                    <div className="bg-primary/10 text-primary font-bold px-2 py-1 rounded-md">
                      +362% ROI
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enabled consumers to scan billboards to launch a 3D car configurator, 
                    view vehicles in their driveway via AR, and book test drives directly.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Average Engagement</div>
                      <div className="font-semibold">4.2 minutes</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Test Drive Bookings</div>
                      <div className="font-semibold">+156%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-background to-muted/20 rounded-lg p-6 border border-border">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="md:w-1/2">
                  <h3 className="text-lg font-semibold mb-2">Industry Performance Benchmarks</h3>
                  <p className="text-sm text-muted-foreground">
                    AR-enhanced outdoor advertising consistently outperforms both traditional outdoor ads 
                    and digital advertising across key performance metrics.
                  </p>
                </div>
                <div className="md:w-1/2 bg-background p-4 rounded-lg border border-border">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Brand Recall</span>
                        <span className="font-medium">92% vs. 32%</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{width: "92%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engagement Duration</span>
                        <span className="font-medium">3.2m vs. 8s</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{width: "85%"}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span className="font-medium">18.6% vs. 5.2%</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{width: "75%"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="gap-2">
                  Download Full Industry Report <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 bg-primary/5 rounded-lg p-4 border border-primary/20 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div>
            <h3 className="font-semibold">Start Your AR Advertising Journey</h3>
            <p className="text-sm text-muted-foreground">
              Transform your outdoor advertising strategy with our AR platform
            </p>
          </div>
          <Button className="whitespace-nowrap gap-2">
            Get Started <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessBenefits;
