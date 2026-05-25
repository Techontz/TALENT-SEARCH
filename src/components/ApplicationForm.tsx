import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowLeft, ArrowRight, UploadCloud, Users, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { FormQuestion, SubmittedApplication, SupportedLanguage, TranslationDict } from '../types';

interface ApplicationFormProps {
  questions: FormQuestion[];
  translations: TranslationDict;
  currentLang: SupportedLanguage;
  onClose: () => void;
  onSubmit: (app: Omit<SubmittedApplication, 'id' | 'status' | 'submittedAt'>) => void;
}

export default function ApplicationForm({
  questions,
  translations,
  currentLang,
  onClose,
  onSubmit
}: ApplicationFormProps) {
  const [step, setStep] = useState(1); // Step 1: Base Info, Step 2: Dynamic Questions, Step 3: Success
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [targetCategory, setTargetCategory] = useState('Singers');

  // Answers store mapping question.id -> answer (as a string)
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock file attachment state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Categories list
  const CATEGORIES = ['Singers', 'DJs', 'Models', 'Dancers', 'MCs', 'Bands', 'Live Streamers', 'Agencies'];

  // Initialize empty answers for questions
  useEffect(() => {
    const initialAnswers: Record<string, string> = { ...answers };
    questions.forEach((q) => {
      if (initialAnswers[q.id] === undefined) {
        if (q.type === 'boolean') {
          initialAnswers[q.id] = 'false';
        } else {
          initialAnswers[q.id] = '';
        }
      }
    });
    setAnswers(initialAnswers);
  }, [questions]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateFileUpload(files[0]);
    }
  };

  const simulateFileUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);

    const intv = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intv);
          setIsUploading(false);
          setUploadedFile({
            name: file.name,
            size: `${sizeInMB} MB`,
            type: file.type || 'application/octet-stream'
          });
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  // Evaluate if a conditional question should be displayed or skipped
  const isQuestionVisible = (q: FormQuestion) => {
    if (!q.conditionalOn) return true;
    const parentAnswer = answers[q.conditionalOn.questionId];
    return parentAnswer === q.conditionalOn.value;
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Stage / Full Name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'A valid email address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    const visibleQuestions = questions.filter(isQuestionVisible);

    visibleQuestions.forEach((q) => {
      if (q.required) {
        if (q.type === 'file' && !uploadedFile) {
          newErrors[q.id] = 'At least one audio/video media file is strictly required';
        } else if (q.type !== 'file' && (!answers[q.id] || !answers[q.id].trim())) {
          newErrors[q.id] = `${q.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        // Trigger parent save
        onSubmit({
          fullName,
          email,
          category: targetCategory,
          answers,
          mediaFile: uploadedFile ? uploadedFile : undefined
        });
        setStep(3); // Success Screen
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-100 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col"
        id="application-modal"
      >
        
        {/* Glow ambient lines */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-lime-500 via-green-400 to-emerald-500" />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-lime-400/5 blur-[50px] pointer-events-none" />

        {/* Modal Head */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-400"></span>
            </span>
            <span className="text-2xs font-extrabold tracking-widest text-lime-400 uppercase">AUDITION GATEWAY</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Main Area */}
        <div className="flex-1 overflow-y-auto pr-1 py-1">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: GENERAL PRIMARY IDENTITY INFORMATION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-2xl font-sans font-extrabold text-white tracking-tight">
                    {translations.application.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    {translations.application.subtitle}
                  </p>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* Form Inputs */}
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="text-2xs font-bold uppercase tracking-wider text-gray-300 block mb-2 leading-none">
                      Stage Name / Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. DJ Sterling, Aria Bennett"
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-lime-400 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-hidden transition-all placeholder-gray-600 font-sans"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-2xs font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-2xs font-bold uppercase tracking-wider text-gray-300 block mb-2 leading-none">
                      Direct Contact Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. manager@vibe.fm"
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-lime-400 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-hidden transition-all placeholder-gray-600 font-sans"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-2xs font-medium mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* LARGE CHIPS SELECTOR: Target Category */}
                  <div>
                    <label className="text-2xs font-bold uppercase tracking-wider text-gray-300 block mb-3 leading-none">
                      {translations.application.applyAs} *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {CATEGORIES.map((cat) => {
                        const isSelected = targetCategory === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setTargetCategory(cat)}
                            className={`p-3.5 text-center rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                              isSelected
                                ? 'bg-lime-950/40 border-lime-400 text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.15)] scale-102 font-extrabold'
                                : 'bg-white/2 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20'
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DYNAMIC CONFIGURED QUESTIONS WITH CONDITIONAL CHECKS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-lg font-sans font-extrabold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-lime-400 animate-pulse" />
                    Audition Profiles & media
                  </h3>
                  <p className="text-gray-400 text-2xs mt-1">
                    Fill in performance questions configured dynamically below.
                  </p>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* Question generation based on visibility */}
                <div className="flex flex-col gap-5">
                  {questions.filter(isQuestionVisible).map((q) => {
                    const error = errors[q.id];

                    return (
                      <div key={q.id} className="flex flex-col gap-2 p-1">
                        <label className="text-2xs font-bold uppercase tracking-wider text-gray-300 block leading-tight">
                          {q.label} {q.required ? '*' : ''}
                        </label>

                        {/* CASE 1: STANDARD SHORT/LONG TEXT INPUT */}
                        {q.type === 'text' && (
                          <input
                            type="text"
                            value={answers[q.id] || ''}
                            onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                            placeholder={q.placeholder || 'Your response...'}
                            className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-lime-400 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-hidden transition-all placeholder-gray-600 font-sans"
                          />
                        )}

                        {/* CASE 2: BOOLEAN STATE SELECTOR */}
                        {q.type === 'boolean' && (
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => setAnswers({ ...answers, [q.id]: 'true' })}
                              className={`py-3.5 rounded-2xl text-center border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                answers[q.id] === 'true'
                                  ? 'bg-lime-950/40 border-lime-400 text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.15)]'
                                  : 'bg-white/2 border-white/10 text-gray-400 hover:text-white'
                              }`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => setAnswers({ ...answers, [q.id]: 'false' })}
                              className={`py-3.5 rounded-2xl text-center border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                answers[q.id] === 'false' || !answers[q.id]
                                  ? 'bg-lime-950/40 border-lime-400 text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.15)]'
                                  : 'bg-white/2 border-white/10 text-gray-400 hover:text-white'
                              }`}
                            >
                              No
                            </button>
                          </div>
                        )}

                        {/* CASE 3: CHOICE SELECTOR CARDS */}
                        {q.type === 'choice' && q.options && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {q.options.map((opt) => {
                              const isSel = answers[q.id] === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                                  className={`p-3 text-center rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                                    isSel
                                      ? 'bg-lime-950/40 border-lime-400 text-lime-400'
                                      : 'bg-white/2 border-white/10 text-gray-400 hover:text-white'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* CASE 4: FILE FILE UPLOAD ENGINE DRAG & DROP */}
                        {q.type === 'file' && (
                          <div className="flex flex-col gap-3">
                            <div
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              className={`border border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                                isDragging 
                                  ? 'border-lime-400 bg-lime-950/20 shadow-[0_0_15px_rgba(163,230,53,0.1)]' 
                                  : 'border-white/10 hover:border-white/20 bg-white/2'
                              }`}
                            >
                              <input
                                type="file"
                                id="file-uploader"
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="audio/*,video/*"
                              />
                              <label htmlFor="file-uploader" className="cursor-pointer flex flex-col items-center">
                                <UploadCloud className="w-10 h-10 text-lime-400 mb-2 animate-pulse" />
                                <p className="text-white text-xs font-bold uppercase tracking-wide">Drag & Drop media here</p>
                                <p className="text-gray-500 text-[10px] mt-1">Supports high fidelity MP3, WAV, MP4, MOV (max 50MB)</p>
                              </label>
                            </div>

                            {/* Upload Indicators */}
                            {isUploading && (
                              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/5">
                                <span className="text-lime-400 text-xs font-mono font-bold">Uploading demo... {uploadProgress}%</span>
                                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-lime-400" style={{ width: `${uploadProgress}%` }} />
                                </div>
                              </div>
                            )}

                            {uploadedFile && (
                              <div className="flex items-center justify-between p-3.5 rounded-xl border border-lime-500/10 bg-lime-950/10">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <FileText className="w-5 h-5 text-lime-400 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-white font-mono text-xs font-semibold truncate leading-none">{uploadedFile.name}</p>
                                    <p className="text-gray-500 text-[9px] mt-1 leading-none">{uploadedFile.size} &bull; {uploadedFile.type}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setUploadedFile(null)}
                                  className="text-gray-400 hover:text-white text-[10px] uppercase font-bold tracking-wider"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {error && (
                          <p className="text-red-400 text-2xs font-medium mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {error}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: SUBMISSION SUCCESS SCREEN */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-lime-500/10 border border-lime-400/30 flex items-center justify-center text-lime-400 mb-6 shadow-[0_0_25px_rgba(132,204,22,0.2)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-sans font-extrabold text-white tracking-tight">
                  {translations.application.successTitle}
                </h3>
                <p className="text-gray-400 text-xs mt-3 max-w-md leading-relaxed">
                  {translations.application.successDesc}
                </p>

                <div className="mt-8 p-3 rounded-xl border border-white/5 bg-white/2 font-mono text-[10px] text-gray-400">
                  REFERENCE REGISTRY ID: <strong className="text-lime-400 font-bold uppercase">RRS-{Math.floor(Math.random() * 899999 + 100000)}</strong>
                </div>

                <button
                  onClick={onClose}
                  className="mt-8 bg-white hover:bg-gray-100 text-black font-semibold text-xs py-3.5 px-10 rounded-full uppercase tracking-wider transition-all active:scale-95"
                >
                  {translations.application.closeBtn}
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Modal Foot Actions - Stills on Step 1 & 2 */}
        {step < 3 && (
          <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-6 flex-shrink-0">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-bold uppercase tracking-wider"
              >
                <ArrowLeft className="w-4 h-4" />
                {translations.application.backBtn}
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-bold uppercase text-xs tracking-wider py-3.5 px-8 rounded-full transition-all duration-200"
              id="modal-next-btn"
            >
              <span>{step === 1 ? translations.application.nextBtn : translations.application.submitBtn}</span>
              {step === 1 && <ArrowRight className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
