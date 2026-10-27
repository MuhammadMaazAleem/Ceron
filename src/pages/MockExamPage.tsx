import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QuizRunner } from '../components/quiz/QuizRunner';
import { useApp } from '../context/AppContext';
import { SUBJECTS, QUIZZES } from '../data/curriculumData';
import { generate50McqQuizForUnit } from '../services/aiQuizGenerator';

const MockExamPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { units, activeProfile } = useApp();

  const unitId = searchParams.get('unitId');

  // Strictly filter units ONLY for active class
  const displayedUnits = useMemo(() => {
    return units.filter((u) => u.classId === activeProfile.classId);
  }, [units, activeProfile.classId]);

  // If a specific unit is requested via ?unitId=..., ensure it belongs to the active class
  const targetUnit = unitId
    ? displayedUnits.find((u) => u.id === unitId)
    : null;

  // Generate quiz if a specific unit is selected
  const generatedQuiz = useMemo(() => {
    if (!targetUnit) return null;
    const baseQuiz = targetUnit.quizId ? QUIZZES[targetUnit.quizId] : null;
    return generate50McqQuizForUnit(targetUnit, baseQuiz);
  }, [targetUnit?.id]);

  // If a unit is selected and quiz generated, show quiz runner
  if (targetUnit && generatedQuiz) {
    return (
      <QuizRunner
        quiz={generatedQuiz}
        childId={activeProfile.id}
        onRegenerateAiQuiz={() => {
          // Navigate to same URL to regenerate (React will remount)
          navigate(`/mock?unitId=${targetUnit.id}&t=${Date.now()}`, { replace: true });
        }}
        onExit={() => navigate('/mock', { replace: true })}
      />
    );
  }

  // Otherwise show the chapter selector
  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-1 sm:px-4">
      <div className="pearl-card p-4 sm:p-6 text-center bg-white border border-slate-200 shadow-md rounded-2xl mb-6 overflow-hidden">
        <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 inline-block mb-2">
          ✨ Official BISE Swat 20 MCQs Examination (Simple to Hard)
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
          AI Chapter Exam Generator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 font-medium max-w-xl mx-auto leading-relaxed">
          Choose any chapter below to launch an instant AI-generated 20-MCQ board examination calibrated progressively from Simple (Recall &amp; Definitions) to Medium (Formulas) to Hard (Calculations).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left">
          {displayedUnits.map((u) => {
            const sub = SUBJECTS.find((s) => s.id === u.subjectId);
            return (
              <button
                key={u.id}
                onClick={() => navigate(`/mock?unitId=${u.id}`)}
                className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition cursor-pointer flex items-center justify-between group shadow-xs hover:shadow-sm overflow-hidden box-border"
              >
                <div className="flex-1 min-w-0 pr-2 overflow-hidden text-left">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                      {sub?.nameEn || 'STEM'}
                    </span>
                    <span className="text-xs font-semibold text-purple-700">
                      Unit {u.unitNumber}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate block group-hover:text-purple-900">
                    {u.titleEn}
                  </h4>
                  <p className="text-xs font-nastaliq text-slate-600 truncate block mt-0.5" dir="rtl">
                    {u.titleUr}
                  </p>
                </div>
                <span className="text-xs font-semibold text-purple-700 shrink-0 bg-purple-100 group-hover:bg-purple-200 px-2.5 py-1 rounded-lg border border-purple-200 whitespace-nowrap ml-1">
                  20 MCQs
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MockExamPage;

