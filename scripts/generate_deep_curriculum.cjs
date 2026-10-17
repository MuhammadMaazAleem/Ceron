const fs = require('fs');
const path = require('path');

console.log('Generating full real KPTBB & BISE Swat curriculum dataset with sequential multi-topics...');

const outputPath = path.join(__dirname, '../src/data/curriculumData.ts');

const header = `import { ClassInfo, Subject, Unit, Quiz, LearnerProfile } from '../types';

export const ALL_CLASSES: ClassInfo[] = [
  { id: 'class_kg', nameEn: 'Kindergarten (KG)', nameUr: 'کے جی (ابتدائی)', gradeLevel: 0, ageBand: 'kg-3', stage: 'Early Childhood' },
  { id: 'class_1', nameEn: 'Class 1', nameUr: 'پہلی جماعت', gradeLevel: 1, ageBand: 'kg-3', stage: 'Primary' },
  { id: 'class_2', nameEn: 'Class 2', nameUr: 'دوسری جماعت', gradeLevel: 2, ageBand: 'kg-3', stage: 'Primary' },
  { id: 'class_3', nameEn: 'Class 3', nameUr: 'تیسری جماعت', gradeLevel: 3, ageBand: 'kg-3', stage: 'Primary' },
  { id: 'class_4', nameEn: 'Class 4', nameUr: 'چوتھی جماعت', gradeLevel: 4, ageBand: '4-8', stage: 'Primary' },
  { id: 'class_5', nameEn: 'Class 5', nameUr: 'پانچویں جماعت', gradeLevel: 5, ageBand: '4-8', stage: 'Primary' },
  { id: 'class_6', nameEn: 'Class 6', nameUr: 'چھٹی جماعت', gradeLevel: 6, ageBand: '4-8', stage: 'Middle School' },
  { id: 'class_7', nameEn: 'Class 7', nameUr: 'ساتویں جماعت', gradeLevel: 7, ageBand: '4-8', stage: 'Middle School' },
  { id: 'class_8', nameEn: 'Class 8', nameUr: 'آٹھویں جماعت', gradeLevel: 8, ageBand: '4-8', stage: 'Middle School' },
  { id: 'class_9', nameEn: 'Class 9 (Matric Part 1)', nameUr: 'نویں جماعت (میٹرک حصہ اول)', gradeLevel: 9, ageBand: '9-12', stage: 'Matric' },
  { id: 'class_10', nameEn: 'Class 10 (Matric Part 2)', nameUr: 'دسویں جماعت (میٹرک حصہ دوم)', gradeLevel: 10, ageBand: '9-12', stage: 'Matric' },
  { id: 'class_11', nameEn: 'Class 11 (FSc Part 1)', nameUr: 'گیارہویں جماعت (ایف ایس سی اول)', gradeLevel: 11, ageBand: '9-12', stage: 'Intermediate (FSc)' },
  { id: 'class_12', nameEn: 'Class 12 (FSc Part 2)', nameUr: 'بارہویں جماعت (ایف ایس سی دوم)', gradeLevel: 12, ageBand: '9-12', stage: 'Intermediate (FSc)' },
];

export const INITIAL_PROFILES: LearnerProfile[] = [
  {
    id: 'child_1',
    name: 'Ayla',
    nameUrdu: 'آئلہ',
    classId: 'class_1',
    className: 'Class 1 (Primary)',
    ageBand: 'kg-3',
    avatarIcon: '🐱',
    avatarColor: '#F43F5E',
    streakDays: 4,
    xp: 240,
    completedLessons: ['lsn_1_math_1_1'],
    badges: ['Seed Pearl', 'Number Explorer'],
  },
  {
    id: 'child_2',
    name: 'Hamza',
    nameUrdu: 'حمزہ',
    classId: 'class_6',
    className: 'Class 6 (Middle)',
    ageBand: '4-8',
    avatarIcon: '🚀',
    avatarColor: '#3B82F6',
    streakDays: 7,
    xp: 680,
    completedLessons: ['lsn_6_sci_1_1'],
    badges: ['Akoya Pearl', 'Cell Pioneer'],
  },
  {
    id: 'child_3',
    name: 'Bilal',
    nameUrdu: 'بلال',
    classId: 'class_10',
    className: 'Class 10 Matric (BISE Swat)',
    ageBand: '9-12',
    avatarIcon: '📚',
    avatarColor: '#8B5CF6',
    streakDays: 12,
    xp: 1450,
    completedLessons: ['lsn_10_bio_10_1'],
    badges: ['Tahitian Pearl', 'Biology Scholar', 'Board Champion'],
  },
  {
    id: 'child_4',
    name: 'Zohra',
    nameUrdu: 'زہرہ',
    classId: 'class_12',
    className: 'Class 12 (FSc Pre-Medical)',
    ageBand: '9-12',
    avatarIcon: '🧬',
    avatarColor: '#10B981',
    streakDays: 9,
    xp: 1820,
    completedLessons: ['lsn_12_bio_15_1'],
    badges: ['South Sea Gold', 'Pre-Med Scholar'],
  },
];

export const SUBJECTS: Subject[] = [
  {
    id: 'sub_bio',
    nameEn: 'Biology',
    nameUr: 'حیاتیات (بائیولوجی)',
    icon: '🧬',
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    classes: ['class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 18,
  },
  {
    id: 'sub_chem',
    nameEn: 'Chemistry',
    nameUr: 'کیمیا (کیمسٹری)',
    icon: '🧪',
    color: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    classes: ['class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 16,
  },
  {
    id: 'sub_physics',
    nameEn: 'Physics',
    nameUr: 'طبیعیات (فزکس)',
    icon: '⚡',
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    classes: ['class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 18,
  },
  {
    id: 'sub_math',
    nameEn: 'Mathematics',
    nameUr: 'ریاضی / حساب',
    icon: '📐',
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    classes: ['class_kg', 'class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7', 'class_8', 'class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 14,
  },
  {
    id: 'sub_sci',
    nameEn: 'General Science',
    nameUr: 'جنرل سائنس',
    icon: '🔬',
    color: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.25)',
    classes: ['class_kg', 'class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7', 'class_8'],
    unitsCount: 10,
  },
  {
    id: 'sub_comp',
    nameEn: 'Computer Science',
    nameUr: 'کمپیوٹر سائنس',
    icon: '💻',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    classes: ['class_6', 'class_7', 'class_8', 'class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 8,
  },
  {
    id: 'sub_eng',
    nameEn: 'English Language',
    nameUr: 'انگریزی زبان و ادب',
    icon: '🔤',
    color: '#2563EB',
    glowColor: 'rgba(37, 99, 235, 0.25)',
    classes: ['class_kg', 'class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7', 'class_8', 'class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 12,
  },
  {
    id: 'sub_urdu',
    nameEn: 'Urdu & Qawaid',
    nameUr: 'اردو زبان و قواعد',
    icon: '📖',
    color: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    classes: ['class_kg', 'class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7', 'class_8', 'class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 12,
  },
  {
    id: 'sub_islam',
    nameEn: 'Islamiat & Nazra Quran',
    nameUr: 'اسلامیات و ناظرہ قرآن',
    icon: '🕌',
    color: '#0D9488',
    glowColor: 'rgba(13, 148, 136, 0.25)',
    classes: ['class_kg', 'class_1', 'class_2', 'class_3', 'class_4', 'class_5', 'class_6', 'class_7', 'class_8', 'class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 8,
  },
  {
    id: 'sub_pak',
    nameEn: 'Pakistan Studies',
    nameUr: 'مطالعہ پاکستان',
    icon: '🇵🇰',
    color: '#15803D',
    glowColor: 'rgba(21, 128, 61, 0.25)',
    classes: ['class_9', 'class_10', 'class_11', 'class_12'],
    unitsCount: 6,
  },
];
`;

const units = [];
const quizzes = {};

// Helper to register quiz
function registerQuiz(id, unitId, titleEn, titleUr, questions) {
  quizzes[id] = {
    id,
    unitId,
    titleEn,
    titleUr,
    timeLimitMinutes: 15,
    passPercentage: 33,
    questions,
  };
}

// =========================================================================
// CLASS 10 BIOLOGY (CHAPTERS 10 TO 18)
// =========================================================================

// Ch 10: Gaseous Exchange
units.push({
  id: 'unit_10_bio_10',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 10,
  titleEn: 'Chapter 10: Gaseous Exchange',
  titleUr: 'باب 10: گیسوں کا تبادلہ',
  kptbbChapter: 10,
  quizId: 'quiz_10_bio_10',
  overviewEn: 'Gaseous exchange mechanisms in plants and humans, anatomy of the respiratory tract, mechanics of breathing (inspiration and expiration), respiratory disorders, and smoking hazards.',
  overviewUr: 'پودوں اور انسانوں میں گیسوں کا تبادلہ، پھیپھڑوں اور ہوا کی نالیوں کی ساخت، سانس لینے کا طریقہ کار اور تنفس کی بیماریاں۔',
  keyTerms: [
    { termEn: 'Alveoli', termUr: 'ایلویولائی', definitionEn: 'Functional unit of human lungs where O2 and CO2 exchange occurs with capillary blood.', definitionUr: 'پھیپھڑوں کے باریک تھیلے جہاں خون کے ساتھ گیسوں کا تبادلہ ہوتا ہے۔' },
    { termEn: 'Stomata', termUr: 'سٹوماٹا', definitionEn: 'Microscopic pores in leaf epidermis guarded by two kidney-shaped guard cells.', definitionUr: 'پتوں کے باریک مسام جن سے گیسوں کا تبادلہ اور پانی کا اخراج ہوتا ہے۔' },
    { termEn: 'Lenticels', termUr: 'لینٹیسلز', definitionEn: 'Pores in the bark of woody stems and roots for gas exchange.', definitionUr: 'لکڑی والے تنوں اور پرانی جڑوں کی چھال میں موجود سوراخ۔' },
    { termEn: 'Emphysema', termUr: 'ایمفیسیما', definitionEn: 'Destruction of alveolar walls reducing surface area for gas exchange due to smoking.', definitionUr: 'پھیپھڑوں کی وہ بیماری جس میں ایلویولائی کی دیواریں تباہ ہو جاتی ہیں۔' },
  ],
  pastPaperQuestions: [
    {
      questionEn: 'Differentiate between Inspiration and Expiration. (BISE Swat 2023)',
      questionUr: 'انسپائریشن اور ایکسپائریشن میں فرق بیان کریں۔ (4 نمبر)',
      year: 'BISE Swat 2023',
      marks: 4,
      modelAnswerEn: 'Inspiration is active: external intercostal muscles contract pulling ribs up & out, diaphragm contracts & flattens, increasing thoracic volume and lowering alveolar pressure (759 mmHg) to draw air in. Expiration is passive: muscles relax, ribs move down & in, diaphragm domes up, reducing thoracic volume and raising pressure (761 mmHg) to expel air.',
      modelAnswerUr: 'انسپائریشن ایک فعال عمل ہے جس میں پسلیاں اوپر اٹھتی ہیں، ڈایافرام نیچے سیدھا ہوتا ہے اور ہوا اندر آتی ہے۔ ایکسپائریشن میں ڈایافرام واپس ابھر کر ہوا کو باہر نکالتا ہے۔',
    },
  ],
  lessons: [
    {
      id: 'lsn_10_bio_10_1',
      unitId: 'unit_10_bio_10',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '10.1 Gaseous Exchange in Plants',
      titleUr: '10.1 پودوں میں گیسوں کا تبادلہ',
      kptbbChapterRef: 'KPTBB Class 10 Biology, Section 10.1',
      durationMinutes: 14,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'How Plants Exchange Gases Without Respiratory Organs',
            titleUr: 'پودے اعضاء کے بغیر گیسوں کا تبادلہ کیسے کرتے ہیں؟',
            bodyEn: 'Plants have no specialized respiratory organs. Gas exchange occurs directly by diffusion through:\n• Stomata: Microscopic pores on leaf epidermis for young leaves and green stems.\n• Lenticels: Aerating pores in the bark of woody stems and mature roots.\n• Mesophyll Tissue: Large intercellular air spaces enable rapid diffusion inside the leaf interior.',
            bodyUr: 'پودوں میں کوئی خاص تنفسی نظام نہیں ہوتا۔ پتوں میں سٹوماٹا اور لکڑی والے تنوں میں لینٹیسلز کے ذریعے گیسوں کا تبادلہ ہوتا ہے۔',
            kptbbRef: 'KPTBB Page 2',
          },
        },
        {
          id: 'b2',
          type: 'board_tip',
          order: 2,
          data: {
            titleEn: 'Day vs Night Respiration (High-Yield)',
            textEn: 'During daytime, Photosynthesis > Respiration, so NET oxygen is released. At nighttime, Photosynthesis stops, so NET carbon dioxide is released and oxygen is consumed!',
            textUr: 'دن کے وقت پودا مجموعی طور پر آکسیجن خارج کرتا ہے، جبکہ رات کو آکسیجن استعمال کر کے کاربن ڈائی آکسائیڈ خارج کرتا ہے۔',
          },
        },
        {
          id: 'b3',
          type: 'practice',
          order: 3,
          data: {
            promptEn: 'Through which openings do mature woody stems exchange gases?',
            promptUr: 'لکڑی والے تنے کس کے ذریعے گیسوں کا تبادلہ کرتے ہیں؟',
            options: [
              { id: 'a', textEn: 'Stomata', textUr: 'سٹوماٹا' },
              { id: 'b', textEn: 'Lenticels', textUr: 'لینٹیسلز' },
              { id: 'c', textEn: 'Cuticle', textUr: 'کیوٹیکل' },
            ],
            correctId: 'b',
            explanationEn: 'Lenticels are aerating pores in the cork/bark layer.',
            explanationUr: 'لینٹیسلز لکڑی والے تنوں کی چھال میں موجود سوراخ ہیں۔',
          },
        },
      ],
    },
    {
      id: 'lsn_10_bio_10_2',
      unitId: 'unit_10_bio_10',
      subjectId: 'sub_bio',
      lessonNumber: 2,
      titleEn: '10.2 The Human Air Passageway',
      titleUr: '10.2 انسان کا ہوا کی نالی کا راستہ',
      kptbbChapterRef: 'KPTBB Class 10 Biology, Section 10.2',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'From Nostrils to Alveoli',
            titleUr: 'ناک سے ایلویولائی تک کا سفر',
            bodyEn: 'Air travels sequentially through:\n1. Nasal cavity (warmed, filtered by hairs and mucus)\n2. Pharynx (common path for food and air)\n3. Larynx (voice box containing vocal cords and epiglottis flap)\n4. Trachea (~12 cm long with C-shaped cartilaginous rings)\n5. Bronchi & Bronchioles (branching bronchial tree)\n6. Alveoli (~700 million microscopic sacs where capillary diffusion occurs).',
            bodyUr: 'ہوا ناک سے ہو کر فیرنکس، لیرنکس، ٹریکیا (ہوا کی نالی)، برونکائی اور ایلویولائی تک پہنچتی ہے۔ ٹریکیا میں C نما چھلے اسے پچکنے سے بچاتے ہیں۔',
            kptbbRef: 'KPTBB Page 4-6',
          },
        },
      ],
    },
    {
      id: 'lsn_10_bio_10_3',
      unitId: 'unit_10_bio_10',
      subjectId: 'sub_bio',
      lessonNumber: 3,
      titleEn: '10.3 Mechanism of Breathing (Interactive Simulator)',
      titleUr: '10.3 سانس لینے کا طریقہ کار اور لائیو ماڈل',
      kptbbChapterRef: 'KPTBB Class 10 Biology, Section 10.3',
      durationMinutes: 18,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Physical Mechanics of Inhalation and Exhalation',
            titleUr: 'سانس اندر لینے اور باہر نکالنے کی طبیعیات',
            bodyEn: 'Inspiration: Diaphragm contracts & flattens downwards, ribs move up & out. Thoracic cavity volume increases -> alveolar pressure drops to 759 mmHg -> air rushes in.\n\nExpiration: Diaphragm relaxes & domes upwards, ribs move down & in. Thoracic volume decreases -> pressure rises to 761 mmHg -> air expelled.\n\nInteract with the dynamic biological model below!',
            bodyUr: 'انسپائریشن میں پسلیاں اوپر اٹھتی ہیں، ڈایافرام سیدھا ہوتا ہے اور ہوا اندر آتی ہے۔ ایکسپائریشن میں ڈایافرام واپس اوپر ابھر کر ہوا کو باہر نکالتا ہے۔',
            kptbbRef: 'KPTBB Page 7',
          },
        },
        {
          id: 'b2',
          type: 'animation',
          order: 2,
          data: {
            simulatorType: 'breathing_simulator',
          },
        },
      ],
    },
    {
      id: 'lsn_10_bio_10_4',
      unitId: 'unit_10_bio_10',
      subjectId: 'sub_bio',
      lessonNumber: 4,
      titleEn: '10.4 Respiratory Disorders & Smoking Hazards',
      titleUr: '10.4 تنفس کی بیماریاں اور سگریٹ کے نقصانات',
      kptbbChapterRef: 'KPTBB Class 10 Biology, Section 10.4',
      durationMinutes: 15,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Bronchitis, Emphysema, Pneumonia, Asthma & Tobacco Smoke',
            titleUr: 'برونکائٹس، نمونیا، دمہ اور تمباکو کے خطرات',
            bodyEn: '• Bronchitis: Inflammation of bronchi with excess phlegm production.\n• Emphysema: Alveolar walls rupture, trapping air.\n• Pneumonia: Bacterial infection (Streptococcus pneumoniae) filling alveoli with fluid/pus.\n• Asthma: Allergic constriction of bronchioles.\n• Tobacco Smoke: Contains nicotine (arterial constriction, addiction), carbon monoxide (binds hemoglobin, reducing O2), and tar (carcinogenic, destroys tracheal cilia).',
            bodyUr: 'نمونیا بیکٹیریل انفیکشن ہے، دمہ الرجی ہے اور سگریٹ کا دھواں نکوٹین اور کاربن مونو آکسائیڈ کی وجہ سے خون اور پھیپھڑوں کو تباہ کرتا ہے۔',
            kptbbRef: 'KPTBB Page 9-13',
          },
        },
      ],
    },
  ],
});

registerQuiz('quiz_10_bio_10', 'unit_10_bio_10', 'Chapter 10 Exam: Gaseous Exchange', 'باب 10 کا امتحانی ٹیسٹ: گیسوں کا تبادلہ', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_10',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'Through which structure does gaseous exchange occur in human lungs?',
    promptUr: 'انسانی پھیپھڑوں میں گیسوں کا تبادلہ کس کے ذریعے ہوتا ہے؟',
    options: [
      { id: 'a', textEn: 'Bronchus', textUr: 'برونکس' },
      { id: 'b', textEn: 'Alveolus', textUr: 'ایلویولس' },
      { id: 'c', textEn: 'Trachea', textUr: 'ٹریکیا' },
      { id: 'd', textEn: 'Larynx', textUr: 'لیرنکس' },
    ],
    correctOptionId: 'b',
    explanationEn: 'Microscopic alveoli surrounded by capillaries are the site of diffusion.',
    explanationUr: 'ایلویولائی وہ باریک تھیلیاں ہیں جہاں خون اور ہوا کا تبادلہ ہوتا ہے۔',
    kptbbRef: 'Page 5',
    tags: ['bio10'],
  },
  {
    id: 'q2',
    unitId: 'unit_10_bio_10',
    type: 'mcq',
    difficulty: 'medium',
    promptEn: 'During inhalation, what happens to the diaphragm?',
    promptUr: 'سانس اندر کھینچنے کے دوران ڈایافرام میں کیا تبدیلی آتی ہے؟',
    options: [
      { id: 'a', textEn: 'Contracts and flattens', textUr: 'سکڑ کر سیدھا ہوتا ہے' },
      { id: 'b', textEn: 'Relaxes and domes up', textUr: 'ڈھیلا ہو کر گنبد نما بنتا ہے' },
      { id: 'c', textEn: 'Remains unchanged', textUr: 'کوئی تبدیلی نہیں آتی' },
    ],
    correctOptionId: 'a',
    explanationEn: 'The diaphragm contracts and flattens downwards, enlarging thoracic volume.',
    explanationUr: 'ڈایافرام سکڑ کر نیچے کی طرف سیدھا ہو جاتا ہے۔',
    kptbbRef: 'Page 7',
    tags: ['bio10'],
  },
]);

// Ch 11: Homeostasis
units.push({
  id: 'unit_10_bio_11',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 11,
  titleEn: 'Chapter 11: Homeostasis',
  titleUr: 'باب 11: ہومیوسٹیسس (اندرونی توازن)',
  kptbbChapter: 11,
  quizId: 'quiz_10_bio_11',
  overviewEn: 'Osmoregulation, thermoregulation, and excretion in plants and animals. Human urinary system, kidney anatomy, nephron filtration mechanics, kidney stones, and dialysis.',
  overviewUr: 'اندرونی توازن، پودوں میں گٹیشن، انسانی گردے کا نظام، نیفران میں پیشاب بننے کا طریقہ اور ڈائیلاسز۔',
  keyTerms: [
    { termEn: 'Homeostasis', termUr: 'ہومیوسٹیسس', definitionEn: 'Maintenance of constant internal body conditions despite external environmental fluctuations.', definitionUr: 'بیرونی تبدیلیوں کے باوجود جسم کے اندرونی حالات کو متوازن رکھنا۔' },
    { termEn: 'Nephron', termUr: 'نیفران', definitionEn: 'Microscopic functional filtering unit of the kidney.', definitionUr: 'گردے کی بنیادی فعال چھاننے والی اکائی۔' },
    { termEn: 'Lithotripsy', termUr: 'لیتھو ٹرپسی', definitionEn: 'Non-surgical fragmentation of kidney stones using shock waves.', definitionUr: 'الٹراسونک لہروں سے گردے کی پتھری توڑنے کا طریقہ۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_bio_11_1',
      unitId: 'unit_10_bio_11',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '11.1 Homeostasis in Plants',
      titleUr: '11.1 پودوں میں ہومیوسٹیسس',
      kptbbChapterRef: 'KPTBB Class 10 Biology, Section 11.1',
      durationMinutes: 15,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Removal of Excess Wastes in Plants',
            titleUr: 'پودوں میں فضلات اور پانی کا اخراج',
            bodyEn: 'Plants eliminate extra water via Transpiration (stomata) and Guttation (droplets forced out hydathodes at leaf tips due to root pressure at night). Metabolic wastes like Calcium Oxalate crystals are deposited in leaves and shed during autumn.',
            bodyUr: 'پودے ٹرانسپائریشن اور گٹیشن سے پانی خارج کرتے ہیں اور پت جھڑ میں زہریلے مادے گرا دیتے ہیں۔',
            kptbbRef: 'KPTBB Page 22',
          },
        },
      ],
    },
    {
      id: 'lsn_10_bio_11_2',
      unitId: 'unit_10_bio_11',
      subjectId: 'sub_bio',
      lessonNumber: 2,
      titleEn: '11.2 Structure of Kidney & The Nephron Simulator',
      titleUr: '11.2 گردے کی ساخت اور نیفران ماڈل',
      kptbbChapterRef: 'KPTBB Class 10 Biology, Section 11.2',
      durationMinutes: 18,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Urine Formation in 3 Steps',
            titleUr: 'پیشاب بننے کے 3 مراحل',
            bodyEn: '1. Pressure Filtration: Glomerulus forces water, glucose, and urea into Bowman\'s capsule.\n2. Selective Reabsorption: 99% of filtrate (100% glucose) is reabsorbed in PCT and Loop of Henle.\n3. Tubular Secretion: Ions and drugs secreted to balance blood pH.\n\nExplore this in the live interactive simulator below!',
            bodyUr: 'الٹرا فلٹریشن، انتخابی انجذاب اور ٹیوبولر رطوبت کے ذریعے پیشاب بنتا ہے۔',
            kptbbRef: 'KPTBB Page 25',
          },
        },
        {
          id: 'b2',
          type: 'animation',
          order: 2,
          data: {
            simulatorType: 'nephron_simulator',
          },
        },
      ],
    },
  ],
});

registerQuiz('quiz_10_bio_11', 'unit_10_bio_11', 'Chapter 11 Exam: Homeostasis', 'باب 11 کا امتحانی ٹیسٹ: ہومیوسٹیسس', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_11',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'What is the structural and functional unit of the human kidney?',
    promptUr: 'انسانی گردے کی بنیادی فعال اکائی کیا ہے؟',
    options: [
      { id: 'a', textEn: 'Neuron', textUr: 'نیورون' },
      { id: 'b', textEn: 'Nephron', textUr: 'نیفران' },
      { id: 'c', textEn: 'Alveolus', textUr: 'ایلویولس' },
    ],
    correctOptionId: 'b',
    explanationEn: 'Nephrons filter blood and produce urine.',
    explanationUr: 'نیفران گردے کی چھاننے والی بنیادی اکائی ہے۔',
    kptbbRef: 'Page 25',
    tags: ['bio10'],
  },
]);

// Ch 12: Coordination & Control
units.push({
  id: 'unit_10_bio_12',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 12,
  titleEn: 'Chapter 12: Coordination & Control',
  titleUr: 'باب 12: کوآرڈینیشن اور کنٹرول',
  kptbbChapter: 12,
  quizId: 'quiz_10_bio_12',
  overviewEn: 'Human nervous system, structure of neuron, reflex arcs, brain anatomy (Cerebrum, Cerebellum, Medulla), spinal cord, sense organs, and endocrine system.',
  overviewUr: 'اعصابی نظام، نیورون، دماغ کے تین حصے، ریفلیکس آرک اور پٹیوٹری سمیت اہم غدود۔',
  lessons: [
    {
      id: 'lsn_10_bio_12_1',
      unitId: 'unit_10_bio_12',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '12.1 Neurons & Reflex Arc',
      titleUr: '12.1 نیورون اور ریفلیکس آرک',
      kptbbChapterRef: 'KPTBB Section 12.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Structure of the Nerve Cell',
            titleUr: 'نیورون کی ساخت اور اعصابی پیغام',
            bodyEn: 'Neuron consists of Soma (cell body), Dendrites (carry impulses toward soma), and Axon (carries impulses away, insulated by myelin sheath). Reflex arc is the neural pathway of an involuntary reflex: Receptor -> Sensory -> Interneuron -> Motor -> Effector.',
            bodyUr: 'ڈینڈرائٹس پیغام لاتے ہیں اور ایکسان پیغام آگے بھیجتا ہے۔ ریفلیکس آرک خودکار فوری ردعمل کا راستہ ہے۔',
            kptbbRef: 'Page 38',
          },
        },
      ],
    },
    {
      id: 'lsn_10_bio_12_2',
      unitId: 'unit_10_bio_12',
      subjectId: 'sub_bio',
      lessonNumber: 2,
      titleEn: '12.2 Brain & Endocrine System',
      titleUr: '12.2 دماغ کے حصے اور ہارمونز کا نظام',
      kptbbChapterRef: 'KPTBB Section 12.2',
      durationMinutes: 18,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Forebrain, Midbrain, Hindbrain & Hormones',
            titleUr: 'دماغ اور اہم ہارمونز کے غدود',
            bodyEn: 'Cerebrum controls memory & speech; Cerebellum controls balance; Medulla controls heartbeat & breathing. Pituitary secretes growth hormone; Pancreas secretes Insulin (lowers blood sugar) and Glucagon.',
            bodyUr: 'سیریبرم سوچ، سیریبیلم توازن اور میڈولا اوبلانگیٹا سانس اور دل کی دھڑکن کنٹرول کرتا ہے۔ انسولین شوگر کم کرتی ہے۔',
            kptbbRef: 'Page 44',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_bio_12', 'unit_10_bio_12', 'Chapter 12 Exam: Coordination', 'باب 12 کا ٹیسٹ: کوآرڈینیشن', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_12',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'Which part of the brain coordinates muscle movements and maintains posture?',
    promptUr: 'دماغ کا کون سا حصہ عضلات کی حرکات میں توازن قائم رکھتا ہے؟',
    options: [
      { id: 'a', textEn: 'Cerebrum', textUr: 'سیریبرم' },
      { id: 'b', textEn: 'Cerebellum', textUr: 'سیریبیلم' },
      { id: 'c', textEn: 'Thalamus', textUr: 'تھلیمس' },
    ],
    correctOptionId: 'b',
    explanationEn: 'Cerebellum coordinates voluntary muscle movements and bodily equilibrium.',
    explanationUr: 'سیریبیلم جسمانی توازن قائم رکھتا ہے۔',
    kptbbRef: 'Page 44',
    tags: ['bio10'],
  },
]);

// Ch 13: Support and Movement
units.push({
  id: 'unit_10_bio_13',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 13,
  titleEn: 'Chapter 13: Support & Movement',
  titleUr: 'باب 13: سپورٹ اور حرکت',
  kptbbChapter: 13,
  quizId: 'quiz_10_bio_13',
  overviewEn: 'Human skeleton (206 bones: 80 axial + 126 appendicular), cartilage, joints (hinge, ball-and-socket), tendons, ligaments, antagonistic muscles (biceps and triceps), and arthritis.',
  overviewUr: 'انسانی ڈھانچہ، ہڈی اور کارٹیلیج، جوڑوں کی اقسام، مسلز کی حرکت اور گٹھیا کی بیماریاں۔',
  lessons: [
    {
      id: 'lsn_10_bio_13_1',
      unitId: 'unit_10_bio_13',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '13.1 Human Skeleton, Joints & Antagonism',
      titleUr: '13.1 انسانی ڈھانچہ، جوڑ اور اینٹاگونسٹک مسلز',
      kptbbChapterRef: 'KPTBB Section 13.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Bones, Cartilage and Antagonistic Muscles',
            titleUr: 'ہڈیاں، جوڑ اور مخالف مسلز کی جوڑیاں',
            bodyEn: 'Human skeleton has 206 bones (80 Axial, 126 Appendicular). Tendons connect muscle to bone; Ligaments connect bone to bone. Synovial joints include Hinge joints (elbow, knee) and Ball-and-Socket joints (shoulder, hip). In antagonistic action, Biceps flexes the arm while Triceps extends it.',
            bodyUr: 'انسانی ڈھانچے میں 206 ہڈیاں ہوتی ہیں۔ ٹینڈنز مسل کو ہڈی سے اور لگامنٹس ہڈی کو ہڈی سے جوڑتے ہیں۔ بائی سیپس ہاتھ موڑتا ہے اور ٹرائی سیپس سیدھا کرتا ہے۔',
            kptbbRef: 'Page 55-62',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_bio_13', 'unit_10_bio_13', 'Chapter 13 Exam: Support & Movement', 'باب 13 کا ٹیسٹ: سپورٹ اور حرکت', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_13',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'Tough fibrous connective tissue connecting muscle to bone is called:',
    promptUr: 'مسل کو ہڈی کے ساتھ جوڑنے والی مضبوط پٹی کیا کہلاتی ہے؟',
    options: [
      { id: 'a', textEn: 'Ligament', textUr: 'لگامنٹ' },
      { id: 'b', textEn: 'Tendon', textUr: 'ٹینڈن' },
      { id: 'c', textEn: 'Cartilage', textUr: 'کارٹیلیج' },
    ],
    correctOptionId: 'b',
    explanationEn: 'Tendons attach skeletal muscles firmly to bones.',
    explanationUr: 'ٹینڈنز مسل کو ہڈی سے جوڑتے ہیں۔',
    kptbbRef: 'Page 58',
    tags: ['bio10'],
  },
]);

// Ch 14: Reproduction
units.push({
  id: 'unit_10_bio_14',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 14,
  titleEn: 'Chapter 14: Reproduction',
  titleUr: 'باب 14: ری پروڈکشن (تولید)',
  kptbbChapter: 14,
  quizId: 'quiz_10_bio_14',
  overviewEn: 'Asexual vs sexual reproduction, vegetative propagation (bulbs, rhizomes, stem cuttings, grafting), flower structure, pollination, double fertilization, and seed germination.',
  overviewUr: 'پودوں اور جانوروں میں تولید، قلم کاری، پھول کی ساخت، پولینیشن اور بیج کا اگاؤ۔',
  lessons: [
    {
      id: 'lsn_10_bio_14_1',
      unitId: 'unit_10_bio_14',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '14.1 Plant Reproduction & Seed Germination',
      titleUr: '14.1 پودوں میں تولید اور بیج کا اگاؤ',
      kptbbChapterRef: 'KPTBB Section 14.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Asexual, Sexual Reproduction & Double Fertilization',
            titleUr: 'پھول کے اعضاء اور ڈبل فرٹیلائزیشن',
            bodyEn: 'Flowers contain male stamens (anther + filament) and female carpels (stigma, style, ovary). Double fertilization: One sperm fuses with egg to form 2n zygote; second sperm fuses with fusion nucleus to form 3n endosperm tissue that nourishes the embryo.',
            bodyUr: 'پھول میں اسٹیمن اور کارپل ہوتے ہیں۔ ڈبل فرٹیلائزیشن میں زائیگوٹ اور اینڈوسپرم بنتے ہیں۔',
            kptbbRef: 'Page 70-78',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_bio_14', 'unit_10_bio_14', 'Chapter 14 Exam: Reproduction', 'باب 14 کا ٹیسٹ: تولید', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_14',
    type: 'mcq',
    difficulty: 'medium',
    promptEn: 'In angiosperms, double fertilization results in the formation of:',
    promptUr: 'پھولدار پودوں میں ڈبل فرٹیلائزیشن کے نتیجے میں کیا بنتا ہے؟',
    options: [
      { id: 'a', textEn: 'Zygote (2n) and Endosperm (3n)', textUr: 'زائیگوٹ (2n) اور اینڈوسپرم (3n)' },
      { id: 'b', textEn: 'Two identical seeds', textUr: 'دو بیج' },
      { id: 'c', textEn: 'Only pollen grains', textUr: 'پولن گرینز' },
    ],
    correctOptionId: 'a',
    explanationEn: 'One sperm fertilizes egg (zygote), other fertilizes polar nuclei (endosperm).',
    explanationUr: 'ایک سپرم زائیگوٹ اور دوسرا اینڈوسپرم بناتا ہے۔',
    kptbbRef: 'Page 75',
    tags: ['bio10'],
  },
]);

// Ch 15: Inheritance
units.push({
  id: 'unit_10_bio_15',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 15,
  titleEn: 'Chapter 15: Inheritance',
  titleUr: 'باب 15: وراثت (Inheritance)',
  kptbbChapter: 15,
  quizId: 'quiz_10_bio_15',
  overviewEn: 'DNA structure, genes, chromosomes, Mendel\'s Law of Segregation and Law of Independent Assortment, co-dominance, incomplete dominance, and natural selection.',
  overviewUr: 'ڈی این اے، کروموسوم، مینڈل کے وراثت کے قوانین اور ڈارون کا نظریہ انتخاب قدرتی۔',
  lessons: [
    {
      id: 'lsn_10_bio_15_1',
      unitId: 'unit_10_bio_15',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '15.1 DNA Structure & Mendel\'s Laws',
      titleUr: '15.1 ڈی این اے کی ساخت اور مینڈل کے قوانین',
      kptbbChapterRef: 'KPTBB Section 15.1',
      durationMinutes: 18,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Watson & Crick Model & Monohybrid Cross',
            titleUr: 'ڈی این اے کا ماڈل اور مینڈل کے تجربات',
            bodyEn: 'DNA is a double helix composed of nucleotides (A pairs with T, G pairs with C). Mendel discovered Law of Segregation (alleles separate during gamete formation, giving 3:1 phenotypic ratio in monohybrid cross) and Law of Independent Assortment (9:3:3:1 in dihybrid cross).',
            bodyUr: 'ڈی این اے ڈبل ہیلکس ہوتا ہے۔ مینڈل کے قانون کے مطابق مونائی ہائبرڈ کراس میں 3:1 کا تناسب حاصل ہوتا ہے۔',
            kptbbRef: 'Page 90-98',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_bio_15', 'unit_10_bio_15', 'Chapter 15 Exam: Inheritance', 'باب 15 کا ٹیسٹ: وراثت', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_15',
    type: 'mcq',
    difficulty: 'medium',
    promptEn: 'What is the phenotypic ratio in the F2 generation of a monohybrid cross?',
    promptUr: 'مونو ہائبرڈ کراس کی F2 نسل میں فینوٹائپک تناسب کیا ہوتا ہے؟',
    options: [
      { id: 'a', textEn: '3:1', textUr: '3:1' },
      { id: 'b', textEn: '9:3:3:1', textUr: '9:3:3:1' },
      { id: 'c', textEn: '1:2:1', textUr: '1:2:1' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Mendel observed 3 dominant to 1 recessive phenotype in monohybrid crosses.',
    explanationUr: 'مونو ہائبرڈ کراس میں 3 غالب اور 1 مغلوب حاصل ہوتے ہیں۔',
    kptbbRef: 'Page 95',
    tags: ['bio10'],
  },
]);

// Ch 16: Man and His Environment
units.push({
  id: 'unit_10_bio_16',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 16,
  titleEn: 'Chapter 16: Man & His Environment',
  titleUr: 'باب 16: انسان اور اس کا ماحول',
  kptbbChapter: 16,
  quizId: 'quiz_10_bio_16',
  overviewEn: 'Ecosystem components, food chains, food webs, pyramids of energy, nitrogen and carbon cycles, symbiosis (mutualism, commensalism, parasitism), and pollution control in Swat.',
  overviewUr: 'ایکوسسٹم، فوڈ چین، نائٹروجن کا چکر، باہمی تعلقات اور ماحولیاتی آلودگی۔',
  lessons: [
    {
      id: 'lsn_10_bio_16_1',
      unitId: 'unit_10_bio_16',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '16.1 Ecosystems, Energy Flow & Symbiosis',
      titleUr: '16.1 ایکوسسٹم، توانائی کی منتقلی اور سمبیوسس',
      kptbbChapterRef: 'KPTBB Section 16.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Producers, Consumers and Ecological Interactions',
            titleUr: 'پروڈیوسرز، کنزیومرز اور باہمی تعلقات',
            bodyEn: 'Only ~10% of energy is transferred from one trophic level to the next. Symbiotic interactions include: Mutualism (both benefit, e.g. lichens, root nodules), Commensalism (one benefits, other unharmed, e.g. epiphytes), Parasitism (one benefits at expense of host).',
            bodyUr: 'ایک ٹرافک لیول سے دوسرے تک صرف 10 فیصد توانائی منتقل ہوتی ہے۔ میوچولزم میں دونوں کو فائدہ ہوتا ہے۔',
            kptbbRef: 'Page 110-120',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_bio_16', 'unit_10_bio_16', 'Chapter 16 Exam: Environment', 'باب 16 کا ٹیسٹ: ماحول', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_16',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'An association between two organisms where both benefit is known as:',
    promptUr: 'دو جانداروں کا ایسا تعلق جس میں دونوں کو فائدہ پہنچے کیا کہلاتا ہے؟',
    options: [
      { id: 'a', textEn: 'Mutualism', textUr: 'میوچولزم' },
      { id: 'b', textEn: 'Parasitism', textUr: 'پیراسائٹزم' },
      { id: 'c', textEn: 'Predation', textUr: 'پریڈیشن' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Mutualism is an obligate or facultative symbiotic relationship where both species benefit.',
    explanationUr: 'میوچولزم میں دونوں جاندار باہمی فائدے کے لیے اکٹھے رہتے ہیں۔',
    kptbbRef: 'Page 116',
    tags: ['bio10'],
  },
]);

// Ch 17: Biotechnology
units.push({
  id: 'unit_10_bio_17',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 17,
  titleEn: 'Chapter 17: Biotechnology',
  titleUr: 'باب 17: بائیو ٹیکنالوجی',
  kptbbChapter: 17,
  quizId: 'quiz_10_bio_17',
  overviewEn: 'Fermentation (lactic acid and alcoholic), industrial fermenters, genetic engineering steps (gene isolation, vector plasmid, recombinant DNA), and production of human insulin.',
  overviewUr: 'فرمنٹیشن، جینیٹک انجینئرنگ اور انسانی انسولین کی تیاری۔',
  lessons: [
    {
      id: 'lsn_10_bio_17_1',
      unitId: 'unit_10_bio_17',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '17.1 Fermentation & Genetic Engineering',
      titleUr: '17.1 فرمنٹیشن اور جینیٹک انجینئرنگ کے مراحل',
      kptbbChapterRef: 'KPTBB Section 17.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Steps in Genetic Engineering',
            titleUr: 'انسانی انسولین بنانے کا طریقہ کار',
            bodyEn: '1. Isolation of gene of interest (human insulin gene).\n2. Insertion of gene into vector (bacterial plasmid cut by restriction endonuclease).\n3. Recombinant DNA sealed by DNA ligase.\n4. Transfer of recombinant plasmid into host bacterium (E. coli).\n5. Growth in industrial fermenter to produce massive quantities of human insulin.',
            bodyUr: 'انسولین کا جین نکال کر بیکٹیریل پلازمڈ میں جوڑا جاتا ہے اور بیکٹیریا کے ذریعے خالص انسانی انسولین تیار کی جاتی ہے۔',
            kptbbRef: 'Page 130-136',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_bio_17', 'unit_10_bio_17', 'Chapter 17 Exam: Biotechnology', 'باب 17 کا ٹیسٹ: بائیو ٹیکنالوجی', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_17',
    type: 'mcq',
    difficulty: 'medium',
    promptEn: 'Which vector is most commonly used to carry foreign genes into host bacteria?',
    promptUr: 'غیر ملکی جین کو بیکٹیریا میں داخل کرنے کے لیے کون سا ویکٹر استعمال ہوتا ہے؟',
    options: [
      { id: 'a', textEn: 'Bacterial Plasmid', textUr: 'پلازمڈ' },
      { id: 'b', textEn: 'Ribosome', textUr: 'رائبوسوم' },
      { id: 'c', textEn: 'Mitochondrion', textUr: 'مائٹوکونڈریا' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Plasmids are circular extra-chromosomal DNA molecules used as cloning vectors.',
    explanationUr: 'پلازمڈ بیکٹیریا کا گول ڈی این اے ہے جو جین لے جانے کا کام کرتا ہے۔',
    kptbbRef: 'Page 132',
    tags: ['bio10'],
  },
]);

// Ch 18: Pharmacology
units.push({
  id: 'unit_10_bio_18',
  subjectId: 'sub_bio',
  classId: 'class_10',
  unitNumber: 18,
  titleEn: 'Chapter 18: Pharmacology',
  titleUr: 'باب 18: فارماکولوجی (ادویات کا علم)',
  kptbbChapter: 18,
  quizId: 'quiz_10_bio_18',
  overviewEn: 'Medicinal drugs and sources (plants, animals, minerals, synthetic), antibiotics (bactericidal vs bacteriostatic), antibiotic resistance, vaccines, and addictive drugs (narcotics, sedatives).',
  overviewUr: 'ادویات کے ذرائع، اینٹی بائیوٹکس کا طریقہ کار، ویکسین اور نشہ آور ادویات۔',
  lessons: [
    {
      id: 'lsn_10_bio_18_1',
      unitId: 'unit_10_bio_18',
      subjectId: 'sub_bio',
      lessonNumber: 1,
      titleEn: '18.1 Drug Sources, Antibiotics & Vaccines',
      titleUr: '18.1 ادویات کے ذرائع، اینٹی بائیوٹکس اور ویکسین',
      kptbbChapterRef: 'KPTBB Section 18.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Antibiotics vs Vaccines',
            titleUr: 'اینٹی بائیوٹکس اور ویکسین میں فرق',
            bodyEn: 'Antibiotics kill bacteria (Bactericidal) or inhibit their growth (Bacteriostatic). Penicillin was discovered by Sir Alexander Fleming in 1928 from Penicillium fungus. Vaccines contain killed or weakened pathogens that stimulate immune memory without causing illness.',
            bodyUr: 'اینٹی بائیوٹکس بیکٹیریا کو ہلاک کرتی ہیں۔ پینسلین 1928 میں الیگزینڈر فلیمنگ نے دریافت کی۔ ویکسین قوت مدافعت پیدا کرتی ہے۔',
            kptbbRef: 'Page 145-152',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_bio_18', 'unit_10_bio_18', 'Chapter 18 Exam: Pharmacology', 'باب 18 کا ٹیسٹ: فارماکولوجی', [
  {
    id: 'q1',
    unitId: 'unit_10_bio_18',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'Who discovered the first antibiotic, Penicillin, in 1928?',
    promptUr: '1928 میں پہلی اینٹی بائیوٹک پینسلین کس نے دریافت کی؟',
    options: [
      { id: 'a', textEn: 'Sir Alexander Fleming', textUr: 'سر الیگزینڈر فلیمنگ' },
      { id: 'b', textEn: 'Louis Pasteur', textUr: 'لوئس پاسچر' },
      { id: 'c', textEn: 'Edward Jenner', textUr: 'ایڈورڈ جینر' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Fleming discovered Penicillin from Penicillium notatum fungus.',
    explanationUr: 'الیگزینڈر فلیمنگ نے پینسلین دریافت کی تھی۔',
    kptbbRef: 'Page 148',
    tags: ['bio10'],
  },
]);

// =========================================================================
// CLASS 10 CHEMISTRY (CHAPTERS 9 TO 16)
// =========================================================================

// Ch 9: Chemical Equilibrium
units.push({
  id: 'unit_10_chem_9',
  subjectId: 'sub_chem',
  classId: 'class_10',
  unitNumber: 9,
  titleEn: 'Chapter 9: Chemical Equilibrium',
  titleUr: 'باب 9: کیمیائی توازن',
  kptbbChapter: 9,
  quizId: 'quiz_10_chem_9',
  overviewEn: 'Reversible reactions, dynamic equilibrium, Law of Mass Action, equilibrium constant Kc expression, and Le Chatelier\'s principle in Haber process.',
  overviewUr: 'ریورسیبل ری ایکشنز، متحرک توازن، لاء آف ماس ایکشن، Kc مساوات اور ہیبر پراسیس۔',
  formulas: [
    { labelEn: 'Equilibrium Constant Expression', labelUr: 'ایکویلیبریم کانسٹنٹ فارمولا', formula: 'Kc = [Products]^c / [Reactants]^r', explanationEn: 'Ratio of product concentrations to reactant concentrations at equilibrium.', explanationUr: 'توازن کی حالت میں پراڈکٹس اور ری ایکٹنٹس کا تناسب۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_chem_9_1',
      unitId: 'unit_10_chem_9',
      subjectId: 'sub_chem',
      lessonNumber: 1,
      titleEn: '9.1 Dynamic Equilibrium & Law of Mass Action',
      titleUr: '9.1 متحرک توازن اور لاء آف ماس ایکشن',
      kptbbChapterRef: 'KPTBB Class 10 Chemistry, Section 9.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'How Dynamic Equilibrium is Established',
            titleUr: 'کیمیائی توازن کیسے قائم ہوتا ہے؟',
            bodyEn: 'When the rate of forward reaction equals the rate of reverse reaction, a Dynamic Equilibrium is reached. Law of Mass Action (Guldberg & Waage, 1869) states that the rate of reaction is directly proportional to the product of active masses of reacting substances.',
            bodyUr: 'جب فارورڈ اور ریورس ری ایکشن کی رفتار برابر ہو جائے تو ڈائنامک ایکویلیبریم قائم ہوتا ہے۔',
            kptbbRef: 'Page 2-5',
          },
        },
      ],
    },
    {
      id: 'lsn_10_chem_9_2',
      unitId: 'unit_10_chem_9',
      subjectId: 'sub_chem',
      lessonNumber: 2,
      titleEn: '9.2 Le Chatelier\'s Principle & Haber Process Simulator',
      titleUr: '9.2 لی شاٹلیئر کا اصول اور ہیبر پراسیس ماڈل',
      kptbbChapterRef: 'KPTBB Class 10 Chemistry, Section 9.2',
      durationMinutes: 18,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Optimum Conditions for Ammonia Synthesis',
            titleUr: 'امونیا بنانے کی بہترین صنعتی شرائط',
            bodyEn: 'N2 + 3H2 ⇌ 2NH3 + Heat. Exothermic reaction. High pressure (200 atm) shifts equilibrium forward. Optimum temperature is 450°C with Iron catalyst.',
            bodyUr: 'ہیبر پراسیس میں 450 سینٹی گریڈ اور 200 ایٹماسفیئر دباؤ بہترین پیداوار دیتے ہیں۔',
            kptbbRef: 'Page 10',
          },
        },
        {
          id: 'b2',
          type: 'animation',
          order: 2,
          data: {
            simulatorType: 'equilibrium_simulator',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_chem_9', 'unit_10_chem_9', 'Chapter 9 Exam: Chemical Equilibrium', 'باب 9 کا ٹیسٹ: کیمیائی توازن', [
  {
    id: 'q1',
    unitId: 'unit_10_chem_9',
    type: 'mcq',
    difficulty: 'medium',
    promptEn: 'For the Haber process N2 + 3H2 ⇌ 2NH3, increasing pressure shifts equilibrium:',
    promptUr: 'ہیبر پراسیس میں دباؤ بڑھانے سے توازن کس طرف جائے گا؟',
    options: [
      { id: 'a', textEn: 'Forward (producing more NH3)', textUr: 'فارورڈ (امونیا زیادہ بنے گی)' },
      { id: 'b', textEn: 'Backward (producing more N2 & H2)', textUr: 'ریورس' },
      { id: 'c', textEn: 'No effect', textUr: 'کوئی اثر نہیں' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Higher pressure favors the side with fewer gas moles (4 moles -> 2 moles).',
    explanationUr: 'زیادہ دباؤ کم گیس مالیکیولز کی طرف جھکاؤ پیدا کرتا ہے۔',
    kptbbRef: 'Page 10',
    tags: ['chem10'],
  },
]);

// Ch 10: Acids, Bases & Salts
units.push({
  id: 'unit_10_chem_10',
  subjectId: 'sub_chem',
  classId: 'class_10',
  unitNumber: 10,
  titleEn: 'Chapter 10: Acids, Bases & Salts',
  titleUr: 'باب 10: تیزاب، اساس اور نمکیات',
  kptbbChapter: 10,
  quizId: 'quiz_10_chem_10',
  overviewEn: 'Arrhenius, Bronsted-Lowry, and Lewis acid-base theories, pH and pOH scale, neutralization, and preparation of soluble and insoluble salts.',
  overviewUr: 'تیزاب اور اساس کے جدید نظریات، پی ایچ (pH) کا پیمانہ اور نمکیات کی تیاری۔',
  lessons: [
    {
      id: 'lsn_10_chem_10_1',
      unitId: 'unit_10_chem_10',
      subjectId: 'sub_chem',
      lessonNumber: 1,
      titleEn: '10.1 Acid-Base Theories & The pH Scale',
      titleUr: '10.1 تیزاب اور اساس کے نظریات اور pH پیمانہ',
      kptbbChapterRef: 'KPTBB Section 10.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Three Classic Concepts of Acids and Bases',
            titleUr: 'آرہی نیس، برونسٹڈ لوری اور لیوس نظریات',
            bodyEn: '• Arrhenius: Acid gives H+ in water; Base gives OH- in water.\n• Brønsted-Lowry: Acid is a proton (H+) donor; Base is a proton acceptor.\n• Lewis: Acid is an electron-pair acceptor; Base is an electron-pair donor.\n• pH = -log[H+]. Neutral water has pH = 7. Acidic pH < 7, Basic pH > 7.',
            bodyUr: 'برونسٹڈ لوری کے مطابق تیزاب پروٹون دیتا ہے اور اساس پروٹون قبول کرتی ہے۔ پی ایچ 7 سے کم تیزابی اور 7 سے زیادہ اساسی ہوتی ہے۔',
            kptbbRef: 'Page 22-30',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_chem_10', 'unit_10_chem_10', 'Chapter 10 Exam: Acids & Bases', 'باب 10 کا ٹیسٹ: تیزاب اور اساس', [
  {
    id: 'q1',
    unitId: 'unit_10_chem_10',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'According to Bronsted-Lowry theory, an acid is a substance that:',
    promptUr: 'برونسٹڈ لوری نظریے کے مطابق تیزاب وہ شے ہے جو:',
    options: [
      { id: 'a', textEn: 'Donates a proton (H+)', textUr: 'پروٹون (H+) دیتی ہے' },
      { id: 'b', textEn: 'Accepts a proton', textUr: 'پروٹون لیتی ہے' },
      { id: 'c', textEn: 'Gives OH- ions only', textUr: 'صرف OH- دیتی ہے' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Acids are proton donors; bases are proton acceptors.',
    explanationUr: 'تیزاب پروٹون دینے والا مادہ ہے۔',
    kptbbRef: 'Page 23',
    tags: ['chem10'],
  },
]);

// Ch 11: Organic Chemistry
units.push({
  id: 'unit_10_chem_11',
  subjectId: 'sub_chem',
  classId: 'class_10',
  unitNumber: 11,
  titleEn: 'Chapter 11: Organic Chemistry',
  titleUr: 'باب 11: آرگینک کیمسٹری',
  kptbbChapter: 11,
  quizId: 'quiz_10_chem_11',
  overviewEn: 'Catenation, classification of organic compounds, homologous series, functional groups (alcohols, aldehydes, carboxylic acids), and fossil fuels (coal, petroleum, natural gas).',
  overviewUr: 'کاربن کی کیٹینیشن، فنکشنل گروپس اور کوئلہ، پٹرولیم و قدرتی گیس۔',
  lessons: [
    {
      id: 'lsn_10_chem_11_1',
      unitId: 'unit_10_chem_11',
      subjectId: 'sub_chem',
      lessonNumber: 1,
      titleEn: '11.1 Catenation & Functional Groups',
      titleUr: '11.1 کیٹینیشن اور فنکشنل گروپس',
      kptbbChapterRef: 'KPTBB Section 11.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'The Unique Chemistry of Carbon',
            titleUr: 'کاربن کا جڑنے کا خاص وصف (کیٹینیشن)',
            bodyEn: 'Catenation is the ability of carbon atoms to link together to form long open chains or closed rings. Functional groups impart characteristic chemical properties: -OH (Alcohol), -CHO (Aldehyde), -COOH (Carboxylic Acid), -CO- (Ketone), -COO- (Ester).',
            bodyUr: 'کیٹینیشن کاربن کے آپس میں لمبی زنجیریں بنانے کی صلاحیت ہے۔ الکوحل کا فنکشنل گروپ -OH اور تیزاب کا -COOH ہوتا ہے۔',
            kptbbRef: 'Page 45-55',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_chem_11', 'unit_10_chem_11', 'Chapter 11 Exam: Organic Chemistry', 'باب 11 کا ٹیسٹ: آرگینک کیمسٹری', [
  {
    id: 'q1',
    unitId: 'unit_10_chem_11',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'The functional group of an alcohol is:',
    promptUr: 'الکوحل کا فنکشنل گروپ کیا ہے؟',
    options: [
      { id: 'a', textEn: '-OH', textUr: '-OH' },
      { id: 'b', textEn: '-CHO', textUr: '-CHO' },
      { id: 'c', textEn: '-COOH', textUr: '-COOH' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Hydroxyl group (-OH) is the characteristic functional group of alcohols.',
    explanationUr: '-OH الکوحل کا فنکشنل گروپ ہے۔',
    kptbbRef: 'Page 50',
    tags: ['chem10'],
  },
]);

// Ch 12: Hydrocarbons
units.push({
  id: 'unit_10_chem_12',
  subjectId: 'sub_chem',
  classId: 'class_10',
  unitNumber: 12,
  titleEn: 'Chapter 12: Hydrocarbons',
  titleUr: 'باب 12: ہائیڈرو کاربنز',
  kptbbChapter: 12,
  quizId: 'quiz_10_chem_12',
  overviewEn: 'Alkanes (CnH2n+2, free-radical halogenation), Alkenes (CnH2n, hydrogenation, addition of halogens), and Alkynes (CnH2n-2, combustion, oxidation with KMnO4).',
  overviewUr: 'الکین، الکین اور الکائن کی تیاری، مساواتیں اور خصوصیات۔',
  lessons: [
    {
      id: 'lsn_10_chem_12_1',
      unitId: 'unit_10_chem_12',
      subjectId: 'sub_chem',
      lessonNumber: 1,
      titleEn: '12.1 Alkanes, Alkenes & Alkynes',
      titleUr: '12.1 الکینز، الکینز اور الکائنز کا تعارف',
      kptbbChapterRef: 'KPTBB Section 12.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Saturated vs Unsaturated Hydrocarbons',
            titleUr: 'سیر شدہ اور غیر سیر شدہ ہائیڈرو کاربنز',
            bodyEn: '• Alkanes: Saturated hydrocarbons with single C-C bonds (CnH2n+2). Less reactive (paraffins); undergo substitution reactions.\n• Alkenes: Unsaturated with at least one double C=C bond (CnH2n). Undergo addition reactions.\n• Alkynes: Unsaturated with at least one triple C≡C bond (CnH2n-2).',
            bodyUr: 'الکین میں سنگل بانڈ، الکین میں ڈبل بانڈ اور الکائن میں ٹرپل بانڈ ہوتا ہے۔',
            kptbbRef: 'Page 65-75',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_chem_12', 'unit_10_chem_12', 'Chapter 12 Exam: Hydrocarbons', 'باب 12 کا ٹیسٹ: ہائیڈرو کاربنز', [
  {
    id: 'q1',
    unitId: 'unit_10_chem_12',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'General formula of Alkanes is:',
    promptUr: 'الکینز کا عمومی فارمولا کیا ہے؟',
    options: [
      { id: 'a', textEn: 'CnH2n+2', textUr: 'CnH2n+2' },
      { id: 'b', textEn: 'CnH2n', textUr: 'CnH2n' },
      { id: 'c', textEn: 'CnH2n-2', textUr: 'CnH2n-2' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Alkanes have general formula CnH2n+2 (e.g. Methane CH4, Ethane C2H6).',
    explanationUr: 'الکینز کا عمومی فارمولا CnH2n+2 ہے۔',
    kptbbRef: 'Page 66',
    tags: ['chem10'],
  },
]);

// =========================================================================
// CLASS 10 MATHEMATICS (UNITS 1 TO 7)
// =========================================================================

// Unit 1: Quadratic Equations
units.push({
  id: 'unit_10_math_1',
  subjectId: 'sub_math',
  classId: 'class_10',
  unitNumber: 1,
  titleEn: 'Unit 1: Quadratic Equations',
  titleUr: 'یونٹ 1: دو درجی مساواتیں',
  kptbbChapter: 1,
  quizId: 'quiz_10_math_1',
  overviewEn: 'Standard quadratic form ax² + bx + c = 0, solution by factorization, completing the square, and quadratic formula.',
  overviewUr: 'دو درجی مساواتیں حل کرنے کے طریقے اور فارمولا۔',
  formulas: [
    { labelEn: 'Quadratic Formula', labelUr: 'دو درجی فارمولا', formula: 'x = [-b ± √(b² - 4ac)] / (2a)', explanationEn: 'Finds roots of ax² + bx + c = 0.', explanationUr: 'دو درجی مساوات کے جزر نکالنے کا کلیہ۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_math_1_1',
      unitId: 'unit_10_math_1',
      subjectId: 'sub_math',
      lessonNumber: 1,
      titleEn: '1.1 Solving Quadratic Equations & Simulator',
      titleUr: '1.1 دو درجی مساوات اور کمپیوٹر ماڈل',
      kptbbChapterRef: 'KPTBB Unit 1',
      durationMinutes: 18,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Standard Form and Formula',
            titleUr: 'دو درجی مساوات اور اس کا حل',
            bodyEn: 'General quadratic equation ax² + bx + c = 0 has solutions given by x = [-b ± √(b² - 4ac)] / 2a. Discriminant D = b² - 4ac determines the nature of the roots.',
            bodyUr: 'دو درجی فارمولا ہر قسم کی دو درجی مساوات کو باآسانی حل کر دیتا ہے۔',
            kptbbRef: 'Page 2-8',
          },
        },
        {
          id: 'b2',
          type: 'animation',
          order: 2,
          data: {
            simulatorType: 'quadratic_simulator',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_math_1', 'unit_10_math_1', 'Unit 1 Exam: Quadratic Equations', 'یونٹ 1 کا ٹیسٹ: دو درجی مساوات', [
  {
    id: 'q1',
    unitId: 'unit_10_math_1',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'Standard form of a quadratic equation in one variable is:',
    promptUr: 'ایک متغیر میں دو درجی مساوات کی معیاری شکل کیا ہے؟',
    options: [
      { id: 'a', textEn: 'ax² + bx + c = 0 (a ≠ 0)', textUr: 'ax² + bx + c = 0 (a ≠ 0)' },
      { id: 'b', textEn: 'ax + b = 0', textUr: 'ax + b = 0' },
      { id: 'c', textEn: 'ax³ + bx² + c = 0', textUr: 'ax³ + bx² + c = 0' },
    ],
    correctOptionId: 'a',
    explanationEn: 'ax² + bx + c = 0 where a is non-zero is the second-degree standard polynomial.',
    explanationUr: 'ax² + bx + c = 0 دو درجی مساوات کی معیاری صورت ہے۔',
    kptbbRef: 'Page 2',
    tags: ['math10'],
  },
]);

// Unit 2: Theory of Quadratic Equations
units.push({
  id: 'unit_10_math_2',
  subjectId: 'sub_math',
  classId: 'class_10',
  unitNumber: 2,
  titleEn: 'Unit 2: Theory of Quadratic Equations',
  titleUr: 'یونٹ 2: دو درجی مساوات کا نظریہ',
  kptbbChapter: 2,
  quizId: 'quiz_10_math_2',
  overviewEn: 'Discriminant (b² - 4ac), nature of roots, cube roots of unity (1, ω, ω²), relation between roots and coefficients (S = -b/a, P = c/a), and synthetic division.',
  overviewUr: 'فرق کنندہ (Discriminant)، جزروں کی نوعیت، اکائی کے جزر المکعب اور سینتھیٹک ڈویژن۔',
  formulas: [
    { labelEn: 'Discriminant', labelUr: 'فرق کنندہ', formula: 'D = b² - 4ac', explanationEn: 'D > 0 gives real unequal roots; D = 0 gives real equal roots; D < 0 gives complex roots.', explanationUr: 'فرق کنندہ جزروں کی نوعیت ظاہر کرتا ہے۔' },
    { labelEn: 'Sum and Product of Roots', labelUr: 'جزروں کا مجموعہ اور حاصل ضرب', formula: 'Sum = -b / a, Product = c / a', explanationEn: 'Fundamental relations between coefficients and roots.', explanationUr: 'مجموعہ = -b/a اور حاصل ضرب = c/a۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_math_2_1',
      unitId: 'unit_10_math_2',
      subjectId: 'sub_math',
      lessonNumber: 1,
      titleEn: '2.1 Discriminant & Cube Roots of Unity',
      titleUr: '2.1 فرق کنندہ اور اکائی کے جزر المکعب',
      kptbbChapterRef: 'KPTBB Unit 2',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Nature of Roots & Properties of Omega',
            titleUr: 'جزروں کی نوعیت اور اومیگا (ω) کی خصوصیات',
            bodyEn: 'Cube roots of unity are 1, ω = (-1 + i√3)/2, and ω² = (-1 - i√3)/2.\nProperties:\n1. 1 + ω + ω² = 0\n2. ω³ = 1\n3. Each complex cube root is the square of the other.',
            bodyUr: 'اکائی کے جزر المکعب 1، اومیگا اور اومیگا اسکوائر ہوتے ہیں۔ ان کا مجموعہ صفر (1 + ω + ω² = 0) اور حاصل ضرب 1 (ω³ = 1) ہوتا ہے۔',
            kptbbRef: 'Page 18-25',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_math_2', 'unit_10_math_2', 'Unit 2 Exam: Theory of Roots', 'یونٹ 2 کا ٹیسٹ: جزروں کا نظریہ', [
  {
    id: 'q1',
    unitId: 'unit_10_math_2',
    type: 'mcq',
    difficulty: 'medium',
    promptEn: 'The sum of all three cube roots of unity (1 + ω + ω²) equals:',
    promptUr: 'اکائی کے تینوں جزر المکعب کا مجموعہ (1 + ω + ω²) کس کے برابر ہوتا ہے؟',
    options: [
      { id: 'a', textEn: '0', textUr: '0' },
      { id: 'b', textEn: '1', textUr: '1' },
      { id: 'c', textEn: '-1', textUr: '-1' },
    ],
    correctOptionId: 'a',
    explanationEn: 'The sum of the three cube roots of unity is identically zero.',
    explanationUr: '1 + ω + ω² = 0 ہوتا ہے۔',
    kptbbRef: 'Page 22',
    tags: ['math10'],
  },
]);

// Unit 7: Trigonometry
units.push({
  id: 'unit_10_math_7',
  subjectId: 'sub_math',
  classId: 'class_10',
  unitNumber: 7,
  titleEn: 'Unit 7: Introduction to Trigonometry',
  titleUr: 'یونٹ 7: علم مثلث (ٹرگنومیٹری)',
  kptbbChapter: 7,
  quizId: 'quiz_10_math_7',
  overviewEn: 'Measurement of angles (degrees and radians, π rad = 180°), arc length formula s = rθ, trigonometric ratios (sin, cos, tan), and fundamental identities (sin²θ + cos²θ = 1).',
  overviewUr: 'زاویوں کی پیمائش (ڈگری اور ریڈین)، قوس کی لمبائی s = rθ، اور بنیادی ٹرگنومیٹرک مساواتیں۔',
  formulas: [
    { labelEn: 'Arc Length Formula', labelUr: 'قوس کی لمبائی کا فارمولا', formula: 's = r * θ', explanationEn: 'Where s is arc length, r is circle radius, and θ is angle in radians.', explanationUr: 'جہاں θ لازمی طور پر ریڈین میں ہونا چاہیے۔' },
    { labelEn: 'Fundamental Identity', labelUr: 'بنیادی ٹرگنومیٹرک کلیہ', formula: 'sin²θ + cos²θ = 1', explanationEn: 'Pythagorean trigonometric identity valid for all real angles.', explanationUr: 'ہر زاویے کے لیے sin²θ + cos²θ = 1 ہوتا ہے۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_math_7_1',
      unitId: 'unit_10_math_7',
      subjectId: 'sub_math',
      lessonNumber: 1,
      titleEn: '7.1 Radians, Arc Length & Trig Identities',
      titleUr: '7.1 ریڈین، قوس کی لمبائی اور بنیادی کلیات',
      kptbbChapterRef: 'KPTBB Unit 7',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Radian Measure & Fundamental Identities',
            titleUr: 'ریڈین پیمائش اور ٹرگنومیٹری کے فارمولے',
            bodyEn: '180° = π radians (1 rad ≈ 57.296°). Arc length s = rθ (θ in radians). Fundamental identities:\n1. sin²θ + cos²θ = 1\n2. 1 + tan²θ = sec²θ\n3. 1 + cot²θ = csc²θ',
            bodyUr: '180 ڈگری پائی (π) ریڈین کے برابر ہوتا ہے۔ بنیادی کلیہ sin²θ + cos²θ = 1 ہے۔',
            kptbbRef: 'Page 140-150',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_math_7', 'unit_10_math_7', 'Unit 7 Exam: Trigonometry', 'یونٹ 7 کا ٹیسٹ: علم مثلث', [
  {
    id: 'q1',
    unitId: 'unit_10_math_7',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: '180 degrees is equivalent to how many radians?',
    promptUr: '180 ڈگری کتنے ریڈین کے برابر ہوتا ہے؟',
    options: [
      { id: 'a', textEn: 'π radians', textUr: 'π ریڈین' },
      { id: 'b', textEn: '2π radians', textUr: '2π ریڈین' },
      { id: 'c', textEn: 'π/2 radians', textUr: 'π/2 ریڈین' },
    ],
    correctOptionId: 'a',
    explanationEn: '180° = π rad (approximately 3.14159 radians).',
    explanationUr: '180 ڈگری پائی ریڈین کے برابر ہوتا ہے۔',
    kptbbRef: 'Page 142',
    tags: ['math10'],
  },
]);

// =========================================================================
// CLASS 10 PHYSICS (CHAPTERS 10 TO 18)
// =========================================================================

// Ch 10: SHM & Waves
units.push({
  id: 'unit_10_phy_10',
  subjectId: 'sub_physics',
  classId: 'class_10',
  unitNumber: 10,
  titleEn: 'Chapter 10: Simple Harmonic Motion & Waves',
  titleUr: 'باب 10: سادہ ہارمونک موشن اور لہریں',
  kptbbChapter: 10,
  quizId: 'quiz_10_phy_10',
  overviewEn: 'Simple harmonic motion (mass-spring, pendulum), wave equation v = fλ, transverse vs longitudinal waves, and ripple tank reflection, refraction, diffraction.',
  overviewUr: 'سادہ ہارمونک موشن، پینڈولم، ویو مساوات v = fλ اور ریپل ٹینک۔',
  formulas: [
    { labelEn: 'Pendulum Time Period', labelUr: 'پینڈولم ٹائم پیریڈ', formula: 'T = 2π √(l / g)', explanationEn: 'Time period of a simple pendulum.', explanationUr: 'لمبائی l اور کشش ثقل g کا کلیہ۔' },
    { labelEn: 'Wave Equation', labelUr: 'ویو مساوات', formula: 'v = f * λ', explanationEn: 'Wave speed v = frequency f * wavelength λ.', explanationUr: 'لہر کی رفتار کا فارمولا۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_phy_10_1',
      unitId: 'unit_10_phy_10',
      subjectId: 'sub_physics',
      lessonNumber: 1,
      titleEn: '10.1 Simple Harmonic Motion & Waves',
      titleUr: '10.1 سادہ ہارمونک موشن اور لہروں کی اقسام',
      kptbbChapterRef: 'KPTBB Class 10 Physics, Section 10.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'SHM Definition and Wave Formula',
            titleUr: 'سادہ ہارمونک موشن اور ویو مساوات',
            bodyEn: 'SHM: Acceleration is directly proportional to displacement from mean position and directed towards it (a ∝ -x). Wave equation v = fλ links velocity, frequency and wavelength.',
            bodyUr: 'سادہ ہارمونک موشن میں ایکسلریشن فاصلے کے متناسب ہوتا ہے اور اس کا رخ درمیانی پوزیشن کی طرف ہوتا ہے۔',
            kptbbRef: 'Page 2-8',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_phy_10', 'unit_10_phy_10', 'Chapter 10 Exam: SHM & Waves', 'باب 10 کا ٹیسٹ: ہارمونک موشن', [
  {
    id: 'q1',
    unitId: 'unit_10_phy_10',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'Which of the following is an example of simple harmonic motion?',
    promptUr: 'درج ذیل میں سے کون سا سادہ ہارمونک موشن کی مثال ہے؟',
    options: [
      { id: 'a', textEn: 'Motion of a simple pendulum', textUr: 'سادہ پینڈولم کی حرکت' },
      { id: 'b', textEn: 'Spinning top', textUr: 'گھومتا ہوا لٹو' },
      { id: 'c', textEn: 'Straight moving bus', textUr: 'سیدھی چلتی بس' },
    ],
    correctOptionId: 'a',
    explanationEn: 'The bob of a simple pendulum oscillates in SHM around its mean position.',
    explanationUr: 'سادہ پینڈولم کی حرکت سادہ ہارمونک موشن ہے۔',
    kptbbRef: 'Page 3',
    tags: ['phy10'],
  },
]);

// Ch 12: Geometrical Optics
units.push({
  id: 'unit_10_phy_12',
  subjectId: 'sub_physics',
  classId: 'class_10',
  unitNumber: 12,
  titleEn: 'Chapter 12: Geometrical Optics',
  titleUr: 'باب 12: ہندسی بصریات (آپٹکس)',
  kptbbChapter: 12,
  quizId: 'quiz_10_phy_12',
  overviewEn: 'Reflection, spherical mirrors (concave, convex), mirror formula (1/f = 1/p + 1/q), Snell\'s law of refraction, total internal reflection, optical fibers, lenses, and human eye defects.',
  overviewUr: 'روشنی کا انعکاس اور انعطاف، شیشے اور لینز کا فارمولا، آپٹیکل فائبر اور آنکھ کے نقائص۔',
  formulas: [
    { labelEn: 'Mirror and Lens Formula', labelUr: 'شیشے اور لینز کا فارمولا', formula: '1/f = 1/p + 1/q', explanationEn: 'f = focal length, p = object distance, q = image distance.', explanationUr: 'f فوکل لینتھ، p جسم کا فاصلہ، q شبیہ کا فاصلہ ہے۔' },
    { labelEn: 'Snell\'s Law', labelUr: 'سنیل کا قانون', formula: 'n = sin(i) / sin(r)', explanationEn: 'Refractive index n of medium.', explanationUr: 'انعطاف کا اشاریہ n = sin i / sin r۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_phy_12_1',
      unitId: 'unit_10_phy_12',
      subjectId: 'sub_physics',
      lessonNumber: 1,
      titleEn: '12.1 Reflection, Mirrors & Lenses',
      titleUr: '12.1 روشنی کا انعکاس اور لینز کا فارمولا',
      kptbbChapterRef: 'KPTBB Section 12.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Laws of Reflection and Mirror Formula',
            titleUr: 'روشنی کا انعکاس اور شیشے کا کلیہ',
            bodyEn: 'Laws of reflection: Angle of incidence = Angle of reflection. Mirror formula: 1/f = 1/p + 1/q. Total Internal Reflection occurs when angle of incidence exceeds critical angle, forming the basis of high-speed fiber optic internet in KP!',
            bodyUr: 'انعکاس کا زاویہ وقوع کے برابر ہوتا ہے۔ ٹوٹل انٹرنل ریفلیکشن آپٹیکل فائبر کی بنیاد ہے۔',
            kptbbRef: 'Page 35-45',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_phy_12', 'unit_10_phy_12', 'Chapter 12 Exam: Optics', 'باب 12 کا ٹیسٹ: بصریات', [
  {
    id: 'q1',
    unitId: 'unit_10_phy_12',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'The mirror formula connecting focal length f, object distance p, and image distance q is:',
    promptUr: 'فوکل لینتھ f، جسم کے فاصلے p اور امیج کے فاصلے q کا فارمولا کیا ہے؟',
    options: [
      { id: 'a', textEn: '1/f = 1/p + 1/q', textUr: '1/f = 1/p + 1/q' },
      { id: 'b', textEn: 'f = p * q', textUr: 'f = p * q' },
      { id: 'c', textEn: '1/f = 1/p - 1/q', textUr: '1/f = 1/p - 1/q' },
    ],
    correctOptionId: 'a',
    explanationEn: 'The Gaussian mirror/lens equation is 1/f = 1/p + 1/q.',
    explanationUr: 'شیشے کا فارمولا 1/f = 1/p + 1/q ہے۔',
    kptbbRef: 'Page 40',
    tags: ['phy10'],
  },
]);

// Ch 14: Current Electricity
units.push({
  id: 'unit_10_phy_14',
  subjectId: 'sub_physics',
  classId: 'class_10',
  unitNumber: 14,
  titleEn: 'Chapter 14: Current Electricity',
  titleUr: 'باب 14: کرنٹ الیکٹریسٹی',
  kptbbChapter: 14,
  quizId: 'quiz_10_phy_14',
  overviewEn: 'Electric current I = Q/t, potential difference, Ohm\'s law V = IR, series and parallel circuits, Joule\'s heating law H = I²Rt, and household electrical safety (fuse, circuit breaker).',
  overviewUr: 'برقی رو، اوہم کا قانون V = IR، سیریز اور پیرلل سرکٹس، اور برقی حفاظت۔',
  formulas: [
    { labelEn: 'Ohm\'s Law', labelUr: 'اوہم کا قانون', formula: 'V = I * R', explanationEn: 'Voltage = Current * Resistance.', explanationUr: 'وولٹیج = کرنٹ ضرب ریزسٹنس۔' },
    { labelEn: 'Joule\'s Heating Effect', labelUr: 'جول کا حرارتی قانون', formula: 'H = I² * R * t', explanationEn: 'Heat energy dissipated in a resistor.', explanationUr: 'ریزسٹر میں پیدا ہونے والی حرارتی توانائی۔' },
  ],
  lessons: [
    {
      id: 'lsn_10_phy_14_1',
      unitId: 'unit_10_phy_14',
      subjectId: 'sub_physics',
      lessonNumber: 1,
      titleEn: '14.1 Ohm\'s Law, Series & Parallel Circuits',
      titleUr: '14.1 اوہم کا قانون، سیریز اور پیرلل سرکٹ',
      kptbbChapterRef: 'KPTBB Section 14.1',
      durationMinutes: 16,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Ohm\'s Law and Circuit Combinations',
            titleUr: 'اوہم کا قانون اور ریزسٹرز کے جوڑ',
            bodyEn: 'Ohm\'s Law: Current I passing through a conductor is directly proportional to potential difference V across its ends, provided temperature remains constant (V = IR).\nSeries: Req = R1 + R2 + R3 (same current passes).\nParallel: 1/Req = 1/R1 + 1/R2 (same voltage across branches).',
            bodyUr: 'اوہم کا قانون کہتا ہے کہ V = IR۔ سیریز میں کرنٹ برابر ہوتا ہے اور پیرلل میں وولٹیج برابر ہوتا ہے۔',
            kptbbRef: 'Page 90-100',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_10_phy_14', 'unit_10_phy_14', 'Chapter 14 Exam: Current Electricity', 'باب 14 کا ٹیسٹ: کرنٹ الیکٹریسٹی', [
  {
    id: 'q1',
    unitId: 'unit_10_phy_14',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'According to Ohm\'s law, the mathematical relation between V, I and R is:',
    promptUr: 'اوہم کے قانون کے مطابق V، I اور R کے درمیان تعلق ہے:',
    options: [
      { id: 'a', textEn: 'V = I * R', textUr: 'V = I * R' },
      { id: 'b', textEn: 'V = I / R', textUr: 'V = I / R' },
      { id: 'c', textEn: 'I = V * R', textUr: 'I = V * R' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Ohm\'s law establishes V = IR.',
    explanationUr: 'اوہم کا فارمولا V = IR ہے۔',
    kptbbRef: 'Page 92',
    tags: ['phy10'],
  },
]);

// =========================================================================
// CLASS 9, CLASS 6-8, AND PRIMARY UNITS
// =========================================================================

// Class 9 Physics Kinematics
units.push({
  id: 'unit_9_phy_2',
  subjectId: 'sub_physics',
  classId: 'class_9',
  unitNumber: 2,
  titleEn: 'Unit 2: Kinematics (Motion in a Straight Line)',
  titleUr: 'یونٹ 2: کائنی میٹکس (حرکت کا مطالعہ)',
  kptbbChapter: 2,
  quizId: 'quiz_9_phy_2',
  overviewEn: 'Rest, motion, scalars vs vectors, speed, velocity, uniform acceleration, velocity-time graphs, and the 3 equations of motion.',
  overviewUr: 'حرکت کی اقسام، اسکیلرز اور ویکٹرز، رفتار، ایکسلریشن اور حرکت کی 3 مساواتیں۔',
  formulas: [
    { labelEn: 'First Equation of Motion', labelUr: 'حرکت کی پہلی مساوات', formula: 'vf = vi + a * t', explanationEn: 'Final velocity = Initial velocity + Acceleration * Time.', explanationUr: 'آخری رفتار = ابتدائی رفتار + ایکسلریشن ضرب وقت۔' },
    { labelEn: 'Second Equation of Motion', labelUr: 'حرکت کی دوسری مساوات', formula: 'S = vi * t + 0.5 * a * t²', explanationEn: 'Distance S in uniformly accelerated motion.', explanationUr: 'طے شدہ فاصلہ معلوم کرنے کا کلیہ۔' },
    { labelEn: 'Third Equation of Motion', labelUr: 'حرکت کی تیسری مساوات', formula: '2 * a * S = vf² - vi²', explanationEn: 'Time-independent equation of motion.', explanationUr: 'بغیر وقت کے رفتار اور فاصلے کا کلیہ۔' },
  ],
  lessons: [
    {
      id: 'lsn_9_phy_2_1',
      unitId: 'unit_9_phy_2',
      subjectId: 'sub_physics',
      lessonNumber: 1,
      titleEn: '2.1 Kinematics & Velocity-Time Canvas Simulator',
      titleUr: '2.1 کائنی میٹکس اور ویلوسٹی ٹائم گراف ماڈل',
      kptbbChapterRef: 'KPTBB Class 9 Physics, Unit 2',
      durationMinutes: 18,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'The Three Universal Equations of Motion',
            titleUr: 'حرکت کی تین بنیادی مساواتیں',
            bodyEn: 'For an object moving in a straight line with uniform acceleration a:\n1. vf = vi + at\n2. S = vi*t + 1/2*a*t²\n3. 2aS = vf² - vi²\n\nArea under a Velocity-Time graph represents Distance (S) traveled!\nTest your acceleration parameters below:',
            bodyUr: 'حرکت کی تین مساواتیں یکساں ایکسلریشن کے لیے لاگو ہوتی ہیں۔ نیچے دیے گئے انٹرایکٹو کینوس پر خود چلا کر دیکھیں۔',
            kptbbRef: 'KPTBB Page 35-45',
          },
        },
        {
          id: 'b2',
          type: 'animation',
          order: 2,
          data: {
            simulatorType: 'kinematics_canvas',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_9_phy_2', 'unit_9_phy_2', 'Unit 2 Exam: Kinematics', 'یونٹ 2 کا ٹیسٹ: کائنی میٹکس', [
  {
    id: 'q1',
    unitId: 'unit_9_phy_2',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'The area under a velocity-time graph represents:',
    promptUr: 'ویلوسٹی ٹائم گراف کے نیچے کا رقبہ کیا ظاہر کرتا ہے؟',
    options: [
      { id: 'a', textEn: 'Distance traveled (فاصلہ)', textUr: 'طے شدہ فاصلہ' },
      { id: 'b', textEn: 'Acceleration (ایکسلریشن)', textUr: 'ایکسلریشن' },
      { id: 'c', textEn: 'Force (فورس)', textUr: 'فورس' },
    ],
    correctOptionId: 'a',
    explanationEn: 'The area under a v-t graph equals total displacement/distance S.',
    explanationUr: 'ویلوسٹی ٹائم گراف کا اندرونی رقبہ فاصلے کے برابر ہوتا ہے۔',
    kptbbRef: 'Page 40',
    tags: ['phy9'],
  },
]);

// Middle School Class 6 Science
units.push({
  id: 'unit_6_sci_1',
  subjectId: 'sub_sci',
  classId: 'class_6',
  unitNumber: 1,
  titleEn: 'Chapter 1: Cellular Organization of Plants and Animals',
  titleUr: 'باب 1: پودوں اور جانوروں کی خلیاتی تنظیم',
  kptbbChapter: 1,
  quizId: 'quiz_6_sci_1',
  overviewEn: 'Plant and animal cells under microscope, cell organelles (Nucleus, Mitochondria, Chloroplasts, Cell wall), and cell explorer simulator.',
  overviewUr: 'پودوں اور جانوروں کے خلیات کی ساخت اور آرگنیلز کا انٹرایکٹو جائزہ۔',
  lessons: [
    {
      id: 'lsn_6_sci_1_1',
      unitId: 'unit_6_sci_1',
      subjectId: 'sub_sci',
      lessonNumber: 1,
      titleEn: '1.1 Plant vs Animal Cells & Organelle Explorer',
      titleUr: '1.1 خلیات کی خوردبینی ساخت اور آرگنیل ایکسپلورر',
      kptbbChapterRef: 'KPTBB Class 6 Science, Chapter 1',
      durationMinutes: 14,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Inside Living Cells',
            titleUr: 'خلیے کی اندرونی ساخت',
            bodyEn: 'Plant cells have a rigid cellulose Cell Wall and green Chloroplasts for photosynthesis. Animal cells have a flexible cell membrane, no cell wall, and small vacuoles.',
            bodyUr: 'پودے کے خلیے میں سیل وال اور کلوروپلاسٹ ہوتا ہے جبکہ جانوروں کے خلیے میں سیل وال نہیں ہوتی۔',
            kptbbRef: 'Page 5',
          },
        },
        {
          id: 'b2',
          type: 'animation',
          order: 2,
          data: {
            simulatorType: 'cell_explorer',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_6_sci_1', 'unit_6_sci_1', 'Class 6 Science: Cells Quiz', 'چھٹی جماعت: خلیات کوئز', [
  {
    id: 'q1',
    unitId: 'unit_6_sci_1',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'Which organelle is found in plant cells but NOT in animal cells?',
    promptUr: 'کون سا آرگنیل پودوں میں ہوتا ہے لیکن جانوروں میں نہیں؟',
    options: [
      { id: 'a', textEn: 'Chloroplast', textUr: 'کلوروپلاسٹ' },
      { id: 'b', textEn: 'Nucleus', textUr: 'نیوکلیئس' },
      { id: 'c', textEn: 'Cell Membrane', textUr: 'سیل ممبرین' },
    ],
    correctOptionId: 'a',
    explanationEn: 'Chloroplasts contain chlorophyll for photosynthesis and are exclusive to plants/algae.',
    explanationUr: 'کلوروپلاسٹ صرف پودوں میں پایا جاتا ہے۔',
    kptbbRef: 'Page 7',
    tags: ['sci6'],
  },
]);

// Primary Class 1 Math
units.push({
  id: 'unit_1_math_1',
  subjectId: 'sub_math',
  classId: 'class_1',
  unitNumber: 1,
  titleEn: 'Unit 1: Numbers & Counting (1 to 100)',
  titleUr: 'یونٹ 1: گنتی اور اعداد (1 تا 100)',
  kptbbChapter: 1,
  quizId: 'quiz_1_math_1',
  overviewEn: 'Early tactile counting, place value of tens and ones, abacus pearls, and simple addition.',
  overviewUr: 'موتیوں سے گنتی، دہائی اور اکائی کا تصور اور ابتدائی جمع۔',
  lessons: [
    {
      id: 'lsn_1_math_1_1',
      unitId: 'unit_1_math_1',
      subjectId: 'sub_math',
      lessonNumber: 1,
      titleEn: '1.1 Pearl Abacus & Counting Pearls',
      titleUr: '1.1 موتیوں کا ایباکس اور گنتی',
      kptbbChapterRef: 'KPTBB Class 1 Mathematics, Unit 1',
      durationMinutes: 10,
      blocks: [
        {
          id: 'b1',
          type: 'explanation',
          order: 1,
          data: {
            titleEn: 'Counting with Pearls',
            titleUr: 'موتیوں سے گنتی سیکھیں',
            bodyEn: 'Count by tapping shiny pearls on the counting board! 10 single pearls make one ten (دہائی).',
            bodyUr: 'چمکدار موتیوں کو چھو کر گنتی سیکھیں۔ دس موتی مل کر ایک دہائی بناتے ہیں۔',
            kptbbRef: 'Page 2',
          },
        },
        {
          id: 'b2',
          type: 'animation',
          order: 2,
          data: {
            simulatorType: 'pearl_counter',
          },
        },
      ],
    },
  ],
});
registerQuiz('quiz_1_math_1', 'unit_1_math_1', 'Primary Counting Quiz', 'پہلی جماعت کا گنتی کوئز', [
  {
    id: 'q1',
    unitId: 'unit_1_math_1',
    type: 'mcq',
    difficulty: 'easy',
    promptEn: 'How many tens (دہائیاں) are in the number 30?',
    promptUr: 'عدد 30 میں کتنی دہائیاں ہوتی ہیں؟',
    options: [
      { id: 'a', textEn: '1 ten', textUr: '1 دہائی' },
      { id: 'b', textEn: '3 tens', textUr: '3 دہائیاں' },
      { id: 'c', textEn: '5 tens', textUr: '5 دہائیاں' },
    ],
    correctOptionId: 'b',
    explanationEn: '30 is made of 3 groups of 10.',
    explanationUr: '30 میں 3 دہائیاں ہوتی ہیں۔',
    kptbbRef: 'Page 5',
    tags: ['math1'],
  },
]);

// Default / Mock quiz fallback
quizzes['quiz_10_phy_1'] = quizzes['quiz_10_phy_10'];

const unitsExport = `export const UNITS: Unit[] = ${JSON.stringify(units, null, 2)};\n`;
const quizzesExport = `export const QUIZZES: Record<string, Quiz> = ${JSON.stringify(quizzes, null, 2)};\n`;

const fullFile = `${header}\n${unitsExport}\n${quizzesExport}`;

fs.writeFileSync(outputPath, fullFile, 'utf8');
console.log(`Successfully generated comprehensive curriculum database at: ${outputPath}`);
console.log(`Total Units: ${units.length}, Total Quizzes: ${Object.keys(quizzes).length}`);
