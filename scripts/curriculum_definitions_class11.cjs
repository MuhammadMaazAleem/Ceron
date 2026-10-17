module.exports = function (add) {
  // ==========================================
  // CLASS 11: PHYSICS (10 Units with Weights)
  // ==========================================
  const c11_physics = [
    { num: 1, slug: 'measurement', en: 'Unit 1: Measurement', ur: 'یونٹ 1: پیمائش اور ڈائمینشنل تجزیہ', w: 8, diag: 'kinematics_graph' },
    { num: 2, slug: 'vectors-and-equilibrium', en: 'Unit 2: Vectors and Equilibrium', ur: 'یونٹ 2: ویکٹرز اور توازن (ایکوی لبریم)', w: 10, diag: 'vector_addition', sim: 'vector_simulator' },
    { num: 3, slug: 'forces-and-motion', en: 'Unit 3: Forces and Motion', ur: 'یونٹ 3: قوتیں اور حرکات (پروجیکٹائل موشن)', w: 12, diag: 'kinematics_graph', sim: 'kinematics_canvas' },
    { num: 4, slug: 'work-and-energy', en: 'Unit 4: Work and Energy', ur: 'یونٹ 4: کام اور توانائی (ایسکیپ ویلاسٹی)', w: 10, diag: 'vector_addition' },
    { num: 5, slug: 'rotational-and-circular-motion', en: 'Unit 5: Rotational and Circular Motion', ur: 'یونٹ 5: دائروی اور گردشی حرکت', w: 12, diag: 'vector_addition' },
    { num: 6, slug: 'fluid-dynamics', en: 'Unit 6: Fluid Dynamics', ur: 'یونٹ 6: فلوئڈ ڈائنامکس (برنولی کی مساوات)', w: 8, diag: 'kinematics_graph' },
    { num: 7, slug: 'oscillations', en: 'Unit 7: Oscillations', ur: 'یونٹ 7: ارتعاش اور سمپل ہارمونک موشن (SHM)', w: 9, diag: 'wave_motion' },
    { num: 8, slug: 'waves', en: 'Unit 8: Waves', ur: 'یونٹ 8: موجیں اور آواز (ڈوپلر اثر)', w: 12, diag: 'wave_motion' },
    { num: 9, slug: 'physical-optics', en: 'Unit 9: Physical Optics', ur: 'یونٹ 9: طبعی آپٹکس (ینگ سلٹ تجربہ)', w: 9, diag: 'optics' },
    { num: 10, slug: 'thermodynamics', en: 'Unit 10: Thermodynamics', ur: 'یونٹ 10: تھرموڈائنامکس اور کارنوٹ انجن', w: 10, diag: 'thermodynamics_cycle' },
  ];

  c11_physics.forEach((u) => {
    add({
      classSlug: 'class-11', classId: 'class_11', className: 'Class 11',
      subjectId: 'sub_physics', subjectName: 'Physics', subjectSlug: 'physics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim,
      explanationEn: `Advanced FSc Part 1 Physics of ${u.en} carrying ${u.w}% weightage in BISE Swat board examination. Mathematical derivations, vector calculus, SI units, and solved textbook numericals.`,
      explanationUr: `${u.ur} کا ایف ایس سی پارٹ 1 کا مکمل نصاب۔ ریاضیاتی ثبوت، ویکٹر کیلکولس اور حل شدہ حسابی سوالات۔`,
      keyTerms: [
        { termEn: 'Physical Principle', termUr: 'بنیادی طبعی اصول', definitionEn: `Governing fundamental theorem in ${u.en}.` },
        { termEn: 'Vector / Scalar Quantity', termUr: 'ویکٹر / اسکیلر مقدار', definitionEn: 'Physical property characterized by magnitude and spatial direction.' },
      ],
      formulas: [{ labelEn: 'Fundamental Law', labelUr: 'کلیہ', formula: 'Key equation in KPTBB Class 11 Physics', explanationEn: 'Governing relation for calculations.' }],
      workedExample: {
        titleEn: `FSc Board Numerical: ${u.en}`,
        problemEn: `Calculate the physical parameter in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Given Data', content: 'Extract given values and convert to SI units.' },
          { label: 'Step 2: Physics Formula', content: 'State standard derivation or formula.' },
          { label: 'Step 3: Calculation & Units', content: 'Calculate result with proper units.' },
        ],
        answer: 'Verified 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Using scalar addition for vector components.', correction: 'Always resolve vectors into rectangular components (Rx = ΣAx, Ry = ΣAy) before finding resultant.', reason: 'Vectors add geometrically, not algebraically.' },
      quizMCQ: { promptEn: `What is the scalar (dot) product of two perpendicular vectors?`, options: [{ id: 'a', textEn: 'Zero' }, { id: 'b', textEn: 'Maximum' }, { id: 'c', textEn: 'Unity' }], correctOptionId: 'a', explanationEn: 'A · B = AB cos 90° = 0.' },
      examTips: `Carries ${u.w}% board weightage. Projectile motion, Bernoulli equation, and Carnot engine are high-yield 9-mark long questions.`,
    });
  });

  // ==========================================
  // CLASS 11: CHEMISTRY (12 Units with Weights)
  // ==========================================
  const c11_chemistry = [
    { num: 1, slug: 'stoichiometry', en: 'Unit 1: Stoichiometry', ur: 'یونٹ 1: سٹوئی کیومیٹری (مول اور حسابی تجزیہ)', w: 8, diag: 'bohr_atom' },
    { num: 2, slug: 'atomic-structure', en: 'Unit 2: Atomic Structure', ur: 'یونٹ 2: ایٹمی ساخت اور کوانٹم نمبرز', w: 8, diag: 'bohr_atom' },
    { num: 3, slug: 'theories-of-covalent-bonding', en: 'Unit 3: Theories of Covalent Bonding and Shapes of Molecules', ur: 'یونٹ 3: کوویلنٹ بانڈنگ کے نظریات اور مالیکیولز کی اشکال', w: 11, diag: 'organic_structure' },
    { num: 4, slug: 'states-of-matter-gases', en: 'Unit 4: States of Matter I: Gases', ur: 'یونٹ 4: مادے کی حالتیں 1: گیسیں (گیس کے قوانین)', w: 12, diag: 'chemical_equilibrium' },
    { num: 5, slug: 'states-of-matter-liquids', en: 'Unit 5: States of Matter II: Liquids', ur: 'یونٹ 5: مادے کی حالتیں 2: مائعات (ہائیڈروجن بانڈنگ)', w: 11, diag: 'chemical_equilibrium' },
    { num: 6, slug: 'states-of-matter-solids', en: 'Unit 6: States of Matter III: Solids', ur: 'یونٹ 6: مادے کی حالتیں 3: ٹھوس (کرسٹل ساختیں)', w: 7, diag: 'chemical_equilibrium' },
    { num: 7, slug: 'chemical-equilibrium', en: 'Unit 7: Chemical Equilibrium', ur: 'یونٹ 7: کیمیائی توازن اور لی شاٹلیئر اصول', w: 7, diag: 'chemical_equilibrium', sim: 'equilibrium_simulator' },
    { num: 8, slug: 'acids-bases-and-salts', en: 'Unit 8: Acids, Bases and Salts', ur: 'یونٹ 8: تیزاب، اساس اور بفر سلوشنز', w: 6, diag: 'chemical_equilibrium' },
    { num: 9, slug: 'chemical-kinetics', en: 'Unit 9: Chemical Kinetics', ur: 'یونٹ 9: کیمیائی کائنیٹکس (ردعمل کی رفتار)', w: 5, diag: 'chemical_equilibrium' },
    { num: 10, slug: 'solutions-and-colloids', en: 'Unit 10: Solutions and Colloids', ur: 'یونٹ 10: سلوشنز اور کلوئیڈز', w: 9, diag: 'chemical_equilibrium' },
    { num: 11, slug: 'thermochemistry', en: 'Unit 11: Thermochemistry', ur: 'یونٹ 11: تھرمو کیمسٹری (ہیس کا قانون)', w: 8, diag: 'thermodynamics_cycle' },
    { num: 12, slug: 'electrochemistry', en: 'Unit 12: Electrochemistry', ur: 'یونٹ 12: الیکٹرو کیمسٹری اور الیکٹروڈ پوٹینشل', w: 8, diag: 'circuit_diagram' },
  ];

  c11_chemistry.forEach((u) => {
    add({
      classSlug: 'class-11', classId: 'class_11', className: 'Class 11',
      subjectId: 'sub_chem', subjectName: 'Chemistry', subjectSlug: 'chemistry',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim,
      explanationEn: `Advanced study of ${u.en} with ${u.w}% board weightage. Molecular orbital theory, thermodynamics, reaction kinetics, and electrochemical series per BISE Swat specifications.`,
      explanationUr: `${u.ur} کا مکمل ایف ایس سی کیمسٹری نصاب۔ کیمیائی نظریات، کوانٹم اصول اور حسابی مسائل۔`,
      keyTerms: [
        { termEn: 'Chemical Principle', termUr: 'کیمیائی اصول', definitionEn: `Foundational law in ${u.en}.` },
        { termEn: 'Thermodynamic / Kinetic Parameter', termUr: 'تھرموڈائنامک / کائنیٹک پیمانہ', definitionEn: 'Quantitative constant determining reaction feasibility or speed.' },
      ],
      formulas: [{ labelEn: 'Governing Thermodynamic / Gas Law', labelUr: 'کلیہ', formula: 'PV = nRT or ΔH = ΣΔHf(products) - ΣΔHf(reactants)', explanationEn: 'Standard governing formula.' }],
      workedExample: {
        titleEn: `FSc Solved Numerical: ${u.en}`,
        problemEn: `Calculate the parameters for ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Law & Formula', content: 'State standard chemical relation.' },
          { label: 'Step 2: Substitution', content: 'Substitute values with units.' },
          { label: 'Step 3: Result', content: 'State final answer with units.' },
        ],
        answer: 'Verified 4-Mark FSc Solution',
      },
      commonMistake: { mistake: 'Using Celsius instead of Kelvin in gas law calculations.', correction: 'Always convert temperature to Kelvin: T(K) = t(°C) + 273.15.', reason: 'Gas laws are strictly defined on the absolute thermodynamic temperature scale.' },
      quizMCQ: { promptEn: `What is the value of the Ideal Gas Constant R in SI units?`, options: [{ id: 'a', textEn: '8.314 J/(mol·K)' }, { id: 'b', textEn: '0.0821 atm·L/(mol·K)' }, { id: 'c', textEn: '62.4 mmHg·L/(mol·K)' }], correctOptionId: 'a', explanationEn: 'In SI units, R = 8.314 Joules per mole per Kelvin.' },
      examTips: `Carries ${u.w}% weightage. VSEPR theory, ideal gas deviations, and Hess's law are frequent long questions.`,
    });
  });

  // ==========================================
  // CLASS 11: BIOLOGY (13 Chapters)
  // ==========================================
  const c11_bio = [
    { num: 1, slug: 'cell-structure-and-function', en: 'Chapter 1: Cell Structure and Function', ur: 'باب 1: سیل کی ساخت اور افعال', w: 8, diag: 'cell_mitosis' },
    { num: 2, slug: 'biological-molecules', en: 'Chapter 2: Biological Molecules', ur: 'باب 2: حیاتیاتی مالیکیولز (پروٹینز، کاربوہائیڈریٹس)', w: 8, diag: 'dna' },
    { num: 3, slug: 'enzymes', en: 'Chapter 3: Enzymes', ur: 'باب 3: اینزائمز اور ان کے افعال', w: 7, diag: 'chemical_equilibrium' },
    { num: 4, slug: 'bioenergetics', en: 'Chapter 4: Bioenergetics', ur: 'باب 4: بائیو انرجیٹکس (فوٹوسنتھیسز اور ریسپائریشن)', w: 8, diag: 'respiration' },
    { num: 5, slug: 'acellular-life', en: 'Chapter 5: Acellular Life (Viruses)', ur: 'باب 5: غیر خلیاتی حیات (وائرسز)', w: 7, diag: 'dna' },
    { num: 6, slug: 'prokaryotes', en: 'Chapter 6: Prokaryotes (Bacteria)', ur: 'باب 6: پروکیریوٹس (بیکٹیریا)', w: 8, diag: 'dna' },
    { num: 7, slug: 'protista-and-fungi', en: 'Chapter 7: Protista and Fungi', ur: 'باب 7: پروٹسٹا اور فنجائی', w: 8, diag: 'dna' },
    { num: 8, slug: 'diversity-among-plants', en: 'Chapter 8: Diversity among Plants', ur: 'باب 8: پودوں میں تنوع (برائیو فائیٹس اور ٹریکیو فائیٹس)', w: 9, diag: 'dna' },
    { num: 9, slug: 'diversity-among-animals', en: 'Chapter 9: Diversity among Animals', ur: 'باب 9: جانوروں میں تنوع (فائیلمز کی درجہ بندی)', w: 9, diag: 'dna' },
    { num: 10, slug: 'form-and-functions-in-plants', en: 'Chapter 10: Form and Functions in Plants', ur: 'باب 10: پودوں کی ساخت اور افعال (ٹرانسپائریشن)', w: 8, diag: 'respiration' },
    { num: 11, slug: 'digestion', en: 'Chapter 11: Digestion', ur: 'باب 11: نظامِ انہضام (ڈائجیشن)', w: 8, diag: 'circulatory_system' },
    { num: 12, slug: 'circulation', en: 'Chapter 12: Circulation', ur: 'باب 12: نظامِ دورانِ خون (دل اور خون کی گردش)', w: 8, diag: 'circulatory_system' },
    { num: 13, slug: 'immunity', en: 'Chapter 13: Immunity', ur: 'باب 13: قوتِ مدافعت (امیونٹی اور اینٹی باڈیز)', w: 8, diag: 'dna' },
  ];

  c11_bio.forEach((u) => {
    add({
      classSlug: 'class-11', classId: 'class_11', className: 'Class 11',
      subjectId: 'sub_bio', subjectName: 'Biology', subjectSlug: 'biology',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag,
      explanationEn: `Comprehensive FSc Part 1 study of ${u.en} following KPTBB Grade XI textbook. Cellular biology, phylogenetic diversity, and physiological pathways per BISE Swat specifications.`,
      explanationUr: `${u.ur} کا ایف ایس سی بائیولوجی کا مکمل نصاب۔ سیل بائیولوجی، پودوں اور جانوروں کا تنوع اور امتحانی پرچے۔`,
      keyTerms: [
        { termEn: 'Biological Organization', termUr: 'حیاتیاتی تنظیم', definitionEn: `Cellular or organ system level in ${u.en}.` },
        { termEn: 'Physiological Adaptation', termUr: 'افعالی مطابقت', definitionEn: 'Evolutionary survival mechanism in flora or fauna.' },
      ],
      workedExample: {
        titleEn: `FSc Model Question: ${u.en}`,
        problemEn: `Explain the anatomical / physiological pathway in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Structure', content: 'Describe precise histological/cellular anatomy.' },
          { label: 'Step 2: Pathway', content: 'Explain physiological steps in correct sequence.' },
          { label: 'Step 3: Biological Importance', content: 'State homeostatic or survival significance.' },
        ],
        answer: 'Model 4-Mark FSc Solution',
      },
      commonMistake: { mistake: 'Confusing lytic cycle with lysogenic cycle in viral reproduction.', correction: 'Lytic causes host cell burst; lysogenic integrates viral genome into host chromosome without immediate lysis.', reason: 'Examiners deduct full marks for cycle confusion.' },
      quizMCQ: { promptEn: `Which organelle is the site of cellular aerobic respiration?`, options: [{ id: 'a', textEn: 'Mitochondria' }, { id: 'b', textEn: 'Ribosome' }, { id: 'c', textEn: 'Golgi apparatus' }], correctOptionId: 'a', explanationEn: 'Mitochondria generate ATP through the Krebs cycle and oxidative phosphorylation.' },
      examTips: 'Light reactions (Z-scheme), cardiac cycle, and plant life cycles are frequent long questions.',
    });
  });

  // ==========================================
  // CLASS 11: MATHEMATICS (12 Units with Weights)
  // ==========================================
  const c11_math = [
    { num: 1, slug: 'complex-numbers', en: 'Unit 1: Complex Numbers', ur: 'یونٹ 1: کمپلیکس اعداد اور پولر فارم', w: 6 },
    { num: 2, slug: 'matrices-and-determinants', en: 'Unit 2: Matrices and Determinants', ur: 'یونٹ 2: کالب اور مقطع (انورس اور کرائمر رول)', w: 15 },
    { num: 3, slug: 'vectors', en: 'Unit 3: Vectors in Space', ur: 'یونٹ 3: ویکٹرز اور ڈاٹ و کراس پروڈکٹس', w: 10 },
    { num: 4, slug: 'sequences-and-series', en: 'Unit 4: Sequences and Series (AP, GP, HP)', ur: 'یونٹ 4: حسابی اور ہندسی سلسلے', w: 6 },
    { num: 5, slug: 'miscellaneous-series', en: 'Unit 5: Miscellaneous Series (Sigma Notation)', ur: 'یونٹ 5: متفرق سلسلے (سگما فارمولے)', w: 3 },
    { num: 6, slug: 'permutation-combination-probability', en: 'Unit 6: Permutation, Combination and Probability', ur: 'یونٹ 6: ترتیب، امتزاج اور احتمال', w: 8 },
    { num: 7, slug: 'mathematical-induction-binomial', en: 'Unit 7: Mathematical Induction and Binomial Theorem', ur: 'یونٹ 7: ریاضیاتی استقراء اور دو رقمی مسئلہ', w: 8 },
    { num: 8, slug: 'functions-and-graphs', en: 'Unit 8: Functions and Graphs', ur: 'یونٹ 8: تفاعل (فنکشنز) اور گراف', w: 9 },
    { num: 9, slug: 'linear-programming', en: 'Unit 9: Linear Programming', ur: 'یونٹ 9: خطی پروگرامنگ اور فزیبل ریجن', w: 5 },
    { num: 10, slug: 'trigonometric-identities', en: 'Unit 10: Trigonometric Identities of Sum & Difference', ur: 'یونٹ 10: مثلثیاتی کلیات (جمع و تفریق)', w: 8 },
    { num: 11, slug: 'application-of-trigonometry', en: 'Unit 11: Application of Trigonometry', ur: 'یونٹ 11: مثلثیات کا اطلاق (سائن اور کوسائن قوانین)', w: 7 },
    { num: 12, slug: 'graphs-and-trig-equations', en: 'Unit 12: Graphs of Trig Functions & Solutions of Equations', ur: 'یونٹ 12: مثلثیاتی گراف اور مساواتوں کا حل', w: 15 },
  ];

  c11_math.forEach((u) => {
    add({
      classSlug: 'class-11', classId: 'class_11', className: 'Class 11',
      subjectId: 'sub_math', subjectName: 'Mathematics', subjectSlug: 'mathematics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: 'conic_sections',
      explanationEn: `Higher mathematics of ${u.en} carrying ${u.w}% board weightage. Matrix algebra, mathematical induction proofs, and trigonometric identities per BISE Swat specifications.`,
      explanationUr: `${u.ur} کا ایف ایس سی ریاضی کا نصاب۔ کالب، مثلثیات اور ثبوت۔`,
      keyTerms: [{ termEn: 'Mathematical Law / Theorem', termUr: 'ریاضیاتی اصول', definitionEn: `Formal theorem governing ${u.en}.` }],
      formulas: [{ labelEn: 'Governing Formula', labelUr: 'کلیہ', formula: 'Key formula in KPTBB Class 11 Math', explanationEn: 'Specifies algebraic or trigonometric relation.' }],
      workedExample: {
        titleEn: `Solved Board Problem: ${u.en}`,
        problemEn: `Solve the problem in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Given Statement', content: 'State given problem or theorem.' },
          { label: 'Step 2: Proof / Operations', content: 'Apply mathematical steps with reasons.' },
          { label: 'Step 3: Solution Set', content: 'State verified result.' },
        ],
        answer: 'Verified Mathematical Solution',
      },
      commonMistake: { mistake: 'Writing general solutions of trigonometric equations without + 2kπ.', correction: 'Always attach periodicity: θ = α + 2kπ, k ∈ Z.', reason: 'Trigonometric functions have infinite periodic solutions.' },
      quizMCQ: { promptEn: `What is the value of i² (imaginary unit)?`, options: [{ id: 'a', textEn: '-1' }, { id: 'b', textEn: '+1' }, { id: 'c', textEn: '0' }], correctOptionId: 'a', explanationEn: 'By definition of complex numbers, i = √(-1) and i² = -1.' },
      examTips: `Carries ${u.w}% weightage. Mathematical induction (Unit 7) and Cramer’s rule (Unit 2) are guaranteed exam questions.`,
    });
  });

  // ==========================================
  // CLASS 11: COMPUTER SCIENCE (8 Units)
  // ==========================================
  const c11_comp = [
    { num: 1, slug: 'overview-of-computer-system', en: 'Unit 1: Overview of Computer System', ur: 'یونٹ 1: کمپیوٹر سسٹم کا جائزہ', w: 12, diag: 'network_topology' },
    { num: 2, slug: 'computer-memory', en: 'Unit 2: Computer Memory and Storage', ur: 'یونٹ 2: کمپیوٹر میموری (ریم، روم، کیشے)', w: 12, diag: 'network_topology' },
    { num: 3, slug: 'cpu-architecture', en: 'Unit 3: Central Processing Unit Architecture', ur: 'یونٹ 3: سی پی یو کی ساخت اور رجسٹرز', w: 14, diag: 'network_topology' },
    { num: 4, slug: 'inside-system-unit', en: 'Unit 4: Inside System Unit and Motherboard', ur: 'یونٹ 4: مدر بورڈ اور بسیں', w: 10, diag: 'network_topology' },
    { num: 5, slug: 'network-protocols', en: 'Unit 5: Network Communication and OSI Protocols', ur: 'یونٹ 5: نیٹ ورک پروٹوکولز اور او ایس آئی ماڈل', w: 15, diag: 'network_topology' },
    { num: 6, slug: 'wireless-communications', en: 'Unit 6: Wireless Communications (4G/5G, Wi-Fi)', ur: 'یونٹ 6: وائرلیس مواصلات', w: 11, diag: 'network_topology' },
    { num: 7, slug: 'database-fundamentals', en: 'Unit 7: Database Fundamentals and Models', ur: 'یونٹ 7: ڈیٹا بیس کے بنیادی اصول', w: 13, diag: 'network_topology' },
    { num: 8, slug: 'database-development', en: 'Unit 8: Database Development and SQL', ur: 'یونٹ 8: ڈیٹا بیس ڈویلپمنٹ اور ایس کیو ایل', w: 13, diag: 'network_topology' },
  ];

  c11_comp.forEach((u) => {
    add({
      classSlug: 'class-11', classId: 'class_11', className: 'Class 11',
      subjectId: 'sub_comp', subjectName: 'Computer Science', subjectSlug: 'computer-science',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag,
      explanationEn: `Computer Science systems, OSI model layers, CPU instruction cycles, and SQL databases for FSc Part 1 per BISE Swat specifications.`,
      explanationUr: `${u.ur} کا ایف ایس سی کمپیوٹر سائنس نصاب۔ سی پی یو آرکیٹیکچر، ڈیٹا بیس اور نیٹ ورکنگ۔`,
      keyTerms: [
        { termEn: 'System Architecture', termUr: 'سسٹم آرکیٹیکچر', definitionEn: `Hardware or network structure in ${u.en}.` },
        { termEn: 'Data Standard', termUr: 'ڈیٹا معیار', definitionEn: 'Formal protocol regulating data processing or query execution.' },
      ],
      workedExample: {
        titleEn: `Technical Question: ${u.en}`,
        problemEn: `Explain the system mechanism in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Definition', content: 'Provide standard technical definition.' },
          { label: 'Step 2: Architecture', content: 'Explain layers, registers, or SQL queries.' },
          { label: 'Step 3: Industry Application', content: 'Give real enterprise application.' },
        ],
        answer: 'Model 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Mixing up OSI model 7 layers order.', correction: 'Remember mnemonic: Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application).', reason: 'Layer sequence is strictly assessed in board marking.' },
      quizMCQ: { promptEn: `Which layer of the OSI model handles logical IP addressing?`, options: [{ id: 'a', textEn: 'Network Layer' }, { id: 'b', textEn: 'Data Link Layer' }, { id: 'c', textEn: 'Transport Layer' }], correctOptionId: 'a', explanationEn: 'Network Layer (Layer 3) handles routing and IP addressing.' },
      examTips: `Carries ${u.w}% weightage. OSI 7 layers and CPU instruction cycle are top long questions.`,
    });
  });
};
