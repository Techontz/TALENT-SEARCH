import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, ArrowUpRight, Music3, TrendingUp, Volume2, ShieldAlert } from 'lucide-react';
import { TranslationDict } from '../types';

interface HeroProps {
  translations: TranslationDict;
  onOpenAppForm: () => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({ translations, onOpenAppForm, scrollToSection }: HeroProps) {
  const [isPlayingLeft, setIsPlayingLeft] = useState(false);
  const [isPlayingRight, setIsPlayingRight] = useState(false);
  
  // Waveform animation helpers
  const [waveLeft, setWaveLeft] = useState<number[]>([20, 40, 60, 30, 80, 50, 20, 45, 75, 50, 90, 40, 30, 60, 45, 20, 35, 60, 80, 40]);
  const [waveRight, setWaveRight] = useState<number[]>([40, 30, 70, 90, 50, 30, 60, 85, 45, 60, 80, 100, 70, 40, 55, 30, 70, 50, 40, 60]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingLeft) {
      interval = setInterval(() => {
        setWaveLeft(prev => prev.map(() => Math.floor(Math.random() * 85) + 15));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlayingLeft]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingRight) {
      interval = setInterval(() => {
        setWaveRight(prev => prev.map(() => Math.floor(Math.random() * 85) + 15));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlayingRight]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#020107]"
    >
      
      {/* 1. CINEMATIC CONCERT ATMOSPHERE & BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 z-0">
        
        {/* Real Unsplash image background with low opacity and dark screen overlays */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 select-none pointer-events-none opacity-45 grayscale-[20%] transition-transform duration-1000"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=80')" 
          }}
        />

        {/* Dynamic spotlights */}
        <div className="absolute top-[10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-violet-600/10 blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-lime-400/5 blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-linear-to-b from-transparent via-lime-500/10 to-transparent blur-[120px] pointer-events-none" />

        {/* Ambient Darkened Overlays (replicates Netflix and Netflix dark gradients) */}
        <div className="absolute inset-0 bg-linear-to-b from-[#020107]/90 via-[#020107]/70 to-[#020107]" />
        
        {/* Subtle bottom stage highlight horizontal bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-lime-400/30 to-transparent" />
      </div>

      {/* 2. CORE CONTENT AREA */}
      <div className="relative z-10 w-[90%] max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-4">
        
        {/* Floating Tag Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/95 text-2xs md:text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
          </span>
          GLOBAL ENTERTAINMENT ECOSYSTEM
        </motion.div>

        {/* Massive Centered Typography (Strictly matching the image visual scale and spacing) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold text-white tracking-tight max-w-5xl leading-[1.05]"
          id="hero-main-title"
        >
          {translations.hero.titlePrefix}{' '}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-green-500 underline decoration-lime-400/20 underline-offset-8">
            {translations.hero.titleAccent}
          </span>
        </motion.h1>

        {/* Subtitle - minimal and Apple-like */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-gray-400 text-sm sm:text-lg md:text-xl font-sans tracking-wide font-medium max-w-2xl"
          id="hero-main-subtitle"
        >
          {translations.hero.subtitle}
        </motion.p>

        {/* Floating CTA buttons strictly matching Apple's rounded glow look */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <button
            onClick={onOpenAppForm}
            className="group relative flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-semibold uppercase text-xs tracking-wider py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:shadow-[0_0_30px_rgba(163,230,53,0.6)]"
          >
            {translations.hero.ctaPrimary}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('categories')}
            className="group relative flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white font-semibold uppercase text-xs tracking-wider py-4 px-10 rounded-full transition-all duration-300 backdrop-blur-md"
          >
            {translations.hero.ctaSecondary}
            <ArrowUpRight className="w-4 h-4 text-lime-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* 3. TRUSTED BY CLIENT PILE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 flex items-center gap-3.5"
        >
          {/* Overlapping circular avatars */}
          <div className="flex -space-x-3">
            <img className="w-8 h-8 rounded-full border-2 border-[#020107] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar A" referrerPolicy="no-referrer" />
            <img className="w-8 h-8 rounded-full border-2 border-[#020107] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar B" referrerPolicy="no-referrer" />
            <img className="w-8 h-8 rounded-full border-2 border-[#020107] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar C" referrerPolicy="no-referrer" />
            <img className="w-8 h-8 rounded-full border-2 border-[#020107] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar D" referrerPolicy="no-referrer" />
            <img className="w-8 h-8 rounded-full border-2 border-[#020107] object-cover animate-pulse" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar E" referrerPolicy="no-referrer" />
          </div>
          <span className="text-xs text-gray-400 font-sans tracking-wide">
            Trusted by <strong className="text-white font-semibold">10K+</strong> Talents & <strong className="text-lime-400 font-semibold">2K+</strong> Venues
          </span>
        </motion.div>
      </div>

      {/* 4. LEFT FLOATING MINI MEDIA CARD (EXACTLY MATCHING THE REFERENCE PICTURE) */}
      <div className="absolute left-6 xl:left-12 top-[45%] -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="backdrop-blur-xl bg-black/50 border border-white/10 rounded-2xl p-4 w-72 flex flex-col gap-3 shadow-2xl overflow-hidden group"
        >
          {/* Card Head (Mini visual player styling) */}
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="Live Singer" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-lime-500/20 mix-blend-color-dodge" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                <p className="text-white text-xs font-bold leading-none tracking-wide truncate">{translations.hero.liveShow}</p>
              </div>
              <p className="text-gray-400 text-[10px] mt-1 leading-none">Aria Bennett &bull; New York</p>
            </div>
            
            {/* Play Button - toggles play engine */}
            <button
              onClick={() => setIsPlayingLeft(!isPlayingLeft)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isPlayingLeft 
                  ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.5)]' 
                  : 'bg-white/10 text-white hover:bg-lime-400 hover:text-black'
              }`}
            >
              {isPlayingLeft ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Interactive Digital Waveform Visual */}
          <div className="flex items-end justify-between h-9 px-1 gap-[3px]">
            {waveLeft.map((val, idx) => (
              <motion.div
                key={idx}
                animate={isPlayingLeft ? { height: `${val}%` } : { height: '25%' }}
                className={`w-[5px] rounded-full transition-all duration-300 ${
                  isPlayingLeft ? 'bg-gradient-to-t from-emerald-500 to-lime-300' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span className="flex items-center gap-1 text-lime-400/90"><Volume2 className="w-3 h-3 animate-pulse" /> Live feeds</span>
            <span>02:45 / 03:00</span>
          </div>
        </motion.div>
      </div>

      {/* 5. RIGHT FLOATING MINI MEDIA CARD (EXACTLY MATCHING THE REFERENCE PICTURE) */}
      <div className="absolute right-6 xl:right-12 top-[45%] -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="backdrop-blur-xl bg-black/50 border border-white/10 rounded-2xl p-4 w-72 flex flex-col gap-3 shadow-2xl overflow-hidden group"
        >
          {/* Card Head */}
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="Concert DJ" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-emerald-500/20 mix-blend-color-dodge" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping"></span>
                <p className="text-white text-xs font-bold leading-none tracking-wide truncate">{translations.hero.concert}</p>
              </div>
              <p className="text-gray-400 text-[10px] mt-1 leading-none">DJ Kaelen &bull; Paris, France</p>
            </div>

            {/* Play Button - toggles play engine */}
            <button
              onClick={() => setIsPlayingRight(!isPlayingRight)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isPlayingRight 
                  ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.5)]' 
                  : 'bg-white/10 text-white hover:bg-lime-400 hover:text-black'
              }`}
            >
              {isPlayingRight ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Electronic Digital Waveform Visual */}
          <div className="flex items-end justify-between h-9 px-1 gap-[3px]">
            {waveRight.map((val, idx) => (
              <motion.div
                key={idx}
                animate={isPlayingRight ? { height: `${val}%` } : { height: '35%' }}
                className={`w-[5px] rounded-full transition-all duration-300 ${
                  isPlayingRight ? 'bg-gradient-to-t from-lime-400 to-green-500' : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span className="flex items-center gap-1 text-lime-400/90"><Music3 className="w-3 h-3 text-lime-400" /> Active deck</span>
            <span>01:12 / 04:30</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
