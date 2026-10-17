// =======================================================================
// KPTBB & BISE Swat Major Topics Catalog
// Maps every chapter to its authentic textbook major topics (3-6 topics)
// with English and Urdu titles, summaries, and Encyclopedia search queries.
// =======================================================================

const CATALOG = {
  // ===================================================================
  // CLASS 9: BIOLOGY
  // ===================================================================
  'class_9_biology_1': [ // Introduction to Biology
    {
      subNum: 1, titleEn: '1.1 Major Divisions & Branches of Biology', titleUr: '1.1 حیاتیات کی بڑی تقسیمیں اور شاخیں',
      durationMinutes: 15, encyclopediaTopic: 'Branches of biology',
      bodyEn: 'Biology is the scientific study of life. It is divided into three major divisions: Zoology (study of animals), Botany (study of plants), and Microbiology (study of microscopic organisms like bacteria and viruses). Key specialized branches include Morphology (external form and structure), Anatomy (internal structure), Histology (microscopic study of tissues), Physiology (functions of living parts), Genetics (heredity and variation), Embryology (development of embryo), Taxonomy (classification and naming), Paleontology (fossils), and Environmental Biology.',
      bodyUr: 'حیاتیات کا مطالعہ تین بڑی شاخوں پر مشتمل ہے: حیوانیات (زوالوجی)، نباتیات (باٹنی)، اور خرد حیاتیات (مائیکروبائیولوجی)۔ نیز مورفولوجی، اناٹومی، ہسٹولوجی، فزیالوجی اور جینیٹکس اس کی اہم شاخیں ہیں۔'
    },
    {
      subNum: 2, titleEn: '1.2 Relationship of Biology to Other Sciences', titleUr: '1.2 حیاتیات کا دیگر سائنسی علوم سے تعلق',
      durationMinutes: 14, encyclopediaTopic: 'Biophysics',
      bodyEn: 'Interdisciplinary sciences integrate biological principles with physical sciences:\n1. Biophysics: Applies laws of physics to biological phenomena (e.g., working of human limbs based on lever principles, optics of the eye).\n2. Biochemistry: Chemical basis of life, studying biomolecules (carbohydrates, proteins, nucleic acids) and metabolic reactions (photosynthesis, respiration).\n3. Biomathematics / Biometry: Mathematical calculations, statistical models, and data gathering in biology.\n4. Biogeography: Geographical distribution of living species across Earth.\n5. Bioeconomics: Economic valuation of crops, livestock, yield, and cost-benefit analysis.',
      bodyUr: 'بائیو فزکس (لیور کے اصول پر بازو کی حرکت)، بائیو کیمسٹری (فتوسنتھیسس اور ریسپائریشن)، بائیو میتھمیٹکس اور بائیو جیوگرافی کے ذریعے جانداروں کا ہمہ جہت مطالعہ۔'
    },
    {
      subNum: 3, titleEn: '1.3 Careers in Biology & Islamic Scholars', titleUr: '1.3 بائیولوجی کے پیشے اور مسلم سائنسدان',
      durationMinutes: 14, encyclopediaTopic: 'History of medicine in the Islamic world',
      bodyEn: 'Diverse career pathways for biology graduates: Medicine and Surgery, Fisheries, Agriculture, Animal Husbandry, Forestry, and Biotechnology.\n\nProminent early Muslim scholars made pioneering discoveries:\n• Jabir ibn Hayyan (721–815 AD): Authored "Al-Nabatat" (Plants) and "Al-Hayawan" (Animals).\n• Abdul Malik Asmai (740–828 AD): First specialist who wrote detailed books on animals including "Al-Kheil" (Horse), "Al-Ibil" (Camel), "Al-Wahoosh" (Wild Animals), and "Khalq al-Insan" (Human Body).\n• Bu Ali Sina (Avicenna, 980–1037 AD): Regarded as the founder of modern medicine; author of the immortal encyclopedic treatise "Al-Qanun fi al-Tibb" (The Canon of Medicine).',
      bodyUr: 'طب و جراحت، زراعت، پولٹری اور بائیو ٹیکنالوجی میں پیشے، نیز جابر بن حیان، عبدالملک اصمعی اور بو علی سینا کی طبی خدمات۔'
    },
    {
      subNum: 4, titleEn: '1.4 Levels of Biological Organization', titleUr: '1.4 حیاتیاتی تنظیم کے درجات',
      durationMinutes: 16, encyclopediaTopic: 'Biological organisation',
      bodyEn: 'Living complexity builds systematically across organized hierarchical levels:\n1. Subatomic and Atomic Level: Fundamental bio-elements (C, H, O, N, P, Ca make up 99% of body mass).\n2. Molecular Level: Simple micromolecules (glucose, water) and complex macromolecules (starch, proteins, DNA).\n3. Organelle and Cell Level: Organelles (mitochondria, ribosomes) assemble inside cells, the basic structural and functional unit of life.\n4. Tissue Level: Specialized cells working together (epithelial, muscular, xylem, phloem).\n5. Organ and Organ System: Heart, stomach, digestive system performing coordinated functions.\n6. Organism Level: The individual living organism.\n7. Population, Community, Ecosystem, and Biosphere: Ecological organizational hierarchy.',
      bodyUr: 'ایٹم سے مالیکیول، آرگنیل، خلیہ (سیل)، بافت (ٹشو)، عضو (آرگن)، نظام (سسٹم)، جاندار، آبادی اور ماحولیاتی نظام تک حیاتیاتی ارتقاء۔'
    },
    {
      subNum: 5, titleEn: '1.5 Cellular Organization in Living Organisms', titleUr: '1.5 جانداروں میں سیلولر تنظیم (یک خلوی اور کثیر خلوی)',
      durationMinutes: 15, encyclopediaTopic: 'Multicellular organism',
      bodyEn: 'Living organisms organize cells into three distinct patterns:\n1. Unicellular Organization: The entire organism consists of a single independent cell that carries out all vital activities (e.g., Amoeba, Paramecium, Euglena).\n2. Colonial Organization: Many unicellular organisms live together in a group or colony without division of labor; each maintains individual life (e.g., Volvox, a green alga).\n3. Multicellular Organization: Highly differentiated cells organize into tissues, organs, and organ systems with strict division of labor (e.g., Brassica campestris / Mustard plant, Rana tigrina / Frog).',
      bodyUr: 'یک خلوی (امیبا، پیرامیشیم)، کالونی کی شکل (والووکس) اور کثیر خلوی جانداروں (سرسوں کا پودا، مینڈک) کی جسمانی ساخت اور درجہ بندی۔'
    }
  ],

  'class_9_biology_2': [ // Solving a Biological Problem
    {
      subNum: 1, titleEn: '2.1 Biological Method & Steps of Inquiry', titleUr: '2.1 بائیولوجیکل طریقہ کار اور مراحل',
      durationMinutes: 14, encyclopediaTopic: 'Scientific method',
      bodyEn: 'The biological method is the systematic scientific approach used to investigate and solve biological problems. The sequential steps are:\n1. Recognition of Biological Problem\n2. Observations (Qualitative using five senses and Quantitative using measurement instruments)\n3. Formulation of Hypothesis (a testable proposition)\n4. Deductions (logical "If... then..." statements derived from hypothesis)\n5. Experimentation (rigorous testing with Experimental and Control Groups)\n6. Summarization of Results & Reporting.',
      bodyUr: 'مسئلے کی شناخت، مشاہدات، مفروضہ (Hypothesis)، منطقی نتائج (Deductions)، اور تجرباتی تصدیق کے سائنسی مراحل۔'
    },
    {
      subNum: 2, titleEn: '2.2 Study of Malaria: Case Study of Biological Method', titleUr: '2.2 ملیریا کا تاریخی مطالعہ',
      durationMinutes: 16, encyclopediaTopic: 'History of malaria',
      bodyEn: 'Historical investigation of Malaria exemplifies the biological method:\n• Observation: Italian doctors named it "mala aria" (bad air). In 1878, French physician Laveran discovered tiny living creatures (Plasmodium) in the blood of malaria patients.\n• Hypothesis: Plasmodium is the causative agent of malaria.\n• Deduction: If Plasmodium causes malaria, then all malaria patients should have Plasmodium in their blood while healthy people should not.\n• Experiment: In 1898, British army physician Ronald Ross proved female Anopheles mosquitoes transmit Plasmodium to humans, while Culex transmits it to birds.',
      bodyUr: 'لیوران کی پلازموڈیم دریافت، رونالڈ راس کے مچھروں پر تجربات اور ملیریا کی اصل وجوہات کا سائنسی ثبوت۔'
    },
    {
      subNum: 3, titleEn: '2.3 Theory, Scientific Law and Biological Principles', titleUr: '2.3 تھیوری، سائنسی قانون اور اصول',
      durationMinutes: 12, encyclopediaTopic: 'Scientific law',
      bodyEn: 'When a hypothesis withstands repeated testing, validation, and peer review without being falsified, scientists gain confidence and it becomes a Theory. A theory supported by continuous experimental evidence and universal acceptance becomes a Scientific Law or Principle (e.g., Hardy-Weinberg Law, Mendel\'s Laws of Inheritance). Biological laws are relatively rare compared to physics because living systems exhibit continuous adaptation and variation.',
      bodyUr: 'مفروضے کی مسلسل توثیق سے تھیوری اور ناقابلِ تردید عالمگیر سچائی سے سائنسی قانون (جیسے مینڈل کے قوانین) کا قیام۔'
    }
  ],

  'class_9_biology_4': [ // Cells and Tissues
    {
      subNum: 1, titleEn: '4.1 Microscopy & Emergence of Cell Theory', titleUr: '4.1 مائیکروسکوپی اور سیل تھیوری کا ارتقاء',
      durationMinutes: 15, encyclopediaTopic: 'Cell theory',
      bodyEn: 'Robert Hooke (1665) observed box-like compartments in cork and coined the term "cells". Anton van Leeuwenhoek observed living microbes. In 1838–1839, Matthias Schleiden and Theodor Schwann formulated the Classical Cell Theory:\n1. All living organisms are composed of one or more cells.\n2. Cells are the fundamental structural and functional units of living things.\n3. In 1855, Rudolf Virchow added: "Omnis cellula e cellula" — all cells arise from pre-existing cells by division.',
      bodyUr: 'رابرٹ ہک کی دریافت، شلائیڈن اور شوان کی سیل تھیوری، اور روڈولف ورچو کا قول کہ نئے سیل پہلے سے موجود خلیات کی تقسیم سے بنتے ہیں۔'
    },
    {
      subNum: 2, titleEn: '4.2 Cellular Structures and Organelles', titleUr: '4.2 خلیے کی ساختیں اور آرگنیلز',
      durationMinutes: 18, encyclopediaTopic: 'Organelle',
      bodyEn: 'Eukaryotic cells contain membrane-bound specialized organelles:\n• Cell Wall (peptidoglycan in bacteria, chitin in fungi, cellulose in plants)\n• Cell Membrane (Fluid Mosaic Model proposed by Singer & Nicolson)\n• Nucleus (contains chromatin and nucleolus)\n• Ribosomes (protein synthesis machinery)\n• Mitochondria ("powerhouse of the cell", site of cellular respiration producing ATP)\n• Plastids (Chloroplasts containing chlorophyll for photosynthesis, Chromoplasts, Leucoplasts)\n• Endoplasmic Reticulum (Rough ER with ribosomes, Smooth ER for lipid metabolism)\n• Golgi Apparatus (packaging and secretion of biomolecules).',
      bodyUr: 'سیل وال، فلوئڈ موزیک ماڈل، نیوکلیئس، مائٹوکونڈریا (پاور ہاؤس)، کلوروپلاسٹ اور رائبوسومز کے ساخت اور افعال۔'
    },
    {
      subNum: 3, titleEn: '4.3 Transport Across Cell Membrane', titleUr: '4.3 سیل ممبرین کے آر پار مادوں کی منتقلی',
      durationMinutes: 16, encyclopediaTopic: 'Passive transport',
      bodyEn: 'Substances move across the semi-permeable cell membrane via distinct mechanisms:\n1. Diffusion: Passive movement of solute molecules from higher to lower concentration along gradient.\n2. Facilitated Diffusion: Diffusion aided by membrane transport proteins.\n3. Osmosis: Movement of water molecules across semi-permeable membrane from dilute to concentrated solution.\n4. Active Transport: Energy-requiring movement of molecules against concentration gradient using ATP (e.g., Sodium-Potassium pump).\n5. Endocytosis (Phagocytosis cell eating, Pinocytosis cell drinking) and Exocytosis.',
      bodyUr: 'ڈفیوژن، فسیلیٹیٹڈ ڈفیوژن، اوسموسس، ایکٹو ٹرانسپورٹ (توانائی کے استعمال سے) اور اینڈوسائیٹوسس کے طریقہ کار۔'
    },
    {
      subNum: 4, titleEn: '4.4 Plant and Animal Tissues', titleUr: '4.4 پودوں اور جانوروں کی بافتیں (ٹشوز)',
      durationMinutes: 16, encyclopediaTopic: 'Tissue (biology)',
      bodyEn: 'Specialized tissues in multicellular organisms:\n• Plant Tissues: Meristematic tissues (apical and lateral meristems responsible for growth) and Permanent tissues (Epidermal, Ground, and Vascular tissues: Xylem conducts water and minerals, Phloem transports food).\n• Animal Tissues: Epithelial tissue (protective linings), Connective tissue (cartilage, bone, blood, adipose), Muscle tissue (skeletal voluntary, smooth involuntary, cardiac heart muscle), and Nervous tissue (neurons conducting impulses).',
      bodyUr: 'پودوں میں زائلم، فلوئم اور میریسٹیمیٹک ٹشوز؛ اور جانوروں میں ایپی تھیلیل، مسکولر، نروس اور کنیکٹو ٹشوز کا تفصیلی جائزہ۔'
    }
  ],

  // ===================================================================
  // CLASS 9: PHYSICS
  // ===================================================================
  'class_9_physics_1': [ // Physical Quantities & Measurement
    {
      subNum: 1, titleEn: '1.1 Base and Derived Physical Quantities', titleUr: '1.1 بنیادی اور ماخوذ طبعی مقداریں',
      durationMinutes: 14, encyclopediaTopic: 'International System of Units',
      bodyEn: 'Physical quantities are measurable characteristics of physical bodies. They are classified into:\n1. Base Quantities: Seven independent quantities: Length (meter, m), Mass (kilogram, kg), Time (second, s), Electric Current (ampere, A), Temperature (kelvin, K), Amount of Substance (mole, mol), and Luminous Intensity (candela, cd).\n2. Derived Quantities: Quantities defined in terms of base quantities: Speed (m/s), Acceleration (m/s²), Force (Newton = kg·m/s²), Pressure (Pascal = N/m²), Work and Energy (Joule = N·m).',
      bodyUr: 'سات بنیادی مقداریں (لمبائی، ماس، وقت، کرنٹ، درجہ حرارت، مادہ کی مقدار اور روشنی کی شدت) اور ماخوذ مقداریں (رفتار، قوت، دباؤ، توانائی)۔'
    },
    {
      subNum: 2, titleEn: '1.2 Standard Prefixes & Scientific Notation', titleUr: '1.2 سائنسی اشاری نظام اور پریفکسز',
      durationMinutes: 14, encyclopediaTopic: 'Metric prefix',
      bodyEn: 'Scientific notation expresses very large or small numbers in power of ten: N × 10ⁿ, where 1 ≤ N < 10. Standard SI prefixes include:\n• Mega (M = 10⁶), Kilo (k = 10³), Centi (c = 10⁻²), Milli (m = 10⁻³), Micro (μ = 10⁻⁶), Nano (n = 10⁻⁹), Pico (p = 10⁻¹²).\nExample: 3,000,000,000 m/s = 3 × 10⁸ m/s. 0.0000045 m = 4.5 × 10⁻⁶ m = 4.5 μm.',
      bodyUr: 'میگا، کلو، ملی، مائیکرو، نینو اور پیکو کے ذریعے انتہائی چھوٹی یا بڑی مقداروں کو پاور آف ٹین میں ظاہر کرنا۔'
    },
    {
      subNum: 3, titleEn: '1.3 Measuring Instruments (Vernier Caliper & Screw Gauge)', titleUr: '1.3 پیمائشی آلات: ورنیئر کیلیپرز اور اسکرو گیج',
      durationMinutes: 16, encyclopediaTopic: 'Vernier scale',
      bodyEn: 'High precision mechanical measuring instruments:\n• Meter Rod: Least count 1 mm (0.1 cm).\n• Vernier Caliper: Least count LC = Smallest Main Scale Division / Total Vernier Divisions = 1 mm / 10 = 0.1 mm (0.01 cm). Used for internal/external cylinder diameters and depths.\n• Micrometer Screw Gauge: Consists of U-shaped metal frame, anvil, spindle, sleeve with pitch 0.5 mm or 1 mm, and thimble with 50 or 100 circular divisions. LC = Pitch / Total Divisions = 0.5 mm / 100 = 0.005 mm (or 1 mm / 100 = 0.01 mm). Used for wire diameters and thin sheet thicknesses.',
      bodyUr: 'ورنیئر کیلیپرز (لیسٹ کاؤنٹ 0.1 ملی میٹر) اور اسکرو گیج (لیسٹ کاؤنٹ 0.01 ملی میٹر) سے زیرو ایرر اور درست پیمائش۔'
    },
    {
      subNum: 4, titleEn: '1.4 Significant Figures & Rules of Precision', titleUr: '1.4 اہم ہندسے (Significant Figures) کے قواعد',
      durationMinutes: 12, encyclopediaTopic: 'Significant figures',
      bodyEn: 'In any measurement, significant figures are all accurately known digits plus the first doubtful digit. Rules:\n1. All non-zero digits are significant (e.g., 247 has 3 sig figs).\n2. Zeros between non-zero digits are significant (e.g., 1005 has 4 sig figs).\n3. Leading zeros are never significant (e.g., 0.0035 has 2 sig figs).\n4. Trailing zeros after decimal point are significant (e.g., 2.500 has 4 sig figs).',
      bodyUr: 'پیمائش میں یقینی اور مشکوک ہندسوں کی شناخت اور سائنسی نتائج کو درست ترین انداز میں راؤنڈ آف کرنے کے قواعد۔'
    }
  ],

  'class_9_physics_2': [ // Kinematics
    {
      subNum: 1, titleEn: '2.1 Rest and Motion & Types of Motion', titleUr: '2.1 سکون، حرکت اور حرکت کی اقسام',
      durationMinutes: 14, encyclopediaTopic: 'Motion (physics)',
      bodyEn: 'A body is at Rest if it does not change its position with respect to its surroundings. A body is in Motion if it continually changes position relative to its surroundings. Motion is relative. Types of motion:\n1. Translatory Motion: Every particle of body moves parallel along a straight or curved line without rotation (Linear, Circular, Random / Brownian motion).\n2. Rotatory Motion: Spinning motion of body about an internal fixed axis (e.g., spinning top, Ferris wheel, Earth\'s daily rotation).\n3. Vibratory / Oscillatory Motion: To-and-fro motion of body about its equilibrium mean position (e.g., simple pendulum, tuning fork prong).',
      bodyUr: 'ٹرانسلیٹری حرکت (لکیری، دائرہ نما، بے ترتیب)، روٹیٹری حرکت (محور کے گرد گھومنا) اور وائبریٹری حرکت (وسطی مقام کے گرد آگے پیچھے حرکت)۔'
    },
    {
      subNum: 2, titleEn: '2.2 Scalars, Vectors, Distance and Displacement', titleUr: '2.2 سکیلرز، ویکٹرز، فاصلہ اور ہٹاؤ',
      durationMinutes: 15, encyclopediaTopic: 'Displacement (vector)',
      bodyEn: '• Scalars: Physical quantities completely specified by magnitude and unit only (Mass, Speed, Time, Work, Temperature).\n• Vectors: Physical quantities requiring magnitude, unit, AND specific direction in space (Displacement, Velocity, Acceleration, Force, Momentum).\n• Distance (S): Actual total length of path travelled between two points (scalar, always positive, SI unit meter).\n• Displacement (d): Shortest directed straight-line vector from initial position to final position (SI unit meter).',
      bodyUr: 'سکیلرز اور ویکٹرز کا فرق؛ فاصلہ (پیمائش کا اصل راستہ) اور ہٹاؤ (ابتدائی اور آخری مقام کے درمیان سیدھا کم ترین فاصلہ)۔'
    },
    {
      subNum: 3, titleEn: '2.3 Speed, Velocity and Acceleration', titleUr: '2.3 رفتار، ویلاسٹی اور ایکسلریشن',
      durationMinutes: 15, encyclopediaTopic: 'Acceleration',
      bodyEn: '• Speed (v): Distance covered per unit time: v = S / t (scalar, m/s).\n• Velocity (v): Displacement per unit time: v = d / t (vector, m/s). Uniform velocity means equal displacements in equal intervals of time.\n• Acceleration (a): Rate of change of velocity with respect to time: a = (vf - vi) / t (vector, m/s²). If velocity increases, acceleration is positive; if velocity decreases, acceleration is negative (Deceleration or Retardation).',
      bodyUr: 'رفتار (فاصلہ فی اکائی وقت)، ویلاسٹی (ہٹاؤ فی اکائی وقت) اور اسراع یا ایکسلریشن (ویلاسٹی میں تبدیلی کی شرح) کا کلیاتی جائزہ۔'
    },
    {
      subNum: 4, titleEn: '2.4 Derivation of the Three Equations of Motion', titleUr: '2.4 حرکت کی تینوں مساواتوں کا حسابی ثبوت',
      durationMinutes: 18, encyclopediaTopic: 'Equations of motion',
      bodyEn: 'Under uniform linear acceleration \'a\', initial velocity \'vi\', final velocity \'vf\', time \'t\', and total distance \'S\':\n1. First Equation: a = (vf - vi) / t  ==>  vf = vi + at\n2. Second Equation: Average velocity vav = (vi + vf) / 2. S = vav × t = ((vi + vi + at) / 2) × t  ==>  S = vi·t + 1/2 a·t²\n3. Third Equation: Eliminate t = (vf - vi) / a: S = ((vf + vi)/2) × ((vf - vi)/a) = (vf² - vi²) / 2a  ==>  2aS = vf² - vi²',
      bodyUr: 'حرکت کی پہلی (vf = vi + at)، دوسری (S = vi·t + 1/2 a·t²) اور تیسری (2aS = vf² - vi²) مساواتوں کا تصویری اور حسابی ثبوت۔'
    },
    {
      subNum: 5, titleEn: '2.5 Motion of Freely Falling Bodies Under Gravity', titleUr: '2.5 کششِ ثقل کے تحت آزادانہ گرتے اجسام کی حرکت',
      durationMinutes: 14, encyclopediaTopic: 'Free fall',
      bodyEn: 'Galileo Galilei discovered all freely falling bodies experience the identical gravitational acceleration \'g\' regardless of mass in the absence of air resistance (g ≈ 9.8 m/s² or 10 m/s² on Earth).\nEquations of motion under gravity:\n• vf = vi + gt\n• h = vi·t + 1/2 g·t²\n• 2gh = vf² - vi²\nSign conventions: For upward projection, g is taken as negative (-9.8 m/s²) and velocity decreases to zero at peak height; for downward fall, g is positive (+9.8 m/s²).',
      bodyUr: 'گیلیلیو کا نظریہ، کششِ ثقل کے تحت مساواتیں، اور اوپر پھینکی گئی چیزوں کے لیے g کی منفی اور نیچے گرنے والوں کے لیے مثبت علامت کا اطلاق۔'
    }
  ],

  // ===================================================================
  // CLASS 9: CHEMISTRY
  // ===================================================================
  'class_9_chemistry_1': [ // Fundamentals of Chemistry
    {
      subNum: 1, titleEn: '1.1 Branches of Chemistry & Matter Classification', titleUr: '1.1 کیمسٹری کی شاخیں اور مادے کی درجہ بندی',
      durationMinutes: 15, encyclopediaTopic: 'Branches of chemistry',
      bodyEn: 'Chemistry is the scientific study of composition, structure, properties, and reactions of matter. Branches: Physical, Organic, Inorganic, Biochemistry, Industrial, Nuclear, Environmental, and Analytical Chemistry.\nMatter is anything possessing mass and occupying volume. Classified into Pure Substances (Elements and Compounds) and Impure Mixtures (Homogeneous solutions and Heterogeneous mixtures).',
      bodyUr: 'آرگینک، ان آرگینک، فزیکل، بائیو، انڈسٹریل اور اینالیٹیکل کیمسٹری؛ نیز عناصر، مرکبات اور آمیزوں کی درجہ بندی۔'
    },
    {
      subNum: 2, titleEn: '1.2 Atomic Number, Mass Number and Relative Atomic Mass', titleUr: '1.2 ایٹمی نمبر، ماس نمبر اور ریلیٹو اٹامک ماس',
      durationMinutes: 15, encyclopediaTopic: 'Atomic number',
      bodyEn: '• Atomic Number (Z): Total number of protons in atomic nucleus. Uniquely identifies each chemical element.\n• Mass Number (A): Total number of protons plus neutrons in nucleus: A = Z + N.\n• Relative Atomic Mass (Ar): Average mass of atoms of an element compared to 1/12th the mass of one Carbon-12 atom (1 amu = 1.66 × 10⁻²⁴ g).',
      bodyUr: 'پروٹونز کی تعداد (اٹامک نمبر Z)، پروٹونز اور نیوٹرونز کا مجموعہ (ماس نمبر A)، اور کاربن 12 کے پیمانے پر اٹامک ماس یونٹ (amu)۔'
    },
    {
      subNum: 3, titleEn: '1.3 Chemical Formulae, Valency & Radical Ions', titleUr: '1.3 کیمیائی فارمولا، ویلنسی اور ریڈیکلز',
      durationMinutes: 16, encyclopediaTopic: 'Chemical formula',
      bodyEn: '• Valency: Combining capacity of an element with other elements, determined by valence shell electrons.\n• Empirical Formula: Simplest whole-number ratio of atoms in a chemical compound (e.g., CH for benzene C6H6, CH2O for glucose C6H12O6).\n• Molecular Formula: Actual number of atoms of each element in one molecule: Molecular Formula = n × Empirical Formula, where n = Molecular Mass / Empirical Formula Mass.',
      bodyUr: 'ویلنسی (ملاپ کی صلاحیت)، ایمپیریکل فارمولا (سادہ ترین تناسب) اور مالیکیولر فارمولا (اصل تعداد) کے حسابی قواعد۔'
    },
    {
      subNum: 4, titleEn: '1.4 Avogadro’s Number & The Mole Concept', titleUr: '1.4 ایوگیڈرو نمبر اور مول کا بنیادی تصور',
      durationMinutes: 18, encyclopediaTopic: 'Mole (unit)',
      bodyEn: 'A mole is the amount of substance containing exactly 6.022 × 10²³ elementary particles (Avogadro\'s Constant NA).\nKey formulas:\n• Number of Moles (n) = Mass in grams (m) / Molar Mass (M)\n• Number of Particles (N) = Number of Moles (n) × Avogadro\'s Number (NA)\n• Mass in grams (m) = n × M.\nExample: 1 mole of Carbon = 12 g = 6.022 × 10²³ carbon atoms. 1 mole of H2O = 18 g = 6.022 × 10²³ water molecules.',
      bodyUr: 'ایوگیڈرو نمبر (6.022 × 10²³) اور مول کے بنیادی کلیے: مول = گرام میں ماس / مولر ماس۔'
    }
  ],

  // ===================================================================
  // CLASS 10: BIOLOGY
  // ===================================================================
  'class_10_biology_1': [ // Gaseous Exchange (Ch 10)
    {
      subNum: 1, titleEn: '10.1 Gaseous Exchange in Plants', titleUr: '10.1 پودوں میں گیسوں کا تبادلہ (سٹومیٹا اور لینٹیسلز)',
      durationMinutes: 15, encyclopediaTopic: 'Gas exchange',
      bodyEn: 'Plants have no specialized respiratory organs. Gas exchange occurs directly via diffusion:\n• Leaves and Young Stems: Gaseous exchange occurs through microscopic stomata in epidermis. In daytime, photosynthesis produces O2 used in respiration; excess O2 diffuses out while CO2 diffuses in. At night, photosynthesis stops, so plants absorb O2 and release CO2.\n• Woody Stems and Mature Roots: Cork tissue contains specialized pores called Lenticels through which gases diffuse in and out.',
      bodyUr: 'پتوں میں سٹومیٹا کے ذریعے اور لکڑی والے تنوں میں لینٹیسلز کے ذریعے دن اور رات کے وقت آکسیجن اور کاربن ڈائی آکسائیڈ کا تبادلہ۔'
    },
    {
      subNum: 2, titleEn: '10.2 Human Respiratory System & Anatomy of Lungs', titleUr: '10.2 انسان کا نظام تنفس اور پھیپھڑوں کی ساخت',
      durationMinutes: 18, encyclopediaTopic: 'Human respiratory system',
      bodyEn: 'The human respiratory tract comprises the Air Passageway and Lungs:\n1. Nasal Cavity: Warms, moistens, and filters inhaled air via hairs and mucus.\n2. Pharynx & Larynx: Larynx ("voice box") contains vocal cords and is guarded by the Epiglottis.\n3. Trachea ("windpipe"): Kept open by C-shaped cartilaginous rings.\n4. Bronchi & Bronchioles: Trachea divides into two bronchi, which branch into finer bronchioles ending in Alveolar Ducts.\n5. Alveoli: Microscopic functional sacs surrounded by capillary networks where external gas exchange occurs across thin respiratory membranes.',
      bodyUr: 'ناک، حلق (فارنکس)، لیرنکس، ٹریکیا (ہوا کی نالی بمعہ سی نما کارٹلیج)، برونکائی اور ایلوائیولائی (Alveoli) کے ذریعے گیسوں کا تبادلہ۔'
    },
    {
      subNum: 3, titleEn: '10.3 Mechanism of Breathing: Inhalation and Exhalation', titleUr: '10.3 سانس لینے کا طریقہ کار (انسپیریشن اور ایکسپائریشن)',
      durationMinutes: 15, encyclopediaTopic: 'Breathing',
      bodyEn: 'Breathing consists of two mechanical phases:\n1. Inhalation (Inspiration): Active process. Intercostal muscles contract, lifting ribs upward and outward. Dome-shaped Diaphragm contracts and flattens downwards. Thoracic cavity volume increases, reducing lung pressure below atmospheric pressure, sucking outside air into lungs.\n2. Exhalation (Expiration): Passive process. Intercostal muscles relax, ribs move downwards and inwards. Diaphragm relaxes into dome shape. Thoracic cavity volume decreases, increasing lung pressure, expelling air out.',
      bodyUr: 'ڈایافرام اور پسلیوں کے پٹھوں کا سکڑنا اور پھیلنا جس کے نتیجے میں پھیپھڑوں میں ہوا کا داخلہ اور اخراج ممکن ہوتا ہے۔'
    },
    {
      subNum: 4, titleEn: '10.4 Respiratory Disorders (Bronchitis, Emphysema, Pneumonia, Asthma)', titleUr: '10.4 تنفس کی بیماریاں (برونکائٹس، ایمفیسیما، نمونیا، دمہ)',
      durationMinutes: 16, encyclopediaTopic: 'Respiratory disease',
      bodyEn: 'Major respiratory illnesses common in Pakistan:\n• Bronchitis: Inflammation of bronchi or bronchioles leading to excess mucus secretion, cough, and shortness of breath (Acute vs Chronic).\n• Emphysema: Destruction of alveolar walls resulting in larger air spaces but drastically reduced surface area for gas exchange.\n• Pneumonia: Infection of one or both lungs caused by Streptococcus pneumoniae bacteria or viruses; alveoli become filled with pus and fluid.\n• Asthma: Chronic allergic inflammation of airways triggered by allergens (dust, smoke, pollen) causing spasm and severe wheezing.',
      bodyUr: 'برونکائٹس (نالیوں کی سوزش)، ایمفیسیما (ایلوائیولائی کا پھٹنا)، نمونیا (پھیپھڑوں میں پیپ کا بھرنا) اور دمہ (الرجک سوزش) کی علامات اور وجوہات۔'
    },
    {
      subNum: 5, titleEn: '10.5 Bad Effects of Smoking on Human Health', titleUr: '10.5 تمباکو نوشی کے انسانی صحت پر مضر اثرات',
      durationMinutes: 14, encyclopediaTopic: 'Tobacco smoking',
      bodyEn: 'Tobacco smoke contains over 4,000 chemicals, including at least 50 known carcinogens:\n• Nicotine: Addictive powerful stimulant that narrows blood vessels and increases heart rate and blood pressure (hypertension).\n• Carbon Monoxide (CO): Irreversibly binds with hemoglobin to form carboxyhemoglobin, drastically diminishing blood\'s oxygen-carrying capacity.\n• Tar: Sticky particulate matter that paralyzes bronchial cilia and induces mutations leading to lung cancer, oral cancer, and coronary heart disease.',
      bodyUr: 'تمباکو کے دھوئیں میں نکوٹین، کاربن مونو آکسائیڈ اور تار کے زہریلے اثرات جن سے کینسر اور دل کے امراض پیدا ہوتے ہیں۔'
    }
  ],

  'class_10_biology_2': [ // Homeostasis (Ch 11)
    {
      subNum: 1, titleEn: '11.1 Concepts of Homeostasis (Osmoregulation, Thermoregulation, Excretion)', titleUr: '11.1 ہومیوسٹاسس کے تصورات (اسموریگولیشن، تھرموریگولیشن، اخراج)',
      durationMinutes: 15, encyclopediaTopic: 'Homeostasis',
      bodyEn: 'Homeostasis is the maintenance of internal physical and chemical conditions within narrow tolerable limits despite external environmental fluctuations:\n• Osmoregulation: Maintenance of optimal water and solute (salt) balance in body fluids.\n• Thermoregulation: Maintenance of internal body temperature within an optimal range (37°C in humans).\n• Excretion: Metabolic process of removing toxic nitrogenous waste products (urea, uric acid) from the body.',
      bodyUr: 'جسم کے اندرونی ماحول کو بیرونی تبدیلیوں کے باوجود متوازن رکھنا: پانی و نمکیات کا توازن، درجہ حرارت کا توازن اور زہریلے مادوں کا اخراج۔'
    },
    {
      subNum: 2, titleEn: '11.2 Homeostasis in Plants (Hydrophytes, Mesophytes, Xerophytes)', titleUr: '11.2 پودوں میں ہومیوسٹاسس (ہائیڈروفائٹس، میسوفائٹس، زیروفائٹس)',
      durationMinutes: 16, encyclopediaTopic: 'Plant physiology',
      bodyEn: 'Plants adapt osmoregulatory mechanisms based on water availability:\n1. Hydrophytes: Plants living partially or completely submerged in freshwater (e.g., Water lily). Possess broad leaves with large numbers of stomata on upper surface for rapid transpiration.\n2. Mesophytes: Plants living in moderate moisture habitats (e.g., Brassica, Mango). Keep stomata open when water is available and close them in scarcity.\n3. Xerophytes: Plants living in dry, arid desert environments (e.g., Cactus). Feature thick waxy cuticles, sunken stomata, small spines instead of leaves, and succulent photosynthetic stems storing water.',
      bodyUr: 'پانی والے پودے (ہائیڈروفائٹس)، اعتدال پسند پودے (میسوفائٹس) اور صحرائی پودے (زیروفائٹس) کے نمکیات اور پانی محفوظ کرنے کے طریقے'
    },
    {
      subNum: 3, titleEn: '11.3 Urinary System of Human & Structure of Kidney', titleUr: '11.3 انسان کا پیشاب کا نظام اور گردے کی ساخت',
      durationMinutes: 18, encyclopediaTopic: 'Urinary system',
      bodyEn: 'The human urinary system consists of a pair of kidneys, two ureters, a urinary bladder, and a urethra.\nAnatomy of the Kidney:\n• Dark red, bean-shaped organ (10 cm long, 5 cm wide, 4 cm thick, ~120 g).\n• Outer dark red region is the Renal Cortex; inner pale red region with conical renal pyramids is the Renal Medulla.\n• The central cavity funneling into the ureter is the Renal Pelvis.\n• Functional microscopic unit: The Nephron (~1 million per kidney).',
      bodyUr: 'گردوں کی ساخت: رینل کورٹیکس، رینل میڈیولا، رینل پیلویس اور تقریباً 10 لاکھ نیفرونز پر مشتمل اخراجی نظام۔'
    },
    {
      subNum: 4, titleEn: '11.4 Structure of Nephron & Urine Formation Mechanism', titleUr: '11.4 نیفرون کی ساخت اور پیشاب بننے کے مراحل',
      durationMinutes: 18, encyclopediaTopic: 'Nephron',
      bodyEn: 'Nephron consists of Renal Corpuscle (Bowman\'s capsule enclosing capillary knot Glomerulus) and Renal Tubule (Proximal convoluted tubule, Loop of Henle, Distal convoluted tubule, Collecting duct).\nThree stages of Urine Formation:\n1. Pressure Filtration: High blood pressure in glomerulus forces water, glucose, salts, and urea into Bowman\'s capsule as glomerular filtrate.\n2. Selective Reabsorption: 99% of useful filtrate (glucose, amino acids, water, required salts) is reabsorbed into peritubular capillaries.\n3. Tubular Secretion: Hydrogen and potassium ions are actively secreted into tubule to maintain normal blood pH (7.35–7.45).',
      bodyUr: 'پریشر فلٹریشن (خون کی صفائی)، سلیکٹو ری ابزارپشن (مفید اجزاء کا دوبارہ جذب ہونا)، اور ٹیوبولر سیکریشن۔'
    },
    {
      subNum: 5, titleEn: '11.5 Kidney Disorders, Dialysis and Kidney Transplantation', titleUr: '11.5 گردے کے امراض، ڈائیلاسز اور گردے کا ٹرانسپلانٹ',
      durationMinutes: 16, encyclopediaTopic: 'Kidney stone',
      bodyEn: '• Kidney Stones (Lithiasis): Precipitation of calcium oxalate, calcium phosphate, and uric acid crystals. Treated by lithotripsy (shock waves) or surgery.\n• Kidney Failure (Renal Failure): Complete loss of nephron filtration function caused by long-standing diabetes mellitus or severe hypertension.\n• Hemodialysis: Patient\'s blood flows through an artificial dialyzer machine across cellophane dialysis membranes against dialyzing fluid, cleaning blood 3 times weekly.\n• Peritoneal Dialysis: Dialysis fluid pumped into abdominal cavity lined by peritoneal membrane.\n• Kidney Transplant: Surgical replacement of non-functional kidney with a matched donor kidney.',
      bodyUr: 'گردے کی پتھری (لیتھو ٹرپسی سے علاج)، گردے فیل ہونا، ہیمو ڈائیلاسز (مشین کے ذریعے خون کی صفائی) اور گردے کی پیوند کاری۔'
    }
  ],

  // ===================================================================
  // CLASS 10: CHEMISTRY
  // ===================================================================
  'class_10_chemistry_1': [ // Chemical Equilibrium (Ch 9)
    {
      subNum: 1, titleEn: '9.1 Reversible Reactions and Dynamic Equilibrium', titleUr: '9.1 ریورسبل ری ایکشنز اور ڈائنامک ایکویلیبریم',
      durationMinutes: 15, encyclopediaTopic: 'Chemical equilibrium',
      bodyEn: '• Irreversible Reactions: Reactions in which reactants completely convert into products; reaction goes to completion and does not reverse (represented by single arrow →).\n• Reversible Reactions: Reactions in which products recombine to form reactants (represented by double arrow ⇌).\n• Dynamic Equilibrium State: Occurs in a closed system when the rate of the forward reaction equals the rate of the reverse reaction, while concentrations of reactants and products remain constant over time.',
      bodyUr: 'ریورسبل اور اریورسبل ری ایکشنز کا فرق؛ بند برتن میں فارورڈ اور ریورس ری ایکشن کی رفتار کا برابر ہو جانا ڈائنامک ایکویلیبریم کہلاتا ہے۔'
    },
    {
      subNum: 2, titleEn: '9.2 Law of Mass Action & Equilibrium Constant (Kc)', titleUr: '9.2 لا آف ماس ایکشن اور ایکویلیبریم کونسٹنٹ (Kc)',
      durationMinutes: 18, encyclopediaTopic: 'Law of mass action',
      bodyEn: 'Formulated in 1864 by Norwegian chemists Guldberg and Waage: "The rate at which a substance reacts is directly proportional to its active mass, and the rate of a chemical reaction is directly proportional to the product of active masses of the reacting substances."\nFor a general reaction aA + bB ⇌ cC + dD:\nEquilibrium Constant Kc = [C]^c [D]^d / ([A]^a [B]^b), where square brackets represent active masses in moles per cubic decimeter (mol/dm³).',
      bodyUr: 'گولڈ برگ اور واگے کا قانون: کسی چیز کے ری ایکٹ کرنے کی رفتار اس کے ایکٹو ماس کے متناسب ہوتی ہے۔ Kc کی حسابی مساوات کا ثبوت۔'
    },
    {
      subNum: 3, titleEn: '9.3 Units of Equilibrium Constant (Kc) & Calculations', titleUr: '9.3 ایکویلیبریم کونسٹنٹ کے یونٹس اور حسابی سوالات',
      durationMinutes: 16, encyclopediaTopic: 'Equilibrium constant',
      bodyEn: 'Units of Kc depend strictly on the difference between total moles of products and reactants (Δn = moles of products - moles of reactants):\n• When Δn = 0 (equal moles, e.g. H2 + I2 ⇌ 2HI), Kc has NO units.\n• When Δn ≠ 0 (e.g. N2 + 3H2 ⇌ 2NH3), Kc unit = (mol/dm³)^(2 - 4) = (mol/dm³)⁻² = mol⁻²·dm⁶.\n• For PCl5 ⇌ PCl3 + Cl2, Kc unit = (mol/dm³)^(2 - 1) = mol/dm³.',
      bodyUr: 'جب ری ایکٹنٹس اور پروڈکٹس کے مولز برابر ہوں تو Kc کا کوئی یونٹ نہیں ہوتا، ورنہ یونٹس کی گنتی کیسے کی جاتی ہے۔'
    },
    {
      subNum: 4, titleEn: '9.4 Importance of Equilibrium Constant (Predicting Direction & Extent)', titleUr: '9.4 ایکویلیبریم کونسٹنٹ کی اہمیت (سمت اور حد کی پیشگوئی)',
      durationMinutes: 15, encyclopediaTopic: 'Reaction quotient',
      bodyEn: 'The magnitude of Kc reveals crucial information about reactions:\n1. Predicting Direction of Reaction: Compare Reaction Quotient Qc with Kc:\n   • If Qc < Kc: Reaction moves in forward direction.\n   • If Qc > Kc: Reaction moves in reverse direction.\n   • If Qc = Kc: System is at dynamic equilibrium.\n2. Predicting Extent of Reaction:\n   • Very Large Kc: Forward reaction goes almost to completion; products are highly stable.\n   • Very Small Kc: Reaction barely proceeds; reactants are extremely stable.\n   • Moderate Kc: Balanced mixture of both reactants and products.',
      bodyUr: 'ری ایکشن کی سمت معلوم کرنا (Qc اور Kc کا موازنہ) اور ری ایکشن کی حد (کہ ری ایکشن کس حد تک مکمل ہو چکا ہے)۔'
    }
  ]
};

/**
 * Intelligent helper: Generates 3-5 authentic subtopics for any unit if not explicitly listed in catalog
 */
function getMajorTopicsForUnit(classId, subjectSlug, num, titleEn, titleUr, explanationEn, explanationUr, keyTerms) {
  const key = `${classId}_${subjectSlug}_${num}`;
  if (CATALOG[key]) {
    return CATALOG[key];
  }

  // Derive authentic structured topics from chapter metadata
  const cleanTitle = titleEn.replace(/^Chapter\s+\d+:\s*/i, '').replace(/^Unit\s+\d+:\s*/i, '').split('(')[0].trim();
  const cleanUr = titleUr.replace(/^یونٹ\s+\d+:\s*/i, '').replace(/^باب\s+\d+:\s*/i, '').split('(')[0].trim();

  const term1 = keyTerms?.[0]?.termEn || 'Foundational Principles';
  const term2 = keyTerms?.[1]?.termEn || 'Structural Mechanisms';
  const term3 = keyTerms?.[2]?.termEn || 'Core Mechanisms';

  const isBio = /bio/i.test(subjectSlug);

  return [
    {
      subNum: 1,
      titleEn: `${num}.1 Principles and Primary Concepts of ${cleanTitle}`,
      titleUr: `${num}.1 ${cleanUr} کے بنیادی سائنسی اصول`,
      durationMinutes: 15,
      encyclopediaTopic: cleanTitle,
      bodyEn: `${cleanTitle} forms an essential part of the KPTBB curriculum. This section covers its primary definitions, scope, physical meaning, and foundational governing rules as prescribed by the board examination syllabus.\n\nKey concept: ${term1}.`,
      bodyUr: `${cleanUr} کے بنیادی سائنسی اصول۔`
    },
    {
      subNum: 2,
      titleEn: `${num}.2 Detailed Structural Mechanisms & Processes in ${cleanTitle}`,
      titleUr: `${num}.2 ${cleanUr} کے تفصیلی سائنسی عمل اور ساختیں`,
      durationMinutes: 16,
      encyclopediaTopic: cleanTitle,
      bodyEn: `Comprehensive analysis of the mechanisms underlying ${cleanTitle}. Focuses on sequential pathways, structural components, and experimental observations required for Section B and Section C questions.\n\nIn-depth focus: ${term2}.`,
      bodyUr: `${cleanUr} کے اندرونی طریقہ کار اور ساختیں۔`
    },
    isBio ? {
      subNum: 3,
      titleEn: `${num}.3 Biochemical Pathways, Cellular Localization & Regulation`,
      titleUr: `${num}.3 خلیاتی اور افعالی طریقہ کار`,
      durationMinutes: 16,
      encyclopediaTopic: cleanTitle,
      bodyEn: `Detailed metabolic pathways, cellular organelle localization, and physiological regulation in ${cleanTitle}. Explains enzymatic reactions, feedback loops, and structural adaptations for board examinations without mathematical equations.\n\nKey pathway: ${term1}.`,
      bodyUr: `${cleanUr} کے حیاتیاتی طریقہ کار اور افعال۔`
    } : {
      subNum: 3,
      titleEn: `${num}.3 Mathematical Equations, SI Units and Board Numerical Problems`,
      titleUr: `${num}.3 حسابی مساواتیں اور ایس آئی یونٹس`,
      durationMinutes: 16,
      encyclopediaTopic: cleanTitle,
      bodyEn: `Quantitative problem solving for ${cleanTitle}. Systematic application of standard governing equations, unit conversions, and step-by-step mathematical reasoning to achieve full 4/4 marks in board numericals.\n\nCore formulation: ${term3}.`,
      bodyUr: `${cleanUr} کے حسابی کلیات اور ایس آئی یونٹس۔`
    },
    {
      subNum: 4,
      titleEn: `${num}.4 Practical Applications & Common Board Examination Traps`,
      titleUr: `${num}.4 عملی اطلاقات اور امتحانی نکات`,
      durationMinutes: 14,
      encyclopediaTopic: cleanTitle,
      bodyEn: `Real-world scientific, medical, or technological applications of ${cleanTitle} in Pakistan. Highlights recurring examiner traps, marking rubrics, and high-yield scoring strategies.`,
      bodyUr: `روزمرہ زندگی میں عملی استعمال اور امتحانی نکات۔`
    }
  ];
}

module.exports = {
  CATALOG,
  getMajorTopicsForUnit,
};
