import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Droplet, Filter, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export const NephronSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hydrationStatus, setHydrationStatus] = useState<'normal' | 'dehydrated' | 'overhydrated'>('normal');

  const steps = [
    {
      step: 1,
      titleEn: '1. Pressure Filtration (Ultrafiltration)',
      titleUr: 'دباؤ سے چھاننا (الٹرا فلٹریشن)',
      site: 'Glomerulus & Bowman’s Capsule',
      substances: 'Water, Salts, Glucose, Urea enter capsule. RBCs & Proteins remain in blood.',
      urduNotes: 'خون کے زیادہ دباؤ کی وجہ سے پانی، نمکیات اور گلوکوز بومینز کیپسول میں داخل ہوتے ہیں۔',
    },
    {
      step: 2,
      titleEn: '2. Selective Reabsorption',
      titleUr: 'انتخابی دوبارہ انجذاب',
      site: 'Proximal Tubule & Loop of Henle',
      substances: '99% of filtrate reabsorbed! 100% glucose & amino acids returned to blood.',
      urduNotes: '99 فیصد مائع دوبارہ خون میں جذب ہو جاتا ہے۔ تمام گلوکوز فعال طریقے سے واپس لیا جاتا ہے۔',
    },
    {
      step: 3,
      titleEn: '3. Tubular Secretion & Urine Excretion',
      titleUr: 'ٹیوبولر رطوبت اور پیشاب کا اخراج',
      site: 'Distal Tubule & Collecting Duct',
      substances: 'H+ ions, creatinine, drugs secreted into tubule to maintain normal blood pH (7.35-7.45).',
      urduNotes: 'خون کا pH برابر رکھنے کے لیے اضافی مادے پیشاب میں شامل کر کے خارج کر دیے جاتے ہیں۔',
    },
  ];

  const currentStepInfo = steps[activeStep - 1];

  return (
    <div className="pearl-card p-5" style={{ background: 'linear-gradient(135deg, #FAF5FF 0%, #EFF6FF 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
            <Filter size={18} />
          </span>
          <div>
            <h4 className="text-sm font-black text-slate-900 leading-tight">
              Interactive Nephron Filtration Simulator
            </h4>
            <div className="text-[11px] font-nastaliq font-bold text-purple-700">
              گردے کے نیفران میں پیشاب بننے کے 3 مراحل
            </div>
          </div>
        </div>
        <span className="pearl-pill text-[10px] bg-purple-100 text-purple-900 font-bold">
          Class 10 Biology Ch 11
        </span>
      </div>

      {/* Step Selector Buttons */}
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        {steps.map((s) => (
          <button
            key={s.step}
            onClick={() => {
              soundEngine.playPop();
              setActiveStep(s.step);
            }}
            className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
              activeStep === s.step
                ? 'bg-purple-600 text-white border-purple-600 shadow-md font-bold'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-extrabold leading-tight">Step {s.step}</div>
            <div className="text-[10px] truncate">{s.step === 1 ? 'Filtration' : s.step === 2 ? 'Reabsorption' : 'Secretion'}</div>
          </button>
        ))}
      </div>

      {/* Interactive Nephron Visual Diagram */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden mb-4 shadow-inner">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono">
          <span>Active Site: <strong className="text-purple-300">{currentStepInfo.site}</strong></span>
          <span className="text-emerald-400 font-bold">Step {activeStep} / 3</span>
        </div>

        {/* Visual Tube Representation */}
        <div className="py-2 flex items-center justify-center gap-1 sm:gap-2">
          {/* Glomerulus */}
          <div
            onClick={() => setActiveStep(1)}
            className={`cursor-pointer p-2.5 rounded-xl border text-center transition-all ${
              activeStep === 1
                ? 'bg-rose-500/30 border-rose-400 ring-2 ring-rose-400/50 scale-105'
                : 'bg-slate-800 border-slate-700 opacity-60'
            }`}
          >
            <div className="w-8 h-8 mx-auto rounded-full bg-rose-600 flex items-center justify-center text-xs font-bold text-white shadow">
              🩸
            </div>
            <div className="text-[10px] font-bold mt-1 text-rose-300">Glomerulus</div>
            <div className="text-[9px] text-slate-400">Bowman's</div>
          </div>

          <div className="text-slate-600 text-sm">➔</div>

          {/* PCT */}
          <div
            onClick={() => setActiveStep(2)}
            className={`cursor-pointer p-2.5 rounded-xl border text-center transition-all ${
              activeStep === 2
                ? 'bg-emerald-500/30 border-emerald-400 ring-2 ring-emerald-400/50 scale-105'
                : 'bg-slate-800 border-slate-700 opacity-60'
            }`}
          >
            <div className="w-8 h-8 mx-auto rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shadow">
              🔄
            </div>
            <div className="text-[10px] font-bold mt-1 text-emerald-300">PCT & Loop</div>
            <div className="text-[9px] text-slate-400">99% Absorbed</div>
          </div>

          <div className="text-slate-600 text-sm">➔</div>

          {/* DCT & Collecting Duct */}
          <div
            onClick={() => setActiveStep(3)}
            className={`cursor-pointer p-2.5 rounded-xl border text-center transition-all ${
              activeStep === 3
                ? 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400/50 scale-105'
                : 'bg-slate-800 border-slate-700 opacity-60'
            }`}
          >
            <div className="w-8 h-8 mx-auto rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-white shadow">
              🧪
            </div>
            <div className="text-[10px] font-bold mt-1 text-amber-300">DCT & Duct</div>
            <div className="text-[9px] text-slate-400">Urine Formed</div>
          </div>
        </div>

        {/* Step details banner */}
        <div className="mt-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
          <h5 className="text-xs font-extrabold text-white mb-0.5">
            {currentStepInfo.titleEn}
          </h5>
          <div className="text-xs font-nastaliq text-purple-300 mb-1">
            {currentStepInfo.titleUr}
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
            {currentStepInfo.substances}
          </p>
          <div className="text-[11px] font-nastaliq text-slate-400 mt-1">
            {currentStepInfo.urduNotes}
          </div>
        </div>
      </div>

      {/* Osmoregulation (ADH) Hormone Control */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Droplet size={14} className="text-blue-500" /> Osmoregulation & ADH Hormone State
          </span>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
            BISE Long Question
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              soundEngine.playPop();
              setHydrationStatus('dehydrated');
            }}
            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
              hydrationStatus === 'dehydrated'
                ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="text-xs">🏜️ Dehydrated</div>
            <div className="text-[9px] text-slate-500 mt-0.5">High ADH • Concentrated</div>
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              setHydrationStatus('normal');
            }}
            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
              hydrationStatus === 'normal'
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="text-xs">💧 Normal Water</div>
            <div className="text-[9px] text-slate-500 mt-0.5">Balanced Osmosis</div>
          </button>

          <button
            onClick={() => {
              soundEngine.playPop();
              setHydrationStatus('overhydrated');
            }}
            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
              hydrationStatus === 'overhydrated'
                ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="text-xs">🌊 Excess Water</div>
            <div className="text-[9px] text-slate-500 mt-0.5">Low ADH • Dilute Urine</div>
          </button>
        </div>

        <div className="mt-2 text-[11px] text-slate-600 leading-snug">
          {hydrationStatus === 'dehydrated' && (
            <span className="text-amber-800">
              <strong>Dehydration response:</strong> Posterior pituitary releases <strong>ADH (Antidiuretic Hormone)</strong>. Collecting duct walls reabsorb maximum water back into capillaries, producing dark, concentrated urine to conserve body fluid.
            </span>
          )}
          {hydrationStatus === 'normal' && (
            <span className="text-slate-700">
              <strong>Normal balance:</strong> Blood osmotic pressure is stable at ~300 mOsm/L. Kidneys filter ~180 Liters of filtrate daily, reabsorbing 99% and excreting only 1.5 to 2 Liters of urine.
            </span>
          )}
          {hydrationStatus === 'overhydrated' && (
            <span className="text-blue-800">
              <strong>Excess water response:</strong> ADH secretion is inhibited. Collecting duct walls remain impermeable to water, allowing large volume of clear, dilute urine to leave the body.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
