import React, { useState, useEffect } from 'react';
import { Subject, LearnerProfile, Unit } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { VideoLectureService } from '../../services/videoLectureService';
import {
  GraduationCap,
  FileText,
  Clock,
  BookOpen,
  ArrowRight,
  Calculator,
  Target,
  Sparkles,
  Tv,
  ExternalLink,
  HelpCircle,
  X,
  CheckCircle2,
} from 'lucide-react';

interface AcademyDashboardProps {
  profile: LearnerProfile;
  subjects: Subject[];
  units: Unit[];
  languagePref: 'en' | 'ur';
  onSelectUnit: (unit: Unit) => void;
  onLaunchMockTest: () => void;
  onOpenTour?: () => void;
}

export const AcademyDashboard: React.FC<AcademyDashboardProps> = ({
  profile,
  subjects,
  units,
  languagePref,
  onSelectUnit,
  onLaunchMockTest,
  onOpenTour,
}) => {
  const [showGuide, setShowGuide] = useState<boolean>(true);

  // Auto-dismiss 10-second welcome popup
  useEffect(() => {
    if (!showGuide) return;
    const timer = setTimeout(() => {
      setShowGuide(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [showGuide]);

  // Filter subjects that belong to this class
  const classSubjects = subjects.filter((s) => s.classes.includes(profile.classId));
  const activeSubjectList = classSubjects.length > 0 ? classSubjects : subjects;

  // Active selected subject (Default to first subject, e.g. Biology or Physics)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(activeSubjectList[0]?.id || 'sub_bio');

  const selectedSubject = activeSubjectList.find((s) => s.id === selectedSubjectId) || activeSubjectList[0];

  // Filter real units for the selected subject and class
  const classSpecificUnits = units.filter(
    (u) => u.subjectId === selectedSubjectId && u.classId === profile.classId
  );

  // If units exist specifically for this class, display them; otherwise fallback to subject units
  const displayedUnits = classSpecificUnits.length > 0
    ? classSpecificUnits
    : units.filter((u) => u.subjectId === selectedSubjectId);

  return (
    <div className="space-y-5 pb-24 max-w-2xl mx-auto px-1 sm:px-0">
      {/* ── 1. Sleek 10-Second Welcome Popup Banner ── */}
      {showGuide && (
        <div className="bg-indigo-50/90 border border-indigo-200 rounded-xl p-3 px-4 shadow-xs flex items-center justify-between gap-3 text-xs text-indigo-950 animate-fadeIn transition-all">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
              i
            </span>
            <p className="text-[11px] sm:text-xs font-medium text-slate-700">
              Select your subject below to explore chapters, or use <strong>Ask AI Tutor</strong> for instant board solutions.
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onOpenTour && (
              <button
                onClick={() => {
                  soundEngine.playPop();
                  onOpenTour();
                }}
                className="px-2 py-0.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold transition cursor-pointer"
              >
                Tour
              </button>
            )}
            <button
              onClick={() => setShowGuide(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition cursor-pointer"
              title="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── 2. Board Exam Overview & Quick Action Hero ── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 max-w-full truncate">
            <GraduationCap size={14} className="text-indigo-600 shrink-0" />
            <span className="truncate">
              {profile.className.replace(/\(.*?\)/g, '').trim()} &bull; {profile.className.match(/\((.*?)\)/)?.[1] || 'Curriculum'}
            </span>
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            <Clock size={12} /> BISE Swat &amp; KPTBB Syllabus
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
            Board Examination Curriculum &amp; Solved Exercises
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Complete syllabus coverage with step-by-step solved numericals, 4-mark conceptual answers, video masterclasses, and board exam mock tests.
          </p>
        </div>

        {/* 2 Big, Clear Touch Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => {
              if (displayedUnits[0]) {
                soundEngine.playPop();
                onSelectUnit(displayedUnits[0]);
              }
            }}
            className="px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-2 shadow-xs transition cursor-pointer active:scale-[0.98]"
          >
            <Calculator size={16} /> <span>Solved Exercises</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              onLaunchMockTest();
            }}
            className="px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50/50 flex items-center justify-center gap-2 shadow-xs transition cursor-pointer active:scale-[0.98]"
          >
            <FileText size={16} className="text-indigo-600" /> <span>20-MCQ Board Quiz</span>
          </button>
        </div>
      </div>

      {/* ── 3. Prescribed Subjects (Thumb-Friendly Horizontal Scroll) ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={14} className="text-indigo-600" /> Prescribed Subjects
          </h3>
          <span className="text-xs font-semibold text-slate-400">
            {activeSubjectList.length} Subjects
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x -mx-1 px-1">
          {activeSubjectList.map((sub) => {
            const isSelected = sub.id === selectedSubjectId;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedSubjectId(sub.id);
                }}
                className={`shrink-0 px-4 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 snap-start ${isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-bold scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-semibold'
                  }`}
              >
                <span className="text-lg">{sub.icon}</span>
                <span className="text-xs sm:text-sm whitespace-nowrap">{sub.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. Subject Chapters (Spacious, Clear & Easy to Read) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{selectedSubject?.icon}</span>
              <span>{selectedSubject?.nameEn} Chapters</span>
            </h4>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {displayedUnits.length} {displayedUnits.length === 1 ? 'Chapter' : 'Chapters'}
          </span>
        </div>

        {displayedUnits.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 shadow-xs">
            <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">No chapters found for this subject yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedUnits
              .sort((a, b) => a.unitNumber - b.unitNumber)
              .map((unit) => {
                const topicCount = unit.lessons?.length || 1;
                const solvedCount = unit.solvedExercises?.length || 0;
                const pairingMarks = unit.pairingScheme?.totalBoardMarks || 17;

                // Resolve primary teacher and chapter playlist
                const teachers = VideoLectureService.getTeachers(profile.classId, unit.subjectId);
                const primaryTeacher = teachers[0];
                const videoInfo = VideoLectureService.getChapterVideoInfo({
                  classId: profile.classId,
                  subjectId: unit.subjectId,
                  subjectName: selectedSubject?.nameEn || 'Physics',
                  chapterNumber: unit.kptbbChapter || unit.unitNumber,
                  chapterTitle: unit.titleEn,
                  teacher: primaryTeacher,
                });

                return (
                  <div
                    key={unit.id}
                    onClick={() => {
                      soundEngine.playPop();
                      onSelectUnit(unit);
                    }}
                    className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group space-y-3 shadow-xs"
                  >
                    {/* Header Row: Chapter Number & Marks */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                          Chapter {unit.kptbbChapter}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          Unit {unit.unitNumber}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        ~{pairingMarks} Marks
                      </span>
                    </div>

                    {/* Chapter Title (Large, Legible Typography) */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {unit.titleEn}
                      </h3>
                      {unit.overviewEn && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {unit.overviewEn}
                        </p>
                      )}
                    </div>

                    {/* Quick Stats & Action Row */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 flex-wrap gap-2 text-xs">
                      {/* Topic & Exercise Badges */}
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <span>{topicCount} Topics</span>
                        <span>&bull;</span>
                        <span>{solvedCount} Solved</span>
                        {primaryTeacher && (
                          <>
                            <span>&bull;</span>
                            <span className="text-red-600 font-semibold flex items-center gap-1">
                              <Tv size={12} /> {primaryTeacher.name}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Primary Action Button */}
                      <div className="flex items-center gap-1 font-bold text-indigo-600 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all">
                        <span>Open Chapter</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
