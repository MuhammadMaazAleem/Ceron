import React, { useState } from 'react';
import { Unit, Lesson } from '../../types';
import { DigitalTextbookReader } from './DigitalTextbookReader';
import { PhysicsVideoLectureCard } from '../video/PhysicsVideoLectureCard';
import { soundEngine } from '../../services/soundEngine';
import {
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Clock,
  Compass,
} from 'lucide-react';

interface TopicRoadmapViewProps {
  unit: Unit;
  lessons: Lesson[];
  completedLessonIds: string[];
  onCompleteTopic: (lessonId: string) => void;
  languagePref: 'en' | 'ur';
}

export const TopicRoadmapView: React.FC<TopicRoadmapViewProps> = ({
  unit,
  lessons,
  completedLessonIds,
  onCompleteTopic,
  languagePref,
}) => {
  // Active topic selected in the roadmap
  const initialIndex = lessons.findIndex((l) => !completedLessonIds.includes(l.id));
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex >= 0 ? initialIndex : 0);

  const activeLesson = lessons[selectedIndex] || lessons[0];
  const completedCount = lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
  const isCurrentDone = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;

  const handleSelectTopic = (idx: number) => {
    soundEngine.playPop();
    setSelectedIndex(idx);
    const el = document.getElementById('digital-reader-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextTopic = () => {
    if (selectedIndex < lessons.length - 1) {
      handleSelectTopic(selectedIndex + 1);
    }
  };

  const handlePrevTopic = () => {
    if (selectedIndex > 0) {
      handleSelectTopic(selectedIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── 1. CHAPTER LEARNING ROADMAP ──────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              <Compass size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Chapter Syllabus Roadmap
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {completedCount} of {lessons.length} Topics Mastered • {progressPercent}% Complete
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            {lessons.length} Major Topics
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-slate-900 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Roadmap Steps Strip - Mature Adult Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {lessons.map((lesson, idx) => {
            const isDone = completedLessonIds.includes(lesson.id);
            const isSelected = selectedIndex === idx;
            const topicNumStr = String(idx + 1).padStart(2, '0');

            return (
              <button
                key={lesson.id}
                onClick={() => handleSelectTopic(idx)}
                className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 relative ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : isDone
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 hover:border-emerald-300 hover:bg-emerald-50'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                {/* Topic Index Number Badge */}
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-mono font-bold shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : isDone
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isDone ? <CheckCircle2 size={13} className="text-emerald-700" /> : topicNumStr}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isSelected ? 'text-indigo-200' : 'text-slate-500'
                      }`}
                    >
                      Section {unit.kptbbChapter}.{lesson.lessonNumber}
                    </span>
                    <span
                      className={`text-[10px] shrink-0 font-medium flex items-center gap-0.5 ${
                        isSelected ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      <Clock size={10} /> ~{lesson.durationMinutes}m
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold leading-snug line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {lesson.titleEn.replace(/^\d+\.\d+\s*/, '')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. YOUTUBE VIDEO MASTERCLASS CARD FOR SELECTED TOPIC ── */}
      <div id="video-card-anchor">
        <PhysicsVideoLectureCard
          unit={unit}
          selectedLesson={activeLesson}
          classId={unit.classId}
          subjectName={unit.subjectId.replace('sub_', '')}
          defaultOpenPlayer={false}
        />
      </div>

      {/* ── 3. DIGITAL TEXTBOOK READER CANVAS ─────────────────────── */}
      <div id="digital-reader-anchor">
        {activeLesson && (
          <DigitalTextbookReader
            lesson={activeLesson}
            unit={unit}
            subjectName={unit.subjectId.replace('sub_', '')}
            className="Class 9-12 (BISE Swat)"
            isCompleted={isCurrentDone}
            onComplete={() => onCompleteTopic(activeLesson.id)}
            languagePref={languagePref}
          />
        )}
      </div>

      {/* ── 3. BOTTOM PREVIOUS / NEXT NAVIGATION ─────────────────── */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrevTopic}
          disabled={selectedIndex === 0}
          className="px-4 py-2 text-xs font-semibold border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all shadow-xs"
        >
          <ChevronLeft size={14} /> Previous Topic
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Topic {selectedIndex + 1} of {lessons.length}
        </span>

        <button
          onClick={handleNextTopic}
          disabled={selectedIndex === lessons.length - 1}
          className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          Next Topic <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
