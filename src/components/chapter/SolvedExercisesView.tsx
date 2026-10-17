import React, { useState } from 'react';
import { SolvedExerciseItem } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import {
  Calculator,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  Copy,
  Sparkles,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Printer,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SolvedExercisesViewProps {
  exercises: SolvedExerciseItem[];
  chapterTitleEn: string;
  chapterTitleUr: string;
  chapterNumber: number;
}

export const SolvedExercisesView: React.FC<SolvedExercisesViewProps> = ({
  exercises,
  chapterTitleEn,
  chapterTitleUr,
  chapterNumber,
}) => {
  const [filter, setFilter] = useState<'all' | 'numerical' | 'conceptual' | 'short_question' | 'long_question'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(exercises[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredExercises = filter === 'all'
    ? exercises
    : exercises.filter((ex) => ex.category === filter);

  const numericalCount = exercises.filter((e) => e.category === 'numerical').length;
  const conceptualCount = exercises.filter((e) => e.category === 'conceptual').length;
  const shortCount = exercises.filter((e) => e.category === 'short_question').length;
  const longCount = exercises.filter((e) => e.category === 'long_question').length;

  const handleCopy = (id: string, text: string) => {
    soundEngine.playPop();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    soundEngine.playPop();
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Top Header Banner */}
      <div
        className="pearl-card p-4 sm:p-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
          borderRadius: '20px',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 text-indigo-100 px-2.5 py-0.5 rounded-full backdrop-blur">
            KPTBB Textbook Solved Exercise • باب {chapterNumber}
          </span>
          <button
            onClick={handlePrint}
            className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 transition cursor-pointer"
            title="Print or Save PDF"
          >
            <Printer size={13} /> Print Solved Notes
          </button>
        </div>

        <h3 className="text-lg sm:text-xl font-black mb-1">
          Complete Solved Exercises &amp; Numericals
        </h3>
        <div className="text-sm font-nastaliq font-bold text-indigo-200 mb-3">
          مکمل حل شدہ مشقی و حسابی سوالات بمعہ امتحانی ماڈل جوابات
        </div>

        <p className="text-xs text-indigo-100/90 leading-relaxed font-sans max-w-xl">
          Strictly formatted according to BISE Swat paper marking rubrics. Every numerical problem provides 
          <strong> Given Data</strong>, <strong>Formula</strong>, <strong>Step-by-Step Substitution</strong>, 
          and <strong>SI Units</strong> to secure full 4/4 or 8/8 marks in board exams.
        </p>

        {/* Quick Stats Pill */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10 text-xs font-bold">
          <span className="bg-white/10 px-2.5 py-1 rounded-lg">
            Total Solved: {exercises.length}
          </span>
          {numericalCount > 0 && (
            <span className="bg-amber-400/20 text-amber-200 px-2.5 py-1 rounded-lg">
              🧮 {numericalCount} Numericals
            </span>
          )}
          {conceptualCount > 0 && (
            <span className="bg-sky-400/20 text-sky-200 px-2.5 py-1 rounded-lg">
              💡 {conceptualCount} Conceptual Qs
            </span>
          )}
          {shortCount > 0 && (
            <span className="bg-emerald-400/20 text-emerald-200 px-2.5 py-1 rounded-lg">
              📝 {shortCount} Short Qs
            </span>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => {
            soundEngine.playPop();
            setFilter('all');
          }}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            filter === 'all'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All ({exercises.length})
        </button>

        {numericalCount > 0 && (
          <button
            onClick={() => {
              soundEngine.playPop();
              setFilter('numerical');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filter === 'numerical'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calculator size={13} /> Solved Numericals ({numericalCount})
          </button>
        )}

        {conceptualCount > 0 && (
          <button
            onClick={() => {
              soundEngine.playPop();
              setFilter('conceptual');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filter === 'conceptual'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <HelpCircle size={13} /> Conceptual Qs ({conceptualCount})
          </button>
        )}

        {shortCount > 0 && (
          <button
            onClick={() => {
              soundEngine.playPop();
              setFilter('short_question');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filter === 'short_question'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileCheck size={13} /> Short Qs ({shortCount})
          </button>
        )}

        {longCount > 0 && (
          <button
            onClick={() => {
              soundEngine.playPop();
              setFilter('long_question');
            }}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              filter === 'long_question'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen size={13} /> Long Qs ({longCount})
          </button>
        )}
      </div>

      {/* List of Solved Items */}
      <div className="space-y-3">
        {filteredExercises.map((ex, index) => {
          const isExpanded = expandedId === ex.id;
          const isNumerical = ex.category === 'numerical';

          return (
            <div
              key={ex.id}
              className="pearl-card bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Question Header Accordion Bar */}
              <div
                onClick={() => {
                  soundEngine.playPop();
                  setExpandedId(isExpanded ? null : ex.id);
                }}
                className={`p-4 cursor-pointer flex items-start justify-between gap-3 transition-colors ${
                  isExpanded ? 'bg-slate-50/80 border-b border-slate-100' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-black shadow-sm ${
                      isNumerical
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : ex.category === 'conceptual'
                        ? 'bg-sky-100 text-sky-800 border border-sky-200'
                        : 'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}
                  >
                    {isNumerical ? '🧮' : ex.category === 'conceptual' ? '💡' : '📝'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="pearl-pill text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        {ex.questionNumber}
                      </span>
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                        {ex.marks} Marks
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 capitalize">
                        {ex.category.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                      {ex.questionEn}
                    </h4>
                    <div className="text-xs font-nastaliq font-bold text-purple-800 mt-1">
                      {ex.questionUr}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-1 text-slate-400">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Expanded Solution Body */}
              {isExpanded && (
                <div className="p-4 sm:p-5 space-y-4 bg-white">
                  {/* NUMERICAL SPECIFIC LAYOUT: Given Data, Formula, Steps */}
                  {isNumerical && ex.givenData && ex.givenData.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Given Data Box */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-[11px] font-black uppercase text-slate-700 tracking-wider mb-2 flex items-center justify-between">
                          <span>1. Given Data (معلوم ڈیٹا)</span>
                          <span className="text-[10px] font-semibold text-slate-400">SI Units</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 font-mono">
                          {ex.givenData.map((d, dIdx) => (
                            <li key={dIdx} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-0 font-sans">
                              <span className="font-semibold text-slate-800">
                                {d.description}:
                              </span>
                              <span className="font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                                {d.symbol} = {d.value} {d.unit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Required & Formula Box */}
                      <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-100 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-black uppercase text-purple-800 tracking-wider mb-2">
                            2. To Find &amp; Formula (مطلوب و کلیہ)
                          </div>
                          {ex.toFind && ex.toFind.length > 0 && (
                            <div className="text-xs text-slate-700 mb-2 font-medium">
                              <strong>Required:</strong> {ex.toFind.join(', ')}
                            </div>
                          )}
                          {ex.formula && (
                            <div className="bg-slate-900 text-amber-300 font-mono text-sm font-black p-2.5 rounded-lg text-center shadow-inner tracking-wide">
                              {ex.formula}
                            </div>
                          )}
                        </div>
                        <div className="text-[10px] text-purple-700 font-nastaliq mt-2 text-right">
                          صحیح کلیہ لکھنے کا بورڈ میں 1 نمبر مخصوص ہوتا ہے۔
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step-by-Step Calculation Steps */}
                  {isNumerical && ex.calculationSteps && ex.calculationSteps.length > 0 && (
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-[11px] font-black uppercase text-slate-700 tracking-wider mb-1">
                        3. Step-by-Step Calculation (حسابی مراحل)
                      </div>
                      {ex.calculationSteps.map((step, sIdx) => (
                        <div key={sIdx} className="p-2 bg-white rounded-lg border border-slate-200 text-xs">
                          <div className="text-[11px] font-bold text-slate-700 mb-1">
                            Step {sIdx + 1}: {step.label}
                          </div>
                          <div className="font-mono text-purple-800 font-bold bg-slate-50 p-2 rounded border border-slate-100 text-center text-sm">
                            {step.math}
                          </div>
                          {step.explanationEn && (
                            <div className="text-[11px] text-slate-500 mt-1">
                              {step.explanationEn}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Final Answer Highlight Box */}
                  {isNumerical && ex.finalAnswer && (
                    <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        <div>
                          <div className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                            Final Answer (حتمی جواب بمعہ یونٹ)
                          </div>
                          <div className="text-base font-black text-emerald-900 font-mono">
                            {ex.finalAnswer}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        Full Marks Secured ✓
                      </span>
                    </div>
                  )}

                  {/* MODEL ANSWER (FOR CONCEPTUAL & SHORT/LONG QUESTIONS) */}
                  {!isNumerical && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-purple-700 tracking-wider">
                          Official BISE Swat Model Answer (4-Mark Standard)
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          Marking Scheme Verified
                        </span>
                      </div>

                      <div className="text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-line font-normal">
                        {ex.modelAnswerEn}
                      </div>

                      {ex.modelAnswerUr && (
                        <div className="pt-3 border-t border-slate-200 font-nastaliq text-xs text-purple-900 leading-loose">
                          <span className="font-bold text-slate-800 ml-1">اردو میں ماڈل جواب:</span>
                          <div className="mt-1">{ex.modelAnswerUr}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Board Examiner's Tip / Warning */}
                  {(ex.boardTipEn || ex.boardTipUr) && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs">
                      <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-black uppercase text-amber-800 tracking-wider mb-0.5">
                          Examiner's Warning &amp; Board Scoring Tip
                        </div>
                        {ex.boardTipEn && (
                          <p className="text-amber-900 font-medium leading-relaxed">
                            {ex.boardTipEn}
                          </p>
                        )}
                        {ex.boardTipUr && (
                          <p className="text-amber-800 font-nastaliq text-[11px] mt-1 leading-normal">
                            {ex.boardTipUr}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Bar: Copy Answer to Clipboard */}
                  <div className="flex justify-end pt-2 border-t border-slate-100">
                    <button
                      onClick={() =>
                        handleCopy(
                          ex.id,
                          `Question: ${ex.questionEn}\n\nAnswer: ${
                            isNumerical ? `${ex.formula}\n${ex.finalAnswer}` : ex.modelAnswerEn
                          }`
                        )
                      }
                      className="pearl-pill text-xs font-bold text-slate-600 hover:text-purple-700 hover:bg-purple-50 flex items-center gap-1.5 cursor-pointer py-1.5 px-3"
                    >
                      {copiedId === ex.id ? (
                        <>
                          <CheckCircle2 size={13} className="text-emerald-600" /> Copied to Clipboard!
                        </>
                      ) : (
                        <>
                          <Copy size={13} /> Copy Model Answer (ہوم ورک کے لیے کاپی کریں)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
