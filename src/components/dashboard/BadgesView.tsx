import React from 'react';
import { LearnerProfile } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import confetti from 'canvas-confetti';
import { Award, Flame, Sparkles, CheckCircle, Shield } from 'lucide-react';

interface BadgesViewProps {
  profile: LearnerProfile;
}

export const BadgesView: React.FC<BadgesViewProps> = ({ profile }) => {
  const allBadges = [
    { id: 'b1', name: 'Seed Pearl (ابتدائی موتی)', desc: 'Started your learning journey', icon: '⚪', tier: 'Freshwater', unlocked: true },
    { id: 'b2', name: 'Akoya Pearl (آکویا موتی)', desc: 'Maintained a 3-day active streak', icon: '🦪', tier: 'Akoya', unlocked: profile.streakDays >= 3 },
    { id: 'b3', name: 'South Sea Gold (شاہی سنہرا موتی)', desc: 'Passed a BISE Mock Examination with 80%+', icon: '🟡', tier: 'South Sea', unlocked: profile.xp >= 500 },
    { id: 'b4', name: 'Tahitian Black Pearl (نایاب کالا موتی)', desc: 'Completed 10 full syllabus units', icon: '🔮', tier: 'Tahitian', unlocked: profile.completedLessons.length >= 5 },
    { id: 'b5', name: 'Durr-e-Yateem (درّ یتیم)', desc: 'Exemplary family scholar milestone', icon: '👑', tier: 'Imperial', unlocked: profile.xp >= 1500 },
  ];

  const handleCelebrate = () => {
    soundEngine.playCorrect();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24">
      {/* Vault Header */}
      <div className="pearl-card p-6 text-center" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FAF5FF 100%)' }}>
        <div className="w-16 h-16 mx-auto mb-2 text-4xl cursor-pointer transform hover:scale-110 transition-all" onClick={handleCelebrate}>
          🦪
        </div>
        <h2 className="text-xl font-black text-slate-800">
          The Pearl Vault (موتیوں کا خزانہ)
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Milestones earned by {profile.name} through dedicated daily study
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="bg-white/80 p-3 rounded-2xl border border-amber-200 shadow-sm">
            <div className="flex items-center justify-center gap-1 text-amber-600 font-extrabold text-xs mb-0.5">
              <Flame size={14} className="fill-amber-400" /> Active Streak
            </div>
            <div className="text-xl font-black text-slate-800">{profile.streakDays} Days</div>
          </div>
          <div className="bg-white/80 p-3 rounded-2xl border border-purple-200 shadow-sm">
            <div className="flex items-center justify-center gap-1 text-purple-600 font-extrabold text-xs mb-0.5">
              <Sparkles size={14} /> Total XP
            </div>
            <div className="text-xl font-black text-purple-700">{profile.xp} XP</div>
          </div>
        </div>
      </div>

      {/* Badges List */}
      <div>
        <h3 className="text-sm font-extrabold text-slate-800 mb-3 px-1 flex items-center gap-1.5">
          <Award size={16} className="text-amber-500" /> Unlocked Pearl Tiers
        </h3>

        <div className="space-y-3">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className={`pearl-card p-4 flex items-center justify-between transition-all ${
                badge.unlocked ? 'border-amber-200 bg-white' : 'opacity-60 bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center shadow-inner ${
                    badge.unlocked ? 'bg-amber-100' : 'bg-slate-200 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>
                <div>
                  <div className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                    {badge.name}
                    {badge.unlocked && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Unlocked
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">{badge.desc}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-purple-600">{badge.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
