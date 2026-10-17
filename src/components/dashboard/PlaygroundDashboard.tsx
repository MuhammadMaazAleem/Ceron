import React, { useState } from 'react';
import { Subject, LearnerProfile, Unit } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { Sparkles, Play, Volume2, ArrowRight } from 'lucide-react';

interface PlaygroundDashboardProps {
  profile: LearnerProfile;
  subjects: Subject[];
  units: Unit[];
  languagePref: 'en' | 'ur';
  onSelectUnit: (unit: Unit) => void;
}

export const PlaygroundDashboard: React.FC<PlaygroundDashboardProps> = ({
  profile,
  subjects,
  units,
  languagePref,
  onSelectUnit,
}) => {
  const [selectedSubId, setSelectedSubId] = useState<string>(subjects[0]?.id || 'sub_math');
  const selectedSubject = subjects.find((s) => s.id === selectedSubId) || subjects[0];

  const subjectUnits = units.filter(
    (u) => u.subjectId === selectedSubId && (u.classId === profile.classId || profile.ageBand === 'kg-3')
  );

  const displayedUnits = subjectUnits.length > 0 ? subjectUnits : units;
  const activeUnit = displayedUnits[0] || units[0];

  return (
    <div className="space-y-6 pb-20 max-w-lg mx-auto">
      {/* Friendly Mascot Banner */}
      <div
        className="pearl-card p-6 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 50%, #EFF6FF 100%)',
          borderRadius: '32px',
        }}
      >
        <div className="w-16 h-16 mx-auto mb-2 text-5xl animate-bounce">
          🦪
        </div>
        <h2 className="text-xl font-extrabold text-slate-800">
          Hello, {profile.name}! ⭐
        </h2>
        <p className="text-xs font-nastaliq text-purple-700 font-bold mb-3">
          آؤ مل کر چمکتے موتیوں سے سیکھیں!
        </p>

        <button
          onClick={() => soundEngine.playPop()}
          className="pearl-pill text-xs font-bold text-amber-800 bg-white/90 border-amber-200 shadow-sm mx-auto flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all"
        >
          <Volume2 size={14} className="text-amber-600" /> Tap a bubble to learn!
        </button>
      </div>

      {/* Featured Primary Adventure Card */}
      {activeUnit && (
        <div
          onClick={() => {
            soundEngine.playPop();
            onSelectUnit(activeUnit);
          }}
          className="pearl-card p-5 cursor-pointer transform active:scale-98 hover:shadow-xl transition-all"
          style={{
            background: 'linear-gradient(135deg, #ECFEFF 0%, #FFFFFF 100%)',
            border: '2px solid #06B6D4',
            borderRadius: '28px',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="pearl-pill text-xs font-bold bg-white text-cyan-700">
              <Sparkles size={13} /> Selected: {selectedSubject?.nameEn}
            </span>
            <span className="text-2xl">{selectedSubject?.icon}</span>
          </div>

          <h3 className="text-lg font-black text-slate-800 mb-1">
            {languagePref === 'en' ? activeUnit.titleEn : activeUnit.titleUr}
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            Interactive visual lessons, counting games, and phonics sounds.
          </p>

          <button className="pearl-btn pearl-btn-seafoam w-full text-xs font-bold py-2.5 flex items-center justify-center gap-1.5 shadow-md">
            <Play size={14} /> Start Playing (شروع کریں)
          </button>
        </div>
      )}

      {/* Giant Toybox Bubbles for Subjects */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-700 mb-3 px-1 flex items-center gap-1.5">
          <span>🎨</span> Tap a Subject Bubble (مضمون منتخب کریں)
        </h3>

        <div className="grid grid-cols-2 gap-3.5">
          {subjects.map((sub) => {
            const isSelected = sub.id === selectedSubId;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedSubId(sub.id);
                }}
                className={`p-4 rounded-3xl border text-center transition-all duration-300 transform active:scale-95 hover:shadow-lg cursor-pointer bg-white ${
                  isSelected ? 'border-purple-500 ring-2 ring-purple-300' : ''
                }`}
                style={{
                  boxShadow: `0 8px 20px ${sub.glowColor}, inset 0 2px 4px #FFFFFF`,
                }}
              >
                <div
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-2 shadow-inner"
                  style={{ background: `${sub.color}15` }}
                >
                  {sub.icon}
                </div>
                <div className="font-extrabold text-sm text-slate-800 leading-tight">
                  {sub.nameEn}
                </div>
                <div className="font-nastaliq text-xs text-slate-500 font-bold mt-1">
                  {sub.nameUr}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
