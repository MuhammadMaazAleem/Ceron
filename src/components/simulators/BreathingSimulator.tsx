import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Wind, Activity, ArrowDown, ArrowUp, Info } from 'lucide-react';

export const BreathingSimulator: React.FC = () => {
  const [phase, setPhase] = useState<'inspiration' | 'expiration'>('inspiration');
  const [autoBreathe, setAutoBreathe] = useState<boolean>(true);
  const [breathCount, setBreathCount] = useState<number>(0);

  // Auto-cycle breathing every 3.5 seconds if enabled
  useEffect(() => {
    if (!autoBreathe) return;
    const timer = setInterval(() => {
      setPhase((prev) => {
        const next = prev === 'inspiration' ? 'expiration' : 'inspiration';
        if (next === 'inspiration') {
          setBreathCount((c) => c + 1);
        }
        return next;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [autoBreathe]);

  const isInspiration = phase === 'inspiration';

  return (
    <div className="pearl-card p-5" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #FAF5FF 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Wind size={18} />
          </span>
          <div>
            <h4 className="text-sm font-black text-slate-900 leading-tight">
              Interactive Breathing Simulator
            </h4>
            <div className="text-[11px] font-nastaliq font-bold text-emerald-700">
              تنفس کا طریقہ کار: انسپائریشن اور ایکسپائریشن
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playPop();
            setAutoBreathe((b) => !b);
          }}
          className={`pearl-pill text-[11px] font-bold cursor-pointer transition-all ${
            autoBreathe ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {autoBreathe ? 'Auto-Breathing Active' : 'Manual Control'}
        </button>
      </div>

      {/* Manual Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => {
            soundEngine.playPop();
            setAutoBreathe(false);
            setPhase('inspiration');
          }}
          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            isInspiration
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <ArrowDown size={14} /> Inspiration (سانس اندر لینا)
        </button>
        <button
          onClick={() => {
            soundEngine.playPop();
            setAutoBreathe(false);
            setPhase('expiration');
          }}
          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            !isInspiration
              ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-102'
              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
          }`}
        >
          <ArrowUp size={14} /> Expiration (سانس باہر نکالنا)
        </button>
      </div>

      {/* Animated Diagram Area */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden mb-4 shadow-inner">
        <div className="absolute top-2 right-3 text-[10px] text-slate-400 font-mono">
          Cycle: {breathCount} Breaths
        </div>

        {/* Trachea and Lungs Graphic */}
        <div className="flex flex-col items-center justify-center py-4">
          {/* Trachea tube with flow indicator */}
          <div className="relative w-8 h-12 bg-slate-700 rounded-t-md border-x-2 border-slate-600 flex items-center justify-center">
            {/* Air flow particle indicator */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-700 ${
                isInspiration
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50 translate-y-3'
                  : 'bg-rose-400 shadow-lg shadow-rose-400/50 -translate-y-3'
              }`}
            />
          </div>

          {/* Bronchi split */}
          <div className="w-16 h-4 border-b-4 border-x-4 border-slate-600 rounded-b-lg mb-1" />

          {/* Lungs and Ribcage Container */}
          <div className="relative w-full max-w-[280px] h-36 flex items-center justify-center gap-4">
            {/* Left Lung */}
            <div
              className={`rounded-3xl transition-all duration-1000 ease-in-out flex flex-col items-center justify-center ${
                isInspiration
                  ? 'w-24 h-28 bg-gradient-to-br from-rose-400 to-rose-500 shadow-xl shadow-rose-500/30 scale-105'
                  : 'w-18 h-22 bg-gradient-to-br from-rose-600 to-rose-700 scale-90 opacity-80'
              }`}
            >
              <span className="text-[10px] font-bold text-white tracking-wider">LEFT LUNG</span>
              <span className="text-[9px] text-rose-100 font-nastaliq">بایاں پھیپھڑا</span>
            </div>

            {/* Right Lung */}
            <div
              className={`rounded-3xl transition-all duration-1000 ease-in-out flex flex-col items-center justify-center ${
                isInspiration
                  ? 'w-24 h-28 bg-gradient-to-br from-rose-400 to-rose-500 shadow-xl shadow-rose-500/30 scale-105'
                  : 'w-18 h-22 bg-gradient-to-br from-rose-600 to-rose-700 scale-90 opacity-80'
              }`}
            >
              <span className="text-[10px] font-bold text-white tracking-wider">RIGHT LUNG</span>
              <span className="text-[9px] text-rose-100 font-nastaliq">دایاں پھیپھڑا</span>
            </div>
          </div>

          {/* Diaphragm Muscle Curve */}
          <div className="w-full max-w-[280px] flex flex-col items-center mt-2">
            <div
              className={`w-full transition-all duration-1000 ease-in-out rounded-full border-t-4 ${
                isInspiration
                  ? 'h-3 bg-emerald-500 border-emerald-400 shadow-md shadow-emerald-500/40 rounded-sm'
                  : 'h-8 bg-purple-500 border-purple-400 rounded-t-full shadow-md shadow-purple-500/40'
              }`}
            />
            <div className="flex items-center justify-between w-full mt-1 px-2 text-[10px] font-bold">
              <span className={isInspiration ? 'text-emerald-400' : 'text-purple-400'}>
                Diaphragm: {isInspiration ? 'Contracted & Flattened (نیچے اور سیدھا)' : 'Relaxed & Dome-Shaped (گنبد نما)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BISE Swat Key Exam Metrics Comparison */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-1">Thoracic Volume</div>
          <div className="text-sm font-black text-slate-900">
            {isInspiration ? 'Increased (~5,200 mL)' : 'Decreased (~2,400 mL)'}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {isInspiration ? 'سینہ کا حجم بڑھ جاتا ہے' : 'سینہ کا حجم کم ہو جاتا ہے'}
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-1">Alveolar Pressure</div>
          <div className={`text-sm font-black ${isInspiration ? 'text-cyan-600' : 'text-rose-600'}`}>
            {isInspiration ? '759 mmHg (-1 mmHg vs atm)' : '761 mmHg (+1 mmHg vs atm)'}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {isInspiration ? 'ہوا کا دباؤ کم -> اندر داخل' : 'ہوا کا دباؤ زیادہ -> باہر خارج'}
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-1">Intercostal Muscles</div>
          <div className="text-xs font-bold text-slate-800">
            {isInspiration ? 'Contract (Pull Ribs Up & Out)' : 'Relax (Ribs Move Down & In)'}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">پسلیوں کے عضلات کا سکڑاؤ</div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-1">Energy Required</div>
          <div className="text-xs font-bold text-slate-800">
            {isInspiration ? 'Active Process (ATP Used)' : 'Passive Process (No ATP)'}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">عام حالت میں غیر فعال عمل</div>
        </div>
      </div>

      {/* Board Exam Tip */}
      <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
        <Info size={15} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold">BISE Swat High-Yield Exam Point:</span> Normal breathing rate at rest is 16–20 times per minute. The respiratory center is located in the <strong>Medulla Oblongata</strong> of the hindbrain, which senses blood CO₂ concentration, NOT oxygen levels!
        </div>
      </div>
    </div>
  );
};
