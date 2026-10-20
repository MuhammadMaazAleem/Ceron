import React from 'react';
import { ALL_CLASSES } from '../../data/curriculumData';
import { CeronLogo } from './CeronLogo';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  Atom,
} from 'lucide-react';

interface ClassSelectionPortalProps {
  currentClassId?: string;
  onSelectClass: (classId: string) => void;
  onCancel?: () => void;
  canCancel?: boolean;
}

export const ClassSelectionPortal: React.FC<ClassSelectionPortalProps> = ({
  currentClassId,
  onSelectClass,
  onCancel,
  canCancel = false,
}) => {
  const classDetails = [
    {
      id: 'class_9',
      grade: 'Grade 9 • SSC Part 1',
      badge: 'Matriculation',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: '🔬',
      subjects: 'Biology, Physics, Chemistry, Mathematics, Computer Science',
      desc: 'Foundation curriculum with full KPTBB chapter syllabus, solved numericals, and board MCQs.',
    },
    {
      id: 'class_10',
      grade: 'Grade 10 • SSC Part 2',
      badge: 'Matric Board Exam',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: '📚',
      subjects: 'Biology, Physics, Chemistry, Mathematics, Computer Science',
      desc: 'Final board examination preparation with 20-MCQ exams, past paper models, and examiner tips.',
    },
    {
      id: 'class_11',
      grade: 'Grade 11 • HSSC Part 1',
      badge: 'FSc Intermediate',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: '⚡',
      subjects: 'Pre-Medical & Pre-Engineering (Physics, Chemistry, Biology, Math)',
      desc: 'College level science concepts with mathematical derivations, biological pathways, and solved exercises.',
    },
    {
      id: 'class_12',
      grade: 'Grade 12 • HSSC Part 2',
      badge: 'FSc Board Exam',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: '🧬',
      subjects: 'Pre-Medical & Pre-Engineering (Physics, Chemistry, Biology, Math)',
      desc: 'Comprehensive final intermediate board syllabus with high-yield past paper archives and exam night notes.',
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* ── Top Header ── */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex justify-center mb-2">
          <CeronLogo size={46} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <GraduationCap size={14} />
          <span>BISE Swat Academic Curriculum</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Your Class to Begin
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
          Choose your grade below to access your syllabus, interactive chapter guides, step-by-step solved exercises, and personalized 24/7 AI board tutor.
        </p>

        <p className="text-xs text-slate-500 font-nastaliq" dir="rtl">
          اپنے مطالعے کے لیے متعلقہ جماعت کا انتخاب کریں
        </p>
      </div>

      {/* ── 4 Class Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ALL_CLASSES.map((cls) => {
          const detail = classDetails.find((d) => d.id === cls.id);
          const isCurrent = currentClassId === cls.id;

          return (
            <div
              key={cls.id}
              onClick={() => onSelectClass(cls.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between group shadow-xs hover:shadow-md ${
                isCurrent
                  ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-indigo-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header Strip */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{detail?.icon || '📖'}</span>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        {detail?.grade}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-indigo-600 transition">
                        {cls.nameEn}
                      </h3>
                    </div>
                  </div>

                  {detail?.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${detail.badgeColor}`}
                    >
                      {detail.badge}
                    </span>
                  )}
                </div>

                {/* Urdu title */}
                <div className="text-xs font-semibold text-slate-500 font-nastaliq pt-0.5" dir="rtl">
                  {cls.nameUr}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {detail?.desc}
                </p>

                {/* Subjects pill */}
                <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 leading-tight">
                  <strong className="text-slate-700">Subjects: </strong>
                  {detail?.subjects}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                  <span>Enter {cls.nameEn.split('(')[0].trim()}</span>
                  <ArrowRight size={14} />
                </span>

                {isCurrent && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-600" /> Currently Selected
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel button if student already has a class and just wanted to check */}
      {canCancel && onCancel && (
        <div className="text-center mt-6">
          <button
            onClick={onCancel}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
          >
            ← Return to current class
          </button>
        </div>
      )}
    </div>
  );
};
export default ClassSelectionPortal;
