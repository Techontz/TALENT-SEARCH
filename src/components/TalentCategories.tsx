import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Disc, Camera, Activity, Volume2, Music, Tv, Briefcase, Plus, ArrowDownRight } from 'lucide-react';
import { TalentCategory, TranslationDict } from '../types';

interface TalentCategoriesProps {
  translations: TranslationDict;
  talents: any[];
  onOpenAppForm: () => void;
}

const CATEGORY_ICONS: Record<TalentCategory, any> = {
  'Singers': Mic,
  'DJs': Disc,
  'Models': Camera,
  'Dancers': Activity,
  'MCs': Volume2,
  'Bands': Music,
  'Live Streamers': Tv,
  'Agencies': Briefcase,
};

const CATEGORIES: { name: TalentCategory; descKey: string }[] = [
  { name: 'Singers', descKey: 'Singers' },
  { name: 'DJs', descKey: 'DJs' },
  { name: 'Models', descKey: 'Models' },
  { name: 'Dancers', descKey: 'Dancers' },
  { name: 'MCs', descKey: 'MCs' },
  { name: 'Bands', descKey: 'Bands' },
  { name: 'Live Streamers', descKey: 'Live Streamers' },
  { name: 'Agencies', descKey: 'Agencies' }
];

export default function TalentCategories({ translations, talents, onOpenAppForm }: TalentCategoriesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="categories" 
      className="relative py-24 bg-[#FAF9FB] text-black overflow-hidden"
    >
      
      {/* Tiny decorative star icon on top of section heading */}
      <div className="flex justify-center mb-3">
        <div className="text-lime-500 font-sans tracking-widest text-xs font-bold animate-pulse flex flex-col items-center">
          <Plus className="w-4 h-4 text-lime-500 mb-1" />
        </div>
      </div>

      {/* Modern, high-contrast light header */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-[#0F0D15]">
          {translations.categories.heading}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600 font-extrabold">
            {translations.categories.headingAccent}
          </span>
        </h2>
        <p className="mt-3 text-gray-500 text-sm md:text-md uppercase tracking-wider font-semibold">
          Curated Elite Entertainment Professionals
        </p>
      </div>

      {/* 2. CIRCULAR CATEGORY GRID CARDS (EXACTLY MATCHING THE ROW/CARD DESIGN IN REFERENCE) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {CATEGORIES.map((cat, idx) => {
          const IconComponent = CATEGORY_ICONS[cat.name];
          // Find matching talent from list to display in the circular profile
          const matchTalent = talents.find(t => t.category === cat.name);
          const imageSrc = matchTalent?.imageUrl || '';

          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group bg-white border border-gray-100/80 rounded-3xl p-6 flex flex-col items-center text-center shadow-xs hover:shadow-2xl hover:border-lime-300 transition-all duration-300 cursor-pointer"
              id={`cat-card-${cat.name.toLowerCase().replace(' ', '-')}`}
            >
              
              {/* Circular profile image crop with glowing green border/overlay on hover */}
              <div className="relative w-28 h-28 rounded-full mb-5 flex-shrink-0 flex items-center justify-center p-[2px] bg-linear-to-b from-gray-100 to-gray-200 group-hover:from-lime-400 group-hover:to-green-500 transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-white/10 relative">
                  <img
                    src={imageSrc}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle interactive hover vignette overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>

                {/* Floating category action icon overlay strictly matching reference design */}
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-lime-400 border border-white flex items-center justify-center text-black shadow-lg transition-transform duration-300 scale-100 group-hover:scale-110">
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-gray-900 font-sans font-bold text-sm tracking-wide mt-2">
                {cat.name}
              </h3>

              {/* Elegant background highlight on card hover */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-radial-to-b from-transparent to-lime-500/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          );
        })}
      </div>

      {/* 3. VIEW ALL TALENT BUTTON AT BOTTOM (EXACTLY MATCHING THE PICTURE BAR) */}
      <div className="flex justify-center mt-12">
        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={onOpenAppForm}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 hover:border-black/20 rounded-full text-xs font-bold tracking-wide text-gray-800 transition-all shadow-xs"
        >
          {translations.categories.viewAll}
          <ArrowDownRight className="w-3.5 h-3.5 text-lime-600" />
        </motion.button>
      </div>

    </section>
  );
}
