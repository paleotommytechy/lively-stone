import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Globe as GlobeIcon, BookOpen, ChevronRight, ChevronLeft, Flame, X, ShieldCheck, MapPin } from 'lucide-react';

export interface SalvationScripture {
  id: string;
  reference: string;
  theme: string;
  text: string;
  location: string;
  region: string;
}

const SALVATION_SCRIPTURES: SalvationScripture[] = [
  {
    id: 'hab-2-14',
    reference: 'Habakkuk 2:14',
    theme: "Glory of God Filling the Earth",
    text: "For the earth will be filled with the knowledge of the glory of the LORD as the waters cover the sea.",
    location: "Global Waters & Continents",
    region: "Worldwide"
  },
  {
    id: 'isa-45-22',
    reference: 'Isaiah 45:22',
    theme: "Universal Call to Salvation",
    text: "Turn to me and be saved, all you ends of the earth; for I am God, and there is no other.",
    location: "Ends of the Earth",
    region: "All Nations"
  },
  {
    id: 'psalm-72-19',
    reference: 'Psalm 72:19',
    theme: "Eternal Dominion & Glory",
    text: "Praise be to His glorious name forever; may the whole earth be filled with His glory. Amen and Amen.",
    location: "Royal Nations",
    region: "Global Realm"
  },
  {
    id: 'john-3-16',
    reference: 'John 3:16',
    theme: "God's Love for the World",
    text: "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.",
    location: "Every Tribe & Tongue",
    region: "Global Harvest"
  },
  {
    id: 'psalm-67-1-2',
    reference: 'Psalm 67:1-2',
    theme: "Salvation Among All Nations",
    text: "May God be gracious to us and bless us and make His face shine on us—so that Your ways may be known on earth, Your salvation among all nations.",
    location: "Apostolic Territories",
    region: "Territorial Harvest"
  },
  {
    id: 'acts-1-8',
    reference: 'Acts 1:8',
    theme: "Power for Territorial Discipleship",
    text: "You will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, Judea, Samaria, and to the ends of the earth.",
    location: "Campus & Secondary Outreaches",
    region: "Global Mandate"
  },
  {
    id: 'mal-1-11',
    reference: 'Malachi 1:11',
    theme: "Apostolic Worship Everywhere",
    text: "My name will be great among the nations, from where the sun rises to where it sets.",
    location: "Rising to Setting Sun",
    region: "East to West"
  },
  {
    id: 'isa-11-9',
    reference: 'Isaiah 11:9',
    theme: "Knowledge of the Lord",
    text: "They will neither harm nor destroy on all my holy mountain, for the earth will be full of the knowledge of the LORD as the waters cover the sea.",
    location: "Holy Mountain & Nations",
    region: "Kingdom Dominion"
  }
];

export interface CountryData {
  id: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  region: string;
  scriptureIdx: number;
}

const WORLD_COUNTRIES: CountryData[] = [
  { id: 'ng', name: 'Nigeria', code: 'NG', lat: 9.08, lon: 8.67, region: 'Africa', scriptureIdx: 0 },
  { id: 'il', name: 'Israel (Jerusalem)', code: 'IL', lat: 31.76, lon: 35.21, region: 'Middle East', scriptureIdx: 5 },
  { id: 'us', name: 'United States', code: 'US', lat: 37.09, lon: -95.71, region: 'North America', scriptureIdx: 1 },
  { id: 'gb', name: 'United Kingdom', code: 'UK', lat: 55.37, lon: -3.43, region: 'Europe', scriptureIdx: 4 },
  { id: 'br', name: 'Brazil', code: 'BR', lat: -14.23, lon: -51.92, region: 'South America', scriptureIdx: 3 },
  { id: 'in', name: 'India', code: 'IN', lat: 20.59, lon: 78.96, region: 'Asia', scriptureIdx: 6 },
  { id: 'za', name: 'South Africa', code: 'ZA', lat: -30.55, lon: 22.93, region: 'Africa', scriptureIdx: 2 },
  { id: 'au', name: 'Australia', code: 'AU', lat: -25.27, lon: 133.77, region: 'Oceania', scriptureIdx: 7 },
  { id: 'kr', name: 'South Korea', code: 'KR', lat: 35.90, lon: 127.76, region: 'Asia', scriptureIdx: 0 },
  { id: 'de', name: 'Germany', code: 'DE', lat: 51.16, lon: 10.45, region: 'Europe', scriptureIdx: 1 },
  { id: 'ca', name: 'Canada', code: 'CA', lat: 56.13, lon: -106.34, region: 'North America', scriptureIdx: 2 },
  { id: 'ke', name: 'Kenya', code: 'KE', lat: -1.29, lon: 36.82, region: 'Africa', scriptureIdx: 4 },
];

// Simplified continent landmass shapes (lat/lon loops)
const CONTINENT_POLYGONS = [
  // North America
  [
    { lat: 70, lon: -160 }, { lat: 70, lon: -60 }, { lat: 45, lon: -60 },
    { lat: 30, lon: -80 }, { lat: 15, lon: -90 }, { lat: 25, lon: -115 },
    { lat: 55, lon: -130 }, { lat: 60, lon: -165 }
  ],
  // South America
  [
    { lat: 12, lon: -75 }, { lat: -5, lon: -35 }, { lat: -35, lon: -55 },
    { lat: -55, lon: -68 }, { lat: -20, lon: -70 }, { lat: 0, lon: -80 }
  ],
  // Africa
  [
    { lat: 35, lon: -10 }, { lat: 30, lon: 32 }, { lat: 10, lon: 50 },
    { lat: -34, lon: 20 }, { lat: -10, lon: 40 }, { lat: 5, lon: 10 },
    { lat: 15, lon: -17 }
  ],
  // Europe
  [
    { lat: 70, lon: 20 }, { lat: 60, lon: 30 }, { lat: 45, lon: 40 },
    { lat: 38, lon: 25 }, { lat: 36, lon: -10 }, { lat: 50, lon: -5 }, { lat: 60, lon: 5 }
  ],
  // Asia
  [
    { lat: 70, lon: 60 }, { lat: 75, lon: 170 }, { lat: 50, lon: 140 },
    { lat: 22, lon: 120 }, { lat: 10, lon: 100 }, { lat: 8, lon: 77 },
    { lat: 25, lon: 65 }, { lat: 40, lon: 50 }, { lat: 55, lon: 60 }
  ],
  // Australia
  [
    { lat: -12, lon: 130 }, { lat: -15, lon: 145 }, { lat: -38, lon: 150 },
    { lat: -35, lon: 115 }, { lat: -22, lon: 114 }
  ]
];

export const GlobeAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(WORLD_COUNTRIES[0]);

  // AB.jpg hover popup & fade state
  const [abPopupState, setAbPopupState] = useState<'hidden' | 'visible' | 'fading'>('hidden');

  const rotationRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeScripture = SALVATION_SCRIPTURES[currentIndex];

  // Auto rotate scriptures every 8s if popup not open
  useEffect(() => {
    if (showPopup) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SALVATION_SCRIPTURES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [showPopup]);

  // Handle Hover state for AB.jpg pop-up then fade out gradually
  const handleMouseEnter = () => {
    setIsHovered(true);
    setAbPopupState('visible');

    // Clear any previous fade out timers
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    // After 2.8 seconds of hover, start gradual fade out
    hoverTimerRef.current = setTimeout(() => {
      setAbPopupState('fading');
      // After fade animation finishes (1s later), hide completely
      hoverTimerRef.current = setTimeout(() => {
        setAbPopupState('hidden');
      }, 1000);
    }, 2800);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // On mouse leave, initiate fade out if still visible
    if (abPopupState === 'visible') {
      setAbPopupState('fading');
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => {
        setAbPopupState('hidden');
      }, 1000);
    }
  };

  // 3D Globe Rendering Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = 340);
    let height = (canvas.height = 340);
    const radius = 135;
    const centerX = width / 2;
    const centerY = height / 2;
    const tilt = (23.5 * Math.PI) / 180; // 23.5 deg Earth axial tilt

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Speed up rotation when hovered
      const speed = isHovered ? 0.009 : 0.0035;
      rotationRef.current += speed;
      const rot = rotationRef.current;

      // 1. Outer Atmosphere Glow Gradient
      const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius * 1.25);
      if (isHovered) {
        outerGlow.addColorStop(0, 'rgba(59, 130, 246, 0.45)');
        outerGlow.addColorStop(0.5, 'rgba(234, 179, 8, 0.35)');
        outerGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');
      } else {
        outerGlow.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
        outerGlow.addColorStop(1, 'rgba(30, 58, 138, 0)');
      }
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. 3D Ocean Sphere Base
      const oceanGrad = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      oceanGrad.addColorStop(0, '#1E3A8A');
      oceanGrad.addColorStop(0.5, '#0F172A');
      oceanGrad.addColorStop(0.95, '#090D16');
      oceanGrad.addColorStop(1, '#3B82F6');

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // Clip to sphere for 3D globe surface rendering
      ctx.clip();

      // Helper 3D Projection function (lat, lon) -> (screenX, screenY, zDepth)
      const project3D = (lat: number, lon: number) => {
        const radLat = (lat * Math.PI) / 180;
        const radLon = ((lon * Math.PI) / 180) + rot;

        // Coordinates on un-tilted sphere
        let x = Math.cos(radLat) * Math.sin(radLon);
        let y = Math.sin(radLat);
        let z = Math.cos(radLat) * Math.cos(radLon);

        // Apply axial tilt around X axis
        const yTilted = y * Math.cos(tilt) - z * Math.sin(tilt);
        const zTilted = y * Math.sin(tilt) + z * Math.cos(tilt);

        return {
          sx: centerX + radius * x,
          sy: centerY - radius * yTilted,
          z: zTilted // > 0 means visible on front hemisphere
        };
      };

      // 3. 3D Graticule Grid Lines (Latitudes & Longitudes)
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = isHovered ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.25)';

      // Latitude circles (-60 to 60)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 10) {
          const p = project3D(lat, lon);
          if (p.z > 0) {
            if (first) { ctx.moveTo(p.sx, p.sy); first = false; }
            else { ctx.lineTo(p.sx, p.sy); }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Longitude meridians (-180 to 180)
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 10) {
          const p = project3D(lat, lon);
          if (p.z > 0) {
            if (first) { ctx.moveTo(p.sx, p.sy); first = false; }
            else { ctx.lineTo(p.sx, p.sy); }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 4. Draw 3D Realistic Continent Polygons & Fill
      CONTINENT_POLYGONS.forEach((poly) => {
        ctx.beginPath();
        let visibleCount = 0;
        poly.forEach((pt, i) => {
          const p = project3D(pt.lat, pt.lon);
          if (p.z > 0) visibleCount++;
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        });
        ctx.closePath();

        if (visibleCount > 2) {
          ctx.fillStyle = isHovered ? 'rgba(59, 130, 246, 0.55)' : 'rgba(37, 99, 235, 0.45)';
          ctx.strokeStyle = isHovered ? '#93C5FD' : '#60A5FA';
          ctx.lineWidth = 1.2;
          ctx.fill();
          ctx.stroke();
        }
      });

      // 5. 3D Country Pins & Labels (Visible on Front Hemisphere z > 0)
      WORLD_COUNTRIES.forEach((country) => {
        const p = project3D(country.lat, country.lon);

        if (p.z > 0.15) { // Visible on front of 3D sphere
          const isSelected = selectedCountry?.id === country.id;

          // Glowing Node Dot
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, isSelected ? 5.5 : 3.5, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? '#F59E0B' : '#60A5FA';
          ctx.shadowColor = isSelected ? '#F59E0B' : '#3B82F6';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0; // reset shadow

          // Pin Pulse Ring
          const pulseSize = (Date.now() / 300) % 1;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 4 + pulseSize * 8, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected ? `rgba(245, 158, 11, ${1 - pulseSize})` : `rgba(96, 165, 250, ${0.8 - pulseSize})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Country Name Badge Label (if hovered or selected)
          if (isHovered || isSelected) {
            ctx.font = 'bold 9px sans-serif';
            const textWidth = ctx.measureText(country.name).width;

            ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = isSelected ? 'rgba(245, 158, 11, 0.8)' : 'rgba(59, 130, 246, 0.5)';
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.roundRect(p.sx + 8, p.sy - 10, textWidth + 10, 16, 4);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = isSelected ? '#FDE047' : '#FFFFFF';
            ctx.fillText(country.name, p.sx + 13, p.sy + 2);
          }
        }
      });

      // 6. 3D Spherical Shadow Shading (Simulate Sun Direction & Depth)
      const shadowGrad = ctx.createRadialGradient(
        centerX + radius * 0.4,
        centerY + radius * 0.4,
        radius * 0.4,
        centerX,
        centerY,
        radius
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.7, 'rgba(5, 10, 25, 0.4)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.85)');

      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 7. Specular Rim Ring Shading
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? 'rgba(253, 224, 71, 0.6)' : 'rgba(96, 165, 250, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore(); // Restore Canvas Clip

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isHovered, selectedCountry]);

  // Handle Canvas Click to select closest country pin or trigger scripture popup
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 135;
    const rot = rotationRef.current;
    const tilt = (23.5 * Math.PI) / 180;

    // Find clicked country pin
    let closestCountry: CountryData | null = null;
    let minDistance = 28; // Click threshold distance

    WORLD_COUNTRIES.forEach((c) => {
      const radLat = (c.lat * Math.PI) / 180;
      const radLon = ((c.lon * Math.PI) / 180) + rot;
      const x = Math.cos(radLat) * Math.sin(radLon);
      const y = Math.sin(radLat);
      const z = Math.cos(radLat) * Math.cos(radLon);

      const yTilted = y * Math.cos(tilt) - z * Math.sin(tilt);
      const zTilted = y * Math.sin(tilt) + z * Math.cos(tilt);

      if (zTilted > 0) {
        const sx = centerX + radius * x;
        const sy = centerY - radius * yTilted;
        const dist = Math.hypot(clickX - sx, clickY - sy);
        if (dist < minDistance) {
          minDistance = dist;
          closestCountry = c;
        }
      }
    });

    if (closestCountry) {
      setSelectedCountry(closestCountry);
      setCurrentIndex((closestCountry as CountryData).scriptureIdx);
    } else {
      // Cycle scripture if clicked on open globe body
      setCurrentIndex((prev) => (prev + 1) % SALVATION_SCRIPTURES.length);
    }

    setShowPopup(true);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % SALVATION_SCRIPTURES.length;
    setCurrentIndex(nextIdx);
    // update country if matching
    const matchingCountry = WORLD_COUNTRIES.find(c => c.scriptureIdx === nextIdx);
    if (matchingCountry) setSelectedCountry(matchingCountry);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + SALVATION_SCRIPTURES.length) % SALVATION_SCRIPTURES.length;
    setCurrentIndex(prevIdx);
    const matchingCountry = WORLD_COUNTRIES.find(c => c.scriptureIdx === prevIdx);
    if (matchingCountry) setSelectedCountry(matchingCountry);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[420px] select-none py-2">

      {/* Convener Spotlight Overlay Banner */}
      <div className={`transition-all duration-500 transform ${isHovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-90 -translate-y-1'}`}>
        <div className="flex items-center gap-3 p-2.5 pr-4 rounded-full glass-pill border border-amber-400/40 text-white shadow-xl backdrop-blur-xl">
          <img 
            src="/AB.jpg" 
            alt="Saint Abraham Babatunde" 
            className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-amber-400/80 shadow-md"
          />
          <div className="pr-2 space-y-0.5">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[9px] font-mono font-extrabold tracking-wider uppercase">
              <Sparkles className="w-2.5 h-2.5 animate-spin-slow" />
              CONVENER SPOTLIGHT
            </div>
            <h4 className="text-xs font-extrabold text-white">Saint Abraham Babatunde</h4>
            <p className="text-[10px] text-cyan-300 font-medium">School of Tyrannus Mandate</p>
          </div>
        </div>
      </div>

      {/* Main 3D Globe Canvas Container */}
      <div
        className="relative group cursor-pointer z-10 flex flex-col items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Halo Glow Ring */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-700 pointer-events-none ${isHovered
            ? 'bg-gradient-to-r from-blue-500/30 via-amber-400/30 to-indigo-600/40 blur-3xl scale-110'
            : 'bg-gradient-to-r from-blue-600/20 to-indigo-500/15 blur-2xl'
            }`}
        />

        {/* 3D Rendered Canvas */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="relative z-10 transition-transform duration-500 hover:scale-105 active:scale-98 drop-shadow-2xl"
          title="Click any country pin or globe to open Salvation & Glory scriptures"
        />

        {/* Interactive Hover Hint Badge */}
        <div className="absolute bottom-1 px-4 py-1.5 rounded-full glass-pill border border-blue-400/40 text-white text-[10px] font-mono font-semibold shadow-xl backdrop-blur-xl flex items-center gap-2 z-20">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>{isHovered ? "CLICK PINS FOR SALVATION SCRIPTURES" : "HOVER & ROTATE GLOBE"}</span>
        </div>
      </div>

      {/* Scripture Popup Modal / Glass Card */}
      <div className={`mt-5 w-full max-w-md transition-all duration-500 transform ${showPopup ? 'scale-100 opacity-100 translate-y-0' : 'scale-98 opacity-95 translate-y-1'
        }`}>
        <div className="relative overflow-hidden rounded-3xl ios-glass-card border border-amber-400/50 p-5 shadow-2xl backdrop-blur-2xl text-white space-y-3">

          {/* Top Bar: Country & Scripture Reference */}
          <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-extrabold text-xs shadow-inner">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-widest block">
                  {activeScripture.theme}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{activeScripture.reference}</span>
                  {selectedCountry && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-[10px] text-amber-300 font-mono font-medium flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {selectedCountry.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-xl glass-pill hover:bg-white/20 text-white transition-colors"
                title="Previous Scripture"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-300 font-mono px-1">
                {currentIndex + 1}/{SALVATION_SCRIPTURES.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-xl glass-pill hover:bg-white/20 text-white transition-colors"
                title="Next Scripture"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {showPopup && (
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors ml-1"
                  title="Close popup"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Scripture Verse Quote */}
          <p className="text-xs sm:text-sm text-slate-100 italic leading-relaxed font-serif pl-3 border-l-2 border-amber-400 py-0.5">
            "{activeScripture.text}"
          </p>

          {/* Footer details & Country Navigation */}
          <div className="flex items-center justify-between text-[10px] text-slate-300 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1 text-cyan-300 font-medium">
              <GlobeIcon className="w-3.5 h-3.5 text-amber-400" />
              {activeScripture.location} ({activeScripture.region})
            </span>
            <button
              onClick={handleNext}
              className="text-[10px] font-mono font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 uppercase tracking-wider hover:underline"
            >
              NEXT SCRIPTURE
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
