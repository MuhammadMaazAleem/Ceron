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
  ArrowRight,
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
    <div className="video-masterclass-card">
      {/* ── Top Header Strip ────────────────────────────────────── */}
      <div
        className="p-4 sm:p-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #881337 0%, #991B1B 45%, #0F172A 100%)',
          color: '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white font-bold shadow-inner border border-white/20">
              <Tv size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full border border-white/15">
                  {subjectDisplayName} Video Masterclass
                </span>
                <span className="text-[10px] font-medium text-rose-100 flex items-center gap-1">
                  <Flame size={12} className="text-amber-300" /> Top Audience Educators
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white mt-1 leading-tight">
                {unit.titleEn}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer text-xs flex items-center gap-1.5 font-bold border border-white/15"
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
        <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-rose-100">
            <BookOpen size={13} className="shrink-0 text-amber-300" />
            <span className="font-bold text-white">Current Topic:</span>
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
          {/* ── Teacher Selection Cards ──────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Users size={14} className="text-rose-600" />
                <span>Select Teacher for {classId.replace('class_', 'Class ')} {subjectDisplayName}:</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                Distinct high-audience educators per subject &amp; class
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {teachers.map((teacher) => {
                const isSelected = teacher.id === selectedTeacherId;
                return (
                  <button
                    key={teacher.id}
                    onClick={() => handleSelectTeacher(teacher)}
                    className={`teacher-selector-card ${isSelected ? 'is-active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-xl p-1 bg-slate-50 rounded-lg border border-slate-100">
                        {teacher.avatarEmoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-xs font-bold truncate ${
                              isSelected ? 'text-rose-950 font-extrabold' : 'text-slate-900'
                            }`}
                          >
                            {teacher.name}
                          </span>
                          {isSelected ? (
                            <CheckCircle2 size={13} className="text-rose-600 shrink-0" />
                          ) : (
                            <CheckCircle2 size={13} className="text-slate-300 shrink-0" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">
                          {teacher.channelName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-100">
                      <span className="font-semibold text-slate-600 flex items-center gap-1">
                        <Users size={11} className="text-slate-400" /> {teacher.subscribers}
                      </span>
                      <span className={`teacher-views-badge ${isSelected ? 'is-active' : 'is-inactive'}`}>
                        {teacher.views}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Active Teacher Bio & Focus Pill ──────────────────── */}
          <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl p-3.5 border border-slate-200/90 flex items-start gap-3.5 flex-wrap sm:flex-nowrap shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-xs shrink-0">
              {currentTeacher.avatarEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-extrabold text-slate-900">{currentTeacher.name}</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                  <Award size={10} /> {currentTeacher.ratingBadge}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  &bull; {currentTeacher.language}
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
                  <Play size={13} className="text-rose-600 fill-rose-600" />
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

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles size={13} className="text-amber-600 shrink-0" />
                  <span>If YouTube blocks embedded streaming, open directly with 1 click:</span>
                </span>
                <a
                  href={videoInfo.firstVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition"
                >
                  <Play size={11} className="fill-white" /> Watch Lecture 1 on YouTube (HD) <ArrowRight size={12} />
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
                  className="text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  Watch Lecture 1 in YouTube App <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ) : (
            <div className="stream-banner-box flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-600/30">
                  <Play size={18} className="fill-white translate-x-0.5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    Watch {subjectDisplayName} Lecture in App
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Stream lecture by {currentTeacher.name} without leaving your study dashboard
                  </p>
                </div>
              </div>

              <button
                onClick={handleTogglePlayer}
                className="btn-start-stream w-full sm:w-auto"
              >
                <Play size={14} className="fill-white" />
                <span>Start Watching Now</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* ── Direct Playlist & First Video YouTube Action Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Action 1: First Video of Playlist (Lecture 1) */}
            <a
              href={videoInfo.firstVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-action-card-link card-ruby group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="action-icon-pill"
                  style={{
                    background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(225, 29, 72, 0.25)',
                  }}
                >
                  <Play size={16} className="fill-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-rose-700 transition truncate">
                    Watch Lecture 1 (First Video)
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    First video of Chapter {unit.kptbbChapter} playlist
                  </div>
                </div>
              </div>
              <div className="action-arrow-indicator" title="Watch on YouTube">
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Action 2: Open Full Chapter Playlist on YouTube */}
            <a
              href={videoInfo.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-action-card-link card-indigo group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="action-icon-pill"
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)',
                  }}
                >
                  <ListVideo size={17} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition truncate">
                    Open Full Chapter Playlist
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    All topics by {currentTeacher.name}
                  </div>
                </div>
              </div>
              <div className="action-arrow-indicator" title="Open YouTube Playlist">
                <ArrowRight size={14} />
              </div>
            </a>

            {/* Action 3: Direct Topic Video Search */}
            <a
              href={videoInfo.topicVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-action-card-link card-sky group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="action-icon-pill"
                  style={{
                    background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
                  }}
                >
                  <Tv size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition truncate">
                    Watch Specific Topic
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    {activeTopicTitle.replace(/^\d+\.\d+\s*/, '')}
                  </div>
                </div>
              </div>
              <div className="action-arrow-indicator" title="Search Topic Video">
                <ArrowRight size={14} />
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
