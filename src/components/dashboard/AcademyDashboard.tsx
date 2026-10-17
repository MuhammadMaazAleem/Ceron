import React, { useState } from 'react';
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
} from 'lucide-react';

interface AcademyDashboardProps {
  profile: LearnerProfile;
  subjects: Subject[];
  units: Unit[];
  languagePref: 'en' | 'ur';
  onSelectUnit: (unit: Unit) => void;
  onLaunchMockTest: () => void;
}

export const AcademyDashboard: React.FC<AcademyDashboardProps> = ({
  profile,
  subjects,
  units,
  languagePref,
  onSelectUnit,
  onLaunchMockTest,
}) => {
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
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      {/* Board Exam Countdown & Readiness Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5">
            <GraduationCap size={14} className="text-indigo-600" /> {profile.className}
          </span>
          <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1">
            <Clock size={12} /> BISE Swat Past Papers (2021&ndash;2024)
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-snug tracking-tight">
            Board Examination Curriculum &amp; Solved Exercises
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Official KPTBB curriculum coverage for students. Includes in-depth <strong>topic roadmaps</strong>, <strong>solved numericals</strong> with standard SI units, <strong>4-mark conceptual answers</strong> with marking rubrics, and <strong>timed mock exams</strong> (33% passing benchmark).
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => {
              if (displayedUnits[0]) {
                soundEngine.playPop();
                onSelectUnit(displayedUnits[0]);
              }
            }}
            className="px-4 py-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Calculator size={15} /> Solved Exercises
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              onLaunchMockTest();
            }}
            className="px-4 py-3 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FileText size={15} className="text-slate-600" /> Mock Test (33% Pass)
          </button>
        </div>
      </div>

      {/* Board Study Toolkit Bar */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 text-center shadow-xs">
          <div className="text-indigo-600 mx-auto mb-1 flex justify-center">
            <Calculator size={18} />
          </div>
          <div className="text-xs font-bold text-slate-900">Solved Numericals</div>
          <div className="text-[10px] text-slate-500 font-medium">Step-by-Step with SI Units</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-2xs">
          <div className="text-emerald-600 mx-auto mb-1 flex justify-center">
            <Target size={16} />
          </div>
          <div className="text-xs font-bold text-slate-900">Pairing Scheme</div>
          <div className="text-[10px] text-slate-500 font-medium">Exam Question Distribution</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-2xs">
          <div className="text-amber-600 mx-auto mb-1 flex justify-center">
            <Sparkles size={16} />
          </div>
          <div className="text-xs font-bold text-slate-900">Ceron AI Tutor</div>
          <div className="text-[10px] text-slate-500 font-medium">Model 4-Mark Answers</div>
        </div>
      </div>

      {/* Subject Navigation Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={14} className="text-slate-500" /> Prescribed Subjects
          </h3>
          <span className="text-xs font-medium text-slate-400">
            {activeSubjectList.length} Subjects
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {activeSubjectList.map((sub) => {
            const isSelected = sub.id === selectedSubjectId;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedSubjectId(sub.id);
                }}
                className={`shrink-0 px-3.5 py-2 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">{sub.icon}</span>
                <div>
                  <div className="text-xs font-semibold leading-tight">{sub.nameEn}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject's Real Chapters in Sequence */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>{selectedSubject?.icon}</span>
              <span>{selectedSubject?.nameEn} Chapters</span>
            </h4>
            <div className="text-xs font-semibold text-slate-500">
              KPTBB Curriculum &amp; BISE Swat Solved Board Exercises
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {displayedUnits.length} {displayedUnits.length === 1 ? 'Chapter' : 'Chapters'}
          </span>
        </div>

        {displayedUnits.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400 shadow-xs">
            <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">No units found for this subject yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
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
                    className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group space-y-3.5 shadow-xs"
                  >
                    {/* Top Meta Badges */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                          Unit {unit.unitNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          Chapter {unit.kptbbChapter}
                        </span>
                        {primaryTeacher && (
                          <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 flex items-center gap-1">
                            <Tv size={11} className="text-red-600" />
                            <span>{primaryTeacher.name}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {solvedCount > 0 && (
                          <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                            <Calculator size={12} className="text-slate-600" /> {solvedCount} Solved
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                          ~{pairingMarks} Board Marks
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                          {topicCount} Topics
                        </span>
                      </div>
                    </div>

                    {/* Chapter Title */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug tracking-tight">
                      {unit.titleEn}
                    </h3>

                    {/* Chapter Description */}
                    {unit.overviewEn && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {unit.overviewEn}
                      </p>
                    )}

                    {/* Bottom Action Footer with Direct YouTube Redirect Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-2 text-xs sm:text-sm">
                      <a
                        href={videoInfo.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEngine.playPop();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-xs cursor-pointer hover:scale-[1.02]"
                        title={`Watch Chapter ${unit.kptbbChapter} YouTube Playlist by ${primaryTeacher?.name}`}
                      >
                        <Tv size={13} className="text-white" />
                        <span>Watch YouTube Playlist &bull; {primaryTeacher?.name}</span>
                        <ExternalLink size={11} className="text-white/80" />
                      </a>

                      <div className="flex items-center gap-1.5 font-semibold text-indigo-600 group-hover:text-indigo-700">
                        <span>Open Topic Roadmap</span>
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
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
