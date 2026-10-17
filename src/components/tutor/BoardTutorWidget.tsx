import React, { useState } from 'react';
import { Unit, SolvedExerciseItem, GivenDataEntry, SolvedNumericalStep } from '../../types';
import { CeronAIService, AITutorResponse } from '../../services/ceronAIService';
import { soundEngine } from '../../services/soundEngine';
import {
  Sparkles,
  Search,
  Calculator,
  CheckCircle2,
  Copy,
  ChevronRight,
  AlertCircle,
  Lightbulb,
  Loader2,
  Zap,
  BookOpen,
  Key,
  Send,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

interface PromptItem {
  title: string;
  question: string;
  type: string;
  emoji: string;
  exercise?: SolvedExerciseItem;
}

interface BoardTutorWidgetProps {
  unit: Unit;
  subjectName?: string;
  className?: string;
}

export const BoardTutorWidget: React.FC<BoardTutorWidgetProps> = ({
  unit,
  subjectName,
  className: studentClass,
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeResponse, setActiveResponse] = useState<AITutorResponse | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isAIConfigured = CeronAIService.isConfigured();

  const cleanTitle = unit.titleEn
    .replace(/^Chapter\s+\d+:\s*/i, '')
    .replace(/^Unit\s+\d+:\s*/i, '')
    .split('(')[0]
    .trim();

  // Build prompt suggestions from solved exercises + chapter-level prompts
  const preloadedPrompts: PromptItem[] = [
    ...(unit.solvedExercises?.slice(0, 4).map((ex) => ({
      title: ex.titleEn || ex.questionEn.slice(0, 60),
      question: ex.questionEn,
      type: ex.category,
      emoji: ex.category === 'numerical' ? '🧮' : '💡',
      exercise: ex,
    })) || []),
    {
      title: `State & prove the main formula of ${cleanTitle}`,
      question: `State the fundamental law and derive the mathematical formula for ${cleanTitle}. Define all variables with their SI units.`,
      type: 'formula',
      emoji: '📐',
    },
    {
      title: `Differentiate between key concepts in Chapter ${unit.kptbbChapter}`,
      question: `Differentiate with 4 clear points between the two main opposing scientific concepts in Chapter ${unit.kptbbChapter} of ${subjectName || 'this subject'}.`,
      type: 'conceptual',
      emoji: '⚖️',
    },
    {
      title: `Common exam mistakes in ${cleanTitle}`,
      question: `What are the most common conceptual mistakes students make in ${cleanTitle} in BISE Swat board examinations? State the correct scientific fact for each.`,
      type: 'tips',
      emoji: '⚠️',
    },
  ];

  // ── Handle pre-loaded exercise (instant, no API call needed) ──────────────
  const handleExercisePrompt = (ex: SolvedExerciseItem) => {
    soundEngine.playPop();
    setQuery(ex.questionEn);
    setErrorMsg(null);

    if (ex.calculationSteps && ex.calculationSteps.length > 0) {
      // Has real data — show immediately
      setActiveResponse({
        success: true,
        questionTitle: ex.questionEn,
        marks: ex.marks || 4,
        rubric: [
          { item: 'Given Data with SI Units', marks: '1 Mark' },
          { item: 'Correct Formula', marks: '1 Mark' },
          { item: 'Step-by-Step Substitution', marks: '1 Mark' },
          { item: 'Final Answer with Unit', marks: '1 Mark' },
        ],
        givenData: ex.givenData?.map((g: GivenDataEntry) => ({
          label: g.description,
          value: `${g.symbol} = ${g.value} ${g.unit}`,
        })),
        formula: ex.formula,
        stepByStepSolution:
          ex.calculationSteps.map((s: SolvedNumericalStep) => `${s.label}: ${s.math}`) || [],
        finalAnswerEn: ex.finalAnswer || ex.modelAnswerEn || '',
        finalAnswerUr: ex.modelAnswerUr || 'ڈیٹا بیس میں محفوظ شدہ تصدیق شدہ جواب۔',
        examinerTip: ex.boardTipEn || 'Always write the final answer with the correct SI unit.',
      });
    } else if (ex.modelAnswerEn) {
      setActiveResponse({
        success: true,
        questionTitle: ex.questionEn,
        marks: ex.marks || 4,
        rubric: [
          { item: 'Definition / Statement', marks: '1 Mark' },
          { item: 'Scientific Principle', marks: '1 Mark' },
          { item: 'Formula / Diagram Reference', marks: '1 Mark' },
          { item: 'Application / Example', marks: '1 Mark' },
        ],
        stepByStepSolution: ex.modelAnswerEn
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean),
        finalAnswerEn: ex.modelAnswerEn,
        finalAnswerUr: ex.modelAnswerUr || '',
        examinerTip: ex.boardTipEn || '',
      });
    } else {
      // No local data → send to AI
      sendToAI(ex.questionEn);
    }
  };

  // ── Send any question to Groq AI ──────────────────────────────────────────
  const sendToAI = async (questionText: string) => {
    if (!questionText.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    setActiveResponse(null);
    soundEngine.playPop();

    const res = await CeronAIService.askTutor({
      question: questionText,
      chapterTitle: cleanTitle,
      subjectName: subjectName || 'Science',
      className: studentClass || 'Class 10 (Matric Part 2)',
      keyFormulas: unit.formulas?.slice(0, 3).map((f) => f.formula),
      keyTerms: unit.keyTerms?.slice(0, 5).map((t) => t.termEn),
    });

    setIsLoading(false);

    if (!res.success && res.error === 'NO_API_KEY') {
      setErrorMsg('NO_API_KEY');
    } else if (!res.success) {
      setErrorMsg(res.error || 'Unknown error');
    } else {
      setActiveResponse(res);
    }
  };

  const handleSelectPrompt = (p: PromptItem) => {
    soundEngine.playPop();
    setQuery(p.question);
    if (p.exercise) {
      handleExercisePrompt(p.exercise);
    } else {
      sendToAI(p.question);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    sendToAI(query);
  };

  const handleCopy = () => {
    if (!activeResponse) return;
    soundEngine.playPop();
    const text = [
      `Question: ${activeResponse.questionTitle}`,
      '',
      activeResponse.formula ? `Formula: ${activeResponse.formula}` : '',
      '',
      'Solution:',
      ...activeResponse.stepByStepSolution,
      '',
      `Final Answer: ${activeResponse.finalAnswerEn}`,
      '',
      `Urdu: ${activeResponse.finalAnswerUr}`,
    ]
      .filter((l) => l !== undefined)
      .join('\n');
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div
        className="pearl-card p-5 text-white overflow-hidden relative"
        style={{
          background: 'linear-gradient(135deg, #1E1035 0%, #312E81 45%, #4338CA 100%)',
          borderRadius: '22px',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #A78BFA, transparent)' }}
        />

        <div className="flex items-center justify-between mb-2 relative">
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/15 text-indigo-100 px-2.5 py-0.5 rounded-full backdrop-blur flex items-center gap-1.5">
            <Sparkles size={11} className="text-amber-300" />
            Ceron AI Board Tutor — Powered by Groq (Llama 3.3)
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isAIConfigured
                ? 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30'
                : 'bg-red-400/20 text-red-200 border-red-400/30'
            }`}
          >
            {isAIConfigured ? '● AI Connected' : '● API Key Missing'}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black mb-1 relative">
          Ask Any Textbook Question — Instant Board Answer
        </h3>
        <div className="text-sm font-nastaliq font-bold text-indigo-200 mb-2 relative">
          درسی کتاب کا کوئی بھی سوال یا ہوم ورک — فوری بورڈ معیاری حل
        </div>
        <p className="text-xs text-indigo-100/85 leading-relaxed font-sans relative max-w-xl">
          Type any numerical, definition, or conceptual question. Get an instant{' '}
          <strong className="text-white">BISE Swat 4-mark model answer</strong> with
          Given Data → Formula → Steps → Urdu explanation.
        </p>
      </div>

      {/* ── No API Key Warning ───────────────────────────────────── */}
      {!isAIConfigured && (
        <div className="pearl-card p-4 bg-amber-50 border border-amber-300 flex items-start gap-3 text-xs">
          <Key size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] font-black uppercase text-amber-900 tracking-wider mb-1.5">
              Groq API Key Not Set — Pre-loaded Exercises Still Work!
            </div>
            <p className="text-amber-800 leading-relaxed font-sans mb-2">
              To enable live AI answers for <em>any</em> question you type, add your Groq API key to the <code className="bg-amber-100 px-1 rounded">.env</code> file in the project folder:
            </p>
            <div className="bg-slate-900 text-amber-300 font-mono text-xs p-3 rounded-lg mb-2">
              VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://console.groq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 font-bold flex items-center gap-1 hover:text-amber-900 underline"
              >
                <ExternalLink size={12} /> Get free key at console.groq.com
              </a>
              <span className="text-amber-600">→ Then restart the dev server</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Search / Input Form ──────────────────────────────────── */}
      <form
        onSubmit={handleCustomSubmit}
        className="pearl-card p-3 bg-white border border-slate-200 shadow-sm flex items-center gap-2"
      >
        <div className="text-slate-400 pl-1 shrink-0">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`e.g. "A pendulum of length 1m, find time period" or "Define Ohm's Law" ...`}
          className="w-full text-xs sm:text-sm py-2 px-1 text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={`pearl-btn text-xs font-bold py-2 px-3.5 shrink-0 cursor-pointer flex items-center gap-1.5 transition-opacity ${
            !query.trim() || isLoading
              ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
              : 'pearl-btn-lavender'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={13} className="animate-spin" /> Solving...
            </>
          ) : (
            <>
              <Send size={13} /> Solve
            </>
          )}
        </button>
      </form>

      {/* ── Quick Prompt Pills ───────────────────────────────────── */}
      <div>
        <div className="text-[11px] font-bold text-slate-500 mb-2 px-0.5 flex items-center gap-1.5">
          <Lightbulb size={13} className="text-amber-500" />
          <span>
            {isAIConfigured
              ? 'Frequently Asked Board Questions (click for instant AI answer):'
              : 'Click to load pre-solved textbook exercises:'}
          </span>
        </div>
        <div className="space-y-1.5">
          {preloadedPrompts.slice(0, 6).map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPrompt(p)}
              disabled={isLoading}
              className="w-full text-left text-xs bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-800 p-3 rounded-xl border border-slate-200 hover:border-purple-300 transition shadow-xs cursor-pointer flex items-center gap-2.5 disabled:opacity-50"
            >
              <span className="text-base shrink-0">{p.emoji}</span>
              <span className="flex-1 font-medium line-clamp-2">{p.title}</span>
              <ChevronRight size={14} className="text-slate-300 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Loading State ────────────────────────────────────────── */}
      {isLoading && (
        <div className="pearl-card p-8 text-center border border-purple-200 bg-purple-50/30">
          <Loader2 size={32} className="animate-spin text-purple-600 mx-auto mb-3" />
          <div className="text-sm font-extrabold text-slate-800 mb-1">
            Ceron AI is solving your question…
          </div>
          <div className="text-xs font-nastaliq text-purple-700 mb-2">
            کیرون اے آئی آپ کا سوال حل کر رہا ہے…
          </div>
          <div className="text-[11px] text-slate-500">
            Groq Llama 3.3 · BISE Swat board format · Bilingual
          </div>
        </div>
      )}

      {/* ── Error: Bad API ───────────────────────────────────────── */}
      {errorMsg && errorMsg !== 'NO_API_KEY' && !isLoading && (
        <div className="pearl-card p-4 bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-800 mb-1">AI Connection Error</div>
            <p className="text-red-700 font-mono text-[11px]">{errorMsg}</p>
            <button
              onClick={() => {
                setErrorMsg(null);
                if (query) sendToAI(query);
              }}
              className="mt-2 text-red-700 font-bold flex items-center gap-1 hover:text-red-900 cursor-pointer"
            >
              <RotateCcw size={12} /> Try again
            </button>
          </div>
        </div>
      )}

      {/* ── AI / Pre-loaded Response ─────────────────────────────── */}
      {activeResponse && activeResponse.success && !isLoading && (
        <div className="pearl-card bg-white border border-purple-200 shadow-md overflow-hidden">
          {/* Response Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="pearl-pill text-[10px] font-black uppercase bg-purple-100 text-purple-800">
                  {isAIConfigured ? '⚡ Groq AI Answer' : '📚 Textbook Answer'}
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {activeResponse.marks} Marks Rubric
                </span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 leading-snug">
                {activeResponse.questionTitle}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="pearl-pill text-xs font-bold text-slate-600 hover:text-purple-700 hover:bg-purple-50 flex items-center gap-1 cursor-pointer py-1.5 px-3 shrink-0"
            >
              {isCopied ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy Answer
                </>
              )}
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-4">
            {/* Marking Rubric */}
            {activeResponse.rubric.length > 0 && (
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <div className="text-[10px] font-black uppercase text-purple-800 tracking-wider mb-2">
                  Official Marking Breakdown (نمبروں کی سرکاری تقسیم)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {activeResponse.rubric.map((r, rIdx) => (
                    <div
                      key={rIdx}
                      className="bg-white p-2 rounded-lg border border-purple-100 text-center"
                    >
                      <div className="text-xs font-extrabold text-purple-700">{r.marks}</div>
                      <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                        {r.item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Given Data (numericals) */}
            {activeResponse.givenData && activeResponse.givenData.length > 0 && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] font-black uppercase text-slate-700 tracking-wider mb-2">
                  Given Data — معلوم کوائف (SI Units)
                </div>
                <ul className="space-y-1.5">
                  {activeResponse.givenData.map((d, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-0 text-xs"
                    >
                      <span className="font-semibold text-slate-700">{d.label}:</span>
                      <span className="font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {d.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Formula */}
            {activeResponse.formula && (
              <div className="bg-slate-900 rounded-xl p-3 text-center shadow-inner">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                  Governing Equation / Formula
                </div>
                <div className="text-amber-300 font-mono text-base sm:text-lg font-black tracking-wide">
                  {activeResponse.formula}
                </div>
              </div>
            )}

            {/* Step-by-Step Solution */}
            {activeResponse.stepByStepSolution.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase text-slate-700 tracking-wider">
                  Step-by-Step Model Answer — مرحلہ وار حل
                </div>
                {activeResponse.stepByStepSolution.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed"
                  >
                    {step}
                  </div>
                ))}
              </div>
            )}

            {/* Final Answer Highlight */}
            {activeResponse.finalAnswerEn && (
              <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase text-emerald-800 tracking-wider mb-1">
                    Final Answer — حتمی جواب بمعہ یونٹ
                  </div>
                  <div className="text-sm font-bold text-emerald-900">
                    {activeResponse.finalAnswerEn}
                  </div>
                </div>
              </div>
            )}

            {/* Urdu Model Answer */}
            {activeResponse.finalAnswerUr && (
              <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100">
                <div className="text-[10px] font-black uppercase text-purple-800 tracking-wider mb-2">
                  اردو میں ماڈل جواب (Urdu Translation)
                </div>
                <div className="font-nastaliq text-xs text-purple-900 leading-loose whitespace-pre-line">
                  {activeResponse.finalAnswerUr}
                </div>
              </div>
            )}

            {/* Examiner Tip */}
            {activeResponse.examinerTip && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs">
                <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-black uppercase text-amber-800 tracking-wider mb-0.5">
                    Examiner's Warning & Scoring Tip
                  </div>
                  <p className="text-amber-900 font-medium leading-relaxed">
                    {activeResponse.examinerTip}
                  </p>
                </div>
              </div>
            )}

            {/* Ask Another */}
            <button
              onClick={() => {
                soundEngine.playPop();
                setActiveResponse(null);
                setQuery('');
              }}
              className="w-full text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition cursor-pointer border border-slate-200"
            >
              <RotateCcw size={13} /> Ask Another Question (نیا سوال پوچھیں)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
