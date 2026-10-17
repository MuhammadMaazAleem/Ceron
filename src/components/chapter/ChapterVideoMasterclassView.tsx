import React, { useState } from 'react';
import { Unit, Lesson } from '../../types';
import { VideoLectureService, TeacherProfile } from '../../services/videoLectureService';
import { PhysicsVideoLectureCard } from '../video/PhysicsVideoLectureCard';
import { soundEngine } from '../../services/soundEngine';
import {
  Tv,
  Users,
  Play,
  ExternalLink,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
} from 'lucide-react';

interface ChapterVideoMasterclassViewProps {
  unit: Unit;
  lessons: Lesson[];
  classId?: string;
  subjectName?: string;
  languagePref: 'en' | 'ur';
}

export const ChapterVideoMasterclassView: React.FC<ChapterVideoMasterclassViewProps> = ({
  unit,
  lessons,
  classId = unit.classId || 'class_10',
  subjectName = 'Physics',
}) => {
  const subjectDisplayName = VideoLectureService.getSubjectDisplayName(unit.subjectId, subjectName);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const activeLesson = lessons[selectedLessonIndex] || lessons[0];

  const teachers = VideoLectureService.getTeachers(classId, unit.subjectId);

  const handleSelectLesson = (idx: number) => {
    soundEngine.playPop();
    setSelectedLessonIndex(idx);
    const el = document.getElementById('video-card-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* ── TOP HERO BANNER ──────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 sm:p-6 text-white shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #B91C1C 0%, #991B1B 45%, #1E1B4B 100%)',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white flex items-center gap-1">
            <Tv size={12} /> YouTube Video Masterclass
          </span>
          <span className="text-xs text-rose-200 font-medium">
            Class {classId.replace('class_', '')} &bull; Chapter {unit.kptbbChapter}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
          {unit.titleEn}
        </h2>

        <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed max-w-2xl font-normal">
          Watch comprehensive video lectures from Pakistan's most-watched {subjectDisplayName} educators. Each class features curated top teachers with complete chapter playlists, step-by-step conceptual walkthroughs, and solved past-paper questions.
        </p>

        <div className="mt-4 pt-4 border-t border-white/15 flex items-center gap-4 flex-wrap text-xs text-white/90">
          <span className="flex items-center gap-1.5 font-semibold">
            <Users size={14} className="text-amber-300" /> {teachers.length} Top Curated Teachers
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <BookOpen size={14} className="text-emerald-300" /> {lessons.length} Sequential Topic Lectures
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Flame size={14} className="text-orange-300" /> In-App &amp; Direct YouTube Playlists
          </span>
        </div>
      </div>

      {/* ── TOPIC SELECTOR STRIP ──────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-red-600" />
            <h3 className="text-xs font-bold text-slate-900">
              Select Chapter Topic to Watch:
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {selectedLessonIndex + 1} of {lessons.length} Topics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {lessons.map((lesson, idx) => {
            const isSelected = selectedLessonIndex === idx;
            return (
              <button
                key={lesson.id}
                onClick={() => handleSelectLesson(idx)}
                style={
                  isSelected
                    ? { backgroundColor: '#DC2626', color: '#FFFFFF', borderColor: '#B91C1C' }
                    : { backgroundColor: '#FFFFFF', color: '#0F172A', borderColor: '#E2E8F0' }
                }
                className="p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 shadow-2xs"
              >
                <div className="min-w-0 flex items-center gap-2">
                  <div
                    style={
                      isSelected
                        ? { backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF' }
                        : { backgroundColor: '#F1F5F9', color: '#334155' }
                    }
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0"
                  >
                    {idx + 1}
                  </div>
                  <span
                    style={{ color: isSelected ? '#FFFFFF' : '#0F172A' }}
                    className="text-xs font-bold truncate"
                  >
                    {lesson.titleEn.replace(/^\d+\.\d+\s*/, '')}
                  </span>
                </div>
                <Play
                  size={12}
                  style={{ color: isSelected ? '#FFFFFF' : '#94A3B8' }}
                  className={`shrink-0 ${isSelected ? 'fill-white' : ''}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FEATURED VIDEO LECTURE CARD (ANCHOR) ─────────────────── */}
      <div id="video-card-anchor">
        <PhysicsVideoLectureCard
          unit={unit}
          selectedLesson={activeLesson}
          classId={classId}
          subjectName={subjectName}
          defaultOpenPlayer={true}
        />
      </div>

      {/* ── TEACHER ROSTER & RECOMMENDATION GUIDE ────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Award size={18} className="text-amber-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Teacher Guide for {classId.replace('class_', 'Class ')} {subjectDisplayName}
            </h3>
            <p className="text-xs text-slate-500">
              Choose the teacher matching your exam goals &amp; learning style
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-xs">
                    {teacher.avatarEmoji}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      {teacher.name}
                      <CheckCircle2 size={12} className="text-red-600 shrink-0" />
                    </h4>
                    <p className="text-[10px] text-slate-500 truncate">{teacher.channelName}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <div className="font-semibold text-slate-800 text-[10px] uppercase tracking-wider bg-slate-200/70 px-2 py-0.5 rounded-md inline-block">
                    {teacher.ratingBadge}
                  </div>
                  <p className="leading-snug">{teacher.teachingStyle}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-indigo-700">{teacher.subscribers}</span>
                <a
                  href={teacher.youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  Visit Channel <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
