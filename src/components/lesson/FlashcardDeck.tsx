import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { ChevronLeft, ChevronRight, RotateCw, Lightbulb } from 'lucide-react';

interface Flashcard {
  front: string;
  back: string;
  hint?: string;
}

interface FlashcardDeckProps {
  data: {
    titleEn: string;
    titleUr: string;
    cards: Flashcard[];
  };
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const card = data.cards[currentIndex] || data.cards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    soundEngine.playPop();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % data.cards.length);
    soundEngine.playPop();
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + data.cards.length) % data.cards.length);
    soundEngine.playPop();
  };

  return (
    <div className="pearl-card p-5 my-4" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFFFF 100%)' }}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
          <Lightbulb size={16} className="text-amber-500" /> {data.titleEn}
        </h4>
        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
          Card {currentIndex + 1} of {data.cards.length}
        </span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={handleFlip}
        className="w-full h-44 rounded-2xl cursor-pointer p-6 flex flex-col items-center justify-center text-center transition-all duration-300 transform active:scale-95 border border-amber-200 shadow-md relative"
        style={{
          background: isFlipped
            ? 'linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%)'
            : 'linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 100%)',
        }}
      >
        <span className="absolute top-3 right-3 text-[11px] text-slate-400 flex items-center gap-1">
          <RotateCw size={11} /> Tap to flip (پلٹیں)
        </span>

        {!isFlipped ? (
          <div>
            <div className="text-xl font-extrabold text-slate-800 mb-2">
              {card.front}
            </div>
            {card.hint && (
              <div className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-medium inline-block">
                Hint: {card.hint}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="text-sm font-nastaliq text-slate-800 font-bold mb-1 leading-relaxed">
              {card.back}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-2">
              ✓ Pearl Memory Stored
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={handlePrev}
          className="pearl-btn py-1.5 px-3 text-xs bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1"
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <button
          onClick={handleFlip}
          className="text-xs font-semibold text-amber-700 underline cursor-pointer"
        >
          {isFlipped ? 'Show Front' : 'Show Answer'}
        </button>
        <button
          onClick={handleNext}
          className="pearl-btn py-1.5 px-3 text-xs bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
