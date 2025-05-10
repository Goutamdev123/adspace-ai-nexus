
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  CameraIcon, 
  ImagePlus, 
  Upload,
  Layers3,
  Eye,
  Video,
  Cuboid,
  Download
} from "lucide-react";

type BillboardType = "urban" | "highway" | "transit" | "mall";
type MediaType = "image" | "video";

interface Billboard {
  id: string;
  name: string;
  type: BillboardType;
  mediaType: MediaType;
  url: string;
  dimensions: string;
  arEnabled: boolean;
}

const BillboardUploader = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedBillboard, setSelectedBillboard] = useState<Billboard | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showArPreview, setShowArPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Demo billboard presets
  const billboardPresets: Billboard[] = [
    {
      id: "bb1",
      name: "Downtown Plaza Billboard",
      type: "urban",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      dimensions: "48ft × 14ft",
      arEnabled: true
    },
    {
      id: "bb2",
      name: "Highway 101 Billboard",
      type: "highway",
      mediaType: "image",
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      dimensions: "60ft × 20ft",
      arEnabled: true
    },
    {
      id: "bb3",
      name: "Metro Station Display",
      type: "transit",
      mediaType: "video",
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      dimensions: "16ft × 9ft",
      arEnabled: true
    },
    {
      id: "bb4",
      name: "Shopping Mall Digital Screen",
      type: "mall",
      mediaType: "video",
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      dimensions: "12ft × 8ft",
      arEnabled: false
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload process with setTimeout
    setTimeout(() => {
      // Create a temporary URL for the uploaded file
      const file = e.target.files![0];
      const fileUrl = URL.createObjectURL(file);
      const mediaType: MediaType = file.type.startsWith('image/') ? 'image' : 'video';
      
      // Create new billboard object
      const newBillboard: Billboard = {
        id: `custom-${Date.now()}`,
        name: file.name.substring(0, file.name.lastIndexOf('.')),
        type: "urban", // Default
        mediaType,
        url: fileUrl,
        dimensions: "48ft × 14ft", // Default
        arEnabled: true
      };
      
      setSelectedBillboard(newBillboard);
      setIsUploading(false);
      
      toast({
        title: "Upload Complete",
        description: "Your billboard content has been uploaded successfully.",
        duration: 3000,
      });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Switch to preview tab
      setActiveTab("preview");
    }, 1500);
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleBillboardSelect = (billboard: Billboard) => {
    setSelectedBillboard(billboard);
    setActiveTab("preview");
  };
  
  const toggleArPreview = () => {
    setShowArPreview(!showArPreview);
    
    if (!showArPreview) {
      toast({
        title: "AR Preview Activated",
        description: "Now viewing billboard with augmented reality elements",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="shadow-md border-0 overflow-hidden bg-gradient-to-br from-background/95 to-background">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Billboard AR Preview</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary text-xs">UPLOAD & PREVIEW</Badge>
            </div>
            <CardDescription className="mt-1">
              Upload your billboard designs and preview how they'll look with AR integration
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="w-full justify-start bg-muted/50 p-1">
            <TabsTrigger value="upload" className="text-xs sm:text-sm">
              Upload Design
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-xs sm:text-sm">
              Billboard Templates
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs sm:text-sm" disabled={!selectedBillboard}>
              AR Preview
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-0 pt-6">
          <TabsContent value="upload" className="mt-0 px-6">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md p-6 mb-6 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 flex flex-col items-center justify-center cursor-pointer" onClick={triggerFileInput}>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  accept="image/*,video/*" 
                  onChange={handleFileUpload}
                />
                
                <Upload className="h-12 w-12 text-primary/60 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Billboard Design</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Drag and drop or click to upload your billboard image or video
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG, SVG, GIF, MP4 • Max 50MB
                </p>
                
                <Button 
                  className="mt-4 gap-2" 
                  disabled={isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                >
                  {isUploading ? "Uploading..." : "Select File"}
                  {isUploading ? null : <Upload className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4 border border-border w-full max-w-md">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  AR Billboard Requirements
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span>High-resolution images (min. 1920×1080px)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span>Include sufficient contrast areas for AR markers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span>Videos should be 16:9 or 4:3 aspect ratio</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-0 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {billboardPresets.map((billboard) => (
                <div 
                  key={billboard.id} 
                  className="relative rounded-lg overflow-hidden border border-border cursor-pointer hover:border-primary/30 hover:shadow-md transition-all"
                  onClick={() => handleBillboardSelect(billboard)}
                >
                  <div className="aspect-[16/9]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${billboard.url})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-white">{billboard.name}</h3>
                      <Badge variant="outline" className="bg-black/40 text-white text-[10px] border-white/20">
                        {billboard.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-white/80">{billboard.dimensions}</p>
                      <div className="flex items-center gap-1">
                        {billboard.mediaType === 'video' ? (
                          <Video className="h-3 w-3 text-white/80" />
                        ) : (
                          <ImagePlus className="h-3 w-3 text-white/80" />
                        )}
                        <span className="text-xs text-white/80">{billboard.mediaType}</span>
                      </div>
                    </div>
                  </div>
                  
                  {billboard.arEnabled && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary/90 text-white text-[10px]">AR READY</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">Can't find what you need?</span>
                <p className="text-muted-foreground text-xs mt-0.5">Upload your own design for AR integration</p>
              </div>
              <Button size="sm" onClick={() => setActiveTab("upload")}>Upload Custom</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            {selectedBillboard && (
              <div className="px-6">
                <div className="relative bg-gradient-to-br from-blue-950/30 via-indigo-950/20 to-purple-950/30 rounded-lg overflow-hidden border border-indigo-500/20 mb-6">
                  <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                    {/* Billboard preview with or without AR */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1467232000992-fcf145ab0b07')] bg-cover bg-center opacity-60">
                      {/* Simulated outdoor environment */}
                    </div>
                    
                    {/* Billboard physical structure */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] perspective-1000">
                      {/* Billboard frame */}
                      <div className="absolute inset-0 border-8 border-gray-800 bg-black/20 rounded-sm shadow-xl transform rotate-y-5 preserve-3d">
                        {/* Billboard content */}
                        {selectedBillboard.mediaType === 'image' ? (
                          <div 
                            className="absolute inset-0 bg-cover bg-center" 
                            style={{ backgroundImage: `url(${selectedBillboard.url})` }}
                          ></div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-black">
                            <div className="w-full h-full relative">
                              <div 
                                className="absolute inset-0 bg-cover bg-center" 
                                style={{ backgroundImage: `url(${selectedBillboard.url})` }}
                              ></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-16 w-16 rounded-full bg-white/30 flex items-center justify-center">
                                  <div className="h-12 w-12 rounded-full bg-white/60 flex items-center justify-center">
                                    <Video className="h-6 w-6 text-white" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* AR elements overlay */}
                      {showArPreview && (
                        <>
                          {/* 3D product floating out */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-z-40 w-[180px] h-[180px] animate-float-slow preserve-3d rotate-y-15">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-blue-600/80 rounded-lg shadow-lg preserve-3d rotate-y-15 translate-z-8"></div>
                            
                            {/* Product details */}
                            <div className="absolute -right-40 top-0 transform rotate-10 z-20">
                              <div className="bg-white/10 backdrop-blur-md p-3 rounded-md border border-white/30 w-[120px]">
                                <div className="text-xs text-white font-medium mb-1">Product Features</div>
                                <div className="text-[10px] text-white/80">• High Resolution</div>
                                <div className="text-[10px] text-white/80">• Water Resistant</div>
                                <div className="text-[10px] text-white/80">• 24hr Battery</div>
                              </div>
                              
                              {/* Connection line */}
                              <div className="absolute h-[1px] w-16 bg-gradient-to-r from-white/80 to-transparent top-6 -left-16"></div>
                            </div>
                            
                            {/* Call-to-action button */}
                            <div className="absolute -left-20 bottom-10 z-20">
                              <div className="bg-primary/70 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-primary/50 animate-pulse-slow">
                                <div className="text-xs text-white font-bold">Buy Now</div>
                                <div className="text-[10px] text-white/90">$299.99</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Floating AR UI elements */}
                          <div className="absolute bottom-1/4 right-1/4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/30 animate-float-medium">
                            <Download className="h-4 w-4 text-white" />
                          </div>
                          
                          <div className="absolute top-1/3 left-1/4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/30 animate-float-fast">
                            <Eye className="h-4 w-4 text-white" />
                          </div>
                          
                          {/* AR interface overlay */}
                          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[200px] bg-black/40 backdrop-blur-md rounded-lg border border-white/20 p-2 text-center">
                            <div className="text-xs text-white">Tap elements to interact</div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Controls */}
                    <div className="absolute bottom-4 right-4">
                      <Button
                        size="sm"
                        variant={showArPreview ? "default" : "outline"}
                        onClick={toggleArPreview}
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        {showArPreview ? (
                          <>
                            <Layers3 className="h-4 w-4 mr-2" />
                            Disable AR Preview
                          </>
                        ) : (
                          <>
                            <Cuboid className="h-4 w-4 mr-2" />
                            Enable AR Preview
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {/* Billboard info */}
                    <div className="absolute top-4 left-4 bg-background/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${showArPreview ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                        <span className="text-xs font-medium text-white">{showArPreview ? 'AR Preview Active' : 'Standard Preview'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Billboard details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/20 p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">Billboard Details</h3>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-muted-foreground">Name:</dt>
                      <dd>{selectedBillboard.name}</dd>
                      <dt className="text-muted-foreground">Type:</dt>
                      <dd className="capitalize">{selectedBillboard.type}</dd>
                      <dt className="text-muted-foreground">Dimensions:</dt>
                      <dd>{selectedBillboard.dimensions}</dd>
                      <dt className="text-muted-foreground">Format:</dt>
                      <dd className="capitalize">{selectedBillboard.mediaType}</dd>
                    </dl>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-lg border border-border">
                    <h3 className="font-medium mb-2">AR Enhancement</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This billboard design is compatible with our AR technology.
                      Users scanning it will see interactive 3D elements and promotions.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-green-500/20 rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs">AR-ready design</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    className="flex-1 gap-2"
                    onClick={toggleArPreview}
                  >
                    {showArPreview ? <Layers3 className="h-4 w-4" /> : <Cuboid className="h-4 w-4" />}
                    {showArPreview ? "Disable AR Preview" : "Enable AR Preview"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setActiveTab("upload")}
                  >
                    <Upload className="h-4 w-4" />
                    Upload New Design
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
      
      {/* CSS for 3D effects */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-5 {
          transform: rotateY(5deg);
        }
        .rotate-y-15 {
          transform: rotateY(15deg);
        }
        .rotate-10 {
          transform: rotate(10deg);
        }
        .translate-z-8 {
          transform: translateZ(8px);
        }
        .translate-z-40 {
          transform: translateZ(40px);
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(-50%, -50%) translateZ(40px) rotateY(15deg); }
          50% { transform: translate(-50%, -60%) translateZ(60px) rotateY(25deg); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px) translateX(5px); }
        }
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </Card>
  );
};

export default BillboardUploader;
