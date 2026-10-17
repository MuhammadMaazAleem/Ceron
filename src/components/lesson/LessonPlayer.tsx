import React, { useState } from 'react';
import { Lesson } from '../../types';
import { BlockRenderer } from './BlockRenderer';
import { StorageService } from '../../services/storage';
import { soundEngine } from '../../services/soundEngine';
import confetti from 'canvas-confetti';
import { ChevronLeft, Sparkles, CheckCircle2, Globe } from 'lucide-react';
import { ExternalKnowledgeExplorer } from '../knowledge/ExternalKnowledgeExplorer';

interface LessonPlayerProps {
  lesson: Lesson;
  allLessonsInUnit?: Lesson[];
  childId: string;
  languagePref: 'en' | 'ur';
  onBack: () => void;
  onSelectLesson?: (lesson: Lesson) => void;
  onTakeQuiz?: () => void;
}

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  lesson,
  allLessonsInUnit = [],
  childId,
  languagePref,
  onBack,
  onSelectLesson,
  onTakeQuiz,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showEncyclopedia, setShowEncyclopedia] = useState<boolean>(false);

  const currentIndex = allLessonsInUnit.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessonsInUnit[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessonsInUnit.length - 1 ? allLessonsInUnit[currentIndex + 1] : null;

  const handleCompleteLesson = () => {
    StorageService.completeLesson(childId, lesson.id, 25);
    setIsCompleted(true);
    soundEngine.playCorrect();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#10B981', '#06B6D4'],
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-28">
      {/* Top Navigation */}
      <div className="pearl-card p-3 mb-4 flex items-center justify-between sticky top-16 z-30 bg-white/95 backdrop-blur shadow-sm">
        <button
          onClick={() => {
            soundEngine.playPop();
            onBack();
          }}
          className="pearl-pill text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer flex items-center gap-1"
        >
          <ChevronLeft size={14} /> Chapter
        </button>

        <div className="text-center px-2 truncate">
          <div className="text-xs font-black text-slate-800 truncate">
            {languagePref === 'en' ? lesson.titleEn : lesson.titleUr}
          </div>
          <div className="text-[10px] text-purple-700 font-semibold">
            Topic {lesson.lessonNumber} of {allLessonsInUnit.length || 1}
          </div>
        </div>

        <div className="pearl-pill text-xs font-bold bg-amber-50 text-amber-700 border-amber-200">
          <Sparkles size={12} className="text-amber-500" /> +25 XP
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="pearl-card p-6 mb-5 text-center" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5FF 100%)' }}>
        <span className="pearl-pill text-xs font-bold bg-purple-100 text-purple-900 border-purple-200 mb-2 inline-block">
          {lesson.kptbbChapterRef}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-snug">
          {lesson.titleEn}
        </h2>
        <div className="text-lg font-nastaliq font-bold text-purple-700 mb-2">
          {lesson.titleUr}
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Estimated Study Time: ~{lesson.durationMinutes} Minutes • Sequential Topic
        </p>

        <button
          onClick={() => {
            soundEngine.playPop();
            setShowEncyclopedia(!showEncyclopedia);
          }}
          className="pearl-pill text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border-sky-200 inline-flex items-center gap-1.5 cursor-pointer py-1.5 px-3.5 shadow-xs transition-colors"
        >
          <Globe size={13} className="text-sky-600" />
          <span>{showEncyclopedia ? 'Close Encyclopedia' : '📖 Read Topic in Scientific Encyclopedia'}</span>
        </button>
      </div>

      {/* Live Encyclopedia Slide-in */}
      {showEncyclopedia && (
        <div className="mb-5">
          <ExternalKnowledgeExplorer
            initialTopic={
              lesson.encyclopediaQuery ||
              lesson.titleEn.replace(/^\d+\.\d+\s*/, '').replace(/\(.*\)/, '').trim()
            }
            onClose={() => setShowEncyclopedia(false)}
          />
        </div>
      )}

      {/* Content Blocks Stack */}
      <BlockRenderer blocks={lesson.blocks} languagePref={languagePref} />

      {/* Terminal Action Card */}
      <div className="mt-8 p-6 pearl-card text-center" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)' }}>
        {isCompleted ? (
          <div>
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shadow-sm">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-lg font-black text-emerald-900 mb-1">
              Topic Completed! (سبق مکمل ہوا)
            </h3>
            <p className="text-xs text-emerald-700 mb-5">
              +25 Pearl XP added to your family vault!
            </p>

            {/* Next Topic Flow */}
            <div className="space-y-2">
              {nextLesson && onSelectLesson ? (
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    onSelectLesson(nextLesson);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="pearl-btn pearl-btn-lavender w-full py-3 px-5 text-sm font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Next Topic: {nextLesson.titleEn}</span>
                  <span>➔</span>
                </button>
              ) : onTakeQuiz ? (
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    onTakeQuiz();
                  }}
                  className="pearl-btn pearl-btn-lavender w-full py-3 px-5 text-sm font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} /> Take Chapter Mock Exam (کوئز دیں)
                </button>
              ) : null}

              <button
                onClick={onBack}
                className="pearl-btn pearl-btn-ghost w-full py-2.5 px-5 text-xs font-bold cursor-pointer"
              >
                Back to Chapter Overview
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-base font-extrabold text-slate-800 mb-1">
              Finished Reading & Exploring?
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Click below to mark this topic complete, earn XP, and continue.
            </p>
            <button
              onClick={handleCompleteLesson}
              className="pearl-btn pearl-btn-emerald py-3 px-8 text-sm font-black shadow-lg mx-auto flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} /> Mark Topic Complete (+25 Pearl XP)
            </button>
          </div>
        )}
      </div>

      {/* Sequential Topic Switcher Footer */}
      {allLessonsInUnit.length > 1 && (
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
          {prevLesson && onSelectLesson ? (
            <button
              onClick={() => {
                soundEngine.playPop();
                onSelectLesson(prevLesson);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-purple-700 hover:underline cursor-pointer"
            >
              ← Previous: {prevLesson.titleEn.slice(0, 25)}...
            </button>
          ) : (
            <span />
          )}

          {nextLesson && onSelectLesson && (
            <button
              onClick={() => {
                soundEngine.playPop();
                onSelectLesson(nextLesson);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-purple-700 hover:underline cursor-pointer"
            >
              Next: {nextLesson.titleEn.slice(0, 25)}... →
            </button>
          )}
        </div>
      )}
    </div>
  );
};
