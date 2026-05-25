import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Shield, Home, Briefcase, Sparkles, ChevronDown, Check, Menu, X } from 'lucide-react';
import { SupportedLanguage, TranslationDict } from '../types';

interface NavbarProps {
  currentLang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  translations: TranslationDict;
  onOpenAppForm: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  scrollToSection: (id: string) => void;
}

const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
];

export default function Navbar({
  currentLang,
  setLang,
  translations,
  onOpenAppForm,
  isAdminMode,
  setIsAdminMode,
  scrollToSection
}: NavbarProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-full py-3 px-6 md:px-8 flex items-center justify-between shadow-2xl transition-all duration-300">
        
        {/* LOGO */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-tr from-lime-400 to-green-600 shadow-[0_0_15px_rgba(132,204,22,0.4)]">
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="text-white font-sans font-bold tracking-wider text-sm md:text-md uppercase">
            Rising <span className="text-lime-400">Stars</span>
          </span>
        </div>

        {/* DESKTOP NAV TABS */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-white transition-colors text-xs font-semibold tracking-wide uppercase px-2 py-1">{translations.navbar.home}</button>
          <button onClick={() => scrollToSection('categories')} className="text-gray-300 hover:text-white transition-colors text-xs font-semibold tracking-wide uppercase px-2 py-1">{translations.navbar.talent}</button>
          <button onClick={() => scrollToSection('network')} className="text-gray-300 hover:text-white transition-colors text-xs font-semibold tracking-wide uppercase px-2 py-1">{translations.navbar.agencies}</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-white transition-colors text-xs font-semibold tracking-wide uppercase px-2 py-1">{translations.navbar.opportunities}</button>
          <button onClick={() => scrollToSection('showcase')} className="text-gray-300 hover:text-white transition-colors text-xs font-semibold tracking-wide uppercase px-2 py-1">{translations.navbar.about}</button>
        </div>

        {/* RIGHT INTERACTIONS */}
        <div className="hidden sm:flex items-center gap-4">
          
          {/* INTUITIVE ADMIN PORTAL SWITCHER */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-2xs font-bold uppercase tracking-wider border transition-all duration-300 ${
              isAdminMode 
                ? 'bg-lime-950/40 border-lime-400 text-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.25)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
            id="admin-mode-toggle"
            title="Toggle Admin Dashboard configured dynamically"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{translations.navbar.adminMode}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isAdminMode ? 'bg-lime-400 animate-pulse' : 'bg-gray-500'}`} />
          </button>

          {/* LANGUAGE DROP DOWN */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              id="lang-selector-btn"
            >
              <span>{activeLang.flag}</span>
              <span className="uppercase tracking-wider">{activeLang.code}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-40 rounded-2xl bg-black/95 border border-white/10 p-2 shadow-2xl backdrop-blur-3xl z-50 overflow-hidden"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setLangOpen(false);
                      }}
                      className="w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-medium transition-all text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                      {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-lime-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACTION "JOIN NOW" BUTTON */}
          <button
            onClick={() => {
              if (isAdminMode) setIsAdminMode(false);
              onOpenAppForm();
            }}
            className="bg-lime-400 hover:bg-lime-500 hover:shadow-[0_0_20px_rgba(163,230,53,0.5)] text-black font-semibold text-xs py-2 px-5 rounded-full transition-all duration-300 tracking-wide uppercase hover:scale-105"
            id="nav-join-btn"
          >
            {translations.navbar.cta}
          </button>
        </div>

        {/* MOBILE MENU TRIGGER */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Admin mode visible also in mobile header */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-2xs font-bold border ${
              isAdminMode 
                ? 'bg-lime-950/40 border-lime-400 text-lime-400' 
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
          >
            <Shield className="w-3 h-3" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-white/10 rounded-full bg-white/5 text-white hover:bg-white/10"
            id="nav-mobile-hamburger"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* MOBILE EXPANSION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-2 bg-black/90 border border-white/10 backdrop-blur-3xl rounded-3xl p-5 overflow-hidden flex flex-col gap-4 shadow-2xl w-full"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => { scrollToSection('hero'); setMobileMenuOpen(false); }}
                className="text-left text-gray-300 hover:text-white font-medium text-sm py-2 px-3 hover:bg-white/5 rounded-xl transition-all"
              >
                {translations.navbar.home}
              </button>
              <button 
                onClick={() => { scrollToSection('categories'); setMobileMenuOpen(false); }}
                className="text-left text-gray-300 hover:text-white font-medium text-sm py-2 px-3 hover:bg-white/5 rounded-xl transition-all"
              >
                {translations.navbar.talent}
              </button>
              <button 
                onClick={() => { scrollToSection('network'); setMobileMenuOpen(false); }}
                className="text-left text-gray-300 hover:text-white font-medium text-sm py-2 px-3 hover:bg-white/5 rounded-xl transition-all"
              >
                {translations.navbar.agencies}
              </button>
              <button 
                onClick={() => { scrollToSection('how-it-works'); setMobileMenuOpen(false); }}
                className="text-left text-gray-300 hover:text-white font-medium text-sm py-2 px-3 hover:bg-white/5 rounded-xl transition-all"
              >
                {translations.navbar.opportunities}
              </button>
              <button 
                onClick={() => { scrollToSection('showcase'); setMobileMenuOpen(false); }}
                className="text-left text-gray-300 hover:text-white font-medium text-sm py-2 px-3 hover:bg-white/5 rounded-xl transition-all"
              >
                {translations.navbar.about}
              </button>
            </div>

            <div className="h-[1px] bg-white/10 my-1" />

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-xs">Select Language:</span>
              <div className="flex flex-wrap gap-1.5 max-w-[200px] justify-end">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLang(lang.code)}
                    className={`text-2xs font-semibold px-2 py-1 rounded-md transition-all ${
                      currentLang === lang.code ? 'bg-lime-400 text-black' : 'bg-white/5 text-gray-300'
                    }`}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdminMode) setIsAdminMode(false);
                onOpenAppForm();
              }}
              className="w-full bg-lime-400 hover:bg-lime-500 text-black text-center py-3 rounded-full font-bold uppercase text-xs tracking-wider transition-all mt-2"
            >
              {translations.navbar.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
