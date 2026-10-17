import React, { useState, useEffect } from 'react';
import { Quiz, QuizAttempt } from '../../types';
import { StorageService } from '../../services/storage';
import { soundEngine } from '../../services/soundEngine';
import { ScoreShield } from './ScoreShield';
import { Timer, Flag, ChevronLeft, ChevronRight, CheckCircle, Sparkles, LayoutGrid, RotateCcw, AlertTriangle } from 'lucide-react';

interface QuizRunnerProps {
  quiz: Quiz;
  childId: string;
  onExit: () => void;
  onRegenerateAiQuiz?: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  quiz,
  childId,
  onExit,
  onRegenerateAiQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(quiz.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(null);
  const [showGridModal, setShowGridModal] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'all' | 'unanswered' | 'flagged'>('all');

  // Reset state when quiz changes
  useEffect(() => {
    setCurrentIdx(0);
    setAnswers({});
    setFlagged([]);
    setTimeLeft(quiz.timeLimitMinutes * 60);
    setIsSubmitted(false);
    setAttemptResult(null);
  }, [quiz.id]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = quiz.questions[currentIdx] || quiz.questions[0];

  const handleSelectOption = (qId: string, optId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
    soundEngine.playPop();
  };

  const toggleFlag = (qId: string) => {
    setFlagged((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
    soundEngine.playPop();
  };

  const handleSubmit = () => {
    let score = 0;
    const weakTopics: string[] = [];

    quiz.questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected === q.correctOptionId) {
        score++;
      } else {
        if (q.tags && q.tags.length > 0) {
          weakTopics.push(...q.tags);
        }
      }
    });

    const uniqueWeak = Array.from(new Set(weakTopics));
    const result = StorageService.recordAttempt({
      quizId: quiz.id,
      childId,
      score,
      total: quiz.questions.length,
      weakTopics: uniqueWeak,
    });

    setAttemptResult(result);
    setIsSubmitted(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = quiz.questions.length - answeredCount;
  const progressPercent = Math.round((answeredCount / quiz.questions.length) * 100);

  if (isSubmitted && attemptResult) {
    return (
      <ScoreShield
        attempt={attemptResult}
        onRetry={() => {
          if (onRegenerateAiQuiz) {
            onRegenerateAiQuiz();
          } else {
            setAnswers({});
            setFlagged([]);
            setTimeLeft(quiz.timeLimitMinutes * 60);
            setCurrentIdx(0);
            setIsSubmitted(false);
            setAttemptResult(null);
          }
        }}
        onBackToSyllabus={onExit}
      />
    );
  }

  const displayedPills = quiz.questions.filter((q, idx) => {
    if (filterMode === 'unanswered') return !answers[q.id];
    if (filterMode === 'flagged') return flagged.includes(q.id);
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 space-y-4">
      {/* ── TOP BANNER: EXAM INFO & ACTIONS ────────────────────────── */}
      <div className="pearl-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 shadow-sm">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 border border-purple-200">
              ✨ AI Board Mock Exam • 50 MCQs
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              BISE Swat Passing: 33%
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
            {quiz.titleEn}
          </h2>
          <p className="text-xs font-nastaliq text-purple-700 font-bold truncate">
            {quiz.titleUr}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end shrink-0">
          {/* Timer Pill */}
          <div
            className={`pearl-pill text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
              timeLeft < 300
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            <Timer size={14} className={timeLeft < 300 ? 'text-rose-600' : 'text-amber-600'} />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {/* Quick Grid Navigator Toggle */}
          <button
            onClick={() => setShowGridModal(!showGridModal)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition cursor-pointer flex items-center gap-1"
            title="Open 50 Question Grid Navigator"
          >
            <LayoutGrid size={14} />
            <span>Grid ({quiz.questions.length})</span>
          </button>

          {/* AI Regenerate Fresh 50 Questions Button */}
          {onRegenerateAiQuiz && (
            <button
              onClick={onRegenerateAiQuiz}
              className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition cursor-pointer flex items-center gap-1"
              title="Regenerate a brand new unique set of 50 AI questions"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">New 50 MCQs</span>
            </button>
          )}

          {/* Flag Question Button */}
          <button
            onClick={() => toggleFlag(currentQ.id)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              flagged.includes(currentQ.id)
                ? 'bg-rose-50 text-rose-600 border-rose-300'
                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
            }`}
            title="Flag current question for review"
          >
            <Flag size={14} />
          </button>
        </div>
      </div>

      {/* ── PROGRESS & STATS BAR ────────────────────────────────────── */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-600">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="font-bold text-slate-800">
            Question <span className="text-purple-600 text-sm font-black">{currentIdx + 1}</span> of {quiz.questions.length}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-700 font-semibold">
            {answeredCount} Answered
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500 font-medium">
            {unansweredCount} Remaining
          </span>
          {flagged.length > 0 && (
            <>
              <span className="text-slate-400">•</span>
              <span className="text-rose-600 font-semibold">
                {flagged.length} Flagged
              </span>
            </>
          )}
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full sm:w-48 flex items-center gap-2">
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-bold text-[11px] shrink-0 text-slate-700">{progressPercent}%</span>
        </div>
      </div>

      {/* ── 50 QUESTIONS FAST SCROLL BAR ───────────────────────────── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] px-1 text-slate-500">
          <span>Jump to Question:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                filterMode === 'all' ? 'bg-purple-600 text-white font-bold' : 'hover:bg-slate-200'
              }`}
            >
              All ({quiz.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('unanswered')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                filterMode === 'unanswered' ? 'bg-purple-600 text-white font-bold' : 'hover:bg-slate-200'
              }`}
            >
              Unanswered ({unansweredCount})
            </button>
            <button
              onClick={() => setFilterMode('flagged')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                filterMode === 'flagged' ? 'bg-purple-600 text-white font-bold' : 'hover:bg-slate-200'
              }`}
            >
              Flagged ({flagged.length})
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {displayedPills.map((q) => {
            const originalIdx = quiz.questions.findIndex((orig) => orig.id === q.id);
            const isAnswered = !!answers[q.id];
            const isCurrent = originalIdx === currentIdx;
            const isFlagged = flagged.includes(q.id);

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIdx(originalIdx);
                  soundEngine.playPop();
                }}
                className={`shrink-0 w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer border ${
                  isCurrent
                    ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105'
                    : isFlagged
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
                title={`Question ${originalIdx + 1}${isAnswered ? ' (Answered)' : ''}${isFlagged ? ' (Flagged)' : ''}`}
              >
                {originalIdx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 50 QUESTIONS GRID MODAL (COLLAPSIBLE QUICK JUMP) ───────── */}
      {showGridModal && (
        <div className="pearl-card p-4 bg-slate-900 text-white rounded-2xl shadow-xl animate-fadeIn border border-slate-700">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <LayoutGrid size={14} /> 50 Questions Navigator
            </h4>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Answered
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Flagged
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> Remaining
              </span>
              <button
                onClick={() => setShowGridModal(false)}
                className="ml-2 px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-1.5 max-h-48 overflow-y-auto p-1 modal-scroll">
            {quiz.questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentIdx;
              const isFlagged = flagged.includes(q.id);

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIdx(idx);
                    setShowGridModal(false);
                    soundEngine.playPop();
                  }}
                  className={`h-8 rounded text-xs font-bold transition flex items-center justify-center cursor-pointer border ${
                    isCurrent
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md ring-2 ring-purple-300'
                      : isFlagged
                      ? 'bg-rose-900/80 text-rose-200 border-rose-600'
                      : isAnswered
                      ? 'bg-emerald-800/80 text-emerald-100 border-emerald-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ACTIVE QUESTION CARD ────────────────────────────────────── */}
      <div className="pearl-card p-5 sm:p-6 bg-white border border-slate-200 shadow-md rounded-2xl">
        <div className="flex justify-between items-center text-xs text-slate-500 mb-3 border-b border-slate-100 pb-2">
          <span className="font-bold text-slate-700">
            Question {currentIdx + 1} of {quiz.questions.length}
          </span>
          <span className="capitalize font-bold text-purple-700 px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
            {currentQ.difficulty || 'Board Standard'}
          </span>
        </div>

        {/* English Prompt */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
          {currentQ.promptEn}
        </h3>

        {/* Urdu Translation Prompt */}
        <p className="text-sm sm:text-base font-nastaliq text-slate-700 mb-6 font-bold leading-relaxed" dir="rtl">
          {currentQ.promptUr}
        </p>

        {/* 4 Options Grid */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIndex) => {
            const isSelected = answers[currentQ.id] === opt.id;
            const letterLabel = ['A', 'B', 'C', 'D'][optIndex] || String(optIndex + 1);

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(currentQ.id, opt.id)}
                className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-purple-50 border-purple-500 shadow-sm ring-1 ring-purple-400'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {letterLabel}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm sm:text-base font-semibold leading-normal ${isSelected ? 'text-purple-950 font-bold' : 'text-slate-800'}`}>
                      {opt.textEn}
                    </div>
                    {opt.textUr && (
                      <div className="text-xs sm:text-sm font-nastaliq text-slate-500 font-medium mt-0.5 leading-relaxed" dir="rtl">
                        {opt.textUr}
                      </div>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <CheckCircle size={20} className="text-purple-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM NAVIGATION: PREVIOUS, NEXT, SUBMIT ───────────────── */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <button
          onClick={() => {
            setCurrentIdx((p) => Math.max(0, p - 1));
            soundEngine.playPop();
          }}
          disabled={currentIdx === 0}
          className="pearl-btn pearl-btn-ghost py-2.5 px-4 text-xs sm:text-sm font-bold disabled:opacity-40 flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <div className="flex items-center gap-2">
          {currentIdx === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="pearl-btn pearl-btn-emerald py-2.5 px-6 text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle size={16} />
              <span>Submit 50 MCQs Exam (جمع کرائیں)</span>
            </button>
          ) : (
            <>
              {unansweredCount > 0 && answeredCount >= 10 && (
                <button
                  onClick={handleSubmit}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold border border-slate-300 transition cursor-pointer hidden sm:flex items-center gap-1"
                  title="Submit current progress now"
                >
                  Early Submit ({answeredCount}/50)
                </button>
              )}
              <button
                onClick={() => {
                  setCurrentIdx((p) => Math.min(quiz.questions.length - 1, p + 1));
                  soundEngine.playPop();
                }}
                className="pearl-btn pearl-btn-lavender py-2.5 px-5 text-xs sm:text-sm font-bold flex items-center gap-1 shadow-md cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
