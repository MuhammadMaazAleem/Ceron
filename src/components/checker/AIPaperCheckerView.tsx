import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LearnerProfile, Unit, Subject } from '../../types';
import {
  CeronAIService,
  PaperCheckerQuestion,
  PaperCheckerQuestionsResult,
  AnswerEvaluationResult,
} from '../../services/ceronAIService';
import { soundEngine } from '../../services/soundEngine';
import {
  Sparkles,
  Camera,
  Upload,
  RefreshCw,
  X,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  BookOpen,
  Award,
  ChevronDown,
  Loader2,
  HelpCircle,
  RotateCcw,
  Edit3,
  GraduationCap,
} from 'lucide-react';

interface AIPaperCheckerViewProps {
  profile: LearnerProfile;
  units: Unit[];
  subjects: Subject[];
  initialUnitId?: string;
  onExit: () => void;
}

export const AIPaperCheckerView: React.FC<AIPaperCheckerViewProps> = ({
  profile,
  units,
  subjects,
  initialUnitId,
  onExit,
}) => {
  // ── 1. SUBJECT & CHAPTER FILTERING (STRICTLY CLASS-EXCLUSIVE) ──
  // Filter subjects available for the student's active class
  const classSubjects = useMemo(() => {
    return subjects.filter((s) => s.classes.includes(profile.classId));
  }, [subjects, profile.classId]);

  // Determine initial subject from initialUnitId if provided
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(() => {
    if (initialUnitId) {
      const match = units.find((u) => u.id === initialUnitId);
      if (match && match.classId === profile.classId) {
        return match.subjectId;
      }
    }
    return classSubjects[0]?.id || 'sub_phy';
  });

  // Synchronize subject when active class changes
  useEffect(() => {
    const isValid = classSubjects.some((s) => s.id === selectedSubjectId);
    if (!isValid && classSubjects.length > 0) {
      setSelectedSubjectId(classSubjects[0].id);
    }
  }, [profile.classId, classSubjects, selectedSubjectId]);

  // Chapters strictly filtered by BOTH active class AND selected subject!
  const subjectUnits = useMemo(() => {
    return units.filter(
      (u) => u.classId === profile.classId && u.subjectId === selectedSubjectId
    );
  }, [units, profile.classId, selectedSubjectId]);

  // Selected unit: match initialUnitId (if valid for this subject) or default to first chapter
  const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>(() => {
    if (initialUnitId) {
      const match = subjectUnits.find((u) => u.id === initialUnitId);
      if (match) return match;
    }
    return subjectUnits[0];
  });

  // Auto-reset selectedUnit when subject or class changes
  useEffect(() => {
    if (!selectedUnit || selectedUnit.subjectId !== selectedSubjectId || selectedUnit.classId !== profile.classId) {
      setSelectedUnit(subjectUnits[0]);
    }
  }, [selectedSubjectId, profile.classId, subjectUnits]);

  // ── 2. QUESTION & SUBMISSION STATE ──
  const [questions, setQuestions] = useState<PaperCheckerQuestionsResult | null>(null);
  const [activeQuestionTab, setActiveQuestionTab] = useState<'short' | 'long'>('short');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  const [submissionMode, setSubmissionMode] = useState<'photo' | 'text'>('photo');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [typedAnswer, setTypedAnswer] = useState<string>('');

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<AnswerEvaluationResult | null>(null);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const submissionSectionRef = useRef<HTMLDivElement>(null);

  const handleSwitchMode = (mode: 'photo' | 'text') => {
    soundEngine.playPop();
    setSubmissionMode(mode);
    setTimeout(() => {
      submissionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  // Load questions when selected chapter changes
  useEffect(() => {
    if (!selectedUnit) return;
    loadQuestionsForUnit(selectedUnit, false);
    // Reset submission when chapter changes
    setImagePreview(null);
    setImageFileName('');
    setTypedAnswer('');
    setEvaluationResult(null);
    setEvaluationError(null);
  }, [selectedUnit?.id]);

  const loadQuestionsForUnit = async (unit: Unit, forceAI: boolean = false) => {
    setIsGeneratingQuestions(true);
    const sub = subjects.find((s) => s.id === unit.subjectId);
    const subjectName = sub?.nameEn || 'General Science';
    try {
      const qResult = await CeronAIService.generatePaperCheckerQuestions(
        unit,
        subjectName,
        profile.className || 'Board Examination',
        forceAI
      );
      setQuestions(qResult);
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleRefreshQuestions = () => {
    if (!selectedUnit || isGeneratingQuestions) return;
    soundEngine.playPop();
    setEvaluationResult(null);
    loadQuestionsForUnit(selectedUnit, true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      soundEngine.playPop();
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImagePreview(null);
    setImageFileName('');
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  const currentQuestion: PaperCheckerQuestion | undefined =
    activeQuestionTab === 'short' ? questions?.shortQ : questions?.longQ;

  const handleEvaluate = async () => {
    if (!currentQuestion || !selectedUnit) return;
    if (submissionMode === 'photo' && !imagePreview && !typedAnswer.trim()) {
      setEvaluationError('Please take a photo or upload an image of your handwritten paper, or switch to "Type or Paste Answer" below.');
      return;
    }
    if (submissionMode === 'text' && !typedAnswer.trim() && !imagePreview) {
      setEvaluationError('Please type or paste your written answer in the text box before submitting.');
      return;
    }

    soundEngine.playPop();
    setIsEvaluating(true);
    setEvaluationError(null);
    setEvaluationResult(null);

    const sub = subjects.find((s) => s.id === selectedUnit.subjectId);
    const subjectName = sub?.nameEn || 'General Science';

    try {
      const res = await CeronAIService.evaluateWrittenAnswer({
        questionText: currentQuestion.questionEn,
        maxMarks: currentQuestion.marks,
        studentAnswer: typedAnswer.trim(),
        imageBase64: imagePreview || undefined,
        subjectName,
        chapterTitle: selectedUnit.titleEn,
        className: profile.className || 'Board Exam Standard',
      });

      if (!res.success && res.error === 'NO_API_KEY') {
        setEvaluationError('AI service is not configured. Please check connection and try again.');
      } else if (!res.success) {
        setEvaluationError(res.feedbackSummary || res.error || 'Evaluation could not be completed. Please try again.');
      } else {
        setEvaluationResult(res);
        soundEngine.playCorrect();
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during paper evaluation.';
      setEvaluationError(msg);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Single button handler for the generated guide / evaluation result
  const handleCheckAnother = () => {
    soundEngine.playPop();
    setImagePreview(null);
    setImageFileName('');
    setTypedAnswer('');
    setEvaluationResult(null);
    setEvaluationError(null);
    setTimeout(() => {
      questionCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Helper to clean up chapter titles: removes redundant "Unit X:" / "Chapter X:" and "(12% Board Weightage)"
  const cleanChapterTitle = (u: Unit) => {
    return u.titleEn
      .replace(/^((Unit|Chapter)\s+\d+:\s*)+/gi, '')
      .replace(/\s*\(\d+%\s*Board\s*Weightage\)/gi, '')
      .replace(/\s*\([A-Za-z\s]+\)$/gi, '')
      .trim();
  };

  const activeSubject = classSubjects.find((s) => s.id === selectedSubjectId) || classSubjects[0];

  return (
    <div className="w-full min-h-screen bg-[#FAF9F5] text-[#1E1B18] font-sans antialiased pb-28">
      {/* ── Top Bar (Clean & Never Clipped) ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs px-4 sm:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs">
              <FileCheck2 size={19} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-none truncate">
                  Ceron AI Paper Checker
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                  BISE Swat
                </span>
              </div>
              <p className="text-xs text-stone-500 font-nastaliq mt-0.5 truncate" dir="rtl">
                ممتحن پیپر چیکر • خودکار مارکنگ
              </p>
            </div>
          </div>

          {/* Sleek Exit Button Styled Identically to AI Tutor */}
          <button
            onClick={onExit}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid #DCD7CE',
              backgroundColor: '#FFFFFF',
              color: '#4B463F',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'all 0.15s ease',
            }}
            className="hover:bg-stone-50 hover:border-stone-400 shrink-0"
            title="Exit to Dashboard"
          >
            <span>Exit</span>
            <X size={13} />
          </button>
        </div>
      </header>

      {/* ── Main Workspace ── */}
      <main className="max-w-3xl w-full mx-auto px-3.5 sm:px-6 pt-5 space-y-5">
        {/* ── Step 1: Subject Switcher & Chapter Navigator Card ── */}
        <section
          style={{
            border: '1.5px solid #E2E8F0',
            borderRadius: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
          className="bg-white p-4 sm:p-5 space-y-4"
        >
          {/* Header row with Class badge */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-stone-200/60">
            <div className="flex items-center gap-1.5">
              <GraduationCap size={16} className="text-amber-800" />
              <span className="text-xs sm:text-sm font-bold text-stone-900">
                {profile.className || 'Board Examination'}
              </span>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Select Subject &amp; Chapter to Grade
            </span>
          </div>

          {/* Subject Switcher Pills (Matching Syllabus Section Style) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              1. Choose Subject:
            </label>
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none snap-x -mx-1 px-1">
              {classSubjects.map((sub) => {
                const isSelected = sub.id === selectedSubjectId;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      soundEngine.playPop();
                      setSelectedSubjectId(sub.id);
                    }}
                    style={{
                      backgroundColor: isSelected ? '#1C1917' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#334155',
                      border: isSelected ? '1.5px solid #1C1917' : '1.5px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.12)' : '0 1px 2px rgba(0,0,0,0.03)',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.15s ease',
                    }}
                    className="shrink-0 font-bold text-xs sm:text-sm cursor-pointer flex items-center gap-2 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <span className="text-base sm:text-lg">{sub.icon}</span>
                    <span className="whitespace-nowrap">{sub.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter Selector Dropdown (Clean, Only Current Subject Chapters) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label htmlFor="chapter-select" className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                2. Choose Chapter ({activeSubject?.nameEn || 'Subject'}):
              </label>
              <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                {subjectUnits.length} Chapters Available
              </span>
            </div>

            <div className="relative">
              <select
                id="chapter-select"
                value={selectedUnit?.id || ''}
                onChange={(e) => {
                  const u = subjectUnits.find((item) => item.id === e.target.value);
                  if (u) {
                    soundEngine.playPop();
                    setSelectedUnit(u);
                  }
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '12px',
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  padding: '12px 42px 12px 14px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease',
                }}
                className="w-full appearance-none hover:border-slate-400 focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200/60 cursor-pointer"
              >
                {subjectUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {cleanChapterTitle(u)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none"
              />
            </div>

            {/* Selected Chapter Urdu Translation */}
            {selectedUnit?.titleUr && (
              <div className="pt-1.5 text-right" dir="rtl">
                <span className="text-sm font-nastaliq text-stone-800 font-bold leading-relaxed">
                  {selectedUnit.titleUr}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ── Step 2: Official Board Questions Card ── */}
        <section
          ref={questionCardRef}
          style={{
            scrollMarginTop: '80px',
            border: '1.5px solid #E2E8F0',
            borderRadius: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
          className="bg-white overflow-hidden transition-all"
        >
          {/* Card Header & Re-roll Button */}
          <div className="px-5 py-3.5 flex items-center justify-between border-b border-stone-200/80 bg-[#FAF9F5]/70">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-800" />
              <h2 className="font-serif text-sm sm:text-base font-bold text-stone-900 m-0">
                Official Board Questions (امتحانی سوالات)
              </h2>
            </div>

            <button
              onClick={handleRefreshQuestions}
              disabled={isGeneratingQuestions}
              style={{
                borderRadius: '8px',
                border: '1.5px solid #CBD5E1',
              }}
              className="text-xs font-bold text-amber-900 bg-white hover:bg-stone-100 px-3 py-1.5 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
              title="Generate fresh questions for this chapter"
            >
              <RefreshCw
                size={12}
                className={isGeneratingQuestions ? 'animate-spin text-amber-700' : 'text-amber-700'}
              />
              <span>{isGeneratingQuestions ? 'Generating...' : '🔄 New Questions'}</span>
            </button>
          </div>

          {/* Question Selector Tabs (Q1 Short vs Q2 Long) with High Contrast */}
          <div className="p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2.5">
              {/* Question 1 Tab */}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  setActiveQuestionTab('short');
                  setEvaluationResult(null);
                }}
                style={{
                  backgroundColor: activeQuestionTab === 'short' ? '#1C1917' : '#FFFFFF',
                  color: activeQuestionTab === 'short' ? '#FFFFFF' : '#334155',
                  border: activeQuestionTab === 'short' ? '1.5px solid #1C1917' : '1.5px solid #CBD5E1',
                  borderRadius: '12px',
                  boxShadow: activeQuestionTab === 'short' ? '0 2px 6px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
                }}
                className="flex-1 py-3 px-3 text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Question 1 • Section B</span>
                <span
                  style={{
                    backgroundColor: activeQuestionTab === 'short' ? '#78350F' : '#F1F5F9',
                    color: activeQuestionTab === 'short' ? '#FEF3C7' : '#475569',
                  }}
                  className="text-xs font-bold px-2 py-0.5 rounded-md"
                >
                  4 Marks
                </span>
              </button>

              {/* Question 2 Tab */}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  setActiveQuestionTab('long');
                  setEvaluationResult(null);
                }}
                style={{
                  backgroundColor: activeQuestionTab === 'long' ? '#1C1917' : '#FFFFFF',
                  color: activeQuestionTab === 'long' ? '#FFFFFF' : '#334155',
                  border: activeQuestionTab === 'long' ? '1.5px solid #1C1917' : '1.5px solid #CBD5E1',
                  borderRadius: '12px',
                  boxShadow: activeQuestionTab === 'long' ? '0 2px 6px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.03)',
                }}
                className="flex-1 py-3 px-3 text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Question 2 • Section C</span>
                <span
                  style={{
                    backgroundColor: activeQuestionTab === 'long' ? '#78350F' : '#F1F5F9',
                    color: activeQuestionTab === 'long' ? '#FEF3C7' : '#475569',
                  }}
                  className="text-xs font-bold px-2 py-0.5 rounded-md"
                >
                  8 Marks
                </span>
              </button>
            </div>

            {/* Current Active Question Display */}
            {isGeneratingQuestions ? (
              <div className="py-10 text-center text-stone-500 space-y-2.5 animate-fadeIn">
                <Loader2 size={24} className="animate-spin mx-auto text-amber-800" />
                <p className="text-xs font-semibold">Generating authentic BISE Swat board examination questions...</p>
              </div>
            ) : currentQuestion ? (
              <div
                style={{
                  backgroundColor: '#FCFAF7',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                }}
                className="p-4 sm:p-5 space-y-3 transition-all animate-smoothExpand"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-stone-200 text-stone-800">
                    {currentQuestion.section}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {currentQuestion.marks} Marks Maximum
                  </span>
                </div>

                {/* English Question (Sanitized of redundant prefixes) */}
                <h4 className="font-serif text-base sm:text-lg font-bold leading-snug text-stone-900">
                  {currentQuestion.questionEn.replace(/(Unit|Chapter)\s+\d+:\s*/gi, '')}
                </h4>

                {/* Urdu Translation (Sanitized of redundant prefixes) */}
                {currentQuestion.questionUr && (
                  <p className="text-base font-nastaliq text-stone-800 leading-loose pt-1 border-t border-stone-200/60" dir="rtl">
                    {currentQuestion.questionUr.replace(/(باب|یونٹ)\s+\d+:\s*/gi, '')}
                  </p>
                )}

                {/* Board Marking Tip */}
                {currentQuestion.boardTip && (
                  <div className="pt-1 flex items-start gap-2.5 text-xs text-amber-950 bg-amber-50 border border-amber-200 p-3 rounded-xl">
                    <HelpCircle size={15} className="shrink-0 mt-0.5 text-amber-700" />
                    <span>
                      <strong className="font-bold">Examiner Marking Guide: </strong>
                      {currentQuestion.boardTip}
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </section>

        {/* ── Step 3: Student Paper Submission Section (Noticeable, Elegant & Dual-Mode) ── */}
        <section
          ref={submissionSectionRef}
          style={{
            scrollMarginTop: '80px',
            border: '1.5px solid #E2E8F0',
            borderRadius: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
          }}
          className="bg-white p-5 sm:p-6 space-y-4"
        >
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Step 3: Student Paper Submission
            </span>
            <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-tight">
              Submit Your Answer for Instant AI Grading
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Snap a clear photo of your handwritten paper sheet or type your answer text directly for official BISE Swat rubric evaluation.
            </p>
          </div>

          {/* ── Prominent Submission Mode Switcher (Always Noticeable to New Users) ── */}
          <div className="flex p-1 bg-stone-100/90 rounded-xl border border-stone-200/80 gap-1">
            {/* Mode 1: Photo Upload */}
            <button
              type="button"
              onClick={() => handleSwitchMode('photo')}
              style={{
                backgroundColor: submissionMode === 'photo' ? '#FFFFFF' : 'transparent',
                color: submissionMode === 'photo' ? '#1C1917' : '#78716C',
                boxShadow: submissionMode === 'photo' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Camera size={16} className={submissionMode === 'photo' ? 'text-amber-700' : 'text-stone-400'} />
              <span>Option 1: Upload Paper Photo</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                Recommended
              </span>
            </button>

            {/* Mode 2: Type / Paste Text */}
            <button
              type="button"
              onClick={() => handleSwitchMode('text')}
              style={{
                backgroundColor: submissionMode === 'text' ? '#FFFFFF' : 'transparent',
                color: submissionMode === 'text' ? '#1C1917' : '#78716C',
                boxShadow: submissionMode === 'text' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Edit3 size={16} className={submissionMode === 'text' ? 'text-amber-700' : 'text-stone-400'} />
              <span>Option 2: Type Answer Text</span>
              {typedAnswer.trim() && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Text answer entered" />
              )}
            </button>
          </div>

          {/* Hidden File Inputs */}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={cameraInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            type="file"
            accept="image/*"
            ref={galleryInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* ── Mode 1: Photo Upload Interface ── */}
          {submissionMode === 'photo' && (
            <div className="space-y-3 animate-fadeIn">
              {imagePreview ? (
                /* Image Preview Box */
                <div className="rounded-xl border border-stone-200 bg-[#FAF9F5] p-3 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-3.5 p-2 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-20 sm:w-20 sm:h-24 shrink-0 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center">
                      <img
                        src={imagePreview}
                        alt="Student Handwritten Paper"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Info & Quick Actions */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 size={15} className="shrink-0" />
                        <span className="text-xs font-bold text-stone-900 truncate">
                          Handwritten Paper Attached
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 truncate">
                        {imageFileName || 'handwritten_answer.jpg'}
                      </p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => cameraInputRef.current?.click()}
                          className="text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg border border-amber-200 transition cursor-pointer"
                        >
                          📷 Retake
                        </button>
                        <button
                          type="button"
                          onClick={handleClearImage}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1 text-xs">
                    <span className="text-stone-500">Paper sheet verified</span>
                    <span className="font-bold text-emerald-700">✓ Ready to Grade</span>
                  </div>
                </div>
              ) : (
                /* Dual Upload Cards (With Permanent Vertical Line Separation) */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Option 1A: Mobile Camera */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      soundEngine.playPop();
                      cameraInputRef.current?.click();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        cameraInputRef.current?.click();
                      }
                    }}
                    style={{
                      backgroundColor: '#FFFDF7',
                      border: '1.5px dashed #F59E0B',
                      borderRadius: '16px',
                      padding: '22px 18px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    className="hover:-translate-y-0.5 hover:shadow-sm group select-none"
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                      }}
                      className="group-hover:scale-110 transition-transform"
                    >
                      <Camera size={24} />
                    </div>
                    <h4
                      style={{
                        display: 'block',
                        margin: 0,
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#1C1917',
                        lineHeight: 1.3,
                      }}
                    >
                      Take Photo with Camera
                    </h4>
                    <p
                      style={{
                        display: 'block',
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#78716C',
                        lineHeight: 1.4,
                      }}
                    >
                      Directly snap handwritten sheet from mobile
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                      }}
                    >
                      ⚡ Instant Board OCR
                    </span>
                  </div>

                  {/* Option 1B: Gallery / Device Storage */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      soundEngine.playPop();
                      galleryInputRef.current?.click();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        galleryInputRef.current?.click();
                      }
                    }}
                    style={{
                      backgroundColor: '#F8FAFC',
                      border: '1.5px dashed #818CF8',
                      borderRadius: '16px',
                      padding: '22px 18px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    className="hover:-translate-y-0.5 hover:shadow-sm group select-none"
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        backgroundColor: '#EEF2FF',
                        color: '#3730A3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '10px',
                      }}
                      className="group-hover:scale-110 transition-transform"
                    >
                      <Upload size={24} />
                    </div>
                    <h4
                      style={{
                        display: 'block',
                        margin: 0,
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#1C1917',
                        lineHeight: 1.3,
                      }}
                    >
                      Upload from Gallery / Files
                    </h4>
                    <p
                      style={{
                        display: 'block',
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#78716C',
                        lineHeight: 1.4,
                      }}
                    >
                      Select JPG, PNG, or scanned sheet
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '8px',
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        backgroundColor: '#EEF2FF',
                        color: '#3730A3',
                      }}
                    >
                      📁 Device Storage
                    </span>
                  </div>
                </div>
              )}

              {/* Noticeable Quick Switcher Callout Banner */}
              <div
                style={{
                  backgroundColor: '#FAF9F5',
                  border: '1px solid #E7E5E4',
                  borderRadius: '12px',
                  padding: '10px 14px',
                }}
                className="flex items-center justify-between flex-wrap gap-2"
              >
                <span className="text-xs text-stone-600">
                  Don&apos;t have a physical paper sheet right now?
                </span>
                <button
                  type="button"
                  onClick={() => handleSwitchMode('text')}
                  className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer underline decoration-amber-400"
                >
                  <Edit3 size={13} />
                  <span>Type or paste answer text instead &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* ── Mode 2: Prominent Dedicated Text Answer Workspace ── */}
          {submissionMode === 'text' && (
            <div
              style={{
                backgroundColor: '#FAF9F5',
                border: '1.5px solid #FCD34D',
                borderRadius: '16px',
                padding: '18px',
              }}
              className="space-y-3 animate-fadeIn"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 border border-amber-200/80 flex items-center justify-center font-bold shrink-0">
                    <Edit3 size={16} />
                  </div>
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#1C1917',
                      }}
                    >
                      Type or Paste Your Written Answer (جواب یہاں لکھیں)
                    </h4>
                    <p
                      style={{
                        margin: '2px 0 0',
                        fontSize: '11px',
                        color: '#78716C',
                      }}
                    >
                      Write your solution in English or Urdu script. Both are supported.
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                  }}
                >
                  Keyboard Input Mode
                </span>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder={`Type your exam answer here...\n\nRecommended structure for full marks:\n1. Scientific Definition / Law\n2. Mathematical Formula / Equation\n3. Explanation of Variables & Units\n4. Practical Application / Example`}
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    borderRadius: '12px',
                    border: '1.5px solid #D6D3D1',
                    backgroundColor: '#FFFFFF',
                    color: '#1C1917',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                  className="focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition"
                />
              </div>

              {/* Text Statistics Bar & Clear Action */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-0.5">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-stone-700">
                    {typedAnswer.trim() ? typedAnswer.trim().split(/\s+/).length : 0} words
                  </span>
                  <span>•</span>
                  <span>{typedAnswer.length} characters</span>
                </div>
                {typedAnswer.trim() && (
                  <button
                    type="button"
                    onClick={() => setTypedAnswer('')}
                    className="text-stone-400 hover:text-rose-600 transition cursor-pointer text-xs"
                  >
                    Clear text
                  </button>
                )}
              </div>

              {/* Examiner Tip Advisory */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <HelpCircle size={15} className="shrink-0 mt-0.5 text-amber-700" />
                <span>
                  <strong>Examiner Guidance:</strong> Writing in numbered points with headings helps the AI award maximum marks matching the official BISE Swat marking scheme.
                </span>
              </div>

              {/* Switch Back to Photo */}
              <div className="pt-1 flex items-center justify-between text-xs border-t border-stone-200/80">
                <span className="text-stone-500">Have a handwritten paper sheet?</span>
                <button
                  type="button"
                  onClick={() => handleSwitchMode('photo')}
                  className="font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer underline decoration-amber-400"
                >
                  <Camera size={13} />
                  <span>Switch to Camera / Photo Upload &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {evaluationError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertTriangle size={16} className="shrink-0 mt-0.5 text-red-600" />
              <span className="font-medium leading-relaxed">{evaluationError}</span>
            </div>
          )}

          {/* ── Primary "Check My Paper" CTA Button (Guaranteed Obsidian Background & Golden Accent) ── */}
          <button
            type="button"
            disabled={isEvaluating}
            onClick={handleEvaluate}
            style={{
              backgroundColor: '#1C1917',
              color: '#FFFFFF',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
            }}
            className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 hover:bg-black hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            {isEvaluating ? (
              <>
                <Loader2 size={18} className="animate-spin text-amber-400" />
                <span className="text-white">Evaluating Paper According to BISE Swat Rubric...</span>
              </>
            ) : (
              <>
                <Award size={18} style={{ color: '#F59E0B' }} />
                <span className="text-white font-bold">Check My Paper (پیپر چیک کریں)</span>
              </>
            )}
          </button>
        </section>

        {/* ── Official Examination Results Report ── */}
        {evaluationResult && (
          <section
            ref={resultRef}
            style={{
              scrollMarginTop: '80px',
              border: '1.5px solid #E2E8F0',
              borderRadius: '18px',
              boxShadow: '0 2px 14px rgba(0,0,0,0.04)',
            }}
            className="bg-white p-5 sm:p-6 space-y-6 animate-slideUpFade transition-all"
          >
            {/* Header / Score Banner */}
            <div className="bg-[#FAF9F5] rounded-xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                  Official BISE Swat Examiner Result
                </span>
                <h3 className="font-serif text-2xl font-black text-stone-900">
                  Marks: {evaluationResult.awardedMarks} / {evaluationResult.maxMarks}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md">
                  {evaluationResult.feedbackSummary}
                </p>
              </div>

              {/* Grade Badge */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-center min-w-[110px] shadow-2xs">
                <span className="text-xs font-semibold text-stone-500 block">
                  Grade Awarded
                </span>
                <span
                  className="font-serif text-3xl font-black block my-0.5"
                  style={{
                    color:
                      evaluationResult.gradePercentage >= 80
                        ? '#15803D'
                        : evaluationResult.gradePercentage >= 60
                        ? '#B45309'
                        : '#DC2626',
                  }}
                >
                  {evaluationResult.gradePercentage >= 80
                    ? 'A+'
                    : evaluationResult.gradePercentage >= 70
                    ? 'A'
                    : evaluationResult.gradePercentage >= 60
                    ? 'B'
                    : evaluationResult.gradePercentage >= 50
                    ? 'C'
                    : 'F'}
                </span>
                <span className="text-xs font-bold text-stone-600 block">
                  {evaluationResult.gradePercentage}%
                </span>
              </div>
            </div>

            {/* Detailed Rubric Breakdown Table */}
            {evaluationResult.rubricItems.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-700" />
                  <span>Marking Criteria Breakdown (مارکنگ سکیم)</span>
                </h4>
                <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200">
                  {evaluationResult.rubricItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF9F5]"
                    >
                      <div className="flex-1 pr-3">
                        <strong className="text-stone-900 font-bold">{item.criteria}</strong>
                        {item.note && (
                          <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{item.note}</p>
                        )}
                      </div>
                      <div className="shrink-0 font-bold text-stone-900 text-xs bg-white px-3 py-1 rounded-md border border-stone-200 shadow-2xs">
                        {item.marksAwarded} / {item.maxPossible} Marks
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords & Examiner Advisory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Missing Key Terms */}
              {evaluationResult.missingKeyTerms.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-2">
                  <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-red-600 shrink-0" />
                    <span>Missing Scientific Terms (چھوٹی ہوئی اصطلاحات)</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluationResult.missingKeyTerms.map((term, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white border border-red-200 text-red-900 px-2.5 py-0.5 rounded-md font-semibold"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Examiner Tip */}
              {evaluationResult.examinerTips && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-1.5">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-amber-700 shrink-0" />
                    <span>Examiner Guidance (ممتحن کا مشورہ)</span>
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed font-normal">
                    {evaluationResult.examinerTips}
                  </p>
                </div>
              )}
            </div>

            {/* ── 100% Official Board Model Solution ── */}
            <div className="bg-[#FAF9F5] rounded-xl border border-stone-200 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <BookOpen size={15} className="text-amber-800" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Official Board Model Solution (سرکاری ماڈل حل)
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Textbook Standard
                </span>
              </div>

              <div className="text-xs sm:text-sm leading-relaxed text-stone-800 whitespace-pre-line font-mono bg-white p-4 rounded-xl border border-stone-200">
                {evaluationResult.modelAnswer || currentQuestion?.modelAnswerEn || ''}
              </div>

              {currentQuestion?.modelAnswerUr && (
                <div className="text-xs sm:text-sm font-nastaliq text-stone-800 text-right leading-loose bg-stone-50 p-4 rounded-xl border border-stone-200" dir="rtl">
                  {currentQuestion.modelAnswerUr}
                </div>
              )}
            </div>

            {/* ── EXACTLY ONE BUTTON: User never gets confused ── */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCheckAnother}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw size={16} />
                <span>Check Another Answer (اگلا جواب چیک کریں)</span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AIPaperCheckerView;
