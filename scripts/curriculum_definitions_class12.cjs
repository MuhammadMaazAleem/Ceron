module.exports = function (add) {
  // ==========================================
  // CLASS 12: PHYSICS (10 Units with Weights)
  // ==========================================
  const c12_physics = [
    { num: 1, slug: 'electrostatics', en: 'Unit 1: Electrostatics', ur: 'یونٹ 1: الیکٹرو سٹیٹکس اور گاس کا قانون', w: 12, diag: 'electric_field' },
    { num: 2, slug: 'current-electricity', en: 'Unit 2: Current Electricity', ur: 'یونٹ 2: کرنٹ الیکٹرسٹی اور کرخوف کے قوانین', w: 10, diag: 'circuit_diagram', sim: 'circuit_simulator' },
    { num: 3, slug: 'electromagnetism', en: 'Unit 3: Electromagnetism', ur: 'یونٹ 3: الیکٹرو میگنیٹزم اور ایمپیئر کا قانون', w: 10, diag: 'circuit_diagram' },
    { num: 4, slug: 'electromagnetic-induction', en: 'Unit 4: Electromagnetic Induction', ur: 'یونٹ 4: برقی مقناطیسی امالہ (فیراڈے اور لینز کے قوانین)', w: 12, diag: 'circuit_diagram' },
    { num: 5, slug: 'alternating-current', en: 'Unit 5: Alternating Current (AC Circuits)', ur: 'یونٹ 5: الٹرنیٹنگ کرنٹ (اے سی سرکٹس اور ریزوننس)', w: 10, diag: 'circuit_diagram' },
    { num: 6, slug: 'physics-of-solids', en: 'Unit 6: Physics of Solids', ur: 'یونٹ 6: سالڈز کی فزکس اور انرجی بینڈ تھیوری', w: 7, diag: 'circuit_diagram' },
    { num: 7, slug: 'electronics', en: 'Unit 7: Electronics and Operational Amplifiers', ur: 'یونٹ 7: الیکٹرانکس اور ٹرانزسٹرز', w: 7, diag: 'circuit_diagram' },
    { num: 8, slug: 'dawn-of-modern-physics', en: 'Unit 8: Dawn of Modern Physics', ur: 'یونٹ 8: جدید فزکس کا آغاز (فوٹو الیکٹرک اثر اور اضافیت)', w: 10, diag: 'bohr_atom' },
    { num: 9, slug: 'atomic-spectra', en: 'Unit 9: Atomic Spectra', ur: 'یونٹ 9: ایٹمی سپیکٹرا اور بوہر ماڈل', w: 10, diag: 'bohr_atom' },
    { num: 10, slug: 'nuclear-physics', en: 'Unit 10: Nuclear Physics', ur: 'یونٹ 10: نیوکلیئر فزکس اور ایٹمی ری ایکٹرز', w: 12, diag: 'bohr_atom' },
  ];

  c12_physics.forEach((u) => {
    add({
      classSlug: 'class-12', classId: 'class_12', className: 'Class 12',
      subjectId: 'sub_physics', subjectName: 'Physics', subjectSlug: 'physics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim,
      explanationEn: `Advanced FSc Part 2 Physics of ${u.en} carrying ${u.w}% weightage in BISE Swat board examination. Gauss's law, AC series RLC resonance, Einstein's photoelectric effect, and mass defect/binding energy.`,
      explanationUr: `${u.ur} کا ایف ایس سی پارٹ 2 کا مکمل نصاب۔ برقی فیلڈز، جدید فزکس، کوانٹم مظاہر اور ایٹمی ماڈلز۔`,
      keyTerms: [
        { termEn: 'Physical Law / Constant', termUr: 'طبعی کلیہ / مستقل', definitionEn: `Foundational law in ${u.en}.` },
        { termEn: 'Quantum / Field Quantity', termUr: 'کوانٹم / فیلڈ مقدار', definitionEn: 'Relativistic or electromagnetic physical quantity.' },
      ],
      formulas: [{ labelEn: 'Governing Physics Law', labelUr: 'کلیہ', formula: 'Key equation in KPTBB Class 12 Physics', explanationEn: 'Specifies physical relationship.' }],
      workedExample: {
        titleEn: `FSc Part 2 Numerical: ${u.en}`,
        problemEn: `Calculate the physical parameter in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Formula', content: 'State standard governing physics formula.' },
          { label: 'Step 2: Substitution', content: 'Substitute values with SI units.' },
          { label: 'Step 3: Result', content: 'Calculate result with proper units.' },
        ],
        answer: 'Verified 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Confusing threshold frequency (f0) with incident light frequency (f).', correction: 'Photoelectric emission occurs ONLY when f ≥ f0, regardless of light intensity.', reason: 'Examiners rigorously check photoelectric effect concepts.' },
      quizMCQ: { promptEn: `According to Einstein's mass-energy equivalence, what is energy E?`, options: [{ id: 'a', textEn: 'E = mc²' }, { id: 'b', textEn: 'E = m/c²' }, { id: 'c', textEn: 'E = 1/2 mc²' }], correctOptionId: 'a', explanationEn: 'Special theory of relativity establishes E = mc².' },
      examTips: `Carries ${u.w}% board weightage. Gauss's law applications, Wheatstone bridge, and nuclear reactor fission are top long questions.`,
    });
  });

  // ==========================================
  // CLASS 12: CHEMISTRY (12 Units with Weights)
  // ==========================================
  const c12_chemistry = [
    { num: 1, slug: 's-and-p-block-elements', en: 'Unit 1: S and P Block Elements', ur: 'یونٹ 1: ایس اور پی بلاک ایلیمنٹس (رجحانات اور مرکبات)', w: 22, diag: 'periodic_trends' },
    { num: 2, slug: 'd-and-f-block-elements', en: 'Unit 2: D and F Block Elements', ur: 'یونٹ 2: ڈی اور ایف بلاک ایلیمنٹس (ٹرانزیشن میٹلز)', w: 6, diag: 'periodic_trends' },
    { num: 3, slug: 'organic-compounds', en: 'Unit 3: Organic Compounds', ur: 'یونٹ 3: نامیاتی مرکبات (ہومو لوگس سیریز اور آئسومیرزم)', w: 3, diag: 'organic_structure' },
    { num: 4, slug: 'hydrocarbons', en: 'Unit 4: Hydrocarbons', ur: 'یونٹ 4: ہائیڈرو کاربنز (بینزین اور الیکٹروفیلک سبسٹٹیوشن)', w: 12, diag: 'organic_structure' },
    { num: 5, slug: 'alkyl-halides-and-amines', en: 'Unit 5: Alkyl Halides and Amines', ur: 'یونٹ 5: الکائل ہیلائیڈز اور امائنز (SN1 اور SN2 ری ایکشنز)', w: 8, diag: 'organic_structure' },
    { num: 6, slug: 'alcohols-phenols-and-ethers', en: 'Unit 6: Alcohols, Phenols and Ethers', ur: 'یونٹ 6: الکوحل، فینول اور ایتھرز', w: 9, diag: 'organic_structure' },
    { num: 7, slug: 'aldehydes-and-ketones', en: 'Unit 7: Carbonyl Compounds I: Aldehydes and Ketones', ur: 'یونٹ 7: ایلڈیہائیڈز اور کیٹونز (نیوکلیوفیلک ایڈیشن)', w: 4, diag: 'organic_structure' },
    { num: 8, slug: 'carboxylic-acids', en: 'Unit 8: Carbonyl Compounds II: Carboxylic Acids', ur: 'یونٹ 8: کاربوکسیلک ایسڈز اور ان کے ڈیریویٹیوز', w: 6, diag: 'organic_structure' },
    { num: 9, slug: 'biochemistry', en: 'Unit 9: Biochemistry', ur: 'یونٹ 9: بائیو کیمسٹری (پروٹینز اور ڈی این اے)', w: 6, diag: 'dna' },
    { num: 10, slug: 'industrial-chemistry', en: 'Unit 10: Industrial Chemistry', ur: 'یونٹ 10: صنعتی کیمسٹری (فرٹیلائزرز، سیمنٹ، گلاس)', w: 6, diag: 'chemical_equilibrium' },
    { num: 11, slug: 'environmental-chemistry', en: 'Unit 11: Environmental Chemistry', ur: 'یونٹ 11: ماحولیاتی کیمسٹری (آلودگی اور علاج)', w: 6, diag: 'thermodynamics_cycle' },
    { num: 12, slug: 'analytical-chemistry', en: 'Unit 12: Analytical Chemistry', ur: 'یونٹ 12: اینالیٹیکل کیمسٹری (سپیکٹروسکوپی اور کرومیٹوگرافی)', w: 12, diag: 'chemical_equilibrium' },
  ];

  c12_chemistry.forEach((u) => {
    add({
      classSlug: 'class-12', classId: 'class_12', className: 'Class 12',
      subjectId: 'sub_chem', subjectName: 'Chemistry', subjectSlug: 'chemistry',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag,
      explanationEn: `Advanced Organic and Inorganic Chemistry of ${u.en} carrying ${u.w}% weightage in BISE Swat board examination. Detailed reaction mechanisms (SN1, SN2, Electrophilic Aromatic Substitution), spectroscopic analysis, and industrial processes.`,
      explanationUr: `${u.ur} کا ایف ایس سی کیمسٹری پارٹ 2 کا مکمل نصاب۔ نامیاتی ری ایکشن میکانزم، بینزین کی ساخت اور امتحانی پرچے۔`,
      keyTerms: [
        { termEn: 'Reaction Mechanism', termUr: 'کیمیائی میکانزم', definitionEn: `Step-by-step pathway of electron movement in ${u.en}.` },
        { termEn: 'Spectroscopic / Structural Property', termUr: 'سپیکٹروسکوپک خصوصیت', definitionEn: 'Analytical fingerprint identifying chemical structure.' },
      ],
      formulas: [{ labelEn: 'Chemical Reaction / Law', labelUr: 'کیمیائی کلیہ', formula: 'Key chemical reaction equation in KPTBB Grade XII', explanationEn: 'Standard governing reaction.' }],
      workedExample: {
        titleEn: `Organic Reaction Mechanism: ${u.en}`,
        problemEn: `Write the step-by-step reaction mechanism for ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Generation of Electrophile/Nucleophile', content: 'Show reagent activation with balanced equation.' },
          { label: 'Step 2: Attack on Substrate', content: 'Show formation of intermediate carbocation / transition state.' },
          { label: 'Step 3: Deprotonation / Product Formation', content: 'Show regeneration of catalyst and final product.' },
        ],
        answer: 'Model 4-Mark Board Mechanism',
      },
      commonMistake: { mistake: 'Writing single-headed arrows instead of double-headed curved arrows for electron pair movement.', correction: 'Curved arrows must always start from the electron pair (lone pair or bond) and point directly to the electrophilic atom.', reason: 'Arrow conventions are strictly penalized if drawn incorrectly.' },
      quizMCQ: { promptEn: `How many delocalized π electrons are present in the benzene ring?`, options: [{ id: 'a', textEn: '6 electrons' }, { id: 'b', textEn: '3 electrons' }, { id: 'c', textEn: '12 electrons' }], correctOptionId: 'a', explanationEn: 'Benzene possesses 6 delocalized π electrons satisfying Huckel’s rule (4n + 2 for n = 1).' },
      examTips: `Carries ${u.w}% board weightage. S and P Block Elements (Unit 1, 22% weightage) and Benzene mechanisms (Unit 4, 12% weightage) are highest priority.`,
    });
  });

  // ==========================================
  // CLASS 12: BIOLOGY (14 Chapters with Specific Curricula)
  // ==========================================
  const c12_bio = [
    {
      num: 1, slug: 'respiration', en: 'Chapter 1: Respiration', ur: 'باب 1: ریسپائریشن', w: 8, diag: 'respiration',
      desc: 'Aerobic and anaerobic cellular respiration, glycolysis, Krebs cycle, electron transport chain, and pulmonary gas exchange across alveoli.',
      key1: 'Glycolysis & Oxidative Phosphorylation', key2: 'Alveolar Respiratory Membrane',
      mistake: 'Confusing external respiration (pulmonary ventilation) with cellular respiration (mitochondrial ATP generation).',
      fix: 'External respiration is physical gas exchange in lungs; cellular respiration is the biochemical breakdown of glucose yielding ATP.',
      why: 'Mixing physical gas exchange with biochemical phosphorylation causes mark loss.'
    },
    {
      num: 2, slug: 'homeostasis', en: 'Chapter 2: Homeostasis', ur: 'باب 2: ہومیوسٹیسس', w: 8, diag: 'respiration',
      desc: 'Osmoregulation, excretion, anatomy of the human urinary system, nephron physiology, countercurrent multiplier mechanism, and thermoregulation.',
      key1: 'Nephron Countercurrent Multiplier', key2: 'Osmoregulation & Aldosterone / ADH',
      mistake: 'Stating that ADH decreases urine concentration.',
      fix: 'ADH increases water reabsorption in collecting ducts, making urine more concentrated and hypertonic.',
      why: 'ADH conserves body water during dehydration.'
    },
    {
      num: 3, slug: 'support-and-movements', en: 'Chapter 3: Support and Movements', ur: 'باب 3: سہارا اور حرکت', w: 8, diag: 'vector_addition',
      desc: 'Human skeletal system, bone histology, cartilage types, joints classification, sliding filament model of muscle contraction, and sarcomere ultrastructure.',
      key1: 'Sliding Filament Model & Sarcomere', key2: 'Calcium-Troponin-Tropomyosin Complex',
      mistake: 'Confusing actin and myosin filaments in sarcomere contraction.',
      fix: 'Thin actin filaments slide inward over thick myosin filaments during cross-bridge power strokes, shortening the sarcomere.',
      why: 'Myosin heads bind actin active sites exposed when Ca2+ binds troponin.'
    },
    {
      num: 4, slug: 'nervous-coordination', en: 'Chapter 4: Nervous Coordination', ur: 'باب 4: اعصابی رابطہ', w: 8, diag: 'neuron_synapse',
      desc: 'Neuron anatomy, resting membrane potential (-70 mV), action potential depolarisation, voltage-gated ion channels, synaptic transmission, and human brain reflex arcs.',
      key1: 'Resting & Action Membrane Potential', key2: 'Synaptic Vesicles & Acetylcholine',
      mistake: 'Writing that the inside of an axon is positively charged at rest.',
      fix: 'At rest, the interior of the neuron is negative (-70 mV) relative to the exterior due to 3 Na+ pumped out for every 2 K+ pumped in.',
      why: 'The Na+/K+ ATPase electrogenic pump creates a polarized resting state.'
    },
    {
      num: 5, slug: 'chemical-coordination', en: 'Chapter 5: Chemical Coordination', ur: 'باب 5: کیمیائی رابطہ', w: 8, diag: 'chemical_equilibrium',
      desc: 'Endocrine glands, pituitary trophic hormones, thyroid feedback loops, adrenal cortex and medulla, pancreatic islets (insulin and glucagon), and hormone receptor mechanisms.',
      key1: 'Pituitary-Hypothalamic Axis', key2: 'Negative Feedback Regulation',
      mistake: 'Confusing endocrine glands with exocrine glands.',
      fix: 'Endocrine glands are ductless and secrete hormones directly into the bloodstream; exocrine glands secrete via ducts.',
      why: 'Ductless delivery enables widespread systemic hormonal communication.'
    },
    {
      num: 6, slug: 'behaviour', en: 'Chapter 6: Behaviour', ur: 'باب 6: رویہ', w: 6, diag: 'neuron_synapse',
      desc: 'Innate behaviours (kinesis, taxis, simple reflexes, fixed action patterns, instincts) contrasted with learned behaviours (habituation, imprinting, classical and operant conditioning).',
      key1: 'Innate vs Learned Behaviour', key2: 'Classical Conditioning & Habituation',
      mistake: 'Confusing kinesis with taxis.',
      fix: 'Kinesis is non-directional movement where speed changes with intensity; taxis is directional orientation toward or away from a stimulus.',
      why: 'Directionality is the defining scientific distinction.'
    },
    {
      num: 7, slug: 'reproduction', en: 'Chapter 7: Reproduction', ur: 'باب 7: تولید', w: 8, diag: 'cell_mitosis',
      desc: 'Human male and female reproductive anatomy, spermatogenesis, oogenesis, hormonal control of ovarian and menstrual cycles (FSH, LH, estrogen, progesterone), and embryogenesis.',
      key1: 'Spermatogenesis vs Oogenesis', key2: 'FSH/LH Menstrual Cycle Regulation',
      mistake: 'Stating that oogenesis produces four functional ova.',
      fix: 'Oogenesis produces only one functional ovum and three non-functional polar bodies.',
      why: 'Unequal cytokinesis conserves cytoplasm and nutrient reserves for the developing embryo.'
    },
    {
      num: 8, slug: 'development-and-ageing', en: 'Chapter 8: Development and Ageing', ur: 'باب 8: نشوونما اور بڑھاپا', w: 7, diag: 'cell_mitosis',
      desc: 'Embryonic development of chick and human, cleavage stages, morula, blastula, gastrulation, embryonic induction by Spemann organizer, and cellular ageing theories.',
      key1: 'Gastrulation & Germ Layers', key2: 'Embryonic Induction & Spemann Organizer',
      mistake: 'Confusing ectoderm, mesoderm, and endoderm organ derivations.',
      fix: 'Ectoderm forms skin and nervous system; mesoderm forms muscle, bone, and heart; endoderm forms gut and lungs.',
      why: 'Triploblastic tissue lineage is heavily tested in Section B.'
    },
    {
      num: 9, slug: 'inheritance', en: 'Chapter 9: Inheritance', ur: 'باب 9: وراثت اور جینیٹکس', w: 8, diag: 'dna',
      desc: 'Mendelian genetics, law of segregation, law of independent assortment, test crosses, incomplete dominance, codominance (ABO blood groups), multiple alleles, and sex-linked inheritance.',
      key1: 'Mendel’s Laws of Segregation & Assortment', key2: 'Codominance & Sex-Linked Traits',
      mistake: 'Confusing phenotype with genotype in monohybrid crosses.',
      fix: 'Genotype is the genetic allele combination (e.g. 1 TT : 2 Tt : 1 tt); phenotype is observable physical appearance (3 Tall : 1 Dwarf).',
      why: 'Board examiners deduct marks if ratio types are mixed.'
    },
    {
      num: 10, slug: 'chromosomes-and-dna', en: 'Chapter 10: Chromosomes and DNA', ur: 'باب 10: کروموسومز اور ڈی این اے', w: 9, diag: 'dna',
      desc: 'Structure of chromosomes, nucleosomes, Hershey-Chase experiment, Watson-Crick DNA double helix model, semi-conservative DNA replication, transcription, and translation.',
      key1: 'Semi-Conservative DNA Replication', key2: 'Central Dogma: Transcription & Translation',
      mistake: 'Pairing Adenine with Cytosine in nucleic acid synthesis.',
      fix: 'Adenine pairs with Thymine via 2 hydrogen bonds (A=T); Guanine pairs with Cytosine via 3 hydrogen bonds (G≡C). In RNA, Uracil replaces Thymine.',
      why: 'Complementary base pairing is fundamental to replication fidelity.'
    },
    {
      num: 11, slug: 'evolution', en: 'Chapter 11: Evolution', ur: 'باب 11: ارتقاء', w: 6, diag: 'dna',
      desc: 'Theories of evolution, Lamarckian inheritance of acquired characteristics vs Darwinian natural selection, paleontological fossil evidence, homologous vs analogous organs, and Hardy-Weinberg law.',
      key1: 'Darwinian Natural Selection', key2: 'Homologous vs Analogous Structures',
      mistake: 'Confusing homologous organs with analogous organs.',
      fix: 'Homologous structures share common embryonic origin and anatomy (human arm, bat wing); analogous organs share function but differ in origin (bird wing, insect wing).',
      why: 'Divergent vs convergent evolution depends on structural origin.'
    },
    {
      num: 12, slug: 'man-and-his-environment', en: 'Chapter 12: Man and His Environment', ur: 'باب 12: انسان اور ماحول', w: 6, diag: 'respiration',
      desc: 'Ecosystem dynamics, abiotic and biotic factors, food chains and food webs, ecological pyramids of numbers, biomass, and energy, nitrogen cycle, ecological succession, and conservation.',
      key1: 'Ecological Energy Pyramids', key2: 'Biogeochemical Nitrogen & Carbon Cycles',
      mistake: 'Drawing an inverted pyramid of energy.',
      fix: 'Pyramid of energy is ALWAYS upright because energy is lost as heat at each trophic transfer (10% law).',
      why: 'Thermodynamics dictates irreversible energy loss across trophic levels.'
    },
    {
      num: 13, slug: 'biotechnology', en: 'Chapter 13: Biotechnology', ur: 'باب 13: بائیو ٹیکنالوجی', w: 8, diag: 'dna',
      desc: 'Recombinant DNA technology, restriction endonucleases (molecular scissors), DNA ligase, cloning vectors (plasmids), Polymerase Chain Reaction (PCR), and Sanger DNA sequencing.',
      key1: 'Recombinant DNA & Gene Cloning', key2: 'PCR Amplification & Gel Electrophoresis',
      mistake: 'Confusing PCR stages: denaturation, annealing, and extension.',
      fix: 'Denaturation occurs at 94°C (strands separate); Annealing at 54°C (primers bind); Extension at 72°C (Taq polymerase synthesizes new DNA).',
      why: 'Temperature sequencing is required for full 4 marks.'
    },
    {
      num: 14, slug: 'biology-and-human-welfare', en: 'Chapter 14: Biology and Human Welfare', ur: 'باب 14: بائیولوجی اور انسانی فلاح', w: 8, diag: 'dna',
      desc: 'Role of biotechnology in human welfare, plant tissue culture, micropropagation, transgenic crops, monoclonal antibodies, gene therapy for genetic disorders, and biological pest control.',
      key1: 'Plant Tissue Culture & Totipotency', key2: 'Gene Therapy & Transgenic Organisms',
      mistake: 'Confusing somatic gene therapy with germline gene therapy.',
      fix: 'Somatic gene therapy alters body cells and is not inheritable; germline gene therapy modifies gametes and is passed to future generations.',
      why: 'Heritability distinction is an essential examiner test point.'
    },
  ];

  c12_bio.forEach((u) => {
    add({
      classSlug: 'class-12', classId: 'class_12', className: 'Class 12',
      subjectId: 'sub_bio', subjectName: 'Biology', subjectSlug: 'biology',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag,
      explanationEn: u.desc,
      explanationUr: `${u.ur} کا تفصیلی نصاب۔`,
      keyTerms: [
        { termEn: u.key1, termUr: u.key1, definitionEn: `Primary biological mechanism in ${u.en}.` },
        { termEn: u.key2, termUr: u.key2, definitionEn: `Key physiological regulator in ${u.en}.` },
      ],
      workedExample: {
        titleEn: `FSc Pre-Medical Model Question: ${u.en}`,
        problemEn: `Explain the physiological mechanism of ${u.key1} in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Scientific Definition', content: `Define ${u.key1} precisely according to KPTBB textbook.` },
          { label: 'Step 2: Molecular Pathways', content: 'Detail sequential stages with relevant enzymes, tissues, and organelles.' },
          { label: 'Step 3: Biological Significance', content: 'Explain clinical, cellular, or genetic importance.' },
        ],
        answer: 'Model 4-Mark FSc Pre-Medical Solution',
      },
      commonMistake: {
        mistake: u.mistake,
        correction: u.fix,
        reason: u.why,
      },
      quizMCQ: {
        promptEn: `What is the primary function of ${u.key1} in living systems?`,
        options: [
          { id: 'a', textEn: 'Regulates physiological and cellular mechanisms essential for homeostasis' },
          { id: 'b', textEn: 'Causes passive osmotic swelling without cellular control' },
          { id: 'c', textEn: 'Inhibits all mitochondrial enzymatic reactions' },
        ],
        correctOptionId: 'a',
        explanationEn: `${u.key1} is a fundamental physiological mechanism in ${u.en}.`,
      },
      examTips: `Focus on labeled diagrams and sequential pathways. Questions on ${u.key1} frequently appear in Section B (4 marks) and Section C (7 marks).`,
    });
  });

  // ==========================================
  // CLASS 12: MATHEMATICS (12 Units with Weights)
  // ==========================================
  const c12_math = [
    { num: 1, slug: 'intro-to-maple', en: 'Unit 1: Introduction to Symbolic Package: Maple', ur: 'یونٹ 1: میپل (Maple) پیکج کا تعارف', w: 2 },
    { num: 2, slug: 'functions-and-limits', en: 'Unit 2: Function and Limits', ur: 'یونٹ 2: تفاعل اور حدود (فنکشنز اور لمٹس)', w: 11 },
    { num: 3, slug: 'differentiation', en: 'Unit 3: Differentiation', ur: 'یونٹ 3: تفریق (ڈفرینشیشن اور اب انیشیو طریقہ)', w: 11 },
    { num: 4, slug: 'higher-order-derivatives', en: 'Unit 4: Higher Order Derivatives and Applications', ur: 'یونٹ 4: اعلی درجے کے مشتقات اور اطلاقات', w: 4 },
    { num: 5, slug: 'vector-functions-differentiation', en: 'Unit 5: Differentiation of Vector Functions', ur: 'یونٹ 5: ویکٹر تفاعل کی تفریق', w: 4 },
    { num: 6, slug: 'integration', en: 'Unit 6: Integration', ur: 'یونٹ 6: تکامل (انٹیگریشن اور اس کے طریقے)', w: 18 },
    { num: 7, slug: 'plane-analytic-geometry-straight-line', en: 'Unit 7: Plane Analytic Geometry: Straight Line', ur: 'یونٹ 7: مستوی اینالیٹک جیومیٹری: خطِ مستقیم', w: 13 },
    { num: 8, slug: 'conics-1', en: 'Unit 8: Conics I (Circles)', ur: 'یونٹ 8: مخروطی تراشے 1 (دائرہ اور مماس)', w: 5 },
    { num: 9, slug: 'conics-2', en: 'Unit 9: Conics II (Parabola, Ellipse, Hyperbola)', ur: 'یونٹ 9: مخروطی تراشے 2 (پیرابولا، بیضہ، ہائپربولا)', w: 12 },
    { num: 10, slug: 'differential-equations', en: 'Unit 10: Differential Equations', ur: 'یونٹ 10: تفریقی مساواتیں (ڈفرینشل ایکویشنز)', w: 8 },
    { num: 11, slug: 'partial-differentiation', en: 'Unit 11: Partial Differentiation', ur: 'یونٹ 11: جزوی تفریق (پارشل ڈفرینشیشن)', w: 4 },
    { num: 12, slug: 'numerical-methods', en: 'Unit 12: Introduction to Numerical Methods', ur: 'یونٹ 12: عددی طریقے (نیوٹن رافسن اور سمپسن رول)', w: 10 },
  ];

  c12_math.forEach((u) => {
    add({
      classSlug: 'class-12', classId: 'class_12', className: 'Class 12',
      subjectId: 'sub_math', subjectName: 'Mathematics', subjectSlug: 'mathematics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: 'conic_sections',
      explanationEn: `Calculus and Analytic Geometry of ${u.en} carrying ${u.w}% weightage in BISE Swat board examination. Differentiation, Integration by parts, Conic sections, and Differential equations per KPTBB Grade XII.`,
      explanationUr: `${u.ur} کا ایف ایس سی ریاضی کا مکمل نصاب۔ کیلکولس، انٹیگریشن، خطِ مستقیم اور کونک سیکشنز۔`,
      keyTerms: [{ termEn: 'Calculus Law / Formula', termUr: 'کیلکولس کا کلیہ', definitionEn: `Formal calculus rule in ${u.en}.` }],
      formulas: [{ labelEn: 'Governing Calculus Formula', labelUr: 'کلیہ', formula: 'd/dx [f(x)] or ∫ f(x) dx identity in KPTBB', explanationEn: 'Calculus operation rule.' }],
      workedExample: {
        titleEn: `Calculus Solved Problem: ${u.en}`,
        problemEn: `Evaluate the mathematical problem in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: State Formula', content: 'Apply standard differentiation or integration rule.' },
          { label: 'Step 2: Mathematical Steps', content: 'Carry out algebraic and calculus manipulations.' },
          { label: 'Step 3: Solution', content: 'State evaluated derivative, integral (+ C), or conic equation.' },
        ],
        answer: 'Verified Mathematical Solution',
      },
      commonMistake: { mistake: 'Forgetting constant of integration (+ C) in indefinite integrals.', correction: 'Always add + C for every indefinite integral: ∫ f(x) dx = F(x) + C.', reason: 'Examiners deduct 1 mark on every question with missing + C.' },
      quizMCQ: { promptEn: `What is the derivative of sin(x) with respect to x?`, options: [{ id: 'a', textEn: 'cos(x)' }, { id: 'b', textEn: '-cos(x)' }, { id: 'c', textEn: 'tan(x)' }], correctOptionId: 'a', explanationEn: 'Standard calculus identity: d/dx [sin(x)] = cos(x).' },
      examTips: `Carries ${u.w}% weightage. Integration (Unit 6, 18% weightage) and Straight line (Unit 7, 13% weightage) form the bulk of the BISE Swat Math paper.`,
    });
  });

  // ==========================================
  // CLASS 12: PAKISTAN STUDIES (11 Units)
  // ==========================================
  const c12_pak = [
    { num: 1, slug: 'genesis-of-islamic-republic', en: 'Unit 1: Genesis of Islamic Republic of Pakistan', ur: 'یونٹ 1: نظریہ پاکستان اور قیامِ پاکستان', w: 10 },
    { num: 2, slug: 'initial-problems-of-pakistan', en: 'Unit 2: Initial Problems of Pakistan', ur: 'یونٹ 2: قیامِ پاکستان کے بعد کے ابتدائی مسائل', w: 10 },
    { num: 3, slug: 'land-of-pakistan', en: 'Unit 3: Land of Pakistan (Geography and Climate)', ur: 'یونٹ 3: جغرافیائی محلِ وقوع اور خطے', w: 10 },
    { num: 4, slug: 'steps-towards-islamic-republic', en: 'Unit 4: Steps towards an Islamic Republic of Pakistan', ur: 'یونٹ 4: اسلامی ریاست کے قیام کی کوششیں', w: 10 },
    { num: 5, slug: 'administrative-structure', en: 'Unit 5: Administrative Structure and Good Governance', ur: 'یونٹ 5: حکومتی ڈھانچہ اور گڈ گورننس', w: 10 },
    { num: 6, slug: 'culture-of-pakistan', en: 'Unit 6: Culture of Pakistan', ur: 'یونٹ 6: پاکستانی ثقافت اور روایات', w: 8 },
    { num: 7, slug: 'languages-of-pakistan', en: 'Unit 7: Languages of Pakistan', ur: 'یونٹ 7: پاکستان کی زبانیں (اردو، پشتو، وغیرہ)', w: 8 },
    { num: 8, slug: 'national-integration', en: 'Unit 8: National Integration and Prosperity', ur: 'یونٹ 8: قومی یکجہتی اور خوشحالی', w: 8 },
    { num: 9, slug: 'economic-planning', en: 'Unit 9: Economic Planning and Development', ur: 'یونٹ 9: معاشی منصوبہ بندی اور سی پیک (CPEC)', w: 10 },
    { num: 10, slug: 'foreign-policy', en: 'Unit 10: Foreign Policy of Pakistan', ur: 'یونٹ 10: پاکستان کی خارجہ پالیسی اور بین الاقوامی تعلقات', w: 10 },
    { num: 11, slug: 'problems-of-pakistan', en: 'Unit 11: Problems of Pakistan and Their Solutions', ur: 'یونٹ 11: پاکستان کے اہم مسائل اور حل کی تجاویز', w: 6 },
  ];

  c12_pak.forEach((u) => {
    add({
      classSlug: 'class-12', classId: 'class_12', className: 'Class 12',
      subjectId: 'sub_pak', subjectName: 'Pakistan Studies', subjectSlug: 'pakistan-studies',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: 'network_topology',
      explanationEn: `FSc Pakistan Studies curriculum covering ${u.en} for BISE Swat. Strategic geography of Pakistan, Indus water treaty, CPEC economic corridor, foreign policy, and administrative governance.`,
      explanationUr: `${u.ur} کا مکمل ایف ایس سی نصاب۔ جغرافیائی محل وقوع، خارجہ تعلقات اور قومی ترقی۔`,
      keyTerms: [
        { termEn: 'Strategic / National Concept', termUr: 'قومی و تزویراتی تصور', definitionEn: `Foundational principle in ${u.en}.` },
        { termEn: 'Socioeconomic Pillar', termUr: 'معاشی و معاشرتی ستون', definitionEn: 'Essential framework supporting national development.' },
      ],
      workedExample: {
        titleEn: `FSc Model Question: ${u.en}`,
        problemEn: `Explain the key historical / strategic points in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Historical Context', content: 'State the origin or constitutional significance.' },
          { label: 'Step 2: Strategic Pillars', content: 'Present 4 clear points with proper headings.' },
          { label: 'Step 3: National Significance', content: 'Conclude with current strategic impact on Pakistan.' },
        ],
        answer: 'Model 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Writing general essays without distinct subheadings.', correction: 'Always structure board answers with clear, underlined headings.', reason: 'Examiners reward well-organized answers with headings and bullet points.' },
      quizMCQ: { promptEn: `What is the primary objective of Pakistan’s foreign policy?`, options: [{ id: 'a', textEn: 'National sovereignty and peaceful coexistence' }, { id: 'b', textEn: 'Aggressive expansion' }, { id: 'c', textEn: 'Complete isolation' }], correctOptionId: 'a', explanationEn: 'Pakistan foreign policy is founded on sovereignty, territorial integrity, and peaceful coexistence.' },
      examTips: 'Strategic importance of Pakistan geography and foreign policy relations with China and Muslim countries are frequent long questions.',
    });
  });
};
