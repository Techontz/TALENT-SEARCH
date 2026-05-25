import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight, ArrowDownRight, ArrowDownRightIcon, MoveRight, Sliders, Copyright, Check, Heart } from 'lucide-react';

import { SupportedLanguage, FormQuestion, SubmittedApplication } from './types';
import { INITIAL_QUESTIONS, INITIAL_APPLICATIONS, INITIAL_TALENTS, TRANSLATIONS } from './data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TalentCategories from './components/TalentCategories';
import GlobalNetwork from './components/GlobalNetwork';
import HowItWorks from './components/HowItWorks';
import PremiumShowcase from './components/PremiumShowcase';
import ApplicationForm from './components/ApplicationForm';
import AdminPortal from './components/AdminPortal';
import AdminLoginModal from './components/AdminLoginModal';

export default function App() {
  const [currentLang, setLang] = useState<SupportedLanguage>('en');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAppForm, setShowAppForm] = useState(false);

  // Stateful question list and submission data mimicking local DB storage
  const [questions, setQuestions] = useState<FormQuestion[]>(INITIAL_QUESTIONS);
  const [applications, setApplications] = useState<SubmittedApplication[]>(INITIAL_APPLICATIONS);
  const [talents, setTalents] = useState(INITIAL_TALENTS);

  const translations = TRANSLATIONS[currentLang];

  // Secure toggle function enforcing passcode verification
  const handleSetAdminMode = (mode: boolean) => {
    if (mode === false) {
      setIsAdminMode(false);
      setIsAuthed(false); // Reset auth status so next click prompts login again
    } else {
      if (isAuthed) {
        setIsAdminMode(true);
      } else {
        setShowLoginModal(true);
      }
    }
  };

  // Helper smooth scroll handler mimicking Apple.com buttery scrolling
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Append new application from client modal
  const handleNewApplication = (newApp: Omit<SubmittedApplication, 'id' | 'status' | 'submittedAt'>) => {
    const freshApp: SubmittedApplication = {
      ...newApp,
      id: `app-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [freshApp, ...prev]);
  };

  return (
    <div className="font-sans bg-[#020107] text-white selection:bg-lime-400 selection:text-black min-h-screen">
      
      {/* 1. GLASS NAV BAR */}
      <Navbar
        currentLang={currentLang}
        setLang={setLang}
        translations={translations}
        onOpenAppForm={() => setShowAppForm(true)}
        isAdminMode={isAdminMode}
        setIsAdminMode={handleSetAdminMode}
        scrollToSection={scrollToSection}
      />

      {/* 2. ADMIN VIEW OR GUEST SHOWCASE VIEWS */}
      <div>
        <AnimatePresence mode="wait">
          {isAdminMode ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AdminPortal
                questions={questions}
                setQuestions={setQuestions}
                applications={applications}
                setApplications={setApplications}
              />
            </motion.div>
          ) : (
            <motion.div
              key="guest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* SECTION 1: HERO CONTAINER (Concert atmosphere) */}
              <Hero 
                translations={translations} 
                onOpenAppForm={() => setShowAppForm(true)} 
                scrollToSection={scrollToSection}
              />

              {/* SECTION 2: TALENT CATEGORIES (White grid of roles) */}
              <TalentCategories 
                translations={translations} 
                talents={talents}
                onOpenAppForm={() => setShowAppForm(true)}
              />

              {/* SECTION 3: GLOBAL NETWORK (Silicon coordinate dots) */}
              <GlobalNetwork translations={translations} />

              {/* SECTION 4: HOW IT WORKS (Apple step list) */}
              <HowItWorks translations={translations} />

              {/* SECTION 5: PREMIUM SHOWCASE (Full-scene media sliding panels) */}
              <PremiumShowcase translations={translations} />

              {/* SECTION 6: BOTTOM MASSIVE CTA MODULE (Ready to Go Global?) */}
              <section id="footer-cta" className="relative py-28 bg-white text-black overflow-hidden flex flex-col items-center justify-center text-center px-6">
                
                {/* Visual particles ambient dots matching image */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gray-200" />
                <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-lime-300/10 blur-[100px] pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="max-w-4xl mx-auto flex flex-col items-center"
                >
                  <div className="flex justify-center mb-4">
                    <span className="text-lime-500 font-sans text-xs tracking-widest font-extrabold flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-lime-500" /> STARSCENTS INTERFACE
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-6xl font-sans font-extrabold text-[#0F0D15] tracking-tight max-w-2xl leading-[1.1]">
                    {translations.cta.heading}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600 font-extrabold block sm:inline">
                      {translations.cta.headingAccent}
                    </span>
                  </h2>

                  {/* Buttons group exactly matching RISING STARS imagery style */}
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center min-w-[280px] sm:min-w-[450px]">
                    
                    <button
                      onClick={() => setShowAppForm(true)}
                      className="w-full sm:w-auto bg-lime-400 hover:bg-lime-500 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] text-black font-semibold text-xs py-4 px-8 rounded-full transition-all duration-300 tracking-wide uppercase flex items-center justify-center gap-2 hover:scale-103"
                    >
                      <span>{translations.cta.buttonTalent}</span>
                      <ArrowUpRight className="w-4 h-4 ml-0.5" />
                    </button>

                    <button
                      onClick={() => setShowAppForm(true)}
                      className="w-full sm:w-auto bg-[#0F0D15] hover:bg-black text-white font-semibold text-xs py-4 px-8 rounded-full transition-all duration-300 tracking-wide uppercase flex items-center justify-center gap-2 hover:scale-103"
                    >
                      <span>{translations.cta.buttonAgency}</span>
                      <ArrowUpRight className="w-4 h-4 ml-0.5 text-lime-400" />
                    </button>

                    <button
                      onClick={() => {
                        scrollToSection('categories');
                      }}
                      className="w-full sm:w-auto bg-white border border-gray-200 hover:border-black/20 text-gray-800 font-semibold text-xs py-4 px-8 rounded-full transition-all duration-300 tracking-wide uppercase flex items-center justify-center gap-2 hover:scale-103"
                    >
                      <span>{translations.cta.buttonHire}</span>
                      <ArrowDownRight className="w-4 h-4 ml-0.5 text-lime-600" />
                    </button>

                  </div>

                </motion.div>

              </section>

              {/* FOOTER */}
              <footer className="bg-[#020107] border-t border-white/5 py-10 px-6 xl:px-12 text-center text-gray-400">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Trademark logo */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-lime-400" />
                    </div>
                    <span className="text-white font-sans text-xs font-bold uppercase tracking-wider">
                      RISING STARS GLOBAL &bull; ENTERTAINMENT MARKETPLACE
                    </span>
                  </div>

                  {/* Copyright and custom badges */}
                  <div className="flex items-center gap-1.5 text-3xs font-mono">
                    <Copyright className="w-3.5 h-3.5" />
                    <span>2026 RISING STARS CORP. DEVELOPED WITH UNRIVALED CRAFT.</span>
                  </div>

                </div>
              </footer>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. MULTI-STEP ADMISSION WIZARD MODAL POPUP */}
      <AnimatePresence>
        {showAppForm && (
          <ApplicationForm
            questions={questions}
            translations={translations}
            currentLang={currentLang}
            onClose={() => setShowAppForm(false)}
            onSubmit={handleNewApplication}
          />
        )}
      </AnimatePresence>

      {/* 4. PREMIUM ADMIN AUTHENTICATION LOCKSCREEN */}
      <AnimatePresence>
        {showLoginModal && (
          <AdminLoginModal
            currentLang={currentLang}
            onClose={() => setShowLoginModal(false)}
            onSuccess={() => {
              setIsAuthed(true);
              setIsAdminMode(true);
              setShowLoginModal(false);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
