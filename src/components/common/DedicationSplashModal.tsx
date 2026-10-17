import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Heart, Sparkles, X, CheckCircle2, Star } from 'lucide-react';

interface DedicationSplashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DedicationSplashModal: React.FC<DedicationSplashModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isDuaMade, setIsDuaMade] = useState<boolean>(false);
  const [photoSize, setPhotoSize] = useState<'compact' | 'medium' | 'large'>('compact');
  const [duaCount, setDuaCount] = useState<number>(() => {
    const saved = localStorage.getItem('ceron_dedication_duas');
    return saved ? parseInt(saved, 10) : 1248;
  });
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; size: number }>>([]);

  if (!isOpen) return null;

  const handleMakeDua = () => {
    soundEngine.playCorrect();
    setIsDuaMade(true);
    const newCount = duaCount + 1;
    setDuaCount(newCount);
    localStorage.setItem('ceron_dedication_duas', String(newCount));

    // Spawn floating golden hearts
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
      size: Math.random() * 16 + 14,
    }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2500);
  };

  const getPhotoMaxHeightPx = () => {
    switch (photoSize) {
      case 'compact':
        return 140;
      case 'medium':
        return 220;
      case 'large':
        return 320;
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Times New Roman", Times, Georgia, serif',
        backgroundColor: 'rgba(2, 6, 23, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        overflowY: 'auto',
      }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 animate-fadeIn"
    >
      {/* ── CELESTIAL AMBIENT BACKGROUND GLOWS ─────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full blur-[130px] opacity-35"
          style={{ background: 'radial-gradient(circle, #D97706 0%, #78350F 50%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full blur-[110px] opacity-25"
          style={{ background: 'radial-gradient(circle, #059669 0%, #064E3B 50%, transparent 70%)' }}
        />
      </div>

      {/* ── FLOATING HEARTS ON DUA ─────────────────────────────────── */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed bottom-16 pointer-events-none z-50 flex items-center gap-1"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            color: '#FCD34D',
            animation: 'floatHeart 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          <Heart className="fill-amber-400 text-amber-300 drop-shadow-md" size={h.size} />
          <span style={{ fontSize: '12px', color: '#FEF3C7', fontWeight: 'bold' }}>آمین</span>
        </div>
      ))}

      {/* ── MODAL CONTAINER (HD TIMES NEW ROMAN LUXURY CARD) ───────── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl overflow-hidden my-auto flex flex-col transition-all shrink-0"
        style={{
          backgroundColor: '#070D1E',
          background: 'linear-gradient(180deg, #0B132B 0%, #070D1E 60%, #030712 100%)',
          border: '2px solid rgba(245, 158, 11, 0.75)',
          boxShadow: '0 0 60px rgba(0, 0, 0, 0.95), 0 0 45px rgba(217, 119, 6, 0.4)',
          color: '#FFFFFF',
          maxHeight: 'min(92vh, 680px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Ornate Gold Trim */}
        <div
          className="h-1.5 w-full shrink-0"
          style={{
            background: 'linear-gradient(90deg, #D97706 0%, #FDE68A 50%, #D97706 100%)',
          }}
        />

        {/* Top Header Bar */}
        <div
          className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between shrink-0"
          style={{
            backgroundColor: '#0F172A',
            borderBottom: '1px solid rgba(245, 158, 11, 0.35)',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'rgba(217, 119, 6, 0.25)',
                border: '1px solid rgba(245, 158, 11, 0.6)',
                color: '#FCD34D',
              }}
            >
              <Heart size={14} className="fill-amber-400 text-amber-300" />
            </span>
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ color: '#FCD34D' }}
              >
                <Sparkles size={11} /> Dedicated with Eternal Love
              </span>
              <h3 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: '#FEF3C7' }}>
                Baba Jan &amp; Mor Jan
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Adjustable Photo Size Switcher */}
            <div
              className="flex items-center rounded-lg p-0.5 text-[10px]"
              style={{
                backgroundColor: '#1E293B',
                border: '1px solid rgba(245, 158, 11, 0.4)',
              }}
            >
              <button
                onClick={() => setPhotoSize('compact')}
                className="px-2 py-0.5 rounded cursor-pointer transition font-bold"
                style={{
                  backgroundColor: photoSize === 'compact' ? '#F59E0B' : 'transparent',
                  color: photoSize === 'compact' ? '#0F172A' : '#CBD5E1',
                }}
                title="Compact size (fits all screens perfectly)"
              >
                Compact
              </button>
              <button
                onClick={() => setPhotoSize('medium')}
                className="px-2 py-0.5 rounded cursor-pointer transition font-bold"
                style={{
                  backgroundColor: photoSize === 'medium' ? '#F59E0B' : 'transparent',
                  color: photoSize === 'medium' ? '#0F172A' : '#CBD5E1',
                }}
                title="Medium photo view"
              >
                Medium
              </button>
              <button
                onClick={() => setPhotoSize('large')}
                className="px-2 py-0.5 rounded cursor-pointer transition font-bold"
                style={{
                  backgroundColor: photoSize === 'large' ? '#F59E0B' : 'transparent',
                  color: photoSize === 'large' ? '#0F172A' : '#CBD5E1',
                }}
                title="Expanded HD photo view"
              >
                HD
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg transition cursor-pointer text-xs ml-1"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#CBD5E1',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              title="Close dedication"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── MODAL CONTENT BODY (FULLY SCROLLABLE & RESPONSIVE) ──────────── */}
        <div
          className="p-4 sm:p-5 space-y-3.5 flex-1 modal-scroll"
          style={{
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            minHeight: 0,
          }}
        >
          {/* Holy Quranic Verse with Tashkeel */}
          <div
            className="text-center py-2.5 px-3 rounded-xl shadow-inner shrink-0"
            style={{
              backgroundColor: 'rgba(217, 119, 6, 0.18)',
              border: '1px solid rgba(245, 158, 11, 0.45)',
            }}
          >
            <div
              className="text-[11px] font-semibold mb-0.5 flex items-center justify-center gap-1"
              style={{ color: '#FCD34D' }}
            >
              <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            </div>
            <p
              className="text-base sm:text-xl font-bold font-arabic tracking-wide leading-relaxed"
              style={{ color: '#FDE68A' }}
              dir="rtl"
            >
              رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا
            </p>
            <p className="text-[11px] sm:text-xs mt-0.5 italic" style={{ color: '#FEF3C7' }}>
              &ldquo;My Lord! Be merciful to them as they raised me when I was small.&rdquo;
              <span className="not-italic ml-1 font-bold" style={{ color: '#F59E0B' }}>
                (Surah Al-Isra 17:24)
              </span>
            </p>
          </div>

          {/* ── THE PHOTO CARD (ADJUSTABLE, NATURAL HD FACES UNTOUCHED) ── */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-xl flex flex-col items-center justify-center shrink-0"
            style={{
              backgroundColor: '#020617',
              border: '2px solid rgba(245, 158, 11, 0.65)',
            }}
          >
            {/* Pure Unaltered Photo - Natural Aspect Ratio & Faces Preserved */}
            <img
              src="/dedication-parents.jpg"
              alt="Dedicated to Baba Jan & Mor Jan"
              style={{
                maxHeight: `${getPhotoMaxHeightPx()}px`,
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                transition: 'max-height 0.3s ease',
                userSelect: 'none',
              }}
            />

            {/* Bottom Caption Pill */}
            <div
              className="w-full px-3 py-1.5 flex items-center justify-between text-xs"
              style={{
                backgroundColor: 'rgba(2, 6, 23, 0.95)',
                borderTop: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <span
                className="font-bold text-xs sm:text-sm flex items-center gap-1.5"
                style={{ color: '#FEF3C7' }}
              >
                <Heart size={13} className="fill-rose-500 text-rose-500" />
                Baba Jan &amp; Mor Jan
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  color: '#FDE68A',
                  backgroundColor: 'rgba(217, 119, 6, 0.25)',
                  border: '1px solid rgba(245, 158, 11, 0.45)',
                }}
              >
                زما د بابا جان او مور جان په نوم
              </span>
            </div>
          </div>

          {/* Heartfelt Dedication Narrative & Plea for Duas */}
          <div className="text-center space-y-2 shrink-0">
            <h2
              style={{
                color: '#FEF3C7',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                letterSpacing: '0.02em',
                lineHeight: '1.3',
                margin: '0',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              Dedicated to My Beloved Baba Jan &amp; Mor Jan
            </h2>

            <p
              style={{
                color: '#F1F5F9',
                fontSize: '0.925rem',
                lineHeight: '1.65',
                maxWidth: '520px',
                margin: '0 auto',
                fontWeight: 400,
                textShadow: '0 1px 3px rgba(0,0,0,0.6)',
              }}
            >
              This academic platform and every drop of knowledge shared here is dedicated to my beloved
              parents, whose sacrifices, prayers, and unconditional love made everything possible.
              Every student who benefits is a continuous charity{' '}
              <strong style={{ color: '#FCD34D', fontWeight: 700 }}>(Sadaqah Jariyah)</strong> in their honor.
            </p>

            <div
              style={{
                backgroundColor: 'rgba(217, 119, 6, 0.22)',
                border: '1px solid rgba(245, 158, 11, 0.55)',
                borderRadius: '10px',
                padding: '8px 14px',
                display: 'inline-block',
                marginTop: '4px',
              }}
            >
              <p
                style={{
                  color: '#FEF3C7',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  lineHeight: '1.45',
                  margin: 0,
                }}
              >
                🤲 Please recite Surah Al-Fatiha or make sincere Duas for their health, peace, long life, and highest ranks in Jannat-ul-Firdaus.
              </p>
            </div>
          </div>

          {/* ── INTERACTIVE DUA / AMEEN ACTION BUTTON ──────────────── */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 shrink-0">
            <button
              onClick={handleMakeDua}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isDuaMade ? '#059669' : '#D97706',
                background: isDuaMade
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: isDuaMade ? '#FFFFFF' : '#0F172A',
                border: isDuaMade ? '1px solid #34D399' : '1px solid #FCD34D',
                fontWeight: 800,
                boxShadow: isDuaMade
                  ? '0 4px 14px rgba(5, 150, 105, 0.4)'
                  : '0 4px 14px rgba(217, 119, 6, 0.5)',
              }}
            >
              {isDuaMade ? (
                <>
                  <CheckCircle2 size={16} className="text-white" />
                  <span>آمین يا رب العالمين &bull; Dua Sent!</span>
                </>
              ) : (
                <>
                  <Heart size={16} className="fill-slate-950 text-slate-950" />
                  <span>🤲 Say Ameen (اللهم آمين) &bull; Send Sincere Dua</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#F8FAFC',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <span>Back to Academy</span>
            </button>
          </div>

          {/* Live Dua Counter */}
          <div
            className="flex items-center justify-center gap-1.5 text-[11px] shrink-0"
            style={{ color: '#FCD34D' }}
          >
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span>
              <strong style={{ color: '#FEF3C7', fontWeight: 'bold' }}>{duaCount.toLocaleString()}+</strong> Duas &amp; prayers recorded from visitors
            </span>
          </div>

          {isDuaMade && (
            <div
              className="p-2.5 rounded-xl text-xs text-center animate-fadeIn font-medium shrink-0"
              style={{
                backgroundColor: 'rgba(6, 78, 59, 0.9)',
                border: '1px solid rgba(52, 211, 153, 0.6)',
                color: '#D1FAE5',
                lineHeight: '1.5',
              }}
            >
              ✨ جزاك الله خيراً — May Allah SWT accept your sincere prayer and grant immense blessings, peace, and health to your parents as well!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
