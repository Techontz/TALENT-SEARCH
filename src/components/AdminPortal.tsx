import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Layers, Award, ShieldAlert, Sparkles, Plus, Trash2, 
  ArrowUp, ArrowDown, Check, X, FileText, ChevronRight, CheckCircle2,
  XCircle, Filter, PieChart, HelpCircle, ToggleLeft, RefreshCw
} from 'lucide-react';
import { FormQuestion, SubmittedApplication, TalentCategory } from '../types';

interface AdminPortalProps {
  questions: FormQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<FormQuestion[]>>;
  applications: SubmittedApplication[];
  setApplications: React.Dispatch<React.SetStateAction<SubmittedApplication[]>>;
}

export default function AdminPortal({
  questions,
  setQuestions,
  applications,
  setApplications
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<'applications' | 'questions'>('applications');
  const [selectedApp, setSelectedApp] = useState<SubmittedApplication | null>(applications[0] || null);
  const [appFilter, setAppFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Question editing workspace
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQLabel, setNewQLabel] = useState('');
  const [newQType, setNewQType] = useState<'text' | 'choice' | 'boolean' | 'file'>('text');
  const [newQRequired, setNewQRequired] = useState(false);
  const [newQOptions, setNewQOptions] = useState<string>('');
  
  // Conditional question toggles
  const [newQConditional, setNewQConditional] = useState(false);
  const [newQCondOnId, setNewQCondOnId] = useState('');
  const [newQCondValue, setNewQCondValue] = useState('true');

  const handleCreateQuestion = () => {
    if (!newQLabel.trim()) return;

    const newQuestion: FormQuestion = {
      id: `q-${Date.now()}`,
      label: newQLabel,
      type: newQType,
      required: newQRequired,
      ...(newQType === 'choice' && { options: newQOptions.split(',').map(o => o.trim()).filter(Boolean) }),
      ...(newQConditional && newQCondOnId && {
        conditionalOn: {
          questionId: newQCondOnId,
          value: newQCondValue
        }
      })
    };

    setQuestions([...questions, newQuestion]);
    
    // Reset state inputs
    setNewQLabel('');
    setNewQType('text');
    setNewQRequired(false);
    setNewQOptions('');
    setNewQConditional(false);
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === questions.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const working = [...questions];
    const holder = working[index];
    working[index] = working[targetIdx];
    working[targetIdx] = holder;
    setQuestions(working);
  };

  const handleSetAppStatus = (appId: string, status: 'approved' | 'rejected') => {
    const updated = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, status };
      }
      return app;
    });
    setApplications(updated);
    
    // Update active details
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  const filteredApps = applications.filter((app) => {
    if (appFilter === 'all') return true;
    return app.status === appFilter;
  });

  // Calculate Metrics
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <section id="admin-view" className="bg-[#090810] min-h-screen text-white pt-28 pb-20 px-6 xl:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Head branding header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/5 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-lime-950/40 border border-lime-400/20 text-lime-400 text-2xs font-mono rounded-full mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Rising Stars Executive Core
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight">
              Scouts & Admin <span className="text-lime-400 font-extrabold">Portal</span>
            </h2>
          </div>

          {/* Toggle Tab Deck */}
          <div className="flex items-center gap-1 bg-black/50 border border-white/10 rounded-full p-1 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'applications'
                  ? 'bg-lime-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Applications ({applications.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'questions'
                  ? 'bg-lime-400 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Form Questions ({questions.length})</span>
            </button>
          </div>
        </div>

        {/* METRIC RIBBON */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col gap-1.5">
            <span className="text-gray-400 text-2xs uppercase font-bold tracking-widest leading-none">Global Requisitions</span>
            <span className="text-2xl font-extrabold text-white mt-1">{stats.total}</span>
          </div>
          <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col gap-1.5">
            <span className="text-lime-400 text-2xs uppercase font-bold tracking-widest leading-none">Pending Evaluation</span>
            <span className="text-2xl font-extrabold text-lime-400 mt-1 animate-pulse">{stats.pending}</span>
          </div>
          <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col gap-1.5">
            <span className="text-gray-400 text-2xs uppercase font-bold tracking-widest leading-none">Audition Approved</span>
            <span className="text-2xl font-extrabold text-[#74fc40] mt-1">{stats.approved}</span>
          </div>
          <div className="p-4 bg-zinc-950 border border-white/5 rounded-2xl flex flex-col gap-1.5">
            <span className="text-gray-400 text-2xs uppercase font-bold tracking-widest leading-none">Rejection Index</span>
            <span className="text-2xl font-extrabold text-red-500 mt-1">{stats.rejected}</span>
          </div>
        </div>

        {/* MAIN BODY CONTENTS */}
        <div>
          
          {/* TAB 1: SUBMITTED APPLICATIONS INSPECTOR */}
          {activeTab === 'applications' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Candidates List */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Search / Filters Bar */}
                <div className="flex items-center justify-between gap-3 bg-zinc-950 border border-white/5 p-3 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Filter className="w-3.5 h-3.5 text-lime-400" />
                    <span>Filter:</span>
                  </div>
                  <div className="flex gap-1">
                    {['all', 'pending', 'approved', 'rejected'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setAppFilter(f as any)}
                        className={`text-3xs tracking-wider uppercase font-bold px-2 rounded-lg py-1 transition-all ${
                          appFilter === f
                            ? 'bg-lime-950 border border-lime-500/30 text-lime-400 font-extrabold'
                            : 'bg-white/2 text-gray-500 hover:text-white'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredApps.length === 0 ? (
                    <div className="p-10 border border-dashed border-white/5 rounded-2xl text-center text-gray-500 text-xs">
                      No applications found for current filters.
                    </div>
                  ) : (
                    filteredApps.map((app) => {
                      const idSelected = selectedApp?.id === app.id;
                      
                      return (
                        <div
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                            idSelected
                              ? 'bg-lime-950/10 border-lime-400 text-white shadow-xl'
                              : 'bg-zinc-950 border-white/5 text-gray-300 hover:bg-white/2 hover:border-white/10'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="font-sans font-bold text-sm tracking-wide leading-none truncate">{app.fullName}</p>
                            <p className="text-gray-500 text-2xs mt-2 leading-none block">{app.email} &bull; <strong className="text-lime-400/90 font-semibold">{app.category}</strong></p>
                          </div>

                          {/* Status Badge */}
                          <div>
                            {app.status === 'pending' && (
                              <span className="text-[9px] font-bold text-yellow-400 tracking-wider uppercase px-2 py-0.5 rounded-md bg-yellow-400/10 border border-yellow-400/10">Pending</span>
                            )}
                            {app.status === 'approved' && (
                              <span className="text-[9px] font-bold text-green-400 tracking-wider uppercase px-2 py-0.5 rounded-md bg-green-400/10 border border-green-400/10">Approved</span>
                            )}
                            {app.status === 'rejected' && (
                              <span className="text-[9px] font-bold text-red-400 tracking-wider uppercase px-2 py-0.5 rounded-md bg-red-400/10 border border-red-400/10">Rejected</span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Active Information Panel detail */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {selectedApp ? (
                    <motion.div
                      key={selectedApp.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-zinc-950 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6"
                    >
                      {/* Panel Head */}
                      <div className="flex items-center justify-between pb-5 border-b border-white/5">
                        <div>
                          <p className="text-gray-500 text-3xs uppercase font-extrabold tracking-widest leading-none">EXECUTIVE INSPECTOR</p>
                          <h3 className="text-xl font-sans font-extrabold text-white mt-1 tracking-tight">{selectedApp.fullName}</h3>
                          <p className="text-xs text-gray-400 mt-1">{selectedApp.email}</p>
                        </div>

                        {/* Fast approving triggers */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSetAppStatus(selectedApp.id, 'rejected')}
                            className="w-10 h-10 rounded-full bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-400 hover:text-white flex items-center justify-center transition-all"
                            title="Reject Audition"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleSetAppStatus(selectedApp.id, 'approved')}
                            className="w-10 h-10 rounded-full bg-lime-950/20 border border-lime-400/20 text-lime-400 hover:bg-lime-400 hover:text-black flex items-center justify-center transition-all"
                            title="Approve Audition"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Submitted responses */}
                      <div className="flex flex-col gap-4">
                        <span className="text-lime-400 font-bold uppercase text-2xs tracking-widest">SUBMITTED QUESTIONS DYNAMIC DICTIONARY:</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {Object.entries(selectedApp.answers).map(([qid, answer]) => {
                            const matchingQ = questions.find(q => q.id === qid);
                            const questionText = matchingQ ? matchingQ.label : qid;

                            return (
                              <div key={qid} className="p-3.5 bg-white/2 border border-white/5 rounded-xl flex flex-col gap-1.5">
                                <span className="text-gray-500 text-3xs uppercase font-bold tracking-wide leading-tight">{questionText}</span>
                                <span className="text-white text-xs font-semibold leading-relaxed">
                                  {answer === 'true' ? 'Yes' : answer === 'false' ? 'No' : answer}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* media attachment simulation preview */}
                      {selectedApp.mediaFile ? (
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-lime-400/10 flex items-center justify-center text-lime-400">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-white font-mono text-xs font-bold leading-none">{selectedApp.mediaFile.name}</p>
                              <p className="text-gray-500 text-3xs mt-1.5 leading-none">{selectedApp.mediaFile.size} &bull; {selectedApp.mediaFile.type}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                            <span className="text-lime-400 font-mono text-2xs tracking-wider uppercase font-bold">Loaded Asset Secure</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 border border-dashed border-white/5 rounded-2xl text-center text-gray-500 text-2xs">
                          No digital media demos attached on application form.
                        </div>
                      )}

                    </motion.div>
                  ) : (
                    <div className="h-44 flex items-center justify-center text-gray-500 text-xs border border-dashed border-white/5 rounded-3xl">
                      Select a pending requisition card on the left to begin executive review audits.
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          )}

          {/* TAB 2: ACTIVE DYNAMIC QUESTION BUILDER */}
          {activeTab === 'questions' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: List of current questions and up-down ordering triggers */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-gray-400 text-xs">Configure, Reorder and Edit dynamic questionnaire cards.</span>
                  <button
                    onClick={() => setShowAddQuestion(!showAddQuestion)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-lime-400 hover:bg-lime-500 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Question</span>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {questions.map((q, idx) => {
                    const hasCond = !!q.conditionalOn;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border ${
                          hasCond 
                            ? 'bg-zinc-950/60 border-zinc-900 ml-6 pl-4 border-l-2 border-l-lime-500/40' 
                            : 'bg-zinc-950 border-white/5'
                        } flex items-center justify-between gap-4`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-3xs tracking-widest uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400">{q.type}</span>
                            {q.required && <span className="text-3xs tracking-widest uppercase font-bold text-red-400">Required</span>}
                            {hasCond && (
                              <span className="text-[10px] text-lime-400 font-semibold font-mono">
                                Cond. on {q.conditionalOn?.questionId === 'q3' ? 'Signed exclusively?' : q.conditionalOn?.questionId}
                              </span>
                            )}
                          </div>
                          <p className="text-white text-xs font-bold leading-normal tracking-wide mt-2">{q.label}</p>
                          {q.options && (
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {q.options.map((o) => (
                                <span key={o} className="text-3xs text-gray-500 font-medium bg-white/2 px-1.5 py-0.5 rounded">{o}</span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Controls (Up / Down / Delete) */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveQuestion(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 px-1.5 hover:bg-white/5 hover:text-white rounded text-gray-400 disabled:opacity-20"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveQuestion(idx, 'down')}
                            disabled={idx === questions.length - 1}
                            className="p-1 px-1.5 hover:bg-white/5 hover:text-white rounded text-gray-400 disabled:opacity-20"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1 px-1.5 hover:bg-red-500/15 hover:text-red-400 rounded text-gray-400"
                            title="Delete question permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Custom Interactive Form Builder parameters */}
              <div className="lg:col-span-5">
                <AnimatePresence>
                  {showAddQuestion ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-zinc-950 border border-white/5 rounded-3xl p-6 flex flex-col gap-5"
                    >
                      <h3 className="text-sm font-bold uppercase tracking-widest text-lime-400">Interactive Question Generator</h3>
                      
                      {/* Label Input */}
                      <div>
                        <label className="text-3xs uppercase font-extrabold tracking-widest text-gray-300 block mb-1.5">Question Title / Label *</label>
                        <input
                          type="text"
                          value={newQLabel}
                          onChange={(e) => setNewQLabel(e.target.value)}
                          placeholder="e.g. Current Instagram / Portfolio URL"
                          className="w-full bg-white/5 border border-white/10 focus:border-lime-400 rounded-lg p-2.5 text-xs text-white focus:outline-hidden"
                        />
                      </div>

                      {/* Question Style Selection */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-3xs uppercase font-extrabold tracking-widest text-gray-300 block mb-1.5">Question Type</label>
                          <select
                            value={newQType}
                            onChange={(e) => setNewQType(e.target.value as any)}
                            className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-hidden"
                          >
                            <option value="text">Text / String</option>
                            <option value="choice">Multiple Choice</option>
                            <option value="boolean">Yes / No Toggle</option>
                            <option value="file">Media file attachment</option>
                          </select>
                        </div>

                        {/* Required Toggler */}
                        <div className="flex flex-col justify-end">
                          <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer py-3 select-none">
                            <input
                              type="checkbox"
                              checked={newQRequired}
                              onChange={(e) => setNewQRequired(e.target.checked)}
                              className="w-3.5 h-3.5 accent-lime-400"
                            />
                            <span>Strictly Required</span>
                          </label>
                        </div>
                      </div>

                      {/* Options input (choices only) */}
                      {newQType === 'choice' && (
                        <div>
                          <label className="text-3xs uppercase font-extrabold tracking-widest text-gray-300 block mb-1.5">Options List (comma separated) *</label>
                          <input
                            type="text"
                            value={newQOptions}
                            onChange={(e) => setNewQOptions(e.target.value)}
                            placeholder="e.g. Actor, Model, Singer, Dancer"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-hidden"
                          />
                        </div>
                      )}

                      {/* CONDITIONAL DEPENDENCY LOGIC */}
                      <div className="h-[1px] bg-white/5 my-1" />

                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-bold text-gray-400 uppercase tracking-wider">Dynamic Conditional logic</span>
                        <input
                          type="checkbox"
                          checked={newQConditional}
                          onChange={(e) => setNewQConditional(e.target.checked)}
                          className="w-3.5 h-3.5 accent-lime-500 cursor-pointer"
                        />
                      </div>

                      {newQConditional && (
                        <div className="p-3 bg-white/2 rounded-xl border border-white/5 flex flex-col gap-3">
                          <div>
                            <label className="text-3xs uppercase text-gray-400">Only display if another question ID matches</label>
                            <select
                              value={newQCondOnId}
                              onChange={(e) => setNewQCondOnId(e.target.value)}
                              className="w-full mt-1.5 bg-zinc-900 border border-white/5 rounded p-2 text-3xs text-white"
                            >
                              <option value="">Select question reference...</option>
                              {questions.map((q) => (
                                <option key={q.id} value={q.id}>{q.label}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-3xs uppercase text-gray-400">Equals this selection value</label>
                            <input
                              type="text"
                              value={newQCondValue}
                              onChange={(e) => setNewQCondValue(e.target.value)}
                              className="w-full mt-1.5 bg-white/5 border border-white/5 rounded p-2 text-3xs text-white"
                              placeholder="e.g. true, Singer, Male"
                            />
                          </div>
                        </div>
                      )}

                      {/* Submit Actions */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          onClick={() => handleCreateQuestion()}
                          className="flex-1 bg-lime-400 hover:bg-lime-500 text-black py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                        >
                          Save New Question
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddQuestion(false)}
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider"
                        >
                          Cancel
                        </button>
                      </div>

                    </motion.div>
                  ) : (
                    <div className="h-44 flex flex-col items-center justify-center text-center text-gray-500 text-xs border border-dashed border-white/5 rounded-3xl p-6">
                      <Layers className="w-8 h-8 text-gray-600 mb-2" />
                      <span>Click the "Create Question" button above to append dynamic customizable prompts!</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
