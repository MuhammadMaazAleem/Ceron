// ============================================================
// AI Mock Exam Quiz Generator (50 MCQs per Chapter)
// Procedural & Knowledge-Driven AI Engine for BISE Swat / KPTBB
// Generates fresh, randomized, 50-question board exams for any chapter
// ============================================================

import { Unit, Quiz, Question, QuizOption } from '../types';

// Helper for shuffling arrays
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to assemble 4 options and set correctOptionId
function createOptions(
  correctEn: string,
  correctUr: string,
  wrongOptions: Array<{ en: string; ur: string }>
): { options: QuizOption[]; correctOptionId: string } {
  const letters = ['opt_a', 'opt_b', 'opt_c', 'opt_d'] as const;
  
  // Pick 3 wrong options
  const shuffledWrong = shuffleArray(wrongOptions).slice(0, 3);
  
  const allChoices = [
    { textEn: correctEn, textUr: correctUr, isCorrect: true },
    ...shuffledWrong.map((w) => ({ textEn: w.en, textUr: w.ur, isCorrect: false })),
  ];

  const shuffledChoices = shuffleArray(allChoices);
  const options: QuizOption[] = [];
  let correctOptionId = 'opt_a';

  shuffledChoices.forEach((choice, idx) => {
    const id = letters[idx];
    options.push({
      id,
      textEn: choice.textEn,
      textUr: choice.textUr,
    });
    if (choice.isCorrect) {
      correctOptionId = id;
    }
  });

  return { options, correctOptionId };
}

/**
 * Generates an official 50-MCQ Mock Exam for any Unit.
 * Incorporates:
 * 1. Unit's existing questions (if any)
 * 2. Key Terms & Definitions extraction
 * 3. Formulas & Numerical Applications with random numbers
 * 4. Solved Conceptual Exercises & Board Questions
 * 5. Procedural STEM Board Principles tailored to the subject & chapter
 */
export function generate50McqQuizForUnit(unit: Unit, baseQuiz?: Quiz | null): Quiz {
  const questions: Question[] = [];
  const unitId = unit.id;
  const chapterName = unit.titleEn;
  const chapterNameUr = unit.titleUr;
  let qCounter = 1;

  // 1. Incorporate and randomize existing questions from baseQuiz
  if (baseQuiz && baseQuiz.questions && baseQuiz.questions.length > 0) {
    baseQuiz.questions.forEach((q) => {
      // Re-shuffle options to ensure fresh experience
      const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
      const wrongOpts = q.options.filter((o) => o.id !== q.correctOptionId).map((o) => ({
        en: o.textEn,
        ur: o.textUr,
      }));

      if (correctOpt) {
        const { options, correctOptionId } = createOptions(correctOpt.textEn, correctOpt.textUr, wrongOpts);
        questions.push({
          ...q,
          id: `${unitId}_q_${qCounter++}_${Date.now()}`,
          options,
          correctOptionId,
        });
      }
    });
  }

  // 2. Synthesize MCQs from Key Terms (Definitions & SI Units)
  if (unit.keyTerms && unit.keyTerms.length > 0) {
    unit.keyTerms.forEach((kt) => {
      // Question type A: "What is defined as: [Definition]?"
      const otherTerms = unit.keyTerms!.filter((t) => t.termEn !== kt.termEn);
      const wrongOptsA = otherTerms.map((t) => ({ en: t.termEn, ur: t.termUr }));
      if (wrongOptsA.length >= 3) {
        const { options, correctOptionId } = createOptions(kt.termEn, kt.termUr, wrongOptsA);
        questions.push({
          id: `${unitId}_term_a_${qCounter++}`,
          unitId,
          type: 'mcq',
          difficulty: 'easy',
          promptEn: `According to BISE textbook standards, "${kt.definitionEn}" defines which concept?`,
          promptUr: `درسی کتاب کے مطابق، "${kt.definitionUr}" کس تصور کی تعریف ہے؟`,
          options,
          correctOptionId,
          explanationEn: `${kt.termEn} is formally defined in KPTBB curriculum as: ${kt.definitionEn}`,
          explanationUr: `${kt.termUr} کی درسی کتاب کے مطابق رسمی تعریف یہ ہے۔`,
          kptbbRef: `${chapterName} Key Definitions`,
          tags: [kt.termEn, 'Definitions'],
        });
      }

      // Question type B: "Which of the following correctly defines [Term]?"
      const wrongOptsB = otherTerms.map((t) => ({ en: t.definitionEn, ur: t.definitionUr }));
      if (wrongOptsB.length >= 3) {
        const { options, correctOptionId } = createOptions(kt.definitionEn, kt.definitionUr, wrongOptsB);
        questions.push({
          id: `${unitId}_term_b_${qCounter++}`,
          unitId,
          type: 'mcq',
          difficulty: 'medium',
          promptEn: `Which statement represents the accurate board definition of "${kt.termEn}"?`,
          promptUr: `مندرجہ ذیل میں سے کون سا بیان "${kt.termUr}" کی درست تعریف ہے؟`,
          options,
          correctOptionId,
          explanationEn: `Correct definition: ${kt.definitionEn}`,
          explanationUr: `درست تعریف: ${kt.definitionUr}`,
          kptbbRef: `${chapterName} Terminology`,
          tags: [kt.termEn, 'Concept Recall'],
        });
      }
    });
  }

  // 3. Synthesize MCQs from Formulas & Numerical Laws
  if (unit.formulas && unit.formulas.length > 0) {
    unit.formulas.forEach((f) => {
      const otherFormulas = unit.formulas!.filter((of) => of.labelEn !== f.labelEn);
      const wrongFormulaOpts = otherFormulas.map((of) => ({ en: of.formula, ur: of.formula }));
      // Add standard distractor formulas if needed
      while (wrongFormulaOpts.length < 3) {
        wrongFormulaOpts.push({ en: `2 × (${f.formula})`, ur: `2 × (${f.formula})` });
        wrongFormulaOpts.push({ en: `1 / (${f.formula})`, ur: `1 / (${f.formula})` });
        wrongFormulaOpts.push({ en: `(${f.formula})²`, ur: `(${f.formula})²` });
      }

      const { options, correctOptionId } = createOptions(f.formula, f.formula, wrongFormulaOpts);
      questions.push({
        id: `${unitId}_formula_${qCounter++}`,
        unitId,
        type: 'mcq',
        difficulty: 'medium',
        promptEn: `In BISE Swat board examination, what is the standard mathematical relation for ${f.labelEn}?`,
        promptUr: `بورڈ امتحانات میں ${f.labelUr} کے لیے معیاری حسابی فارمولا کیا ہے؟`,
        options,
        correctOptionId,
        explanationEn: `The mathematical formula for ${f.labelEn} is: ${f.formula}. (${f.explanationEn})`,
        explanationUr: `حسابی فارمولا: ${f.formula}۔ (${f.explanationUr})`,
        kptbbRef: `${chapterName} Mathematical Relations`,
        tags: [f.labelEn, 'Formulas'],
      });
    });
  }

  // 4. Synthesize MCQs from Solved Exercises & Conceptual Problems
  if (unit.solvedExercises && unit.solvedExercises.length > 0) {
    unit.solvedExercises.forEach((se) => {
      if (se.category === 'conceptual' || se.category === 'short_question') {
        const correctAns = se.modelAnswerEn
          ? se.modelAnswerEn.split('.')[0] + '.'
          : 'Directly follows fundamental board law.';
        const correctAnsUr = se.modelAnswerUr
          ? se.modelAnswerUr.split('۔')[0] + '۔'
          : 'بنیادی سائنسی اصول پر مبنی ہے۔';

        const wrongOpts = [
          { en: 'The quantity remains independent of external conditions.', ur: 'یہ مقدار بیرونی حالات سے آزاد رہتی ہے۔' },
          { en: 'It decreases exponentially with increasing temperature.', ur: 'درجہ حرارت بڑھنے سے اس میں کمی واقع ہوتی ہے۔' },
          { en: 'It is solely governed by atmospheric pressure.', ur: 'یہ صرف ہوائی دباؤ کے تابع ہے۔' },
          { en: 'No conservation law is applicable in this state.', ur: 'اس حالت میں بقا کا کوئی قانون لاگو نہیں ہوتا۔' },
        ];

        const { options, correctOptionId } = createOptions(correctAns, correctAnsUr, wrongOpts);
        questions.push({
          id: `${unitId}_se_${qCounter++}`,
          unitId,
          type: 'mcq',
          difficulty: 'hard',
          promptEn: `[BISE Conceptual] ${se.questionEn}`,
          promptUr: `[تصوراتی سوال] ${se.questionUr}`,
          options,
          correctOptionId,
          explanationEn: se.boardTipEn || se.modelAnswerEn || 'High-yield conceptual question.',
          explanationUr: se.boardTipUr || se.modelAnswerUr || 'اہم امتحانی نکتہ۔',
          kptbbRef: `${chapterName} Exercise Questions`,
          tags: ['Conceptual Reasoning', se.questionNumber],
        });
      }
    });
  }

  // 5. Procedural STEM Generator Pool to reach EXACTLY 50 MCQs
  // Generates subject-specific board questions with randomized values
  const stemTopicPool = [
    {
      topic: 'SI Units & Dimensions',
      templateEn: (item: string, unitStr: string) => `What is the standard SI unit of ${item} in physics and chemistry?`,
      templateUr: (item: string, unitStr: string) => `${item} کی معیاری بین الاقوامی اکائی (SI Unit) کیا ہے؟`,
      answers: [
        { en: 'Newton (N)', ur: 'نیوٹن (N)', wrongs: [{ en: 'Joule (J)', ur: 'جول' }, { en: 'Watt (W)', ur: 'واٹ' }, { en: 'Pascal (Pa)', ur: 'پاسکل' }] },
        { en: 'Joule (J)', ur: 'جول (J)', wrongs: [{ en: 'Newton (N)', ur: 'نیوٹن' }, { en: 'Watt (W)', ur: 'واٹ' }, { en: 'Coulomb (C)', ur: 'کولمب' }] },
        { en: 'Pascal (Pa)', ur: 'پاسکل (Pa)', wrongs: [{ en: 'Newton/m', ur: 'نیوٹن/میٹر' }, { en: 'Joule/s', ur: 'جول/سیکنڈ' }, { en: 'Bar', ur: 'بار' }] },
        { en: 'Watt (W)', ur: 'واٹ (W)', wrongs: [{ en: 'Joule', ur: 'جول' }, { en: 'Volt', ur: 'وولٹ' }, { en: 'Ampere', ur: 'ایمپیئر' }] },
        { en: 'Kilogram per cubic meter (kg/m³)', ur: 'کلوگرام فی مکعب میٹر (kg/m³)', wrongs: [{ en: 'g/cm²', ur: 'گرام/سینٹی میٹر²' }, { en: 'kg/m²', ur: 'کلوگرام/میٹر²' }, { en: 'N/m³', ur: 'نیوٹن/میٹر³' }] },
      ],
    },
    {
      topic: 'Vector vs Scalar Quantities',
      templateEn: (prop: string) => `Which of the following is classified strictly as a ${prop} quantity?`,
      templateUr: (prop: string) => `مندرجہ ذیل میں سے کون سی مقدار خالصتاً ${prop} ہے؟`,
      answers: [
        { en: 'Displacement', ur: 'ڈسپلیسمنٹ (فاصلہ سمت کے ساتھ)', wrongs: [{ en: 'Speed', ur: 'سپیڈ' }, { en: 'Distance', ur: 'فاصلہ' }, { en: 'Time', ur: 'وقت' }] },
        { en: 'Velocity', ur: 'ویسلوسیٹی', wrongs: [{ en: 'Speed', ur: 'رفتار' }, { en: 'Mass', ur: 'کمیت' }, { en: 'Work', ur: 'کام' }] },
        { en: 'Acceleration', ur: 'اسراع (ایکسیلریشن)', wrongs: [{ en: 'Volume', ur: 'حجم' }, { en: 'Density', ur: 'کثافت' }, { en: 'Energy', ur: 'توانائی' }] },
        { en: 'Work & Energy', ur: 'کام اور توانائی', wrongs: [{ en: 'Force', ur: 'فورس' }, { en: 'Weight', ur: 'وزن' }, { en: 'Torque', ur: 'ٹارک' }] },
      ],
    },
    {
      topic: 'Board Exam Gotchas & Examiner Tips',
      templateEn: (concept: string) => `In board examination marking rubrics, what is the critical requirement when solving ${concept}?`,
      templateUr: (concept: string) => `امتحانی مارکنگ اصولوں کے مطابق ${concept} حل کرتے وقت کون سی شرط لازمی ہے؟`,
      answers: [
        { en: 'Writing proper SI units alongside the final answer', ur: 'حتمی جواب کے ساتھ درست SI اکائی لکھنا', wrongs: [{ en: 'Only writing the numerical value', ur: 'صرف حسابی قیمت لکھنا' }, { en: 'Omitting the given data step', ur: 'معلوم ڈیٹا چھوڑ دینا' }, { en: 'Using rough pencil work in main answer', ur: 'کچی پنسل کا استعمال' }] },
        { en: 'Stating the principle or formula before calculation', ur: 'حساب سے پہلے اصول یا فارمولا بیان کرنا', wrongs: [{ en: 'Directly jumping to calculation', ur: 'براہ راست کیلکولیشن پر آنا' }, { en: 'Skipping the conclusion statement', ur: 'نتیجہ نہ لکھنا' }, { en: 'Ignoring vector direction notation', ur: 'سمتی علامتوں کو نظر انداز کرنا' }] },
      ],
    },
    {
      topic: 'Scientific Laws & Proportionalities',
      templateEn: (factor: string) => `If the ${factor} is doubled while keeping other parameters constant, what happens to the dependent variable?`,
      templateUr: (factor: string) => `اگر باقی شرائط یکساں رکھتے ہوئے ${factor} کو دوگنا کر دیا جائے تو منحصر مقدار پر کیا اثر پڑے گا؟`,
      answers: [
        { en: 'It becomes 4 times (quadrupled) due to squared proportionality', ur: 'مربعی تناسب کی وجہ سے 4 گنا ہو جائے گی', wrongs: [{ en: 'It remains unchanged', ur: 'غیر تبدیل شدہ رہے گی' }, { en: 'It reduces to half', ur: 'نصف رہ جائے گی' }, { en: 'It doubles linearly', ur: 'دوگنی ہو جائے گی' }] },
        { en: 'It becomes exactly doubled (direct linear relation)', ur: 'براہ راست تناسب کی وجہ سے دوگنی ہو جائے گی', wrongs: [{ en: 'It becomes 4 times', ur: 'چار گنا ہو جائے گی' }, { en: 'It becomes zero', ur: 'صفر ہو جائے گی' }, { en: 'It decreases by half', ur: 'آدھی رہ جائے گی' }] },
        { en: 'It is halved (inverse proportionality)', ur: 'معکوس تناسب کی وجہ سے نصف رہ جائے گی', wrongs: [{ en: 'It doubles', ur: 'دوگنی ہو جائے گی' }, { en: 'It increases 4-fold', ur: 'چار گنا بڑھ جائے گی' }, { en: 'It stays constant', ur: 'مستقل رہے گی' }] },
      ],
    },
  ];

  // Subject-specific topic seeds
  const subjectId = unit.subjectId;
  const isPhysics = subjectId === 'sub_physics';
  const isChem = subjectId === 'sub_chem';
  const isBio = subjectId === 'sub_bio';
  const isMath = subjectId === 'sub_math';
  const isComp = subjectId === 'sub_comp';

  // Generate dynamic questions until we reach EXACTLY 50 MCQs
  let seedIndex = 0;
  while (questions.length < 50) {
    const qNum = questions.length + 1;
    let promptEn = '';
    let promptUr = '';
    let correctAnsEn = '';
    let correctAnsUr = '';
    let wrongOpts: Array<{ en: string; ur: string }> = [];
    let explanationEn = '';
    let explanationUr = '';
    let topicTag = 'Board Preparation';

    if (isPhysics) {
      const v1 = Math.floor(Math.random() * 20) + 5;
      const t1 = Math.floor(Math.random() * 5) + 2;
      const m1 = Math.floor(Math.random() * 10) + 2;
      const a1 = Math.floor(Math.random() * 8) + 2;

      const physicsTemplates = [
        {
          pEn: `A body of mass ${m1} kg is accelerated at ${a1} m/s². What net force acts on the object according to Newton's Second Law (F = ma)?`,
          pUr: `${m1} کلوگرام کمیت کا ایک جسم ${a1} m/s² کے اسراع سے حرکت کر رہا ہے۔ نیوٹن کے دوسرے قانون کے مطابق خالص فورس کیا ہوگی؟`,
          cEn: `${m1 * a1} N`,
          cUr: `${m1 * a1} نیوٹن`,
          wrongs: [
            { en: `${m1 + a1} N`, ur: `${m1 + a1} نیوٹن` },
            { en: `${Math.round((m1 / a1) * 10) / 10} N`, ur: `${Math.round((m1 / a1) * 10) / 10} نیوٹن` },
            { en: `${m1 * a1 * 2} N`, ur: `${m1 * a1 * 2} نیوٹن` },
          ],
          expEn: `Using Newton's Second Law: F = m × a = ${m1} kg × ${a1} m/s² = ${m1 * a1} N.`,
          expUr: `نیوٹن کے دوسرے قانون کے مطابق: F = m × a = ${m1 * a1} N۔`,
          tag: 'Newtonian Dynamics',
        },
        {
          pEn: `An object travels with a constant velocity of ${v1} m/s for ${t1} seconds. What total distance (S = vt) does it cover?`,
          pUr: `ایک جسم ${v1} m/s کی مستقل ولاسٹی سے ${t1} سیکنڈ تک سفر کرتا ہے۔ طے شدہ فاصلہ کتنا ہے؟`,
          cEn: `${v1 * t1} m`,
          cUr: `${v1 * t1} میٹر`,
          wrongs: [
            { en: `${v1 + t1} m`, ur: `${v1 + t1} میٹر` },
            { en: `${Math.round((v1 / t1) * 10) / 10} m`, ur: `${Math.round((v1 / t1) * 10) / 10} میٹر` },
            { en: `${v1 * t1 + 10} m`, ur: `${v1 * t1 + 10} میٹر` },
          ],
          expEn: `Distance S = v × t = ${v1} m/s × ${t1} s = ${v1 * t1} meters.`,
          expUr: `فاصلہ S = v × t = ${v1 * t1} میٹر۔`,
          tag: 'Kinematics',
        },
        {
          pEn: `What is the value of gravitational acceleration 'g' near the surface of the Earth used in standard BISE Swat matric calculations?`,
          pUr: `زمین کی سطح کے قریب کششِ ثقل کے اسراع 'g' کی معیاری قیمت کیا ہے؟`,
          cEn: `9.8 m/s² (approx. 10 m/s²)`,
          cUr: `9.8 m/s² (تقریباً 10 m/s²)`,
          wrongs: [
            { en: `98 m/s²`, ur: `98 m/s²` },
            { en: `9.8 km/s`, ur: `9.8 km/s` },
            { en: `1.62 m/s²`, ur: `1.62 m/s²` },
          ],
          expEn: `Standard standard value of g = 9.8 m/s² on Earth.`,
          expUr: `زمین کی سطح پر g کی معیاری قیمت 9.8 میٹر فی سیکنڈ اسکوائر ہے۔`,
          tag: 'Gravitation',
        },
      ];
      const selected = physicsTemplates[seedIndex % physicsTemplates.length];
      promptEn = selected.pEn;
      promptUr = selected.pUr;
      correctAnsEn = selected.cEn;
      correctAnsUr = selected.cUr;
      wrongOpts = selected.wrongs;
      explanationEn = selected.expEn;
      explanationUr = selected.expUr;
      topicTag = selected.tag;
    } else if (isChem) {
      const chemTemplates = [
        {
          pEn: `What is the exact numerical value of Avogadro's Number (NA) representing particles in one mole of any pure substance?`,
          pUr: `ایووگیڈرو نمبر (NA) کی درست حسابی قیمت کیا ہے جو ایک مول میں موجود ذرات کو ظاہر کرتی ہے؟`,
          cEn: `6.022 × 10²³`,
          cUr: `6.022 × 10²³`,
          wrongs: [
            { en: `6.022 × 10⁻²³`, ur: `6.022 × 10⁻²³` },
            { en: `3.00 × 10⁸`, ur: `3.00 × 10⁸` },
            { en: `1.602 × 10⁻¹⁹`, ur: `1.602 × 10⁻¹⁹` },
          ],
          expEn: `1 mole of any substance contains exactly 6.022 × 10²³ elementary entities.`,
          expUr: `کسی بھی مادے کے ایک مول میں 6.022 × 10²³ ذرات ہوتے ہیں۔`,
          tag: 'Mole Concept',
        },
        {
          pEn: `According to Modern Periodic Law, properties of chemical elements are periodic functions of their:`,
          pUr: `جدید دوری قانون کے مطابق عناصر کی خصوصیات ان کے کس کا دورانی تفاعل ہیں؟`,
          cEn: `Atomic Numbers (Z)`,
          cUr: `ایٹمی نمبر (Atomic Number - Z)`,
          wrongs: [
            { en: `Atomic Masses (A)`, ur: `ایٹمی کمیت (Atomic Mass)` },
            { en: `Mass Numbers`, ur: `ماس نمبر` },
            { en: `Number of Neutrons`, ur: `نیوٹرانز کی تعداد` },
          ],
          expEn: `Moseley's Periodic Law arranges elements in ascending order of Atomic Number (Z).`,
          expUr: `موزلے کے قانون کے مطابق عناصر کو ایٹمی نمبر کے لحاظ سے ترتیب دیا گیا ہے۔`,
          tag: 'Periodic Table',
        },
        {
          pEn: `Which type of chemical bond is formed by the mutual sharing of electron pairs between two atoms?`,
          pUr: `دو ایٹموں کے درمیان الیکٹران جوڑوں کے باہمی اشتراک سے کون سا کیمیائی بانڈ بنتا ہے؟`,
          cEn: `Covalent Bond`,
          cUr: `کوویلنٹ بانڈ (Covalent Bond)`,
          wrongs: [
            { en: `Ionic Bond`, ur: `آئنک بانڈ` },
            { en: `Metallic Bond`, ur: `میٹالک بانڈ` },
            { en: `Coordinate Covalent Bond`, ur: `کوآرڈینیٹ کوویلنٹ بانڈ` },
          ],
          expEn: `Covalent bonding occurs via mutual sharing of valence electrons.`,
          expUr: `کوویلنٹ بانڈ الیکٹرانوں کے باہمی اشتراک سے تشکیل پاتا ہے۔`,
          tag: 'Chemical Bonding',
        },
      ];
      const selected = chemTemplates[seedIndex % chemTemplates.length];
      promptEn = selected.pEn;
      promptUr = selected.pUr;
      correctAnsEn = selected.cEn;
      correctAnsUr = selected.cUr;
      wrongOpts = selected.wrongs;
      explanationEn = selected.expEn;
      explanationUr = selected.expUr;
      topicTag = selected.tag;
    } else if (isBio) {
      const bioTemplates = [
        {
          pEn: `Which organelle is universally termed as the "powerhouse of the cell" due to ATP generation through cellular respiration?`,
          pUr: `سیل کے کس حصے (آرگنیلی) کو سیلولر ریسپریشن کے ذریعے ATP پیدا کرنے کی وجہ سے "پاور ہاؤس" کہا جاتا ہے؟`,
          cEn: `Mitochondria`,
          cUr: `مائٹوکونڈریا (Mitochondria)`,
          wrongs: [
            { en: `Ribosome`, ur: `رائبوسوم` },
            { en: `Golgi Apparatus`, ur: `گالجی اپریٹس` },
            { en: `Endoplasmic Reticulum`, ur: `اینڈوپلازمک ریٹیکولم` },
          ],
          expEn: `Mitochondria synthesize adenosine triphosphate (ATP), the chemical energy currency of cells.`,
          expUr: `مائٹوکونڈریا سیل کو توانائی فراہم کرتا ہے۔`,
          tag: 'Cell Biology',
        },
        {
          pEn: `In human genetics and cell division, what type of division produces four haploid daughter cells for sexual reproduction?`,
          pUr: `انسانی جینیات میں کس قسم کی تقسیم کے نتیجے میں چار ہیپلائیڈ خلیے بنتے ہیں؟`,
          cEn: `Meiosis`,
          cUr: `میوسس (Meiosis)`,
          wrongs: [
            { en: `Mitosis`, ur: `مائٹوسس` },
            { en: `Binary Fission`, ur: `بائنری فشن` },
            { en: `Budding`, ur: `بڈنگ` },
          ],
          expEn: `Meiosis reduces chromosome number by half, yielding 4 genetically diverse gametes.`,
          expUr: `میوسس کروموسوم کی تعداد کو نصف کر کے گیمیٹس تیار کرتی ہے۔`,
          tag: 'Genetics & Cell Cycle',
        },
        {
          pEn: `Which biological biocatalysts accelerate biochemical reactions without being consumed in the process?`,
          pUr: `کون سے حیاتیاتی کیٹالسٹ کیمیائی عمل کو تیز کرتے ہیں اور خود خرچ نہیں ہوتے؟`,
          cEn: `Enzymes`,
          cUr: `انزائمز (Enzymes)`,
          wrongs: [
            { en: `Lipids`, ur: `چکنائیاں (Lipids)` },
            { en: `Vitamins`, ur: `وٹامنز` },
            { en: `Carbohydrates`, ur: `کاربوہائیڈریٹس` },
          ],
          expEn: `Enzymes are globular proteins functioning as biological catalysts.`,
          expUr: `انزائمز حیاتیاتی کیٹالسٹ کے طور پر کام کرتے ہیں۔`,
          tag: 'Enzymology',
        },
      ];
      const selected = bioTemplates[seedIndex % bioTemplates.length];
      promptEn = selected.pEn;
      promptUr = selected.pUr;
      correctAnsEn = selected.cEn;
      correctAnsUr = selected.cUr;
      wrongOpts = selected.wrongs;
      explanationEn = selected.expEn;
      explanationUr = selected.expUr;
      topicTag = selected.tag;
    } else if (isMath) {
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const mathTemplates = [
        {
          pEn: `If a square matrix A has order 2×2 with determinant det(A) = 0, the matrix is classified as:`,
          pUr: `اگر ایک 2×2 میٹرکس A کا مقطع (Determinant) صفر ہو، تو اس میٹرکس کو کیا کہا جاتا ہے؟`,
          cEn: `Singular Matrix (غیر نادر قالب)`,
          cUr: `سنگولر قالب (Singular Matrix)`,
          wrongs: [
            { en: `Non-Singular Matrix`, ur: `نان سنگولر قالب` },
            { en: `Identity Matrix`, ur: `وحدانی قالب` },
            { en: `Scalar Matrix`, ur: `سکیلر قالب` },
          ],
          expEn: `A matrix with determinant equal to 0 is singular and does not possess a multiplicative inverse.`,
          expUr: `جس میٹرکس کا مقطع صفر ہو اس کا ضربی معکوس ممکن نہیں ہوتا۔`,
          tag: 'Matrices',
        },
        {
          pEn: `What is the discriminant formula for quadratic equation ax² + bx + c = 0 used to determine nature of roots?`,
          pUr: `دو درجی مساوات ax² + bx + c = 0 کے روٹس کی نوعیت معلوم کرنے کا فرق کنندہ (Discriminant) فارمولا کیا ہے؟`,
          cEn: `b² - 4ac`,
          cUr: `b² - 4ac`,
          wrongs: [
            { en: `b² + 4ac`, ur: `b² + 4ac` },
            { en: `4ac - b²`, ur: `4ac - b²` },
            { en: `2a / (b² - 4ac)`, ur: `2a / (b² - 4ac)` },
          ],
          expEn: `Discriminant Δ = b² - 4ac determines whether roots are real, equal, or complex.`,
          expUr: `فرق کنندہ = b² - 4ac سے روٹس کی نوعیت کا پتہ چلتا ہے۔`,
          tag: 'Quadratic Equations',
        },
        {
          pEn: `Evaluate the algebraic expansion of (${a}x + ${b})² according to standard formula (u + v)² = u² + 2uv + v²:`,
          pUr: `فارمولا (u + v)² کی مدد سے (${a}x + ${b})² کا پھیلاؤ کیا ہوگا؟`,
          cEn: `${a * a}x² + ${2 * a * b}x + ${b * b}`,
          cUr: `${a * a}x² + ${2 * a * b}x + ${b * b}`,
          wrongs: [
            { en: `${a * a}x² + ${b * b}`, ur: `${a * a}x² + ${b * b}` },
            { en: `${a * a}x² + ${a * b}x + ${b * b}`, ur: `${a * a}x² + ${a * b}x + ${b * b}` },
            { en: `${2 * a}x² + ${2 * b}x + ${b * b}`, ur: `${2 * a}x² + ${2 * b}x + ${b * b}` },
          ],
          expEn: `(${a}x + ${b})² = (${a}x)² + 2(${a}x)(${b}) + (${b})² = ${a * a}x² + ${2 * a * b}x + ${b * b}.`,
          expUr: `مربعی کلیہ لگانے سے درست جواب حاصل ہوتا ہے۔`,
          tag: 'Algebraic Formulas',
        },
      ];
      const selected = mathTemplates[seedIndex % mathTemplates.length];
      promptEn = selected.pEn;
      promptUr = selected.pUr;
      correctAnsEn = selected.cEn;
      correctAnsUr = selected.cUr;
      wrongOpts = selected.wrongs;
      explanationEn = selected.expEn;
      explanationUr = selected.expUr;
      topicTag = selected.tag;
    } else {
      // Computer Science & General STEM
      const csTemplates = [
        {
          pEn: `In computer programming and algorithm design, a finite set of step-by-step instructions to solve a problem is called:`,
          pUr: `کمپیوٹر پروگرامنگ میں کسی مسئلے کو حل کرنے کے لیے مرحلہ وار ہدایات کے سیٹ کو کیا کہا جاتا ہے؟`,
          cEn: `Algorithm`,
          cUr: `الگورتھم (Algorithm)`,
          wrongs: [
            { en: `Flowchart`, ur: `فلو چارٹ` },
            { en: `Syntax Error`, ur: `سنٹیکس ایرر` },
            { en: `Compiler`, ur: `کمپائلر` },
          ],
          expEn: `An algorithm is a well-defined computational procedure that takes input and produces output.`,
          expUr: `الگورتھم مسائل کے حل کا مرحلہ وار طریقہ ہے۔`,
          tag: 'Algorithms & Logic',
        },
        {
          pEn: `Which system software translates an entire high-level program into machine code at once before execution?`,
          pUr: `کون سا سافٹ ویئر ہائی لیول لینگویج کے پورے پروگرام کو ایک ساتھ مشین کوڈ میں تبدیل کرتا ہے؟`,
          cEn: `Compiler`,
          cUr: `کمپائلر (Compiler)`,
          wrongs: [
            { en: `Interpreter`, ur: `انٹرپریٹر` },
            { en: `Assembler`, ur: `اسمبلر` },
            { en: `Linker`, ur: `لنکر` },
          ],
          expEn: `A compiler translates the complete source code into machine-executable binary code.`,
          expUr: `کمپائلر پورے پروگرام کو ایک ساتھ ترجمہ کرتا ہے۔`,
          tag: 'Language Translators',
        },
        {
          pEn: `What is the binary representation of decimal number 10 in standard 8-bit binary format?`,
          pUr: `ڈیسیمل نمبر 10 کی بائنری شکل (Binary Format) کیا ہوگی؟`,
          cEn: `00001010`,
          cUr: `00001010 (1010)`,
          wrongs: [
            { en: `00001100`, ur: `00001100` },
            { en: `00001001`, ur: `00001001` },
            { en: `00000111`, ur: `00000111` },
          ],
          expEn: `Decimal 10 = 8 + 2 = (1 × 2³) + (0 × 2²) + (1 × 2¹) + (0 × 2⁰) = 1010₂.`,
          expUr: `10 کو بائنری میں تبدیل کرنے پر 1010 حاصل ہوتا ہے۔`,
          tag: 'Number Systems',
        },
      ];
      const selected = csTemplates[seedIndex % csTemplates.length];
      promptEn = selected.pEn;
      promptUr = selected.pUr;
      correctAnsEn = selected.cEn;
      correctAnsUr = selected.cUr;
      wrongOpts = selected.wrongs;
      explanationEn = selected.expEn;
      explanationUr = selected.expUr;
      topicTag = selected.tag;
    }

    const { options, correctOptionId } = createOptions(correctAnsEn, correctAnsUr, wrongOpts);
    questions.push({
      id: `${unitId}_stem_${qNum}_${seedIndex}`,
      unitId,
      type: 'mcq',
      difficulty: qNum % 3 === 0 ? 'hard' : qNum % 2 === 0 ? 'medium' : 'easy',
      promptEn: `[Q${qNum}] ${promptEn}`,
      promptUr: `[سوال ${qNum}] ${promptUr}`,
      options,
      correctOptionId,
      explanationEn,
      explanationUr,
      kptbbRef: `${chapterName} Comprehensive Board Standards`,
      tags: [topicTag, 'BISE Swat Model Paper'],
    });

    seedIndex++;
  }

  // Shuffle final 50 questions so each test feels fresh and dynamic
  const final50Questions = shuffleArray(questions).slice(0, 50).map((q, idx) => ({
    ...q,
    id: `q_${idx + 1}_${Date.now()}`,
  }));

  return {
    id: `ai_mock_${unit.id}_${Date.now()}`,
    unitId: unit.id,
    titleEn: `${unit.titleEn} — AI 50-MCQ Board Mock Exam`,
    titleUr: `${unit.titleUr} — 50 کثیر الانتخابی سوالات پر مشتمل ماک ٹیسٹ`,
    timeLimitMinutes: 50, // 50 minutes for 50 MCQs (1 min per MCQ)
    passPercentage: 33, // BISE Official Passing Benchmark
    questions: final50Questions,
  };
}
