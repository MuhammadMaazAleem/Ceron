import React from 'react';
import { BoardPairingInfo, Unit } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import {
  Sparkles,
  HelpCircle,
  FileText,
  Target,
  AlertTriangle,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface BoardPairingSchemeViewProps {
  unit: Unit;
  pairingScheme?: BoardPairingInfo;
}

export const BoardPairingSchemeView: React.FC<BoardPairingSchemeViewProps> = ({
  unit,
  pairingScheme,
}) => {
  const scheme: BoardPairingInfo = pairingScheme || {
    mcqMarks: 2,
    shortQuestionMarks: 8,
    longQuestionMarks: 7,
    totalBoardMarks: 17,
    pairedWithChapters: `Chapter ${unit.kptbbChapter + 2 <= 18 ? unit.kptbbChapter + 2 : unit.kptbbChapter - 1}`,
    sectionCPairingRule: `Question 5 or Question 6 in Section C consists of Theory Part (a) [4 Marks] from this chapter and Numerical Part (b) [3 Marks] from the paired chapter.`,
    highYieldTopics: [
      'Core Laws, Definitions & Principles with SI Units',
      'Standard Diagram and Graphical Analysis',
      'Textbook Solved Numerical Problems (Exercise Questions)',
      'Conceptual Short Questions with Scientific Reasoning',
    ],
  };

  return (
    <div className="space-y-4">
      {/* Hero Banner */}
      <div
        className="pearl-card p-5 text-white"
        style={{
          background: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%)',
          borderRadius: '20px',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 text-emerald-100 px-2.5 py-0.5 rounded-full backdrop-blur">
            BISE Swat Official Table of Specifications (TOS)
          </span>
          <span className="text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full text-emerald-100">
            Annual 2024–2025 Scheme
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black mb-1">
          Board Paper Pairing Scheme &amp; Marks Distribution
        </h3>
        <div className="text-sm font-nastaliq font-bold text-emerald-200 mb-3">
          بورڈ پیئرنگ اسکیم و نمبروں کی تقسیم (سوات بورڈ)
        </div>

        <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xl font-sans">
          Knowing the pairing scheme allows students to strategically prepare topics, target high-yield combinations, and guarantee 100% preparation for Section B and Section C.
        </p>

        {/* Expected Marks in Board */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/15 text-center">
          <div className="bg-white/10 p-2 rounded-xl">
            <div className="text-base font-black text-amber-300">~{scheme.totalBoardMarks}</div>
            <div className="text-[10px] text-emerald-100">Total Marks</div>
          </div>
          <div className="bg-white/10 p-2 rounded-xl">
            <div className="text-base font-black text-sky-200">{scheme.mcqMarks}</div>
            <div className="text-[10px] text-emerald-100">Section A (MCQs)</div>
          </div>
          <div className="bg-white/10 p-2 rounded-xl">
            <div className="text-base font-black text-teal-200">{scheme.shortQuestionMarks}</div>
            <div className="text-[10px] text-emerald-100">Section B (Short)</div>
          </div>
          <div className="bg-white/10 p-2 rounded-xl">
            <div className="text-base font-black text-rose-200">{scheme.longQuestionMarks}</div>
            <div className="text-[10px] text-emerald-100">Section C (Long)</div>
          </div>
        </div>
      </div>

      {/* Section C Pairing Partner Box */}
      <div className="pearl-card p-4 sm:p-5 bg-white border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="text-purple-600" size={18} />
          <h4 className="text-sm font-extrabold text-slate-900">
            Section C Long Question Pairing (تفصیلی سوالات کا جوڑا)
          </h4>
        </div>

        <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100 mb-3">
          <div className="text-xs font-bold text-purple-900 mb-1 flex items-center justify-between">
            <span>Paired with:</span>
            <span className="text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200 font-black">
              {scheme.pairedWithChapters}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {scheme.sectionCPairingRule}
          </p>
        </div>

        <div className="text-xs font-nastaliq text-purple-800 leading-loose bg-slate-50 p-3 rounded-xl border border-slate-200">
          <strong>امتحانی حکمت عملی:</strong> حصہ سوم (لانگ سوالات) میں اس باب کی تھیوری کے ساتھ عددی حسابی سوال (نومیریکل) عموماً پیئر شدہ باب سے آتا ہے۔ لہذا دونوں ابواب کی بیک وقت تیاری مکمل نمبر دلاتی ہے۔
        </div>
      </div>

      {/* High-Yield Scoring Checklist */}
      <div className="pearl-card p-4 sm:p-5 bg-white border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Target className="text-emerald-600" size={18} />
          <h4 className="text-sm font-extrabold text-slate-900">
            High-Yield Exam Topics (لازمی طور پر تیار کرنے والے نکات)
          </h4>
        </div>

        <div className="space-y-2">
          {scheme.highYieldTopics.map((topic, tIdx) => (
            <div
              key={tIdx}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs text-slate-800 font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[11px] flex items-center justify-center shrink-0">
                {tIdx + 1}
              </span>
              <span>{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 33% Pass Benchmark & 90%+ A-Grade Guide */}
      <div className="pearl-card p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start gap-3 text-xs">
        <Award size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="text-[11px] font-black uppercase text-amber-900 tracking-wider mb-1">
            BISE Swat 33% Pass Standard vs 90%+ Distinction Tip
          </div>
          <p className="text-amber-900 leading-relaxed font-sans">
            To clear the minimum 33% pass mark, focus on Solved Exercise Short Questions and standard definitions. 
            To score <strong>90%+ (A+ Grade)</strong>, practice the step-by-step numerical calculations with units and always sketch neat labeled pencil diagrams in Section C.
          </p>
        </div>
      </div>
    </div>
  );
};
