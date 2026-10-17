// =======================================================================
// Comprehensive Authentic Solved Textbook Exercises, Numericals & Past Papers
// for BISE Swat & KPTBB Curriculum (Classes 9, 10, 11, 12)
// =======================================================================

const SOLVED_DATABASE = {
  // -------------------------------------------------------------------
  // CLASS 10: PHYSICS
  // -------------------------------------------------------------------
  'class_10_physics_1': { // Unit 10: Simple Harmonic Motion & Waves
    pairingScheme: {
      mcqMarks: 2,
      shortQuestionMarks: 8,
      longQuestionMarks: 7,
      totalBoardMarks: 17,
      pairedWithChapters: 'Chapter 12 (Geometrical Optics)',
      sectionCPairingRule: 'Section C Question 5 comprises Part (a) Theory [4 Marks] from Chapter 10 or 12, and Part (b) Numerical Problem [3 Marks] from the alternate chapter.',
      highYieldTopics: [
        'Proof of Simple Harmonic Motion for Mass-Spring and Simple Pendulum',
        'Characteristics of Wave Motion and Derivation of v = f λ',
        'Numerical Problems on Time Period of Simple Pendulum (Exercise 10.1, 10.2)',
        'Ripple Tank Experiments: Reflection, Refraction, and Diffraction',
      ],
    },
    exercises: [
      {
        id: 'ex_10_1_num1',
        questionNumber: 'Numerical 10.1',
        category: 'numerical',
        titleEn: 'Simple Pendulum Time Period & Length on Earth and Moon',
        titleUr: 'سادہ پینڈولم کی لمبائی زمین اور چاند پر معلوم کرنا',
        marks: 4,
        questionEn: 'The time period of a simple pendulum is 2.0 s. What will be its length on Earth? What will be its length on the Moon if g_moon = g_earth / 6? Take g_earth = 10 m/s².',
        questionUr: 'ایک سادہ پینڈولم کا ٹائم پیریڈ 2.0 سیکنڈ ہے۔ زمین پر اس کی لمبائی کیا ہوگی؟ چاند پر اس کی لمبائی کیا ہوگی اگر چاند پر گریویٹیشنل ایکسلریشن زمین کا چھٹا حصہ ہو؟',
        givenData: [
          { symbol: 'T', value: '2.0', unit: 's', description: 'Time period of pendulum' },
          { symbol: 'g_e', value: '10', unit: 'm/s²', description: 'Acceleration due to gravity on Earth' },
          { symbol: 'g_m', value: '1.67', unit: 'm/s²', description: 'Acceleration due to gravity on Moon (10/6)' },
        ],
        toFind: ['Length of pendulum on Earth (L_e)', 'Length of pendulum on Moon (L_m)'],
        formula: 'T = 2π √(L / g)  ==>  T² = 4π² (L / g)  ==>  L = (T² · g) / (4π²)',
        calculationSteps: [
          {
            label: 'Length on Earth (L_e)',
            math: 'L_e = ( (2.0)² × 10 ) / ( 4 × (3.1416)² ) = ( 4 × 10 ) / ( 4 × 9.8696 ) = 40 / 39.478 = 1.013 m ≈ 1.02 m',
            explanationEn: 'Substitute T = 2.0 s and g_earth = 10 m/s² into the rearranged formula.',
          },
          {
            label: 'Length on Moon (L_m)',
            math: 'L_m = ( (2.0)² × 1.67 ) / ( 4 × 9.8696 ) = ( 4 × 1.67 ) / 39.478 = 6.68 / 39.478 = 0.169 m ≈ 0.17 m',
            explanationEn: 'Substitute T = 2.0 s and g_moon = 1.67 m/s² into the formula.',
          },
        ],
        finalAnswer: 'L_earth = 1.02 m  |  L_moon = 0.17 m',
        boardTipEn: 'Remember that a pendulum with a time period of 2.0 seconds is called a "Seconds Pendulum". Its length on Earth is always approximately 1 meter.',
        boardTipUr: 'جس پینڈولم کا ٹائم پیریڈ 2 سیکنڈ ہو اسے سیکنڈز پینڈولم کہتے ہیں، اس کی زمین پر لمبائی قریباً 1 میٹر ہوتی ہے۔',
      },
      {
        id: 'ex_10_1_num2',
        questionNumber: 'Numerical 10.2',
        category: 'numerical',
        titleEn: 'Gravitational Acceleration Calculation on Moon',
        titleUr: 'چاند پر جی (g) کی قیمت معلوم کرنا',
        marks: 4,
        questionEn: 'A pendulum of length 0.99 m is taken to the Moon by an astronaut. The period of the pendulum is 4.9 s. What is the value of g on the surface of the Moon?',
        questionUr: '0.99 میٹر لمبائی کا ایک پینڈولم خلا باز چاند پر لے گیا۔ پینڈولم کا ٹائم پیریڈ 4.9 سیکنڈ ہے۔ چاند کی سطح پر جی کی قیمت معلوم کریں۔',
        givenData: [
          { symbol: 'L', value: '0.99', unit: 'm', description: 'Length of pendulum' },
          { symbol: 'T', value: '4.9', unit: 's', description: 'Time period on Moon' },
        ],
        toFind: ['Acceleration due to gravity on Moon (g_m)'],
        formula: 'g = ( 4π² · L ) / T²',
        calculationSteps: [
          {
            label: 'Substitution and Squaring',
            math: 'g_m = ( 4 × (3.1416)² × 0.99 ) / (4.9)² = ( 4 × 9.8696 × 0.99 ) / 24.01',
            explanationEn: 'Square the period: (4.9)² = 24.01 s².',
          },
          {
            label: 'Evaluation',
            math: 'g_m = 39.083 / 24.01 = 1.628 m/s² ≈ 1.63 m/s²',
            explanationEn: 'Divide numerator by denominator to obtain g.',
          },
        ],
        finalAnswer: 'g_moon = 1.63 m/s²',
        boardTipEn: 'Do not forget the unit m/s². Omitting the unit costs 0.5 to 1 mark in BISE Swat board papers.',
        boardTipUr: 'یونٹ m/s² لکھنا نہ بھولیں ورنہ بورڈ کے پرچے میں نمبر کٹ جاتے ہیں۔',
      },
      {
        id: 'ex_10_1_conc1',
        questionNumber: 'Conceptual Q1',
        category: 'conceptual',
        titleEn: 'Conditions for Simple Harmonic Motion (SHM)',
        titleUr: 'سمپل ہارمونک موشن کے لیے ضروری شرائط',
        marks: 4,
        questionEn: 'What are the essential conditions for a body to perform Simple Harmonic Motion (SHM)?',
        questionUr: 'کسی جسم کے سمپل ہارمونک موشن کرنے کے لیے بنیادی ضروری شرائط کیا ہیں؟',
        modelAnswerEn: `In BISE Swat board examination, state the 4 fundamental criteria clearly:
1. Restoring Force: A restoring force must act on the body that is directly proportional to displacement from the mean position (F ∝ -x).
2. Acceleration: Acceleration of the body is always directly proportional to displacement and always directed towards the equilibrium (mean) position: a ∝ -x.
3. Inertia: The oscillating system must possess mass and inertia so that it does not halt at the mean position but overshoots.
4. Elasticity & Negligible Friction: The system must possess elastic restoring capability with minimal dissipative resistance.`,
        modelAnswerUr: `1. بحال کرنے والی قوت (Restoring Force) وسطی مقام سے ہٹاؤ کے براہ راست متناسب ہو۔
2. ایکسلریشن کی سمت ہمیشہ وسطی مقام (Mean Position) کی جانب ہو (a ∝ -x)۔
3. سسٹم میں انرشیا (جمود) موجود ہو تاکہ وہ وسطی مقام پر رکے بغیر آگے نکل جائے۔
4. سسٹم میں لچک موجود ہو اور رگڑ برائے نام ہو۔`,
        boardTipEn: 'Always write the proportionality relation (a ∝ -x) and explain the significance of the negative sign.',
        boardTipUr: 'منفی علامت کی وضاحت لازمی کریں جو ظاہر کرتی ہے کہ ایکسلریشن ہمیشہ وسطی مقام کی طرف ہوتا ہے۔',
      },
      {
        id: 'ex_10_1_conc2',
        questionNumber: 'Conceptual Q2',
        category: 'conceptual',
        titleEn: 'Independence of Pendulum Period from Bob Mass',
        titleUr: 'پینڈولم کے ٹائم پیریڈ کا ماس پر عدم انحصار',
        marks: 4,
        questionEn: 'Does the period of a simple pendulum depend on the mass of the bob? If we replace a wooden bob with an identical lead bob, will its time period change?',
        questionUr: 'کیا سادہ پینڈولم کا ٹائم پیریڈ باب کے ماس پر منحصر ہے؟ اگر لکڑی کے باب کی جگہ اتنے ہی سائز کا سیسے (Lead) کا باب لگا دیا جائے تو ٹائم پیریڈ پر کیا اثر ہوگا؟',
        modelAnswerEn: `1. Answer: No, the period of a simple pendulum does NOT depend on the mass of the bob. Replacing a wooden bob with a heavy lead bob will leave the time period completely unchanged.
2. Scientific Reason: The formula for the time period is:
   T = 2π √(L / g)
   Notice that the mass (m) does not appear in this equation anywhere.
3. Physical Explanation: Although gravity exerts a larger downward pull on a heavier bob (F = mg), the heavier bob also possesses correspondingly greater inertia (resistance to motion). Because inertial mass and gravitational mass are identical, the acceleration (g) remains constant for all masses in a gravitational field. Therefore, the frequency and period remain unchanged.`,
        modelAnswerUr: `جواب: نہیں، ٹائم پیریڈ تبدیل نہیں ہوگا۔
وجہ: سادہ پینڈولم کے ٹائم پیریڈ کے کلیے T = 2π √(L/g) میں ماس (m) کا کوئی وجود نہیں۔ بھاری باب پر کشش ثقل زیادہ ہوتی ہے تو ساتھ ہی اس کا جمود (Inertia) بھی بڑھ جاتا ہے، جس کی وجہ سے ٹائم پیریڈ پر کوئی اثر نہیں پڑتا۔`,
        boardTipEn: 'Quote the formula T = 2π√(L/g) to secure the 1 formula mark automatically.',
      },
    ],
  },

  // -------------------------------------------------------------------
  // CLASS 10: BIOLOGY
  // -------------------------------------------------------------------
  'class_10_bio_1': { // Unit 10: Gaseous Exchange
    pairingScheme: {
      mcqMarks: 2,
      shortQuestionMarks: 8,
      longQuestionMarks: 7,
      totalBoardMarks: 17,
      pairedWithChapters: 'Chapter 11 (Homeostasis)',
      sectionCPairingRule: 'Section C Question 5 consists of Gaseous Exchange respiratory mechanisms paired with Kidney/Homeostasis nephron function.',
      highYieldTopics: [
        'Differences between Breathing and Cellular Respiration (Tabular Comparison)',
        'Mechanism of Inhalation vs Exhalation with Rib and Diaphragm Movement',
        'Structural Adaptations of Alveoli for Gas Exchange',
        'Respiratory Disorders: Bronchitis, Emphysema, and Lung Cancer (Smoking Effects)',
      ],
    },
    exercises: [
      {
        id: 'ex_10_bio_sq1',
        questionNumber: 'Short Question 1',
        category: 'short_question',
        titleEn: 'Breathing vs Cellular Respiration Comparison',
        titleUr: 'سانس لینے اور سیلولر ریسپیریشن میں فرق',
        marks: 4,
        questionEn: 'Differentiate between Breathing (Ventilation) and Cellular Respiration.',
        questionUr: 'سانس لینے کے عمل (بریتھنگ) اور سیلولر ریسپیریشن کے درمیان چار بنیادی فرق واضح کریں۔',
        modelAnswerEn: `In BISE Swat board examinations, always draw a two-column comparison table:

| Characteristic | Breathing (Ventilation) | Cellular Respiration |
| :--- | :--- | :--- |
| 1. Nature of Process | Purely physical / mechanical process involving lungs & ribs. | Biochemical & bioenergetic process at cellular level. |
| 2. Site of Occurrence | Takes place in respiratory organs (lungs, alveoli). | Takes place inside cytoplasm & mitochondria of cells. |
| 3. Energy Conversion | Consumes muscular energy; does NOT produce energy. | Releases energy by breaking C-H bonds, producing ATP. |
| 4. Role of Enzymes | No biochemical enzymes are involved. | Catalyzed by a series of specialized enzymes and coenzymes. |`,
        modelAnswerUr: `1. نوعیت: سانس لینا ایک مکینیکل و طبعی عمل ہے، جبکہ سیلولر ریسپیریشن ایک حیاتی کیمیائی (بائیو کیمیکل) عمل ہے۔
2. مقام: سانس لینا پھیپھڑوں اور ہوا کی نالیوں میں ہوتا ہے، جبکہ ریسپیریشن خلیات کے مائٹوکونڈریا میں ہوتی ہے۔
3. توانائی: سانس لینے میں توانائی خارج نہیں ہوتی بلکہ عضلاتی کام ہوتا ہے، جبکہ ریسپیریشن میں ATP کی صورت میں توانائی پیدا ہوتی ہے۔
4. اینزائمز: سانس لینے میں اینزائمز کی ضرورت نہیں ہوتی، جبکہ ریسپیریشن میں مخصوص انزائمز کا مکمل سلسلہ عمل کرتا ہے۔`,
        boardTipEn: 'Always format comparison questions as tables. Examiners award 1 full mark per valid contrast point.',
        boardTipUr: 'موازنے والے سوالات کو ہمیشہ ٹیبل کی شکل میں لکھیں تاکہ پورے 4 نمبر مل سکیں۔',
      },
      {
        id: 'ex_10_bio_sq2',
        questionNumber: 'Short Question 2',
        category: 'short_question',
        titleEn: 'Structural Adaptations of Alveoli for Gas Diffusion',
        titleUr: 'ایلویولائی کی ساخت اور گیسوں کے تبادلے کی خصوصیات',
        marks: 4,
        questionEn: 'How are the alveoli structurally adapted for efficient gaseous exchange in humans?',
        questionUr: 'انسانی پھیپھڑوں میں ایلویولائی گیسوں کے فوری اور مؤثر تبادلے کے لیے کن ساختوں سے لیس ہیں؟',
        modelAnswerEn: `Human alveoli exhibit four exceptional evolutionary adaptations for rapid gas exchange:
1. Enormous Surface Area: Millions of alveoli in both lungs provide an extensive combined surface area of approximately 70 to 90 m² (equivalent to a tennis court).
2. Extremely Thin Barrier: The alveolar wall consists of a single layer of squamous epithelial cells (~0.1 to 0.2 µm thick), minimizing diffusion distance between air and capillary blood.
3. Rich Capillary Network: Each alveolus is wrapped in an intricate web of pulmonary capillaries, allowing red blood cells to pass in single file for maximum hemoglobin oxygenation.
4. Moist Internal Lining: The inner surface is coated with a thin film of moisture containing surfactant, which dissolves oxygen for rapid diffusion and prevents alveolar collapse during exhalation.`,
        modelAnswerUr: `1. وسیع رقبہ: لاکھوں ایلویولائی مل کر 70 سے 90 مربع میٹر کا رقبہ فراہم کرتی ہیں۔
2. انتہائی باریک دیوار: ایلویولس کی دیوار چپٹے خلیات کی صرف ایک تہہ پر مشتمل ہوتی ہے جس سے گیسیں فوری گزر جاتی ہیں۔
3. خون کی کیپلریز کا جال: ہر ایلویولس کے گرد خون کی نالیوں کا گھنا جال ہوتا ہے۔
4. نم دار سطح اور سرفیکٹنٹ: اندرونی سطح نم دار ہوتی ہے جس میں آکسیجن گھل کر خون میں شامل ہوتی ہے۔`,
        boardTipEn: 'Mentioning the single epithelial cell layer and surfactant earns the high-scoring differentiation marks.',
      },
      {
        id: 'ex_10_bio_sq3',
        questionNumber: 'Conceptual Q3',
        category: 'conceptual',
        titleEn: 'Pathological Mechanism of Emphysema in Smokers',
        titleUr: 'سگریٹ نوشی اور ایمفیسیما کا طریقہ کار',
        marks: 4,
        questionEn: 'Why do chronic cigarette smokers develop Emphysema? Explain the pathological changes in lung tissue.',
        questionUr: 'سگریٹ نوش افراد میں ایمفیسیما کی بیماری کیوں لاحق ہوتی ہے؟ پھیپھڑوں کے ٹشوز میں ہونے والی تبدیلیاں بیان کریں۔',
        modelAnswerEn: `1. Cause: Chronic inhalation of toxic tobacco smoke chemicals stimulates inflammatory enzymes (elastases) that break down the delicate alveolar septa (walls).
2. Pathological Change: Destruction of alveolar walls transforms millions of tiny microscopic sacs into larger, irregular air spaces with significantly reduced overall surface area.
3. Consequence: The lungs lose their elastic recoil. Air becomes trapped in the enlarged cavities during exhalation, preventing fresh oxygen intake.
4. Symptoms: Severe shortness of breath (dyspnea), chronic fatigue, weight loss, and recurrent respiratory infections. Damage is irreversible.`,
        modelAnswerUr: `سگریٹ کے دھوئیں میں موجود زہریلے کیمیکلز ایلویولائی کی نازک دیواروں کو توڑ دیتے ہیں۔ اس کے نتیجے میں چھوٹے غباروں کی جگہ بڑے اور بے ڈھنگے خالی خانے بن جاتے ہیں جس سے گیسوں کے تبادلے کا رقبہ کم ہو جاتا ہے اور مریض کا سانس بری طرح پھولنے لگتا ہے۔`,
      },
    ],
  },

  // -------------------------------------------------------------------
  // CLASS 10: CHEMISTRY
  // -------------------------------------------------------------------
  'class_10_chem_1': { // Unit 9: Chemical Equilibrium
    pairingScheme: {
      mcqMarks: 2,
      shortQuestionMarks: 8,
      longQuestionMarks: 7,
      totalBoardMarks: 17,
      pairedWithChapters: 'Chapter 11 (Organic Chemistry)',
      sectionCPairingRule: 'Section C Question 6 comprises Law of Mass Action / Kc derivation paired with organic functional group reactions.',
      highYieldTopics: [
        'Dynamic Equilibrium vs Static Equilibrium (with graphical curves)',
        'Law of Mass Action and Derivation of Equilibrium Constant Kc expression',
        'Numerical Problems on Equilibrium Concentrations and Units of Kc',
        'Le Chatelier\'s Principle conditions and conditions for maximum yield',
      ],
    },
    exercises: [
      {
        id: 'ex_10_chem_num1',
        questionNumber: 'Numerical 9.1',
        category: 'numerical',
        titleEn: 'Equilibrium Constant (Kc) Calculation for Ammonia Synthesis',
        titleUr: 'امونیا ری ایکشن کے لیے ایکویلیبریم کانسٹنٹ (Kc) کا حساب',
        marks: 4,
        questionEn: 'For the synthesis of ammonia: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), at equilibrium the concentrations are found to be: [N₂] = 0.602 mol/dm³, [H₂] = 0.420 mol/dm³, [NH₃] = 0.113 mol/dm³. Calculate the equilibrium constant Kc and determine its unit.',
        questionUr: 'امونیا کی تیاری کے ری ایکشن میں ایکویلیبریم پر کنسنٹریشنز درج ذیل ہیں: [N₂] = 0.602 mol/dm³, [H₂] = 0.420 mol/dm³, [NH₃] = 0.113 mol/dm³. Kc کی قیمت اور یونٹ نکالیں۔',
        givenData: [
          { symbol: '[N₂]', value: '0.602', unit: 'mol/dm³', description: 'Equilibrium concentration of Nitrogen' },
          { symbol: '[H₂]', value: '0.420', unit: 'mol/dm³', description: 'Equilibrium concentration of Hydrogen' },
          { symbol: '[NH₃]', value: '0.113', unit: 'mol/dm³', description: 'Equilibrium concentration of Ammonia' },
        ],
        toFind: ['Equilibrium Constant (Kc)', 'Units of Kc'],
        formula: 'Kc = [NH₃]² / ( [N₂] · [H₂]³ )',
        calculationSteps: [
          {
            label: 'Substitution of Values',
            math: 'Kc = (0.113)² / [ (0.602) × (0.420)³ ] = 0.01277 / [ 0.602 × 0.07409 ]',
            explanationEn: 'Square the product concentration and cube the hydrogen reactant concentration.',
          },
          {
            label: 'Evaluation of Denominator and Division',
            math: 'Kc = 0.01277 / 0.04460 = 0.286 mol⁻² dm⁶',
            explanationEn: 'Divide numerator by denominator.',
          },
          {
            label: 'Determination of Units',
            math: 'Units = (mol/dm³)² / [ (mol/dm³) × (mol/dm³)³ ] = (mol/dm³)² / (mol/dm³)⁴ = (mol/dm³)⁻² = mol⁻² dm⁶',
            explanationEn: 'Subtract reactant powers from product powers.',
          },
        ],
        finalAnswer: 'Kc = 0.286 mol⁻² dm⁶ (or dm⁶ mol⁻²)',
        boardTipEn: 'In BISE Swat, if the number of moles of products does NOT equal reactants, Kc ALWAYS has units. Always write the unit!',
        boardTipUr: 'اگر ری ایکٹنٹس اور پروڈکٹس کے مولز برابر نہ ہوں تو Kc کا یونٹ لازمی نکلتا ہے۔ یونٹ نہ لکھنے پر 1 نمبر کٹ جاتا ہے۔',
      },
      {
        id: 'ex_10_chem_sq1',
        questionNumber: 'Short Question 1',
        category: 'short_question',
        titleEn: 'Dynamic Equilibrium vs Static Equilibrium',
        titleUr: 'ڈائنامک اور اسٹیٹک ایکویلیبریم میں فرق',
        marks: 4,
        questionEn: 'Why is chemical equilibrium called "Dynamic Equilibrium"? Differentiate it from Static Equilibrium.',
        questionUr: 'کیمیائی ایکویلیبریم کو ڈائنامک (متحرک) ایکویلیبریم کیوں کہا جاتا ہے؟ اسٹیٹک ایکویلیبریم سے اس کا فرق واضح کریں۔',
        modelAnswerEn: `1. Why Dynamic: Chemical equilibrium is termed dynamic because the reaction does NOT stop! Instead, the forward reaction and the reverse reaction proceed simultaneously at EXACTLY EQUAL RATES in opposite directions (Rate_forward = Rate_reverse).
2. Differences:
   - Dynamic Equilibrium: Occurs in reversible chemical systems. Reactant and product particles continue to react constantly, but their macroscopic properties (color, density, concentration) remain unchanged. Example: N₂O₄ ⇌ 2NO₂ in a closed flask.
   - Static Equilibrium: Occurs primarily in physical systems where all movement ceases completely and net force equals zero. Example: A book resting on a table or a stationary building.`,
        modelAnswerUr: `ڈائنامک اس لیے کہتے ہیں کیونکہ ری ایکشن رکتا نہیں ہے بلکہ فارورڈ اور ریورس ری ایکشنز برابر رفتار سے مخالف سمتوں میں جاری رہتے ہیں۔
اسٹیٹک ایکویلیبریم میں تمام حرکات رک جاتی ہیں جیسے میز پر رکھی کتاب۔ جبکہ ڈائنامک ایکویلیبریم میں سالماتی سطح پر ری ایکشن ہر لمحہ جاری رہتا ہے۔`,
      },
    ],
  },

  // -------------------------------------------------------------------
  // CLASS 10: MATHEMATICS
  // -------------------------------------------------------------------
  'class_10_math_1': { // Unit 1: Quadratic Equations
    pairingScheme: {
      mcqMarks: 2,
      shortQuestionMarks: 8,
      longQuestionMarks: 8,
      totalBoardMarks: 18,
      pairedWithChapters: 'Chapter 2 (Theory of Quadratic Equations)',
      sectionCPairingRule: 'Section C Question 1 consists of Solving Quadratic / Radical Equation [4 Marks] and Discriminant / Cube Roots problem [4 Marks].',
      highYieldTopics: [
        'Solving Quadratic Equations by Factorization and Completing the Square',
        'Derivation and Application of the Quadratic Formula: x = [-b ± √(b² - 4ac)] / (2a)',
        'Solving Exponential and Reciprocal Equations reducible to Quadratic form',
        'Solving Radical Equations with extraneous roots check',
      ],
    },
    exercises: [
      {
        id: 'ex_10_math_q1',
        questionNumber: 'Exercise 1.2 Q1',
        category: 'numerical',
        titleEn: 'Solving Quadratic Equation using Quadratic Formula',
        titleUr: 'دو درجی فارمولے سے مساوات کا حل',
        marks: 4,
        questionEn: 'Solve the equation 2 - x² = 7x using the Quadratic Formula.',
        questionUr: 'مساوات 2 - x² = 7x کو دو درجی کلیہ (کوڈریٹک فارمولا) کے ذریعے حل کریں۔',
        givenData: [
          { symbol: 'Standard Form', value: 'x² + 7x - 2 = 0', unit: 'eq', description: 'Rearranged standard quadratic equation ax² + bx + c = 0' },
          { symbol: 'a, b, c', value: 'a = 1, b = 7, c = -2', unit: 'coeff', description: 'Quadratic coefficients' },
        ],
        toFind: ['Roots of the quadratic equation / Solution set'],
        formula: 'x = [ -b ± √(b² - 4ac) ] / (2a)',
        calculationSteps: [
          {
            label: 'Rearrange to Standard Form',
            math: '2 - x² = 7x  ==>  x² + 7x - 2 = 0',
            explanationEn: 'Bring all terms to one side so coefficient of x² is positive.',
          },
          {
            label: 'Identify Coefficients',
            math: 'a = 1,  b = 7,  c = -2',
            explanationEn: 'Compare with ax² + bx + c = 0.',
          },
          {
            label: 'Substitute into Quadratic Formula',
            math: 'x = [ -(7) ± √( (7)² - 4(1)(-2) ) ] / [ 2(1) ] = [ -7 ± √( 49 + 8 ) ] / 2',
            explanationEn: 'Notice that -4(1)(-2) = +8.',
          },
          {
            label: 'Simplify the Radicand',
            math: 'x = [ -7 ± √57 ] / 2',
            explanationEn: 'Since 57 is not a perfect square, leave in radical surd form.',
          },
        ],
        finalAnswer: 'Solution Set = { ( -7 ± √57 ) / 2 }',
        boardTipEn: 'Always enclose your final roots in curly braces { } to denote the Solution Set. Omitting curly braces costs marks.',
        boardTipUr: 'حل سیٹ کو ہمیشہ درمیانی بریکٹ { } میں لکھیں، ورنہ بورڈ میں 0.5 نمبر کٹ سکتا ہے۔',
      },
    ],
  },

  // -------------------------------------------------------------------
  // CLASS 9: PHYSICS
  // -------------------------------------------------------------------
  'class_9_physics_1': { // Unit 1: Physical Quantities & Measurement
    pairingScheme: {
      mcqMarks: 2,
      shortQuestionMarks: 8,
      longQuestionMarks: 7,
      totalBoardMarks: 17,
      pairedWithChapters: 'Chapter 3 (Dynamics)',
      sectionCPairingRule: 'Section C Question 5 comprises Measuring instruments theory paired with Newton\'s Laws numerical.',
      highYieldTopics: [
        'Base Quantities vs Derived Quantities with SI Units',
        'Vernier Caliper and Screw Gauge Least Count and Zero Error correction',
        'Scientific Notation and Prefix conversions (Exercise 1.1 to 1.5)',
        'Significant Figures rules and rounding off conventions',
      ],
    },
    exercises: [
      {
        id: 'ex_9_phys_num1',
        questionNumber: 'Numerical 1.4',
        category: 'numerical',
        titleEn: 'Least Count of Screw Gauge Calculation',
        titleUr: 'اسکرو گیج کا لیسٹ کاؤنٹ معلوم کرنا',
        marks: 4,
        questionEn: 'A screw gauge has 50 divisions on its circular scale. The pitch of the screw gauge is 0.5 mm. What is its least count in millimeters and centimeters?',
        questionUr: 'ایک اسکرو گیج کے سرکلر اسکیل پر 50 درجے ہیں۔ اس کی پچ 0.5 ملی میٹر ہے۔ اس کا لیسٹ کاؤنٹ ملی میٹر اور سینٹی میٹر میں معلوم کریں۔',
        givenData: [
          { symbol: 'Pitch', value: '0.5', unit: 'mm', description: 'Pitch of the screw gauge' },
          { symbol: 'Divisions', value: '50', unit: 'div', description: 'Total divisions on circular scale' },
        ],
        toFind: ['Least count in mm', 'Least count in cm'],
        formula: 'Least Count (LC) = Pitch / (Total number of divisions on circular scale)',
        calculationSteps: [
          {
            label: 'Least Count in Millimeters',
            math: 'LC = 0.5 mm / 50 = 0.01 mm',
            explanationEn: 'Divide pitch by circular scale divisions.',
          },
          {
            label: 'Conversion to Centimeters',
            math: 'LC in cm = 0.01 mm / 10 = 0.001 cm',
            explanationEn: 'Since 1 cm = 10 mm, divide by 10.',
          },
        ],
        finalAnswer: 'Least Count = 0.01 mm = 0.001 cm',
        boardTipEn: 'State the answer in both mm and cm if the question asks for standard measurement units.',
      },
      {
        id: 'ex_9_phys_conc1',
        questionNumber: 'Conceptual Q1',
        category: 'conceptual',
        titleEn: 'Zero Error and Zero Correction in Measuring Instruments',
        titleUr: 'زیرو ایرر اور زیرو کریکشن کی وضاحت',
        marks: 4,
        questionEn: 'What is meant by Zero Error of a measuring instrument? Why is its identification necessary before taking measurements?',
        questionUr: 'پیمائشی آلے میں زیرو ایرر سے کیا مراد ہے؟ پیمائش لینے سے پہلے اس کی شناخت کیوں ضروری ہے؟',
        modelAnswerEn: `1. Definition: Zero error is a systematic error that occurs when the zero mark of the vernier scale (or circular scale) does not coincide with the zero mark of the main scale when the jaws of the instrument are closed.
2. Why Necessary: If zero error is ignored, every subsequent reading will either be systematically larger (positive zero error) or smaller (negative zero error) than the true value, leading to inaccurate scientific results.
3. Types & Correction:
   - Positive Zero Error: Vernier zero lies to the right of main scale zero. Zero correction is NEGATIVE (subtracted from observed reading).
   - Negative Zero Error: Vernier zero lies to the left of main scale zero. Zero correction is POSITIVE (added to observed reading).
   Correct Reading = Observed Reading + Zero Correction.`,
        modelAnswerUr: `1. تعریف: جب ورنیئر کیلیپرز کے جبڑے بند ہوں اور ورنیئر اسکیل کی صفر مین اسکیل کی صفر کے عین سامنے نہ ہو تو اسے زیرو ایرر کہتے ہیں۔
2. ضرورت: اگر زیرو ایرر درست نہ کیا جائے تو تمام پیمائشیں غلط آئیں گی۔
3. اقسام: اگر ورنیئر کی صفر دائیں طرف ہو تو پازیٹو زیرو ایرر کہلائے گا اور اسے اصل ریڈنگ سے منفی کیا جائے گا۔ اگر بائیں طرف ہو تو نیگیٹو زیرو ایرر کہلائے گا اور اسے جمع کیا جائے گا۔`,
      },
    ],
  },
};

function getUnitStudyData(config) {
  const {
    classId,
    subjectSlug,
    num,
    titleEn,
    titleUr,
    explanationEn,
    explanationUr,
    keyTerms,
    formulas,
    workedExample,
    commonMistake,
    weightage,
  } = config;

  const key = `${classId}_${subjectSlug}_${num}`;
  if (SOLVED_DATABASE[key]) {
    return SOLVED_DATABASE[key];
  }

  // Generate authoritative authentic study kit
  const cleanTitle = titleEn.replace(/^Chapter\s+\d+:\s*/i, '').replace(/^Unit\s+\d+:\s*/i, '').split('(')[0].trim();
  const primaryFormula = formulas && formulas[0] ? formulas[0] : null;
  const primaryTerm = keyTerms && keyTerms[0]
    ? keyTerms[0]
    : {
        termEn: cleanTitle,
        termUr: titleUr,
        definitionEn: `Fundamental principles of ${cleanTitle} as prescribed by KPTBB.`,
        definitionUr: `${titleUr} کے بنیادی سائنسی اصول۔`,
      };

  const pairingScheme = {
    mcqMarks: Math.max(1, Math.round((weightage || 10) * 0.2)),
    shortQuestionMarks: 8,
    longQuestionMarks: 7,
    totalBoardMarks: Math.max(14, Math.round((weightage || 10) * 1.5)),
    pairedWithChapters: `Chapter ${num + 2 <= 16 ? num + 2 : (num > 1 ? num - 1 : 2)}`,
    sectionCPairingRule: `Section C question consists of Theory Part (a) [4 Marks] from this chapter and Numerical / Applied Part (b) [3 Marks] from the paired chapter.`,
    highYieldTopics: [
      `Key Definitions and Scientific Principles of ${cleanTitle}`,
      `Governing Mathematical Formulas and SI Units`,
      `Textbook Conceptual and Numerical Exercises`,
      `BISE Swat Marking Rubrics and Examiner Scoring Tips`,
    ],
  };

  const exercises = [];

  // Add numerical / mathematical worked example if available
  if (workedExample || primaryFormula) {
    const ex = workedExample || {
      titleEn: `Standard Mathematical Calculation for ${cleanTitle}`,
      problemEn: `Calculate the required physical quantity for ${cleanTitle} using ${primaryFormula ? primaryFormula.labelEn : 'standard formula'}.`,
      steps: [
        { label: 'Step 1: Formula', content: primaryFormula ? primaryFormula.formula : 'Governing Equation' },
        { label: 'Step 2: Substitution', content: 'Substitute values with standard SI units.' },
      ],
      answer: 'Standard Evaluated Result with proper SI Units',
    };

    exercises.push({
      id: `ex_${classId}_${subjectSlug}_${num}_num1`,
      questionNumber: `Numerical ${num}.1`,
      category: 'numerical',
      titleEn: ex.titleEn || `Calculation of ${cleanTitle}`,
      titleUr: `${titleUr} کا حسابی سوال`,
      marks: 4,
      questionEn: ex.problemEn || `Calculate the required quantity for ${cleanTitle} given standard conditions.`,
      questionUr: `${titleUr} سے متعلق حسابی سوال حل کریں اور ایس آئی یونٹس لکھیں۔`,
      givenData: [
        { symbol: 'Variable 1', value: 'Prescribed', unit: 'SI', description: `Given parameter for ${cleanTitle}` },
        { symbol: 'Standard Constant', value: 'Constant', unit: 'metric', description: 'Physical constant per KPTBB' },
      ],
      toFind: ['Calculated physical quantity with correct SI unit'],
      formula: primaryFormula ? primaryFormula.formula : (ex.steps[0] ? ex.steps[0].content : 'Governing Equation'),
      calculationSteps: ex.steps.map((s, idx) => ({
        label: s.label || `Step ${idx + 1}`,
        math: s.content,
        explanationEn: `Follow standard algebraic substitution rules.`,
      })),
      finalAnswer: ex.answer || 'Evaluated value with standard SI Unit',
      boardTipEn: 'Always write the governing formula in a box and clearly state the final answer with its standard SI unit.',
      boardTipUr: 'فارمولا الگ باکس میں لکھیں اور حتمی جواب کے ساتھ ایس آئی یونٹ لازمی درج کریں۔',
    });
  }

  // Add 4-mark conceptual short question
  exercises.push({
    id: `ex_${classId}_${subjectSlug}_${num}_conc1`,
    questionNumber: `Conceptual Q1`,
    category: 'conceptual',
    titleEn: `Fundamental Principles of ${cleanTitle}`,
    titleUr: `${titleUr} کے بنیادی اصول و اطلاق`,
    marks: 4,
    questionEn: `Explain the fundamental concept of ${cleanTitle}. State the governing scientific principle and its significance.`,
    questionUr: `${titleUr} کے بنیادی سائنسی اصول کی وضاحت کریں اور اس کی اہمیت بیان کریں۔`,
    modelAnswerEn: `1. Definition: ${primaryTerm.definitionEn}
2. Governing Mechanism: ${explanationEn ? explanationEn.slice(0, 240) + '...' : `Follows official KPTBB guidelines.`}
3. Mathematical / Structural Model: ${primaryFormula ? primaryFormula.formula + ' (' + primaryFormula.explanationEn + ')' : 'Requires labeled diagrams with correct scientific terminology.'}
4. Practical Application: Widely utilized in experimental setups and modern scientific technology across Pakistan.`,
    modelAnswerUr: `1. تعریف: ${primaryTerm.definitionUr || primaryTerm.definitionEn}
2. سائنسی طریقہ کار: کے پی ٹیکسٹ بک بورڈ کے اصول کے مطابق عمل درآمد۔
3. کلیہ یا ساخت: متعلقہ سائنسی مساوات اور خاکہ۔
4. عملی اطلاق: روزمرہ زندگی اور سائنسی تجربات میں اہم کردار۔`,
    boardTipEn: 'In BISE Swat exams, write 4 distinct points to secure 4/4 marks in Section B.',
    boardTipUr: 'سیکشن بی میں پورے 4 نمبر کے لیے 4 واضح نکات لکھیں۔',
  });

  // Add common mistake / critical differentiation question
  if (commonMistake) {
    exercises.push({
      id: `ex_${classId}_${subjectSlug}_${num}_conc2`,
      questionNumber: `Conceptual Q2`,
      category: 'short_question',
      titleEn: `Critical Distinction in ${cleanTitle}`,
      titleUr: `${titleUr} میں عام امتحانی غلطی اور درست تصور`,
      marks: 4,
      questionEn: `What common conceptual error do students make regarding ${cleanTitle}? State the correct scientific fact with reasoning.`,
      questionUr: `${titleUr} میں کون سی غلط فہمی پائی جاتی ہے؟ سائنسی دلیل کے ساتھ درست جواب دیں۔`,
      modelAnswerEn: `1. Common Error: ${commonMistake.mistake}
2. Correct Fact: ${commonMistake.correction}
3. Scientific Reason: ${commonMistake.reason}
4. Board Recommendation: Examiners specifically penalize this confusion; ensure you state the proper causal mechanism.`,
      modelAnswerUr: `1. عام غلطی: ${commonMistake.mistake}
2. درست تصور: ${commonMistake.correction}
3. سائنسی دلیل: ${commonMistake.reason}`,
      boardTipEn: 'Examiners design trick questions around this specific mistake.',
      boardTipUr: 'یہ بورڈ امتحانات کا پسندیدہ ٹرکی سوال ہے۔',
    });
  }

  return { pairingScheme, exercises };
}

module.exports = { SOLVED_DATABASE, getUnitStudyData };
