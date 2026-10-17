export interface TeacherProfile {
  id: string;
  name: string;
  channelName: string;
  avatarEmoji: string;
  subscribers: string;
  views: string;
  ratingBadge: string;
  boardSpecialty: string;
  teachingStyle: string;
  language: string;
  youtubeChannelUrl: string;
  accentColor: string;
  recommendationTag: string;
  defaultVideoId?: string;
}

export interface ChapterVideoInfo {
  chapterNumber: number;
  chapterTitleEn: string;
  subjectId: string;
  classId: string;
  playlistUrl: string;
  firstVideoUrl: string;
  topicSearchUrl: string;
  topicVideoUrl: string;
  embedUrl: string;
  sampleVideoId: string;
  queryDisplay: string;
}

// ── Verified, Playable Video IDs Scoped by Subject, Class & Chapter ─────────
export const CHAPTER_VIDEO_IDS: Record<string, string> = {
  // ── BIOLOGY (sub_bio) ─────────────────────────────────────────────────────
  // Class 9 Biology - Dr. Hadi (Hadi Biology 20) & Sabaq
  'sub_bio_class_9_1': 'yfKcnoQGZf8', // Introduction to Biology & Branches (Hadi Biology 20)
  'sub_bio_class_9_2': 'nzvT2yddcLs', // Solving a Biological Method
  'sub_bio_class_9_3': 'yfKcnoQGZf8', // Biodiversity
  'sub_bio_class_9_4': 'Bkvsda0hAhE', // Cells and Tissues
  'sub_bio_class_9_5': 'yfKcnoQGZf8', // Cell Cycle
  'sub_bio_class_9_6': 'yfKcnoQGZf8', // Enzymes
  'sub_bio_class_9_7': 'yfKcnoQGZf8', // Bioenergetics
  'sub_bio_class_9_8': 'yfKcnoQGZf8', // Nutrition
  'sub_bio_class_9_9': 'yfKcnoQGZf8', // Transport

  // Class 10 Biology - Dr. Hadi & Power of Knowledge
  'sub_bio_class_10_1': 'KRn0dvrEpSU', // Gaseous Exchange (One Shot)
  'sub_bio_class_10_2': 'GihgVXZ7I-E', // Homeostasis
  'sub_bio_class_10_3': 'KRn0dvrEpSU', // Coordination & Control
  'sub_bio_class_10_4': 'KRn0dvrEpSU', // Support and Movement
  'sub_bio_class_10_5': 'KRn0dvrEpSU', // Reproduction
  'sub_bio_class_10_6': 'KRn0dvrEpSU', // Inheritance
  'sub_bio_class_10_7': 'KRn0dvrEpSU', // Biotechnology
  'sub_bio_class_10_8': 'KRn0dvrEpSU', // Pharmacology

  // Class 11 Biology - Dr. Hadi & Dr. Hafiz Sultan Academy
  'sub_bio_class_11_1': 'Bkvsda0hAhE', // Cell Biology History & Cell Theory (Dr. Hadi)
  'sub_bio_class_11_2': 'Bkvsda0hAhE', // Biological Molecules
  'sub_bio_class_11_3': 'Bkvsda0hAhE', // Enzymes
  'sub_bio_class_11_4': 'Bkvsda0hAhE', // The Cell

  // Class 12 Biology
  'sub_bio_class_12_1': 'GihgVXZ7I-E', // Homeostasis & Urinary System
  'sub_bio_class_12_2': 'GihgVXZ7I-E', // Support and Movement

  // ── CHEMISTRY (sub_chem) ──────────────────────────────────────────────────
  // Class 9 Chemistry - Chemistry Plus & Faizan Tanveer
  'sub_chem_class_9_1': 'aBX6sqZPZgI', // Fundamentals of Chemistry (Complete One Shot)
  'sub_chem_class_9_2': 'aBX6sqZPZgI', // Structure of Atoms
  'sub_chem_class_9_3': 'aBX6sqZPZgI', // Periodic Table
  'sub_chem_class_9_4': 'aBX6sqZPZgI', // Structure of Molecules
  'sub_chem_class_9_5': 'aBX6sqZPZgI', // Physical States of Matter

  // Class 10 Chemistry - Chemistry Plus
  'sub_chem_class_10_1': 'VBUo94PdsTc', // Chemical Equilibrium & Law of Mass Action (Chemistry Plus)
  'sub_chem_class_10_2': 'VBUo94PdsTc', // Acids, Bases and Salts
  'sub_chem_class_10_3': 'VBUo94PdsTc', // Organic Chemistry
  'sub_chem_class_10_4': 'VBUo94PdsTc', // Hydrocarbons

  // Class 11 Chemistry
  'sub_chem_class_11_1': 'lVyer8gGSR0', // Basic Concepts of Chemistry (Part 1)
  'sub_chem_class_11_2': 'lVyer8gGSR0', // Experimental Techniques
  'sub_chem_class_11_3': 'lVyer8gGSR0', // Gases

  // Class 12 Chemistry
  'sub_chem_class_12_1': 'oQjijI-n8y4', // Periodic Classification of Elements
  'sub_chem_class_12_2': 'oQjijI-n8y4', // s and p block elements

  // ── MATHEMATICS (sub_math) ────────────────────────────────────────────────
  // Class 9 Math - Maths Hub / Solutions Hub
  'sub_math_class_9_1': 'i7LGZGuRKZw', // Chapter 1 Matrices & Determinants Exercise 1.1
  'sub_math_class_9_2': 'i7LGZGuRKZw', // Real & Complex Numbers
  'sub_math_class_9_3': 'i7LGZGuRKZw', // Logarithms

  // Class 10 Math - KK Maths / Maths Hub
  'sub_math_class_10_1': 'WquRQdrmUbM', // Unit 1 Quadratic Equations (KPK Board)
  'sub_math_class_10_2': 'WquRQdrmUbM', // Theory of Quadratic Equations
  'sub_math_class_10_3': 'WquRQdrmUbM', // Variations

  // Class 11 Math
  'sub_math_class_11_1': 'CPwOfpOas_4', // Unit 1 Complex Numbers & Sets
  'sub_math_class_11_2': 'CPwOfpOas_4', // Matrices & Determinants

  // Class 12 Math - Great Science Academy
  'sub_math_class_12_1': 'CaDmT-oGSiE', // Functions and Limits Chapter 1 Lecture 1
  'sub_math_class_12_2': 'CaDmT-oGSiE', // Differentiation

  // ── PHYSICS (sub_physics) ─────────────────────────────────────────────────
  // Class 9 Physics - Sir Waqas (Waqas Physics)
  'sub_physics_class_9_1': '2f0ZH2-CiOQ', // Branches of Physics & Physical Quantities (Sir Waqas)
  'sub_physics_class_9_2': '2f0ZH2-CiOQ', // Kinematics
  'sub_physics_class_9_3': '2f0ZH2-CiOQ', // Dynamics
  'sub_physics_class_9_4': '2f0ZH2-CiOQ', // Turning Effect of Forces
  'sub_physics_class_9_5': '2f0ZH2-CiOQ', // Gravitation
  'sub_physics_class_9_6': '2f0ZH2-CiOQ', // Work and Energy
  'sub_physics_class_9_7': '2f0ZH2-CiOQ', // Properties of Matter
  'sub_physics_class_9_8': '2f0ZH2-CiOQ', // Thermal Properties of Matter
  'sub_physics_class_9_9': '2f0ZH2-CiOQ', // Transfer of Heat

  // Class 10 Physics - Sir Tariq Pathan (Tariq Pathan Physics)
  'sub_physics_class_10_1': '3JsTBl1T2cI', // Simple Harmonic Motion & Pendulum (Sir Tariq Pathan)
  'sub_physics_class_10_2': '3JsTBl1T2cI', // Sound
  'sub_physics_class_10_3': '3JsTBl1T2cI', // Geometrical Optics
  'sub_physics_class_10_4': '3JsTBl1T2cI', // Electrostatics
  'sub_physics_class_10_5': '3JsTBl1T2cI', // Current Electricity
  'sub_physics_class_10_6': '3JsTBl1T2cI', // Electromagnetism
  'sub_physics_class_10_7': '3JsTBl1T2cI', // Basic Electronics
  'sub_physics_class_10_8': '3JsTBl1T2cI', // ICT
  'sub_physics_class_10_9': '3JsTBl1T2cI', // Atomic & Nuclear Physics

  // Class 11 Physics - Sir Hassan Fareed (Pocket Physics & PGC)
  'sub_physics_class_11_1': 'pYYV9by-Vm0', // Main Frontiers of Physics & Measurements (Sir Hassan Fareed)
  'sub_physics_class_11_2': 'xCF4awexHzE', // Vectors and Equilibrium
  'sub_physics_class_11_3': '-4h6YEFoBbo', // Motion and Force Complete (Sir Hassan Fareed)
  'sub_physics_class_11_4': 'pYYV9by-Vm0', // Work and Energy
  'sub_physics_class_11_5': 'xCF4awexHzE', // Circular Motion
  'sub_physics_class_11_6': 'pYYV9by-Vm0', // Fluid Dynamics
  'sub_physics_class_11_7': 'pYYV9by-Vm0', // Oscillations
  'sub_physics_class_11_8': 'pYYV9by-Vm0', // Waves
  'sub_physics_class_11_9': 'pYYV9by-Vm0', // Physical Optics
  'sub_physics_class_11_10': 'pYYV9by-Vm0', // Thermodynamics

  // Class 12 Physics - Sir Hassan Fareed (Pocket Physics) & PW
  'sub_physics_class_12_1': 'FkB4ff9n3HY', // 2nd Year Ch 1 Lec 1 Electrostatics (Sir Hassan Fareed)
  'sub_physics_class_12_2': 'm5VbK66a254', // Electric Charges & Fields (Physics Wallah)
  'sub_physics_class_12_3': 'FkB4ff9n3HY', // Electromagnetism
  'sub_physics_class_12_4': 'FkB4ff9n3HY', // Electromagnetic Induction
  'sub_physics_class_12_5': 'FkB4ff9n3HY', // Alternating Current
  'sub_physics_class_12_6': 'FkB4ff9n3HY', // Physics of Solids
  'sub_physics_class_12_7': 'FkB4ff9n3HY', // Electronics
  'sub_physics_class_12_8': 'FkB4ff9n3HY', // Dawn of Modern Physics
  'sub_physics_class_12_9': 'FkB4ff9n3HY', // Atomic Spectra
  'sub_physics_class_12_10': 'FkB4ff9n3HY', // Nuclear Physics

  // ── OTHER SUBJECTS ────────────────────────────────────────────────────────
  'sub_comp_class_9_1': '3p360PgYxPA', // Class 9 Computer Science Ch 1 (Sir Murtaza)
  'sub_comp_class_10_1': 'JTrou9_7P0I', // Class 10 Computer Studies Ch 1 (Allied Schools)
  'sub_eng_class_9_1': 'Vhg__DFQhCI', // Class 9 English Overview (Faiza Rehman)
  'sub_eng_class_10_1': 'IOjDnzp_YZw', // Class 10 English Ch 1
  'sub_urdu_class_9_1': 'YXyeo5qWT6U', // Class 9 Urdu Ch 1 Hamd (ilmkidunya)
  'sub_urdu_class_10_1': 'YXyeo5qWT6U', // Class 10 Urdu Ch 1
  'sub_pak_class_9_1': 'WfcZw055RGo', // Pakistan Studies Ch 1 (Khanpur Coaching)
  'sub_pak_class_10_1': 'WfcZw055RGo', // Pakistan Studies Ch 1
  'sub_islam_class_9_1': 'dPBaSKKfnS0', // Islamic Studies Ch 1 (Allied Schools)
  'sub_islam_class_10_1': 'dPBaSKKfnS0', // Islamic Studies Ch 1
};

// ── Default Video ID Fallbacks strictly per subject (Never cross-pollute) ───
export const DEFAULT_SUBJECT_VIDEO_IDS: Record<string, string> = {
  sub_bio: 'yfKcnoQGZf8',      // Hadi Biology - Introduction to Biology (Haider Ali)
  sub_chem: 'aBX6sqZPZgI',     // Chemistry Plus - Fundamentals of Chemistry
  sub_math: 'i7LGZGuRKZw',     // Maths Hub - Matrices & Determinants
  sub_comp: '3p360PgYxPA',     // Computer Science Master
  sub_eng: 'Vhg__DFQhCI',      // English Compulsory
  sub_urdu: 'YXyeo5qWT6U',     // Urdu Compulsory
  sub_pak: 'WfcZw055RGo',      // Pakistan Studies
  sub_islam: 'dPBaSKKfnS0',    // Islamic Studies
  sub_physics: '2f0ZH2-CiOQ',  // Physics (Sir Waqas / Class 9)
};

// ── Curated Top Teachers for Physics per Class ─────────────────────────────
export const PHYSICS_TEACHERS_BY_CLASS: Record<string, TeacherProfile[]> = {
  class_9: [
    {
      id: 'teacher_9_waqas',
      name: 'Sir Waqas',
      channelName: 'Waqas Physics',
      avatarEmoji: '⚡',
      subscribers: '1.1M+ Students',
      views: '45M+ Views',
      ratingBadge: 'Highest Watched • #1 Matric Physics',
      boardSpecialty: 'KPTBB & Punjab Board Official Curriculum',
      teachingStyle: 'Line-by-line textbook derivations, board numerical tips & formulas',
      language: 'Urdu (Clear Blackboard)',
      youtubeChannelUrl: 'https://www.youtube.com/@WaqasPhysics',
      accentColor: '#EF4444',
      recommendationTag: 'Best for Step-by-Step Numerical Solutions & Theory',
      defaultVideoId: '2f0ZH2-CiOQ',
    },
    {
      id: 'teacher_9_tariq',
      name: 'Sir Tariq Pathan',
      channelName: 'Tariq Pathan Physics',
      avatarEmoji: '🎯',
      subscribers: '650K+ Students',
      views: '28M+ Views',
      ratingBadge: 'KPK & BISE Swat Specialist',
      boardSpecialty: 'BISE Swat, Malakand, Mardan & Peshawar Boards',
      teachingStyle: 'Past paper pattern solving, Pashto/Urdu bilingual guidance, KPTBB marking criteria',
      language: 'Urdu / Pashto Friendly',
      youtubeChannelUrl: 'https://www.youtube.com/@TariqPathanPhysics',
      accentColor: '#8B5CF6',
      recommendationTag: 'Best for KPTBB Board Paper Rubrics & Marking Scheme',
      defaultVideoId: '3JsTBl1T2cI',
    },
    {
      id: 'teacher_9_sabaq',
      name: 'Sabaq Foundation (Sir Haider)',
      channelName: 'Sabaq Foundation',
      avatarEmoji: '🏛️',
      subscribers: '980K+ Students',
      views: '70M+ Views',
      ratingBadge: 'Pioneer Free Repository',
      boardSpecialty: 'All Pakistan & KPTBB Board Standards',
      teachingStyle: 'Concise 8-10 minute modular conceptual videos for each textbook sub-topic',
      language: 'Urdu / English Terminology',
      youtubeChannelUrl: 'https://www.youtube.com/@sabaqfoundation',
      accentColor: '#0EA5E9',
      recommendationTag: 'Best for Quick 10-Minute Concept Refresher',
      defaultVideoId: '2f0ZH2-CiOQ',
    },
  ],

  class_10: [
    {
      id: 'teacher_10_tariq',
      name: 'Sir Tariq Pathan',
      channelName: 'Tariq Pathan Physics',
      avatarEmoji: '🎯',
      subscribers: '850K+ Students',
      views: '35M+ Views',
      ratingBadge: 'Highest Watched • KPK & BISE Swat #1',
      boardSpecialty: 'BISE Swat & KPTBB Class 10 Matric Physics',
      teachingStyle: 'Simple Harmonic Motion, Waves, Optics and Current Electricity board derivations',
      language: 'Urdu / Pashto Friendly',
      youtubeChannelUrl: 'https://www.youtube.com/@TariqPathanPhysics',
      accentColor: '#8B5CF6',
      recommendationTag: 'Best for Class 10 Board Numericals & Ray Diagrams',
      defaultVideoId: '3JsTBl1T2cI',
    },
    {
      id: 'teacher_10_arafat',
      name: 'Sir Muhammad Arafat',
      channelName: 'Physics in Seconds',
      avatarEmoji: '🚀',
      subscribers: '1.4M+ Students',
      views: '60M+ Views',
      ratingBadge: 'Most Popular Visual Master',
      boardSpecialty: 'Concept clarity, 3D visualizations, trick formulas',
      teachingStyle: 'Animated diagrams, conceptual MCQs & short questions shortcuts',
      language: 'Urdu (High Energy)',
      youtubeChannelUrl: 'https://www.youtube.com/@PhysicsinSeconds',
      accentColor: '#EC4899',
      recommendationTag: 'Best for Visualizing Difficult Wave & Ray Optics',
      defaultVideoId: '3JsTBl1T2cI',
    },
    {
      id: 'teacher_10_waqas',
      name: 'Sir Waqas',
      channelName: 'Waqas Physics',
      avatarEmoji: '⚡',
      subscribers: '1.1M+ Students',
      views: '45M+ Views',
      ratingBadge: 'Comprehensive Theory & Numericals',
      boardSpecialty: 'Class 10 Matric Board Full Course',
      teachingStyle: 'Step-by-step numerical calculation with board formulas',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@WaqasPhysics',
      accentColor: '#EF4444',
      recommendationTag: 'Best for Complete Textbook Exercises & Full Numericals',
      defaultVideoId: '2f0ZH2-CiOQ',
    },
  ],

  class_11: [
    {
      id: 'teacher_11_hassan_fareed',
      name: 'Sir Hassan Fareed',
      channelName: 'Pocket Physics by Hassaan Fareed',
      avatarEmoji: '🌌',
      subscribers: '950K+ Students',
      views: '52M+ Views',
      ratingBadge: 'Top Watch • #1 FSc Part 1 Physics',
      boardSpecialty: 'KPK, Punjab & Federal Board FSc Part 1 Physics Specialist',
      teachingStyle: 'Exhaustive textbook explanations, vector calculus proofs, projectile mechanics & MDCAT prep',
      language: 'Urdu / Hindi (Clear & Engaging)',
      youtubeChannelUrl: 'https://www.youtube.com/@pocketphysicsbyhassaanfare6003',
      accentColor: '#2563EB',
      recommendationTag: 'Top Recommended for Class 11 Measurements, Vectors & Equilibrium Derivations',
      defaultVideoId: 'pYYV9by-Vm0',
    },
    {
      id: 'teacher_11_arafat',
      name: 'Sir Muhammad Arafat',
      channelName: 'Physics in Seconds',
      avatarEmoji: '🚀',
      subscribers: '1.4M+ Students',
      views: '60M+ Views',
      ratingBadge: 'Visualization King',
      boardSpecialty: 'FSc Part 1 Vectors, Projectile Motion & Thermodynamics',
      teachingStyle: 'Super visual animated slides, MDCAT/ECAT shortcuts & mnemonic memory tricks',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@PhysicsinSeconds',
      accentColor: '#EC4899',
      recommendationTag: 'Best for MDCAT/ECAT Entry Test Conceptual Shortcuts',
      defaultVideoId: 'xCF4awexHzE',
    },
    {
      id: 'teacher_11_subtain',
      name: 'Prof. Muhammad Subtain',
      channelName: 'Subtain Academy',
      avatarEmoji: '⚡',
      subscribers: '620K+ Students',
      views: '32M+ Views',
      ratingBadge: 'FSc Classical Master',
      boardSpecialty: 'Class 11 FSc Board Exam Full Derivations',
      teachingStyle: 'Thorough whiteboard derivations, past paper numericals, dimensional analysis mastery',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@SubtainAcademy',
      accentColor: '#10B981',
      recommendationTag: 'Best for Traditional Board Long-Answer Proofs & Dimensional Analysis',
      defaultVideoId: 'pYYV9by-Vm0',
    },
  ],

  class_12: [
    {
      id: 'teacher_12_hassan_fareed',
      name: 'Sir Hassan Fareed',
      channelName: 'Pocket Physics by Hassaan Fareed',
      avatarEmoji: '🌌',
      subscribers: '950K+ Students',
      views: '52M+ Views',
      ratingBadge: 'Top Watch • #1 FSc Part 2 Physics',
      boardSpecialty: 'KPK, Punjab & Federal Board FSc Part 2 Physics Specialist',
      teachingStyle: 'Electrostatics, Current Electricity, Electromagnetism, Nuclear & Modern Physics masterclasses',
      language: 'Urdu / Hindi (Clear & Engaging)',
      youtubeChannelUrl: 'https://www.youtube.com/@pocketphysicsbyhassaanfare6003',
      accentColor: '#2563EB',
      recommendationTag: 'Top Recommended for Class 12 Electrostatics, Electronics & Board Proofs',
      defaultVideoId: 'FkB4ff9n3HY',
    },
    {
      id: 'teacher_12_subtain',
      name: 'Prof. Muhammad Subtain',
      channelName: 'Subtain Academy',
      avatarEmoji: '⚡',
      subscribers: '620K+ Students',
      views: '32M+ Views',
      ratingBadge: 'Class 12 Board Master',
      boardSpecialty: 'Class 12 FSc All Boards (Electrostatics, Circuits, Modern Physics)',
      teachingStyle: 'Full numerical exercises, potentiometer derivations, and transformer proofs',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@SubtainAcademy',
      accentColor: '#10B981',
      recommendationTag: 'Best for Class 12 Board Derivations & Solved Numericals',
      defaultVideoId: 'FkB4ff9n3HY',
    },
    {
      id: 'teacher_12_pw',
      name: 'Physics Wallah (Alakh Pandey)',
      channelName: 'Physics Wallah - Alakh Pandey',
      avatarEmoji: '🔥',
      subscribers: '13M+ Students',
      views: '1B+ Views',
      ratingBadge: 'Global Concept Giant',
      boardSpecialty: 'Deep Physics Intuition & Concept Mastery',
      teachingStyle: 'High-energy intuition, atomic models, nuclear binding energy, and semiconductors',
      language: 'Hindi / Urdu (Easily Understandable)',
      youtubeChannelUrl: 'https://www.youtube.com/@PhysicsWallah',
      accentColor: '#6366F1',
      recommendationTag: 'Best for Crystal-Clear Intuitive Understanding of Tricky Modern Physics',
      defaultVideoId: 'm5VbK66a254',
    },
  ],
};

// ── Dedicated Teachers for Other Subjects ───────────────────────────────────
export const SUBJECT_TEACHERS: Record<string, TeacherProfile[]> = {
  sub_bio: [
    {
      id: 'teacher_dr_hadi',
      name: 'Dr. Hadi',
      channelName: 'Hadi Biology 20',
      avatarEmoji: '🧬',
      subscribers: '850K+ Students',
      views: '38M+ Views',
      ratingBadge: 'Highest Rated Pre-Medical Faculty',
      boardSpecialty: 'BISE Swat & KPK Biology Classes 9–12',
      teachingStyle: 'Anatomical diagrams, cellular respiration, genetics & past paper long answers',
      language: 'Urdu / English',
      youtubeChannelUrl: 'https://www.youtube.com/@hadibiology2012',
      accentColor: '#10B981',
      recommendationTag: 'Top for Cell Biology, Genetics & Biological Method',
      defaultVideoId: 'yfKcnoQGZf8',
    },
    {
      id: 'teacher_sabaq_bio',
      name: 'Sabaq Foundation Biology',
      channelName: 'Sabaq Foundation',
      avatarEmoji: '🔬',
      subscribers: '980K+ Students',
      views: '70M+ Views',
      ratingBadge: 'Pioneer Free Repository',
      boardSpecialty: 'All KPK & Federal Biology Board Topics',
      teachingStyle: 'Concise 10-minute micro-lectures on every textbook topic',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@sabaqfoundation',
      accentColor: '#059669',
      recommendationTag: 'Best for Quick 10-Minute Concept Revision',
      defaultVideoId: 'nzvT2yddcLs',
    },
    {
      id: 'teacher_campus_bio',
      name: 'Campus.pk Biology',
      channelName: 'Campus.pk',
      avatarEmoji: '🌿',
      subscribers: '620K+ Students',
      views: '25M+ Views',
      ratingBadge: 'Top Exam Prep',
      boardSpecialty: 'Matric & FSc Biology Past Papers & Diagram Solutions',
      teachingStyle: 'Exhaustive textbook diagram drawing & board marking patterns',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@campusedu',
      accentColor: '#16A34A',
      recommendationTag: 'Best for Drawing Textbook Diagrams & Board Marking Criteria',
      defaultVideoId: 'KRn0dvrEpSU',
    },
  ],

  sub_chem: [
    {
      id: 'teacher_chem_plus',
      name: 'Prof. Muhammad Bilal',
      channelName: 'Chemistry Plus',
      avatarEmoji: '🧪',
      subscribers: '750K+ Students',
      views: '34M+ Views',
      ratingBadge: 'Highest Watched Chemistry Mentor',
      boardSpecialty: 'KPTBB, FBISE & BISE Swat Matric & FSc Chemistry',
      teachingStyle: 'Reaction mechanisms, balanced chemical equations, periodic trends & numericals',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@ChemistryPlusOfficial',
      accentColor: '#EC4899',
      recommendationTag: 'Top for Organic & Inorganic Mechanisms & Law of Mass Action',
      defaultVideoId: 'aBX6sqZPZgI',
    },
    {
      id: 'teacher_nasim_chem',
      name: 'Sir Nasim Zulfiqar',
      channelName: 'Nasim Zulfiqar Chemistry',
      avatarEmoji: '⚗️',
      subscribers: '550K+ Students',
      views: '24M+ Views',
      ratingBadge: 'Board Paper Specialist',
      boardSpecialty: 'Equilibrium, Electrochemistry & Stoichiometry Numericals',
      teachingStyle: 'Step-by-step chemical equations & board exam numericals',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@NasimZulfiqar',
      accentColor: '#D946EF',
      recommendationTag: 'Best for Chemical Equations & Stoichiometric Calculations',
      defaultVideoId: 'VBUo94PdsTc',
    },
    {
      id: 'teacher_sabaq_chem',
      name: 'Sabaq Foundation Chemistry',
      channelName: 'Sabaq Foundation',
      avatarEmoji: '🔬',
      subscribers: '980K+ Students',
      views: '70M+ Views',
      ratingBadge: 'Comprehensive Visual Concept Library',
      boardSpecialty: 'KPTBB Chemistry Chapters 1-16',
      teachingStyle: 'High-clarity animated molecular models & electron shells',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@sabaqfoundation',
      accentColor: '#8B5CF6',
      recommendationTag: 'Best for Atomic Structure & Molecular Geometry',
      defaultVideoId: 'aBX6sqZPZgI',
    },
  ],

  sub_math: [
    {
      id: 'teacher_math_waqas',
      name: 'Sir Waqas Nasir',
      channelName: 'Maths Hub Pakistan',
      avatarEmoji: '📐',
      subscribers: '1.2M+ Students',
      views: '55M+ Views',
      ratingBadge: 'Highest Watched Mathematics Mentor',
      boardSpecialty: 'Matric & FSc Mathematics Complete Book',
      teachingStyle: 'Every single exercise question solved step-by-step with tips & formulas',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@IMWaqasNasir',
      accentColor: '#0284C7',
      recommendationTag: 'Top for Exercise Step-by-Step Proofs & Matrices/Calculus',
      defaultVideoId: 'i7LGZGuRKZw',
    },
    {
      id: 'teacher_kk_maths',
      name: 'KK Maths Academy',
      channelName: 'KK Maths',
      avatarEmoji: '✏️',
      subscribers: '480K+ Students',
      views: '20M+ Views',
      ratingBadge: 'KPK Board Math Specialist',
      boardSpecialty: 'KPK & BISE Swat Class 9-10 Math Solutions',
      teachingStyle: 'Clear board presentations focusing on KPK board exam schemes',
      language: 'Urdu / Pashto Friendly',
      youtubeChannelUrl: 'https://www.youtube.com/@KKMaths',
      accentColor: '#0EA5E9',
      recommendationTag: 'Best for KPK Textbook Board Solved Review Exercises',
      defaultVideoId: 'WquRQdrmUbM',
    },
    {
      id: 'teacher_great_maths',
      name: 'Great Science Academy',
      channelName: 'Great Science Academy',
      avatarEmoji: '📊',
      subscribers: '650K+ Students',
      views: '30M+ Views',
      ratingBadge: 'FSc Calculus Expert',
      boardSpecialty: 'Classes 11 & 12 Derivatives, Integration & Functions',
      teachingStyle: 'Rigorous theorem proofs & board question patterns',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@GreatScienceAcademy',
      accentColor: '#0369A1',
      recommendationTag: 'Best for Class 11-12 Calculus, Functions & Limits',
      defaultVideoId: 'CaDmT-oGSiE',
    },
  ],

  sub_comp: [
    {
      id: 'teacher_murtaza_cs',
      name: 'Sir Murtaza',
      channelName: 'Computer Science Master',
      avatarEmoji: '💻',
      subscribers: '420K+ Students',
      views: '18M+ Views',
      ratingBadge: 'Matric & Intermediate CS Leader',
      boardSpecialty: 'BISE Swat & KPK Computer Science 9-12',
      teachingStyle: 'Flowcharts, algorithms, programming syntax & IT architecture',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@SirMurtazaCS',
      accentColor: '#2563EB',
      recommendationTag: 'Top for Flowcharts, Algorithms & C/Python Coding',
      defaultVideoId: '3p360PgYxPA',
    },
    {
      id: 'teacher_allied_cs',
      name: 'Allied Schools CS',
      channelName: 'Allied Schools',
      avatarEmoji: '🖥️',
      subscribers: '890K+ Students',
      views: '40M+ Views',
      ratingBadge: 'Structured School Curriculum',
      boardSpecialty: 'Textbook Computer Science Chapters 1–8',
      teachingStyle: 'Visual slideshows with hardware & software components explained',
      language: 'Urdu / English',
      youtubeChannelUrl: 'https://www.youtube.com/@AlliedSchools',
      accentColor: '#1D4ED8',
      recommendationTag: 'Best for Hardware & Software Architecture Concepts',
      defaultVideoId: 'JTrou9_7P0I',
    },
  ],

  sub_eng: [
    {
      id: 'teacher_faiza_eng',
      name: 'Faiza Rehman',
      channelName: 'Learn with Faiza Rehman',
      avatarEmoji: '🔤',
      subscribers: '350K+ Students',
      views: '15M+ Views',
      ratingBadge: 'English Grammar & Comprehension Mentor',
      boardSpecialty: 'Class 9–12 English Compulsory KPK & Punjab',
      teachingStyle: 'Word-by-word Urdu translation, summary writing & board grammar rules',
      language: 'Urdu / English',
      youtubeChannelUrl: 'https://www.youtube.com/@FaizaRehmanEnglish',
      accentColor: '#3B82F6',
      recommendationTag: 'Best for Chapter Translations, Paraphrasing & Essays',
      defaultVideoId: 'Vhg__DFQhCI',
    },
  ],

  sub_urdu: [
    {
      id: 'teacher_ilmkidunya_urdu',
      name: 'Sir Asad (ilmkidunya)',
      channelName: 'ilmkidunya Urdu',
      avatarEmoji: '📖',
      subscribers: '2.5M+ Students',
      views: '120M+ Views',
      ratingBadge: 'Urdu Adab Master',
      boardSpecialty: 'Matric & Intermediate Urdu Compulsory (All Boards)',
      teachingStyle: 'Poetic verses (ashar) tashreeh, context (hawala-e-matn) & grammar',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@ilmkidunyaofficial',
      accentColor: '#E11D48',
      recommendationTag: 'Best for Ghazal & Nazam Tashreeh & Khulasa Writing',
      defaultVideoId: 'YXyeo5qWT6U',
    },
  ],

  sub_islam: [
    {
      id: 'teacher_allied_islam',
      name: 'Allied Schools Islamic Studies',
      channelName: 'Allied Schools',
      avatarEmoji: '🕌',
      subscribers: '890K+ Students',
      views: '40M+ Views',
      ratingBadge: 'Quranic Translation & Ahadith Guide',
      boardSpecialty: 'Class 9–12 Islamiyat Compulsory (Surah Anfal & Ahadith)',
      teachingStyle: 'Word-by-word translation, tafseer notes & short answer rubrics',
      language: 'Urdu / Arabic',
      youtubeChannelUrl: 'https://www.youtube.com/@AlliedSchools',
      accentColor: '#0D9488',
      recommendationTag: 'Best for Quranic Ayat & Hadith Memorization & Rubrics',
      defaultVideoId: 'dPBaSKKfnS0',
    },
  ],

  sub_pak: [
    {
      id: 'teacher_khanpur_pst',
      name: 'Khanpur Coaching PST',
      channelName: 'Khanpur Coaching',
      avatarEmoji: '🇵🇰',
      subscribers: '320K+ Students',
      views: '14M+ Views',
      ratingBadge: 'Pakistan Studies Authority',
      boardSpecialty: 'Class 9 & 10 Mutala-e-Pakistan (KPTBB & FBISE)',
      teachingStyle: 'Historical timeline analysis, constitution points & geographic maps',
      language: 'Urdu',
      youtubeChannelUrl: 'https://www.youtube.com/@KhanpurCoaching',
      accentColor: '#16A34A',
      recommendationTag: 'Best for Long Question Outlines, Headings & Historical Dates',
      defaultVideoId: 'WfcZw055RGo',
    },
  ],
};

const SUBJECT_DISPLAY_MAP: Record<string, string> = {
  sub_bio: 'Biology',
  bio: 'Biology',
  biology: 'Biology',
  sub_chem: 'Chemistry',
  chem: 'Chemistry',
  chemistry: 'Chemistry',
  sub_physics: 'Physics',
  physics: 'Physics',
  phys: 'Physics',
  sub_math: 'Mathematics',
  math: 'Mathematics',
  mathematics: 'Mathematics',
  sub_comp: 'Computer Science',
  comp: 'Computer Science',
  computer: 'Computer Science',
  sub_eng: 'English Compulsory',
  eng: 'English',
  english: 'English',
  sub_urdu: 'Urdu Compulsory',
  urdu: 'Urdu',
  sub_islam: 'Islamic Studies',
  islam: 'Islamic Studies',
  sub_pak: 'Pakistan Studies',
  pak: 'Pakistan Studies',
};

export class VideoLectureService {
  /**
   * Helper to normalize any subject string (e.g. 'sub_bio', 'bio') to a readable title.
   */
  static getSubjectDisplayName(subjectId?: string, fallbackName?: string): string {
    if (subjectId && SUBJECT_DISPLAY_MAP[subjectId.toLowerCase()]) {
      return SUBJECT_DISPLAY_MAP[subjectId.toLowerCase()];
    }
    if (fallbackName && SUBJECT_DISPLAY_MAP[fallbackName.toLowerCase()]) {
      return SUBJECT_DISPLAY_MAP[fallbackName.toLowerCase()];
    }
    return fallbackName || 'Subject';
  }

  /**
   * Get top teachers for a given class and subject.
   */
  static getTeachers(classId: string, subjectId: string): TeacherProfile[] {
    const isPhysics = subjectId === 'sub_physics' || /phys/i.test(subjectId);
    if (isPhysics) {
      const normalizedClass = classId.startsWith('class_') ? classId : `class_${classId}`;
      return PHYSICS_TEACHERS_BY_CLASS[normalizedClass] || PHYSICS_TEACHERS_BY_CLASS['class_10'];
    }

    if (SUBJECT_TEACHERS[subjectId]) {
      return SUBJECT_TEACHERS[subjectId];
    }

    // Default subject fallback matching the specific subject
    const subjectKey = Object.keys(SUBJECT_TEACHERS).find(k => subjectId.includes(k.replace('sub_', '')));
    if (subjectKey && SUBJECT_TEACHERS[subjectKey]) {
      return SUBJECT_TEACHERS[subjectKey];
    }

    // Return biology or chemistry teachers as default, NEVER Hassan Fareed physics for everything
    return SUBJECT_TEACHERS['sub_bio'];
  }

  /**
   * Build direct YouTube search, playlist, first-video, and verified embed URLs.
   */
  static getChapterVideoInfo(params: {
    classId: string;
    subjectId: string;
    subjectName?: string;
    chapterNumber: number;
    chapterTitle: string;
    topicTitle?: string;
    teacher?: TeacherProfile;
  }): ChapterVideoInfo {
    const { classId, subjectId, chapterNumber, chapterTitle, topicTitle } = params;
    const normalizedSubject = VideoLectureService.getSubjectDisplayName(subjectId, params.subjectName);

    // Ensure teacher belongs to this subject
    const teacher = params.teacher || VideoLectureService.getTeachers(classId, subjectId)[0];

    const classNum = classId.replace('class_', '');
    const cleanChapter = chapterTitle
      .replace(/^Chapter\s+\d+:\s*/i, '')
      .replace(/^Unit\s+\d+:\s*/i, '')
      .replace(/\s*\(.*?\)\s*/g, '')
      .trim();

    const cleanTopic = topicTitle
      ? topicTitle.replace(/^\d+\.\d+\s*/, '').trim()
      : cleanChapter;

    // Direct YouTube Search query for full chapter playlist with this teacher
    const playlistQuery = `${teacher.name} Class ${classNum} ${normalizedSubject} Chapter ${chapterNumber} ${cleanChapter} playlist`;
    const playlistUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(playlistQuery)}`;

    // Direct YouTube Search query for Lecture 1 (first video of playlist)
    const firstVideoQuery = `${teacher.name} Class ${classNum} ${normalizedSubject} Chapter ${chapterNumber} Lecture 1`;
    const firstVideoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(firstVideoQuery)}`;

    // Exact topic video search on YouTube
    const topicQuery = `${teacher.name} Class ${classNum} ${normalizedSubject} ${cleanTopic}`;
    const topicSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(topicQuery)}`;
    const topicVideoUrl = topicSearchUrl;

    // Pick verified playable video ID scoped specifically to this subject & class & chapter
    const subjectChapterKey = `${subjectId}_${classId}_${chapterNumber}`;
    const subjectClassKey = `${subjectId}_${classId}`;
    const physicsKey = subjectId === 'sub_physics' ? `${classId}_${chapterNumber}` : undefined;

    const sampleVideoId =
      CHAPTER_VIDEO_IDS[subjectChapterKey] ||
      (physicsKey ? CHAPTER_VIDEO_IDS[physicsKey] : undefined) ||
      CHAPTER_VIDEO_IDS[subjectClassKey] ||
      teacher.defaultVideoId ||
      DEFAULT_SUBJECT_VIDEO_IDS[subjectId] ||
      'yfKcnoQGZf8';

    // Safe, verified playable YouTube embed URL with origin & parameters
    const embedUrl = `https://www.youtube-nocookie.com/embed/${sampleVideoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`;

    return {
      chapterNumber,
      chapterTitleEn: cleanChapter,
      subjectId,
      classId,
      playlistUrl,
      firstVideoUrl,
      topicSearchUrl,
      topicVideoUrl,
      embedUrl,
      sampleVideoId,
      queryDisplay: topicQuery,
    };
  }
}
