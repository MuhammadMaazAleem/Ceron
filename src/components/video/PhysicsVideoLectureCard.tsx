import React, { useState, useEffect } from 'react';
import { Unit, Lesson } from '../../types';
import { VideoLectureService, TeacherProfile } from '../../services/videoLectureService';
import { soundEngine } from '../../services/soundEngine';
import {
  Play,
  Tv,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Flame,
  ListVideo,
} from 'lucide-react';

interface PhysicsVideoLectureCardProps {
  unit: Unit;
  selectedLesson?: Lesson;
  classId?: string;
  subjectName?: string;
  defaultOpenPlayer?: boolean;
}

export const PhysicsVideoLectureCard: React.FC<PhysicsVideoLectureCardProps> = ({
  unit,
  selectedLesson,
  classId = unit.classId || 'class_10',
  subjectName = 'Physics',
  defaultOpenPlayer = false,
}) => {
  const subjectDisplayName = VideoLectureService.getSubjectDisplayName(unit.subjectId, subjectName);

  // Available teachers for this specific subject and class
  const teachers = VideoLectureService.getTeachers(classId, unit.subjectId);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    teachers[0]?.id || 'teacher_dr_hadi'
  );
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(defaultOpenPlayer);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Auto-sync selected teacher if subject or class changes
  useEffect(() => {
    if (teachers[0] && !teachers.some((t) => t.id === selectedTeacherId)) {
      setSelectedTeacherId(teachers[0].id);
    }
  }, [unit.subjectId, classId, teachers, selectedTeacherId]);

  const currentTeacher = teachers.find((t) => t.id === selectedTeacherId) || teachers[0];

  const activeTopicTitle = selectedLesson?.titleEn || unit.lessons?.[0]?.titleEn || unit.titleEn;
  const activeTopicUrdu = selectedLesson?.titleUr || unit.lessons?.[0]?.titleUr;

  const videoInfo = VideoLectureService.getChapterVideoInfo({
    classId,
    subjectId: unit.subjectId,
    subjectName: subjectDisplayName,
    chapterNumber: unit.kptbbChapter || unit.unitNumber,
    chapterTitle: unit.titleEn,
    topicTitle: activeTopicTitle,
    teacher: currentTeacher,
  });

  const handleSelectTeacher = (teacher: TeacherProfile) => {
    soundEngine.playPop();
    setSelectedTeacherId(teacher.id);
  };

  const handleTogglePlayer = () => {
    soundEngine.playPop();
    setIsPlayerOpen(!isPlayerOpen);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6 transition-all hover:shadow-md">
      {/* ── Top Header Strip ────────────────────────────────────── */}
      <div
        className="p-4 text-white"
        style={{
          background: 'linear-gradient(135deg, #B91C1C 0%, #991B1B 45%, #1E1B4B 100%)',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold shadow-inner">
              <Tv size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  {subjectDisplayName} Video Masterclass
                </span>
                <span className="text-[10px] font-medium text-rose-100 flex items-center gap-1">
                  <Flame size={11} className="text-amber-300" /> Top Audience Educators
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5 leading-tight">
                {unit.titleEn}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer text-xs flex items-center gap-1 font-semibold"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <>
                  <span className="hidden sm:inline">Minimize</span> <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Expand</span> <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selected Topic Bar */}
        <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-rose-100">
            <BookOpen size={13} className="shrink-0 text-white" />
            <span className="font-semibold text-white">Current Topic:</span>
            <span className="truncate max-w-[280px] sm:max-w-md font-medium text-white/90">
              {activeTopicTitle.replace(/^\d+\.\d+\s*/, '')}
            </span>
          </div>

          {activeTopicUrdu && (
            <span className="text-[11px] font-urdu text-rose-100 hidden sm:inline" dir="rtl">
              {activeTopicUrdu}
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* ── Teacher Selection Pills ──────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Users size={14} className="text-indigo-600" />
                <span>Select Teacher for {classId.replace('class_', 'Class ')} {subjectDisplayName}:</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                Distinct high-audience educators per subject &amp; class
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {teachers.map((teacher) => {
                const isSelected = teacher.id === selectedTeacherId;
                return (
                  <button
                    key={teacher.id}
                    onClick={() => handleSelectTeacher(teacher)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-red-500 bg-red-50/70 shadow-xs ring-1 ring-red-400'
                        : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg">{teacher.avatarEmoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-xs font-bold truncate ${
                              isSelected ? 'text-red-950' : 'text-slate-900'
                            }`}
                          >
                            {teacher.name}
                          </span>
                          <CheckCircle2 size={12} className="text-red-600 shrink-0" />
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {teacher.channelName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-100">
                      <span className="font-semibold text-slate-700 flex items-center gap-0.5">
                        <Users size={10} className="text-slate-400" /> {teacher.subscribers}
                      </span>
                      <span
                        className={`font-semibold px-1.5 py-0.2 rounded text-[9px] ${
                          isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {teacher.views}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Active Teacher Bio & Focus Pill ──────────────────── */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-start gap-3 flex-wrap sm:flex-nowrap">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-xs shrink-0">
              {currentTeacher.avatarEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-extrabold text-slate-900">{currentTeacher.name}</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <Award size={10} /> {currentTeacher.ratingBadge}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  • {currentTeacher.language}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                <span className="font-semibold text-slate-800">Teacher's Specialty:</span>{' '}
                {currentTeacher.recommendationTag}
              </p>
              <div className="mt-1 text-[11px] text-indigo-700 font-medium flex items-center gap-1">
                <Sparkles size={11} /> {currentTeacher.boardSpecialty}
              </div>
            </div>
          </div>

          {/* ── Embedded Video Player (Watch in App) ──────────────── */}
          {isPlayerOpen ? (
            <div className="space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Play size={13} className="text-red-600 fill-red-600" />
                  Streaming Top Lecture for: {activeTopicTitle.replace(/^\d+\.\d+\s*/, '')}
                </span>
                <button
                  onClick={handleTogglePlayer}
                  className="text-slate-500 hover:text-slate-800 cursor-pointer font-medium hover:underline text-[11px]"
                >
                  Close Player
                </button>
              </div>

              {/* Responsive 16:9 Video Frame */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-300 shadow-inner">
                <iframe
                  src={videoInfo.embedUrl}
                  title={`${currentTeacher.name} - ${activeTopicTitle}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles size={13} className="text-amber-600 shrink-0" />
                  <span>If YouTube blocks embedded streaming, open directly with 1 click:</span>
                </span>
                <a
                  href={videoInfo.firstVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition"
                >
                  <Play size={10} className="fill-white" /> Watch Lecture 1 on YouTube (HD) <ExternalLink size={10} />
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>
                  Active Teacher: <strong className="text-slate-800">{currentTeacher.name}</strong> ({currentTeacher.channelName})
                </span>
                <a
                  href={videoInfo.firstVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  Watch Lecture 1 in YouTube App <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-600/30">
                  <Play size={20} className="fill-white translate-x-0.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Watch {subjectDisplayName} Lecture in App
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Stream lecture by {currentTeacher.name} without leaving your study dashboard
                  </p>
                </div>
              </div>

              <button
                onClick={handleTogglePlayer}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all shrink-0 hover:scale-[1.02]"
              >
                <Play size={14} className="fill-white" /> Start Watching Now
              </button>
            </div>
          )}

          {/* ── Direct Playlist & First Video YouTube Action Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* Action 1: First Video of Playlist (Lecture 1) */}
            <a
              href={videoInfo.firstVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-950 flex items-center justify-between gap-2 transition group shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Play size={14} className="fill-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">
                    Watch Lecture 1 (First Video)
                  </div>
                  <div className="text-[10px] text-red-700 truncate">
                    First video of Chapter {unit.kptbbChapter} playlist
                  </div>
                </div>
              </div>
              <ExternalLink size={14} className="text-red-700 group-hover:translate-x-0.5 transition shrink-0" />
            </a>

            {/* Action 2: Open Full Chapter Playlist on YouTube */}
            <a
              href={videoInfo.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-between gap-2 transition group shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ListVideo size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">
                    Open Full Chapter Playlist
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    All topics by {currentTeacher.name}
                  </div>
                </div>
              </div>
              <ExternalLink size={14} className="text-slate-600 group-hover:translate-x-0.5 transition shrink-0" />
            </a>

            {/* Action 3: Direct Topic Video Search */}
            <a
              href={videoInfo.topicVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-between gap-2 transition group shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Tv size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">
                    Watch Specific Topic
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {activeTopicTitle.replace(/^\d+\.\d+\s*/, '')}
                  </div>
                </div>
              </div>
              <ExternalLink size={14} className="text-slate-600 group-hover:translate-x-0.5 transition shrink-0" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
