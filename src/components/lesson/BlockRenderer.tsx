import React from 'react';
import { Block } from '../../types';
import { PearlCounterSimulator } from '../simulators/PearlCounterSimulator';
import { CellExplorerSimulator } from '../simulators/CellExplorerSimulator';
import { KinematicsSimulator } from '../simulators/KinematicsSimulator';
import { BreathingSimulator } from '../simulators/BreathingSimulator';
import { NephronSimulator } from '../simulators/NephronSimulator';
import { EquilibriumSimulator } from '../simulators/EquilibriumSimulator';
import { QuadraticSolverSimulator } from '../simulators/QuadraticSolverSimulator';
import { CircuitSimulator } from '../simulators/CircuitSimulator';
import { VectorSimulator } from '../simulators/VectorSimulator';
import { FlashcardDeck } from './FlashcardDeck';
import { PracticeQuestion } from './PracticeQuestion';
import { soundEngine } from '../../services/soundEngine';
import { BookOpen, Volume2, Bookmark, Lightbulb, CheckSquare, Eye, AlertTriangle } from 'lucide-react';
import { sanitizeHtml } from '../../utils/sanitize';

interface BlockRendererProps {
  blocks: Block[];
  languagePref: 'en' | 'ur';
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, languagePref }) => {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      {sorted.map((block) => {
        switch (block.type) {
          case 'explanation':
            return (
              <div key={block.id} className="pearl-card p-5 bg-white border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-semibold text-indigo-700">
                    <BookOpen size={14} /> Lesson Explanation
                  </span>
                  {block.data.kptbbRef && (
                    <span className="pearl-pill text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                      <Bookmark size={10} /> {block.data.kptbbRef}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                    {block.data.titleEn}
                  </h3>
                  <div className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                    {block.data.bodyEn}
                  </div>
                </div>
              </div>
            );

          case 'animation':
            if (block.data.simulatorType === 'pearl_counter') {
              return <PearlCounterSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'cell_explorer') {
              return <CellExplorerSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'kinematics_canvas') {
              return <KinematicsSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'breathing_simulator') {
              return <BreathingSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'nephron_simulator') {
              return <NephronSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'equilibrium_simulator') {
              return <EquilibriumSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'quadratic_simulator') {
              return <QuadraticSolverSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'circuit_simulator') {
              return <CircuitSimulator key={block.id} />;
            }
            if (block.data.simulatorType === 'vector_simulator') {
              return <VectorSimulator key={block.id} />;
            }
            return null;

          case 'audio':
            return (
              <div key={block.id} className="pearl-card p-5" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="pearl-pill text-xs text-blue-700 bg-white">
                    <Volume2 size={13} /> Phonics & Pronunciation
                  </span>
                  <span className="text-xs font-semibold text-slate-600">{block.data.titleEn}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {block.data.words?.map((item: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => soundEngine.playPop()}
                      className="p-3 bg-white rounded-2xl border border-blue-100 shadow-sm text-center hover:border-blue-300 active:scale-95 transition-all cursor-pointer"
                    >
                      <div className="font-bold text-sm text-slate-800">{item.en}</div>
                      <div className="font-nastaliq text-xs text-blue-600 font-bold mt-1">{item.ur}</div>
                    </button>
                  ))}
                </div>
              </div>
            );

          case 'flashcard':
            return <FlashcardDeck key={block.id} data={block.data as any} />;

          case 'practice':
            return <PracticeQuestion key={block.id} data={block.data as any} />;

          // Rich Visual / SVG Diagram Block
          case 'diagram':
            return (
              <div key={block.id} className="pearl-card p-5 bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-purple-700 flex items-center gap-1.5">
                    <Eye size={15} /> {block.data.titleEn || 'Scientific Diagram'}
                  </span>
                  {block.data.labels && (
                    <span className="pearl-pill text-[10px] bg-purple-50 text-purple-800">
                      {block.data.labels.length} Key Labels
                    </span>
                  )}
                </div>
                {block.data.svg ? (
                  <div
                    className="my-3 flex justify-center bg-slate-900/5 p-3 rounded-xl border border-slate-100 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(block.data.svg) }}
                  />
                ) : block.data.imageUrl ? (
                  <img src={block.data.imageUrl} alt={block.data.titleEn} className="w-full rounded-xl my-3" />
                ) : null}
                <p className="text-xs text-slate-600 font-medium italic mt-2 text-center">
                  {block.data.captionEn}
                </p>
              </div>
            );

          // Common Mistakes in BISE Exams
          case 'common_mistakes':
            return (
              <div key={block.id} className="pearl-card p-4.5 bg-rose-50/40 border border-rose-300">
                <div className="flex items-center gap-2 mb-2 text-rose-800 font-black text-xs uppercase tracking-wider">
                  <AlertTriangle size={16} className="text-rose-600" />
                  Common Board Exam Mistakes &amp; How to Avoid Them
                </div>
                <div className="space-y-2">
                  {block.data.items?.map((item: any, iIdx: number) => (
                    <div key={iIdx} className="bg-white p-3 rounded-xl border border-rose-100 text-xs shadow-xs">
                      <div className="text-rose-700 font-bold mb-1 flex items-center gap-1.5">
                        <span className="text-red-500 font-black">❌ Mistake:</span> {item.mistake}
                      </div>
                      <div className="text-emerald-700 font-semibold mb-1 flex items-center gap-1.5">
                        <span className="text-emerald-600 font-black">✓ Correct:</span> {item.correction}
                      </div>
                      {item.reason && (
                        <div className="text-slate-500 text-[11px] font-normal pl-4 border-l-2 border-slate-200 mt-1">
                          <strong>Why:</strong> {item.reason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );

          // Rich Board Exam Tip Block
          case 'board_tip':
            return (
              <div
                key={block.id}
                className="pearl-card p-4.5 bg-amber-50 border border-amber-200"
              >
                <div className="flex items-center gap-2 mb-2 text-amber-800">
                  <Lightbulb size={18} className="text-amber-600" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    {block.data.titleEn || 'BISE Swat High-Yield Board Tip'}
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium mb-1">
                  {block.data.textEn}
                </p>
              </div>
            );

          // Solved Numerical or Worked Example
          case 'solved_example':
            return (
              <div
                key={block.id}
                className="pearl-card p-5"
                style={{
                  background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
                  border: '1.5px solid #10B981',
                }}
              >
                <div className="flex items-center justify-between text-xs text-emerald-800 mb-2 font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare size={16} className="text-emerald-600" />
                    {block.data.titleEn || 'Solved Textbook Example'}
                  </span>
                  <span className="pearl-pill text-[10px] bg-emerald-100 text-emerald-900">
                    {block.data.reference || 'KPTBB Board Paper'}
                  </span>
                </div>

                <div className="text-xs text-slate-800 font-semibold mb-3">
                  {block.data.problemEn}
                </div>

                {block.data.steps?.map((step: any, sIdx: number) => (
                  <div key={sIdx} className="bg-white/80 p-2.5 rounded-xl border border-emerald-100 mb-2 text-xs">
                    <div className="text-[11px] font-bold text-emerald-900 mb-0.5">{step.label}</div>
                    <div className="font-mono text-slate-700">{step.content}</div>
                  </div>
                ))}

                <div className="p-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-between">
                  <span>Final Answer:</span>
                  <span className="font-mono font-black">{block.data.answer}</span>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
