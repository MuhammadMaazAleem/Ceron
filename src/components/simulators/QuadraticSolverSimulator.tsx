import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Calculator, CheckCircle2, HelpCircle } from 'lucide-react';

export const QuadraticSolverSimulator: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  // Discriminant: D = b^2 - 4ac
  const discriminant = b * b - 4 * a * c;

  // Nature of roots according to KPTBB Class 10 Math Unit 2
  let natureEn = '';
  let natureUr = '';
  let natureColor = '';

  const isPerfectSquare = (n: number) => {
    if (n < 0) return false;
    const s = Math.round(Math.sqrt(n));
    return s * s === n;
  };

  if (discriminant > 0) {
    if (isPerfectSquare(discriminant)) {
      natureEn = 'Rational and Unequal (Real)';
      natureUr = 'ناطق اور غیر مساوی (حقیقی)';
      natureColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    } else {
      natureEn = 'Irrational and Unequal (Surd Roots)';
      natureUr = 'غیر ناطق اور غیر مساوی (جزر پر مشتمل)';
      natureColor = 'text-blue-700 bg-blue-50 border-blue-300';
    }
  } else if (discriminant === 0) {
    natureEn = 'Rational and Equal (Single Repeated Root)';
    natureUr = 'ناطق اور برابر (ایک ہی جزر)';
    natureColor = 'text-amber-700 bg-amber-50 border-amber-300';
  } else {
    natureEn = 'Complex / Imaginary (No Real Roots)';
    natureUr = 'خیالی / غیر حقیقی (کمپلیکس جزر)';
    natureColor = 'text-rose-700 bg-rose-50 border-rose-300';
  }

  // Calculate roots
  let root1Str = '';
  let root2Str = '';

  if (a !== 0) {
    if (discriminant >= 0) {
      const sqrtD = Math.sqrt(discriminant);
      const r1 = (-b + sqrtD) / (2 * a);
      const r2 = (-b - sqrtD) / (2 * a);
      root1Str = Number.isInteger(r1) ? r1.toString() : r1.toFixed(3);
      root2Str = Number.isInteger(r2) ? r2.toString() : r2.toFixed(3);
    } else {
      const realPart = (-b / (2 * a)).toFixed(2);
      const imagPart = (Math.sqrt(Math.abs(discriminant)) / (2 * a)).toFixed(2);
      root1Str = `${realPart} + ${imagPart}i`;
      root2Str = `${realPart} - ${imagPart}i`;
    }
  }

  return (
    <div className="pearl-card p-5" style={{ background: 'linear-gradient(135deg, #ECFEFF 0%, #FAF5FF 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center">
            <Calculator size={18} />
          </span>
          <div>
            <h4 className="text-sm font-black text-slate-900 leading-tight">
              Interactive Quadratic Solver & Discriminant Explorer
            </h4>
            <div className="text-[11px] font-nastaliq font-bold text-cyan-700">
              دو درجی مساوات کا حل اور فرق کنندہ (Discriminant) کی نوعیت
            </div>
          </div>
        </div>
        <span className="pearl-pill text-[10px] bg-cyan-100 text-cyan-900 font-bold">
          Class 10 Math Unit 1 & 2
        </span>
      </div>

      {/* Equation display */}
      <div className="bg-slate-900 text-white rounded-xl p-3.5 mb-4 text-center shadow-inner">
        <div className="text-[11px] text-slate-400 font-mono mb-1">Standard Quadratic Form: ax² + bx + c = 0</div>
        <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono tracking-wide">
          {a}x² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
        </div>
      </div>

      {/* Coefficient sliders */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* a */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <div className="text-xs font-bold text-slate-700 mb-1">a = {a}</div>
          <input
            type="range"
            min="-5"
            max="5"
            step="1"
            value={a}
            onChange={(e) => {
              const val = Number(e.target.value);
              setA(val === 0 ? 1 : val);
            }}
            className="w-full accent-cyan-600"
          />
          <div className="text-[9px] text-slate-400 mt-0.5">Coefficient of x²</div>
        </div>

        {/* b */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <div className="text-xs font-bold text-slate-700 mb-1">b = {b}</div>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="w-full accent-cyan-600"
          />
          <div className="text-[9px] text-slate-400 mt-0.5">Coefficient of x</div>
        </div>

        {/* c */}
        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
          <div className="text-xs font-bold text-slate-700 mb-1">c = {c}</div>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
            className="w-full accent-cyan-600"
          />
          <div className="text-[9px] text-slate-400 mt-0.5">Constant term</div>
        </div>
      </div>

      {/* Discriminant Result Card */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800">
            Discriminant: <span className="font-mono text-cyan-700 font-extrabold">D = b² - 4ac = ({b})² - 4({a})({c}) = {discriminant}</span>
          </span>
        </div>

        {/* Nature Banner */}
        <div className={`p-2.5 rounded-lg border text-xs font-bold ${natureColor}`}>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} />
            <span>Nature of Roots: {natureEn}</span>
          </div>
          <div className="font-nastaliq text-[11px] mt-1">
            جزروں کی نوعیت: {natureUr}
          </div>
        </div>

        {/* Solved Roots */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-600">
            <strong>Calculated Roots (حل):</strong>
          </div>
          <div className="flex gap-2">
            <span className="pearl-pill text-xs font-mono font-bold bg-cyan-50 text-cyan-800 border-cyan-200">
              x₁ = {root1Str}
            </span>
            <span className="pearl-pill text-xs font-mono font-bold bg-purple-50 text-purple-800 border-purple-200">
              x₂ = {root2Str}
            </span>
          </div>
        </div>
      </div>

      {/* Quadratic Formula Reference */}
      <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200 text-cyan-900 text-xs">
        <div className="font-extrabold mb-1">KPTBB Quadratic Formula (دو درجی فارمولا):</div>
        <div className="font-mono text-center text-sm font-black text-cyan-800 my-1">
          x = [-b ± √(b² - 4ac)] / (2a)
        </div>
        <div className="text-[11px] text-cyan-700 font-nastaliq text-center mt-1">
          اگر D &gt; 0 ہو تو دو مختلف حل حاصل ہوتے ہیں، اور اگر D = 0 ہو تو دونوں جزر برابر ہوتے ہیں۔
        </div>
      </div>
    </div>
  );
};
