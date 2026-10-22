import React, { useState, useEffect, useRef } from 'react';
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
  Eye,
  Trash2,
  Edit3,
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
  // Filter units for active class
  const classUnits = units.filter((u) => u.classId === profile.classId);
  const availableUnits = classUnits.length > 0 ? classUnits : units;

  const defaultUnit =
    (initialUnitId && availableUnits.find((u) => u.id === initialUnitId)) ||
    availableUnits[0];

  const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>(defaultUnit);
  const [questions, setQuestions] = useState<PaperCheckerQuestionsResult | null>(null);
  const [activeQuestionTab, setActiveQuestionTab] = useState<'short' | 'long'>('short');
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  // Submission state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [showTypedInput, setShowTypedInput] = useState(false);

  // Evaluation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<AnswerEvaluationResult | null>(null);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

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
    if (!imagePreview && !typedAnswer.trim()) {
      setEvaluationError('Please take a photo of your handwritten paper or type your answer before submitting.');
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
        className: profile.className || 'Class 10 (BISE Swat)',
      });

      if (!res.success && res.error === 'NO_API_KEY') {
        setEvaluationError('Groq API Key is not configured. Please add your key to proceed with AI paper checking.');
      } else if (!res.success) {
        setEvaluationError(res.feedbackSummary || res.error || 'Evaluation could not be completed. Please try again.');
      } else {
        setEvaluationResult(res);
        soundEngine.playCorrect();
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    } catch (err: any) {
      setEvaluationError(err?.message || 'An unexpected error occurred during paper evaluation.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col font-sans antialiased overflow-y-auto"
      style={{ backgroundColor: '#FAF9F5', color: '#1E1B18' }}
    >
      {/* ── Top Bar ── */}
      <header
        className="sticky top-0 z-30 h-14 px-4 sm:px-8 flex items-center justify-between shrink-0"
        style={{
          borderBottom: '1px solid #EAE5DC',
          backgroundColor: 'rgba(250, 249, 245, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              backgroundColor: '#EFEAE1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileCheck2 size={16} style={{ color: '#825E38' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '17px', color: '#1E1B18' }}>
                Ceron AI Paper Checker
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '12px',
                  backgroundColor: '#EFEAE1',
                  color: '#825E38',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                BISE Swat
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-nastaliq -mt-0.5" dir="rtl">
              ممتحن پیپر چیکر • خودکار مارکنگ
            </p>
          </div>
        </div>

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
          }}
          title="Exit to Dashboard"
        >
          <span>Exit</span>
          <X size={13} />
        </button>
      </header>

      {/* ── Main Scrollable Workspace ── */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 pb-28 space-y-6">
        {/* Chapter & Subject Selector Card */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #EAE5DC',
            padding: '14px 18px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Active Curriculum Chapter
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <BookOpen size={15} style={{ color: '#825E38' }} />
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  {selectedUnit?.titleEn || 'Select Chapter'}
                </h3>
              </div>
              <p className="text-[11px] font-nastaliq text-stone-500" dir="rtl">
                {selectedUnit?.titleUr}
              </p>
            </div>

            {/* Chapter Selector Dropdown */}
            <div className="relative min-w-[220px]">
              <select
                value={selectedUnit?.id || ''}
                onChange={(e) => {
                  const u = availableUnits.find((item) => item.id === e.target.value);
                  if (u) {
                    soundEngine.playPop();
                    setSelectedUnit(u);
                  }
                }}
                className="w-full appearance-none bg-[#FAF9F5] border border-[#DCD7CE] rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-stone-800 focus:outline-none focus:border-amber-700 cursor-pointer"
              >
                {availableUnits.map((u) => {
                  const s = subjects.find((sub) => sub.id === u.subjectId);
                  return (
                    <option key={u.id} value={u.id}>
                      Unit {u.unitNumber}: {u.titleEn} ({s?.nameEn || 'STEM'})
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none"
              />
            </div>
          </div>
        </section>

        {/* ── Official Board Questions Card ── */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #EAE5DC',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            overflow: 'hidden',
          }}
        >
          {/* Card Header & Re-roll Button */}
          <div
            className="px-5 py-3.5 flex items-center justify-between"
            style={{
              backgroundColor: '#FAF9F5',
              borderBottom: '1px solid #EAE5DC',
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={15} style={{ color: '#825E38' }} />
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#1E1B18',
                  margin: 0,
                }}
              >
                Official Board Questions (امتحانی سوالات)
              </h2>
            </div>

            <button
              onClick={handleRefreshQuestions}
              disabled={isGeneratingQuestions}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#825E38',
                backgroundColor: '#FFFFFF',
                border: '1px solid #DCD7CE',
                borderRadius: '8px',
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: isGeneratingQuestions ? 'wait' : 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Generate new random questions for this chapter"
            >
              <RefreshCw
                size={12}
                className={isGeneratingQuestions ? 'animate-spin' : ''}
              />
              <span>{isGeneratingQuestions ? 'Generating...' : '🔄 New Questions'}</span>
            </button>
          </div>

          {/* Question Selector Tabs (Q1 Short vs Q2 Long) */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  setActiveQuestionTab('short');
                  setEvaluationResult(null);
                }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: activeQuestionTab === 'short' ? 700 : 500,
                  border: activeQuestionTab === 'short' ? '1px solid #825E38' : '1px solid #EAE5DC',
                  backgroundColor: activeQuestionTab === 'short' ? '#825E38' : '#FAF9F5',
                  color: activeQuestionTab === 'short' ? '#FFFFFF' : '#5A544D',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Question 1 • Section B (4 Marks)
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  setActiveQuestionTab('long');
                  setEvaluationResult(null);
                }}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: activeQuestionTab === 'long' ? 700 : 500,
                  border: activeQuestionTab === 'long' ? '1px solid #825E38' : '1px solid #EAE5DC',
                  backgroundColor: activeQuestionTab === 'long' ? '#825E38' : '#FAF9F5',
                  color: activeQuestionTab === 'long' ? '#FFFFFF' : '#5A544D',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Question 2 • Section C (8 Marks)
              </button>
            </div>

            {/* Current Active Question Display */}
            {isGeneratingQuestions ? (
              <div className="py-8 text-center text-stone-500 space-y-2">
                <Loader2 size={20} className="animate-spin mx-auto text-amber-800" />
                <p className="text-xs">Generating fresh BISE Swat board questions...</p>
              </div>
            ) : currentQuestion ? (
              <div
                style={{
                  backgroundColor: '#FAF9F5',
                  borderRadius: '12px',
                  border: '1px solid #EDE8DF',
                  padding: '16px',
                }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: '#EFEAE1',
                      color: '#825E38',
                      textTransform: 'uppercase',
                    }}
                  >
                    {currentQuestion.section}
                  </span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100/70 border border-amber-200/60 px-2 py-0.5 rounded-full">
                    {currentQuestion.marks} Marks
                  </span>
                </div>

                {/* English Question */}
                <h4
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: 1.5,
                    color: '#1E1B18',
                    margin: 0,
                  }}
                >
                  {currentQuestion.questionEn}
                </h4>

                {/* Urdu Translation */}
                {currentQuestion.questionUr && (
                  <p
                    className="text-xs sm:text-sm font-nastaliq text-stone-700 leading-relaxed pt-1"
                    dir="rtl"
                  >
                    {currentQuestion.questionUr}
                  </p>
                )}

                {/* Board Tip / Rubric Hint */}
                {currentQuestion.boardTip && (
                  <div className="pt-2 flex items-start gap-2 text-[11px] text-amber-900 bg-amber-50/70 border border-amber-200/50 p-2.5 rounded-lg">
                    <HelpCircle size={14} className="shrink-0 mt-0.5 text-amber-700" />
                    <span>
                      <strong>Marking Tip: </strong>
                      {currentQuestion.boardTip}
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </section>

        {/* ── Answer Submission (Photo / Camera Upload) ── */}
        <section
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #EAE5DC',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            padding: '18px',
          }}
          className="space-y-4"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Student Paper Submission
            </span>
            <h3
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                fontWeight: 600,
                color: '#1E1B18',
                marginTop: '2px',
                marginBottom: '4px',
              }}
            >
              Upload Photo of Your Handwritten Answer
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Write your answer with pen on physical paper, snap a clear picture with your mobile camera, and upload it for AI grading.
            </p>
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

          {/* Image Preview Box (Compact & Elegant - Does not cover screen) */}
          {imagePreview ? (
            <div
              style={{
                borderRadius: '12px',
                border: '1px solid #EAE5DC',
                backgroundColor: '#FAF9F5',
                padding: '10px 12px',
              }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3 p-1.5 bg-white rounded-xl border border-stone-200/90 shadow-2xs">
                {/* Compact Thumbnail Container */}
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 shrink-0 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Student Handwritten Paper"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                </div>

                {/* Info & Quick Actions */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-emerald-700 mb-0.5">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span className="text-xs font-bold text-stone-900 truncate">
                      Paper Photo Attached
                    </span>
                  </div>
                  <p className="text-[10.5px] text-stone-500 truncate mb-2">
                    {imageFileName || 'handwritten_answer.jpg'}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200/80 transition cursor-pointer"
                    >
                      📷 Retake
                    </button>
                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="text-[11px] font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] text-stone-500">
                  Ready to be checked by BISE Swat Examiner
                </span>
                <span className="text-[10px] font-semibold text-emerald-700">
                  ✓ Ready for Grading
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Button 1: Mobile Camera */}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  cameraInputRef.current?.click();
                }}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1.5px dashed #DCD7CE',
                  backgroundColor: '#FAF9F5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                className="hover:border-amber-700 hover:bg-amber-50/30 group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100/70 text-amber-800 flex items-center justify-center group-hover:scale-105 transition">
                  <Camera size={18} />
                </div>
                <div className="text-center">
                  <strong className="text-xs text-stone-800 block">
                    Take Photo with Camera
                  </strong>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    Directly snap paper from mobile
                  </span>
                </div>
              </button>

              {/* Button 2: Upload Gallery / File */}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPop();
                  galleryInputRef.current?.click();
                }}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1.5px dashed #DCD7CE',
                  backgroundColor: '#FAF9F5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                className="hover:border-amber-700 hover:bg-amber-50/30 group"
              >
                <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center group-hover:scale-105 transition">
                  <Upload size={18} />
                </div>
                <div className="text-center">
                  <strong className="text-xs text-stone-800 block">
                    Upload from Gallery / Files
                  </strong>
                  <span className="text-[10px] text-stone-500 block mt-0.5">
                    Select JPG, PNG, or photo
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* Optional: Type / Paste Answer Text Accordion */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowTypedInput((prev) => !prev)}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 size={12} />
              <span>{showTypedInput ? 'Hide typed text input' : '✏️ Or type/paste answer text'}</span>
            </button>

            {showTypedInput && (
              <div className="mt-2.5">
                <textarea
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type or paste your written answer here if you don't have a camera photo..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-[#FAF9F5] focus:outline-none focus:border-amber-700 leading-relaxed text-stone-800"
                />
              </div>
            )}
          </div>

          {/* Error Banner */}
          {evaluationError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
              <AlertTriangle size={15} className="shrink-0 mt-0.5 text-red-600" />
              <span>{evaluationError}</span>
            </div>
          )}

          {/* ── "Check My Paper" Action Button ── */}
          <button
            type="button"
            disabled={isEvaluating}
            onClick={handleEvaluate}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: '12px',
              backgroundColor: isEvaluating ? '#A89F91' : '#1E1B18',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isEvaluating ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 8px rgba(30, 27, 24, 0.15)',
            }}
          >
            {isEvaluating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Evaluating Paper Per BISE Swat Scheme...</span>
              </>
            ) : (
              <>
                <Award size={16} />
                <span>Check My Paper (پیپر چیک کریں)</span>
              </>
            )}
          </button>
        </section>

        {/* ── Official Examination Results Report ── */}
        {evaluationResult && (
          <section
            ref={resultRef}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #EAE5DC',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
            className="space-y-6 animate-fadeIn p-5 sm:p-6"
          >
            {/* Header / Score Banner */}
            <div
              style={{
                backgroundColor: '#FAF9F5',
                borderRadius: '14px',
                border: '1px solid #EDE8DF',
                padding: '18px',
              }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Official BISE Swat Examiner Result
                </span>
                <h3
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#1E1B18',
                    margin: '2px 0 4px',
                  }}
                >
                  Marks: {evaluationResult.awardedMarks} / {evaluationResult.maxMarks}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-md">
                  {evaluationResult.feedbackSummary}
                </p>
              </div>

              {/* Grade Badge */}
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DCD7CE',
                  textAlign: 'center',
                  minWidth: '100px',
                }}
              >
                <span className="text-[10px] uppercase font-bold text-stone-500 block">
                  Grade Awarded
                </span>
                <span
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 700,
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
                <span className="text-[10px] font-bold text-stone-600 block">
                  {evaluationResult.gradePercentage}%
                </span>
              </div>
            </div>

            {/* Detailed Rubric Breakdown Table */}
            {evaluationResult.rubricItems.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-700" />
                  <span>Marking Criteria Breakdown (مارکنگ سکیم)</span>
                </h4>
                <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-200">
                  {evaluationResult.rubricItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-[#FAF9F5]"
                    >
                      <div className="flex-1 pr-3">
                        <strong className="text-stone-800">{item.criteria}</strong>
                        {item.note && (
                          <p className="text-[11px] text-stone-500 mt-0.5">{item.note}</p>
                        )}
                      </div>
                      <div className="shrink-0 font-bold text-stone-800 text-xs bg-white px-2.5 py-1 rounded-md border border-stone-200">
                        {item.marksAwarded} / {item.maxPossible} Marks
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords & Examiner Advisory */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Missing Key Terms */}
              {evaluationResult.missingKeyTerms.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '12px',
                    padding: '12px 14px',
                  }}
                  className="space-y-1.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    <span>Missing Scientific Key Terms (چھوٹی ہوئی اصطلاحات)</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {evaluationResult.missingKeyTerms.map((term, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-white border border-red-300 text-red-900 px-2 py-0.5 rounded-md font-semibold"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Examiner Tip */}
              {evaluationResult.examinerTips && (
                <div
                  style={{
                    backgroundColor: '#FFFBEB',
                    border: '1px solid #FDE68A',
                    borderRadius: '12px',
                    padding: '12px 14px',
                  }}
                  className="space-y-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                    <HelpCircle size={12} />
                    <span>BISE Swat Examiner Tip (ممتحن کا مشورہ)</span>
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {evaluationResult.examinerTips}
                  </p>
                </div>
              )}
            </div>

            {/* ── 100% Official Board Model Solution ── */}
            <div
              style={{
                backgroundColor: '#FAF9F5',
                borderRadius: '14px',
                border: '1px solid #EDE8DF',
                padding: '16px',
              }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={15} style={{ color: '#825E38' }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    Official 100% Board Model Solution (سرکاری ماڈل حل)
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
                  Textbook Standard
                </span>
              </div>

              <div className="text-xs leading-relaxed text-stone-800 whitespace-pre-line font-mono bg-white p-3.5 rounded-xl border border-stone-200">
                {evaluationResult.modelAnswer || currentQuestion?.modelAnswerEn || ''}
              </div>

              {currentQuestion?.modelAnswerUr && (
                <div className="text-xs font-nastaliq text-stone-700 text-right leading-loose bg-stone-50 p-3 rounded-xl border border-stone-200" dir="rtl">
                  {currentQuestion.modelAnswerUr}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  const nextTab = activeQuestionTab === 'short' ? 'long' : 'short';
                  setActiveQuestionTab(nextTab);
                  setImagePreview(null);
                  setImageFileName('');
                  setTypedAnswer('');
                  setEvaluationResult(null);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-amber-900 bg-amber-100/70 border border-amber-300 px-4 py-2 rounded-xl hover:bg-amber-200 transition cursor-pointer"
              >
                {activeQuestionTab === 'short' ? '→ Grade Question 2 (Section C)' : '← Grade Question 1 (Section B)'}
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  setImagePreview(null);
                  setImageFileName('');
                  setTypedAnswer('');
                  setEvaluationResult(null);
                }}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Clear &amp; Retake
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
export default AIPaperCheckerView;
