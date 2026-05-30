import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  select, 
  geoEquirectangular, 
  geoPath, 
  zoom as d3Zoom, 
  json, 
  zoomTransform 
} from 'd3';
import * as topojson from 'topojson-client';
import { MAJOR_FEATURES, MOCK_CUSTOMERS } from '@/lib/constants'
import { Customer } from '@/lib/types';

interface WorldMapProps {}

export const WorldMap: React.FC<WorldMapProps> = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 960, height: 600 });
  
  // Tooltip State
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: React.ReactNode;
    type: 'simple' | 'card';
  }>({ visible: false, x: 0, y: 0, content: null, type: 'simple' });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.clientWidth,
          height: wrapperRef.current.clientHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Init
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderMap = useCallback(async () => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const { width, height } = dimensions;

    // --- PROJECTION SETUP ---
    const projection = geoEquirectangular()
      .scale(width / 6.28)
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    // --- DEFS (For Avatar Clipping) ---
    const defs = svg.append("defs");
    const pinPath = "M0,0 C-6,-8 -12,-8 -12,-16 C-12,-22 -6,-28 0,-28 C6,-28 12,-22 12,-16 C12,-8 6,-8 0,0 Z";
    
    defs.append("clipPath")
        .attr("id", "drop-clip")
        .append("path")
        .attr("d", pinPath);

    // --- ZOOM BEHAVIOR ---
    const zoomGroup = svg.append('g');
    
    const zoom = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
        
        // Scale stroke width inversely
        zoomGroup.selectAll('path.country').attr('stroke-width', 1 / event.transform.k);
        
        // Scale Avatars (Groups) to stay constant size
        zoomGroup.selectAll('g.avatar').attr('transform', function(d: any) {
             const coords = projection([d.location.lng, d.location.lat]);
             if (!coords) return "";
             const scale = 1 / event.transform.k; 
             return `translate(${coords[0]},${coords[1]}) scale(${scale})`;
        });

        // Scale Feature Hitboxes (Seas)
        zoomGroup.selectAll('circle.feature-hitbox').attr('r', 15 / event.transform.k);

        // Scale Ocean Labels
        zoomGroup.selectAll('text.ocean-label').attr('font-size', (d) => {
             return `${12 / Math.sqrt(event.transform.k)}px`;
        });
      });

    svg.call(zoom);

    // --- DATA LOADING ---
    try {
      const worldData: any = await json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
      
      const countries = topojson.feature(worldData, worldData.objects.countries) as any;
      const features = countries.features;

      // 1. Countries (Outlines Only)
      zoomGroup.selectAll("path.country")
        .data(features)
        .enter().append("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", "white") // Land is white
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("cursor", "crosshair")
        .on("mouseover", function(event, d: any) {
          // Change fill on hover
          select(this)
            .attr("fill", "#E2E8F0") 
            .attr("stroke-width", 1.5 / zoomTransform(svg.node()!).k);
            
          setTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            content: <span className="text-sm font-bold uppercase tracking-widest">{d.properties.name}</span>,
            type: 'simple'
          });
        })
        .on("mousemove", function(event) {
             setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
        })
        .on("mouseout", function() {
          // Revert fill on mouseout
          select(this)
            .attr("fill", "white")
            .attr("stroke-width", 1 / zoomTransform(svg.node()!).k);
            
          setTooltip(prev => ({ ...prev, visible: false }));
        });

      // 2. Oceans (Visible Labels)
      zoomGroup.selectAll("text.ocean-label")
        .data(MAJOR_FEATURES.filter(d => d.type === 'ocean'))
        .enter().append("text")
        .attr("class", "ocean-label")
        .attr("x", d => projection([d.lng, d.lat])?.[0] ?? 0)
        .attr("y", d => projection([d.lng, d.lat])?.[1] ?? 0)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px") // Base size reduced to small
        .attr("font-weight", "bold")
        .attr("font-family", "Space Mono, monospace")
        .attr("fill", "#155E75") // Darker Cyan/Blue text
        .attr("opacity", 0.6)
        .attr("pointer-events", "none") // Let clicks pass through to map
        .text(d => d.name);

      // 3. Seas (Invisible Hitboxes for Hover)
      zoomGroup.selectAll("circle.feature-hitbox")
        .data(MAJOR_FEATURES.filter(d => d.type === 'sea')) // Only Seas
        .enter().append("circle")
        .attr("class", "feature-hitbox")
        .attr("cx", d => projection([d.lng, d.lat])?.[0] ?? 0)
        .attr("cy", d => projection([d.lng, d.lat])?.[1] ?? 0)
        .attr("r", 15) // Initial radius
        .attr("fill", "transparent") 
        .attr("stroke", "none")
        .attr("cursor", "help")
        .on("mouseover", function(event, d) {
          setTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            content: <span className="text-lg font-bold italic text-blue-900">{d.name}</span>,
            type: 'simple'
          });
        })
        .on("mousemove", function(event) {
          setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
        })
        .on("mouseout", function() {
          setTooltip(prev => ({ ...prev, visible: false }));
        });

      // 4. Avatars (Face Images in Drop Shape)
      const avatarGroups = zoomGroup.selectAll("g.avatar")
        .data(MOCK_CUSTOMERS)
        .enter().append("g")
        .attr("class", "avatar")
        .attr("cursor", "pointer")
        .attr("transform", function(d) {
             const coords = projection([d.location.lng, d.location.lat]);
             return coords ? `translate(${coords[0]},${coords[1]})` : "translate(-999,-999)";
        });

      // Background/Border of the drop
      avatarGroups.append("path")
        .attr("d", pinPath)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);

      // The Image clipped to the drop shape
      avatarGroups.append("image")
        .attr("href", (d) => d.avatarUrl || "")
        .attr("x", -12)
        .attr("y", -28)
        .attr("width", 24)
        .attr("height", 28)
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("clip-path", "url(#drop-clip)");

      // Hover events on the group
      avatarGroups
        .on("mouseover", function(event, d) {
          select(this).selectAll("path").attr("stroke-width", 2.5);
          
          setTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            type: 'card',
            content: (
              <div className="w-52 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-blue-100">
                 <div className="flex items-center gap-3 mb-3 pb-2 border-b border-gray-100">
                    <img src={d.avatarUrl} alt={d.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover shadow-sm" />
                    <div>
                        <span className="font-bold text-sm block text-gray-900">{d.name}</span>
                        <span className="text-xs text-gray-500 font-medium">{d.plan} tier</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-y-1 text-xs text-gray-600">
                    <span>Revenue</span>
                    <span className="font-mono font-bold text-right text-black">{d.revenue}</span>
                    <span>Status</span>
                    <span className="text-right capitalize">{d.status}</span>
                </div>
              </div>
            )
          });
        })
        .on("mousemove", function(event) {
             setTooltip(prev => ({ ...prev, x: event.clientX, y: event.clientY }));
        })
        .on("mouseout", function() {
          select(this).selectAll("path").attr("stroke-width", 1.5);
          setTooltip(prev => ({ ...prev, visible: false }));
        });

    } catch (error) {
      console.error("Error loading map data:", error);
    }
  }, [dimensions]);

  useEffect(() => {
    renderMap();
  }, [renderMap]);

  return (
    <div 
      ref={wrapperRef} 
      className="w-full h-full bg-[#CAF0F8] map-container overflow-hidden relative cursor-grab active:cursor-grabbing"
    >
      <svg ref={svgRef} width="100%" height="100%" className="block touch-action-none"></svg>
      
      {/* Dynamic Tooltip */}
      {tooltip.visible && (
        <div 
          className={`fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[120%] transition-opacity duration-75
            ${tooltip.type === 'simple' ? 'text-black' : ''}
          `}
          style={{ 
            left: tooltip.x, 
            top: tooltip.y,
            textShadow: tooltip.type === 'simple' ? '0px 0px 8px rgba(255,255,255,0.8), 0px 0px 4px rgba(255,255,255,1)' : 'none'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};