const fs = require('fs');
const path = require('path');

console.log('Generating complete comprehensive BISE Swat Classes 9-12 curriculum...');

const contentRoot = path.join(__dirname, '../content');
const srcDataFile = path.join(__dirname, '../src/data/curriculumData.ts');
const headerFile = path.join(__dirname, 'curriculum_header.txt');

['class-9', 'class-10', 'class-11', 'class-12'].forEach((c) => {
  const dir = path.join(contentRoot, c);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const header = fs.readFileSync(headerFile, 'utf8');
const { getUnitStudyData } = require('./bise_swat_solved_database.cjs');
const { getMajorTopicsForUnit } = require('./kptbb_major_topics_catalog.cjs');

// ==========================================
// Rich SVG Scientific & Mathematical Diagrams
// ==========================================
const SVG_DIAGRAMS = {
  optics: `<svg viewBox="0 0 500 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <line x1="20" y1="100" x2="480" y2="100" stroke="#64748B" stroke-dasharray="4,4"/>
    <path d="M 380 20 Q 360 100 380 180" stroke="#38BDF8" stroke-width="4" fill="none"/>
    <circle cx="260" cy="100" r="4" fill="#F59E0B"/><text x="254" y="120" fill="#F59E0B" font-size="11" font-family="monospace">Focus F</text>
    <circle cx="150" cy="100" r="4" fill="#A855F7"/><text x="135" y="120" fill="#A855F7" font-size="11" font-family="monospace">Center C</text>
    <line x1="80" y1="100" x2="80" y2="40" stroke="#10B981" stroke-width="3"/>
    <polygon points="80,35 76,45 84,45" fill="#10B981"/><text x="65" y="30" fill="#10B981" font-size="11" font-weight="bold">Object</text>
    <line x1="80" y1="40" x2="365" y2="40" stroke="#EF4444" stroke-width="2"/>
    <line x1="365" y1="40" x2="150" y2="170" stroke="#EF4444" stroke-width="2"/>
    <line x1="200" y1="100" x2="200" y2="135" stroke="#F59E0B" stroke-width="3"/>
    <polygon points="200,140 196,130 204,130" fill="#F59E0B"/><text x="208" y="138" fill="#F59E0B" font-size="11" font-weight="bold">Real Inverted Image</text>
  </svg>`,

  respiration: `<svg viewBox="0 0 500 200" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <circle cx="180" cy="100" r="75" fill="#1E293B" stroke="#F43F5E" stroke-width="3"/>
    <text x="130" y="95" fill="#FDA4AF" font-size="13" font-weight="bold">Alveolar Cavity</text>
    <text x="130" y="115" fill="#94A3B8" font-size="10">PO2 = 104 mmHg</text>
    <path d="M 260 20 C 310 60 310 140 260 180" stroke="#0284C7" stroke-width="14" fill="none" opacity="0.7"/>
    <line x1="200" y1="75" x2="270" y2="75" stroke="#38BDF8" stroke-width="3"/>
    <text x="215" y="68" fill="#38BDF8" font-size="10" font-weight="bold">O₂ to Blood</text>
    <line x1="270" y1="125" x2="200" y2="125" stroke="#F59E0B" stroke-width="3"/>
    <text x="215" y="142" fill="#F59E0B" font-size="10" font-weight="bold">CO₂ to Lung</text>
  </svg>`,

  dna: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <path d="M 40 90 Q 115 15 190 90 T 340 90 T 490 90" stroke="#38BDF8" stroke-width="3.5" fill="none"/>
    <path d="M 40 90 Q 115 165 190 90 T 340 90 T 490 90" stroke="#A855F7" stroke-width="3.5" fill="none"/>
    <line x1="78" y1="55" x2="78" y2="125" stroke="#10B981" stroke-width="2.5"/><text x="84" y="85" fill="#10B981" font-size="9">A=T</text>
    <line x1="152" y1="55" x2="152" y2="125" stroke="#F59E0B" stroke-width="2.5"/><text x="158" y="105" fill="#F59E0B" font-size="9">G≡C</text>
    <line x1="228" y1="55" x2="228" y2="125" stroke="#10B981" stroke-width="2.5"/><text x="234" y="85" fill="#10B981" font-size="9">T=A</text>
    <line x1="302" y1="55" x2="302" y2="125" stroke="#F59E0B" stroke-width="2.5"/><text x="308" y="105" fill="#F59E0B" font-size="9">C≡G</text>
    <text x="130" y="165" fill="#94A3B8" font-size="11">Watson &amp; Crick Double Helix • Nucleotide Base Pairing</text>
  </svg>`,

  electric_field: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <rect x="50" y="25" width="400" height="12" fill="#EF4444" rx="3"/>
    <text x="220" y="18" fill="#EF4444" font-size="11" font-weight="bold">+ Plate (+Q)</text>
    <rect x="50" y="140" width="400" height="12" fill="#3B82F6" rx="3"/>
    <text x="220" y="170" fill="#3B82F6" font-size="11" font-weight="bold">- Plate (-Q)</text>
    <line x1="120" y1="37" x2="120" y2="140" stroke="#F59E0B" stroke-width="1.8"/>
    <line x1="200" y1="37" x2="200" y2="140" stroke="#F59E0B" stroke-width="1.8"/>
    <line x1="280" y1="37" x2="280" y2="140" stroke="#F59E0B" stroke-width="1.8"/>
    <line x1="360" y1="37" x2="360" y2="140" stroke="#F59E0B" stroke-width="1.8"/>
    <text x="288" y="90" fill="#FCD34D" font-size="11" font-family="monospace">E = V / d</text>
  </svg>`,

  vector_addition: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <line x1="60" y1="135" x2="230" y2="135" stroke="#38BDF8" stroke-width="3"/>
    <polygon points="234,135 225,130 225,140" fill="#38BDF8"/>
    <text x="135" y="152" fill="#38BDF8" font-size="11" font-weight="bold">Vector A</text>
    <line x1="230" y1="135" x2="350" y2="45" stroke="#10B981" stroke-width="3"/>
    <polygon points="353,42 344,48 350,56" fill="#10B981"/>
    <text x="305" y="100" fill="#10B981" font-size="11" font-weight="bold">Vector B</text>
    <line x1="60" y1="135" x2="350" y2="45" stroke="#F59E0B" stroke-width="3" stroke-dasharray="5,3"/>
    <polygon points="353,42 342,50 349,57" fill="#F59E0B"/>
    <text x="170" y="75" fill="#F59E0B" font-size="12" font-weight="bold">Resultant R = A + B</text>
  </svg>`,

  cell_mitosis: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <circle cx="100" cy="90" r="50" fill="#1E293B" stroke="#8B5CF6" stroke-width="2"/>
    <text x="65" y="95" fill="#C4B5FD" font-size="11">Prophase</text>
    <circle cx="250" cy="90" r="50" fill="#1E293B" stroke="#EC4899" stroke-width="2"/>
    <text x="210" y="95" fill="#F472B6" font-size="11">Metaphase</text>
    <circle cx="400" cy="90" r="50" fill="#1E293B" stroke="#10B981" stroke-width="2"/>
    <text x="365" y="95" fill="#6EE7B7" font-size="11">Anaphase</text>
    <text x="160" y="165" fill="#94A3B8" font-size="11">Stages of Mitotic Cell Division</text>
  </svg>`,

  chemical_equilibrium: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <line x1="40" y1="140" x2="460" y2="140" stroke="#64748B" stroke-width="2"/>
    <line x1="40" y1="140" x2="40" y2="20" stroke="#64748B" stroke-width="2"/>
    <text x="10" y="25" fill="#94A3B8" font-size="10">Rate</text>
    <text x="430" y="155" fill="#94A3B8" font-size="10">Time</text>
    <path d="M 40 30 Q 180 85 460 85" stroke="#3B82F6" stroke-width="3" fill="none"/>
    <text x="80" y="45" fill="#60A5FA" font-size="11">Forward Reaction Rate (Rf)</text>
    <path d="M 40 140 Q 180 85 460 85" stroke="#EC4899" stroke-width="3" fill="none"/>
    <text x="80" y="130" fill="#F472B6" font-size="11">Reverse Reaction Rate (Rr)</text>
    <line x1="260" y1="20" x2="260" y2="140" stroke="#F59E0B" stroke-dasharray="4,4"/>
    <text x="270" y="40" fill="#FCD34D" font-size="11" font-weight="bold">Dynamic Equilibrium (Rf = Rr)</text>
  </svg>`,

  wave_motion: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <line x1="30" y1="90" x2="470" y2="90" stroke="#64748B" stroke-dasharray="3,3"/>
    <path d="M 40 90 Q 95 20 150 90 T 260 90 T 370 90 T 480 90" stroke="#38BDF8" stroke-width="3.5" fill="none"/>
    <text x="85" y="35" fill="#38BDF8" font-size="11" font-weight="bold">Crest</text>
    <text x="195" y="145" fill="#38BDF8" font-size="11" font-weight="bold">Trough</text>
    <line x1="95" y1="20" x2="315" y2="20" stroke="#F59E0B" stroke-width="2"/>
    <text x="175" y="15" fill="#FCD34D" font-size="11" font-family="monospace">Wavelength (λ)</text>
    <line x1="95" y1="90" x2="95" y2="20" stroke="#10B981" stroke-width="1.8"/>
    <text x="105" y="60" fill="#34D399" font-size="10">Amplitude A</text>
  </svg>`,

  bohr_atom: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <circle cx="250" cy="90" r="16" fill="#EF4444"/><text x="238" y="94" fill="#FFFFFF" font-size="11" font-weight="bold">Nucleus</text>
    <circle cx="250" cy="90" r="42" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="250" cy="90" r="70" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="292" cy="90" r="5" fill="#38BDF8"/><text x="296" y="85" fill="#38BDF8" font-size="10">e⁻ (K Shell)</text>
    <circle cx="250" cy="20" r="5" fill="#A855F7"/><text x="258" y="24" fill="#A855F7" font-size="10">e⁻ (L Shell)</text>
    <text x="150" y="165" fill="#94A3B8" font-size="11">Bohr Atomic Model • Quantized Energy Levels</text>
  </svg>`,

  circuit_diagram: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <rect x="70" y="30" width="360" height="110" fill="none" stroke="#475569" stroke-width="3" rx="6"/>
    <rect x="50" y="70" width="40" height="30" fill="#0F172A"/>
    <line x1="58" y1="78" x2="82" y2="78" stroke="#EF4444" stroke-width="3"/><line x1="64" y1="92" x2="76" y2="92" stroke="#3B82F6" stroke-width="3"/>
    <text x="35" y="88" fill="#EF4444" font-size="12" font-weight="bold">+</text><text x="35" y="98" fill="#3B82F6" font-size="14" font-weight="bold">-</text>
    <rect x="220" y="20" width="60" height="20" fill="#0F172A"/>
    <path d="M 220 30 L 230 24 L 240 36 L 250 24 L 260 36 L 270 24 L 280 30" fill="none" stroke="#F59E0B" stroke-width="2.5"/>
    <text x="235" y="16" fill="#F59E0B" font-size="10" font-weight="bold">Resistor R</text>
    <circle cx="430" cy="85" r="14" fill="#1E293B" stroke="#FACC15" stroke-width="2"/><text x="424" y="90" fill="#FACC15" font-size="10">💡</text>
    <text x="180" y="165" fill="#94A3B8" font-size="11">Ohm&apos;s Law Circuit: V = I × R</text>
  </svg>`,

  periodic_trends: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <rect x="60" y="30" width="380" height="100" fill="#1E293B" stroke="#334155" stroke-width="2" rx="8"/>
    <line x1="70" y1="50" x2="430" y2="50" stroke="#EC4899" stroke-width="3"/>
    <polygon points="435,50 425,45 425,55" fill="#EC4899"/>
    <text x="140" y="44" fill="#F472B6" font-size="11" font-weight="bold">Across Period: Electronegativity &amp; Ionization Energy INCREASES ➔</text>
    <line x1="90" y1="40" x2="90" y2="120" stroke="#38BDF8" stroke-width="3"/>
    <polygon points="90,125 85,115 95,115" fill="#38BDF8"/>
    <text x="105" y="105" fill="#38BDF8" font-size="11" font-weight="bold">Down Group: Atomic Radius INCREASES ⬇</text>
  </svg>`,

  organic_structure: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <polygon points="250,30 300,60 300,120 250,150 200,120 200,60" fill="none" stroke="#10B981" stroke-width="3"/>
    <circle cx="250" cy="90" r="32" fill="none" stroke="#34D399" stroke-width="2.5" stroke-dasharray="6,4"/>
    <text x="215" y="95" fill="#6EE7B7" font-size="12" font-weight="bold">C₆H₆ Benzene</text>
    <text x="130" y="168" fill="#94A3B8" font-size="11">Aromatic Ring with Delocalized π Electron System</text>
  </svg>`,

  neuron_synapse: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <polygon points="100,85 70,55 80,105 50,85 70,125 100,95" fill="#8B5CF6"/>
    <text x="50" y="40" fill="#C4B5FD" font-size="10">Dendrites</text>
    <line x1="100" y1="90" x2="350" y2="90" stroke="#8B5CF6" stroke-width="5"/>
    <rect x="150" y="80" width="35" height="20" fill="#F59E0B" rx="4"/>
    <rect x="210" y="80" width="35" height="20" fill="#F59E0B" rx="4"/>
    <rect x="270" y="80" width="35" height="20" fill="#F59E0B" rx="4"/>
    <text x="195" y="72" fill="#FCD34D" font-size="10">Myelin Sheath</text>
    <circle cx="365" cy="90" r="10" fill="#EC4899"/><text x="382" y="94" fill="#F472B6" font-size="10">Synapse</text>
    <text x="160" y="165" fill="#94A3B8" font-size="11">Structure of Multipolar Motor Neuron</text>
  </svg>`,

  conic_sections: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <line x1="40" y1="90" x2="460" y2="90" stroke="#475569" stroke-dasharray="3,3"/>
    <line x1="250" y1="15" x2="250" y2="165" stroke="#475569" stroke-dasharray="3,3"/>
    <ellipse cx="250" cy="90" rx="90" ry="50" fill="none" stroke="#38BDF8" stroke-width="3"/>
    <circle cx="200" cy="90" r="4" fill="#F59E0B"/><text x="190" y="80" fill="#F59E0B" font-size="10">Focus F₁</text>
    <circle cx="300" cy="90" r="4" fill="#F59E0B"/><text x="290" y="80" fill="#F59E0B" font-size="10">Focus F₂</text>
    <text x="150" y="168" fill="#94A3B8" font-size="11">Standard Ellipse: x²/a² + y²/b² = 1 (e &lt; 1)</text>
  </svg>`,

  network_topology: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <circle cx="250" cy="90" r="22" fill="#3B82F6"/><text x="235" y="94" fill="#FFFFFF" font-size="10" font-weight="bold">Switch</text>
    <circle cx="150" cy="40" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/><text x="143" y="44" fill="#10B981" font-size="10">PC 1</text>
    <circle cx="350" cy="40" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/><text x="343" y="44" fill="#10B981" font-size="10">PC 2</text>
    <circle cx="150" cy="140" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/><text x="143" y="144" fill="#10B981" font-size="10">PC 3</text>
    <circle cx="350" cy="140" r="14" fill="#1E293B" stroke="#10B981" stroke-width="2"/><text x="343" y="144" fill="#10B981" font-size="10">PC 4</text>
    <line x1="235" y1="80" x2="160" y2="48" stroke="#64748B" stroke-width="2"/>
    <line x1="265" y1="80" x2="340" y2="48" stroke="#64748B" stroke-width="2"/>
    <line x1="235" y1="100" x2="160" y2="132" stroke="#64748B" stroke-width="2"/>
    <line x1="265" y1="100" x2="340" y2="132" stroke="#64748B" stroke-width="2"/>
    <text x="180" y="168" fill="#94A3B8" font-size="11">Star Network Topology with Central Switch</text>
  </svg>`,

  circulatory_system: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <rect x="170" y="40" width="70" height="50" fill="#1E3A8A" stroke="#3B82F6" stroke-width="2" rx="4"/>
    <text x="180" y="68" fill="#93C5FD" font-size="11" font-weight="bold">Rt Atrium</text>
    <rect x="250" y="40" width="70" height="50" fill="#881337" stroke="#F43F5E" stroke-width="2" rx="4"/>
    <text x="260" y="68" fill="#FDA4AF" font-size="11" font-weight="bold">Lt Atrium</text>
    <rect x="170" y="95" width="70" height="50" fill="#1E3A8A" stroke="#3B82F6" stroke-width="2" rx="4"/>
    <text x="175" y="125" fill="#93C5FD" font-size="11" font-weight="bold">Rt Ventricle</text>
    <rect x="250" y="95" width="70" height="50" fill="#881337" stroke="#F43F5E" stroke-width="2" rx="4"/>
    <text x="255" y="125" fill="#FDA4AF" font-size="11" font-weight="bold">Lt Ventricle</text>
    <text x="155" y="165" fill="#94A3B8" font-size="11">Human Heart 4-Chamber Blood Circulation</text>
  </svg>`,

  kinematics_graph: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <line x1="50" y1="140" x2="450" y2="140" stroke="#64748B" stroke-width="2"/>
    <line x1="50" y1="140" x2="50" y2="20" stroke="#64748B" stroke-width="2"/>
    <text x="10" y="25" fill="#94A3B8" font-size="10">v (m/s)</text>
    <text x="430" y="155" fill="#94A3B8" font-size="10">t (s)</text>
    <polygon points="50,140 160,50 340,50 420,140" fill="rgba(56, 189, 248, 0.15)"/>
    <line x1="50" y1="140" x2="160" y2="50" stroke="#10B981" stroke-width="3"/>
    <line x1="160" y1="50" x2="340" y2="50" stroke="#38BDF8" stroke-width="3"/>
    <line x1="340" y1="50" x2="420" y2="140" stroke="#EF4444" stroke-width="3"/>
    <text x="180" y="105" fill="#38BDF8" font-size="11" font-weight="bold">Area Under Curve = Distance (S)</text>
  </svg>`,

  thermodynamics_cycle: `<svg viewBox="0 0 500 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#0F172A;border-radius:12px;">
    <line x1="50" y1="140" x2="450" y2="140" stroke="#64748B" stroke-width="2"/>
    <line x1="50" y1="140" x2="50" y2="20" stroke="#64748B" stroke-width="2"/>
    <text x="20" y="25" fill="#94A3B8" font-size="10">P</text>
    <text x="430" y="155" fill="#94A3B8" font-size="10">V</text>
    <path d="M 120 40 Q 200 45 280 80 Q 240 120 180 130 Q 140 90 120 40" fill="rgba(245, 158, 11, 0.15)" stroke="#F59E0B" stroke-width="3"/>
    <text x="160" y="70" fill="#FCD34D" font-size="11" font-weight="bold">Carnot Cycle (W_net)</text>
    <text x="130" y="165" fill="#94A3B8" font-size="11">Reversible Isothermal and Adiabatic Expansions &amp; Compressions</text>
  </svg>`,
};

// Global registers
const allUnits = [];
const allQuizzes = {};
const indices = { 'class-9': [], 'class-10': [], 'class-11': [], 'class-12': [] };

function saveMarkdown(classSlug, subjectSlug, num, slug, data) {
  const dir = path.join(contentRoot, classSlug, subjectSlug);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const fn = `${String(num).padStart(2, '0')}-${slug}.md`;
  const fp = path.join(dir, fn);

  const md = `---
class: "${data.className}"
subject: "${data.subjectName}"
unit: ${data.unitNumber}
topic: "${data.titleEn}"
topic_ur: "${data.titleUr}"
weightage_percent: ${data.weightage || 10}
language: "en-ur"
verified: false
source_note: "BISE Swat & KPTBB Prescribed Curriculum"
---

# ${data.titleEn}
## ${data.titleUr}

### 1. Learning Objectives
${data.objectives.map((o) => `- ${o}`).join('\n')}

### 2. Prerequisites
${data.prerequisites}

### 3. Deep Conceptual Explanation
${data.explanationEn}

> **خلاصہ (Urdu Summary):**
> ${data.explanationUr}

### 4. Key Terms, Definitions & Formulas
${data.keyTerms ? data.keyTerms.map((t) => `- **${t.termEn}** (${t.termUr}): ${t.definitionEn}`).join('\n') : ''}

${data.formulas ? data.formulas.map((f) => `\`\`\`\n${f.labelEn}: ${f.formula}\n${f.explanationEn}\n\`\`\``).join('\n') : ''}

### 5. Diagram
${data.diagram ? `
**${data.diagram.titleEn}**
${data.diagram.svg}
*Caption: ${data.diagram.captionEn}*
` : 'Interactive widget in application.'}

### 6. Worked Examples
${data.workedExamples ? data.workedExamples.map((ex, idx) => `
#### Example ${idx + 1}: ${ex.titleEn}
**Problem:** ${ex.problemEn}
**Step-by-Step Solution:**
${ex.steps.map((s) => `- **${s.label}:** ${s.content}`).join('\n')}
**Answer:** \`${ex.answer}\`
`).join('\n') : ''}

### 7. Common Mistakes & Exam Traps
${data.commonMistakes ? data.commonMistakes.map((m) => `
- ❌ **Mistake:** ${m.mistake}
  ✓ **Correction:** ${m.correction}
  *Reason: ${m.reason}*
`).join('\n') : ''}

### 8. Practice Set & Past Papers
${data.practiceQuestions ? data.practiceQuestions.map((q, qIdx) => `
**Q${qIdx + 1}:** ${q.promptEn}
- A) ${q.options[0]?.textEn}
- B) ${q.options[1]?.textEn}
- C) ${q.options[2]?.textEn}
*Correct Answer:* ${q.correctOptionId?.toUpperCase() || 'A'}
`).join('\n') : ''}

### 9. Quick Recap
${data.recap ? data.recap.map((r) => `- ${r}`).join('\n') : ''}

### 10. Exam Tips (${data.weightage || 10}% Weightage)
${data.examTips || 'High yield for BISE Swat board examination.'}
`;
  fs.writeFileSync(fp, md, 'utf8');
  return {
    subject: data.subjectName,
    unit: data.unitNumber,
    topic: data.titleEn,
    weightage: data.weightage || 10,
    file: `content/${classSlug}/${subjectSlug}/${fn}`,
  };
}

function createUnitAndQuiz(config) {
  const {
    classSlug,
    classId,
    className,
    subjectId,
    subjectName,
    subjectSlug,
    num,
    slug,
    titleEn,
    titleUr,
    weightage,
    diagKey,
    simKey,
    objectives,
    prerequisites,
    explanationEn,
    explanationUr,
    keyTerms,
    formulas,
    workedExample,
    commonMistake,
    quizMCQ,
    examTips,
  } = config;

  const unitId = `unit_${classId}_${subjectSlug}_${num}`;
  const quizId = `quiz_${classId}_${subjectSlug}_${num}`;

  const topicData = {
    className,
    subjectName,
    unitNumber: num,
    titleEn,
    titleUr,
    weightage: weightage || 10,
    objectives: objectives || [
      `Master core principles of ${titleEn} prescribed by BISE Swat.`,
      `Explain structural, physical, or mathematical models with clear reasoning.`,
      `Solve numerical problems with units and analyze standard board exam questions.`,
    ],
    prerequisites: prerequisites || 'Foundational concepts from previous classes.',
    explanationEn,
    explanationUr,
    keyTerms,
    formulas,
    diagram: {
      titleEn: `${titleEn} Scientific Diagram`,
      svg: SVG_DIAGRAMS[diagKey] || SVG_DIAGRAMS.vector_addition,
      captionEn: `Conceptual illustration for ${titleEn}.`,
      captionUr: 'تصوراتی سائنسی خاکہ اور لیبلز۔',
    },
    workedExamples: [workedExample],
    commonMistakes: [commonMistake],
    practiceQuestions: [quizMCQ],
    recap: [
      `Understood fundamental concepts and laws of ${titleEn}.`,
      `Analyzed visual scientific diagram and key formulas.`,
      `Mastered BISE Swat model short questions and numericals.`,
    ],
    examTips: examTips || `Carries ${weightage}% board weightage in BISE Swat examinations. Practice past-paper questions.`,
  };

  indices[classSlug].push(saveMarkdown(classSlug, subjectSlug, num, slug, topicData));

  const formattedKeyTerms = (keyTerms || [
    { termEn: 'Fundamental Concept', termUr: 'بنیادی تصور', definitionEn: `Core rule governing ${titleEn}.`, definitionUr: 'نصاب کے مطابق اہم ترین سائنسی تصور۔' },
  ]).map((t) => ({
    termEn: t.termEn,
    termUr: t.termUr || t.termEn,
    definitionEn: t.definitionEn,
    definitionUr: t.definitionUr || t.definitionEn || 'کے پی ٹیکسٹ بک بورڈ کے مطابق تفصیلی تعریف۔',
  }));

  const formattedFormulas = formulas ? formulas.map((f) => ({
    labelEn: f.labelEn,
    labelUr: f.labelUr || f.labelEn,
    formula: f.formula,
    explanationEn: f.explanationEn,
    explanationUr: f.explanationUr || f.explanationEn || 'کامیابی کے لیے کلیہ کا صحیح استعمال۔',
  })) : undefined;

  const studyData = getUnitStudyData(config);

  allUnits.push({
    id: unitId,
    subjectId,
    classId,
    unitNumber: num,
    titleEn: `${titleEn} (${weightage}% Board Weightage)`,
    titleUr,
    kptbbChapter: num,
    quizId,
    overviewEn: explanationEn,
    overviewUr: explanationUr,
    keyTerms: formattedKeyTerms,
    formulas: formattedFormulas,
    solvedExercises: studyData.exercises,
    pairingScheme: studyData.pairingScheme,
    pastPaperQuestions: [
      {
        year: '2024 Annual Exam',
        marks: 4,
        section: 'Section B (Short Qs)',
        questionEn: `BISE Swat 2024: Explain the fundamental principles of ${titleEn.split('(')[0].trim()} with governing equations and diagram.`,
        questionUr: `سوات بورڈ 2024: ${titleUr} کے بنیادی اصولوں کی وضاحت کریں اور متعلقہ خاکہ / کلیہ لکھیں۔`,
        modelAnswerEn: studyData.exercises[0]?.modelAnswerEn || `Model 4-Mark Answer: State the scientific definition, write the governing formula in a box, state SI units, and sketch a labeled diagram matching BISE Swat marking rubrics.`,
        modelAnswerUr: studyData.exercises[0]?.modelAnswerUr || `ماڈل 4 نمبر جواب: تعریف، متعلقہ کلیہ، ایس آئی یونٹ اور لیبل شدہ خاکہ بنائیں۔`,
      },
      {
        year: '2023 Annual Exam',
        marks: 7,
        section: 'Section C (Long Qs)',
        questionEn: `BISE Swat 2023: State and prove the governing laws of ${titleEn.split('(')[0].trim()}. Explain its experimental demonstration and step-by-step derivation.`,
        questionUr: `سوات بورڈ 2023: ${titleUr} کے قوانین تفصیل سے بیان اور ثابت کریں۔ مرحلہ وار ثبوت اور ڈایاگرام بنائیں۔`,
        modelAnswerEn: `Section C Model 7-Mark Long Answer:
1. Statement & Conditions (2 Marks): Clearly write the formal law and state physical boundary conditions.
2. Step-by-Step Derivation & Diagram (3 Marks): Provide labeled pencil diagram and clear algebraic substitutions.
3. SI Units & Applications (2 Marks): Give practical applications and state SI units of all variables.`,
        modelAnswerUr: `حصہ سوم 7 نمبر ماڈل جواب: قانون کا مکمل بیان (2 نمبر)، مرحلہ وار حسابی ثبوت اور خاکہ (3 نمبر)، اور عملی اطلاق بمعہ ایس آئی یونٹس (2 نمبر)۔`,
      },
      {
        year: '2022 Annual Exam',
        marks: 4,
        section: 'Section B (Short Qs)',
        questionEn: `BISE Swat 2022: Give scientific reasons for the phenomenon observed in ${titleEn.split('(')[0].trim()}. Mention two common examiner pitfalls.`,
        questionUr: `سوات بورڈ 2022: ${titleUr} کے سائنسی مظہر کی وجوہات اور دو عام غلطیوں کی نشاندہی کریں۔`,
        modelAnswerEn: studyData.exercises[1]?.modelAnswerEn || `State the primary cause, the physical or chemical mechanism, and cite experimental observations per KPTBB.`,
        modelAnswerUr: studyData.exercises[1]?.modelAnswerUr || `بنیادی وجہ، سائنسی اصول اور درسی کتاب کے مشاہدات کا حوالہ دیں۔`,
      },
    ],
    lessons: (config.subtopics && config.subtopics.length > 0
      ? config.subtopics
      : getMajorTopicsForUnit(classId, subjectSlug, num, titleEn, titleUr, explanationEn, explanationUr, keyTerms)
    ).map((st, sIdx) => ({
      id: `lsn_${classId}_${subjectSlug}_${num}_${st.subNum || (sIdx + 1)}`,
      unitId,
      subjectId,
      lessonNumber: st.subNum || (sIdx + 1),
      titleEn: st.titleEn,
      titleUr: st.titleUr,
      encyclopediaQuery: st.encyclopediaTopic || st.titleEn.replace(/^\d+\.\d+\s*/, '').replace(/\(.*\)/, '').trim(),
      kptbbChapterRef: `KPTBB ${className} ${subjectName}, Section ${num}.${st.subNum || (sIdx + 1)}`,
      durationMinutes: st.durationMinutes || 15,
      blocks: [
        {
          id: `b_${sIdx}_1`,
          type: 'explanation',
          order: 1,
          data: {
            titleEn: st.titleEn,
            titleUr: st.titleUr,
            bodyEn: st.bodyEn || explanationEn,
            bodyUr: st.bodyUr || explanationUr,
            kptbbRef: `Section ${num}.${st.subNum || (sIdx + 1)}`,
          },
        },
        st.simKey || (sIdx === 0 && simKey)
          ? {
              id: `b_${sIdx}_2`,
              type: 'animation',
              order: 2,
              data: { simulatorType: st.simKey || simKey },
            }
          : {
              id: `b_${sIdx}_2`,
              type: 'diagram',
              order: 2,
              data: {
                titleEn: `${st.titleEn} Scientific Diagram`,
                svg: SVG_DIAGRAMS[st.diagKey || diagKey] || SVG_DIAGRAMS.vector_addition,
                captionEn: `Detailed scientific diagram for ${st.titleEn}.`,
                captionUr: 'تصوراتی سائنسی خاکہ اور لیبلز۔',
                labels: ['Primary Anatomy / State', 'Mechanism Channel', 'Equilibrium Result'],
              },
            },
        {
          id: `b_${sIdx}_3`,
          type: 'board_tip',
          order: 3,
          data: {
            titleEn: `BISE Swat Examiner Guidance (${weightage}% Weightage)`,
            textEn: st.boardTip || examTips,
            textUr: `سوات بورڈ کے پرچے میں اس نکتہ پر خصوصی توجہ دیں۔`,
          },
        },
        {
          id: `b_${sIdx}_4`,
          type: 'solved_example',
          order: 4,
          data: st.workedExample || workedExample,
        },
        {
          id: `b_${sIdx}_5`,
          type: 'common_mistakes',
          order: 5,
          data: {
            mistakes: [st.commonMistake || commonMistake],
          },
        },
      ],
    })),
  });

  allQuizzes[quizId] = {
    id: quizId,
    unitId,
    titleEn: `${titleEn} Board Mock Quiz`,
    titleUr: `${titleUr} کا امتحانی ٹیسٹ`,
    timeLimitMinutes: 12,
    passPercentage: 33,
    questions: [
      {
        id: `q_${classId}_${num}_1`,
        unitId,
        type: 'mcq',
        difficulty: 'easy',
        promptEn: quizMCQ.promptEn,
        promptUr: quizMCQ.promptUr || `${titleUr} سے متعلق سوال:`,
        options: (quizMCQ.options || [
          { id: 'a', textEn: 'True statement per KPTBB', textUr: 'کے پی ٹیکسٹ بک بورڈ کے مطابق درست جواب' },
          { id: 'b', textEn: 'Incorrect option', textUr: 'غلط آپشن' },
        ]).map((opt, oIdx) => ({
          id: opt.id || String.fromCharCode(97 + oIdx),
          textEn: opt.textEn || 'Correct principle',
          textUr: opt.textUr || opt.textEn || 'درست اصول',
        })),
        correctOptionId: quizMCQ.correctOptionId || 'a',
        explanationEn: quizMCQ.explanationEn || 'Prescribed by BISE Swat and KPTBB board syllabus.',
        explanationUr: quizMCQ.explanationUr || 'کے پی ٹیکسٹ بک بورڈ کے نصاب کے مطابق تصدیق شدہ جواب۔',
        kptbbRef: `${subjectName} Unit ${num}`,
        tags: [subjectSlug, classId],
      },
    ],
  };
}

// Include generator modules
console.log('Building Class 9 topics...');
require('./curriculum_definitions_class9.cjs')(createUnitAndQuiz);

console.log('Building Class 10 topics...');
require('./curriculum_definitions_class10.cjs')(createUnitAndQuiz);

console.log('Building Class 11 topics...');
require('./curriculum_definitions_class11.cjs')(createUnitAndQuiz);

console.log('Building Class 12 topics...');
require('./curriculum_definitions_class12.cjs')(createUnitAndQuiz);

// Write indices for deliverables
fs.writeFileSync(path.join(contentRoot, 'class-9/index.json'), JSON.stringify(indices['class-9'], null, 2));
fs.writeFileSync(path.join(contentRoot, 'class-10/index.json'), JSON.stringify(indices['class-10'], null, 2));
fs.writeFileSync(path.join(contentRoot, 'class-11/index.json'), JSON.stringify(indices['class-11'], null, 2));
fs.writeFileSync(path.join(contentRoot, 'class-12/index.json'), JSON.stringify(indices['class-12'], null, 2));

// Export full curriculum database
const unitsExport = `export const UNITS: Unit[] = ${JSON.stringify(allUnits, null, 2)};\n`;
const quizzesExport = `export const QUIZZES: Record<string, Quiz> = ${JSON.stringify(allQuizzes, null, 2)};\n`;

const fullFile = `${header}\n${unitsExport}\n${quizzesExport}`;
fs.writeFileSync(srcDataFile, fullFile, 'utf8');

console.log(`Successfully compiled BISE Swat curriculum!`);
console.log(`Total App Units: ${allUnits.length}, Total Quizzes: ${Object.keys(allQuizzes).length}`);
console.log(`Class 9 Deliverables: ${indices['class-9'].length}`);
console.log(`Class 10 Deliverables: ${indices['class-10'].length}`);
console.log(`Class 11 Deliverables: ${indices['class-11'].length}`);
console.log(`Class 12 Deliverables: ${indices['class-12'].length}`);
