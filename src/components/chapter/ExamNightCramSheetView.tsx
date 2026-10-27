import React, { useState, useEffect } from 'react';
import { Unit, Subject } from '../../types';
import { CeronAIService, CramSheetResult } from '../../services/ceronAIService';
import { soundEngine } from '../../services/soundEngine';
import { marked } from 'marked';
import { sanitizeHtml } from '../../utils/sanitize';
import {
  Printer,
  Sparkles,
  RefreshCw,
  FileSpreadsheet,
  AlertTriangle,
  Layers,
} from 'lucide-react';

interface ExamNightCramSheetViewProps {
  unit: Unit;
  subject?: Subject;
  className?: string;
}

export const ExamNightCramSheetView: React.FC<ExamNightCramSheetViewProps> = ({
  unit,
  subject,
  className = 'Class 9',
}) => {
  const cacheKey = `ceron_cram_sheet_${unit.id}`;
  const [sheet, setSheet] = useState<CramSheetResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setSheet(JSON.parse(cached));
      } catch (err) {
        console.error('Failed to parse cached cram sheet', err);
      }
    }
  }, [cacheKey]);

  const handleGenerate = async (force: boolean = false) => {
    if (!force && sheet?.markdownContent) return;
    setLoading(true);
    setError(null);
    try {
      soundEngine.playPop();
      const result = await CeronAIService.generateCramSheet({
        chapterTitle: unit.titleEn,
        chapterNumber: unit.kptbbChapter || unit.unitNumber,
        subjectName: subject?.nameEn || 'General Science',
        className,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate cram sheet.');
      }

      setSheet(result);
      localStorage.setItem(cacheKey, JSON.stringify(result));
    } catch (err: any) {
      console.error('Failed to generate cram sheet:', err);
      setError(err?.message || 'Failed to generate cram sheet. Please check your network or Groq API connection.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    soundEngine.playPop();
    window.print();
  };

  return (
    <div className="space-y-5 cram-sheet-container">
      {/* ── Control Header (Hidden in Print) ────────────────────────── */}
      <div className="no-print bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              High-Yield Revision
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Official KPK / BISE Swat Pattern
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-indigo-600" />
            1-Page Exam Night Cram Sheet
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Ultra-concentrated high-yield summary: key laws/formulas, must-draw diagrams, and examiner traps.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {sheet?.markdownContent && (
            <button
              onClick={handlePrint}
              className="pearl-pill text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border-indigo-200 cursor-pointer flex items-center gap-1.5 py-2 px-3.5 transition-all shadow-xs"
              title="Print or Save as PDF"
            >
              <Printer size={14} /> Print / Save PDF
            </button>
          )}

          <button
            onClick={() => handleGenerate(true)}
            disabled={loading}
            className="pearl-pill text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 border-indigo-600 cursor-pointer flex items-center gap-1.5 py-2 px-3.5 transition-all shadow-xs disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw size={13} className="animate-spin" /> Generating...
              </>
            ) : sheet?.markdownContent ? (
              <>
                <RefreshCw size={13} /> Regenerate
              </>
            ) : (
              <>
                <Sparkles size={13} /> Generate Cram Sheet
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Empty State Prompt ──────────────────────────────────────── */}
      {!sheet?.markdownContent && !loading && !error && (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <FileSpreadsheet size={24} />
          </div>
          <h4 className="text-sm font-black text-slate-900">
            Generate 1-Page Exam Night Cram Sheet
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Synthesizes all critical laws, boxed formulas with SI units, crucial diagrams with grading labels, and the top 5 board exam questions for {unit.titleEn}.
          </p>
          <button
            onClick={() => handleGenerate(false)}
            className="pearl-pill text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 border-indigo-600 cursor-pointer inline-flex items-center gap-2 py-2.5 px-5 shadow-sm"
          >
            <Sparkles size={14} /> Generate Instant Cram Sheet
          </button>
        </div>
      )}

      {/* ── Loading Skeleton ────────────────────────────────────────── */}
      {loading && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4">
          <RefreshCw size={28} className="animate-spin text-indigo-600 mx-auto" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Synthesizing BISE Exam Night Cram Sheet...
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Extracting high-yield laws, required board diagram labels, and top repeated past paper questions.
            </p>
          </div>
        </div>
      )}

      {/* ── Error Banner ────────────────────────────────────────────── */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2.5">
          <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Failed to generate cram sheet</div>
            <div>{error}</div>
            <button
              onClick={() => handleGenerate(true)}
              className="text-xs font-bold text-red-900 underline mt-1 cursor-pointer block"
            >
              Click here to retry
            </button>
          </div>
        </div>
      )}

      {/* ── Printable High-Yield Cram Sheet ─────────────────────────── */}
      {sheet?.markdownContent && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs print:border-none print:shadow-none print:p-0 space-y-6">
          {/* Official Document Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-black uppercase tracking-widest text-indigo-700">
                BISE KPK Board Exam Night Rapid Revision Matrix
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 mt-0.5">
                {unit.titleEn}
              </h1>
              <div className="text-xs text-slate-600 font-medium mt-1 flex items-center gap-2">
                <span>{className}</span>
                <span>&bull;</span>
                <span>{subject?.nameEn || 'Syllabus'}</span>
                <span>&bull;</span>
                <span>Chapter {unit.kptbbChapter}</span>
              </div>
            </div>

            <div className="text-left sm:text-right text-[11px] text-slate-500">
              <span className="font-bold text-slate-900 block">KPK Textbook Board Standard</span>
              <span>100% Target Score Revision</span>
            </div>
          </div>

          {/* Render Markdown Content via Marked */}
          <div
            className="prose max-w-none text-slate-800 text-xs sm:text-sm"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(marked.parse(sheet.markdownContent) as string),
            }}
          />

          {/* Footer for Print */}
          <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
            64 Learning &bull; Ceron AI Academic Engine &bull; KPK &amp; BISE Swat Curricular Standard &bull; Page 1 of 1
          </div>
        </div>
      )}
    </div>
  );
};
