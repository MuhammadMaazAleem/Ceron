import React from 'react';
import { AgeBand } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import { BookOpen, Zap, Award, FileText, BarChart2 } from 'lucide-react';

interface BottomBarProps {
  ageBand: AgeBand;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  ageBand,
  activeTab,
  onTabChange,
}) => {
  const handleTab = (id: string) => {
    soundEngine.playPop();
    onTabChange(id);
  };

  if (ageBand === 'kg-3') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => handleTab('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl cursor-pointer transition-all ${
              activeTab === 'home' ? 'text-amber-600 scale-105 font-bold' : 'text-slate-400'
            }`}
          >
            <span className="text-2xl">🏠</span>
            <span className="text-[11px] font-extrabold">Play (کھیلیں)</span>
          </button>

          <button
            onClick={() => handleTab('badges')}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl cursor-pointer transition-all ${
              activeTab === 'badges' ? 'text-purple-600 scale-105 font-bold' : 'text-slate-400'
            }`}
          >
            <span className="text-2xl">⭐</span>
            <span className="text-[11px] font-extrabold">Treasures (انعامات)</span>
          </button>
        </div>
      </nav>
    );
  }

  if (ageBand === '4-8') {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => handleTab('home')}
            className={`flex flex-col items-center gap-0.5 p-1.5 cursor-pointer ${
              activeTab === 'home' ? 'text-emerald-600 font-bold' : 'text-slate-400'
            }`}
          >
            <BookOpen size={18} />
            <span className="text-[10px]">Quests</span>
          </button>

          <button
            onClick={() => handleTab('practice')}
            className={`flex flex-col items-center gap-0.5 p-1.5 cursor-pointer ${
              activeTab === 'practice' ? 'text-amber-600 font-bold' : 'text-slate-400'
            }`}
          >
            <Zap size={18} />
            <span className="text-[10px]">Practice</span>
          </button>

          <button
            onClick={() => handleTab('badges')}
            className={`flex flex-col items-center gap-0.5 p-1.5 cursor-pointer ${
              activeTab === 'badges' ? 'text-purple-600 font-bold' : 'text-slate-400'
            }`}
          >
            <Award size={18} />
            <span className="text-[10px]">Badges</span>
          </button>
        </div>
      </nav>
    );
  }

  // 9-12 Matric / FSc
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <button
          onClick={() => handleTab('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 cursor-pointer ${
            activeTab === 'home' ? 'text-purple-600 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen size={18} />
          <span className="text-[10px]">Syllabus</span>
        </button>

        <button
          onClick={() => handleTab('mock')}
          className={`flex flex-col items-center gap-0.5 p-1.5 cursor-pointer ${
            activeTab === 'mock' ? 'text-purple-600 font-bold' : 'text-slate-400'
          }`}
        >
          <FileText size={18} />
          <span className="text-[10px]">Mock Exams</span>
        </button>

        <button
          onClick={() => handleTab('progress')}
          className={`flex flex-col items-center gap-0.5 p-1.5 cursor-pointer ${
            activeTab === 'progress' ? 'text-purple-600 font-bold' : 'text-slate-400'
          }`}
        >
          <BarChart2 size={18} />
          <span className="text-[10px]">Analytics</span>
        </button>
      </div>
    </nav>
  );
};
