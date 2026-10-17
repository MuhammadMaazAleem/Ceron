import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { soundEngine } from '../../services/soundEngine';
import { ALL_CLASSES, SUBJECTS } from '../../data/curriculumData';
import { Unit } from '../../types';
import { X, Plus, Check, BookOpen } from 'lucide-react';

interface AdminStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentUpdated: () => void;
}

export const AdminStudioModal: React.FC<AdminStudioModalProps> = ({
  isOpen,
  onClose,
  onContentUpdated,
}) => {
  // Form states for creating a new Lesson
  const [classId, setClassId] = useState<string>('class_1');
  const [subjectId, setSubjectId] = useState<string>('sub_math');
  const [unitTitleEn, setUnitTitleEn] = useState<string>('');
  const [unitTitleUr, setUnitTitleUr] = useState<string>('');
  const [lessonTitleEn, setLessonTitleEn] = useState<string>('');
  const [lessonTitleUr, setLessonTitleUr] = useState<string>('');
  const [explanationEn, setExplanationEn] = useState<string>('');
  const [explanationUr, setExplanationUr] = useState<string>('');
  const [kptbbRef, setKptbbRef] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitleEn.trim()) return;

    const newUnit: Unit = {
      id: `custom_unit_${Date.now()}`,
      subjectId,
      classId,
      unitNumber: 99,
      titleEn: unitTitleEn || 'Custom Unit',
      titleUr: unitTitleUr || 'خصوصی یونٹ',
      kptbbChapter: 99,
      lessons: [
        {
          id: `custom_lsn_${Date.now()}`,
          unitId: `custom_unit_${Date.now()}`,
          subjectId,
          lessonNumber: 1,
          titleEn: lessonTitleEn,
          titleUr: lessonTitleUr || lessonTitleEn,
          kptbbChapterRef: kptbbRef || 'Family Curriculum Special',
          durationMinutes: 10,
          blocks: [
            {
              id: `blk_exp_${Date.now()}`,
              type: 'explanation',
              order: 1,
              data: {
                titleEn: lessonTitleEn,
                titleUr: lessonTitleUr,
                bodyEn: explanationEn,
                bodyUr: explanationUr,
                kptbbRef: kptbbRef,
              },
            },
          ],
        },
      ],
    };

    StorageService.addCustomUnit(newUnit);
    soundEngine.playCorrect();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onContentUpdated();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="pearl-card w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <BookOpen size={18} />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                Curriculum Editor (نصاب سازی)
              </h3>
              <p className="text-xs text-slate-500">
                Add or customize lessons for any grade from KG to 12th
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Direct Content Form - No Password Needed */}
        <form onSubmit={handleCreateContent} className="space-y-3.5 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Target Class (جماعت)</label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                {ALL_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Subject (مضمون)</label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                {SUBJECTS.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.nameEn} ({sub.nameUr})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              Unit Title (English & Urdu)
            </label>
            <input
              type="text"
              placeholder="Unit Title e.g. Unit 3: Environmental Science"
              value={unitTitleEn}
              onChange={(e) => setUnitTitleEn(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs mb-1.5"
            />
            <input
              type="text"
              placeholder="یونٹ کا عنوان (اردو)"
              value={unitTitleUr}
              onChange={(e) => setUnitTitleUr(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs font-nastaliq"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              Lesson Title (English & Urdu)
            </label>
            <input
              type="text"
              required
              placeholder="Lesson 3.1: Air Pollution"
              value={lessonTitleEn}
              onChange={(e) => setLessonTitleEn(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs mb-1.5"
            />
            <input
              type="text"
              placeholder="سبق کا عنوان (اردو)"
              value={lessonTitleUr}
              onChange={(e) => setLessonTitleUr(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs font-nastaliq"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              Lesson Explanation (English)
            </label>
            <textarea
              rows={3}
              placeholder="Write clear conceptual explanation..."
              value={explanationEn}
              onChange={(e) => setExplanationEn(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              اردو وضاحت (Urdu Nastaliq Body)
            </label>
            <textarea
              rows={3}
              placeholder="اردو میں سبق کا مفہوم تحریر کریں..."
              value={explanationUr}
              onChange={(e) => setExplanationUr(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs font-nastaliq leading-loose"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              KPTBB Textbook Reference (کتاب کا حوالہ)
            </label>
            <input
              type="text"
              placeholder="e.g. KPTBB Chapter 3, Page 35"
              value={kptbbRef}
              onChange={(e) => setKptbbRef(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          {savedSuccess ? (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5">
              <Check size={16} /> Saved! Lesson is immediately live for all children.
            </div>
          ) : (
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="pearl-btn pearl-btn-ghost w-1/2 py-2 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="pearl-btn pearl-btn-gold w-1/2 py-2 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Plus size={14} /> Publish to Family
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
