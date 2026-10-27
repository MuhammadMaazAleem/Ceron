import React, { useState } from 'react';
import { Subject, Unit } from '../../types';
import { CeronAIService, AITutorResponse } from '../../services/ceronAIService';
import { soundEngine } from '../../services/soundEngine';
import {
  Sparkles,
  Send,
  Loader2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Calculator,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface SubjectAIPanelProps {
  subjects: Subject[];
  units: Unit[];
  activeClassId: string;
  defaultSubjectId?: string;
  isCompact?: boolean;
}

export const SubjectAIPanel: React.FC<SubjectAIPanelProps> = ({
  subjects,
  units,
  activeClassId,
  defaultSubjectId,
}) => {
  const [selectedSubId, setSelectedSubId] = useState<string>(
    defaultSubjectId || subjects[0]?.id || 'sub_bio'
  );
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AITutorResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Synchronize when the subject changes from the parent dashboard
  React.useEffect(() => {
    if (defaultSubjectId && defaultSubjectId !== selectedSubId) {
      setSelectedSubId(defaultSubjectId);
      setResponse(null);
      setErrorMsg(null);
      setQuery('');
    }
  }, [defaultSubjectId]);

  const activeSubject = subjects.find((s) => s.id === selectedSubId) || subjects[0];
  const subjectUnits = units.filter((u) => u.subjectId === selectedSubId && u.classId === activeClassId);

  // Subject-specific quick questions for quick-tap asking
  const quickPrompts: Record<string, string[]> = {
    sub_phy: [
      "State Newton's 2nd Law and derive F = ma with SI units",
      'Explain the difference between Speed and Velocity',
      'Solve: A car accelerates from rest at 2 m/s² for 5 seconds. Find distance.',
      'What are the most repeated 4-mark questions in Physics?',
    ],
    sub_bio: [
      'Differentiate between Mitosis and Meiosis with 4 key points',
      'Explain the mechanism of Breathing (Inhalation vs Exhalation)',
      'What is the function of Nephron in human kidney?',
      'Describe the structure and function of DNA with diagram points',
    ],
    sub_chem: [
      'Explain Boyle’s Law with its mathematical formula and P-V curve',
      'Differentiate between Ionic and Covalent Bonds with examples',
      'What is Molarity? Calculate molarity of 5g NaOH in 250ml water',
      'State Rutherford’s Atomic Model and its two major defects',
    ],
    sub_math: [
      'Explain the Quadratic Formula and how to find the discriminant',
      'State the Pythagoras Theorem and provide a practical example',
      'How to solve simultaneous linear equations using Cramer’s Rule?',
      'Define standard trigonometric ratios: sin, cos, tan with unit circle',
    ],
    sub_comp: [
      'What is the difference between Compiler and Interpreter?',
      'Explain the 5 basic generations of computers with key technologies',
      'What is an Algorithm vs Flowchart? Draw standard flowchart symbols',
      'Explain primary memory (RAM/ROM) vs secondary storage with examples',
    ],
  };

  const currentPrompts = quickPrompts[selectedSubId] || [
    `Explain the most important board exam questions for ${activeSubject?.nameEn || 'this subject'}`,
    `Give 4-mark model answer for Chapter 1`,
    `What are the common exam mistakes students make?`,
  ];

  const handleAsk = async (textToAsk?: string) => {
    const questionText = textToAsk || query;
    if (!questionText.trim()) return;

    soundEngine.playPop();
    setIsLoading(true);
    setErrorMsg(null);
    setResponse(null);

    const relevantChapter = subjectUnits[0]?.titleEn || 'General Syllabus';

    try {
      const res = await CeronAIService.askTutor({
        question: questionText.trim(),
        chapterTitle: relevantChapter,
        subjectName: activeSubject?.nameEn || 'General Science',
        className: 'Class 9–10 Board Curriculum',
      });

      if (res.success) {
        setResponse(res);
      } else {
        setErrorMsg(res.error || 'Unable to retrieve answer. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error communicating with AI Tutor service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    const text = `*Q: ${response.questionTitle}*\n\n${response.stepByStepSolution.join('\n\n')}\n\n*Final Answer:* ${response.finalAnswerEn}\n\n*Examiner Tip:* ${response.examinerTip}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-xs">
            <Sparkles size={16} />
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
              Ceron AI Academic Assistant
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ask anything about your syllabus, numericals &amp; board questions
            </p>
          </div>
        </div>

        {/* Selected Subject Indicator */}
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1.5">
          <span>{activeSubject?.icon}</span>
          <span>{activeSubject?.nameEn}</span>
        </span>
      </div>

      {/* Subject Pills (Quick Switcher) */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x -mx-1 px-1">
        {subjects.map((sub) => {
          const isSelected = sub.id === selectedSubId;
          return (
            <button
              key={sub.id}
              onClick={() => {
                soundEngine.playPop();
                setSelectedSubId(sub.id);
                setResponse(null);
                setErrorMsg(null);
              }}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <span>{sub.icon}</span>
              <span>{sub.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Input Box & Submit */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Ask any ${activeSubject?.nameEn || 'subject'} question (e.g. explain a law, solve a numerical)...`}
          className="w-full pl-3.5 pr-24 py-3 rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition shadow-xs"
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
        >
          {isLoading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <span>Ask AI</span>
              <Send size={12} />
            </>
          )}
        </button>
      </form>

      {/* Quick Tap Suggested Prompts */}
      {!response && !isLoading && (
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <Lightbulb size={13} className="text-amber-500" />
            <span>Popular Student Questions for {activeSubject?.nameEn}:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(p);
                  handleAsk(p);
                }}
                className="text-left p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-purple-50/70 hover:border-purple-300 text-xs text-slate-700 hover:text-purple-900 transition cursor-pointer flex items-center justify-between group"
              >
                <span className="line-clamp-2 leading-relaxed font-medium">{p}</span>
                <ChevronRight size={14} className="shrink-0 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* AI Answer Display — Structured in Academic Topics */}
      {response && (
        <div className="bg-gradient-to-b from-purple-50/50 via-white to-slate-50 border border-purple-200 rounded-2xl p-4 sm:p-6 space-y-5 animate-fadeIn shadow-xs">
          {/* Top Header of Answer */}
          <div className="flex items-center justify-between border-b border-purple-100 pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-600 text-white font-black text-xs shadow-xs">
                {response.marks || 4} Marks Board Standard
              </span>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Topic Breakdown &amp; Model Solution
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition shadow-2xs"
                title="Copy Answer"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setResponse(null);
                  setQuery('');
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                title="Ask Another"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Question Title */}
          <div className="bg-white border border-purple-100 rounded-xl p-3 shadow-2xs">
            <span className="text-xs font-semibold text-purple-700 block mb-0.5">
              Topic Question:
            </span>
            <div className="text-sm font-extrabold text-slate-900 leading-snug">
              {response.questionTitle}
            </div>
          </div>

          {/* Section 1: Given Data & Governing Formula (for numericals/physics/chemistry) */}
          {((response.givenData && response.givenData.length > 0) || response.formula) && (
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 space-y-2.5">
              <span className="text-xs font-semibold text-indigo-900 flex items-center gap-1.5">
                <Calculator size={14} className="text-indigo-600" />
                <span>1. Governing Formula &amp; Given Data (With SI Units)</span>
              </span>

              {response.formula && (
                <div className="bg-white border border-indigo-200 rounded-lg p-2.5 flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Formula:</span>
                  <code className="text-xs sm:text-sm font-mono font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {response.formula}
                  </code>
                </div>
              )}

              {response.givenData && response.givenData.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {response.givenData.map((g, idx) => (
                    <div key={idx} className="bg-white px-2.5 py-1.5 rounded-lg border border-indigo-100 text-xs text-slate-700 flex justify-between">
                      <span className="font-semibold text-slate-900">{g.label}:</span>
                      <span className="font-mono font-bold text-indigo-600">{g.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section 2: Key 4-Mark Structured Answer Points */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 px-0.5">
              <CheckCircle2 size={14} className="text-purple-600" />
              <span>2. Step-by-Step Points for Board Exam (1 Mark per Point)</span>
            </span>

            <div className="space-y-2">
              {response.stepByStepSolution.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs sm:text-sm text-slate-800 leading-relaxed font-normal flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Final Answer Summary */}
          {response.finalAnswerEn && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 text-xs sm:text-sm text-emerald-950 font-medium flex items-start gap-2.5">
              <CheckCircle2 size={17} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-emerald-800 block">
                  3. Final Conclusion &amp; Result
                </span>
                <p className="font-bold text-emerald-900">{response.finalAnswerEn}</p>
              </div>
            </div>
          )}

          {/* Section 4: Urdu Translation / خلاصہ (Bilingual Support for KPK Students) */}
          {response.finalAnswerUr && (
            <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3.5 text-right font-nastaliq" dir="rtl">
              <span className="text-xs font-sans font-semibold text-slate-600 block mb-1">
                خلاصہ (اردو ترجمہ):
              </span>
              <p className="text-sm leading-loose text-slate-800 font-bold">
                {response.finalAnswerUr}
              </p>
            </div>
          )}

          {/* Section 5: BISE Swat Examiner Pro-Tip */}
          {response.examinerTip && (
            <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
              <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="block text-amber-950 font-bold">
                  BISE Swat Examiner Tip (How to Secure Full 4/4 Marks):
                </strong>
                <p className="text-amber-900 leading-relaxed font-normal">{response.examinerTip}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
