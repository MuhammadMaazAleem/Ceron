import React, { useState } from 'react';
import { Unit, Subject } from '../../types';
import { CeronAIService, AnswerEvaluationResult } from '../../services/ceronAIService';
import { soundEngine } from '../../services/soundEngine';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Send,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

interface VirtualBoardExaminerProps {
  unit: Unit;
  subject?: Subject;
  className?: string;
}

export const VirtualBoardExaminer: React.FC<VirtualBoardExaminerProps> = ({
  unit,
  subject,
  className = 'Class 9',
}) => {
  // Extract questions from past paper questions or solved exercises
  const availableQuestions = [
    ...(unit.pastPaperQuestions?.map((pq) => ({
      text: pq.questionEn,
      marks: pq.marks || (pq.section?.includes('C') ? 7 : 4),
      source: `BISE Swat (${pq.year || 'Past Paper'})`,
    })) || []),
    ...(unit.solvedExercises?.slice(0, 5).map((se) => ({
      text: se.questionEn,
      marks: se.marks || 4,
      source: `Textbook Exercise (${se.category?.toUpperCase() || 'SOLVED'})`,
    })) || []),
  ];

  const defaultQuestion =
    availableQuestions[0]?.text ||
    `Define momentum and write its mathematical formula and SI unit.`;
  const defaultMarks = availableQuestions[0]?.marks === 7 ? 7 : 4;

  const [selectedQuestion, setSelectedQuestion] = useState<string>(defaultQuestion);
  const [maxMarks, setMaxMarks] = useState<4 | 7>(defaultMarks as 4 | 7);
  const [isCustomQuestion, setIsCustomQuestion] = useState<boolean>(false);
  const [customQuestionInput, setCustomQuestionInput] = useState<string>('');

  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isGrading, setIsGrading] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluationResult | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  const wordCount = studentAnswer.trim() ? studentAnswer.trim().split(/\s+/).length : 0;

  const handleSelectPredefined = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'CUSTOM') {
      setIsCustomQuestion(true);
      setSelectedQuestion('');
      setMaxMarks(4);
    } else {
      setIsCustomQuestion(false);
      const found = availableQuestions.find((q) => q.text === val);
      if (found) {
        setSelectedQuestion(found.text);
        setMaxMarks(found.marks >= 7 ? 7 : 4);
      }
    }
    setEvaluation(null);
    setGradingError(null);
  };

  const handleFillSampleAnswer = () => {
    soundEngine.playPop();
    const isBio = /bio/i.test(subject?.nameEn || unit.subjectId);
    if (isBio) {
      setStudentAnswer(
        `Cellular respiration is the biochemical process by which organic molecules, predominantly glucose, are catabolized in cells to synthesize ATP. In aerobic respiration, glucose undergoes glycolysis in the cytoplasm, followed by the Krebs cycle and oxidative phosphorylation in the mitochondrial cristae, consuming oxygen and producing carbon dioxide, water, and approximately 36 to 38 ATP molecules per glucose.`
      );
    } else {
      setStudentAnswer(
        `Momentum is defined as the quantity of motion contained in a moving body, mathematically expressed as the product of its mass and velocity: p = m × v. It is a vector quantity having the same direction as velocity. Its standard SI unit is kilogram meter per second (kg·m/s) or Newton second (N·s). According to Newton's second law, the rate of change of momentum is directly proportional to applied net force: F = Δp / Δt.`
      );
    }
    setGradingError(null);
  };

  const handleGrade = async () => {
    const activeQuestion = isCustomQuestion ? customQuestionInput.trim() : selectedQuestion.trim();
    if (!activeQuestion) {
      setGradingError('Please select or enter an examination question first.');
      return;
    }
    if (!studentAnswer.trim() || wordCount < 3) {
      setGradingError('Please type or paste your written answer (at least a few words) before submitting.');
      return;
    }

    setIsGrading(true);
    setGradingError(null);
    try {
      soundEngine.playPop();
      const result = await CeronAIService.evaluateWrittenAnswer({
        questionText: activeQuestion,
        maxMarks,
        studentAnswer: studentAnswer.trim(),
        subjectName: subject?.nameEn || 'General Science',
        chapterTitle: unit.titleEn,
        className,
      });

      if (!result.success) {
        throw new Error(result.error || result.feedbackSummary || 'Grading failed.');
      }

      setEvaluation(result);
      soundEngine.playCorrect();
    } catch (err: any) {
      console.error('Failed to grade answer:', err);
      setGradingError(err?.message || 'Examiner grading failed. Please check your network or Groq API connection.');
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="space-y-5 px-1 sm:px-0">
      {/* ── Intro Header ────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Interactive AI Examiner
          </span>
          <span className="text-[10px] font-bold text-slate-500">
            BISE KPK Rubric Engine (Section B &amp; C)
          </span>
        </div>
        <h3 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2">
          <Award size={20} className="text-emerald-700 shrink-0" />
          Virtual BISE Board Paper Examiner
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Type or paste your written answer. Our virtual board examiner grades your answer against official KPK BISE scoring rubrics, highlighting marks awarded, missing technical keywords, and examiner tips.
        </p>
      </div>

      {/* ── Question & Input Card ────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
        {/* Question Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-xs sm:text-sm font-bold text-slate-900">
              Select Exam Question to Grade:
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500">Standard:</span>
              <select
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value) as 4 | 7)}
                className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-900 cursor-pointer"
              >
                <option value={4}>4 Marks (Section B Short Q)</option>
                <option value={7}>7 Marks (Section C Long Q)</option>
              </select>
            </div>
          </div>

          <select
            onChange={handleSelectPredefined}
            value={isCustomQuestion ? 'CUSTOM' : selectedQuestion}
            className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer"
          >
            {availableQuestions.map((q, idx) => (
              <option key={idx} value={q.text}>
                [{q.source}] ({q.marks} Marks) {q.text.slice(0, 95)}...
              </option>
            ))}
            <option value="CUSTOM">+ Enter Custom Exam Question</option>
          </select>

          {isCustomQuestion && (
            <input
              type="text"
              placeholder="Type your exam question here..."
              value={customQuestionInput}
              onChange={(e) => setCustomQuestionInput(e.target.value)}
              className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-600 mt-2"
            />
          )}
        </div>

        {/* Active Question Banner */}
        <div className="p-3.5 sm:p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs sm:text-sm space-y-1">
          <div className="text-[10px] font-black text-indigo-700 uppercase tracking-wider">
            Active Question for Board Grading ({maxMarks} Marks):
          </div>
          <div className="font-bold text-slate-900 leading-snug">
            {isCustomQuestion ? customQuestionInput || 'Enter your custom question above' : selectedQuestion}
          </div>
        </div>

        {/* Student Answer Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs flex-wrap gap-1">
            <label className="font-bold text-slate-900">Your Written Answer:</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleFillSampleAnswer}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer underline"
              >
                <Sparkles size={12} /> Fill Sample Answer
              </button>
              <span
                className={`font-mono font-semibold ${
                  wordCount < 15 ? 'text-amber-600' : 'text-slate-500'
                }`}
              >
                {wordCount} words {maxMarks === 4 ? '(Target: 60-120)' : '(Target: 200-350)'}
              </span>
            </div>
          </div>

          <textarea
            rows={7}
            value={studentAnswer}
            onChange={(e) => {
              setStudentAnswer(e.target.value);
              if (gradingError) setGradingError(null);
            }}
            placeholder="Type or paste your complete written answer here (definitions, mathematical statements, SI units, scientific mechanisms)..."
            className="w-full text-xs sm:text-sm leading-relaxed p-3.5 sm:p-4 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white min-h-[140px] font-normal"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-slate-500">
            Graded against Khyber Pakhtunkhwa Textbook Board scoring standards.
          </span>
          <button
            onClick={handleGrade}
            disabled={isGrading || !studentAnswer.trim()}
            className="w-full sm:w-auto pearl-pill text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 border-emerald-600 cursor-pointer flex items-center justify-center gap-2 py-3 px-6 shadow-sm transition-all disabled:opacity-50"
          >
            {isGrading ? (
              <>
                <RefreshCw size={15} className="animate-spin" /> Evaluating Paper...
              </>
            ) : (
              <>
                <Send size={15} /> Grade My Written Answer
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Error Banner ────────────────────────────────────────────── */}
      {gradingError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-800 flex items-start gap-2.5">
          <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Evaluation Notice</div>
            <div className="leading-relaxed">{gradingError}</div>
          </div>
        </div>
      )}

      {/* ── Examiner Report Card ────────────────────────────────────── */}
      {evaluation && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-xs space-y-6">
          {/* Top Score Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl bg-slate-900 text-white gap-3">
            <div className="space-y-1">
              <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-400">
                Official BISE Paper Assessment
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                {evaluation.feedbackSummary}
              </div>
            </div>

            <div className="flex items-baseline gap-1 text-left sm:text-right shrink-0">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                {evaluation.awardedMarks}
              </span>
              <span className="text-lg font-bold text-slate-400">
                / {evaluation.maxMarks} Marks
              </span>
              <span className="text-xs font-extrabold text-slate-300 ml-1.5">
                ({evaluation.gradePercentage}%)
              </span>
            </div>
          </div>

          {/* Rubric Breakdown */}
          {evaluation.rubricItems && evaluation.rubricItems.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-indigo-600" />
                Examiner Rubric Breakdown
              </h4>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {evaluation.rubricItems.map((r, rIdx) => (
                  <div key={rIdx} className="p-3.5 bg-slate-50/60 text-xs sm:text-sm flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">{r.criteria}</div>
                      <div className="text-slate-600 text-xs font-normal leading-relaxed">{r.note}</div>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-md shrink-0">
                      {r.marksAwarded} / {r.maxPossible} Marks
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Missing Key Terms & Technical Terminology */}
          {evaluation.missingKeyTerms && evaluation.missingKeyTerms.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-amber-600" />
                Missing Scientific Key Terms (Examiner Looks for These):
              </h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.missingKeyTerms.map((term, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-md"
                  >
                    + {term}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {evaluation.strengths && evaluation.strengths.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                Accredited Strengths in Your Answer:
              </h4>
              <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs sm:text-sm space-y-1.5 text-slate-800 font-normal">
                {evaluation.strengths.map((str, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="leading-relaxed">{str}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examiner Pro-Tips */}
          {evaluation.examinerTips && (
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Lightbulb size={14} className="text-indigo-600" />
                Insider BISE Board Scoring Advice:
              </h4>
              <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl text-xs sm:text-sm text-indigo-950 font-normal leading-relaxed">
                {evaluation.examinerTips}
              </div>
            </div>
          )}

          {/* Official Model Answer Accordion */}
          {evaluation.modelAnswer && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen size={15} className="text-purple-600" />
                  Compare with Official BISE 100% Model Answer
                </span>
                {showModelAnswer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showModelAnswer && (
                <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm leading-relaxed text-slate-800 font-normal border-t border-slate-200 whitespace-pre-line space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                    Full Marks Reference Benchmark:
                  </div>
                  <div className="leading-relaxed">{evaluation.modelAnswer}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
