import React from 'react';
import { LearnerProfile } from '../../types';
import { ALL_CLASSES } from '../../data/curriculumData';
import { soundEngine } from '../../services/soundEngine';
import { Volume2, VolumeX, Moon, Sun, Flame, Sparkles, BookOpen, Heart } from 'lucide-react';

interface HeaderProps {
  activeProfile: LearnerProfile;
  languagePref: 'en' | 'ur';
  isDarkMode: boolean;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onOpenDedication?: () => void;
  onSelectClass: (classId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeProfile,
  languagePref,
  isDarkMode,
  onToggleLanguage,
  onToggleTheme,
  onOpenDedication,
  onSelectClass,
}) => {
  const [isMuted, setIsMuted] = React.useState(soundEngine.isMuted());

  const handleToggleSound = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 transition-all shadow-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
            <BookOpen size={16} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base leading-none tracking-tight">
              Ceron Academic
            </h1>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide block mt-0.5">
              BISE Swat &bull; Classes 9th &ndash; 12th
            </span>
          </div>
        </div>

        {/* Center: Grade/Class Selector & Dedication Ribbon */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Class Selector Dropdown */}
          <div className="relative flex items-center">
            <select
              value={activeProfile.classId}
              onChange={(e) => {
                soundEngine.playPop();
                onSelectClass(e.target.value);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-900 border border-slate-200 cursor-pointer hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
              title="Select Class (9th to 12th)"
            >
              {ALL_CLASSES.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* ── DEDICATION NAV BAR ITEM (HD TIMES NEW ROMAN & LUXURY GOLD) ── */}
          {onOpenDedication && (
            <button
              id="dedication-nav-btn"
              onClick={() => {
                soundEngine.playPop();
                onOpenDedication();
              }}
              className="group relative px-3 py-1.5 rounded-xl text-amber-100 flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.03] active:scale-[0.98] border border-amber-400/80"
              style={{
                background: 'linear-gradient(135deg, #78350F 0%, #92400E 40%, #B45309 75%, #D97706 100%)',
                boxShadow: '0 2px 12px rgba(180, 83, 9, 0.35)',
              }}
              title="Dedicated to Baba Jan & Mor Jan • Click to view dedication and recite Duas"
            >
              <span className="w-5 h-5 rounded-full bg-amber-400/30 flex items-center justify-center shrink-0">
                <Heart size={12} className="fill-amber-300 text-amber-200 animate-pulse" />
              </span>
              <span
                style={{
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                  letterSpacing: '0.015em',
                }}
                className="text-xs sm:text-sm font-bold text-amber-50 drop-shadow-xs whitespace-nowrap"
              >
                Dedicated to Baba Jan &amp; Mor Jan
              </span>
            </button>
          )}
        </div>

        {/* Right: Gamification & Essential Controls (No Profiles & No Admin Settings) */}
        <div className="flex items-center gap-1.5">
          {/* Streak */}
          <div className="text-xs font-semibold px-2 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
            <Flame size={12} className="text-amber-600 fill-amber-500" />
            <span>{activeProfile.streakDays}d streak</span>
          </div>

          {/* XP */}
          <div className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200 hidden sm:flex items-center gap-1">
            <Sparkles size={11} className="text-indigo-600" />
            <span>{activeProfile.xp} XP</span>
          </div>

          {/* Bilingual Toggle (EN | اردو) */}
          <button
            onClick={() => {
              soundEngine.playPop();
              onToggleLanguage();
            }}
            className="pearl-pill text-xs font-bold bg-white text-slate-700 hover:bg-slate-50 cursor-pointer px-2 py-1"
            title="Toggle Urdu / English script"
          >
            {languagePref === 'en' ? 'اردو' : 'EN'}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleSound}
            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX size={13} className="text-rose-500" /> : <Volume2 size={13} className="text-emerald-600" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              soundEngine.playPop();
              onToggleTheme();
            }}
            className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 cursor-pointer hidden md:flex"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={13} className="text-amber-500" /> : <Moon size={13} className="text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
