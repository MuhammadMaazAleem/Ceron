import React, { useState } from 'react';
import { Unit, Subject, Lesson } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { TopicRoadmapView } from './TopicRoadmapView';
import { SolvedExercisesView } from './SolvedExercisesView';
import { BoardPairingSchemeView } from './BoardPairingSchemeView';
import { BoardTutorWidget } from '../tutor/BoardTutorWidget';
import { ExamNightCramSheetView } from './ExamNightCramSheetView';
import { VirtualBoardExaminer } from './VirtualBoardExaminer';
import { ChapterVideoMasterclassView } from './ChapterVideoMasterclassView';
import {
  ChevronLeft,
  FileText,
  Sparkles,
  Calculator,
  Compass,
  Award,
  Target,
  Tv,
  FileSpreadsheet,
} from 'lucide-react';

interface ChapterDetailViewProps {
  unit: Unit;
  subject?: Subject;
  languagePref: 'en' | 'ur';
  completedLessonIds: string[];
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onLaunchQuiz: (quizId: string) => void;
  onCompleteTopic?: (lessonId: string) => void;
}

export const ChapterDetailView: React.FC<ChapterDetailViewProps> = ({
  unit,
  subject,
  languagePref,
  completedLessonIds,
  onBack,
  onSelectLesson,
  onLaunchQuiz,
  onCompleteTopic,
}) => {
  // 7 Structured Master Pillars (including YouTube Video Masterclass)
  const [activeTab, setActiveTab] = useState<'roadmap' | 'videos' | 'exercises' | 'past_papers' | 'cram_sheet' | 'examiner' | 'tutor'>('roadmap');

  const lessons = unit.lessons || [];
  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
  const solvedCount = unit.solvedExercises?.length || 0;

  const handleCompleteTopicInternal = (lessonId: string) => {
    if (onCompleteTopic) {
      onCompleteTopic(lessonId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 pb-28">
      {/* ── Top Header Navigation Bar ────────────────────────────── */}
      <div className="pearl-card p-3 mb-4 flex items-center justify-between bg-white shadow-xs">
        <button
          onClick={() => {
            soundEngine.playPop();
            onBack();
          }}
          className="pearl-pill text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer flex items-center gap-1 shrink-0"
        >
          <ChevronLeft size={14} /> <span>Back<span className="hidden sm:inline"> to Chapters</span></span>
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          {subject && <span className="text-sm shrink-0">{subject.icon}</span>}
          <span className="text-xs font-extrabold text-purple-700 truncate">
            {subject?.nameEn || 'Syllabus'}
          </span>
          <span className="pearl-pill text-[10px] bg-purple-50 text-purple-800 border-purple-200 shrink-0">
            Ch {unit.kptbbChapter}
          </span>
        </div>

        <div className="pearl-pill text-xs font-bold bg-amber-50 text-amber-700 border-amber-200 shrink-0">
          <Sparkles size={12} className="text-amber-500" /> {progressPercent}%
        </div>
      </div>

      {/* ── Chapter Hero Banner ──────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 mb-4 shadow-xs">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-1.5">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
            Chapter {unit.kptbbChapter} &bull; Unit {unit.unitNumber}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {lessons.length} Major Topics &bull; {solvedCount} Solved Exercises
          </span>
        </div>

        <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 mb-1.5 leading-tight">
          {unit.titleEn}
        </h2>

        {unit.overviewEn && (
          <p className="text-xs text-slate-600 mb-3 leading-relaxed font-normal">
            {unit.overviewEn}
          </p>
        )}

        {/* Pairing Scheme & Expected Marks Pill */}
        {unit.pairingScheme && (
          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs font-medium flex-wrap gap-2">
            <span className="text-slate-800 flex items-center gap-1.5 font-semibold">
              <Target size={14} className="text-indigo-600 shrink-0" />
              <span>Board Weightage: ~{unit.pairingScheme.totalBoardMarks} Marks</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  setActiveTab('videos');
                }}
                className="text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md border border-red-200 flex items-center gap-1 cursor-pointer transition shadow-xs"
              >
                <Tv size={12} className="text-red-600" /> Watch Video Lectures
              </button>
              <span className="text-slate-500 text-[11px]">
                Paired with: {unit.pairingScheme.pairedWithChapters}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── 7 Streamlined Master Study Tabs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 p-1.5 bg-slate-100 rounded-xl mb-5">
        <button
          onClick={() => {
            soundEngine.playPop();
            setActiveTab('roadmap');
          }}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer text-center ${
            activeTab === 'roadmap'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200/60'
          }`}
        >
          <Compass size={14} className="shrink-0" />
          <span className="leading-tight text-[11px] sm:text-xs">Roadmap ({lessons.length})</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPop();
            setActiveTab('videos');
          }}
          style={
            activeTab === 'videos'
              ? { backgroundColor: '#DC2626', color: '#FFFFFF', borderColor: '#B91C1C' }
              : { backgroundColor: '#FEF2F2', color: '#B91C1C', borderColor: '#FECACA' }
          }
          className="py-2 px-1 rounded-lg text-xs font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer text-center border shadow-2xs"
        >
          <Tv size={14} className="shrink-0" style={{ color: activeTab === 'videos' ? '#FFFFFF' : '#DC2626' }} />
          <span className="leading-tight text-[11px] sm:text-xs font-bold">Video Lectures</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPop();
            setActiveTab('exercises');
          }}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer text-center ${
            activeTab === 'exercises'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200/60'
          }`}
        >
          <Calculator size={14} className="shrink-0" />
          <span className="leading-tight text-[11px] sm:text-xs">Solved ({solvedCount})</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPop();
            setActiveTab('past_papers');
          }}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer text-center ${
            activeTab === 'past_papers'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200/60'
          }`}
        >
          <FileText size={14} className="shrink-0" />
          <span className="leading-tight text-[11px] sm:text-xs">Past Papers</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPop();
            setActiveTab('cram_sheet');
          }}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer text-center ${
            activeTab === 'cram_sheet'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200/60'
          }`}
        >
          <FileSpreadsheet size={14} className="shrink-0" />
          <span className="leading-tight text-[11px] sm:text-xs">Cram Sheet</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPop();
            setActiveTab('examiner');
          }}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer text-center ${
            activeTab === 'examiner'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-emerald-800 hover:text-emerald-950 bg-emerald-50/80 border border-emerald-300 font-extrabold'
          }`}
        >
          <Award size={14} className="shrink-0" />
          <span className="leading-tight text-[11px] sm:text-xs">Paper Checker</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playPop();
            setActiveTab('tutor');
          }}
          className={`py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer text-center ${
            activeTab === 'tutor'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200/60'
          }`}
        >
          <Sparkles size={14} className="shrink-0" />
          <span className="leading-tight text-[11px] sm:text-xs">AI Tutor</span>
        </button>
      </div>

      {/* ── PILLAR 1: TOPIC ROADMAP & DEEP EXPLANATIONS ───────────── */}
      {activeTab === 'roadmap' && (
        <TopicRoadmapView
          unit={unit}
          lessons={lessons}
          completedLessonIds={completedLessonIds}
          onCompleteTopic={handleCompleteTopicInternal}
          languagePref={languagePref}
        />
      )}

      {/* ── PILLAR 2: YOUTUBE VIDEO MASTERCLASS ──────────────────── */}
      {activeTab === 'videos' && (
        <ChapterVideoMasterclassView
          unit={unit}
          lessons={lessons}
          classId={unit.classId}
          subjectName={subject?.nameEn || 'Physics'}
          languagePref={languagePref}
        />
      )}

      {/* ── PILLAR 2: SOLVED TEXTBOOK EXERCISES & NUMERICALS ──────── */}
      {activeTab === 'exercises' && (
        <SolvedExercisesView
          exercises={unit.solvedExercises || []}
          chapterTitleEn={unit.titleEn}
          chapterTitleUr={unit.titleUr}
          chapterNumber={unit.kptbbChapter}
        />
      )}

      {/* ── PILLAR 3: PAST PAPERS & OFFICIAL PAIRING SCHEME ────────── */}
      {activeTab === 'past_papers' && (
        <div className="space-y-5">
          {/* Pairing Scheme Breakdown */}
          {unit.pairingScheme && (
            <BoardPairingSchemeView unit={unit} pairingScheme={unit.pairingScheme} />
          )}

          {/* Past Papers Archive */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-purple-600" /> BISE Swat Past Papers Archive (2022–2024)
              </h3>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Official Model Answers
              </span>
            </div>

            {unit.pastPaperQuestions && unit.pastPaperQuestions.length > 0 ? (
              unit.pastPaperQuestions.map((q, qIdx) => (
                <div key={qIdx} className="pearl-card p-4.5 bg-white border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="pearl-pill text-[11px] font-extrabold bg-purple-50 text-purple-800 border-purple-200">
                        {q.year}
                      </span>
                      {q.section && (
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                          {q.section}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                      {q.marks} Marks
                    </span>
                  </div>

                  <div className="text-sm font-extrabold text-slate-900 leading-snug">
                    {q.questionEn}
                  </div>

                  {/* Model Answer Box */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-normal">
                    <div className="text-[10px] font-black uppercase text-indigo-700 tracking-wider mb-1.5">
                      BISE Swat Official Model Answer
                    </div>
                    <div className="whitespace-pre-line">{q.modelAnswerEn}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="pearl-card p-6 text-center text-slate-400">
                <p className="text-xs font-semibold">Review the sequential topics in the roadmap to master all past paper questions.</p>
              </div>
            )}
          </div>

          {/* Quick Mock Exam Trigger */}
          {unit.quizId && (
            <div className="pearl-card p-5 text-center bg-white border border-purple-200 rounded-2xl shadow-sm">
              <h4 className="text-sm font-black text-slate-900 mb-1">
                Ready for Chapter Mock Exam?
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                10 MCQs with timed clock • 33% Passing Standard per BISE Swat rules.
              </p>
              <button
                onClick={() => {
                  soundEngine.playPop();
                  onLaunchQuiz(unit.quizId!);
                }}
                className="pearl-btn pearl-btn-lavender py-2.5 px-6 text-xs font-black shadow-sm mx-auto flex items-center gap-1.5 cursor-pointer"
              >
                <Award size={14} /> Start Chapter Mock Test
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── PILLAR 4: 1-PAGE EXAM NIGHT CRAM SHEET ──────────────── */}
      {activeTab === 'cram_sheet' && (
        <ExamNightCramSheetView unit={unit} subject={subject} className={unit.classId} />
      )}

      {/* ── PILLAR 5: VIRTUAL BISE BOARD EXAMINER ─────────────────── */}
      {activeTab === 'examiner' && (
        <VirtualBoardExaminer unit={unit} subject={subject} className={unit.classId} />
      )}

      {/* ── PILLAR 6: ASK CERON AI BOARD TUTOR ────────────────────── */}
      {activeTab === 'tutor' && (
        <BoardTutorWidget unit={unit} subjectName={subject?.nameEn} className={unit.classId} />
      )}
    </div>
  );
};
