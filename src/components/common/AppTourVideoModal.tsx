import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../services/soundEngine';
import {
  X,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  FileText,
  CheckCircle2,
  Tv,
  ArrowRight,
} from 'lucide-react';

interface AppTourVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: () => void;
  onOpenAITutor: () => void;
}

export const AppTourVideoModal: React.FC<AppTourVideoModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
  onOpenAITutor,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);

  const steps = [
    {
      title: '1. Select Your Subject & Chapter',
      tag: 'Curriculum & Video Masterclass',
      description:
        'Access complete textbook chapters organized according to the official BISE Swat syllabus. Watch high-yield video lectures, study topic summaries, and practice solved numericals.',
      highlights: [
        'Organized in official textbook order with chapter roadmaps',
        'Top video lectures curated from renowned educators',
        'Step-by-step solved numericals with standard SI units',
      ],
      actionLabel: 'Explore Syllabus',
    },
    {
      title: '2. Ask Ceron AI Any Board Question',
      tag: 'Distraction-Free Claude-Style Assistant',
      description:
        'Ask anything from your syllabus. Ceron AI provides complete 4-mark model answers, formula derivations, and examiner notes formatted for maximum marks in board exams.',
      highlights: [
        'Instant step-by-step derivations & definitions',
        'Structured in clean 1-mark-per-point layout',
        'Examiner tips highlighting common student mistakes',
      ],
      actionLabel: 'Open AI Tutor',
    },
    {
      title: '3. Take 50-MCQ Board Mock Exams',
      tag: 'Official Exam Simulation',
      description:
        'Test your preparation with unlimited 50-MCQ timed practice exams for each chapter. Real-time clock, instant scoring, and explanations for every question.',
      highlights: [
        '50 randomized MCQs generated per chapter',
        'Real board examination timer and grading rules',
        'Detailed answer analysis to reinforce key concepts',
      ],
      actionLabel: 'Take Practice Exam',
    },
  ];

  // Auto advance every 10 seconds (10000ms) as requested
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setProgressKey((k) => k + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, steps.length, currentStep]);

  if (!isOpen) return null;

  const current = steps[currentStep];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-xl w-full text-white rounded-3xl overflow-hidden shadow-2xl my-auto flex flex-col border border-slate-700/80"
        style={{ backgroundColor: '#0B0F19' }}
      >
        {/* Top Header */}
        <div
          className="p-4 px-5 border-b border-slate-800 flex items-center justify-between"
          style={{ backgroundColor: '#111726' }}
        >
          <div className="flex items-center gap-2.5">
            <span
              className="w-7 h-7 rounded-lg text-indigo-400 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
            >
              <Tv size={14} />
            </span>
            <div>
              <h3 className="font-semibold text-white text-xs sm:text-sm tracking-tight">
                How Ceron Works &bull; 1-Minute Walkthrough
              </h3>
              <p className="text-[11px] text-slate-400">
                Step {currentStep + 1} of {steps.length} &bull; 10s per slide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-slate-300" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* 10-Second Progress Bar */}
        <div className="w-full h-1 bg-slate-800 overflow-hidden">
          {isPlaying && (
            <div
              key={progressKey}
              className="h-full bg-indigo-500"
              style={{
                animation: 'progressFill 10s linear infinite',
              }}
            />
          )}
        </div>

        {/* Step Content Screen */}
        <div
          className="p-6 sm:p-8 space-y-5 text-slate-100"
          style={{ backgroundColor: '#0B0F19' }}
        >
          {/* Tag & Step Dots */}
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-indigo-300"
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.18)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
            >
              {current.tag}
            </span>

            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundEngine.playPop();
                    setCurrentStep(idx);
                    setProgressKey((k) => k + 1);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentStep === idx
                      ? 'w-7 bg-indigo-500'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Heading & Description */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {current.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {current.description}
            </p>
          </div>

          {/* Highlights Box */}
          <div
            className="rounded-2xl p-4 space-y-2.5 border border-slate-800"
            style={{ backgroundColor: '#111726' }}
          >
            {current.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div
          className="p-4 px-5 border-t border-slate-800 flex items-center justify-between gap-3"
          style={{ backgroundColor: '#080C14' }}
        >
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                soundEngine.playPop();
                setCurrentStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
                setProgressKey((k) => k + 1);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                setCurrentStep((prev) => (prev + 1) % steps.length);
                setProgressKey((k) => k + 1);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Next Step"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              if (currentStep === 1) {
                onOpenAITutor();
              } else if (currentStep === 2) {
                onStartExam();
              }
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>{current.actionLabel}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
export default AppTourVideoModal;
