import React, { useState, useEffect } from 'react';
import { Lesson, Unit } from '../../types';
import { CeronAIService } from '../../services/ceronAIService';
import { marked } from 'marked';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  Calculator,
  Compass,
  FileText,
  Clock,
  RotateCcw,
  Loader2,
  Atom,
} from 'lucide-react';

interface DigitalTextbookReaderProps {
  lesson: Lesson;
  unit: Unit;
  subjectName?: string;
  className?: string;
  isCompleted: boolean;
  onComplete: () => void;
  languagePref?: 'en' | 'ur';
  onPrevTopic?: () => void;
  onNextTopic?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onBackToList?: () => void;
}

export const DigitalTextbookReader: React.FC<DigitalTextbookReaderProps> = ({
  lesson,
  unit,
  subjectName = 'Science',
  className: studentClass = 'Class 9-12 (BISE Swat)',
  isCompleted,
  onComplete,
  languagePref = 'en',
  onPrevTopic,
  onNextTopic,
  hasPrev = false,
  hasNext = false,
  onBackToList,
}) => {
  const [activeLang, setActiveLang] = useState<'en' | 'ur'>(languagePref);
  const [activeReaderTab, setActiveReaderTab] = useState<'ai_guide' | 'board_summary'>('ai_guide');

  // Cache key for 5,000-word in-depth guide
  const cacheKey = `ceron_deep_study_${lesson.id}`;
  const [deepMarkdown, setDeepMarkdown] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load cached AI 5,000-word guide if already generated
  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setDeepMarkdown(cached);
      setActiveReaderTab('ai_guide');
    } else {
      setDeepMarkdown(null);
    }
    setErrorMsg(null);
  }, [lesson.id, cacheKey]);

  // Extract blocks from built-in lesson
  const explanationBlock = lesson.blocks?.find((b) => b.type === 'explanation');
  const diagramBlock = lesson.blocks?.find((b) => b.type === 'diagram' || b.type === 'animation');
  const solvedExampleBlock = lesson.blocks?.find((b) => b.type === 'solved_example');
  const commonMistakesBlock = lesson.blocks?.find((b) => b.type === 'common_mistakes');
  const boardTipBlock = lesson.blocks?.find((b) => b.type === 'board_tip');

  // Extract mistakes from array
  const mistakesList: any[] =
    commonMistakesBlock?.data?.mistakes || commonMistakesBlock?.data?.items || [];

  const cleanTitle = lesson.titleEn.replace(/^\d+\.\d+\s*/, '').trim();

  // Primary body text for basic syllabus
  const bodyTextEn =
    explanationBlock?.data?.bodyEn ||
    unit.overviewEn ||
    `Detailed curriculum topic covering ${lesson.titleEn} per KP Textbook Board (KPTBB) syllabus.`;
  const bodyTextUr =
    explanationBlock?.data?.bodyUr ||
    unit.overviewUr ||
    lesson.titleUr ||
    '';

  const paragraphs = bodyTextEn.split('\n\n').filter(Boolean);
  const relevantFormulas = unit.formulas || [];
  const relevantKeyTerms = unit.keyTerms || [];

  // Generate 5,000-word deep study guide via Groq AI
  const handleGenerateDeepLesson = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    const cleanChapter = unit.titleEn
      .replace(/^Chapter\s+\d+:\s*/i, '')
      .replace(/^Unit\s+\d+:\s*/i, '')
      .split('(')[0]
      .trim();

    try {
      const res = await CeronAIService.generateDeepLesson({
        topicTitle: cleanTitle,
        topicNumber: lesson.lessonNumber,
        chapterTitle: cleanChapter,
        subjectName,
        className: studentClass,
      });

      setIsGenerating(false);

      if (res.success && res.markdownContent) {
        setDeepMarkdown(res.markdownContent);
        localStorage.setItem(cacheKey, res.markdownContent);
        setActiveReaderTab('ai_guide');
      } else {
        setErrorMsg(res.error || 'Failed to generate comprehensive guide. Please try again.');
      }
    } catch (err: any) {
      setIsGenerating(false);
      setErrorMsg(err?.message || 'Error communicating with AI engine.');
    }
  };

  // Convert markdown to HTML
  const parsedHtml = deepMarkdown ? marked.parse(deepMarkdown) : '';

  return (
    <div className="space-y-6">
      {/* ── TOP HEADER & CONTROL BAR ── */}
      <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="text-xs font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs cursor-pointer transition"
            >
              <ChevronLeft size={14} /> Back to Topics
            </button>
          )}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
            {lesson.kptbbChapterRef || `Unit ${unit.unitNumber} • Topic ${lesson.lessonNumber}`}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Clock size={12} /> ~{lesson.durationMinutes || 15} mins read
          </span>
        </div>

        {/* Actions: Generate 5000-Word Guide & Language Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleGenerateDeepLesson}
            disabled={isGenerating}
            className="btn-gold-generate px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            style={{
              backgroundColor: '#F59E0B',
              color: '#0F172A',
              fontWeight: 800,
            }}
            title="Generate 5,000-word comprehensive in-depth guide"
          >
            <Sparkles size={13} style={{ color: '#0F172A', fill: '#0F172A' }} />
            <span style={{ color: '#0F172A', fontWeight: 800 }}>
              {isGenerating ? 'Generating 5,000 Words...' : deepMarkdown ? 'Re-Generate 5,000-Word Guide' : 'Generate 5,000-Word Guide'}
            </span>
          </button>

          <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveLang('en')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition ${
                activeLang === 'en'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveLang('ur')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition font-nastaliq ${
                activeLang === 'ur'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اردو
            </button>
          </div>
        </div>
      </div>

      {/* ── TOPIC TITLE DISPLAY ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-600">
            {subjectName} • Chapter {unit.kptbbChapter}
          </span>
          <button
            onClick={handleGenerateDeepLesson}
            disabled={isGenerating}
            className="text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1.5 cursor-pointer transition"
          >
            <Sparkles size={12} className="text-amber-600 fill-amber-500" />
            <span>{deepMarkdown ? '✓ 5,000-Word Guide Active (Click to Re-Generate)' : '✨ Click to Generate 5,000-Word AI Guide'}</span>
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {lesson.titleEn}
        </h1>

        {lesson.titleUr && (
          <p className="text-sm font-semibold text-slate-600 font-nastaliq" dir="rtl">
            {lesson.titleUr}
          </p>
        )}
      </div>

      {/* ── VIEW TABS: 5,000-WORD AI MASTER GUIDE VS QUICK REVISION ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveReaderTab('ai_guide')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeReaderTab === 'ai_guide'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles size={14} className="text-amber-300" />
          <span>✨ 5,000-Word Comprehensive AI Guide</span>
          {deepMarkdown && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
          )}
        </button>

        <button
          onClick={() => setActiveReaderTab('board_summary')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeReaderTab === 'board_summary'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BookOpen size={14} />
          <span>Quick Board Revision &amp; Exercises</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TAB 1: 5,000-WORD COMPREHENSIVE AI GUIDE                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeReaderTab === 'ai_guide' && (
        <div className="space-y-4">
          {/* AI Generation Trigger Banner (When guide not yet created) */}
          {!deepMarkdown && !isGenerating && (
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                    <Sparkles size={15} className="text-amber-400" />
                    <span>AI Deep Curriculum Engine</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    Generate In-Depth 5,000-Word Comprehensive Guide
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Generates a complete, exhaustive textbook guide for <strong>{cleanTitle}</strong> in crystal-clear English with real-world analogies, step-by-step pathways, derivations, comparison tables, diagram drawing rules, and full 4-mark &amp; 7-mark BISE Swat model exam answers.
                  </p>
                </div>

                <button
                  onClick={handleGenerateDeepLesson}
                  className="btn-gold-generate px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shrink-0 active:scale-95 shadow-lg"
                  style={{
                    backgroundColor: '#F59E0B',
                    color: '#0F172A',
                    fontWeight: 800,
                  }}
                >
                  <Sparkles size={16} style={{ color: '#0F172A', fill: '#0F172A' }} />
                  <span style={{ color: '#0F172A', fontWeight: 800 }}>Generate 5,000-Word Guide</span>
                </button>
              </div>
            </div>
          )}

          {/* Loading Animation during Groq Synthesis */}
          {isGenerating && (
            <div className="p-10 text-center border border-indigo-200 bg-indigo-50/50 rounded-2xl shadow-xs space-y-3 animate-pulse">
              <Loader2 size={36} className="animate-spin text-indigo-600 mx-auto" />
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Authoring 5,000-Word Comprehensive Textbook Guide via Ceron AI...
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Synthesizing intuitive everyday analogies, step-by-step mechanisms, ASCII diagram schematics, comparison tables, and official BISE Swat model answers for <strong>{cleanTitle}</strong>.
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-800 rounded-xl flex items-center justify-between gap-2">
              <span>{errorMsg}</span>
              <button
                onClick={handleGenerateDeepLesson}
                className="text-red-700 font-bold underline hover:text-red-950 cursor-pointer shrink-0"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Formatted Markdown Reader (5,000-Word Content) */}
          {deepMarkdown && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs flex-wrap gap-2">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>5,000-Word Comprehensive Textbook Guide Active</span>
                </span>

                <button
                  onClick={handleGenerateDeepLesson}
                  disabled={isGenerating}
                  className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Re-generate content with AI"
                >
                  <RotateCcw size={12} /> Regenerate Content
                </button>
              </div>

              {/* Prose Markdown Container */}
              <div
                className="prose prose-slate max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed space-y-4 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: parsedHtml as string }}
              />
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TAB 2: QUICK BOARD REVISION & STRUCTURED SYLLABUS NOTES         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {activeReaderTab === 'board_summary' && (
        <div className="space-y-6">
          {/* Section: Standard Curriculum Topic Explanation */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                <BookOpen size={15} />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  {activeLang === 'ur' ? 'موضوعی نصابی وضاحت (Textbook Summary)' : 'Standard Syllabus Explanation'}
                </h2>
                <p className="text-[11px] text-slate-500">
                  Official KPTBB core concept notes and governing rules
                </p>
              </div>
            </div>

            {activeLang === 'ur' && bodyTextUr ? (
              <div className="p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200/70 text-slate-800 font-nastaliq text-base sm:text-lg leading-loose space-y-3" dir="rtl">
                {bodyTextUr.split('\n').filter(Boolean).map((line: string, idx: number) => (
                  <p key={idx} className="whitespace-pre-line">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-slate-800 text-xs sm:text-sm leading-relaxed">
                {paragraphs.map((p: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/70 whitespace-pre-line text-slate-800 font-normal leading-relaxed"
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scientific Diagram & Schematic */}
          {diagramBlock?.data?.svg && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  <Layers size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Scientific Diagram &amp; Schematic
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Compulsory visual structure for board examination questions
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-950 flex justify-center p-4 my-2"
                dangerouslySetInnerHTML={{ __html: diagramBlock.data.svg }}
              />

              {diagramBlock.data.captionEn && (
                <p className="text-xs text-slate-600 font-medium text-center italic">
                  {diagramBlock.data.captionEn}
                </p>
              )}

              {diagramBlock.data.labels && diagramBlock.data.labels.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 justify-center">
                  {diagramBlock.data.labels.map((lbl: string, lIdx: number) => (
                    <span
                      key={lIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                    >
                      • {lbl}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Key Definitions & Vocabulary */}
          {relevantKeyTerms.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  <FileText size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Official Board Definitions (2-Mark Standards)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    High-yield definitions to memorize for Section B short questions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {relevantKeyTerms.slice(0, 4).map((term, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-xs sm:text-[13px]">
                        {term.termEn}
                      </span>
                      {term.termUr && (
                        <span className="text-[11px] text-slate-500 font-nastaliq" dir="rtl">
                          {term.termUr}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                      {term.definitionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Governing Formulas & Laws */}
          {relevantFormulas.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                  <Calculator size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Governing Formulas, SI Units &amp; Equations
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Essential equations for numerical problems and theoretical deductions
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                {relevantFormulas.map((f, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800"
                  >
                    <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center justify-between">
                      <span>{f.labelEn}</span>
                      {f.labelUr && <span className="font-nastaliq text-xs text-amber-300">{f.labelUr}</span>}
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-black text-amber-300 bg-slate-800/90 p-2.5 rounded-lg border border-slate-700 tracking-wide overflow-x-auto">
                      {f.formula}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed font-normal">
                      {f.explanationEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solved BISE Swat Model Problem */}
          {solvedExampleBlock?.data && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  <Compass size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    BISE Swat Model Exam Problem (Solved Step-by-Step)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Standard Section B / C board layout for full marks
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-slate-50/90 border border-slate-200/80 rounded-xl space-y-3.5 text-xs">
                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                  {solvedExampleBlock.data.titleEn || 'Model Exam Question'}
                </div>

                {solvedExampleBlock.data.problemEn && (
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed italic">
                    "{solvedExampleBlock.data.problemEn}"
                  </div>
                )}

                {solvedExampleBlock.data.steps && (
                  <div className="space-y-2 border-l-2 border-indigo-500 pl-3">
                    {solvedExampleBlock.data.steps.map((st: any, sIdx: number) => (
                      <div key={sIdx} className="text-slate-700 leading-relaxed">
                        <strong className="text-slate-900 font-semibold">{st.label}: </strong>
                        <span>{st.content}</span>
                      </div>
                    ))}
                  </div>
                )}

                {solvedExampleBlock.data.answer && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-900 flex items-center justify-between">
                    <span>Final Exam Result:</span>
                    <span className="font-mono font-black">{solvedExampleBlock.data.answer}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Common Exam Mistakes & Examiner Pro-Tip */}
          {(mistakesList.length > 0 || boardTipBlock?.data) && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                  <AlertTriangle size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Examiner Insights &amp; Pitfalls to Avoid
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Common errors where students lose marks in BISE Swat board papers
                  </p>
                </div>
              </div>

              {mistakesList.length > 0 && (
                <div className="space-y-2 pt-1">
                  {mistakesList.map((cm: any, cIdx: number) => (
                    <div
                      key={cIdx}
                      className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-xl text-xs space-y-1.5"
                    >
                      <div className="text-rose-950 font-bold flex items-start gap-1.5">
                        <span className="shrink-0">❌</span>
                        <span>Common Error: {cm.mistake}</span>
                      </div>
                      <div className="text-emerald-950 font-semibold flex items-start gap-1.5">
                        <span className="shrink-0">✓</span>
                        <span>Correction: {cm.correction}</span>
                      </div>
                      {cm.reason && (
                        <div className="text-slate-600 text-[11px] pl-5 border-l-2 border-slate-300 ml-1">
                          <strong>Examiner deduction rule:</strong> {cm.reason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {boardTipBlock?.data && (
                <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs space-y-1">
                  <div className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                    💡 BISE Swat Examiner Pro-Tip
                  </div>
                  <div className="text-slate-800 leading-relaxed font-medium">
                    {boardTipBlock.data.textEn}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── BOTTOM TOPIC COMPLETION & NAVIGATION CONTROLS ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Finished Studying Topic {lesson.lessonNumber}?
          </h4>
          <p className="text-[11px] text-slate-500">
            Mark this topic mastered to update your curriculum progress (+25 XP).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasPrev && onPrevTopic && (
            <button
              onClick={onPrevTopic}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Previous
            </button>
          )}

          {!isCompleted ? (
            <button
              onClick={onComplete}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} /> Mark as Learned (+25 XP)
            </button>
          ) : (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" /> Topic Mastered
            </span>
          )}

          {hasNext && onNextTopic && (
            <button
              onClick={onNextTopic}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer shadow-xs flex items-center gap-1"
            >
              Next <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DigitalTextbookReader;
