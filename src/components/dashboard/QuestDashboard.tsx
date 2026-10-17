import React, { useState } from 'react';
import { Subject, LearnerProfile, Unit } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { VideoLectureService } from '../../services/videoLectureService';
import { Compass, Play, Zap, BookOpen, ArrowRight, Tv, ExternalLink } from 'lucide-react';

interface QuestDashboardProps {
  profile: LearnerProfile;
  subjects: Subject[];
  units: Unit[];
  languagePref: 'en' | 'ur';
  onSelectUnit: (unit: Unit) => void;
}

export const QuestDashboard: React.FC<QuestDashboardProps> = ({
  profile,
  subjects,
  units,
  languagePref,
  onSelectUnit,
}) => {
  const classSubjects = subjects.filter((s) => s.classes.includes(profile.classId));
  const activeSubjectList = classSubjects.length > 0 ? classSubjects : subjects;

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(activeSubjectList[0]?.id || 'sub_sci');
  const selectedSubject = activeSubjectList.find((s) => s.id === selectedSubjectId) || activeSubjectList[0];

  const subjectUnits = units.filter(
    (u) => u.subjectId === selectedSubjectId && (u.classId === profile.classId || profile.ageBand === '4-8')
  );

  const displayedUnits = subjectUnits.length > 0 ? subjectUnits : units.filter((u) => u.subjectId === selectedSubjectId);
  const activeUnit = displayedUnits[0] || units[0];

  return (
    <div className="space-y-6 pb-20 max-w-xl mx-auto">
      {/* Middle School Quest Hero Card */}
      {activeUnit && (
        <div
          className="pearl-card p-6"
          style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 60%, #FAF5FF 100%)',
            border: '1.5px solid #10B981',
            borderRadius: '24px',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="pearl-pill text-xs font-bold bg-emerald-100 text-emerald-800 border-emerald-200">
              <Compass size={13} className="text-emerald-600" /> Current Chapter Quest
            </span>
            <span className="text-xs font-semibold text-slate-500">{profile.className}</span>
          </div>

          <h2 className="text-lg font-black text-slate-900 mb-1 leading-snug">
            {languagePref === 'en' ? activeUnit.titleEn : activeUnit.titleUr}
          </h2>
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            {activeUnit.lessons[0]?.kptbbChapterRef || 'Prescribed textbook chapter with interactive models and checks.'}
          </p>

          <button
            onClick={() => {
              soundEngine.playPop();
              onSelectUnit(activeUnit);
            }}
            className="pearl-btn pearl-btn-emerald w-full text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md"
          >
            <Play size={14} /> Open Chapter Lesson (سبق پڑھیں)
          </button>
        </div>
      )}

      {/* Middle School Subject Filter Tabs */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-800 mb-2.5 px-1 flex items-center gap-1.5">
          <BookOpen size={16} className="text-emerald-600" /> Subjects (مضامین کا انتخاب کریں)
        </h3>

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
                className={`shrink-0 px-3.5 py-2 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-base">{sub.icon}</span>
                <span className="text-xs font-bold">{sub.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapters List for Selected Subject */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h4 className="text-sm font-bold text-slate-800">
            {selectedSubject?.nameEn} Chapters ({displayedUnits.length})
          </h4>
          <span className="text-xs font-nastaliq text-emerald-700 font-bold">
            {selectedSubject?.nameUr}
          </span>
        </div>

        <div className="space-y-3">
          {displayedUnits.map((u) => {
            const teachers = VideoLectureService.getTeachers(profile.classId, u.subjectId);
            const primaryTeacher = teachers[0];
            const videoInfo = VideoLectureService.getChapterVideoInfo({
              classId: profile.classId,
              subjectId: u.subjectId,
              subjectName: selectedSubject?.nameEn || 'Physics',
              chapterNumber: u.kptbbChapter || u.unitNumber,
              chapterTitle: u.titleEn,
              teacher: primaryTeacher,
            });

            return (
              <div
                key={u.id}
                onClick={() => {
                  soundEngine.playPop();
                  onSelectUnit(u);
                }}
                className="pearl-card p-4 cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all bg-white space-y-2"
              >
                <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Chapter {u.kptbbChapter}
                  </span>
                  {primaryTeacher && (
                    <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                      <Tv size={10} className="text-red-600" />
                      <span>{primaryTeacher.name}</span>
                    </span>
                  )}
                </div>
                <h5 className="font-extrabold text-slate-900 text-sm mb-1 line-clamp-2">
                  {languagePref === 'en' ? u.titleEn : u.titleUr}
                </h5>

                {/* Direct YouTube Playlist and Start Lesson buttons */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 flex-wrap gap-1.5">
                  <a
                    href={videoInfo.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playPop();
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-2xs"
                    title={`Watch Chapter ${u.kptbbChapter} on YouTube`}
                  >
                    <Tv size={11} className="text-white" />
                    <span>Watch Playlist</span>
                    <ExternalLink size={9} />
                  </a>

                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span>Start Lesson</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
