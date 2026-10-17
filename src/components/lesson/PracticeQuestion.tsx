import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';

interface Option {
  id: string;
  textEn: string;
  textUr: string;
}

interface PracticeQuestionProps {
  data: {
    promptEn: string;
    promptUr: string;
    options: Option[];
    correctId: string;
    explanationEn: string;
    explanationUr: string;
  };
  onSolved?: () => void;
}

export const PracticeQuestion: React.FC<PracticeQuestionProps> = ({ data, onSolved }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setIsAnswered(true);

    if (id === data.correctId) {
      setIsCorrect(true);
      soundEngine.playCorrect();
      if (onSolved) onSolved();
    } else {
      setIsCorrect(false);
      soundEngine.playHint();
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div
      className={`pearl-card p-5 my-4 transition-all duration-300 ${shake ? 'animate-shake' : ''}`}
      style={{
        background: isAnswered
          ? isCorrect
            ? 'linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 100%)'
            : 'linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 100%)'
          : 'var(--pearl-card-subsurface)',
        borderColor: isAnswered ? (isCorrect ? '#10B981' : '#FDA4AF') : 'var(--pearl-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="pearl-pill text-xs font-bold"
          style={{
            background: isAnswered && isCorrect ? '#D1FAE5' : '#F1F5F9',
            color: isAnswered && isCorrect ? '#065F46' : '#475569',
          }}
        >
          <Sparkles size={13} /> Quick Practice Check
        </span>
      </div>

      <div className="text-base font-bold text-slate-800 mb-1">
        {data.promptEn}
      </div>
      <div className="text-sm font-nastaliq text-slate-600 mb-4 font-bold">
        {data.promptUr}
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {data.options.map((opt) => {
          const isThisSelected = selectedId === opt.id;
          const isThisCorrect = opt.id === data.correctId;

          let optionStyle = 'bg-white text-slate-800 border-slate-200 hover:border-slate-300';
          if (isAnswered) {
            if (isThisCorrect) {
              optionStyle = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold shadow-sm';
            } else if (isThisSelected && !isThisCorrect) {
              optionStyle = 'bg-rose-50 text-rose-800 border-rose-400';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`w-full p-3 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${optionStyle}`}
            >
              <div>
                <div className="text-sm font-semibold">{opt.textEn}</div>
                <div className="text-xs font-nastaliq text-slate-500 font-medium">{opt.textUr}</div>
              </div>
              {isAnswered && isThisCorrect && (
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Feedback */}
      {isAnswered && (
        <div className="mt-4 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
            {isCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 size={14} /> Excellent! (شاباش!)
              </span>
            ) : (
              <span className="text-rose-500 flex items-center gap-1">
                <HelpCircle size={14} /> Think Again! Here is a hint:
              </span>
            )}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{data.explanationEn}</p>
          <p className="text-xs font-nastaliq text-slate-600 mt-1 font-bold">{data.explanationUr}</p>
        </div>
      )}
    </div>
  );
};
