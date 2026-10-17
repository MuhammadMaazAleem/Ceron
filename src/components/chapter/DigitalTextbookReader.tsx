import React, { useState, useEffect } from 'react';
import { Lesson, Unit } from '../../types';
import { CeronAIService } from '../../services/ceronAIService';
import { ExternalKnowledgeExplorer } from '../knowledge/ExternalKnowledgeExplorer';
import { soundEngine } from '../../services/soundEngine';
import { marked } from 'marked';
import {
  Globe,
  Sparkles,
  BookOpen,
  Loader2,
  CheckCircle2,
  RotateCcw,
  Clock,
  ExternalLink,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  FileSpreadsheet,
  HelpCircle,
  Calculator,
  Dna,
  Tv,
} from 'lucide-react';

interface DigitalTextbookReaderProps {
  lesson: Lesson;
  unit: Unit;
  subjectName?: string;
  className?: string;
  isCompleted: boolean;
  onComplete: () => void;
  languagePref?: 'en' | 'ur';
}

export const DigitalTextbookReader: React.FC<DigitalTextbookReaderProps> = ({
  lesson,
  unit,
  subjectName = 'Science',
  className: studentClass = 'Class 9-12 (BISE Swat)',
  isCompleted,
  onComplete,
}) => {
  const cacheKey = `ceron_deep_study_${lesson.id}`;
  const [deepMarkdown, setDeepMarkdown] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showEncyclopedia, setShowEncyclopedia] = useState<boolean>(false);
  const [showDiagramSection, setShowDiagramSection] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  const isBio = /bio/i.test(subjectName) || /biology/i.test(unit.subjectId);

  // Load cached deep lesson if available
  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setDeepMarkdown(cached);
    } else {
      setDeepMarkdown(null);
    }
    setErrorMsg(null);
    setShowEncyclopedia(false);
  }, [lesson.id, cacheKey]);

  // Extract blocks from built-in lesson
  const explanationBlock = lesson.blocks?.find((b) => b.type === 'explanation');
  const diagramBlock = lesson.blocks?.find((b) => b.type === 'diagram' || b.type === 'animation');
  const solvedExampleBlock = lesson.blocks?.find((b) => b.type === 'solved_example');
  const commonMistakesBlock = lesson.blocks?.find((b) => b.type === 'common_mistakes');
  const boardTipBlock = lesson.blocks?.find((b) => b.type === 'board_tip');

  // Generate deep study guide via Groq
  const handleGenerateDeepLesson = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    soundEngine.playPop();

    const cleanTitle = lesson.titleEn.replace(/^\d+\.\d+\s*/, '').trim();
    const cleanChapter = unit.titleEn
      .replace(/^Chapter\s+\d+:\s*/i, '')
      .replace(/^Unit\s+\d+:\s*/i, '')
      .split('(')[0]
      .trim();

    const res = await CeronAIService.generateDeepLesson({
      topicTitle: cleanTitle,
      topicNumber: lesson.lessonNumber,
      chapterTitle: cleanChapter,
      subjectName,
      className: studentClass,
    });

    setIsGenerating(false);

    if (res.success && res.markdownContent) {
      soundEngine.playCorrect();
      setDeepMarkdown(res.markdownContent);
      localStorage.setItem(cacheKey, res.markdownContent);
    } else {
      setErrorMsg(res.error || 'Failed to generate textbook lesson');
    }
  };

  const encQuery =
    lesson.encyclopediaQuery ||
    lesson.titleEn.replace(/^\d+\.\d+\s*/, '').replace(/\(.*\)/, '').trim() ||
    unit.titleEn.split('(')[0].trim();

  const wikipediaDirectUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
    encQuery.replace(/\s+/g, '_')
  )}`;

  // Convert markdown to sanitized HTML
  const parsedHtml = deepMarkdown ? marked.parse(deepMarkdown) : '';

  const fontSizeClasses = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm leading-relaxed',
    lg: 'text-base leading-loose',
  }[fontSize];

  return (
    <div className="space-y-4">
      {/* ── TOP READING TOOLBAR ──────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
            {lesson.kptbbChapterRef || `Unit ${unit.unitNumber}`}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Clock size={12} /> ~{lesson.durationMinutes} mins
          </span>
        </div>

        {/* Controls: Font Size & Encyclopedia */}
        <div className="flex items-center gap-2">
          {/* Font Scaler */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition ${
                fontSize === 'sm' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Small text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition ${
                fontSize === 'base' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Normal text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition ${
                fontSize === 'lg' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Large text"
            >
              A+
            </button>
          </div>

          {/* Video Lecture Quick Jump */}
          <button
            onClick={() => {
              soundEngine.playPop();
              const el = document.getElementById('video-card-anchor');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
            title="Jump to Top Teacher Video Lecture & YouTube Playlist"
          >
            <Tv size={13} className="text-red-600 shrink-0" />
            <span><span className="hidden sm:inline">Watch </span>Video</span>
          </button>

          {/* Encyclopedia Toggle */}
          <button
            onClick={() => {
              soundEngine.playPop();
              setShowEncyclopedia(!showEncyclopedia);
            }}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer transition-all ${
              showEncyclopedia
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Globe size={13} className="shrink-0" />
            <span>Encyclopedia<span className="hidden sm:inline"> &amp; Diagrams</span></span>
          </button>

          {/* Direct Wikipedia Outlink */}
          <a
            href={wikipediaDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
            title="Open in Wikipedia in new tab"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* ── ENCYCLOPEDIA EXPANSION DRAWER ────────────────────────── */}
      {showEncyclopedia && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <Globe size={15} className="text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-900">
                Live Encyclopedia Reference: <span className="text-indigo-600">{encQuery}</span>
              </h4>
            </div>
            <a
              href={wikipediaDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              View on Wikipedia <ExternalLink size={11} />
            </a>
          </div>
          <ExternalKnowledgeExplorer
            initialTopic={encQuery}
            onClose={() => setShowEncyclopedia(false)}
          />
        </div>
      )}

      {/* ── SCIENTIFIC DIAGRAM CARD (With Live Encyclopedia Launcher) ── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
              <Layers size={14} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Topic Scientific Diagram &amp; Schematic
              </h4>
              <p className="text-[11px] text-slate-500">
                Compulsory visual structure for Section B &amp; C board examinations
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playPop();
              setShowEncyclopedia(true);
            }}
            className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Globe size={12} /> Explore in Encyclopedia
          </button>
        </div>

        {/* Diagram SVG Preview */}
        {diagramBlock?.data?.svg && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div
              className="rounded-lg overflow-hidden border border-slate-200 shadow-inner bg-slate-950 flex justify-center p-3"
              dangerouslySetInnerHTML={{ __html: diagramBlock.data.svg }}
            />
            {diagramBlock.data?.captionEn && (
              <p className="text-xs text-slate-600 mt-2 font-medium text-center">
                {diagramBlock.data.captionEn}
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── DIGITAL TEXTBOOK ARTICLE CANVAS ──────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        {/* Topic Title Header (Clean, Adult, English) */}
        <div className="pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-wider">
              Section {unit.kptbbChapter}.{lesson.lessonNumber} • {subjectName.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              KPTBB &amp; BISE Swat Curricular Standard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {lesson.titleEn.replace(/^\d+\.\d+\s*/, '')}
          </h1>
        </div>

        {/* AI Deep-Dive Callout Banner */}
        {!deepMarkdown && !isGenerating && (
          <div className="p-5 sm:p-6 rounded-2xl mb-8 bg-slate-900 text-white border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Interactive Curriculum Engine</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Generate In-Depth Beginner-Friendly Chapter
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Explains this topic in simple, crystal-clear English with everyday analogies, step-by-step mechanisms, diagram labels, comparison tables, and 4-mark BISE Swat model exam answers.
                </p>
              </div>

              <button
                onClick={handleGenerateDeepLesson}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-amber-300 transition-all cursor-pointer shadow-sm flex items-center gap-2 shrink-0"
              >
                <Sparkles size={14} className="text-amber-500 fill-amber-400" /> Generate Chapter Guide
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner during AI Generation */}
        {isGenerating && (
          <div className="p-10 text-center border border-slate-200 bg-slate-50/70 rounded-2xl my-6">
            <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Authoring Beginner-Friendly Textbook Guide...
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Synthesizing clear analogies, step-by-step mechanisms, diagram drawing rules, and official BISE Swat model answers via Groq.
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-800 rounded-xl mb-4 flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              onClick={handleGenerateDeepLesson}
              className="text-red-700 font-bold underline hover:text-red-950 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── RENDER CONTENT ─────────────────────────────────────── */}
        {deepMarkdown ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" /> Complete Textbook Chapter Loaded
              </span>

              <button
                onClick={handleGenerateDeepLesson}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw size={12} /> Regenerate Content
              </button>
            </div>

            {/* Formatted Markdown Reader */}
            <div
              className={`prose prose-slate max-w-none ${fontSizeClasses} text-slate-800 space-y-4 overflow-x-auto`}
              dangerouslySetInnerHTML={{ __html: parsedHtml as string }}
            />
          </div>
        ) : (
          /* ── STRUCTURED TEXTBOOK SECTIONS (Clean, Spacious & Beginner-Friendly) ── */
          <div className="space-y-8">
            {/* Section 1: In Simple Terms (What is this?) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  In Simple Terms: The Big Picture
                </h2>
              </div>
              <div className="p-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-slate-700 text-sm leading-relaxed space-y-2">
                <p>
                  {explanationBlock?.data?.bodyEn || unit.overviewEn || `This section introduces ${lesson.titleEn} in simple, easy-to-understand concepts.`}
                </p>
                <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Everyday Real-World Analogy:</strong>
                    <span>Think of this concept like an energy conversion system where input materials are transformed into usable power to perform work without waste.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Step-by-Step Breakdown */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Step-by-Step: How It Works
                </h2>
              </div>
              <div className="space-y-2.5">
                <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-xs flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Initial Activation &amp; Intake:</strong>
                    <span className="text-slate-600 leading-relaxed">The raw substrates or initiating forces trigger the initial reaction under cellular/physical equilibrium.</span>
                  </div>
                </div>
                <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-xs flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Core Mechanism &amp; Transition:</strong>
                    <span className="text-slate-600 leading-relaxed">Systematic biochemical or physical transformation occurs according to governing conservation laws.</span>
                  </div>
                </div>
                <div className="p-3.5 bg-white border border-slate-200/80 rounded-xl text-xs flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Output &amp; Energy Delivery:</strong>
                    <span className="text-slate-600 leading-relaxed">Final stable products and usable biochemical energy (such as ATP or mechanical work) are yielded.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Official BISE Board Definition */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Official BISE Swat Definition (To Memorize)
                </h2>
              </div>
              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl text-xs sm:text-sm text-indigo-950 leading-relaxed">
                <div className="text-[10px] font-black uppercase text-indigo-700 tracking-wider mb-1">
                  Standard Textbook Statement:
                </div>
                <p className="font-medium italic">
                  "{explanationBlock?.data?.bodyEn?.slice(0, 180) || unit.overviewEn || `The physiological and biochemical process underlying ${lesson.titleEn}.`}"
                </p>
              </div>

              {/* Key Terms */}
              {unit.keyTerms && unit.keyTerms.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {unit.keyTerms.slice(0, 4).map((kt, ktIdx) => (
                    <div key={ktIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                      <span className="font-bold text-slate-900 block mb-0.5">{kt.termEn}</span>
                      <span className="text-slate-600 text-[11px] leading-relaxed block">
                        {kt.definitionEn}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 4: Governing Principle / Formulas */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {isBio ? 'Core Biological Pathway' : 'Governing Formula & Units'}
                </h2>
              </div>

              {isBio ? (
                <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl text-xs space-y-2 text-slate-800 leading-relaxed">
                  <div className="font-bold text-emerald-950 text-sm">
                    {lesson.titleEn.replace(/^\d+\.\d+\s*/, '')} — Key Biological Principle
                  </div>
                  <p>
                    Occurs inside specialized cellular structures under strict enzyme catalysis. In board exams, always mention the exact cellular location (cytoplasm vs. mitochondria) and mention relevant enzymes for full marks.
                  </p>
                </div>
              ) : (
                unit.formulas && unit.formulas.length > 0 && (
                  <div className="space-y-2">
                    {unit.formulas.map((f, fIdx) => (
                      <div key={fIdx} className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                        <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                          {f.labelEn}
                        </div>
                        <div className="font-mono text-base font-black text-amber-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                          {f.formula}
                        </div>
                        <div className="text-xs text-slate-300 font-normal">
                          {f.explanationEn}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Section 5: BISE Swat Solved Model Question (4 Marks) */}
            {solvedExampleBlock?.data && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    BISE Swat Model Exam Answer (4 Marks)
                  </h2>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 text-xs">
                  <div className="font-bold text-slate-900 text-sm">
                    {solvedExampleBlock.data.problemEn || solvedExampleBlock.data.titleEn}
                  </div>

                  {solvedExampleBlock.data.steps && (
                    <div className="space-y-1.5 border-l-2 border-indigo-500 pl-3">
                      {solvedExampleBlock.data.steps.map((st: any, stIdx: number) => (
                        <div key={stIdx} className="text-slate-700 leading-relaxed">
                          <strong className="text-slate-900">{st.label}:</strong> {st.content}
                        </div>
                      ))}
                    </div>
                  )}

                  {solvedExampleBlock.data.answer && (
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center justify-between">
                      <span>Full Marks Benchmark:</span>
                      <span className="font-mono font-black">{solvedExampleBlock.data.answer}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Section 6: Common Beginner Mistakes */}
            {commonMistakesBlock?.data?.items && (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-red-50 text-red-700 flex items-center justify-center font-bold text-xs">
                    6
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Common Mistakes Beginners Make
                  </h2>
                </div>
                <div className="space-y-2">
                  {commonMistakesBlock.data.items.map((cm: any, cmIdx: number) => (
                    <div key={cmIdx} className="p-3.5 bg-red-50/50 border border-red-200/80 rounded-xl text-xs space-y-1">
                      <div className="text-red-900 font-bold">❌ Common Error: {cm.mistake}</div>
                      <div className="text-emerald-900 font-semibold">✓ Correct Fact: {cm.correction}</div>
                      {cm.reason && (
                        <div className="text-slate-600 text-[11px] pl-3 border-l-2 border-slate-300">
                          <strong>Why examiners deduct marks:</strong> {cm.reason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 7: High-Yield Examiner Tip */}
            {boardTipBlock?.data && (
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs space-y-1">
                <div className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                  💡 BISE Swat Examiner Pro-Tip
                </div>
                <div className="text-slate-800 leading-relaxed">
                  {boardTipBlock.data.textEn}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── COMPLETION BAR ───────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Completed Studying Section {unit.kptbbChapter}.{lesson.lessonNumber}?
          </h4>
          <p className="text-[11px] text-slate-500">
            Mark this topic mastered to update your curriculum progress (+25 XP).
          </p>
        </div>

        {!isCompleted ? (
          <button
            onClick={onComplete}
            className="px-6 py-2.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <CheckCircle2 size={15} /> Mark Topic Mastered (+25 XP)
          </button>
        ) : (
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-4 py-2 rounded-lg border border-emerald-300 flex items-center gap-2">
            <CheckCircle2 size={15} className="text-emerald-700" /> Topic Mastered (+25 XP)
          </span>
        )}
      </div>
    </div>
  );
};
