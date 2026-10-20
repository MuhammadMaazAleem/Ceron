import React, { useState, useRef, useEffect } from 'react';
import { ALL_CLASSES } from '../../data/curriculumData';
import { GraduationCap, ChevronDown, Check, Sparkles } from 'lucide-react';

interface ClassSelectorDropdownProps {
  activeClassId: string;
  onSelectClass: (classId: string) => void;
}

export const ClassSelectorDropdown: React.FC<ClassSelectorDropdownProps> = ({
  activeClassId,
  onSelectClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const activeClass = ALL_CLASSES.find((c) => c.id === activeClassId) || ALL_CLASSES[1];

  const matricClasses = ALL_CLASSES.filter((c) => c.stage === 'Matric');
  const fscClasses = ALL_CLASSES.filter((c) => c.stage === 'Intermediate (FSc)');

  const handleSelect = (classId: string) => {
    onSelectClass(classId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
          isOpen
            ? 'bg-indigo-50/90 border-indigo-300 text-indigo-900 ring-2 ring-indigo-500/10'
            : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800 hover:border-slate-300'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title="Switch Academic Class (BISE Swat)"
      >
        <div className="w-5 h-5 rounded-lg bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0">
          <GraduationCap size={13} className="text-indigo-600" />
        </div>

        <div className="flex items-center gap-1.5 text-left">
          <span className="font-bold text-slate-900 text-xs sm:text-[13px] tracking-tight whitespace-nowrap">
            {activeClass.nameEn}
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/70">
            {activeClass.stage === 'Matric' ? 'Matric' : 'FSc'}
          </span>
        </div>

        <ChevronDown
          size={14}
          className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-indigo-600' : ''
          }`}
        />
      </button>

      {/* ── Floating Popover Menu ── */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 sm:w-88 bg-white/98 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl z-50 p-2 animate-fadeIn overflow-hidden">
          {/* Header Banner */}
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                BISE Swat Board
              </span>
              <h4 className="text-xs font-bold text-slate-900">
                Select Your Academic Class
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              4 Classes
            </span>
          </div>

          <div className="p-1 space-y-3 max-h-96 overflow-y-auto">
            {/* ── Matriculation Section ── */}
            <div>
              <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>🎓</span>
                <span>Matriculation (Classes 9 &amp; 10)</span>
              </div>
              <div className="space-y-1 mt-1">
                {matricClasses.map((cls) => {
                  const isSelected = cls.id === activeClassId;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => handleSelect(cls.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/90 border-indigo-200/90 shadow-2xs'
                          : 'bg-white hover:bg-slate-50/90 border-transparent hover:border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {cls.gradeLevel}th
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span className={isSelected ? 'text-indigo-950 font-extrabold' : ''}>
                              {cls.nameEn}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-nastaliq" dir="rtl">
                            {cls.nameUr}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Intermediate (FSc) Section ── */}
            <div>
              <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>🏛️</span>
                <span>Intermediate College (FSc Pre-Med &amp; Pre-Eng)</span>
              </div>
              <div className="space-y-1 mt-1">
                {fscClasses.map((cls) => {
                  const isSelected = cls.id === activeClassId;
                  return (
                    <button
                      key={cls.id}
                      type="button"
                      onClick={() => handleSelect(cls.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/90 border-indigo-200/90 shadow-2xs'
                          : 'bg-white hover:bg-slate-50/90 border-transparent hover:border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {cls.gradeLevel}th
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span className={isSelected ? 'text-indigo-950 font-extrabold' : ''}>
                              {cls.nameEn}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-nastaliq" dir="rtl">
                            {cls.nameUr}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ClassSelectorDropdown;
