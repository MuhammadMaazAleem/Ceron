import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Flame, Gauge, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export const EquilibriumSimulator: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(450); // °C
  const [pressure, setPressure] = useState<number>(200); // atm
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(true);

  // Le Chatelier calculation for Haber Process: N2 + 3H2 <=> 2NH3 + Heat
  // Higher pressure favors forward (fewer moles: 4 moles -> 2 moles)
  // Higher temp favors backward (exothermic: shifts left)
  // Base yield around 450C & 200 atm is ~15-20%
  const tempEffect = (600 - temperature) / 400; // 0 to 1
  const pressureEffect = (pressure - 50) / 250; // 0 to 1
  const ammoniaYield = Math.max(5, Math.min(85, Math.round(15 + 40 * pressureEffect + 25 * tempEffect)));

  const n2h2Percent = 100 - ammoniaYield;
  const n2Percent = Math.round(n2h2Percent * 0.25);
  const h2Percent = 100 - ammoniaYield - n2Percent;

  return (
    <div className="pearl-card p-5" style={{ background: 'linear-gradient(135deg, #FFF1F2 0%, #FAF5FF 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
            <RefreshCw size={18} />
          </span>
          <div>
            <h4 className="text-sm font-black text-slate-900 leading-tight">
              Dynamic Chemical Equilibrium Simulator
            </h4>
            <div className="text-[11px] font-nastaliq font-bold text-rose-700">
              کیمیائی توازن اور لی شاٹلیئر کا اصول (ہیبر پراسیس)
            </div>
          </div>
        </div>
        <span className="pearl-pill text-[10px] bg-rose-100 text-rose-900 font-bold">
          Class 10 Chem Ch 9
        </span>
      </div>

      {/* Balanced Reaction Formula */}
      <div className="bg-slate-900 text-white rounded-xl p-3.5 mb-4 text-center shadow-inner">
        <div className="text-xs text-slate-400 font-mono mb-1">Reversible Exothermic Reaction</div>
        <div className="text-base sm:text-lg font-black tracking-wide text-rose-300 font-mono">
          N₂<span className="text-xs text-slate-400">(g)</span> + 3H₂<span className="text-xs text-slate-400">(g)</span>
          {' '}⇌{' '}
          2NH₃<span className="text-xs text-slate-400">(g)</span> + 92.4 kJ
        </div>
        <div className="text-[10px] text-slate-400 mt-1">
          4 Moles of Reactant Gas ⇌ 2 Moles of Product Gas (Heat Released)
        </div>
      </div>

      {/* Dynamic Equilibrium Concentration Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 mb-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
          <span>Equilibrium Yield Composition</span>
          <span className="text-rose-600 font-black">NH₃ Yield: {ammoniaYield}%</span>
        </div>

        <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${n2Percent}%` }}
            className="bg-blue-500 h-full flex items-center justify-center text-[10px] text-white font-bold transition-all duration-300"
            title={`N2: ${n2Percent}%`}
          >
            {n2Percent > 10 ? `N₂ ${n2Percent}%` : ''}
          </div>
          <div
            style={{ width: `${h2Percent}%` }}
            className="bg-cyan-400 h-full flex items-center justify-center text-[10px] text-white font-bold transition-all duration-300"
            title={`H2: ${h2Percent}%`}
          >
            {h2Percent > 10 ? `H₂ ${h2Percent}%` : ''}
          </div>
          <div
            style={{ width: `${ammoniaYield}%` }}
            className="bg-rose-500 h-full flex items-center justify-center text-[10px] text-white font-bold transition-all duration-300"
            title={`NH3: ${ammoniaYield}%`}
          >
            NH₃ {ammoniaYield}%
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 px-1">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Nitrogen (N₂)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Hydrogen (H₂)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Ammonia (NH₃)
          </span>
        </div>
      </div>

      {/* Sliders for Temperature & Pressure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Temperature */}
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 mb-1">
            <span className="flex items-center gap-1 text-amber-600">
              <Flame size={14} /> Temperature: {temperature}°C
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              {temperature > 450 ? 'Favors Backward' : 'Favors Forward'}
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="600"
            step="25"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">
            Exothermic: Lower temperature shifts equilibrium forward (increases NH₃).
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 mb-1">
            <span className="flex items-center gap-1 text-blue-600">
              <Gauge size={14} /> Pressure: {pressure} atm
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              {pressure > 180 ? 'High Yield' : 'Low Yield'}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="300"
            step="25"
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 mt-1">
            Higher pressure shifts to side with fewer gas moles (favors NH₃).
          </div>
        </div>
      </div>

      {/* Catalyst Toggle */}
      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className={hasCatalyst ? 'text-purple-600' : 'text-slate-400'} />
          <div>
            <div className="text-xs font-extrabold text-slate-800">
              Iron (Fe) Catalyst with Al₂O₃ Promoter
            </div>
            <div className="text-[10px] text-slate-500">
              Lowers activation energy; does NOT shift equilibrium position.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundEngine.playPop();
            setHasCatalyst((c) => !c);
          }}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            hasCatalyst ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {hasCatalyst ? 'Active' : 'Off'}
        </button>
      </div>

      {/* BISE Swat High-Yield Exam Note */}
      <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
        <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold">BISE Swat Board Exam Question:</span> "State Le Chatelier's Principle and explain Haber's Process optimum conditions." Optimum industrial conditions: <strong>450°C</strong> temperature, <strong>200 atm</strong> pressure, and finely divided <strong>Iron (Fe)</strong> catalyst.
        </div>
      </div>
    </div>
  );
};
