import React, { useEffect } from 'react';
import { QuizAttempt } from '../../types';
import { soundEngine } from '../../services/soundEngine';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface ScoreShieldProps {
  attempt: QuizAttempt;
  onRetry: () => void;
  onBackToSyllabus: () => void;
}

export const ScoreShield: React.FC<ScoreShieldProps> = ({ attempt, onRetry, onBackToSyllabus }) => {
  useEffect(() => {
    if (attempt.passed) {
      soundEngine.playPass();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#06B6D4', '#8B5CF6'],
      });
    } else {
      soundEngine.playHint();
    }
  }, [attempt.passed]);

  return (
    <div className="pearl-card p-6 text-center max-w-md mx-auto my-6"
         style={{
           background: attempt.passed
             ? 'linear-gradient(135deg, #ECFDF5 0%, #FFFFFF 100%)'
             : 'linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 100%)',
           border: attempt.passed ? '2px solid #10B981' : '2px solid #FDA4AF',
         }}>
      
      {/* Medallion Icon */}
      <div
        className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl shadow-lg"
        style={{
          background: attempt.passed
            ? 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #34D399 40%, #10B981 100%)'
            : 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FB7185 40%, #F43F5E 100%)',
          boxShadow: attempt.passed
            ? '0 0 25px rgba(16, 185, 129, 0.4), inset 0 2px 4px #FFFFFF'
            : '0 0 25px rgba(244, 63, 94, 0.4), inset 0 2px 4px #FFFFFF',
        }}
      >
        {attempt.passed ? '🦪' : '📖'}
      </div>

      {/* Outcome Title */}
      <h2 className={`text-2xl font-black mb-1 ${attempt.passed ? 'text-emerald-900' : 'text-rose-900'}`}>
        {attempt.passed ? 'EXAMINATION PASSED' : 'NEEDS REVISION'}
      </h2>
      <div className="text-base font-nastaliq font-bold mb-4" style={{ color: attempt.passed ? '#047857' : '#BE123C' }}>
        {attempt.passed ? 'کامیاب — مبارک ہو!' : 'دوبارہ محنت کی ضرورت ہے — گھبرائیں نہیں!'}
      </div>

      {/* Score and Grade Stats */}
      <div className="grid grid-cols-3 gap-2 bg-white/90 p-3 rounded-2xl border border-slate-200 mb-5">
        <div>
          <div className="text-[11px] text-slate-400 font-bold uppercase">Score</div>
          <div className="text-xl font-black text-slate-800">
            {attempt.score}/{attempt.total}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400 font-bold uppercase">Percentage</div>
          <div className={`text-xl font-black ${attempt.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
            {attempt.percentage}%
          </div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400 font-bold uppercase">BISE Grade</div>
          <div className="text-xl font-black text-purple-600">
            {attempt.grade}
          </div>
        </div>
      </div>

      {/* Threshold indicator */}
      <div className="text-xs text-slate-500 mb-5 flex items-center justify-center gap-1.5 font-medium">
        <span>BISE Swat Passing Threshold: <strong>33%</strong></span>
        {attempt.passed ? (
          <span className="text-emerald-600 font-bold">✓ Met</span>
        ) : (
          <span className="text-rose-600 font-bold">✗ Below</span>
        )}
      </div>

      {/* Weak Topics Analysis */}
      {attempt.weakTopics && attempt.weakTopics.length > 0 && (
        <div className="text-left bg-white p-3.5 rounded-2xl border border-slate-200 mb-5">
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-2">
            <AlertCircle size={14} className="text-amber-500" /> Focus Areas to Review:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {attempt.weakTopics.map((topic, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onRetry}
          className="pearl-btn pearl-btn-gold w-full text-sm font-bold flex items-center justify-center gap-2"
        >
          <RotateCcw size={15} /> Try Test Again (دوبارہ ٹیسٹ دیں)
        </button>
        <button
          onClick={onBackToSyllabus}
          className="pearl-btn pearl-btn-ghost w-full text-sm font-bold flex items-center justify-center gap-2"
        >
          Return to Syllabus <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
