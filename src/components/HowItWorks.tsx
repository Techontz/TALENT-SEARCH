import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, CloudUpload, Sparkles, Sliders } from 'lucide-react';
import { TranslationDict } from '../types';

interface HowItWorksProps {
  translations: TranslationDict;
}

export default function HowItWorks({ translations }: HowItWorksProps) {
  return (
    <section 
      id="how-it-works" 
      className="relative py-24 bg-[#FDFAFC] text-black overflow-hidden"
    >
      
      {/* Accent Plus badge */}
      <div className="flex justify-center mb-4">
        <span className="text-lime-500 font-sans text-xs tracking-widest font-extrabold flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5" /> PLATFORM INSTRUCTIONS
        </span>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-20">
        <h2 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-[#0F0D15]">
          {translations.howItWorks.heading}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600 font-extrabold">
            {translations.howItWorks.headingAccent}
          </span>
        </h2>
        <p className="mt-3 text-gray-500 text-xs md:text-sm uppercase tracking-wider font-bold">
          Three steps to international representation and commercial bookings
        </p>
      </div>

      {/* 3 Steps Structure with clean connecting lines (Exactly matching the reference image) */}
      <div className="max-w-6xl mx-auto px-6 relative">
        
        {/* Horizontal connecting line - hidden on small screens */}
        <div className="absolute top-1/2 left-32 right-32 h-[1px] border-t border-dashed border-gray-200 -translate-y-16 hidden lg:block z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Number indicator */}
            <div className="w-8 h-8 rounded-full bg-lime-400 text-black font-sans font-bold flex items-center justify-center text-xs shadow-md mb-6 transition-transform group-hover:scale-110">
              1
            </div>

            {/* Glowing Icon Container */}
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-xs group-hover:shadow-2xl group-hover:border-lime-300 transition-all duration-300 mb-6">
              <UserPlus className="w-8 h-8 text-lime-600 group-hover:text-lime-500 transition-colors" />
            </div>

            <h3 className="text-[#0F0D15] font-sans font-bold text-lg tracking-wide mb-3">
              {translations.howItWorks.step1Title}
            </h3>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              {translations.howItWorks.step1Desc}
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Number indicator */}
            <div className="w-8 h-8 rounded-full bg-lime-400 text-black font-sans font-bold flex items-center justify-center text-xs shadow-md mb-6 transition-transform group-hover:scale-110">
              2
            </div>

            {/* Glowing Icon Container */}
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-xs group-hover:shadow-2xl group-hover:border-lime-300 transition-all duration-300 mb-6 font-semibold">
              <CloudUpload className="w-8 h-8 text-lime-600 group-hover:text-lime-500 transition-colors" />
            </div>

            <h3 className="text-[#0F0D15] font-sans font-bold text-lg tracking-wide mb-3">
              {translations.howItWorks.step2Title}
            </h3>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              {translations.howItWorks.step2Desc}
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Number indicator */}
            <div className="w-8 h-8 rounded-full bg-lime-400 text-black font-sans font-bold flex items-center justify-center text-xs shadow-md mb-6 transition-transform group-hover:scale-110">
              3
            </div>

            {/* Glowing Icon Container */}
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-xs group-hover:shadow-2xl group-hover:border-lime-300 transition-all duration-300 mb-6">
              <Sparkles className="w-8 h-8 text-lime-600 group-hover:text-lime-500 transition-colors animate-pulse" />
            </div>

            <h3 className="text-[#0F0D15] font-sans font-bold text-lg tracking-wide mb-3">
              {translations.howItWorks.step3Title}
            </h3>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              {translations.howItWorks.step3Desc}
            </p>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
