import React, { useState } from 'react';
import { Zap, RefreshCw, AlertCircle } from 'lucide-react';

export const CircuitSimulator: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(12); // Volts
  const [resistance, setResistance] = useState<number>(6); // Ohms

  const current = Number((voltage / (resistance || 1)).toFixed(2)); // Amperes
  const power = Number((voltage * current).toFixed(2)); // Watts

  // Brightness 0 to 1
  const brightness = Math.min(power / 30, 1);

  return (
    <div className="pearl-card p-6 bg-slate-900 border border-slate-800 text-white shadow-xl rounded-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Zap size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Ohm&apos;s Law &amp; Circuit Simulator (V = I × R)</h4>
            <p className="text-xs text-slate-400">BISE Swat Physics Practical • Interactive DC Circuit</p>
          </div>
        </div>
        <button
          onClick={() => {
            setVoltage(12);
            setResistance(6);
          }}
          className="text-xs flex items-center gap-1 text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 transition"
        >
          <RefreshCw size={12} /> Reset
        </button>
      </div>

      {/* Circuit Graphical SVG */}
      <div className="relative bg-slate-950/80 rounded-xl p-4 mb-5 border border-slate-800/80 flex flex-col items-center">
        <svg viewBox="0 0 460 200" className="w-full max-w-md h-44">
          {/* Wire loop */}
          <rect x="60" y="30" width="340" height="140" fill="none" stroke="#475569" stroke-width="4" rx="8" />

          {/* Battery DC Source */}
          <rect x="40" y="80" width="40" height="40" fill="#0F172A" />
          <line x1="50" y1="90" x2="70" y2="90" stroke="#EF4444" strokeWidth="4" />
          <line x1="55" y1="110" x2="65" y2="110" stroke="#3B82F6" strokeWidth="4" />
          <text x="25" y="94" fill="#EF4444" fontSize="12" fontWeight="bold">+</text>
          <text x="25" y="115" fill="#3B82F6" fontSize="14" fontWeight="bold">-</text>
          <text x="20" y="138" fill="#F8FAFC" fontSize="11" fontWeight="bold">{voltage} V</text>

          {/* Resistor Component */}
          <rect x="200" y="18" width="60" height="24" fill="#0F172A" />
          <path d="M 200 30 L 210 22 L 220 38 L 230 22 L 240 38 L 250 22 L 260 30" fill="none" stroke="#F59E0B" strokeWidth="3" />
          <text x="205" y="14" fill="#F59E0B" fontSize="11" fontWeight="bold">R = {resistance} Ω</text>

          {/* Light Bulb */}
          <rect x="380" y="85" width="40" height="30" fill="#0F172A" />
          <circle cx="400" cy="100" r="16" fill={`rgba(250, 204, 21, ${0.15 + brightness * 0.85})`} stroke="#FACC15" strokeWidth="2.5" />
          <text x="394" y="104" fill="#FACC15" fontSize="11">💡</text>
          <text x="375" y="132" fill="#FACC15" fontSize="10" fontWeight="bold">{power} W</text>

          {/* Flowing current arrows */}
          <circle cx="140" cy="30" r="4" fill="#38BDF8">
            <animate attributeName="cx" from="70" to="200" dur={`${Math.max(0.3, 4 / (current || 0.1))}s`} repeatCount="indefinite" />
          </circle>
          <circle cx="330" cy="30" r="4" fill="#38BDF8">
            <animate attributeName="cx" from="260" to="400" dur={`${Math.max(0.3, 4 / (current || 0.1))}s`} repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="140" r="4" fill="#38BDF8">
            <animate attributeName="cy" from="116" to="170" dur={`${Math.max(0.3, 4 / (current || 0.1))}s`} repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Live Status Readout */}
        <div className="grid grid-cols-3 gap-3 w-full mt-2">
          <div className="bg-slate-900/90 rounded-lg p-2.5 text-center border border-slate-800">
            <div className="text-[10px] text-slate-400 font-medium">Voltage (V)</div>
            <div className="text-lg font-bold text-red-400">{voltage} <span className="text-xs">V</span></div>
          </div>
          <div className="bg-slate-900/90 rounded-lg p-2.5 text-center border border-slate-800">
            <div className="text-[10px] text-slate-400 font-medium">Current I = V / R</div>
            <div className="text-lg font-bold text-cyan-400">{current} <span className="text-xs">A</span></div>
          </div>
          <div className="bg-slate-900/90 rounded-lg p-2.5 text-center border border-slate-800">
            <div className="text-[10px] text-slate-400 font-medium">Dissipated Power</div>
            <div className="text-lg font-bold text-amber-400">{power} <span className="text-xs">W</span></div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">Potential Difference (Voltage):</span>
            <span className="text-red-400 font-mono">{voltage} Volts</span>
          </div>
          <input
            type="range"
            min="1"
            max="24"
            step="1"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full accent-red-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-slate-300">Resistance (R):</span>
            <span className="text-amber-400 font-mono">{resistance} Ohms (Ω)</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={resistance}
            onChange={(e) => setResistance(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-950/30 border border-blue-900/50 rounded-xl text-xs text-blue-200 flex items-start gap-2">
        <AlertCircle size={15} className="mt-0.5 text-blue-400 shrink-0" />
        <span>
          <strong>BISE Law of Resistance:</strong> Current (I) is directly proportional to Voltage (V) and inversely proportional to Resistance (R). If resistance doubles while voltage remains fixed, current drops by half.
        </span>
      </div>
    </div>
  );
};
