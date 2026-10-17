import React, { useState } from 'react';
import { Unit, Subject } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { BlockRenderer } from '../lesson/BlockRenderer';
import { ExternalKnowledgeExplorer } from '../knowledge/ExternalKnowledgeExplorer';
import {
  ChevronLeft,
  BookOpen,
  Award,
  Globe,
  Sparkles,
  Bookmark,
  CheckCircle2,
  FileText,
  Printer,
} from 'lucide-react';

interface TextbookReaderViewProps {
  unit: Unit;
  subject?: Subject;
  languagePref: 'en' | 'ur';
  onBack: () => void;
  onLaunchQuiz: (quizId: string) => void;
}

export const TextbookReaderView: React.FC<TextbookReaderViewProps> = ({
  unit,
  subject,
  languagePref,
  onBack,
  onLaunchQuiz,
}) => {
  const [showEncyclopedia, setShowEncyclopedia] = useState<boolean>(false);
  const lessons = unit.lessons || [];

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6 pb-28">
      {/* Sticky Reader Toolbar */}
      <div className="pearl-card p-3 mb-6 flex items-center justify-between sticky top-16 z-30 bg-white/95 backdrop-blur shadow-md">
        <button
          onClick={() => {
            soundEngine.playPop();
            onBack();
          }}
          className="pearl-pill text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
        >
          <ChevronLeft size={14} /> Back to Chapter Hub
        </button>

        <div className="flex items-center gap-2">
          {subject && <span className="text-base">{subject.icon}</span>}
          <span className="text-xs font-black text-purple-700">
            {subject?.nameEn} • Ch {unit.kptbbChapter}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playPop();
              setShowEncyclopedia(!showEncyclopedia);
            }}
            className="pearl-pill text-xs font-bold bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 cursor-pointer flex items-center gap-1"
          >
            <Globe size={12} className="text-sky-600" />
            {showEncyclopedia ? 'Hide Encyclopedia' : 'Live Encyclopedia'}
          </button>
        </div>
      </div>

      {/* Encyclopedia Drawer */}
      {showEncyclopedia && (
        <div className="mb-6">
          <ExternalKnowledgeExplorer
            initialTopic={unit.titleEn.replace(/^Chapter\s+\d+:\s*/i, '')}
            suggestedTopics={unit.keyTerms?.map((k) => k.termEn) || ['Gas exchange', 'Alveolus', 'Mitosis']}
            onClose={() => setShowEncyclopedia(false)}
          />
        </div>
      )}

      {/* Formal Textbook Chapter Header */}
      <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-purple-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="pearl-pill text-xs font-extrabold bg-purple-700 text-white">
              Official KPTBB Textbook
            </span>
            <span className="text-xs font-bold text-slate-500">
              Prescribed for BISE Swat Board
            </span>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Unit {unit.unitNumber}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 leading-tight">
          {unit.titleEn}
        </h1>
        <div className="text-xl sm:text-2xl font-nastaliq font-bold text-purple-700 mb-4">
          {unit.titleUr}
        </div>

        {unit.overviewEn && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2 mb-4">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <BookOpen size={14} className="text-purple-600" /> Chapter Overview &amp; Learning Scope:
            </div>
            <p>{unit.overviewEn}</p>
            {unit.overviewUr && (
              <p className="font-nastaliq text-sm text-purple-900 pt-2 border-t border-slate-200 leading-loose">
                {unit.overviewUr}
              </p>
            )}
          </div>
        )}

        {/* Chapter Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
          <div className="p-2 bg-purple-50/50 rounded-xl">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Topics</div>
            <div className="text-base font-black text-purple-700">{lessons.length} Sections</div>
          </div>
          <div className="p-2 bg-purple-50/50 rounded-xl">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Key Formulas</div>
            <div className="text-base font-black text-purple-700">{unit.formulas?.length || 1} Equations</div>
          </div>
          <div className="p-2 bg-purple-50/50 rounded-xl">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Key Terms</div>
            <div className="text-base font-black text-purple-700">{unit.keyTerms?.length || 3} Definitions</div>
          </div>
          <div className="p-2 bg-purple-50/50 rounded-xl">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Passing Standard</div>
            <div className="text-base font-black text-emerald-600">33% BISE Swat</div>
          </div>
        </div>
      </div>

      {/* Sequential Textbook Sections */}
      <div className="space-y-10">
        {lessons.map((lesson, idx) => (
          <article
            key={lesson.id}
            id={`section-${lesson.lessonNumber}`}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
          >
            {/* Section Header */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="pearl-pill text-xs font-black bg-purple-50 text-purple-800 border-purple-200">
                  Section {unit.kptbbChapter}.{lesson.lessonNumber}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {lesson.kptbbChapterRef}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {lesson.titleEn}
              </h2>
              <div className="text-lg font-nastaliq font-bold text-purple-700 mt-1">
                {lesson.titleUr}
              </div>
            </div>

            {/* Blocks of this section */}
            <BlockRenderer blocks={lesson.blocks} languagePref={languagePref} />
          </article>
        ))}
      </div>

      {/* Chapter Summary & Board Exam Callout */}
      <div className="mt-12 bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-400" size={20} />
          <h3 className="text-lg font-black text-white">
            Chapter Complete • Ready for Board Mock Exam
          </h3>
        </div>
        <p className="text-xs text-purple-200 leading-relaxed font-normal">
          You have read through all sections of {unit.titleEn}. To verify your retention and prepare for the BISE Swat matric / intermediate annual board examination, launch the official Chapter Mock Exam.
        </p>

        {unit.quizId && (
          <button
            onClick={() => {
              soundEngine.playPop();
              onLaunchQuiz(unit.quizId!);
            }}
            className="pearl-btn pearl-btn-lavender w-full text-xs font-bold py-3 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Award size={16} /> Start Chapter Mock Exam (33% Passing Standard)
          </button>
        )}
      </div>
    </div>
  );
};
