import { FC, useState } from "react";
import { ChevronDown, ChevronRight, Move, Palette, Brush, Grid3X3, Gem, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";

const fabricSwatches = [
  { name: "Premium Gabardine", color: "linear-gradient(135deg, #d4a574 0%, #c4956a 50%, #b8875c 100%)" },
  { name: "Organic Cotton", color: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f0f0f0 100%)" },
  { name: "Premium Cotton", color: "linear-gradient(135deg, #f5e6d3 0%, #ebe0d0 50%, #e8dcc8 100%)" },
  { name: "Fine Jersey", color: "linear-gradient(135deg, #8b6914 0%, #a67c00 50%, #c49102 100%)" },
  { name: "Premium Linen", color: "linear-gradient(135deg, #6b7c4c 0%, #7d8f5c 50%, #8fa26c 100%)" },
];

const fabricCategories = [
  "STRUCTURED / TECHNICAL",
  "LIGHTWEIGHT / DRAPING",
  "ECO-MATERIALS",
  "ACCENTS / STYLISTIC",
];

const colorSwatches = [
  { category: "NEUTRALS", colors: ["#1a1a1a", "#3d3d3d", "#6b6b6b", "#9e9e9e", "#d4d4d4", "#f5f5f5"] },
  { category: "EARTH TONES", colors: ["#8b4513", "#a0522d", "#cd853f", "#d2691e", "#deb887", "#f4a460"] },
  { category: "DEEP & RICH", colors: ["#2c1810", "#3d2518", "#5c3a28", "#8b6b4a", "#b8956a", "#d4a574"] },
];

const tools = [
  { icon: Move, label: "MOVE" },
  { icon: Palette, label: "COLOR" },
  { icon: Brush, label: "BRUSH" },
  { icon: Grid3X3, label: "PATTERN" },
  { icon: Gem, label: "ACCESSORIES" },
  { icon: Eraser, label: "ERASER" },
];

// Blazer SVG Silhouette
const BlazerSilhouette: FC = () => (
  <svg 
    viewBox="0 0 200 280" 
    className="w-full h-full max-w-[280px] mx-auto"
    fill="none"
    stroke="hsl(var(--primary))"
    strokeWidth="1"
    style={{ filter: 'drop-shadow(0 0 20px hsl(30, 52%, 64%, 0.3))' }}
  >
    {/* Collar */}
    <path d="M70 40 L100 70 L130 40" strokeWidth="1.5" />
    {/* Lapels */}
    <path d="M70 40 L50 90 L70 100 L85 70 L100 90" strokeWidth="1.5" />
    <path d="M130 40 L150 90 L130 100 L115 70 L100 90" strokeWidth="1.5" />
    {/* Shoulders */}
    <path d="M50 90 L30 95 L25 100" strokeWidth="1.5" />
    <path d="M150 90 L170 95 L175 100" strokeWidth="1.5" />
    {/* Body */}
    <path d="M25 100 L20 200 L45 210 L80 200 L100 205 L120 200 L155 210 L180 200 L175 100" strokeWidth="1.5" />
    {/* Sleeves */}
    <path d="M25 100 L15 180 L35 185 L45 105" strokeWidth="1" opacity="0.7" />
    <path d="M175 100 L185 180 L165 185 L155 105" strokeWidth="1" opacity="0.7" />
    {/* Buttons */}
    <circle cx="100" cy="130" r="4" fill="hsl(var(--primary))" opacity="0.5" />
    <circle cx="100" cy="160" r="4" fill="hsl(var(--primary))" opacity="0.5" />
    {/* Pocket details */}
    <path d="M60 150 L85 150" strokeWidth="1" opacity="0.5" />
    <path d="M115 150 L140 150" strokeWidth="1" opacity="0.5" />
    {/* Center seam */}
    <path d="M100 90 L100 205" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
  </svg>
);

export const FashionTechSection: FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("BASICS (BASEWEAR)");
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [selectedTool, setSelectedTool] = useState(0);
  const whatsappLink = "https://wa.me/2347039178489?text=Hi%20Ace%20Wardrobe!%20I'm%20interested%20in%20the%203D%20Fashion%20Experience";

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-mono tracking-[0.3em] text-primary mb-4">
            // FASHION TECH
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Experience Fashion in <span className="text-shimmer">3D</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your vision. Choose your fabric. See it come to life.
          </p>
        </div>

        {/* Main Content - with Coming Soon Overlay */}
        <div className="relative">
          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-[2px] bg-background/30 rounded-2xl">
            <div className="text-center">
              <div className="inline-block px-6 py-3 bg-primary/20 border border-primary rounded-full mb-4">
                <span className="font-mono text-sm tracking-[0.2em] text-primary font-semibold">
                  COMING SOON
                </span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Be among the first to experience our revolutionary 3D fashion platform
              </p>
            </div>
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-5 gap-6 mb-8">
            {/* LEFT SIDE - Control Panel (40%) */}
            <div className="lg:col-span-2 space-y-4">
              {/* Control Panel Card */}
              <div className="fashion-tech-card p-5 rounded-xl relative">
                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-primary/30" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-primary/30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-primary/30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-primary/30" />
                
                {/* Coordinate Numbers */}
                <span className="absolute top-2 right-8 text-[8px] font-mono text-muted-foreground/50">
                  X: 0.00
                </span>
                <span className="absolute bottom-2 left-8 text-[8px] font-mono text-muted-foreground/50">
                  Y: 0.00
                </span>

                {/* Fabric Gallery Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono tracking-[0.2em] text-primary">
                    FABRIC GALLERY
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground">v2.1</span>
                </div>

                {/* Basics Section - Expanded */}
                <div className="space-y-3">
                  <button 
                    onClick={() => setExpandedCategory(expandedCategory === "BASICS (BASEWEAR)" ? null : "BASICS (BASEWEAR)")}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <span className="text-xs font-medium tracking-wider text-foreground">
                      BASICS (BASEWEAR)
                    </span>
                    {expandedCategory === "BASICS (BASEWEAR)" ? (
                      <ChevronDown size={14} className="text-muted-foreground" />
                    ) : (
                      <ChevronRight size={14} className="text-muted-foreground" />
                    )}
                  </button>

                  {expandedCategory === "BASICS (BASEWEAR)" && (
                    <div className="space-y-2 pl-2">
                      {fabricSwatches.map((fabric, index) => (
                        <button
                          key={fabric.name}
                          onClick={() => setSelectedFabric(index)}
                          className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                            selectedFabric === index 
                              ? 'bg-primary/10 border border-primary/30' 
                              : 'hover:bg-secondary/50'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-md flex-shrink-0 border border-border/50"
                            style={{ background: fabric.color }}
                          />
                          <span className="text-xs text-foreground/80 text-left">
                            {fabric.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Collapsed Categories */}
                  {fabricCategories.map((category) => (
                    <button
                      key={category}
                      className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/30 transition-colors"
                    >
                      <span className="text-xs font-medium tracking-wider text-muted-foreground">
                        {category}
                      </span>
                      <ChevronRight size={14} className="text-muted-foreground/50" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - 3D Preview (60%) */}
            <div className="lg:col-span-3">
              <div className="fashion-tech-card p-6 rounded-xl relative h-full min-h-[400px] flex flex-col">
                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-primary/30" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-primary/30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-primary/30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-primary/30" />

                {/* Technical Markers */}
                <span className="absolute top-3 left-8 text-[8px] font-mono text-muted-foreground/50">
                  + 3D PREVIEW
                </span>
                <span className="absolute top-3 right-8 text-[8px] font-mono text-muted-foreground/50">
                  RENDER: ON
                </span>

                {/* Grid Background */}
                <div className="absolute inset-6 opacity-10 rounded-lg overflow-hidden">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px),
                        linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px'
                    }}
                  />
                </div>

                {/* Blazer Preview */}
                <div className="flex-1 flex items-center justify-center relative z-10 py-8">
                  <BlazerSilhouette />
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-border/30">
                  <div className="flex items-center gap-1">
                    {tools.map((tool, index) => (
                      <button
                        key={tool.label}
                        onClick={() => setSelectedTool(index)}
                        className={`p-2 rounded-lg transition-all ${
                          selectedTool === index
                            ? 'bg-primary/20 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        }`}
                        title={tool.label}
                      >
                        <tool.icon size={16} />
                      </button>
                    ))}
                  </div>
                  <Button variant="solid" size="sm" className="text-xs">
                    GET A QUOTE
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Color Selector Row */}
          <div className="fashion-tech-card p-5 rounded-xl relative">
            {/* Corner Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-primary/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-primary/30" />
            
            <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
              {colorSwatches.map((group) => (
                <div key={group.category} className="flex-shrink-0">
                  <span className="text-[10px] font-mono tracking-wider text-muted-foreground mb-2 block">
                    {group.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {group.colors.map((color, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-transparent hover:border-primary/50 transition-all hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Be the first to experience 3D fashion
          </h3>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:border-b-2 focus:border-b-primary focus:rounded-b-none transition-all"
              />
              <Button variant="solid" size="lg">
                Notify Me
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Or{" "}
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                message us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
