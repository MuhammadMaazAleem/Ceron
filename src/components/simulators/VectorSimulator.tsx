import React, { useState } from 'react';
import { Compass, RefreshCw, Info } from 'lucide-react';

export const VectorSimulator: React.FC = () => {
  const [magA, setMagA] = useState<number>(40); // Magnitude of Vector A
  const [angleA, setAngleA] = useState<number>(0); // Angle of Vector A (degrees)
  const [magB, setMagB] = useState<number>(30); // Magnitude of Vector B
  const [angleB, setAngleB] = useState<number>(90); // Angle of Vector B (degrees)

  const radA = (angleA * Math.PI) / 180;
  const radB = (angleB * Math.PI) / 180;

  const ax = magA * Math.cos(radA);
  const ay = magA * Math.sin(radA);

  const bx = magB * Math.cos(radB);
  const by = magB * Math.sin(radB);

  const rx = ax + bx;
  const ry = ay + by;

  const resultantMag = Number(Math.sqrt(rx * rx + ry * ry).toFixed(1));
  const resultantAngle = Number(((Math.atan2(ry, rx) * 180) / Math.PI).toFixed(1));

  // Canvas scaling
  const originX = 140;
  const originY = 140;
  const scale = 1.6;

  const ax_px = originX + ax * scale;
  const ay_px = originY - ay * scale;

  const bx_px = ax_px + bx * scale;
  const by_px = ay_px - by * scale;

  return (
    <div className="pearl-card p-6 bg-slate-900 border border-slate-800 text-white shadow-xl rounded-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <Compass size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-base">Vector Addition &amp; Head-to-Tail Rule</h4>
            <p className="text-xs text-slate-400">Class 9 &amp; 11 Physics • Resultant Vector R = A + B</p>
          </div>
        </div>
        <button
          onClick={() => {
            setMagA(40);
            setAngleA(0);
            setMagB(30);
            setAngleB(90);
          }}
          className="text-xs flex items-center gap-1 text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 transition"
        >
          <RefreshCw size={12} /> Reset
        </button>
      </div>

      {/* Vector Graph Visualization */}
      <div className="relative bg-slate-950/80 rounded-xl p-3 mb-5 border border-slate-800/80 flex flex-col items-center">
        <svg viewBox="0 0 380 220" className="w-full max-w-sm h-48">
          {/* Grid lines */}
          <line x1="20" y1={originY} x2="360" y2={originY} stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
          <line x1={originX} y1="20" x2={originX} y2="200" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
          <text x="350" y={originY + 14} fill="#64748B" fontSize="10">+X</text>
          <text x={originX + 6} y="30" fill="#64748B" fontSize="10">+Y</text>

          {/* Vector A (Blue) */}
          <line x1={originX} y1={originY} x2={ax_px} y2={ay_px} stroke="#38BDF8" strokeWidth="3.5" />
          <circle cx={ax_px} cy={ay_px} r="4" fill="#38BDF8" />
          <text x={(originX + ax_px) / 2 - 10} y={(originY + ay_px) / 2 + 15} fill="#38BDF8" fontSize="11" fontWeight="bold">
            A ({magA}N)
          </text>

          {/* Vector B (Green) drawn from tip of A */}
          <line x1={ax_px} y1={ay_px} x2={bx_px} y2={by_px} stroke="#34D399" strokeWidth="3.5" />
          <circle cx={bx_px} cy={by_px} r="4" fill="#34D399" />
          <text x={(ax_px + bx_px) / 2 + 8} y={(ay_px + by_px) / 2} fill="#34D399" fontSize="11" fontWeight="bold">
            B ({magB}N)
          </text>

          {/* Resultant Vector R (Amber dashed) */}
          <line x1={originX} y1={originY} x2={bx_px} y2={by_px} stroke="#F59E0B" strokeWidth="3" strokeDasharray="5,3" />
          <polygon
            points={`${bx_px},${by_px} ${bx_px - 8},${by_px + 4} ${bx_px - 4},${by_px + 8}`}
            fill="#F59E0B"
          />
          <text x={originX + 25} y={originY - 35} fill="#F59E0B" fontSize="12" fontWeight="extrabold">
            R = {resultantMag} N @ {resultantAngle}°
          </text>
        </svg>

        {/* Readout stats */}
        <div className="grid grid-cols-3 gap-2 w-full mt-1">
          <div className="bg-slate-900/90 rounded-lg p-2 text-center border border-slate-800">
            <span className="text-[10px] text-sky-400 font-semibold">Vector A</span>
            <div className="text-sm font-bold text-slate-100">{magA} N @ {angleA}°</div>
          </div>
          <div className="bg-slate-900/90 rounded-lg p-2 text-center border border-slate-800">
            <span className="text-[10px] text-emerald-400 font-semibold">Vector B</span>
            <div className="text-sm font-bold text-slate-100">{magB} N @ {angleB}°</div>
          </div>
          <div className="bg-slate-900/90 rounded-lg p-2 text-center border border-slate-800">
            <span className="text-[10px] text-amber-400 font-semibold">Resultant (R)</span>
            <div className="text-sm font-bold text-amber-300">{resultantMag} N @ {resultantAngle}°</div>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
          <div className="flex justify-between font-medium">
            <span className="text-sky-300">Vector A Magnitude: {magA} N</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            value={magA}
            onChange={(e) => setMagA(Number(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />

          <div className="flex justify-between font-medium mt-1">
            <span className="text-sky-300">Vector A Angle: {angleA}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={angleA}
            onChange={(e) => setAngleA(Number(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        <div className="space-y-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
          <div className="flex justify-between font-medium">
            <span className="text-emerald-300">Vector B Magnitude: {magB} N</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            value={magB}
            onChange={(e) => setMagB(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />

          <div className="flex justify-between font-medium mt-1">
            <span className="text-emerald-300">Vector B Angle: {angleB}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={angleB}
            onChange={(e) => setAngleB(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      <div className="mt-4 p-2.5 bg-slate-800/50 rounded-xl text-xs text-slate-300 flex items-center gap-2">
        <Info size={14} className="text-amber-400 shrink-0" />
        <span>
          <strong>Head-to-Tail Rule:</strong> Place tail of Vector B on the head of Vector A. The Resultant R connects the tail of A to the head of B.
        </span>
      </div>
    </div>
  );
};
