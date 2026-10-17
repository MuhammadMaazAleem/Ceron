import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Sparkles, RotateCcw } from 'lucide-react';

export const PearlCounterSimulator: React.FC = () => {
  const [pearlCount, setPearlCount] = useState<number>(3);
  const [revealed, setRevealed] = useState<number[]>([]);

  const handlePearlTap = (index: number) => {
    if (!revealed.includes(index)) {
      setRevealed([...revealed, index]);
      soundEngine.playPop();
    }
  };

  const handleReset = () => {
    setRevealed([]);
    soundEngine.playPop();
  };

  const urduNumbers = ['ایک (One)', 'دو (Two)', 'تین (Three)', 'چار (Four)', 'پانچ (Five)', 'چھ (Six)', 'سات (Seven)'];

  return (
    <div className="pearl-card p-6 text-center my-4" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="pearl-pill text-xs" style={{ background: '#FFFFFF', color: '#06B6D4' }}>
          <Sparkles size={14} /> Interactive Tactile Counter
        </span>
        <button onClick={handleReset} className="pearl-pill text-xs cursor-pointer hover:bg-slate-100 flex items-center gap-1">
          <RotateCcw size={12} /> Reset (دوبارہ)
        </button>
      </div>

      <h4 className="text-lg font-bold text-slate-800 mb-1">
        Tap the Pearls to Count! 🐚
      </h4>
      <p className="text-sm font-nastaliq text-slate-600 mb-4">
        موتیوں پر کلک کریں اور گنتی سنیں!
      </p>

      {/* Oyster shell visual container */}
      <div className="relative mx-auto my-6 p-6 rounded-3xl max-w-sm flex flex-wrap justify-center items-center gap-4"
           style={{
             background: 'radial-gradient(circle, #FFFFFF 0%, #E2E8F0 100%)',
             border: '3px solid #CBD5E1',
             boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.06), 0 10px 25px rgba(148,163,184,0.3)',
             minHeight: '140px'
           }}>
        {Array.from({ length: pearlCount }).map((_, idx) => {
          const isClicked = revealed.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handlePearlTap(idx)}
              className="relative transition-all duration-300 transform active:scale-90"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: isClicked
                  ? 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FEF08A 30%, #F59E0B 100%)'
                  : 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #F1F5F9 50%, #CBD5E1 100%)',
                boxShadow: isClicked
                  ? '0 0 20px rgba(245, 158, 11, 0.6), inset 0 2px 4px #FFFFFF'
                  : '0 4px 10px rgba(0,0,0,0.1), inset 0 2px 4px #FFFFFF',
                border: isClicked ? '2px solid #F59E0B' : '2px solid #E2E8F0',
                cursor: 'pointer'
              }}
            >
              <span className={`font-extrabold text-lg ${isClicked ? 'text-amber-900' : 'text-slate-400'}`}>
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-200 shadow-sm max-w-xs mx-auto">
        <div className="text-sm font-semibold text-slate-500">You counted:</div>
        <div className="text-2xl font-black text-amber-500 my-1">
          {revealed.length} {revealed.length === 1 ? 'Pearl' : 'Pearls'}
        </div>
        {revealed.length > 0 && (
          <div className="text-base font-nastaliq text-emerald-600 font-bold">
            {urduNumbers[revealed.length - 1] || `${revealed.length} موتی`}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => { setPearlCount(Math.max(1, pearlCount - 1)); setRevealed([]); }}
          className="pearl-btn text-xs py-1 px-3 bg-white hover:bg-slate-50"
        >
          - Less
        </button>
        <button
          onClick={() => { setPearlCount(Math.min(7, pearlCount + 1)); setRevealed([]); }}
          className="pearl-btn text-xs py-1 px-3 bg-white hover:bg-slate-50"
        >
          + More Pearls
        </button>
      </div>
    </div>
  );
};
