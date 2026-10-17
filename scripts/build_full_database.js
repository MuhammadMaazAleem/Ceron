const fs = require('fs');
const path = require('path');

const units = [
  // ==========================================
  // CLASS 10 BIOLOGY (KPTBB / BISE Swat)
  // ==========================================
  {
    id: 'unit_10_bio_10',
    subjectId: 'sub_bio',
    classId: 'class_10',
    unitNumber: 10,
    titleEn: 'Chapter 10: Gaseous Exchange',
    titleUr: 'باب 10: گیسوں کا تبادلہ',
    kptbbChapter: 10,
    quizId: 'quiz_10_bio_10',
    lessons: [
      {
        id: 'lsn_10_bio_10_1',
        unitId: 'unit_10_bio_10',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'Gaseous Exchange in Plants & Humans',
        titleUr: 'پودوں اور انسانوں میں گیسوں کا تبادلہ',
        kptbbChapterRef: 'KPTBB Class 10 Biology, Chapter 10, Page 2',
        durationMinutes: 15,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'How Organisms Exchange Gases',
              titleUr: 'جاندار گیسوں کا تبادلہ کیسے کرتے ہیں؟',
              bodyEn: 'Gaseous exchange involves taking in oxygen (needed for cellular respiration) and expelling carbon dioxide. In plants, this occurs primarily through Stomata in leaves and Lenticels in woody stems. In humans, the air passageway leads from nostrils to the pharynx, larynx, trachea, bronchi, bronchioles, and microscopic Alveoli where diffusion into blood capillaries occurs.',
              bodyUr: 'گیسوں کے تبادلے کا مطلب خلیاتی تنفس کے لیے آکسیجن حاصل کرنا اور کاربن ڈائی آکسائیڈ کا اخراج ہے۔ پودوں میں یہ عمل پتوں کے سٹوماٹا (Stomata) اور لکڑی والے تنوں کے لینٹیسلز کے ذریعے ہوتا ہے۔ انسانوں میں ہوا ناک سے گزر کر ٹریکیا، برونکائی اور ایلویولائی (Alveoli) تک جاتی ہے جہاں خون کے ساتھ گیسوں کا تبادلہ ہوتا ہے۔',
              kptbbRef: 'KPTBB Class 10 Biology, Chapter 10',
            },
          },
          {
            id: 'b2',
            type: 'flashcard',
            order: 2,
            data: {
              titleEn: 'Key Terms: Gaseous Exchange',
              titleUr: 'اہم اصطلاحات: تنفس کا نظام',
              cards: [
                { front: 'Alveoli (ایلویولائی)', back: 'Microscopic sac-like structures in human lungs providing vast surface area for gas exchange with blood.', hint: 'Functional unit of lungs' },
                { front: 'Stomata (سٹوماٹا)', back: 'Microscopic pores in the epidermis of plant leaves guarded by kidney-shaped guard cells.', hint: 'In plant leaves' },
                { front: 'Emphysema (ایمفیسیما)', back: 'Respiratory disease characterized by the destruction of the walls of alveoli, reducing surface area for gas exchange.', hint: 'Smoking damage' },
              ],
            },
          },
          {
            id: 'b3',
            type: 'practice',
            order: 3,
            data: {
              promptEn: 'Where does the actual exchange of gases take place in the human respiratory system?',
              promptUr: 'انسانی تنفسی نظام میں خون اور ہوا کے درمیان گیسوں کا اصل تبادلہ کہاں ہوتا ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Trachea (ہوا کی نالی)', textUr: 'ٹریکیا' },
                { id: 'opt_b', textEn: 'Alveoli (ایلویولائی)', textUr: 'ایلویولائی' },
                { id: 'opt_c', textEn: 'Larynx (صوتی ڈبہ)', textUr: 'لیرنکس' },
              ],
              correctId: 'opt_b',
              explanationEn: 'The microscopic alveoli are wrapped in capillaries where O2 and CO2 diffuse across thin membranes.',
              explanationUr: 'ایلویولائی پتلی جھلی والے باریک تھیلے ہیں جہاں آکسیجن خون میں اور کاربن ڈائی آکسائیڈ باہر منتقل ہوتی ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_10_bio_11',
    subjectId: 'sub_bio',
    classId: 'class_10',
    unitNumber: 11,
    titleEn: 'Chapter 11: Homeostasis',
    titleUr: 'باب 11: ہومیوسٹیسس (اندرونی توازن)',
    kptbbChapter: 11,
    quizId: 'quiz_10_bio_11',
    lessons: [
      {
        id: 'lsn_10_bio_11_1',
        unitId: 'unit_10_bio_11',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'Osmoregulation, Thermoregulation & Kidney Function',
        titleUr: 'اسموریگولیشن اور انسانی گردے کا کام',
        kptbbChapterRef: 'KPTBB Class 10 Biology, Chapter 11, Page 22',
        durationMinutes: 16,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Maintaining Internal Stability',
              titleUr: 'جسم کے اندرونی ماحول کا استحکام',
              bodyEn: 'Homeostasis is the maintenance of internal body conditions at a constant level despite fluctuations in the external environment. Osmoregulation controls water and solute concentration. In humans, the Urinary System removes urea, excess salts, and water. The functional unit of the kidney is the Nephron, which filters blood in Bowman’s capsule and reabsorbs vital nutrients along the renal tubule.',
              bodyUr: 'ہومیوسٹیسس سے مراد بیرونی ماحول میں تبدیلیوں کے باوجود جسم کے اندرونی حالات کو ایک خاص توازن پر رکھنا ہے۔ انسانی گردے خون سے یوریا اور فالتو نمکیات صاف کرتے ہیں۔ گردے کی بنیادی فعلی اکائی نیفران (Nephron) کہلاتی ہے جو خون کو فلٹر کر کے پیشاب بناتی ہے۔',
              kptbbRef: 'KPTBB Class 10 Biology, Chapter 11',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'What is the functional microscopic filtration unit of the human kidney?',
              promptUr: 'انسانی گردے کی بنیادی فلٹریشن اکائی کیا کہلاتی ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Neuron', textUr: 'نیوران' },
                { id: 'opt_b', textEn: 'Nephron (نیفران)', textUr: 'نیفران (Nephron)' },
                { id: 'opt_c', textEn: 'Renal Pelvis', textUr: 'رینل پیلوس' },
              ],
              correctId: 'opt_b',
              explanationEn: 'The Nephron filters blood, performing ultrafiltration and selective reabsorption.',
              explanationUr: 'نیفران گردے کی خوردبینی اکائی ہے جو خون سے زہریلے مادے الگ کرتی ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_10_bio_12',
    subjectId: 'sub_bio',
    classId: 'class_10',
    unitNumber: 12,
    titleEn: 'Chapter 12: Coordination and Control',
    titleUr: 'باب 12: کوآرڈینیشن اور کنٹرول',
    kptbbChapter: 12,
    quizId: 'quiz_10_bio_12',
    lessons: [
      {
        id: 'lsn_10_bio_12_1',
        unitId: 'unit_10_bio_12',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'Nervous Coordination & The Endocrine System',
        titleUr: 'اعصابی نظام اور ہارمونز',
        kptbbChapterRef: 'KPTBB Class 10 Biology, Chapter 12',
        durationMinutes: 16,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'How Body Organs Work in Harmony',
              titleUr: 'جسمانی اعضاء کا باہمی رابطہ',
              bodyEn: 'Coordination is achieved through two complementary systems: Nervous Coordination (fast electrochemical nerve impulses via Neurons, Brain, Spinal Cord) and Chemical Coordination (slow, sustained chemical messengers called Hormones secreted into blood by endocrine glands like Pituitary, Thyroid, and Pancreas).',
              bodyUr: 'کوآرڈینیشن دو طرح سے ہوتی ہے: اعصابی کوآرڈینیشن (نیورونز، دماغ اور حرام مغز کے ذریعے برق کیمیاوی سگنلز) اور کیمیائی کوآرڈینیشن (اینڈوکرائن غدود کے خارج کردہ ہارمونز کے ذریعے، جیسے پٹیوٹری گلینڈ، تھائرائڈ اور لبلبہ)۔',
              kptbbRef: 'KPTBB Class 10 Biology, Chapter 12',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'Which hormone is secreted by the pancreas to lower blood glucose levels?',
              promptUr: 'خون میں شوگر کی مقدار کو کم کرنے کے لیے لبلبہ کون سا ہارمون خارج کرتا ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Thyroxine', textUr: 'تھائیراکسن' },
                { id: 'opt_b', textEn: 'Insulin (انسولین)', textUr: 'انسولین (Insulin)' },
                { id: 'opt_c', textEn: 'Adrenaline', textUr: 'ایڈرینالن' },
              ],
              correctId: 'opt_b',
              explanationEn: 'Insulin facilitates uptake of glucose into cells, lowering blood sugar.',
              explanationUr: 'انسولین خون میں شوگر کو کنٹرول کر کے خلیات میں داخل کرتی ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_10_bio_15',
    subjectId: 'sub_bio',
    classId: 'class_10',
    unitNumber: 15,
    titleEn: 'Chapter 15: Inheritance & Genetics',
    titleUr: 'باب 15: وراثت اور جینز',
    kptbbChapter: 15,
    quizId: 'quiz_10_bio_15',
    lessons: [
      {
        id: 'lsn_10_bio_15_1',
        unitId: 'unit_10_bio_15',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'DNA, Chromosomes, and Mendel’s Laws',
        titleUr: 'ڈی این اے، کروموسوم اور مینڈل کے قوانین',
        kptbbChapterRef: 'KPTBB Class 10 Biology, Chapter 15',
        durationMinutes: 18,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'The Molecular Blueprint of Life',
              titleUr: 'زندگی کا مالیکیولر نقشہ: ڈی این اے',
              bodyEn: 'Chromosomes are composed of chromatin, containing DNA and histone proteins. A gene is a specific sequence of nucleotides that codes for a protein. Gregor Mendel discovered the principles of heredity using pea plants (Pisum sativum): The Law of Segregation and the Law of Independent Assortment.',
              bodyUr: 'کروموسومز ڈی این اے اور پروٹین سے مل کر بنتے ہیں۔ جین ڈی این اے کا وہ حصہ ہے جو کسی خاص وراثتی خوبی کو کنٹرول کرتا ہے۔ مینڈل نے مٹر کے پودوں پر تجربات کر کے وراثت کے بنیادی قوانین دریافت کیے۔',
              kptbbRef: 'KPTBB Class 10 Biology, Chapter 15',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'According to Watson and Crick, what is the double-helix structure of DNA composed of?',
              promptUr: 'واٹسن اور کرک ماڈل کے مطابق ڈی این اے کس ساخت پر مشتمل ہوتا ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Single strand of amino acids', textUr: 'امائنو ایسڈ کی اکیلی لڑی' },
                { id: 'opt_b', textEn: 'Two complementary polynucleotide chains in double helix', textUr: 'دوہری لہری دار پولینیوکلیوٹائڈ زنجیریں (Double Helix)' },
                { id: 'opt_c', textEn: 'Lipid bilayer', textUr: 'چربی کی تہہ' },
              ],
              correctId: 'opt_b',
              explanationEn: 'DNA consists of two strands twisted into a right-handed double helix, bonded by complementary base pairs (A-T and G-C).',
              explanationUr: 'ڈی این اے کی دو زنجیریں سیڑھی کی طرح باہم لپٹی ہوتی ہیں جن میں نائٹروجنی اساسیں (A-T, G-C) جڑی ہوتی ہیں۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // CLASS 10 CHEMISTRY (KPTBB / BISE Swat)
  // ==========================================
  {
    id: 'unit_10_chem_9',
    subjectId: 'sub_chem',
    classId: 'class_10',
    unitNumber: 9,
    titleEn: 'Chapter 9: Chemical Equilibrium',
    titleUr: 'باب 9: کیمیائی توازن',
    kptbbChapter: 9,
    quizId: 'quiz_10_chem_9',
    lessons: [
      {
        id: 'lsn_10_chem_9_1',
        unitId: 'unit_10_chem_9',
        subjectId: 'sub_chem',
        lessonNumber: 1,
        titleEn: 'Reversible Reactions & Law of Mass Action',
        titleUr: 'ریورسیبل ری ایکشنز اور لا آف ماس ایکشن',
        kptbbChapterRef: 'KPTBB Class 10 Chemistry, Chapter 9',
        durationMinutes: 16,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Dynamic Equilibrium and Equilibrium Constant (Kc)',
              titleUr: 'ڈائنامک توازن اور ایکویلیبریم کانسٹنٹ (Kc)',
              bodyEn: 'In a reversible reaction, reactants form products (forward reaction) and products react back to form reactants (reverse reaction). Dynamic equilibrium is reached when the rate of the forward reaction equals the rate of the reverse reaction. Guldberg and Waage stated the Law of Mass Action: rate of reaction is directly proportional to the product of active masses of reacting substances. Equilibrium Constant Kc = [Products] / [Reactants].',
              bodyUr: 'ریورسیبل ری ایکشن میں ری ایکٹنٹس مل کر پروڈکٹس بناتے ہیں اور پروڈکٹس واپس ری ایکٹنٹس میں تبدیل ہوتے ہیں۔ جب آگے اور پیچھے ہونے والے ری ایکشن کی رفتار برابر ہو جائے تو اسے ڈائنامک توازن کہتے ہیں۔ لا آف ماس ایکشن کے مطابق ری ایکشن کی رفتار اشیاء کی ایکٹیو ماسز کے حاصل ضرب کے متناسب ہوتی ہے۔',
              kptbbRef: 'KPTBB Chemistry Class 10, Chapter 9',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'When chemical equilibrium is achieved in a closed container, what can be said about the reaction rates?',
              promptUr: 'جب کسی بند برتن میں کیمیائی توازن قائم ہو جاتا ہے تو ری ایکشن کی رفتاروں کے بارے میں کیا درست ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Reaction stops completely', textUr: 'ری ایکشن مکمل طور پر رک جاتا ہے' },
                { id: 'opt_b', textEn: 'Rate of forward reaction equals rate of reverse reaction', textUr: 'فارورڈ اور ریورس ری ایکشن کی رفتار بالکل برابر ہو جاتی ہے' },
                { id: 'opt_c', textEn: 'All products decompose', textUr: 'تمام پروڈکٹس ختم ہو جاتے ہیں' },
              ],
              correctId: 'opt_b',
              explanationEn: 'Equilibrium is dynamic: molecules continue reacting in both directions at identical rates.',
              explanationUr: 'توازن ڈائنامک ہوتا ہے، یعنی دونوں سمتوں میں عمل برابر رفتار سے جاری رہتا ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_10_chem_10',
    subjectId: 'sub_chem',
    classId: 'class_10',
    unitNumber: 10,
    titleEn: 'Chapter 10: Acids, Bases & Salts',
    titleUr: 'باب 10: تیزاب، اساس اور نمکیات',
    kptbbChapter: 10,
    quizId: 'quiz_10_chem_10',
    lessons: [
      {
        id: 'lsn_10_chem_10_1',
        unitId: 'unit_10_chem_10',
        subjectId: 'sub_chem',
        lessonNumber: 1,
        titleEn: 'Arrhenius, Bronsted-Lowry & Lewis Concepts',
        titleUr: 'تیزاب اور اساس کے نظریات اور پی ایچ سکیل',
        kptbbChapterRef: 'KPTBB Class 10 Chemistry, Chapter 10',
        durationMinutes: 16,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Defining Acids and Bases',
              titleUr: 'تیزاب اور اساس کی سائنسی تعریف',
              bodyEn: 'According to Arrhenius, an acid produces H+ ions in aqueous solution, while a base produces OH- ions. Bronsted-Lowry defined an acid as a proton (H+) donor, and a base as a proton acceptor. Lewis defined an acid as an electron pair acceptor, and a base as an electron pair donor. The pH scale measures hydrogen ion concentration from 0 (strongly acidic) to 7 (neutral) to 14 (strongly alkaline).',
              bodyUr: 'آرہیئنس کے مطابق تیزاب پانی میں ہائیڈروجن آئن (H+) اور اساس ہائیڈروکسائیڈ آئن (OH-) دیتے ہیں۔ برونسٹڈ لوری کے مطابق تیزاب پروٹان دینے والا اور اساس پروٹان لینے والا مادہ ہے۔ لیوس کے مطابق تیزاب الیکٹران پیئر قبول کرتا ہے اور اساس الیکٹران پیئر عطیہ کرتی ہے۔ پی ایچ سکیل 0 سے 14 تک ہوتی ہے۔',
              kptbbRef: 'KPTBB Chemistry Class 10, Chapter 10',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'What is the pH of pure neutral water at 25°C?',
              promptUr: '25 ڈگری سینٹی گریڈ پر خالص شفاف پانی کا پی ایچ (pH) کتنا ہوتا ہے؟',
              options: [
                { id: 'opt_1', textEn: 'pH = 0', textUr: 'پی ایچ = 0' },
                { id: 'opt_2', textEn: 'pH = 7', textUr: 'پی ایچ = 7 (نیوٹرل)' },
                { id: 'opt_3', textEn: 'pH = 14', textUr: 'پی ایچ = 14' },
              ],
              correctId: 'opt_2',
              explanationEn: 'Neutral pure water has [H+] = 10^-7 M, yielding pH = -log(10^-7) = 7.',
              explanationUr: 'خالص پانی نیوٹرل ہوتا ہے اور اس کا پی ایچ بالکل 7 ہوتا ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_10_chem_11',
    subjectId: 'sub_chem',
    classId: 'class_10',
    unitNumber: 11,
    titleEn: 'Chapter 11: Organic Chemistry',
    titleUr: 'باب 11: نامیاتی کیمیا (آرگینک کیمسٹری)',
    kptbbChapter: 11,
    quizId: 'quiz_10_chem_11',
    lessons: [
      {
        id: 'lsn_10_chem_11_1',
        unitId: 'unit_10_chem_11',
        subjectId: 'sub_chem',
        lessonNumber: 1,
        titleEn: 'Catenation & Functional Groups',
        titleUr: 'کاربن کی زنجیر سازی (Catenation) اور فنکشنل گروپس',
        kptbbChapterRef: 'KPTBB Class 10 Chemistry, Chapter 11',
        durationMinutes: 15,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'The Chemistry of Carbon Compounds',
              titleUr: 'کاربن کے مرکبات کی خصوصیات',
              bodyEn: 'Organic chemistry is the study of hydrocarbons and their derivatives. Carbon’s unique ability to form long stable chains and rings with other carbon atoms is called Catenation. A functional group is an atom or group of atoms that imparts characteristic chemical properties to an organic molecule (e.g. -OH for Alcohols, -COOH for Carboxylic Acids, -CHO for Aldehydes).',
              bodyUr: 'آرگینک کیمسٹری ہائیڈرو کاربنز اور ان سے ماخوذ مرکبات کا مطالعہ ہے۔ کاربن کی اپنے ہی جیسے دوسرے کاربن ایٹمز کے ساتھ لمبی زنجیریں بنانے کی منفرد صلاحیت کیٹینیشن (Catenation) کہلاتی ہے۔ فنکشنل گروپ وہ ایٹم یا گروپ ہے جو مالیکیول کو مخصوص کیمیائی خصوصیات بخشتا ہے۔',
              kptbbRef: 'KPTBB Chemistry Class 10, Chapter 11',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'Which functional group characterizes alcohols?',
              promptUr: 'الکحلز (Alcohols) کی پہچان کون سا فنکشنل گروپ ہے؟',
              options: [
                { id: 'opt_a', textEn: '-COOH (Carboxyl)', textUr: '-COOH' },
                { id: 'opt_b', textEn: '-OH (Hydroxyl)', textUr: '-OH (ہائیڈروکسل گروپ)' },
                { id: 'opt_c', textEn: '-CHO (Aldehyde)', textUr: '-CHO' },
              ],
              correctId: 'opt_b',
              explanationEn: 'The hydroxyl group (-OH) attached to an alkyl radical forms an alcohol (R-OH).',
              explanationUr: 'ہائیڈروکسل گروپ (-OH) الکحل کی مخصوص علامت ہے۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // CLASS 10 MATHEMATICS (KPTBB / BISE Swat)
  // ==========================================
  {
    id: 'unit_10_math_1',
    subjectId: 'sub_math',
    classId: 'class_10',
    unitNumber: 1,
    titleEn: 'Chapter 1: Quadratic Equations',
    titleUr: 'باب 1: دو درجی مساواتیں (Quadratic Equations)',
    kptbbChapter: 1,
    quizId: 'quiz_10_math_1',
    lessons: [
      {
        id: 'lsn_10_math_1_1',
        unitId: 'unit_10_math_1',
        subjectId: 'sub_math',
        lessonNumber: 1,
        titleEn: 'Standard Quadratic Form & Quadratic Formula',
        titleUr: 'معیاری دو درجی مساوات اور دو درجی فارمولا',
        kptbbChapterRef: 'KPTBB Class 10 Mathematics, Chapter 1',
        durationMinutes: 16,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Solving ax² + bx + c = 0',
              titleUr: 'مساوات ax² + bx + c = 0 کا حل',
              bodyEn: 'An equation of degree 2 in variable x has the standard form: ax² + bx + c = 0 (where a ≠ 0). It can be solved by three methods: 1) Factorization, 2) Completing the Square, and 3) The Quadratic Formula: x = [-b ± √(b² - 4ac)] / (2a).',
              bodyUr: 'ایک متغیر x میں دو درجی مساوات کی معیاری شکل ax² + bx + c = 0 ہے۔ اسے تین طریقوں سے حل کیا جا سکتا ہے: بذریعہ تجزی (Factorization)، بذریعہ تکمیل مربع، اور دو درجی فارمولا: x = [-b ± √(b² - 4ac)] / (2a)۔',
              kptbbRef: 'KPTBB Class 10 Maths, Chapter 1',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'What are the solutions to x² - 9 = 0?',
              promptUr: 'مساوات x² - 9 = 0 کے حل (Roots) کیا ہیں؟',
              options: [
                { id: 'opt_1', textEn: 'x = 3 only', textUr: 'صرف x = 3' },
                { id: 'opt_2', textEn: 'x = ±3', textUr: 'x = +3 اور x = -3' },
                { id: 'opt_3', textEn: 'x = 9', textUr: 'x = 9' },
              ],
              correctId: 'opt_2',
              explanationEn: 'x² = 9 implies x = ±√9 = ±3.',
              explanationUr: 'x² = 9، دونوں طرف جزر لینے سے x = ±3 حاصل ہوتا ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_10_math_7',
    subjectId: 'sub_math',
    classId: 'class_10',
    unitNumber: 7,
    titleEn: 'Chapter 7: Introduction to Trigonometry',
    titleUr: 'باب 7: مثلثیات کا تعارف (Trigonometry)',
    kptbbChapter: 7,
    quizId: 'quiz_10_math_7',
    lessons: [
      {
        id: 'lsn_10_math_7_1',
        unitId: 'unit_10_math_7',
        subjectId: 'sub_math',
        lessonNumber: 1,
        titleEn: 'Trigonometric Ratios & Fundamental Identities',
        titleUr: 'مثلثیاتی نسبتیں اور بنیادی شناختیں',
        kptbbChapterRef: 'KPTBB Class 10 Mathematics, Chapter 7',
        durationMinutes: 16,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Sin, Cos, Tan & Pythagorean Identities',
              titleUr: 'سائن، کوسائن اور ٹینجینٹ',
              bodyEn: 'In a right-angled triangle: sin(θ) = Perpendicular / Hypotenuse, cos(θ) = Base / Hypotenuse, and tan(θ) = Perpendicular / Base. The fundamental trigonometric identity is: sin²(θ) + cos²(θ) = 1. Also 1 + tan²(θ) = sec²(θ) and 1 + cot²(θ) = cosec²(θ).',
              bodyUr: 'قائمۃ الزاویہ مثلث میں: sin(θ) = عمود / وتر، cos(θ) = قاعدہ / وتر، tan(θ) = عمود / قاعدہ۔ بنیادی مثلثیاتی فارمولا ہے: sin²(θ) + cos²(θ) = 1۔',
              kptbbRef: 'KPTBB Class 10 Maths, Chapter 7',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'What is the value of sin²(45°) + cos²(45°)?',
              promptUr: 'sin²(45°) + cos²(45°) کی قیمت کیا ہوگی؟',
              options: [
                { id: 'opt_a', textEn: '0', textUr: '0' },
                { id: 'opt_b', textEn: '1', textUr: '1 (ہمیشہ ایک)' },
                { id: 'opt_c', textEn: '2', textUr: '2' },
              ],
              correctId: 'opt_b',
              explanationEn: 'For any angle θ, sin²(θ) + cos²(θ) identically equals 1.',
              explanationUr: 'کسی بھی زاویے کے لیے sin²(θ) + cos²(θ) کی قیمت ہمیشہ 1 ہوتی ہے۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // CLASS 10 PHYSICS (KPTBB / BISE Swat)
  // ==========================================
  {
    id: 'unit_10_phy_10',
    subjectId: 'sub_physics',
    classId: 'class_10',
    unitNumber: 10,
    titleEn: 'Chapter 10: Simple Harmonic Motion & Waves',
    titleUr: 'باب 10: سمپل ہارمونک موشن اور لہریں',
    kptbbChapter: 10,
    quizId: 'quiz_10_phy_1',
    lessons: [
      {
        id: 'lsn_10_phy_10_1',
        unitId: 'unit_10_phy_10',
        subjectId: 'sub_physics',
        lessonNumber: 1,
        titleEn: 'SHM of Mass-Spring System & Simple Pendulum',
        titleUr: 'میس اسپرنگ سسٹم اور سادہ پینڈولم کی حرکت',
        kptbbChapterRef: 'KPTBB Class 10 Physics, Chapter 10',
        durationMinutes: 16,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Characteristics of Simple Harmonic Motion',
              titleUr: 'سمپل ہارمونک موشن کی شرائط',
              bodyEn: 'Simple Harmonic Motion (SHM) occurs when the net restoring force is directly proportional to displacement from mean position and always directed toward mean position: a ∝ -x. The time period of a simple pendulum is T = 2π√(L/g), which depends only on length (L) and gravitational acceleration (g), not on the bob mass.',
              bodyUr: 'سمپل ہارمونک موشن (SHM) میں باڈی کا ایکسلریشن اس کے وسطی پوزیشن سے فاصلے کے ڈائریکٹلی پروپورشنل اور ہمیشہ وسطی پوزیشن کی طرف ہوتا ہے: a ∝ -x۔ سادہ پینڈولم کا ٹائم پیریڈ T = 2π√(L/g) ہے جو پینڈولم کی لمبائی اور کشش ثقل پر منحصر ہے۔',
              kptbbRef: 'KPTBB Physics Class 10, Chapter 10',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'If the length of a simple pendulum is quadrupled (multiplied by 4), what happens to its time period?',
              promptUr: 'اگر سادہ پینڈولم کی لمبائی 4 گنا کر دی جائے تو اس کے ٹائم پیریڈ پر کیا اثر پڑے گا؟',
              options: [
                { id: 'opt_1', textEn: 'Remains unchanged', textUr: 'تبدیل نہیں ہوگا' },
                { id: 'opt_2', textEn: 'Doubles (2 times)', textUr: 'دوگنا ہو جائے گا (T doubles)' },
                { id: 'opt_3', textEn: 'Quadruples (4 times)', textUr: 'چار گنا ہو جائے گا' },
              ],
              correctId: 'opt_2',
              explanationEn: 'Since T ∝ √L, √4 = 2. The period doubles.',
              explanationUr: 'کیونکہ T = 2π√(L/g) ہے، اس لیے لمبائی 4 گنا کرنے سے جزر نکل کر ٹائم پیریڈ 2 گنا ہو جائے گا۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_10_phy_1',
    subjectId: 'sub_physics',
    classId: 'class_10',
    unitNumber: 2,
    titleEn: 'Chapter 2: Kinematics & Equations of Motion',
    titleUr: 'باب 2: کائنی میٹکس اور حرکت کی مساواتیں',
    kptbbChapter: 2,
    quizId: 'quiz_10_phy_1',
    lessons: [
      {
        id: 'lsn_10_phy_1',
        unitId: 'unit_10_phy_1',
        subjectId: 'sub_physics',
        lessonNumber: 1,
        titleEn: 'Velocity-Time Graphs & Three Equations of Motion',
        titleUr: 'ولاسٹی وقت گراف اور حرکت کی تین مساواتیں',
        kptbbChapterRef: 'KPTBB Class 10 Physics, Section 2.5',
        durationMinutes: 15,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Core Formulas of Kinematics',
              titleUr: 'کائنی میٹکس کی اہم مساواتیں',
              bodyEn: 'The three equations of motion for uniform acceleration are: 1) vf = vi + at, 2) S = vi*t + 0.5*a*t², 3) 2aS = vf² - vi². The slope of a velocity-time graph gives acceleration, and the area under the line gives total distance.',
              bodyUr: 'یکساں ایکسلریشن کے لیے حرکت کی تین مساواتیں ہیں: 1) vf = vi + at، 2) S = vi*t + 0.5*a*t²، 3) 2aS = vf² - vi²۔ ولاسٹی وقت گراف کا سلوپ ایکسلریشن اور اس کے نیچے کا رقبہ طے کردہ فاصلہ ظاہر کرتا ہے۔',
              kptbbRef: 'KPTBB Physics Class 10, Chapter 2',
            },
          },
          {
            id: 'b2',
            type: 'animation',
            order: 2,
            data: {
              simulatorType: 'kinematics_canvas',
              titleEn: 'Live Velocity-Time Graph Simulator',
              titleUr: 'ولاسٹی وقت گراف سیمولیٹر',
            },
          },
          {
            id: 'b3',
            type: 'practice',
            order: 3,
            data: {
              promptEn: 'A car accelerates uniformly from rest at 2 m/s² for 5 seconds. What is its final velocity?',
              promptUr: 'ایک کار ریسٹ سے 2 m/s² کے ایکسلریشن کے ساتھ 5 سیکنڈ چلتی ہے۔ اس کی فائنل ولاسٹی کیا ہوگی؟',
              options: [
                { id: 'opt_1', textEn: '5 m/s', textUr: '5 m/s' },
                { id: 'opt_2', textEn: '10 m/s', textUr: '10 m/s' },
                { id: 'opt_3', textEn: '20 m/s', textUr: '20 m/s' },
              ],
              correctId: 'opt_2',
              explanationEn: 'vf = vi + at = 0 + (2 * 5) = 10 m/s.',
              explanationUr: 'vf = vi + at = 0 + (2 * 5) = 10 m/s۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // CLASS 9 BIOLOGY (KPTBB / BISE Swat)
  // ==========================================
  {
    id: 'unit_9_bio_1',
    subjectId: 'sub_bio',
    classId: 'class_9',
    unitNumber: 1,
    titleEn: 'Chapter 1: Introduction to Biology',
    titleUr: 'باب 1: حیاتیات کا تعارف',
    kptbbChapter: 1,
    quizId: 'quiz_9_bio_1',
    lessons: [
      {
        id: 'lsn_9_bio_1',
        unitId: 'unit_9_bio_1',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'Divisions and Branches of Biology',
        titleUr: 'حیاتیات کے بڑے شعبے اور شاخیں',
        kptbbChapterRef: 'KPTBB Class 9 Biology, Chapter 1',
        durationMinutes: 14,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Zoology, Botany & Microbiology',
              titleUr: 'زولوجی، باٹنی اور مائیکرو بائیولوجی',
              bodyEn: 'Biology is the scientific study of life. It is divided into three major divisions: Zoology (study of animals), Botany (study of plants), and Microbiology (study of microorganisms like bacteria and viruses). Key specialized branches include Morphology, Anatomy, Histology, Physiology, Genetics, Ecology, and Biotechnology.',
              bodyUr: 'حیاتیات زندگی کا سائنسی مطالعہ ہے۔ اس کے تین بڑے شعبے ہیں: زولوجی (جانوروں کا مطالعہ)، باٹنی (پودوں کا مطالعہ) اور مائیکرو بائیولوجی (خوردبینی جانداروں کا مطالعہ)۔ اہم شاخوں میں اناٹمی، ہسٹولوجی، فزیالوجی اور جینیٹکس شامل ہیں۔',
              kptbbRef: 'KPTBB Class 9 Biology, Chapter 1',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'Which branch of biology deals with the microscopic study of plant and animal tissues?',
              promptUr: 'خلیات اور بافتوں (Tissues) کا خوردبینی مطالعہ حیاتیات کی کس شاخ میں کیا جاتا ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Morphology', textUr: 'مارفولوجی' },
                { id: 'opt_b', textEn: 'Histology (ہسٹولوجی)', textUr: 'ہسٹولوجی (Histology)' },
                { id: 'opt_c', textEn: 'Paleontology', textUr: 'پیلیونٹولوجی' },
              ],
              correctId: 'opt_b',
              explanationEn: 'Histology is the microscopic study of biological tissues.',
              explanationUr: 'بافتوں (Tissues) کے خوردبینی مطالعے کو ہسٹولوجی کہا جاتا ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_9_bio_4',
    subjectId: 'sub_bio',
    classId: 'class_9',
    unitNumber: 4,
    titleEn: 'Chapter 4: Cells and Tissues',
    titleUr: 'باب 4: خلیات اور بافتیں',
    kptbbChapter: 4,
    quizId: 'quiz_9_bio_4',
    lessons: [
      {
        id: 'lsn_9_bio_4',
        unitId: 'unit_9_bio_4',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'Cell Structure & Organelle Functions',
        titleUr: 'خلیے کی ساخت اور اس کے اعضاء',
        kptbbChapterRef: 'KPTBB Class 9 Biology, Chapter 4',
        durationMinutes: 15,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Prokaryotes vs Eukaryotes',
              titleUr: 'پروکیریوٹک اور یوکیریوٹک خلیات',
              bodyEn: 'Prokaryotic cells (like bacteria) lack a distinct membrane-bound nucleus and membrane-bound organelles. Eukaryotic cells (plants, animals, fungi) possess a prominent nucleus containing DNA, mitochondria for cellular respiration, endoplasmic reticulum, Golgi apparatus, and in plants, chloroplasts and a cellulose cell wall.',
              bodyUr: 'پروکیریوٹک خلیات میں جھلی دار نیوکلیئس نہیں ہوتا (جیسے بیکٹیریا)۔ یوکیریوٹک خلیات میں واضح جھلی دار نیوکلیئس، مائٹوکونڈریا اور دیگر آرگنیلز موجود ہوتے ہیں۔',
              kptbbRef: 'KPTBB Class 9 Biology, Chapter 4',
            },
          },
          {
            id: 'b2',
            type: 'animation',
            order: 2,
            data: {
              simulatorType: 'cell_explorer',
              titleEn: 'Interactive Organelle Zoomer',
              titleUr: 'خلیاتی آرگنیلز کا لائیو ماڈل',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // CLASS 9 PHYSICS (KPTBB / BISE Swat)
  // ==========================================
  {
    id: 'unit_9_phy_1',
    subjectId: 'sub_physics',
    classId: 'class_9',
    unitNumber: 1,
    titleEn: 'Chapter 1: Physical Quantities & Measurement',
    titleUr: 'باب 1: طبعی مقداریں اور پیمائش',
    kptbbChapter: 1,
    quizId: 'quiz_9_phy_1',
    lessons: [
      {
        id: 'lsn_9_phy_1',
        unitId: 'unit_9_phy_1',
        subjectId: 'sub_physics',
        lessonNumber: 1,
        titleEn: 'Base & Derived SI Units, Vernier Caliper & Micrometer',
        titleUr: 'بنیادی اور ماخوذ یونٹس اور پیمائشی آلات',
        kptbbChapterRef: 'KPTBB Class 9 Physics, Chapter 1',
        durationMinutes: 14,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'International System of Units (SI)',
              titleUr: 'پیمائش کا بین الاقوامی نظام',
              bodyEn: 'Seven fundamental base quantities define the SI system: Length (meter), Mass (kilogram), Time (second), Electric Current (ampere), Temperature (kelvin), Amount of substance (mole), and Luminous intensity (candela). A Vernier Caliper measures down to 0.1 mm (0.01 cm), while a Screw Gauge has a least count of 0.01 mm (0.001 cm).',
              bodyUr: 'ایس آئی نظام میں 7 بنیادی مقداریں ہیں: لمبائی (میٹر)، ماس (کلوگرام)، وقت (سیکنڈ)، برقی کرنٹ (ایمپئر)، درجہ حرارت (کیلون)، مادہ کی مقدار (مول) اور روشنی کی شدت (کینڈیلا)۔ ورنیئر کیلیپرز کا لیسٹ کاؤنٹ 0.1 ملی میٹر اور سکرو گیج کا 0.01 ملی میٹر ہوتا ہے۔',
              kptbbRef: 'KPTBB Class 9 Physics, Chapter 1',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'What is the standard least count of a metric Vernier Caliper?',
              promptUr: 'عام ورنیئر کیلیپرز کا لیسٹ کاؤنٹ (Least Count) کتنا ہوتا ہے؟',
              options: [
                { id: 'opt_1', textEn: '1.0 mm', textUr: '1.0 ملی میٹر' },
                { id: 'opt_2', textEn: '0.1 mm (0.01 cm)', textUr: '0.1 ملی میٹر (0.01 سینٹی میٹر)' },
                { id: 'opt_3', textEn: '0.001 mm', textUr: '0.001 ملی میٹر' },
              ],
              correctId: 'opt_2',
              explanationEn: 'The least count of standard Vernier Calipers is 0.1 mm.',
              explanationUr: 'ورنیئر کیلیپرز کا لیسٹ کاؤنٹ 0.1 ملی میٹر ہوتا ہے۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // CLASS 11 (FSc Part 1)
  // ==========================================
  {
    id: 'unit_11_bio_1',
    subjectId: 'sub_bio',
    classId: 'class_11',
    unitNumber: 1,
    titleEn: 'Chapter 1: Cell Structure and Function (FSc Part 1)',
    titleUr: 'باب 1: خلوی ساخت اور افعال (FSc اول)',
    kptbbChapter: 1,
    quizId: 'quiz_11_bio_1',
    lessons: [
      {
        id: 'lsn_11_bio_1',
        unitId: 'unit_11_bio_1',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'Plasma Membrane & Fluid Mosaic Model',
        titleUr: 'پلازما ممبرین اور فلوئڈ موزیک ماڈل',
        kptbbChapterRef: 'KPTBB Class 11 Biology, Chapter 1',
        durationMinutes: 18,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Singer and Nicolson Fluid Mosaic Model',
              titleUr: 'سنگر اور نکلسن کا فلوئڈ موزیک ماڈل',
              bodyEn: 'Proposed in 1972, the Fluid Mosaic Model describes the cell membrane as a phospholipid bilayer with hydrophilic phosphate heads facing outward and hydrophobic fatty acid tails facing inward. Intrinsic and extrinsic proteins float like icebergs in a lipid sea, providing selective permeability, transport channels, and signal receptor sites.',
              bodyUr: 'فلوئڈ موزیک ماڈل کے مطابق خلیے کی بیرونی جھلی فاسفولپڈز کی دوہری تہہ پر مشتمل ہوتی ہے جس میں پروٹین کے مالیکیول تیرتے ہوئے نظر آتے ہیں۔ یہ جھلی خلیے کے اندر مادوں کے داخلے اور اخراج کو کنٹرول کرتی ہے۔',
              kptbbRef: 'KPTBB Class 11 Biology, Chapter 1',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'In the cell membrane phospholipid bilayer, which part is hydrophobic (water-repelling)?',
              promptUr: 'سیل ممبرین میں فاسفولپڈ کا کون سا حصہ پانی سے گریزاں (Hydrophobic) ہوتا ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Phosphate head', textUr: 'فاسفیٹ ہیڈ' },
                { id: 'opt_b', textEn: 'Fatty acid tail (فیٹی ایسڈ دم)', textUr: 'فیٹی ایسڈ کی دم (Tail)' },
                { id: 'opt_c', textEn: 'Glycoprotein', textUr: 'گلائیکو پروٹین' },
              ],
              correctId: 'opt_b',
              explanationEn: 'The non-polar hydrocarbon fatty acid tails face inward away from water, forming the hydrophobic core.',
              explanationUr: 'فیٹی ایسڈ کی نان پولر دم اندر کی جانب رخ کیے ہوتی ہے اور پانی سے بچتی ہے۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_11_phy_2',
    subjectId: 'sub_physics',
    classId: 'class_11',
    unitNumber: 2,
    titleEn: 'Chapter 2: Vectors & Equilibrium (FSc Part 1)',
    titleUr: 'باب 2: ویکٹرز اور ایکویلیبریم (FSc اول)',
    kptbbChapter: 2,
    quizId: 'quiz_10_phy_1',
    lessons: [
      {
        id: 'lsn_11_phy_2',
        unitId: 'unit_11_phy_2',
        subjectId: 'sub_physics',
        lessonNumber: 1,
        titleEn: 'Vector Resolution & Scalar/Vector Products',
        titleUr: 'ویکٹرز کی تفریق اور ڈاٹ و کراس پروڈکٹ',
        kptbbChapterRef: 'KPTBB Class 11 Physics, Chapter 2',
        durationMinutes: 18,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Dot Product vs Cross Product',
              titleUr: 'سکیلر اور ویکٹر پروڈکٹ کا تقابل',
              bodyEn: 'Scalar (Dot) Product: A · B = |A||B|cos(θ). Work W = F · d is a scalar. Vector (Cross) Product: A × B = |A||B|sin(θ) n̂. Torque τ = r × F is a vector whose direction is given by the Right-Hand Rule.',
              bodyUr: 'ڈاٹ پروڈکٹ: A · B = AB cos(θ) جس کا نتیجہ سکیلر ہوتا ہے (جیسے کام W = F · d)۔ کراس پروڈکٹ: A × B = AB sin(θ) n̂ جس کا نتیجہ ویکٹر ہوتا ہے (جیسے ٹارک τ = r × F)۔',
              kptbbRef: 'KPTBB Class 11 Physics, Chapter 2',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'What is the scalar product of two perpendicular vectors (θ = 90°)?',
              promptUr: 'دو باہمی عمودی ویکٹرز (θ = 90°) کا ڈاٹ پروڈکٹ (Dot Product) کیا ہوگا؟',
              options: [
                { id: 'opt_1', textEn: 'Maximum (AB)', textUr: 'زیادہ سے زیادہ' },
                { id: 'opt_2', textEn: 'Zero (0)', textUr: 'صفر (کیونکہ cos 90° = 0)' },
                { id: 'opt_3', textEn: '-1', textUr: '-1' },
              ],
              correctId: 'opt_2',
              explanationEn: 'cos(90°) = 0, so A · B = 0 for orthogonal vectors.',
              explanationUr: 'چونکہ cos(90°) = 0 ہے، اس لیے عمودی ویکٹرز کا ڈاٹ پروڈکٹ ہمیشہ صفر ہوتا ہے۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // CLASS 12 (FSc Part 2)
  // ==========================================
  {
    id: 'unit_12_bio_15',
    subjectId: 'sub_bio',
    classId: 'class_12',
    unitNumber: 15,
    titleEn: 'Chapter 15: Homeostasis in Humans & Plants (FSc Part 2)',
    titleUr: 'باب 15: ہومیوسٹیسس — FSc حصہ دوم',
    kptbbChapter: 15,
    quizId: 'quiz_12_bio_15',
    lessons: [
      {
        id: 'lsn_12_bio_15',
        unitId: 'unit_12_bio_15',
        subjectId: 'sub_bio',
        lessonNumber: 1,
        titleEn: 'Osmoregulation & Excretion in Animals',
        titleUr: 'جانوروں میں اخراج اور نائٹروجنی فضلات',
        kptbbChapterRef: 'KPTBB Class 12 Biology, Chapter 15',
        durationMinutes: 20,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Nitrogenous Waste Excretion: Ammonia, Urea, Uric Acid',
              titleUr: 'امونیا، یوریا اور یورک ایسڈ کا اخراج',
              bodyEn: 'Animals dispose of toxic nitrogenous wastes according to water availability: Aquatic animals excrete highly toxic, water-soluble Ammonia (Ammonotelic). Terrestrial mammals and adult amphibians convert ammonia to less toxic Urea via the Urea Cycle in the liver (Ureotelic). Birds and reptiles excrete insoluble Uric acid paste to conserve water (Uricotelic).',
              bodyUr: 'جانور ماحول میں پانی کی دستیابی کے مطابق نائٹروجنی فضلات خارج کرتے ہیں: مچھلیاں امونیا خارج کرتی ہیں، انسان اور ممالیہ جگر میں یوریا سائیکل کے ذریعے یوریا بناتے ہیں، اور پرندے پانی بچانے کے لیے یورک ایسڈ خارج کرتے ہیں۔',
              kptbbRef: 'KPTBB Class 12 Biology, Chapter 15',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'Which nitrogenous excretory product requires the least amount of water for its elimination?',
              promptUr: 'کون سا نائٹروجنی فضلہ خارج کرنے کے لیے سب سے کم پانی کی ضرورت ہوتی ہے؟',
              options: [
                { id: 'opt_a', textEn: 'Ammonia', textUr: 'امونیا' },
                { id: 'opt_b', textEn: 'Uric Acid (یورک ایسڈ)', textUr: 'یورک ایسڈ (Uric Acid)' },
                { id: 'opt_c', textEn: 'Urea', textUr: 'یوریا' },
              ],
              correctId: 'opt_b',
              explanationEn: 'Uric acid is practically insoluble in water and is excreted as a non-toxic semi-solid paste by birds and reptiles.',
              explanationUr: 'یورک ایسڈ پانی میں نہ حل ہونے کی وجہ سے پرندوں میں نیم ٹھوس شکل میں خارج ہوتا ہے جس میں پانی کا ضیاع نہیں ہوتا۔',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_12_phy_12',
    subjectId: 'sub_physics',
    classId: 'class_12',
    unitNumber: 12,
    titleEn: 'Chapter 12: Electrostatics (FSc Part 2)',
    titleUr: 'باب 12: الیکٹروسٹیٹکس — کولمب کا قانون اور گاس کا قانون',
    kptbbChapter: 12,
    quizId: 'quiz_10_phy_1',
    lessons: [
      {
        id: 'lsn_12_phy_12',
        unitId: 'unit_12_phy_12',
        subjectId: 'sub_physics',
        lessonNumber: 1,
        titleEn: 'Coulomb’s Law, Electric Flux & Gauss’s Law',
        titleUr: 'کولمب کا قانون اور الیکٹرک فلکس',
        kptbbChapterRef: 'KPTBB Class 12 Physics, Chapter 12',
        durationMinutes: 20,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Coulomb’s Law in Vector Form',
              titleUr: 'کولمب کے قانون کی ویکٹر شکل',
              bodyEn: 'Coulomb’s Law gives the force between charges: F = (1 / 4πε₀) * (q1 * q2 / r²). In a dielectric medium of relative permittivity εr, the electrostatic force is reduced: F_med = F_vac / εr. Gauss’s Law states that total electric flux through any closed surface is (1/ε₀) times the total charge enclosed: Φ = Q / ε₀.',
              bodyUr: 'کولمب کا قانون: F = (1 / 4πε₀) * (q1 * q2 / r²)۔ جب چارجز کے درمیان کوئی ڈائی الیکٹرک میڈیم رکھا جائے تو فورس کم ہو جاتی ہے۔ گاس کا قانون کہتا ہے کہ کسی بند سطح سے گزرنے والا کل فلکس اندر موجود چارج کے 1/ε₀ گنا ہوتا ہے۔',
              kptbbRef: 'KPTBB Class 12 Physics, Chapter 12',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'If a dielectric insulator of relative permittivity εr = 2 is placed between two charges, the electrostatic force:',
              promptUr: 'اگر دو چارجز کے درمیان εr = 2 والا میڈیم رکھ دیا جائے تو ان کے درمیان فورس:',
              options: [
                { id: 'opt_1', textEn: 'Doubles', textUr: 'دوگنی ہو جائے گی' },
                { id: 'opt_2', textEn: 'Is halved (F / 2)', textUr: 'آدھی رہ جائے گی (F / 2)' },
                { id: 'opt_3', textEn: 'Becomes zero', textUr: 'صفر ہو جائے گی' },
              ],
              correctId: 'opt_2',
              explanationEn: 'F_medium = F_vacuum / εr = F / 2.',
              explanationUr: 'ڈائی الیکٹرک میڈیم رکھنے سے فورس εr گنا کم ہو جاتی ہے، لہٰذا آدھی رہ جائے گی۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // MIDDLE SCHOOL (Class 6, 7, 8)
  // ==========================================
  {
    id: 'unit_6_sci_1',
    subjectId: 'sub_sci',
    classId: 'class_6',
    unitNumber: 1,
    titleEn: 'Chapter 1: Cellular Organization of Plants & Animals',
    titleUr: 'باب 1: پودوں اور جانوروں کی خلوی ساخت',
    kptbbChapter: 1,
    quizId: 'quiz_generic_pass',
    lessons: [
      {
        id: 'lsn_6_sci_1',
        unitId: 'unit_6_sci_1',
        subjectId: 'sub_sci',
        lessonNumber: 1,
        titleEn: 'Plant Cells vs Animal Cells',
        titleUr: 'پودوں اور جانوروں کے خلیات کا موازنہ',
        kptbbChapterRef: 'KPTBB Class 6 Science, Chapter 1',
        durationMinutes: 12,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'What is a Cell? (خلیہ کیا ہے؟)',
              titleUr: 'خلیہ زندگی کی بنیادی اکائی ہے',
              bodyEn: 'A cell is the basic structural and functional unit of all living organisms. Plant cells possess a rigid Cell Wall and Chloroplasts for photosynthesis, while animal cells do not.',
              bodyUr: 'خلیہ تمام جانداروں کی ساخت اور فعل کی بنیادی اکائی ہے۔ پودوں کے خلیات میں سیل وال اور کلوروپلاسٹ ہوتے ہیں جو پودے کو خوراک بنانے میں مدد دیتے ہیں۔',
              kptbbRef: 'KPTBB Class 6 Science, Page 18',
            },
          },
          {
            id: 'b2',
            type: 'animation',
            order: 2,
            data: {
              simulatorType: 'cell_explorer',
              titleEn: 'Interactive Cell Organelle Explorer',
              titleUr: 'خلیے کے اعضاء کا انٹرایکٹو ماڈل',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_6_math_1',
    subjectId: 'sub_math',
    classId: 'class_6',
    unitNumber: 1,
    titleEn: 'Chapter 1: Sets and Operations on Sets',
    titleUr: 'باب 1: سیٹ اور ان پر بنیادی اعمال',
    kptbbChapter: 1,
    quizId: 'quiz_generic_pass',
    lessons: [
      {
        id: 'lsn_6_math_1',
        unitId: 'unit_6_math_1',
        subjectId: 'sub_math',
        lessonNumber: 1,
        titleEn: 'Union and Intersection of Sets',
        titleUr: 'سیٹوں کا یونین اور تقاطع',
        kptbbChapterRef: 'KPTBB Class 6 Mathematics, Chapter 1',
        durationMinutes: 12,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Defining a Set',
              titleUr: 'سیٹ کی تعریف اور علامات',
              bodyEn: 'A set is a collection of well-defined, distinct objects. Union (A ∪ B) combines all elements of both sets without repetition. Intersection (A ∩ B) contains only the common elements present in both sets.',
              bodyUr: 'سیٹ واضح اور مختلف اشیاء کا مجموعہ ہوتا ہے۔ یونین (A ∪ B) میں دونوں سیٹوں کے تمام ارکان بغیر دہرائے لکھے جاتے ہیں، اور انٹرسیکشن (A ∩ B) میں صرف مشترک ارکان آتے ہیں۔',
              kptbbRef: 'KPTBB Class 6 Maths',
            },
          },
          {
            id: 'b2',
            type: 'practice',
            order: 2,
            data: {
              promptEn: 'If A = {1, 2, 3} and B = {2, 3, 4}, what is A ∩ B?',
              promptUr: 'اگر A = {1, 2, 3} اور B = {2, 3, 4} ہوں تو A ∩ B (مشترک) کیا ہوگا؟',
              options: [
                { id: 'opt_1', textEn: '{1, 4}', textUr: '{1, 4}' },
                { id: 'opt_2', textEn: '{2, 3}', textUr: '{2, 3}' },
                { id: 'opt_3', textEn: '{1, 2, 3, 4}', textUr: '{1, 2, 3, 4}' },
              ],
              correctId: 'opt_2',
              explanationEn: 'Elements 2 and 3 are common to both sets.',
              explanationUr: 'دونوں سیٹوں میں 2 اور 3 مشترک ہیں، لہٰذا تقاطع {2, 3} ہے۔',
            },
          },
        ],
      },
    ],
  },

  // ==========================================
  // PRIMARY & KG (KG, Class 1, 2, 3, 4, 5)
  // ==========================================
  {
    id: 'unit_kg_math_1',
    subjectId: 'sub_math',
    classId: 'class_kg',
    unitNumber: 1,
    titleEn: 'Chapter 1: Numbers & Counting (1 to 20)',
    titleUr: 'باب 1: گنتی کا آغاز (1 سے 20 تک)',
    kptbbChapter: 1,
    quizId: 'quiz_1_math_1',
    lessons: [
      {
        id: 'lsn_kg_math_1',
        unitId: 'unit_kg_math_1',
        subjectId: 'sub_math',
        lessonNumber: 1,
        titleEn: 'Counting with Shining Pearls',
        titleUr: 'چمکیلے موتی گننا سیکھیں',
        kptbbChapterRef: 'KG Early Mathematics',
        durationMinutes: 6,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Welcome to Numbers!',
              titleUr: 'گنتی کی دنیا میں خوش آمدید!',
              bodyEn: 'Numbers help us count toys, apples, birds, and shining pearls! Let us count together from 1 to 5.',
              bodyUr: 'گنتی کی مدد سے ہم کھلونے، سیب، پرندے اور موتی گن سکتے ہیں! آؤ مل کر ایک سے پانچ تک گنیں۔',
              kptbbRef: 'KPTBB Early Childhood Education',
            },
          },
          {
            id: 'b2',
            type: 'animation',
            order: 2,
            data: {
              simulatorType: 'pearl_counter',
              titleEn: 'Interactive Pearl Counter',
              titleUr: 'موتی گننے کا انٹرایکٹو سیپ',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'unit_1_math_1',
    subjectId: 'sub_math',
    classId: 'class_1',
    unitNumber: 1,
    titleEn: 'Chapter 1: Numbers (1 to 100) & Place Value',
    titleUr: 'باب 1: اعداد (1 سے 100) اور مقامی قیمت',
    kptbbChapter: 1,
    quizId: 'quiz_1_math_1',
    lessons: [
      {
        id: 'lsn_1_math_1',
        unitId: 'unit_1_math_1',
        subjectId: 'sub_math',
        lessonNumber: 1,
        titleEn: 'Counting and Number Names',
        titleUr: 'اعداد اور ان کے نام',
        kptbbChapterRef: 'KPTBB Class 1 Mathematics, Page 8',
        durationMinutes: 8,
        blocks: [
          {
            id: 'b1',
            type: 'explanation',
            order: 1,
            data: {
              titleEn: 'Place Value: Units and Tens',
              titleUr: 'اکائی اور دہائی کی پہچان',
              bodyEn: 'When we have 10 single pearls, we group them into 1 Ten. 14 means 1 Ten and 4 Units!',
              bodyUr: 'دس کھلے موتی مل کر ایک دہائی بناتے ہیں۔ 14 کا مطلب ہے 1 دہائی اور 4 اکائیاں۔',
              kptbbRef: 'KPTBB Class 1 Maths - Unit 1',
            },
          },
          {
            id: 'b2',
            type: 'animation',
            order: 2,
            data: {
              simulatorType: 'pearl_counter',
              titleEn: 'Interactive Pearl Counter',
              titleUr: 'موتی گننے کا انٹرایکٹو سیپ',
            },
          },
        ],
      },
    ],
  },
];

const quizzes = {
  // BISE Swat Biology Checkpoint
  quiz_10_bio_10: {
    id: 'quiz_10_bio_10',
    unitId: 'unit_10_bio_10',
    titleEn: 'BISE Swat Biology — Chapter 10 Mock Examination',
    titleUr: 'حیاتیات باب 10: گیسوں کا تبادلہ — بورڈ پرچہ',
    timeLimitMinutes: 15,
    passPercentage: 33,
    questions: [
      {
        id: 'q_bio_1',
        unitId: 'unit_10_bio_10',
        type: 'mcq',
        difficulty: 'easy',
        promptEn: 'Through which structures does gaseous exchange primarily occur in the leaves of plants?',
        promptUr: 'پودوں کے پتوں میں گیسوں کا تبادلہ بنیادی طور پر کن سوراخوں سے ہوتا ہے؟',
        options: [
          { id: 'opt_a', textEn: 'Stomata (سٹوماٹا)', textUr: 'سٹوماٹا' },
          { id: 'opt_b', textEn: 'Lenticels', textUr: 'لینٹیسلز' },
          { id: 'opt_c', textEn: 'Cuticle', textUr: 'کیوٹیکل' },
        ],
        correctOptionId: 'opt_a',
        explanationEn: 'Microscopic stomata guarded by guard cells regulate gas diffusion in leaves.',
        explanationUr: 'پتوں کی ایپی ڈرمس میں سٹوماٹا گیسوں کے تبادلے کا کام کرتے ہیں۔',
        kptbbRef: 'KPTBB Class 10 Biology, Chapter 10',
        tags: ['plants', 'stomata'],
      },
      {
        id: 'q_bio_2',
        unitId: 'unit_10_bio_10',
        type: 'mcq',
        difficulty: 'medium',
        promptEn: 'Which respiratory disorder is characterized by the breakdown of alveolar walls?',
        promptUr: 'پھیپھڑوں کی وہ بیماری جس میں ایلویولائی کی دیواریں ٹوٹ پھوٹ جاتی ہیں:',
        options: [
          { id: 'opt_a', textEn: 'Asthma', textUr: 'دمہ' },
          { id: 'opt_b', textEn: 'Emphysema (ایمفیسیما)', textUr: 'ایمفیسیما' },
          { id: 'opt_c', textEn: 'Bronchitis', textUr: 'برونکائٹس' },
        ],
        correctOptionId: 'opt_b',
        explanationEn: 'Emphysema destroys the alveolar walls, drastically reducing surface area for oxygen uptake.',
        explanationUr: 'ایمفیسیما میں ایلویولائی کی دیواریں تباہ ہو جاتی ہیں جس سے سانس پھولنے لگتا ہے۔',
        kptbbRef: 'KPTBB Class 10 Biology, Chapter 10',
        tags: ['respiratory_diseases'],
      },
    ],
  },

  // BISE Swat Physics Checkpoint
  quiz_10_phy_1: {
    id: 'quiz_10_phy_1',
    unitId: 'unit_10_phy_1',
    titleEn: 'BISE Swat Physics Mock Examination (Passing Mark: 33%)',
    titleUr: 'بورڈ آف سوات امتحانی پرچہ (کامیابی: 33 فیصد)',
    timeLimitMinutes: 15,
    passPercentage: 33,
    questions: [
      {
        id: 'q1',
        unitId: 'unit_10_phy_1',
        type: 'mcq',
        difficulty: 'easy',
        promptEn: 'What does the slope of a displacement-time graph represent?',
        promptUr: 'فاصلہ اور وقت کے گراف کا سلوپ (Slope) کیا ظاہر کرتا ہے؟',
        options: [
          { id: 'opt_a', textEn: 'Acceleration', textUr: 'ایکسلریشن' },
          { id: 'opt_b', textEn: 'Velocity (ولاسٹی)', textUr: 'ولاسٹی (Velocity)' },
          { id: 'opt_c', textEn: 'Force', textUr: 'فورس' },
        ],
        correctOptionId: 'opt_b',
        explanationEn: 'Slope = Change in displacement / Change in time = Velocity.',
        explanationUr: 'سلوپ = فاصلے میں تبدیلی / وقت میں تبدیلی = ولاسٹی۔',
        kptbbRef: 'KPTBB Physics Class 10, Chapter 2',
        tags: ['graphs', 'kinematics'],
      },
    ],
  },

  // Primary Checkpoint
  quiz_1_math_1: {
    id: 'quiz_1_math_1',
    unitId: 'unit_1_math_1',
    titleEn: 'Primary Number Stars Quiz',
    titleUr: 'پہلی جماعت: موتی گنتی کوئز',
    timeLimitMinutes: 10,
    passPercentage: 33,
    questions: [
      {
        id: 'q1_m1',
        unitId: 'unit_1_math_1',
        type: 'mcq',
        difficulty: 'easy',
        promptEn: 'What number comes after 4? (چار کے بعد کیا آتا ہے؟)',
        promptUr: '4 کے بعد کون سا ہندسہ آتا ہے؟',
        options: [
          { id: 'opt_a', textEn: '3', textUr: '3' },
          { id: 'opt_b', textEn: '5 (پانچ)', textUr: '5 (پانچ)' },
          { id: 'opt_c', textEn: '6', textUr: '6' },
        ],
        correctOptionId: 'opt_b',
        explanationEn: '1, 2, 3, 4, 5! Five comes right after four.',
        explanationUr: 'شاباش! چار کے بعد پانچ آتا ہے۔',
        kptbbRef: 'KPTBB Class 1 Math',
        tags: ['counting'],
      },
    ],
  },

  // Universal Practice Quiz
  quiz_generic_pass: {
    id: 'quiz_generic_pass',
    unitId: 'unit_6_sci_1',
    titleEn: 'Chapter Mastery Checkpoint (Pass mark: 33%)',
    titleUr: 'سبق کی جانچ — کوئز (کامیابی: 33 فیصد)',
    timeLimitMinutes: 10,
    passPercentage: 33,
    questions: [
      {
        id: 'gq1',
        unitId: 'unit_6_sci_1',
        type: 'mcq',
        difficulty: 'easy',
        promptEn: 'Do plants make their own food using sunlight?',
        promptUr: 'کیا پودے سورج کی روشنی سے اپنی خوراک خود بناتے ہیں؟',
        options: [
          { id: 'opt_y', textEn: 'Yes (جی ہاں)', textUr: 'جی ہاں' },
          { id: 'opt_n', textEn: 'No (جی نہیں)', textUr: 'جی نہیں' },
        ],
        correctOptionId: 'opt_y',
        explanationEn: 'Plants produce glucose through photosynthesis!',
        explanationUr: 'پودے ضیائی تالیف (Photosynthesis) کے ذریعے خوراک بناتے ہیں۔',
        kptbbRef: 'KPTBB Science',
        tags: ['general'],
      },
    ],
  },
};

const header = fs.readFileSync(path.join(__dirname, 'curriculum_header.txt'), 'utf8');

const output = header +
  '\\nexport const UNITS: Unit[] = ' + JSON.stringify(units, null, 2) + ';\\n\\n' +
  'export const QUIZZES: Record<string, Quiz> = ' + JSON.stringify(quizzes, null, 2) + ';\\n';

const finalPath = path.join(__dirname, '..', 'src', 'data', 'curriculumData.ts');
fs.writeFileSync(finalPath, output);
console.log('Successfully generated full curriculumData.ts!');
