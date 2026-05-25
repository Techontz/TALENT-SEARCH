import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe2, Users, Eye, Ticket, Award, MapPin, EyeIcon } from 'lucide-react';
import { TranslationDict } from '../types';

interface GlobalNetworkProps {
  translations: TranslationDict;
}

export default function GlobalNetwork({ translations }: GlobalNetworkProps) {
  // Counters for premium stats
  const [countriesCount, setCountriesCount] = useState(0);
  const [talentsCount, setTalentsCount] = useState(0);
  const [venuesCount, setVenuesCount] = useState(0);
  const [opportunitiesCount, setOpportunitiesCount] = useState(0);

  useEffect(() => {
    // Elegant incremental counter animation simulation
    const interval = setInterval(() => {
      setCountriesCount(prev => (prev < 150 ? prev + 5 : 150));
      setTalentsCount(prev => (prev < 25 ? prev + 1 : 25));
      setVenuesCount(prev => (prev < 5 ? prev + 1 : 5));
      setOpportunitiesCount(prev => (prev < 50 ? prev + 2 : 50));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="network" 
      className="relative py-28 bg-[#090810] text-white overflow-hidden"
    >
      
      {/* Background spotlights */}
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-lime-500/5 blur-[120px]" />
      <div className="absolute bottom-[10%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: HIGH-TECH DOTTED WORLD MAP (STRICTLY INSPIRED BY THE REFERENCE) */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center relative min-h-[350px] md:min-h-[420px] bg-black/20 border border-white/5 p-4 rounded-3xl overflow-hidden group">
          
          {/* Neon Grid Layer */}
          <div className="absolute inset-0 bg-radial-to-r from-lime-500/2 to-transparent pointer-events-none" />

          {/* Electronic network lines using inline SVG */}
          <svg 
            className="w-full h-full max-h-[350px] opacity-45 group-hover:opacity-75 transition-opacity duration-1000" 
            viewBox="0 0 1000 500" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple world outline representing discrete tech grids */}
            <path
              d="M150 200 H180 M250 180 H320 M120 280 H160 M200 340 H270 M300 380 H340 M450 150 H550 M390 220 H490 M520 260 H600 M620 380 H720 M750 180 H850 M800 290 H910 M850 400 H890"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Major connecting flight paths / talent links */}
            <path 
              d="M180 200 Q 300 150, 480 180 T 820 180 M180 200 Q 380 280, 520 260 T 780 290 M520 260 Q 600 350, 680 380" 
              stroke="rgba(163,230,53,0.15)" 
              strokeWidth="1" 
              fill="none" 
            />
            {/* Dynamic flashing dots for major capital nodes: NY, Berlin, Tokyo etc */}
            <circle cx="180" cy="200" r="4" fill="#84cc16" className="animate-ping" />
            <circle cx="180" cy="200" r="3.5" fill="#a3e635" />
            <text x="195" y="204" fill="#9ca3af" fontSize="10" fontFamily="monospace">NYC</text>

            <circle cx="480" cy="180" r="4" fill="#84cc16" className="animate-ping" />
            <circle cx="480" cy="180" r="3.5" fill="#a3e635" />
            <text x="495" y="184" fill="#9ca3af" fontSize="10" fontFamily="monospace">BER</text>

            <circle cx="520" cy="260" r="4" fill="#84cc16" className="animate-ping" />
            <circle cx="520" cy="260" r="3.5" fill="#a3e635" />
            <text x="535" y="264" fill="#a3e635" fontSize="10" fontFamily="monospace">DXB</text>

            <circle cx="820" cy="180" r="4" fill="#84cc16" className="animate-ping" />
            <circle cx="820" cy="180" r="3.5" fill="#a3e635" />
            <text x="835" y="184" fill="#9ca3af" fontSize="10" fontFamily="monospace">TKY</text>

            <circle cx="780" cy="290" r="4" fill="#84cc16" className="animate-ping" />
            <circle cx="780" cy="290" r="3.5" fill="#a3e635" />
            <text x="795" y="294" fill="#9ca3af" fontSize="10" fontFamily="monospace">SYD</text>
          </svg>

          {/* Mini overlay HUD data */}
          <div className="absolute bottom-5 left-5 flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono">
            <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
            <span>LATENCY: ZERO DISTORTION DEPLOYMENT</span>
          </div>
        </div>

        {/* RIGHT COLUMN: TEXT STATS GRID WITH ICON HEADERS */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          
          {/* Header */}
          <div className="mb-10 lg:pl-4">
            <span className="text-lime-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
              <span className="w-1 h-1 bg-lime-400 rounded-full" />
              RISING STARS GLOBE
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight">
              {translations.network.heading}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-green-400 inline-block">
                {translations.network.headingAccent}
              </span>
            </h2>
          </div>

          {/* Grid structure of metrics */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 pl-2">
            
            {/* Stat 1 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-lime-950/40 border border-lime-500/10 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                <Globe2 className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight mt-2 text-white">
                {countriesCount}+
              </p>
              <p className="text-gray-400 text-xs font-semibold tracking-wide uppercase">
                {translations.network.countries}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-lime-950/40 border border-lime-500/10 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight mt-2 text-white">
                {talentsCount}K+
              </p>
              <p className="text-gray-400 text-xs font-semibold tracking-wide uppercase">
                {translations.network.talents}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-lime-950/40 border border-lime-500/10 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                <Eye className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight mt-2 text-white">
                {venuesCount}K+
              </p>
              <p className="text-gray-400 text-xs font-semibold tracking-wide uppercase">
                {translations.network.venues}
              </p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-lime-950/40 border border-lime-500/10 flex items-center justify-center text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                <Ticket className="w-5 h-5" />
              </div>
              <p className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight mt-2 text-white">
                {opportunitiesCount}K+
              </p>
              <p className="text-gray-400 text-xs font-semibold tracking-wide uppercase">
                {translations.network.opportunities}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
