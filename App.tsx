
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FORM_SECTIONS } from './constants';
import { FormData, AIAnalysis, Submission } from './types';
import QuestionField from './components/QuestionField';
import AIReport from './components/AIReport';
import AdminDashboard from './components/AdminDashboard';
import { generateDiagnosticReport } from './services/gemini';
import { saveSubmission, getAppSettings, updateSubmissionSyncStatus, saveDraft, getDraft, clearDraft } from './services/storage';
import { syncToGoogleDrive } from './services/googleDrive';

const ADMIN_PIN = "8888";

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const adminClickCount = useRef(0);
  const adminClickTimer = useRef<number | null>(null);

  // Load draft on mount
  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      setFormData(draft.formData);
      setCurrentStep(draft.step);
      setIsStarted(true);
    }
  }, []);

  // Save draft on every change
  useEffect(() => {
    if (isStarted && !analysis) {
      saveDraft(formData, currentStep);
    }
  }, [formData, currentStep, isStarted, analysis]);

  const handleAdminTrigger = () => {
    adminClickCount.current += 1;
    if (adminClickTimer.current) window.clearTimeout(adminClickTimer.current);
    
    if (adminClickCount.current >= 5) {
      handleAdminAccess();
      adminClickCount.current = 0;
    } else {
      adminClickTimer.current = window.setTimeout(() => {
        adminClickCount.current = 0;
      }, 1000);
    }
  };

  const handleFieldChange = useCallback((id: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setError(null);
  }, []);

  const currentSection = FORM_SECTIONS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === FORM_SECTIONS.length - 1;

  const validateStep = (): boolean => {
    if (currentStep === 0) {
      if (!formData.q0_name) {
        setError("Prašome įvesti savo vardą.");
        return false;
      }
      if (!formData.q0_email) {
        setError("Prašome įvesti savo el. pašto adresą.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.q0_email as string)) {
        setError("Prašome įvesti galiojantį el. pašto adresą.");
        return false;
      }
    }
    
    const sectionQuestionIds = currentSection.questions.map(q => q.id);
    const answersInSection = sectionQuestionIds.filter(id => formData[id] !== undefined && formData[id] !== "");
    
    if (answersInSection.length === 0 && currentStep !== 0) {
      setError("Atsakykite bent į vieną klausimą šiame žingsnyje, kad galėtume tęsti analizę.");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < FORM_SECTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await generateDiagnosticReport(formData);
      
      const newSubmission: Submission = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        formData,
        analysis: result,
        syncStatus: 'idle'
      };
      
      saveSubmission(newSubmission);
      setAnalysis(result);
      clearDraft();

      const { googleWebhookUrl } = getAppSettings();
      if (googleWebhookUrl) {
        syncToGoogleDrive(newSubmission).then(success => {
          if (success) updateSubmissionSyncStatus(newSubmission.id, 'success');
          else updateSubmissionSyncStatus(newSubmission.id, 'error');
        });
      }
      
    } catch (e: any) {
      setError(e.message || "Sistemos klaida. Prašome bandyti dar kartą.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setFormData({});
    setAnalysis(null);
    setError(null);
    setIsStarted(false);
    clearDraft();
  };

  const handleAdminAccess = () => {
    setShowPinModal(true);
    setPinError(false);
    setPinInput("");
  };

  const verifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAdminOpen(true);
      setShowPinModal(false);
    } else {
      setPinError(true);
    }
  };

  const progress = useMemo(() => {
    return ((currentStep + 1) / FORM_SECTIONS.length) * 100;
  }, [currentStep]);

  if (isAdminOpen) {
    return <AdminDashboard onClose={() => setIsAdminOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#2c2c2c] selection:bg-[#b89454]/20">
      {showPinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-xl animate-fade">
          <form onSubmit={verifyPin} className="w-full max-w-xs space-y-8 text-center px-6">
            <div className="space-y-2">
              <h3 className="serif text-2xl font-bold text-[#b89454]">Admin Access</h3>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">Įveskite PIN kodą</p>
            </div>
            <input 
              type="password"
              autoFocus
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className={`w-full bg-transparent border-b ${pinError ? 'border-red-500' : 'border-zinc-200'} py-4 text-center text-3xl tracking-[0.5em] focus:outline-none focus:border-[#b89454] transition-all font-light`}
              placeholder="••••"
            />
            {pinError && <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold">Klaida</p>}
          </form>
        </div>
      )}

      {!isStarted ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white">
          <header className="absolute top-12 left-0 w-full flex justify-center">
             <h2 
               onClick={handleAdminTrigger}
               className="serif text-2xl tracking-[0.6em] font-light opacity-90 uppercase cursor-default select-none text-[#2c2c2c]"
             >
               ILUMINACIÓN
             </h2>
          </header>

          <div className="max-w-4xl w-full text-center space-y-12 animate-fade z-10 flex flex-col items-center">
            <div className="luxury-logo-container py-4">
              <div className="aura-glow-static"></div>
              <span className="serif text-[8rem] md:text-[11rem] leading-none font-normal gold-8x-sculpture select-none">
                8X
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="serif text-2xl md:text-4xl font-normal tracking-[0.2em] uppercase text-zinc-800 leading-tight">
                PINIGŲ: ENERGIJA, DAŽNIS, VIBRACIJA
              </h1>
              <div className="h-px w-12 bg-[#b89454] mx-auto"></div>
              <p className="text-zinc-400 text-[10px] tracking-[0.5em] uppercase font-black max-w-md mx-auto">
                VIP DIAGNOSTIKOS PROTOKOLAS
              </p>
            </div>
            
            <button 
              onClick={() => setIsStarted(true)}
              className="btn-brand px-20 py-5 rounded-full text-[10px] tracking-[0.4em] mt-6"
            >
              PRADĖTI
            </button>
          </div>
          
          <footer className="absolute bottom-12 left-0 w-full text-center px-4">
            <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-300 font-bold leading-relaxed">
              <span className="block mb-1">EST. 2022</span>
              <span className="block">VISI ĮRANKIAI: <a href="https://www.rejus.lt/hero" target="_blank" rel="noopener noreferrer" className="text-[#b89454] hover:text-[#2c2c2c] transition-colors underline underline-offset-4">HEROJAUS KELIONĖ</a></span>
            </p>
          </footer>
        </div>
      ) : isAnalyzing ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12">
          <div className="relative">
              <div className="w-16 h-16 border-2 border-zinc-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-[#b89454] rounded-full animate-spin"></div>
          </div>
          <div className="space-y-4 max-w-md">
            <h2 className="serif text-3xl font-light text-zinc-800 uppercase tracking-widest">Sintezė vyksta...</h2>
            <p className="text-zinc-400 text-[10px] tracking-widest uppercase font-bold">Analizuojama tapatybės struktūra</p>
          </div>
        </div>
      ) : analysis ? (
        <main className="min-h-screen pt-20 px-6 pb-20">
          <AIReport 
            analysis={analysis} 
            userEmail={formData.q0_email as string} 
            onReset={reset} 
          />
        </main>
      ) : (
        <div className="min-h-screen flex flex-col items-center py-12 px-6">
          <header className="w-full max-w-4xl mb-12 space-y-6 no-print">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-6">
              <h1 
                onClick={handleAdminTrigger}
                className="serif text-xl font-bold tracking-[0.3em] cursor-default select-none uppercase"
              >
                ILUMINACIÓN
              </h1>
              <div className="text-right">
                  <span className="text-zinc-400 text-[9px] font-black uppercase tracking-widest block mb-1">PROGRESAS</span>
                  <div className="text-lg serif text-[#b89454] font-bold tracking-widest leading-none">
                    {Math.round(progress)}%
                  </div>
              </div>
            </div>
            
            {/* Vivid Progress Bar */}
            <div className="w-full h-2 bg-zinc-200/40 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-[#b89454] transition-all duration-700 ease-out progress-glow rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </header>

          <main className="w-full max-w-3xl flex-1 flex flex-col animate-fade">
            <div className="bg-white card-shadow p-10 md:p-16 rounded-lg space-y-12">
              <div className="space-y-3">
                <h2 className="serif text-2xl text-zinc-800 font-bold uppercase tracking-wider">{currentSection.title}</h2>
                <div className="h-1 w-12 bg-[#b89454]"></div>
              </div>

              <div className="space-y-14">
                {currentSection.questions.map((q) => (
                  <QuestionField
                    key={q.id}
                    question={q}
                    value={formData[q.id]}
                    onChange={handleFieldChange}
                  />
                ))}
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-sm text-[10px] tracking-widest uppercase font-bold text-center border border-red-100 animate-pulse">
                  {error}
                </div>
              )}

              <div className="pt-12 flex flex-col sm:flex-row items-center sm:justify-between gap-8 border-t border-zinc-50">
                {!isFirstStep ? (
                  <button
                    onClick={handleBack}
                    className="text-zinc-400 hover:text-black transition-colors uppercase tracking-widest text-[9px] font-bold py-2 order-1"
                  >
                    Atgal
                  </button>
                ) : <div className="hidden sm:block order-1" />}
                
                <button
                  onClick={handleNext}
                  className="btn-brand w-full sm:w-auto px-12 py-5 rounded-full text-[10px] order-2"
                >
                  {isLastStep ? "BAIGTI" : "TĘSTI"}
                </button>
              </div>
            </div>

            <footer className="mt-12 text-center opacity-30 px-4">
                <p className="text-zinc-400 text-[8px] uppercase tracking-[0.4em] leading-relaxed">
                  <span className="block mb-1">EST. 2022</span>
                  <span className="block">VISI ĮRANKIAI: <a href="https://www.rejus.lt/hero" target="_blank" rel="noopener noreferrer" className="hover:text-[#b89454] transition-colors">HEROJAUS KELIONĖ</a></span>
                </p>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
