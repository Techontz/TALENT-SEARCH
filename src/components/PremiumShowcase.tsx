import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Eye, Sparkles, MoveRight } from 'lucide-react';
import { SHOWCASE_IMAGES } from '../data';
import { TranslationDict } from '../types';

interface PremiumShowcaseProps {
  translations: TranslationDict;
}

export default function PremiumShowcase({ translations }: PremiumShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? SHOWCASE_IMAGES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === SHOWCASE_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="showcase" 
      className="relative py-28 bg-[#030108] text-white overflow-hidden"
    >
      
      {/* Laser-light highlight line decoration */}
      <div className="absolute top-[0%] left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-lime-400/10 to-transparent" />
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[55vw] h-[55vw] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <span className="text-lime-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            EXCLUSIVE PORTFOLIOS
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight">
            {translations.showcase.heading}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-green-500 inline-block font-extrabold">
              {translations.showcase.headingAccent}
            </span>
          </h2>
          <p className="mt-3 text-gray-400 text-xs md:text-sm max-w-xl">
            {translations.showcase.subtitle}
          </p>
        </div>

        {/* Cinematic Arrow Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-all active:scale-95"
            id="showcase-prev-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-lime-400 hover:bg-lime-500 text-black flex items-center justify-center transition-all active:scale-95 shadow-[0_0_15px_rgba(163,230,53,0.3)]"
            id="showcase-next-btn"
          >
            <ChevronRight className="w-5 h-5 font-bold" />
          </button>
        </div>
      </div>

      {/* CAROUSEL BODY CONTAINER (EXACTLY MATCHING THE PICTURE PRESETS) */}
      <div className="relative z-10 w-full select-none">
        
        {/* Fullwidth smooth sliding panel */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Primary active cinematic card */}
            <div className="md:col-span-8 overflow-hidden rounded-3xl border border-white/10 bg-black/40 relative aspect-16/9 md:aspect-21/9 group shadow-2xl">
              
              {/* Dynamic rendering with transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={SHOWCASE_IMAGES[activeIndex].url}
                    alt={SHOWCASE_IMAGES[activeIndex].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass tint element */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Glowing metadata overlay */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 flex flex-col gap-1.5 pointer-events-none">
                <div className="inline-flex max-w-max px-3 py-1 rounded-full bg-lime-400 text-black text-[9px] font-bold uppercase tracking-wider">
                  {SHOWCASE_IMAGES[activeIndex].tag}
                </div>
                <h3 className="text-white font-sans font-extrabold text-xl md:text-3xl tracking-tight mt-1">
                  {SHOWCASE_IMAGES[activeIndex].title}
                </h3>
              </div>
            </div>

            {/* Side teaser deck (shows next preview) */}
            <div className="md:col-span-4 hidden md:flex flex-col gap-5">
              {SHOWCASE_IMAGES.map((img, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                      isActive 
                        ? 'bg-lime-950/20 border-lime-500/30 text-white shadow-lg' 
                        : 'bg-white/2 border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={img.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-lime-400 uppercase tracking-widest">{img.tag}</p>
                      <p className="text-white text-sm font-bold truncate mt-1">{img.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
