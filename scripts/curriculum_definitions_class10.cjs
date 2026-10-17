module.exports = function (add) {
  // ==========================================
  // CLASS 10: PHYSICS (9 Units with Weights)
  // ==========================================
  const c10_physics = [
    {
      num: 1, slug: 'oscillations-and-waves', en: 'Unit 1: Oscillations and Waves', ur: 'یونٹ 1: ارتعاش اور لہریں (SHM)', w: 10, diag: 'wave_motion',
      subtopics: [
        {
          subNum: 1, titleEn: '10.1 Simple Harmonic Motion (SHM)', titleUr: '10.1 سمپل ہارمونک موشن (ماس اسپرنگ سسٹم)', durationMinutes: 15,
          bodyEn: 'Simple Harmonic Motion (SHM) occurs when the net restoring force acting on an oscillating body is directly proportional to its displacement from the mean position and is always directed towards the mean position: a ∝ -x.\n\nConsider a mass m attached to an elastic spring resting on a frictionless horizontal surface. When displaced by distance x, Hooke’s law gives the restoring force F = -kx, where k is the spring stiffness constant. By Newton’s second law (F = ma), ma = -kx, which yields acceleration a = -(k/m)x. The negative sign confirms acceleration is always directed towards the equilibrium position.',
          bodyUr: 'سمپل ہارمونک موشن اس وقت وقوع پذیر ہوتی ہے جب بحال کرنے والی قوت (Restoring Force) جسم کے وسطی مقام سے ہٹاؤ (x) کے براہ راست متناسب ہو اور اس کی سمت ہمیشہ وسطی مقام کی طرف ہو۔',
          diagKey: 'wave_motion',
          workedExample: {
            titleEn: 'Calculation of Time Period of Spring-Mass System',
            problemEn: 'A mass of 0.5 kg is attached to a spring of spring constant k = 50 N/m. Find the time period of oscillation.',
            steps: [
              { label: 'Step 1: Formula', content: 'T = 2π √(m/k).' },
              { label: 'Step 2: Substitution', content: 'T = 2 × 3.1416 × √(0.5 / 50) = 6.283 × √(0.01) = 6.283 × 0.1 = 0.628 s.' },
            ],
            answer: 'Time Period T = 0.63 seconds',
          },
          commonMistake: { mistake: 'Writing that acceleration in SHM is zero at extreme positions.', correction: 'Acceleration is maximum at extreme positions (where displacement x = maximum) and zero at mean position.', reason: 'a ∝ -x directly links acceleration to displacement.' },
        },
        {
          subNum: 2, titleEn: '10.2 Ball and Bowl System & Simple Pendulum', titleUr: '10.2 بال اینڈ باؤل سسٹم اور سادہ پینڈولم', durationMinutes: 16,
          bodyEn: 'A small ball placed in a smooth spherical bowl executes SHM about its lowest equilibrium position. When displaced, the component of gravity mg sin θ provides the restoring force directed towards the center.\n\nSimilarly, a simple pendulum consists of a small heavy bob of mass m suspended by a light inextensible string of length L. For small angular displacements (θ < 10°), the restoring force is F = -mg sin θ ≈ -mg(x/L). The time period is given by T = 2π √(L/g), proving that the period is independent of the bob’s mass and amplitude.',
          bodyUr: 'سادہ پینڈولم کا ٹائم پیریڈ صرف دھاگے کی لمبائی (L) اور کششِ ثقل (g) پر منحصر ہوتا ہے، اور یہ پینڈولم کے ماس سے بالکل آزاد ہوتا ہے۔',
          diagKey: 'vector_addition',
        },
        {
          subNum: 3, titleEn: '10.3 Damped Oscillations & Resonance', titleUr: '10.3 مدہم ارتعاش (Damped Oscillations)', durationMinutes: 14,
          bodyEn: 'Damped oscillations are periodic oscillations whose amplitude progressively decreases over time due to the presence of resistive or dissipative forces such as friction and air resistance. Automobile shock absorbers use damping to prevent continuous vehicle bouncing after bumps.',
          bodyUr: 'رگڑ یا مزاحمتی قوتوں کی وجہ سے ارتعاش کے حیطہ (Amplitude) میں مسلسل کمی کو مدہم ارتعاش کہتے ہیں۔',
          diagKey: 'wave_motion',
        },
        {
          subNum: 4, titleEn: '10.4 Wave Motion & Types of Waves', titleUr: '10.4 موجی حرکت اور لہروں کی اقسام', durationMinutes: 15,
          bodyEn: 'A wave is a disturbance in a medium that transports energy from one point to another without transporting matter. Mechanical waves require a material medium (e.g. water waves, sound waves), whereas Electromagnetic waves require no medium (e.g. light, radio waves, X-rays).\n\nWaves are classified into Transverse Waves (particles vibrate perpendicular to wave propagation; consists of crests and troughs) and Longitudinal Waves (particles vibrate parallel to wave propagation; consists of compressions and rarefactions).',
          bodyUr: 'موجیں توانائی کو ایک جگہ سے دوسری جگہ منتقل کرتی ہیں لیکن مادے کی مستقل منتقلی نہیں ہوتی۔ مکینیکل موجیں مادے کے بغیر سفر نہیں کر سکتیں جبکہ برقی مقناطیسی موجیں خلا میں بھی سفر کرتی ہیں۔',
          diagKey: 'wave_motion',
        },
        {
          subNum: 5, titleEn: '10.5 Derivation of the Wave Equation (v = f · λ)', titleUr: '10.5 موجی مساوات کا ثبوت (v = f λ)', durationMinutes: 16,
          bodyEn: 'By kinematic definition, speed = distance / time: v = d / t. In one complete time period (t = T), a wave travels a distance equal to one wavelength (d = λ). Hence v = λ / T. Since frequency f = 1 / T, substituting gives the universal wave equation: v = f · λ. This fundamental equation holds true for all types of waves.',
          bodyUr: 'رفتار = فاصلہ / وقت۔ ایک پیریڈ (T) میں لہر ویولینتھ (λ) کا فاصلہ طے کرتی ہے، جس سے مساوات v = f λ اخذ ہوتی ہے۔',
          diagKey: 'wave_motion',
          workedExample: {
            titleEn: 'Sound Wave Frequency Calculation',
            problemEn: 'A sound wave has a frequency of 2 kHz and wavelength 35 cm. How long will it take to travel 1.5 km?',
            steps: [
              { label: 'Step 1: Convert units', content: 'f = 2000 Hz, λ = 0.35 m, d = 1500 m.' },
              { label: 'Step 2: Calculate wave speed', content: 'v = f × λ = 2000 × 0.35 = 700 m/s.' },
              { label: 'Step 3: Calculate time', content: 't = d / v = 1500 / 700 = 2.14 seconds.' },
            ],
            answer: 'Time t = 2.14 seconds',
          },
        },
        {
          subNum: 6, titleEn: '10.6 Ripple Tank Experiments', titleUr: '10.6 رپل ٹینک کے تجربات (انعکاس، انعطاف، انحراف)', durationMinutes: 15,
          bodyEn: 'A ripple tank is a laboratory apparatus used to generate and observe two-dimensional water waves. It demonstrates wave phenomena: Reflection (waves bounce off barrier obeying angle i = angle r), Refraction (wave speed and wavelength decrease when transitioning from deep to shallow water), and Diffraction (bending of waves around obstacles or narrow slits whose size is comparable to wavelength).',
          bodyUr: 'رپل ٹینک پانی کی لہروں کے انعکاس، انعطاف اور ڈیفریکشن (انحراف) کا عملی مظاہرہ کرتا ہے۔',
          diagKey: 'wave_motion',
        },
      ],
    },
    { num: 2, slug: 'sound', en: 'Unit 2: Sound', ur: 'یونٹ 2: آواز اور اس کی خصوصیات', w: 11, diag: 'wave_motion' },
    { num: 3, slug: 'geometrical-optics', en: 'Unit 3: Geometrical Optics', ur: 'یونٹ 3: جیومیٹریکل آپٹکس (روشنی اور عدسے)', w: 15, diag: 'optics' },
    { num: 4, slug: 'electrostatics', en: 'Unit 4: Electrostatics', ur: 'یونٹ 4: الیکٹرو سٹیٹکس (ساکن برقیات)', w: 14, diag: 'electric_field' },
    {
      num: 5, slug: 'current-electricity', en: 'Unit 5: Current Electricity', ur: 'یونٹ 5: کرنٹ الیکٹرسٹی (بہاؤ والی برقیات)', w: 11, diag: 'circuit_diagram', sim: 'circuit_simulator',
      subtopics: [
        {
          subNum: 1, titleEn: '14.1 Electric Current & Charge Flow', titleUr: '14.1 برقی کرنٹ اور چارج کا بہاؤ', durationMinutes: 14,
          bodyEn: 'Electric current is the rate of flow of electric charges through any cross-section of a conductor: I = Q / t. The SI unit of electric current is the Ampere (A). One ampere represents the flow of one Coulomb of charge in one second (1 A = 1 C/s). In metallic conductors, current is carried by negatively charged free electrons flowing opposite to conventional current direction.',
          bodyUr: 'کسی موصل میں سے فی سیکنڈ چارج کے بہاؤ کی شرح کو الیکٹرک کرنٹ کہتے ہیں (I = Q/t)۔ اس کا یونٹ ایمپیئر ہے۔',
          diagKey: 'circuit_diagram',
        },
        {
          subNum: 2, titleEn: '14.2 Potential Difference & Electromotive Force (EMF)', titleUr: '14.2 پوٹینشل کا فرق اور ای ایم ایف (EMF)', durationMinutes: 15,
          bodyEn: 'Potential difference between two points is the energy supplied by unit charge as it moves from one point to the other (V = W / Q). Electromotive Force (EMF) is the total energy supplied by the battery to drive a unit positive charge across the entire complete circuit including the internal resistance of the cell. EMF is measured in Volts (1 V = 1 J/C).',
          bodyUr: 'پوٹینشل ڈفرنس اور ای ایم ایف دونوں کا ایس آئی یونٹ وولٹ (J/C) ہے۔ بیٹری کا ای ایم ایف سرکٹ کی بند حالت میں ٹرمینل پوٹینشل ڈفرنس سے زیادہ ہوتا ہے۔',
          diagKey: 'circuit_diagram',
        },
        {
          subNum: 3, titleEn: '14.3 Ohm’s Law & Electrical Resistance', titleUr: '14.3 اوہم کا قانون اور برقی مزاحمت', durationMinutes: 16,
          bodyEn: 'Ohm’s law states that current I passing through a conductor is directly proportional to the potential difference V applied across its terminals, provided temperature and physical condition remain constant: V = I · R. Resistance R is opposition offered by conductor atoms to moving electrons. Factors affecting resistance: R = ρ · L / A, where L is length, A is cross-sectional area, and ρ is specific resistivity.',
          bodyUr: 'اوہم کے قانون کے مطابق اگر درجہ حرارت برقرار رہے تو وولٹیج اور کرنٹ کے درمیان براہ راست تناسب ہوتا ہے: V = IR۔',
          simKey: 'circuit_simulator',
        },
        {
          subNum: 4, titleEn: '14.4 Resistors in Series and Parallel Combinations', titleUr: '14.4 رزسٹرز کی سیریز اور پیرلل ترتیبات', durationMinutes: 18,
          bodyEn: 'In a Series Combination, current remains identical through all resistors while total voltage divides: Req = R1 + R2 + R3. In a Parallel Combination, potential difference across each branch is identical while total current divides: 1/Req = 1/R1 + 1/R2 + 1/R3. Domestic home appliances are connected in parallel so each operates at the full 220V mains supply independently.',
          bodyUr: 'گھریلو وائرنگ میں تمام برقی آلات پیرلل جوڑے جاتے ہیں تاکہ ہر آلے کو مکمل 220 وولٹ مل سکے اور ایک آلہ بند ہونے پر دوسرا متاثر نہ ہو۔',
          diagKey: 'circuit_diagram',
        },
        {
          subNum: 5, titleEn: '14.5 Electrical Energy, Power & Joule’s Law', titleUr: '14.5 برقی توانائی اور جول کا حرارتی قانون', durationMinutes: 16,
          bodyEn: 'When current flows through a resistance, electrical energy is converted into heat: W = Q·V = (I·t)·(IR) = I²Rt. This is Joule’s Law of Heating. Electrical power is the rate of energy dissipation: P = W / t = V·I = I²R = V²/R (Watts). Commercial electricity bills are calculated in Kilowatt-hours (1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J = 3.6 MegaJoules).',
          bodyUr: 'جول کے قانون کے مطابق پیدا شدہ حرارت کرنٹ کے مربع، مزاحمت اور وقت کے حاصل ضرب کے برابر ہوتی ہے: H = I²Rt۔ ایک یونٹ بجلی 3.6 میگا جول کے برابر ہے۔',
          diagKey: 'circuit_diagram',
        },
        {
          subNum: 6, titleEn: '14.6 Electrical Hazards & Safety Precautions in Homes', titleUr: '14.6 برقی خطرات اور حفاظتی تدابیر (ارتھ وائر اور فیوز)', durationMinutes: 14,
          bodyEn: 'Major hazards include short circuits (live and neutral wires touching with zero resistance causing dangerous sparks) and circuit overloading. Safety mechanisms: Earth wire (connects metallic chassis directly to ground to divert leakage current safely), Fuse (low melting point wire that melts when current exceeds safe limit), and Modern Circuit Breakers (electromagnetic switches).',
          bodyUr: 'حفاظتی تدابیر میں ارتھ وائر، فیوز اور سرکٹ بریکرز شامل ہیں جو شارٹ سرکٹ اور آگ لگنے کے خطرات کو روکتے ہیں۔',
          diagKey: 'circuit_diagram',
        },
      ],
    },
    { num: 6, slug: 'electromagnetism', en: 'Unit 6: Electromagnetism', ur: 'یونٹ 6: الیکٹرو میگنیٹزم (برقی مقناطیسیت)', w: 14, diag: 'circuit_diagram' },
    { num: 7, slug: 'introductory-electronics', en: 'Unit 7: Introductory Electronics', ur: 'یونٹ 7: الیکٹرانکس اور لاجک گیٹس', w: 6, diag: 'circuit_diagram' },
    { num: 8, slug: 'ict', en: 'Unit 8: Information and Communication Technology', ur: 'یونٹ 8: انفارمیشن اینڈ کمیونیکیشن ٹیکنالوجی', w: 7, diag: 'network_topology' },
    { num: 9, slug: 'radioactivity', en: 'Unit 9: Radioactivity and Nuclear Physics', ur: 'یونٹ 9: تابکاری اور ایٹمی فزکس', w: 12, diag: 'bohr_atom' },
  ];

  c10_physics.forEach((u) => {
    add({
      classSlug: 'class-10', classId: 'class_10', className: 'Class 10',
      subjectId: 'sub_physics', subjectName: 'Physics', subjectSlug: 'physics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim, subtopics: u.subtopics,
      explanationEn: `Deep study of ${u.en} carrying ${u.w}% weightage in BISE Swat Class 10 matric physics. Master formulas, ray/circuit diagrams, and step-by-step solved numericals.`,
      explanationUr: `${u.ur} کا مکمل نصاب۔ اس میں سائنسی خاکے، کلیات اور امتحانی حسابی سوالات شامل ہیں۔`,
      keyTerms: [
        { termEn: 'Physical Principle', termUr: 'بنیادی طبعی اصول', definitionEn: `Fundamental law governing ${u.en}.` },
        { termEn: 'SI Measure', termUr: 'ایس آئی پیمائش', definitionEn: 'Standard unit of measurement according to International System.' },
      ],
      formulas: [{ labelEn: 'Governing Formula', labelUr: 'کلیہ', formula: 'Key equation in KPTBB Class 10 Physics', explanationEn: 'Specifies physical relation.' }],
      workedExample: {
        titleEn: `Numerical Problem in ${u.en}`,
        problemEn: `Calculate the physical parameter in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Given Data', content: 'Extract given values and verify SI units.' },
          { label: 'Step 2: Formula', content: 'Write down governing physics equation.' },
          { label: 'Step 3: Answer', content: 'Calculate result with correct SI units.' },
        ],
        answer: 'Verified 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Writing answers without standard SI units.', correction: 'Always attach standard SI units (e.g. Joules, Volts, Amperes, Watts, Hertz).', reason: 'Examiners deduct half a mark for missing units.' },
      quizMCQ: { promptEn: `What is the primary law studied in ${u.en}?`, options: [{ id: 'a', textEn: 'Standard physical law prescribed by KPTBB' }, { id: 'b', textEn: 'Unrelated conjecture' }], correctOptionId: 'a', explanationEn: 'Governing principle in BISE Swat matric physics.' },
      examTips: `Carries ${u.w}% weightage in BISE Swat paper. Optics ray diagrams and Ohm's law circuits are very frequent.`,
    });
  });

  // ==========================================
  // CLASS 10: BIOLOGY (9 Units with Weights & Full Subtopics)
  // ==========================================
  const c10_biology = [
    {
      num: 1, slug: 'gases-exchange', en: 'Chapter 10: Gases Exchange', ur: 'باب 10: گیسوں کا تبادلہ', w: 6, diag: 'respiration', sim: 'breathing_simulator',
      subtopics: [
        {
          subNum: 1, titleEn: '10.1 Gaseous Exchange in Plants', titleUr: '10.1 پودوں میں گیسوں کا تبادلہ', durationMinutes: 14,
          bodyEn: 'Plants lack specialized respiratory organs such as lungs; every cell of the plant body exchanges gases with the environment independently.\n\nLeaves and young herbaceous stems possess microscopic pores called Stomata in their epidermis. Guard cells regulate stomatal opening and closing. In woody stems and mature roots, the outer bark has aeration openings called Lenticels.\n\nDuring daylight hours, mesophyll cells carry out both Photosynthesis and Respiration simultaneously. The CO2 produced during cellular respiration is consumed in photosynthesis. Excess O2 is excreted via stomata. At night, photosynthesis ceases completely; mesophyll cells absorb O2 from air and excrete CO2.',
          bodyUr: 'پودوں میں سانس لینے کے لیے پھیپھڑے نہیں ہوتے۔ پتوں میں سٹوماٹا اور لکڑی والے تنوں میں لینٹیسلز کے ذریعے گیسوں کا تبادلہ ہوتا ہے۔ دن کے وقت فوٹوسنتھیسز اور ریسپائریشن دونوں ہوتے ہیں جبکہ رات کو صرف ریسپائریشن ہوتی ہے۔',
          diagKey: 'respiration',
        },
        {
          subNum: 2, titleEn: '10.2 The Air Passageway in Humans', titleUr: '10.2 انسان کا ہوائی راستہ (Air Passageway)', durationMinutes: 16,
          bodyEn: 'The air passageway conducts atmospheric air to the alveoli. Sequential pathway:\n1. Nostrils & Nasal Cavity: Lined with hair and mucous membrane to filter dust, warm, and moisten incoming air.\n2. Pharynx: Common muscular passage for both food and air.\n3. Larynx (Voice Box): Located above trachea. Contains two pairs of mucous membrane folds (vocal cords). Glottis opening is guarded by the cartilaginous flap Epiglottis to prevent food entering airways.\n4. Trachea (Windpipe): A 12 cm tubular conduit supported by C-shaped cartilaginous rings that prevent airway collapse even when empty.\n5. Bronchi & Bronchioles: Trachea bifurcates into right and left primary bronchi, branching into narrower bronchioles lacking cartilage.',
          bodyUr: 'ہوائی راستے میں ناک کے نتھنے، فیرنکس، لیرنکس (آواز کا خانہ جس پر ایپی گلوٹس ہوتا ہے)، ٹریکیا (جس میں سی شکل کی کرکری ہڈیاں ہوتی ہیں)، برونکائی اور برونکیولز شامل ہیں۔',
          diagKey: 'respiration',
        },
        {
          subNum: 3, titleEn: '10.3 The Alveoli & Respiratory Membrane', titleUr: '10.3 ایلویولائی اور خون کی نالیوں کا جال', durationMinutes: 15,
          bodyEn: 'Each microscopic bronchiole terminates in clusters of tiny air sacs called Alveoli. Human lungs contain over 300 million alveoli with a combined surface area of over 70 square meters.\n\nEach alveolus is formed of a single-cell-thick squamous epithelial layer surrounded by a rich network of pulmonary capillaries. Gaseous exchange occurs rapidly by simple physical diffusion: Oxygen (PO2 = 104 mmHg in alveolus) diffuses across the thin respiratory membrane into capillary blood (PO2 = 40 mmHg), while CO2 (PCO2 = 45 mmHg in blood) diffuses into the alveolar cavity (PCO2 = 40 mmHg).',
          bodyUr: 'ایلویولائی پھیپھڑوں کی فعال اکائیاں ہیں جن کی دیواریں صرف ایک خلیہ موٹی ہوتی ہیں۔ خون اور ہوا کے درمیان آکسیجن اور کاربن ڈائی آکسائیڈ کا تبادلہ ڈیفیوژن کے ذریعے ہوتا ہے۔',
          diagKey: 'respiration',
        },
        {
          subNum: 4, titleEn: '10.4 Mechanism of Breathing (Inhalation & Exhalation)', titleUr: '10.4 سانس لینے کا طریقہ کار (انسپیریشن اور ایکسپائریشن)', durationMinutes: 18,
          bodyEn: 'Breathing (pulmonary ventilation) is a continuous two-phase mechanical process:\n\n1. Inhalation (Inspiration) - Active Process:\n- Diaphragm contracts and flattens downwards.\n- External intercostal muscles contract, elevating ribs upward and outward.\n- Thoracic cavity volume expands.\n- Pressure within the lungs drops below atmospheric pressure (down to 759 mmHg).\n- Outside atmospheric air (760 mmHg) rushes into the lungs.\n\n2. Exhalation (Expiration) - Passive Process:\n- Diaphragm relaxes, returning to its convex dome shape.\n- Intercostal muscles relax, ribs descend downwards and inwards.\n- Thoracic cavity volume decreases.\n- Intrapulmonary pressure rises to 761 mmHg, forcing air out into the atmosphere.',
          bodyUr: 'سانس اندر کھینچتے وقت ڈایافرام نیچے بیٹھ جاتا ہے، پسلیاں اوپر اٹھتی ہیں، اور سینے کا رقبہ بڑھنے سے ہوا پھیپھڑوں میں داخل ہو جاتی ہے۔ سانس باہر نکالتے وقت ڈایافرام گنبد نما ہو جاتا ہے۔',
          simKey: 'breathing_simulator',
        },
        {
          subNum: 5, titleEn: '10.5 Respiratory Disorders', titleUr: '10.5 نظامِ تنفس کی بیماریاں (برونکائٹس، ایمفیسیما، نمونیا)', durationMinutes: 16,
          bodyEn: 'Common respiratory disorders in Pakistan:\n1. Bronchitis: Inflammation of bronchi/bronchioles with excessive mucous secretion and cough. Acute (viral, temporary) vs Chronic (long-term smoking, irreversible).\n2. Emphysema: Destruction of alveolar septa resulting in large air spaces with drastically reduced surface area for gas exchange. Patients experience shortness of breath even at rest.\n3. Pneumonia: Acute infection of lung parenchyma by bacteria Streptococcus pneumoniae or viruses. Alveoli fill with inflammatory exudate and pus.\n4. Asthma: Chronic allergic hypersensitivity of airways causing sudden broncho-constriction, wheezing, and dyspnea.',
          bodyUr: 'اہم امراض میں برونکائٹس (سانس کی نالیوں کی سوزش)، ایمفیسیما (ایلویولائی کی دیواروں کا پھٹ جانا)، اور نمونیا (پھیپھڑوں میں پیپ کا بھر جانا) شامل ہیں۔',
          diagKey: 'respiration',
        },
        {
          subNum: 6, titleEn: '10.6 Bad Effects of Smoking on Human Health', titleUr: '10.6 تمباکو نوشی کے نقصانات اور زہریلے اثرات', durationMinutes: 14,
          bodyEn: 'Tobacco smoke contains over 4,000 distinct chemical compounds, including over 50 proven carcinogens.\n- Nicotine: Highly addictive alkaloid that constricts blood vessels, damages arterial walls, and causes hypertension.\n- Carbon Monoxide (CO): Irreversibly binds to hemoglobin forming carboxyhemoglobin, reducing oxygen-carrying capacity by 15-20%.\n- Tar: Sticky residue that paralyzes tracheal cilia, preventing dust clearance and triggering chronic bronchitis and lung carcinomas.\n- Smoking multiplies risk of cardiovascular disease, tuberculosis, and oral/throat cancers.',
          bodyUr: 'سگریٹ کے دھوئیں میں نکوٹین، کاربن مونو آکسائیڈ اور تار جیسے خطرناک زہر ہوتے ہیں جو خون کی نالیوں کو تنگ کرتے ہیں، پھیپھڑوں کے کینسر کا سبب بنتے ہیں اور دل کی بیماریوں کا خطرہ بڑھاتے ہیں۔',
          diagKey: 'respiration',
        },
      ],
    },
    {
      num: 2, slug: 'homeostasis', en: 'Chapter 11: Homeostasis', ur: 'باب 11: ہومیوسٹیسس (اندرونی توازن)', w: 14, diag: 'respiration', sim: 'nephron_simulator',
      subtopics: [
        {
          subNum: 1, titleEn: '11.1 Concepts & Components of Homeostasis', titleUr: '11.1 ہومیوسٹیسس کا تصور اور اقسام', durationMinutes: 15,
          bodyEn: 'Homeostasis is the biological maintenance of the internal physiological environment within narrow, tolerable limits regardless of fluctuations in the external environment. Three core mechanisms:\n1. Osmoregulation: Maintenance of water and solute concentrations in body fluids.\n2. Thermoregulation: Maintenance of optimal body temperature (37°C in humans) for enzymatic activity.\n3. Excretion: Removal of metabolic waste products, especially toxic nitrogenous wastes (urea, uric acid).',
          bodyUr: 'ہومیوسٹیسس بیرونی تبدیلیوں کے باوجود جسم کے اندرونی ماحول کو متوازن رکھنے کا نام ہے۔ اس میں اوسموریگولیشن، تھرموریگولیشن اور اخراج شامل ہیں۔',
          diagKey: 'respiration',
        },
        {
          subNum: 2, titleEn: '11.2 Osmoregulation in Plants', titleUr: '11.2 پودوں میں اوسموریگولیشن (ہائیڈروفائیٹس، زیروفائیٹس، ہیلوفائیٹس)', durationMinutes: 15,
          bodyEn: 'Plants adapt to varying water availability:\n- Hydrophytes (Water plants, e.g. Hydrilla, Water Lily): Live in abundant freshwater; have broad leaves with stomata on upper epidermis and thin cuticle to maximize transpiration.\n- Xerophytes (Desert plants, e.g. Cactus, Acacia): Live in dry environments; have thick waxy cuticle, sunken stomata, small needle-like leaves, and succulent stems to store water.\n- Halophytes (Salt-tolerant plants): Inhabit salt marshes; actively absorb salts into roots to create negative osmotic potential, absorbing water from saline soil.',
          bodyUr: 'پانی میں رہنے والے پودے (ہائیڈروفائیٹس) اور صحرائی پودے (زیروفائیٹس) اپنے پتوں اور سٹوماٹا کے ذریعے پانی کے ضیاع یا بچاؤ کو کنٹرول کرتے ہیں۔',
          diagKey: 'respiration',
        },
        {
          subNum: 3, titleEn: '11.3 Structure of the Human Urinary System & Kidney', titleUr: '11.3 انسانی گردے اور یورینری سسٹم کی ساخت', durationMinutes: 16,
          bodyEn: 'Human urinary system comprises: 2 Kidneys, 2 Ureters, 1 Urinary Bladder, and 1 Urethra. The kidney is a bean-shaped organ located against the posterior abdominal wall.\n\nInternal Kidney Anatomy:\n- Renal Cortex: Outer dark-red region.\n- Renal Medulla: Inner pale region divided into 8-18 cone-shaped Renal Pyramids.\n- Renal Pelvis: Central funnel-shaped cavity leading to the ureter.',
          bodyUr: 'گردہ بین (لوبیا) کی شکل کا عضو ہے۔ اس کا بیرونی حصہ رینل کورٹیکس، درمیانی حصہ رینل میڈولا (پائرامڈز) اور اندرونی حصہ رینل پیلووس کہلاتا ہے۔',
          simKey: 'nephron_simulator',
        },
        {
          subNum: 4, titleEn: '11.4 Detailed Structure of the Nephron', titleUr: '11.4 نیفرون کی تفصیلی ساخت', durationMinutes: 18,
          bodyEn: 'The Nephron is the microscopic structural and functional unit of the kidney. Each human kidney contains approximately 1.2 million nephrons.\n\nTwo main parts:\n1. Renal Corpuscle: Bowman’s Capsule (cup-like sac) enclosing the Glomerulus (a dense tuft of blood capillaries originating from afferent arteriole).\n2. Renal Tubule: Proximal Convoluted Tubule (PCT), Loop of Henle (descending limb permeable to water and ascending limb permeable to salts), Distal Convoluted Tubule (DCT), and Collecting Duct.',
          bodyUr: 'نیفرون گردے کی بنیادی اکائی ہے۔ اس کے دو حصے ہیں: رینل کارپسکل (گلومیرولس اور بومین کیپسول) اور رینل ٹیوبیول (لوپ آف ہینلے وغیرہ)۔',
          simKey: 'nephron_simulator',
        },
        {
          subNum: 5, titleEn: '11.5 Urine Formation: Three Sequential Steps', titleUr: '11.5 پیشاب بننے کے تین مراحل (الٹرا فلٹریشن، ری ایبزارپشن، سیکریشن)', durationMinutes: 18,
          bodyEn: '1. Ultrafiltration (Pressure Filtration): Blood enters glomerulus under high hydrostatic pressure via afferent arteriole. Water, glucose, salts, amino acids, and urea filter across glomerular wall into Bowman capsule forming glomerular filtrate (blood cells and proteins remain in capillaries).\n2. Selective Reabsorption: As filtrate traverses PCT and loop of Henle, 99% of water, all glucose, and essential ions are actively and passively reabsorbed back into peritubular capillaries.\n3. Tubular Secretion: Epithelial cells secrete additional H+, K+, and drugs into tubule lumen to regulate blood pH (7.35–7.45). Remaining fluid is Urine.',
          bodyUr: 'پیشاب تین مراحل میں بنتا ہے: گلومیرولس میں الٹرا فلٹریشن، ٹیوبیولز میں 99 فیصد پانی اور گلوکوز کا دوبارہ جذب ہونا، اور فاضل مادوں کا سیکریشن۔',
          simKey: 'nephron_simulator',
        },
        {
          subNum: 6, titleEn: '11.6 Osmoregulatory Function & Hormonal Control', titleUr: '11.6 ہارمونل کنٹرول (اینٹی ڈائیوریٹک ہارمون ADH)', durationMinutes: 15,
          bodyEn: 'During water shortage (dehydration, excessive sweating), blood osmotic pressure rises. The hypothalamus stimulates the posterior pituitary gland to release Antidiuretic Hormone (ADH / Vasopressin). ADH increases water permeability of collecting ducts, reabsorbing more water back into blood, producing concentrated hypertonic urine. When water intake is plentiful, ADH release is inhibited, producing abundant dilute urine.',
          bodyUr: 'پانی کی کمی کی صورت میں پیٹیوٹری گلینڈ سے اے ڈی ایچ (ADH) خارج ہوتا ہے جو گردوں سے پانی کو دوبارہ جذب کر کے پیشاب کو گاڑھا بناتا ہے۔',
          simKey: 'nephron_simulator',
        },
        {
          subNum: 7, titleEn: '11.7 Kidney Disorders, Dialysis & Kidney Transplantation', titleUr: '11.7 گردے کی بیماریاں، ڈائلیسس اور ٹرانسپلانٹیشن', durationMinutes: 16,
          bodyEn: '1. Kidney Stones: Hard crystal deposits formed by precipitation of calcium oxalate, calcium phosphate, and uric acid. Treated by extracorporeal shock wave lithotripsy (ESWL).\n2. Renal Failure (Kidney Failure): Complete or partial loss of filtration function caused by long-standing diabetes mellitus or hypertension.\n3. Hemodialysis: Patient’s blood is circulated through an artificial kidney machine containing cellophane semipermeable tubes surrounded by dialyzing fluid.\n4. Kidney Transplantation: Surgical replacement of diseased kidney with a healthy donor kidney matching human leukocyte antigen (HLA) tissue profiles.',
          bodyUr: 'گردے کی پتھری کو لیتھو ٹرپسی سے توڑا جاتا ہے۔ گردے فیل ہونے پر ہیمو ڈائلیسس (مشین کے ذریعے صفائی) یا گردے کی پیوند کاری (ٹرانسپلانٹ) کی جاتی ہے۔',
          diagKey: 'respiration',
        },
      ],
    },
    { num: 3, slug: 'coordination-and-control', en: 'Chapter 12: Coordination and Control', ur: 'باب 12: کوآرڈینیشن اور کنٹرول', w: 16, diag: 'neuron_synapse' },
    { num: 4, slug: 'support-and-movement', en: 'Chapter 13: Support and Movement', ur: 'باب 13: سپورٹ اور حرکت (انسانی ڈھانچہ)', w: 8, diag: 'vector_addition' },
    { num: 5, slug: 'reproduction', en: 'Chapter 14: Reproduction', ur: 'باب 14: ری پروڈکشن (تولید)', w: 14, diag: 'cell_mitosis' },
    { num: 6, slug: 'inheritance', en: 'Chapter 15: Inheritance', ur: 'باب 15: وراثت اور جینیٹکس', w: 10, diag: 'dna' },
    { num: 7, slug: 'man-and-his-environment', en: 'Chapter 16: Man and His Environment', ur: 'باب 16: انسان اور اس کا ماحول', w: 14, diag: 'respiration' },
    { num: 8, slug: 'biotechnology', en: 'Chapter 17: Biotechnology', ur: 'باب 17: بائیو ٹیکنالوجی (انسولین کی تیاری)', w: 10, diag: 'dna' },
    { num: 9, slug: 'pharmacology', en: 'Chapter 18: Pharmacology', ur: 'باب 18: فارماکولوجی (ادویات کا علم)', w: 8, diag: 'chemical_equilibrium' },
  ];

  c10_biology.forEach((u) => {
    add({
      classSlug: 'class-10', classId: 'class_10', className: 'Class 10',
      subjectId: 'sub_bio', subjectName: 'Biology', subjectSlug: 'biology',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim, subtopics: u.subtopics,
      explanationEn: `Deep study of ${u.en} carrying ${u.w}% weightage in BISE Swat matric biology. Anatomical structures, physiological mechanisms, labeled diagrams, and solved past-paper questions.`,
      explanationUr: `${u.ur} کا تفصیلی نصاب، ایناٹومی کے خاکے، اور امتحانی ماک ٹیسٹ۔`,
      keyTerms: [
        { termEn: 'Primary Anatomical Structure', termUr: 'بنیادی ایناٹومی ساخت', definitionEn: `Main biological organ or tissue in ${u.en}.` },
        { termEn: 'Physiological Regulation', termUr: 'افعالی ریگولیشن', definitionEn: 'Control mechanism maintaining homeostatic balance.' },
      ],
      workedExample: {
        titleEn: `Board Exam Short Question: ${u.en}`,
        problemEn: `Explain the physiological mechanism in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Definition', content: 'Define primary anatomical structure or physiological process.' },
          { label: 'Step 2: Sequence', content: 'Explain sequence of physical or biochemical events.' },
          { label: 'Step 3: Organism Benefit', content: 'State physiological importance to human body.' },
        ],
        answer: 'Model 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Writing vague everyday language instead of biological terminology.', correction: 'Always use standard board terms (e.g. Alveoli, Nephron, Synapse, Stomata).', reason: 'Examiners award marks specifically for scientific terms.' },
      quizMCQ: { promptEn: `Which is the essential physiological feature in ${u.en}?`, options: [{ id: 'a', textEn: 'Biological mechanism per KPTBB textbook' }, { id: 'b', textEn: 'Non-living decay' }], correctOptionId: 'a', explanationEn: 'Accurate biological process prescribed in curriculum.' },
      examTips: `Carries ${u.w}% board weightage. Respiratory mechanisms, nephron structure, and reflex arc diagrams are tested repeatedly.`,
    });
  });

  // ==========================================
  // CLASS 10: CHEMISTRY (8 Units with Weights)
  // ==========================================
  const c10_chemistry = [
    {
      num: 1, slug: 'chemical-equilibrium', en: 'Unit 1: Chemical Equilibrium', ur: 'یونٹ 1: کیمیائی توازن (ایکوی لبریم)', w: 10, diag: 'chemical_equilibrium', sim: 'equilibrium_simulator',
      subtopics: [
        {
          subNum: 1, titleEn: '9.1 Reversible Reactions & Dynamic Equilibrium', titleUr: '9.1 ریورسیبل ری ایکشنز اور متحرک توازن', durationMinutes: 15,
          bodyEn: 'In an Irreversible reaction, reactants convert completely into products and the reaction proceeds in one direction only (e.g. combustion). Reversible reactions proceed in both forward and reverse directions simultaneously and never go to completion in a closed system.\n\nDynamic Equilibrium is reached when the rate of the forward reaction equals the rate of the reverse reaction (Rf = Rr). The macroscopic amounts and concentrations of reactants and products remain constant, while microscopic molecular interconversions continue ceaselessly.',
          bodyUr: 'ریورسیبل ری ایکشن میں جب فارورڈ ری ایکشن کی رفتار ریورس ری ایکشن کی رفتار کے برابر ہو جائے تو اسے ڈائنامک ایکوی لبریم کہتے ہیں۔',
          diagKey: 'chemical_equilibrium',
        },
        {
          subNum: 2, titleEn: '9.2 The Law of Mass Action', titleUr: '9.2 لاء آف ماس ایکشن (گولڈ برگ اور واگے)', durationMinutes: 16,
          bodyEn: 'Formulated by Norwegian chemists Cato Guldberg and Peter Waage in 1864: "The rate at which a substance reacts is directly proportional to its active mass, and the rate of a chemical reaction is directly proportional to the product of active masses of the reacting substances." Active mass is molar concentration in moles per cubic decimeter (mol/dm³), denoted by square brackets [ ].',
          bodyUr: 'کسی شے کے تعامل کرنے کی شرح اس کے ایکٹو ماس کے براہ راست متناسب ہوتی ہے۔ ایکٹو ماس سے مراد مول فی ڈیسی میٹر مکعب (mol/dm³) ہے۔',
          diagKey: 'chemical_equilibrium',
        },
        {
          subNum: 3, titleEn: '9.3 Derivation of Equilibrium Constant (Kc)', titleUr: '9.3 ایکوی لبریم کانسٹنٹ (Kc) کا اخذ', durationMinutes: 18,
          bodyEn: 'Consider general reversible reaction: aA + bB ⇌ cC + dD.\n- Rate of forward reaction: Rf = kf [A]^a [B]^b.\n- Rate of reverse reaction: Rr = kr [C]^c [D]^d.\n\nAt dynamic equilibrium, Rf = Rr:\nkf [A]^a [B]^b = kr [C]^c [D]^d.\nDividing rate constants yields Equilibrium Constant:\nKc = kf / kr = ([C]^c [D]^d) / ([A]^a [B]^b).\nKc is the ratio of product concentrations to reactant concentrations raised to powers equal to their stoichiometric coefficients.',
          bodyUr: 'ایکوی لبریم کانسٹنٹ Kc مصنوعات کے ایکٹو ماسز اور ری ایکٹنٹس کے ایکٹو ماسز کے تناسب کے برابر ہوتا ہے۔',
          simKey: 'equilibrium_simulator',
        },
        {
          subNum: 4, titleEn: '9.4 Units of Equilibrium Constant (Kc)', titleUr: '9.4 ایکوی لبریم کانسٹنٹ کے یونٹس', durationMinutes: 15,
          bodyEn: 'Units of Kc depend on the difference between total moles of products and reactants (Δn = moles of products - moles of reactants):\n1. When Δn = 0: H2(g) + I2(g) ⇌ 2HI(g). Δn = 2 - (1+1) = 0. Kc has NO units.\n2. When Δn > 0: PCl5(g) ⇌ PCl3(g) + Cl2(g). Δn = 2 - 1 = 1. Unit = mol/dm³.\n3. When Δn < 0: N2(g) + 3H2(g) ⇌ 2NH3(g). Δn = 2 - 4 = -2. Unit = (mol/dm³)⁻² = dm⁶·mol⁻².',
          bodyUr: 'اگر دونوں طرف مولز کی تعداد برابر ہو تو Kc کا کوئی یونٹ نہیں ہوتا، ورنہ یونٹس کا حساب کیا جاتا ہے۔',
          diagKey: 'chemical_equilibrium',
        },
        {
          subNum: 5, titleEn: '9.5 Predicting Direction & Extent of Reaction', titleUr: '9.5 ری ایکشن کی سمت اور حد کی پیش گوئی', durationMinutes: 16,
          bodyEn: 'By comparing Reaction Quotient Qc with Kc:\n- If Qc < Kc: Reaction proceeds in Forward direction (more products must form).\n- If Qc = Kc: System is in Dynamic Equilibrium.\n- If Qc > Kc: Reaction proceeds in Reverse direction.\n\nExtent of Reaction:\n- Very Large Kc (~10³ or higher): Reaction proceeds almost to completion.\n- Very Small Kc (~10⁻³ or lower): Reactants barely react.\n- Moderate Kc: Comparable amounts of reactants and products exist at equilibrium.',
          bodyUr: 'ری ایکشن کوشنٹ Qc کا Kc سے موازنہ کر کے ہم معلوم کر سکتے ہیں کہ آیا تعامل فارورڈ جائے گا، ریورس یا توازن میں ہے۔',
          diagKey: 'chemical_equilibrium',
        },
        {
          subNum: 6, titleEn: '9.6 Le Chatelier’s Principle & Industrial Applications', titleUr: '9.6 لی شاٹلیئر اصول اور صنعتی اطلاق (ہیبر کا طریقہ)', durationMinutes: 18,
          bodyEn: 'Le Chatelier’s Principle: If an external stress (change in temperature, pressure, or concentration) is applied to a chemical system at equilibrium, the system shifts its position to counteract that stress.\n\nIndustrial Application: Haber Process for Ammonia Synthesis:\nN2(g) + 3H2(g) ⇌ 2NH3(g) + 92.4 kJ (Exothermic)\n- Forward reaction reduces gas volume (4 moles -> 2 moles). Therefore, High Pressure (200 atm) shifts equilibrium forward.\n- Lower temperature favors exothermic direction, but slows rate; hence Optimum Temperature (400–450°C) with Iron (Fe) catalyst is used to produce optimal ammonia yield.',
          bodyUr: 'لی شاٹلیئر کے اصول کے مطابق پریشر بڑھانے پر ری ایکشن کم والیم کی طرف جائے گا۔ ہیبر کے عمل میں 200 ایٹموسفیرک پریشر اور لوہے کا کیٹالسٹ امونیا کی پیداوار بڑھاتا ہے۔',
          simKey: 'equilibrium_simulator',
        },
      ],
    },
    { num: 2, slug: 'acids-bases-and-salts', en: 'Unit 2: Acids, Bases and Salts', ur: 'یونٹ 2: تیزاب، اساس اور نمکیات', w: 10, diag: 'chemical_equilibrium' },
    { num: 3, slug: 'organic-chemistry', en: 'Unit 3: Organic Chemistry', ur: 'یونٹ 3: نامیاتی کیمسٹری (آرگینک کیمسٹری)', w: 16, diag: 'organic_structure' },
    { num: 4, slug: 'hydrocarbons', en: 'Unit 4: Hydrocarbons', ur: 'یونٹ 4: ہائیڈرو کاربنز (الکین، الکین، الکائن)', w: 10, diag: 'organic_structure' },
    { num: 5, slug: 'biochemistry', en: 'Unit 5: Biochemistry', ur: 'یونٹ 5: حیاتیاتی کیمیا (بائیو کیمسٹری)', w: 14, diag: 'dna' },
    { num: 6, slug: 'environmental-chemistry-atmosphere', en: 'Unit 6: Environmental Chemistry I: Atmosphere', ur: 'یونٹ 6: ماحولیاتی کیمسٹری: کرہ ہوائی', w: 12, diag: 'thermodynamics_cycle' },
    { num: 7, slug: 'environmental-chemistry-water', en: 'Unit 7: Environmental Chemistry II: Water', ur: 'یونٹ 7: ماحولیاتی کیمسٹری: پانی اور اس کی سختی', w: 12, diag: 'chemical_equilibrium' },
    { num: 8, slug: 'chemical-industries', en: 'Unit 8: Chemical Industries', ur: 'یونٹ 8: کیمیائی صنعتیں (یوریا، سیمنٹ، سالوے پروسیس)', w: 16, diag: 'chemical_equilibrium' },
  ];

  c10_chemistry.forEach((u) => {
    add({
      classSlug: 'class-10', classId: 'class_10', className: 'Class 10',
      subjectId: 'sub_chem', subjectName: 'Chemistry', subjectSlug: 'chemistry',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim, subtopics: u.subtopics,
      explanationEn: `Rigorous study of ${u.en} with ${u.w}% weightage. Reversible reactions, Le Chatelier principle, functional groups, and chemical industries per BISE Swat specifications.`,
      explanationUr: `${u.ur} کا تفصیلی نصاب۔ کیمیائی صنعتیں، نامیاتی مرکبات اور امتحانی پرچے شامل ہیں۔`,
      keyTerms: [
        { termEn: 'Chemical Concept', termUr: 'کیمیائی تصور', definitionEn: `Central concept in ${u.en}.` },
        { termEn: 'Equilibrium / Functional Group', termUr: 'فنکشنل گروپ / توازن', definitionEn: 'Governing reactive or structural site.' },
      ],
      formulas: [{ labelEn: 'Equilibrium / Reaction Expression', labelUr: 'کیمیائی کلیہ', formula: 'Kc = [Products] / [Reactants]', explanationEn: 'Law of mass action expression.' }],
      workedExample: {
        titleEn: `Model Question in ${u.en}`,
        problemEn: `Explain the industrial / chemical mechanism in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Chemical Equation', content: 'Write down balanced chemical equation.' },
          { label: 'Step 2: Conditions', content: 'State temperature, pressure, and catalyst.' },
          { label: 'Step 3: Industrial Yield', content: 'Explain optimum yield per Le Chatelier principle.' },
        ],
        answer: 'Full 4 Marks BISE Swat Answer',
      },
      commonMistake: { mistake: 'Writing unbalanced chemical equations.', correction: 'Always ensure total atoms of each element on reactant side equal product side.', reason: 'Unbalanced equations lose half the question marks.' },
      quizMCQ: { promptEn: `What is the key principle tested in ${u.en}?`, options: [{ id: 'a', textEn: 'Verified chemical principle in KPTBB' }, { id: 'b', textEn: 'Unsupported hypothesis' }], correctOptionId: 'a', explanationEn: 'Accurate principle in KPTBB syllabus.' },
      examTips: `Carries ${u.w}% weightage. Solvay process, urea manufacturing, and functional group tests are top long questions.`,
    });
  });

  // ==========================================
  // CLASS 10: MATHEMATICS (13 Units with Weights)
  // ==========================================
  const c10_math = [
    {
      num: 1, slug: 'quadratic-equations', en: 'Unit 1: Quadratic Equations', ur: 'یونٹ 1: دو درجی مساواتیں (Quadratic Equations)', w: 10.53, sim: 'quadratic_simulator',
      subtopics: [
        {
          subNum: 1, titleEn: '1.1 Standard Form of Quadratic Equations', titleUr: '1.1 دو درجی مساوات کی معیاری شکل', durationMinutes: 14,
          bodyEn: 'An equation containing the square of an unknown variable quantity, but no higher power, is called a quadratic equation or an equation of second degree. Standard Form: ax² + bx + c = 0, where a, b, c are real numbers and a ≠ 0.\n\nIf b = 0, the equation reduces to ax² + c = 0, which is known as a Pure Quadratic Equation (e.g. x² - 16 = 0). If a = 0, the equation ceases to be quadratic and becomes a linear equation.',
          bodyUr: 'دو درجی مساوات کی معیاری شکل ax² + bx + c = 0 ہے جس میں a صفر کے برابر نہیں ہوتا۔ اگر b = 0 ہو تو اسے خالص دو درجی مساوات کہتے ہیں۔',
          simKey: 'quadratic_simulator',
        },
        {
          subNum: 2, titleEn: '1.2 Solution by Factorization Method', titleUr: '1.2 بذریعہ اجزائے ضربی (فیکٹرائزیشن) حل', durationMinutes: 16,
          bodyEn: 'Factorization method relies on the Zero Product Property: if A · B = 0, then either A = 0 or B = 0 (or both).\n\nProcedure:\n1. Transform equation into standard form ax² + bx + c = 0.\n2. Find two numbers whose product equals a·c and whose sum equals the middle term coefficient b.\n3. Split middle term and group terms to extract common binomial factors (px + q)(rx + s) = 0.\n4. Set each linear factor to zero and solve for roots.',
          bodyUr: 'فیکٹرائزیشن میں درمیانی رقم کو دو حصوں میں تقسیم کر کے مشترک اجزاء بنائے جاتے ہیں اور زیرو پروڈکٹ اصول سے روٹس نکالے جاتے ہیں۔',
          workedExample: {
            titleEn: 'Solve x² - x - 20 = 0 by Factorization',
            problemEn: 'Find the solution set of x² - x - 20 = 0 using factorization.',
            steps: [
              { label: 'Step 1: Find two numbers', content: 'Product = -20, Sum = -1. Numbers are -5 and +4.' },
              { label: 'Step 2: Split middle term', content: 'x² - 5x + 4x - 20 = 0.' },
              { label: 'Step 3: Group terms', content: 'x(x - 5) + 4(x - 5) = (x - 5)(x + 4) = 0.' },
              { label: 'Step 4: Solve roots', content: 'x - 5 = 0 => x = 5; x + 4 = 0 => x = -4.' },
            ],
            answer: 'Solution Set = {-4, 5}',
          },
        },
        {
          subNum: 3, titleEn: '1.3 Solution by Completing the Square Method', titleUr: '1.3 بذریعہ تکمیلِ مربع حل', durationMinutes: 18,
          bodyEn: 'Algorithm for Completing the Square:\n1. Write equation in form ax² + bx = -c.\n2. Divide through by leading coefficient a so coefficient of x² is 1: x² + (b/a)x = -c/a.\n3. Add the square of half the coefficient of x, which is [(b/2a)]², to both sides.\n4. Express left-hand side as perfect square: [x + (b/2a)]² = (b² - 4ac) / 4a².\n5. Take square roots of both sides and isolate x.',
          bodyUr: 'تکمیلِ مربع کے طریقہ کار میں دونوں اطراف میں x کے عددی سر کے نصف کا مربع جمع کیا جاتا ہے تاکہ مکمل مربع بن جائے۔',
          simKey: 'quadratic_simulator',
        },
        {
          subNum: 4, titleEn: '1.4 Derivation & Proof of the Quadratic Formula', titleUr: '1.4 دو درجی کلیہ (Quadratic Formula) کا ثبوت', durationMinutes: 18,
          bodyEn: 'Starting from standard form: ax² + bx + c = 0 (a ≠ 0).\nDivide by a: x² + (b/a)x + c/a = 0.\nSubtract c/a: x² + (b/a)x = -c/a.\nAdd (b/2a)² to both sides:\nx² + 2(b/2a)x + (b/2a)² = (b²/4a²) - c/a.\nLeft side forms a perfect square:\n[x + (b/2a)]² = (b² - 4ac) / (4a²).\nTaking square root on both sides:\nx + (b/2a) = ± √(b² - 4ac) / (2a).\nSubtract b/2a:\nx = (-b ± √(b² - 4ac)) / (2a).\nThis is the universal Quadratic Formula.',
          bodyUr: 'تکمیل مربع کے مراحل کا اطلاق معیاری مساوات پر کر کے دو درجی کلیہ x = (-b ± √(b² - 4ac)) / (2a) اخذ کیا جاتا ہے۔',
          simKey: 'quadratic_simulator',
        },
        {
          subNum: 5, titleEn: '1.5 Equations Reducible to Quadratic Form', titleUr: '1.5 دو درجی شکل میں تبدیل ہونے والی مساواتیں', durationMinutes: 16,
          bodyEn: 'Higher order and non-linear equations can be transformed into quadratic equations via suitable algebraic substitutions:\n1. Type I (Biquadratic): ax⁴ + bx² + c = 0. Substitute y = x² => ay² + by + c = 0.\n2. Type II (Exponential): 5^(1+x) + 5^(1-x) = 26. Substitute y = 5^x.\n3. Type III (Reciprocal): ax² + bx + c + b/x + a/x² = 0. Divide by x and substitute y = x + 1/x.\n4. Type IV (Radical Surd Equations): √(ax + b) = cx + d. Square both sides and test for extraneous roots.',
          bodyUr: 'بائی کواڈریٹک، قوت نمائی اور ریسیپروکل مساواتوں کو متبادل متغیر فرض کر کے دو درجی مساوات میں تبدیل کیا جاتا ہے۔',
          diagKey: 'conic_sections',
        },
      ],
    },
    { num: 2, slug: 'theory-of-quadratic-equations', en: 'Unit 2: Theory of Quadratic Equations', ur: 'یونٹ 2: نظریہ دو درجی مساواتیں (ڈسکریمنٹ)', w: 10.53 },
    { num: 3, slug: 'variations', en: 'Unit 3: Variations', ur: 'یونٹ 3: تغیرات (براہ راست اور معکوس تغیر)', w: 6.32 },
    { num: 4, slug: 'partial-fractions', en: 'Unit 4: Partial Fractions', ur: 'یونٹ 4: جزوی کسریں (Partial Fractions)', w: 5.27 },
    { num: 5, slug: 'sets-and-functions', en: 'Unit 5: Sets and Functions', ur: 'یونٹ 5: سیٹس اور فنکشنز', w: 7.37 },
    { num: 6, slug: 'basic-statistics', en: 'Unit 6: Basic Statistics', ur: 'یونٹ 6: بنیادی شماریات (اوسط، میڈین، موڈ)', w: 6.32 },
    { num: 7, slug: 'introduction-to-trigonometry', en: 'Unit 7: Introduction to Trigonometry', ur: 'یونٹ 7: علمِ مثلثیات کا تعارف (Trigonometry)', w: 10.53 },
    { num: 8, slug: 'projection-of-a-side-of-a-triangle', en: 'Unit 8: Projection of a Side of a Triangle', ur: 'یونٹ 8: مثلث کے ضلع کا پروجیکشن (مسائل)', w: 8.42 },
    { num: 9, slug: 'chords-of-a-circle', en: 'Unit 9: Chords of a Circle', ur: 'یونٹ 9: دائرے کے وتر (Chords)', w: 9.47 },
    { num: 10, slug: 'tangent-to-a-circle', en: 'Unit 10: Tangent to a Circle', ur: 'یونٹ 10: دائرے کا مماس (Tangent)', w: 4.2 },
    { num: 11, slug: 'chords-and-arcs', en: 'Unit 11: Chords and Arcs', ur: 'یونٹ 11: وتر اور قوس (Arcs)', w: 4.2 },
    { num: 12, slug: 'angle-in-a-segment-of-a-circle', en: 'Unit 12: Angle in a Segment of a Circle', ur: 'یونٹ 12: دائرے کے قطعہ میں زاویہ', w: 8.42 },
    { num: 13, slug: 'practical-geometry-circle', en: 'Unit 13: Practical Geometry Circle', ur: 'یونٹ 13: عملی جیومیٹری: دائرہ', w: 8.42 },
  ];

  c10_math.forEach((u) => {
    add({
      classSlug: 'class-10', classId: 'class_10', className: 'Class 10',
      subjectId: 'sub_math', subjectName: 'Mathematics', subjectSlug: 'mathematics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: 'conic_sections', simKey: u.sim, subtopics: u.subtopics,
      explanationEn: `Mathematical study of ${u.en} carrying ${u.w}% weightage in BISE Swat matric mathematics. Quadratic formulas, circle theorems, and trigonometry proofs.`,
      explanationUr: `${u.ur} کا مکمل ریاضیاتی نصاب، دو درجی مساواتیں، دائرے کے مسائل اور حل شدہ امتحانی پرچے۔`,
      keyTerms: [{ termEn: 'Mathematical Formula', termUr: 'ریاضیاتی کلیہ', definitionEn: `Governing algebraic or geometric rule in ${u.en}.` }],
      formulas: [{ labelEn: 'Quadratic / Geometric Formula', labelUr: 'کلیہ', formula: 'x = (-b ± √(b² - 4ac)) / (2a)', explanationEn: 'Standard quadratic formula for roots.' }],
      workedExample: {
        titleEn: `Solved Board Problem: ${u.en}`,
        problemEn: `Solve the problem in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Given Equation', content: 'Write down standard equation.' },
          { label: 'Step 2: Algebraic Operations', content: 'Apply factorization or quadratic formula.' },
          { label: 'Step 3: Solution Set', content: 'Enclose roots in braces { x1, x2 }.' },
        ],
        answer: 'Verified Mathematical Solution',
      },
      commonMistake: { mistake: 'Forgetting ± sign before square root in quadratic formula.', correction: 'Always include ±: x = (-b ± √(b² - 4ac)) / (2a).', reason: 'Omitting ± discards the second valid root of the equation.' },
      quizMCQ: { promptEn: `What is the nature of roots if discriminant b² - 4ac > 0 and a perfect square?`, options: [{ id: 'a', textEn: 'Real, rational, and unequal' }, { id: 'b', textEn: 'Imaginary' }, { id: 'c', textEn: 'Equal' }], correctOptionId: 'a', explanationEn: 'Positive perfect square discriminant gives real and rational roots.' },
      examTips: `Carries ${u.w}% weightage. Circle theorems (Unit 9 & 12) and quadratic equations are compulsory exam questions.`,
    });
  });

  // ==========================================
  // CLASS 10: COMPUTER SCIENCE (7 Units)
  // ==========================================
  const c10_comp = [
    { num: 1, slug: 'programming-technique', en: 'Unit 1: Programming Technique', ur: 'یونٹ 1: پروگرامنگ تکنیک اور الگورتھم', w: 14, diag: 'network_topology' },
    { num: 2, slug: 'programming-in-c', en: 'Unit 2: Programming in C', ur: 'یونٹ 2: سی لینگویج میں پروگرامنگ', w: 15, diag: 'network_topology' },
    { num: 3, slug: 'input-and-output-handling', en: 'Unit 3: Input and Output Handling in C', ur: 'یونٹ 3: ان پٹ اور آؤٹ پٹ فنکشنز', w: 15, diag: 'network_topology' },
    { num: 4, slug: 'control-structure', en: 'Unit 4: Control Structure (If, If-Else, Switch)', ur: 'یونٹ 4: کنٹرول سٹرکچر', w: 15, diag: 'network_topology' },
    { num: 5, slug: 'loop-structure', en: 'Unit 5: Loop Structure (For, While, Do-While)', ur: 'یونٹ 5: لوپ سٹرکچر', w: 15, diag: 'network_topology' },
    { num: 6, slug: 'computer-logic-and-gates', en: 'Unit 6: Computer Logic and Gates', ur: 'یونٹ 6: کمپیوٹر لاجک اور لاجک گیٹس', w: 14, diag: 'circuit_diagram' },
    { num: 7, slug: 'world-wide-web-and-html', en: 'Unit 7: World Wide Web and HTML', ur: 'یونٹ 7: ورلڈ وائڈ ویب اور ایچ ٹی ایم ایل', w: 13, diag: 'network_topology' },
  ];

  c10_comp.forEach((u) => {
    add({
      classSlug: 'class-10', classId: 'class_10', className: 'Class 10',
      subjectId: 'sub_comp', subjectName: 'Computer Science', subjectSlug: 'computer-science',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag,
      explanationEn: `Programming in C and Web development per BISE Swat specifications. Detailed coverage of syntax, loops, logic gates, and HTML markup.`,
      explanationUr: `${u.ur} کا نصاب، سی زبان کی پروگرامنگ، لوپس، لاجک گیٹس اور ویب ڈیزائننگ۔`,
      keyTerms: [
        { termEn: 'Syntax / Logic Gate', termUr: 'سنٹیکس / لاجک گیٹ', definitionEn: `Governing programming rule or circuit in ${u.en}.` },
        { termEn: 'Control Flow', termUr: 'کنٹرول فلو', definitionEn: 'Order in which instructions are executed in a computer program.' },
      ],
      workedExample: {
        titleEn: `C Program Code Snippet: ${u.en}`,
        problemEn: `Write a standard C code snippet for ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Header Files', content: '#include <stdio.h>' },
          { label: 'Step 2: Main Logic', content: 'int main() { /* logic */ return 0; }' },
          { label: 'Step 3: Output', content: 'Prints correct calculated output on screen.' },
        ],
        answer: 'Verified C Code Solution',
      },
      commonMistake: { mistake: 'Forgetting semicolon ; at the end of C statements.', correction: 'Every statement inside main() must terminate with a semicolon.', reason: 'Syntax error that prevents compilation.' },
      quizMCQ: { promptEn: `Which symbol terminates a statement in C language?`, options: [{ id: 'a', textEn: 'Semicolon ;' }, { id: 'b', textEn: 'Colon :' }, { id: 'c', textEn: 'Period .' }], correctOptionId: 'a', explanationEn: 'Statements in C end with a semicolon.' },
      examTips: 'Writing C programs for loops and Truth Tables of NAND/NOR gates are guaranteed board questions.',
    });
  });

  // ==========================================
  // CLASS 10: PAKISTAN STUDIES (4 Units)
  // ==========================================
  const c10_pak = [
    { num: 1, slug: 'history-of-pakistan', en: 'Unit 1: History of Pakistan (1971 to Present)', ur: 'یونٹ 1: تاریخِ پاکستان (1971 سے تا حال)', w: 25 },
    { num: 2, slug: 'pakistan-and-world-affairs', en: 'Unit 2: Pakistan and World Affairs', ur: 'یونٹ 2: پاکستان اور خارجہ امور', w: 25 },
    { num: 3, slug: 'economic-development', en: 'Unit 3: Economic Development of Pakistan', ur: 'یونٹ 3: پاکستان کی معاشی ترقی', w: 25 },
    { num: 4, slug: 'population-society-and-culture', en: 'Unit 4: Population, Society and Culture', ur: 'یونٹ 4: آبادی، معاشرہ اور ثقافت', w: 25 },
  ];

  c10_pak.forEach((u) => {
    add({
      classSlug: 'class-10', classId: 'class_10', className: 'Class 10',
      subjectId: 'sub_pak', subjectName: 'Pakistan Studies', subjectSlug: 'pakistan-studies',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: 'network_topology',
      explanationEn: `Comprehensive Pakistan Studies curriculum for BISE Swat matric. Constitution of 1973, foreign policy, agricultural and industrial growth, and Pakistani culture.`,
      explanationUr: `${u.ur} کا مکمل نصاب۔ 1973 کا آئین، خارجہ پالیسی اور معاشی ترقی۔`,
      keyTerms: [
        { termEn: 'Constitutional / Economic Principle', termUr: 'آئینی و معاشی اصول', definitionEn: `Foundational national concept in ${u.en}.` },
        { termEn: 'Socioeconomic Indicator', termUr: 'معاشرتی اعشاریہ', definitionEn: 'Metric reflecting national development and societal progress.' },
      ],
      workedExample: {
        titleEn: `Model Board Answer: ${u.en}`,
        problemEn: `Explain the key historical / economic features in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Background', content: 'Provide historical context or constitutional provision.' },
          { label: 'Step 2: Key Points', content: 'List 4 key features with headings.' },
          { label: 'Step 3: Impact', content: 'Summarize national impact on Pakistan.' },
        ],
        answer: 'Model 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Writing vague historical dates without official textbook alignment.', correction: 'Always mention exact years and constitutional article numbers.', reason: 'Examiners look for factual accuracy.' },
      quizMCQ: { promptEn: `In which year was the current Constitution of Pakistan enforced?`, options: [{ id: 'a', textEn: '1973' }, { id: 'b', textEn: '1956' }, { id: 'c', textEn: '1962' }], correctOptionId: 'a', explanationEn: 'The 1973 Constitution was passed unanimously on April 10 and enacted on August 14, 1973.' },
      examTips: 'Islamic provisions of 1973 Constitution and Pakistan relations with China/OIC are high-yield questions.',
    });
  });
};
