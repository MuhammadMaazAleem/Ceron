import React, { useState } from 'react';
import { Unit, Subject, Lesson } from '../../types';
import { SolvedExercisesView } from './SolvedExercisesView';
import { DigitalTextbookReader } from './DigitalTextbookReader';
import { PhysicsVideoLectureCard } from '../video/PhysicsVideoLectureCard';
import {
  ChevronLeft,
  BookOpen,
  FileText,
  Tv,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  ChevronUp,
  Play,
  Clock,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState<'topics' | 'exercises'>('topics');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  const lessons = unit.lessons || [];
  const solvedCount = unit.solvedExercises?.length || 0;
  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const currentLessonIndex = selectedLesson
    ? lessons.findIndex((l) => l.id === selectedLesson.id)
    : -1;

  const handlePrevTopic = () => {
    if (currentLessonIndex > 0) {
      setSelectedLesson(lessons[currentLessonIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextTopic = () => {
    if (currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1) {
      setSelectedLesson(lessons[currentLessonIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4 pb-28 space-y-5 animate-fadeIn">
      {/* ── Top Navigation Bar ── */}
      <div className="flex items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-2xl p-3 px-4 shadow-xs">
        <button
          onClick={() => {
            if (selectedLesson) {
              setSelectedLesson(null);
            } else {
              onBack();
            }
          }}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>{selectedLesson ? 'Back to Topics' : 'Back to Syllabus'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
            Unit {unit.unitNumber}
          </span>
          <button
            onClick={() => {
              onLaunchQuiz(unit.id);
            }}
            className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1"
          >
            <span>Practice 20 MCQs</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ── Active Topic Full Reader (When student clicked a topic) ── */}
      {selectedLesson ? (
        <div className="animate-fadeIn">
          <DigitalTextbookReader
            lesson={selectedLesson}
            unit={unit}
            subjectName={subject?.nameEn}
            isCompleted={completedLessonIds.includes(selectedLesson.id)}
            onComplete={() => {
              if (onCompleteTopic) {
                onCompleteTopic(selectedLesson.id);
              }
            }}
            languagePref={languagePref}
            onPrevTopic={handlePrevTopic}
            onNextTopic={handleNextTopic}
            hasPrev={currentLessonIndex > 0}
            hasNext={currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1}
            onBackToList={() => setSelectedLesson(null)}
          />
        </div>
      ) : (
        /* ── Chapter Main Overview & Topics List ── */
        <div className="space-y-4">
          {/* Chapter Header Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{subject?.icon || '📚'}</span>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  {subject?.nameEn || 'Curriculum'} &bull; Chapter {unit.kptbbChapter}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {completedCount}/{lessons.length} Topics Completed ({progressPercent}%)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {unit.titleEn}
            </h1>

            {unit.titleUr && (
              <p className="text-sm text-slate-600 font-nastaliq" dir="rtl">
                {unit.titleUr}
              </p>
            )}

            {unit.overviewEn && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1">
                {unit.overviewEn}
              </p>
            )}

            {/* Action Buttons: Generate 5000-Word Guide & Video Masterclass */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  if (lessons.length > 0) {
                    setSelectedLesson(lessons[0]);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="btn-gold-generate px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                style={{
                  backgroundColor: '#F59E0B',
                  color: '#0F172A',
                  fontWeight: 800,
                }}
                title="Generate 5,000-word in-depth guide with analogies, derivations, and board answers"
              >
                <Sparkles size={14} style={{ color: '#0F172A', fill: '#0F172A' }} />
                <span style={{ color: '#0F172A', fontWeight: 800 }}>Generate 5,000-Word In-Depth Guide</span>
              </button>

              <button
                onClick={() => setShowVideo(!showVideo)}
                className={`video-cta-button ${showVideo ? 'is-active' : ''}`}
                title="Watch curated video masterclass by top educators"
              >
                <Tv size={15} />
                <span>{showVideo ? 'Hide Video Lecture' : 'Watch Teacher Video Lecture'}</span>
                {showVideo ? (
                  <ChevronUp size={15} />
                ) : (
                  <ArrowDown size={15} style={{ animation: 'bounce 1s infinite' }} />
                )}
              </button>
            </div>
          </div>

          {/* Quick Notice Banner with Noticeable Arrow (shown when video is collapsed) */}
          {!showVideo && (
            <div
              onClick={() => setShowVideo(true)}
              className="video-notice-banner group"
              title="Click to expand teacher video lectures"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)' }}
                >
                  <Play size={16} className="fill-white translate-x-0.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-extrabold text-slate-900">
                      Watch Video Lectures for {unit.titleEn}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      Top Audience Educators
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    Curated masterclasses by Dr. Hadi, Sabaq Foundation, and Campus.pk
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-extrabold text-rose-700 shrink-0">
                <span className="hidden sm:inline">Watch Videos</span>
                <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 group-hover:bg-rose-600 group-hover:text-white transition">
                  <ArrowDown size={13} style={{ animation: 'bounce 1s infinite' }} />
                </div>
              </div>
            </div>
          )}

          {/* Teacher Video Player (if toggled open) */}
          {showVideo && (
            <div className="animate-fadeIn">
              <PhysicsVideoLectureCard
                unit={unit}
                selectedLesson={selectedLesson || undefined}
                subjectName={subject?.nameEn}
              />
            </div>
          )}

          {/* Clean 2 Tabs: Topics vs Solved Exercises */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'topics'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BookOpen size={14} />
              <span>Chapter Topics ({lessons.length})</span>
            </button>

            {solvedCount > 0 && (
              <button
                onClick={() => setActiveTab('exercises')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'exercises'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <FileText size={14} />
                <span>Solved Exercises ({solvedCount})</span>
              </button>
            )}
          </div>

          {/* Tab 1 Content: Spacious Chapter Topics with Concept Preview */}
          {activeTab === 'topics' && (
            <div className="space-y-3">
              {lessons.map((lesson, idx) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const explanationBlock = lesson.blocks?.find((b) => b.type === 'explanation');
                const previewSnippet =
                  explanationBlock?.data?.bodyEn?.slice(0, 130)?.replace(/\n/g, ' ') ||
                  'Official syllabus topic breakdown with diagrams, formulas, and model board questions.';

                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="p-4 sm:p-5 bg-white border border-slate-200/90 rounded-2xl hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer flex items-start justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                      </span>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                            Topic {lesson.lessonNumber}
                          </span>
                          <span className="text-[11px] text-slate-400">&bull;</span>
                          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                            <Clock size={11} /> ~{lesson.durationMinutes || 15} mins read
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {lesson.titleEn}
                        </h3>

                        {lesson.titleUr && (
                          <p className="text-xs text-slate-500 font-nastaliq" dir="rtl">
                            {lesson.titleUr}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <span
                        className="btn-gold-generate px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition group-hover:scale-[1.02]"
                        style={{
                          backgroundColor: '#F59E0B',
                          color: '#0F172A',
                          fontWeight: 800,
                        }}
                      >
                        <Sparkles size={13} style={{ color: '#0F172A', fill: '#0F172A' }} />
                        <span style={{ color: '#0F172A', fontWeight: 800 }}>Generate 5,000-Word Guide</span>
                      </span>
                      <ArrowRight size={15} className="text-slate-400 group-hover:text-amber-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2 Content: Solved Exercises & Numericals */}
          {activeTab === 'exercises' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs">
              <SolvedExercisesView
                exercises={unit.solvedExercises || []}
                chapterTitleEn={unit.titleEn}
                chapterTitleUr={unit.titleUr}
                chapterNumber={unit.kptbbChapter}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ChapterDetailView;
