import React, { useState } from 'react';
import { soundEngine } from '../../services/soundEngine';
import { Info, Sparkles } from 'lucide-react';

interface Organelle {
  id: string;
  nameEn: string;
  nameUr: string;
  color: string;
  descEn: string;
  descUr: string;
  cx: number;
  cy: number;
  r: number;
}

export const CellExplorerSimulator: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('nucleus');

  const organelles: Organelle[] = [
    {
      id: 'nucleus',
      nameEn: 'Nucleus (نیوکلیئس)',
      nameUr: 'نیوکلیئس — خلیے کا کنٹرول روم',
      color: '#8B5CF6',
      descEn: 'The control center of the cell. It stores hereditary information (DNA) and directs all cellular activities.',
      descUr: 'خلیے کا دماغ کہلاتا ہے۔ اس میں وراثتی مادہ (ڈی این اے) ہوتا ہے اور یہ خلیے کے تمام افعال کو کنٹرول کرتا ہے۔',
      cx: 140,
      cy: 110,
      r: 32,
    },
    {
      id: 'chloroplast',
      nameEn: 'Chloroplast (کلوروپلاسٹ)',
      nameUr: 'کلوروپلاسٹ — خوراک بنانے کا کارخانہ',
      color: '#10B981',
      descEn: 'Contains green chlorophyll pigment. Traps sunlight energy to carry out photosynthesis in plant cells.',
      descUr: 'اس میں سبز مادہ کلوروفل ہوتا ہے۔ یہ سورج کی روشنی جذب کر کے ضیائی تالیف (Photosynthesis) کے ذریعے خوراک بناتا ہے۔',
      cx: 80,
      cy: 65,
      r: 22,
    },
    {
      id: 'mitochondria',
      nameEn: 'Mitochondria (مائٹوکونڈریا)',
      nameUr: 'مائٹوکونڈریا — پاور ہاؤس',
      color: '#F59E0B',
      descEn: 'Powerhouse of the cell. Converts glucose and oxygen into usable cellular energy (ATP) through respiration.',
      descUr: 'خلیے کا پاور ہاؤس ہے۔ یہ خوراک کو توڑ کر خلیے کو توانائی (ATP) فراہم کرتا ہے۔',
      cx: 210,
      cy: 145,
      r: 20,
    },
    {
      id: 'cellwall',
      nameEn: 'Cell Wall (سیل وال)',
      nameUr: 'سیل وال — بیرونی حفاظتی دیوار',
      color: '#059669',
      descEn: 'A tough outer layer made of cellulose. Provides structural support, shape, and protection to plant cells.',
      descUr: 'سیلولوز سے بنی سخت بیرونی دیوار جو پودے کے خلیے کو مضبوطی، شکل اور بیرونی دباؤ سے تحفظ دیتی ہے۔',
      cx: 40,
      cy: 110,
      r: 14,
    },
    {
      id: 'vacuole',
      nameEn: 'Central Vacuole (مرکزی ویکیول)',
      nameUr: 'ویکیول — پانی کا ذخیرہ',
      color: '#06B6D4',
      descEn: 'Large fluid-filled sac storing water, sugars, and salts, maintaining internal turgor pressure.',
      descUr: 'ایک بڑا سیال سے بھرا تھیلا جو پانی اور نمکیات محفوظ کرتا ہے اور خلیے کو تروتازہ رکھتا ہے۔',
      cx: 150,
      cy: 175,
      r: 26,
    },
  ];

  const active = organelles.find((o) => o.id === selectedId) || organelles[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    soundEngine.playPop();
  };

  return (
    <div className="pearl-card p-6 my-4" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #FAF5FF 100%)' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="pearl-pill text-xs" style={{ background: '#FFFFFF', color: '#10B981' }}>
          <Sparkles size={14} /> Biology Interactive Explorer
        </span>
        <span className="text-xs text-slate-500 font-medium">KPTBB Class 6 Science</span>
      </div>

      <h4 className="text-lg font-bold text-slate-800 text-center">
        Explore the Plant Cell (پودے کا خلیہ)
      </h4>
      <p className="text-xs text-center text-slate-500 mb-4">
        Tap on any organelle inside the cell to inspect its function
      </p>

      {/* SVG Interactive Cell Map */}
      <div className="flex justify-center my-3">
        <svg viewBox="0 0 280 230" className="w-full max-w-xs drop-shadow-md">
          {/* Rigid Hexagonal Plant Cell Wall */}
          <polygon
            points="25,45 140,15 255,45 255,185 140,215 25,185"
            fill="#ECFDF5"
            stroke="#059669"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Inner Plasma Membrane */}
          <polygon
            points="32,50 140,24 248,50 248,180 140,207 32,180"
            fill="#F0FDF4"
            stroke="#34D399"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Cytoplasm Background */}
          <text x="50" y="45" fill="#A7F3D0" fontSize="10" fontWeight="bold">CYTOPLASM</text>

          {/* Organelles */}
          {organelles.map((org) => {
            const isSelected = org.id === selectedId;
            return (
              <g key={org.id} onClick={() => handleSelect(org.id)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={org.cx}
                  cy={org.cy}
                  r={org.r}
                  fill={org.color}
                  opacity={isSelected ? 0.95 : 0.75}
                  stroke={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
                  strokeWidth={isSelected ? 3 : 1.5}
                />
                {isSelected && (
                  <circle
                    cx={org.cx}
                    cy={org.cy}
                    r={org.r + 6}
                    fill="none"
                    stroke={org.color}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="animate-spin"
                    style={{ transformOrigin: `${org.cx}px ${org.cy}px` }}
                  />
                )}
                <text
                  x={org.cx}
                  y={org.cy + 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {org.nameEn.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Organelle Card */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-4 border border-emerald-100 shadow-sm mt-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: active.color }} />
          <h5 className="font-bold text-slate-800 text-sm">{active.nameEn}</h5>
        </div>
        <p className="text-xs text-slate-600 mb-2 leading-relaxed">{active.descEn}</p>
        <div className="pt-2 border-t border-slate-100 font-nastaliq text-sm text-emerald-800 font-bold">
          {active.nameUr}
        </div>
        <p className="text-xs font-nastaliq text-slate-600 mt-1">{active.descUr}</p>
      </div>

      {/* Quick Organelle Selector Chips */}
      <div className="flex flex-wrap gap-1.5 justify-center mt-3">
        {organelles.map((org) => (
          <button
            key={org.id}
            onClick={() => handleSelect(org.id)}
            className="text-xs px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: org.id === selectedId ? org.color : '#FFFFFF',
              color: org.id === selectedId ? '#FFFFFF' : '#475569',
              border: '1px solid #E2E8F0',
            }}
          >
            {org.nameEn.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};
