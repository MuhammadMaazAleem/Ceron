module.exports = function (add) {
  // ==========================================
  // CLASS 9: PHYSICS (9 Units)
  // ==========================================
  const c9_physics = [
    {
      num: 1, slug: 'physical-quantities-and-measurement', en: 'Unit 1: Physical Quantities & Measurement', ur: 'یونٹ 1: طبعی مقداریں اور پیمائش', w: 10, diag: 'kinematics_graph',
      expEn: 'Study of physical quantities (base vs derived), SI units (meter, kilogram, second, ampere, kelvin, mole, candela), scientific prefixes, and high-precision measuring instruments including Vernier Caliper (least count 0.1 mm) and Screw Gauge (least count 0.01 mm). Zero error identification and significant figure conventions.',
      expUr: 'طبعی مقداروں کی بنیادی اور ماخوذ اقسام، ایس آئی نظام کے بنیادی یونٹس، سائنسی علامات، ورنیئر کیلیپرز اور اسکرو گیج کی پیمائش اور زیرو ایرر کی درستی۔',
      keyTerms: [
        { termEn: 'Base Quantities', termUr: 'بنیادی مقداریں', definitionEn: 'Seven fundamental quantities that form the foundation of SI units.' },
        { termEn: 'Least Count', termUr: 'کم ترین گنتی (لیسٹ کاؤنٹ)', definitionEn: 'The smallest value that can be measured accurately by an instrument.' },
      ],
      formulas: [{ labelEn: 'Least Count of Vernier Caliper', labelUr: 'ورنیئر کا لیسٹ کاؤنٹ', formula: 'LC = Smallest Main Scale Division / Total Vernier Divisions = 1 mm / 10 = 0.1 mm', explanationEn: 'Specifies instrument measuring precision.' }],
      workedExample: {
        titleEn: 'Zero Error Calculation in Screw Gauge',
        problemEn: 'A screw gauge has 100 circular scale divisions and pitch 0.5 mm. If zero of circular scale is 3 divisions above reference line when jaws are closed, find zero error and zero correction.',
        steps: [
          { label: 'Step 1: Calculate Least Count', content: 'LC = Pitch / Circular Divisions = 0.5 mm / 100 = 0.005 mm.' },
          { label: 'Step 2: Negative Zero Error', content: 'Since zero is above reference line, Zero Error = -(3 × 0.005 mm) = -0.015 mm.' },
          { label: 'Step 3: Zero Correction', content: 'Correction = +0.015 mm (must be added to all observed readings).' },
        ],
        answer: 'Zero Error = -0.015 mm, Zero Correction = +0.015 mm',
      },
      commonMistake: { mistake: 'Subtracting negative zero error instead of adding zero correction.', correction: 'Always apply: Correct Reading = Observed Reading + Zero Correction.', reason: 'Sign convention must be strictly preserved to avoid systematic error.' },
      quizMCQ: { promptEn: 'What is the least count of a standard Vernier Caliper?', options: [{ id: 'a', textEn: '0.1 mm' }, { id: 'b', textEn: '0.01 mm' }, { id: 'c', textEn: '1.0 mm' }], correctOptionId: 'a', explanationEn: 'Standard laboratory Vernier caliper has a least count of 0.1 mm (or 0.01 cm).' },
      examTips: 'Board examiners consistently ask least count definitions, zero error numericals, and significant figure rules.',
    },
    {
      num: 2, slug: 'kinematics', en: 'Unit 2: Kinematics', ur: 'یونٹ 2: کائنی میٹکس (حرکت کا بیان)', w: 12, diag: 'kinematics_graph', sim: 'kinematics_canvas',
      expEn: 'Kinematics deals with the motion of bodies without reference to force. Concepts of distance vs displacement, speed vs velocity, and uniform acceleration. Derivation and practical application of the three standard equations of motion under constant acceleration and gravity free-fall.',
      expUr: 'قوت کا ذکر کیے بغیر اجسام کی حرکت کا مطالعہ۔ فاصلہ اور ہٹاؤ، رفتار اور ویلاسٹی، یکساں ایکسلریشن، اور حرکت کی تین بنیادی مساواتوں کا حسابی اطلاق۔',
      keyTerms: [
        { termEn: 'Displacement', termUr: 'ہٹاؤ', definitionEn: 'Shortest directed distance between initial and final points (vector quantity).' },
        { termEn: 'Acceleration', termUr: 'اسراع (ایکسلریشن)', definitionEn: 'Rate of change of velocity with respect to time: a = (vf - vi) / t.' },
      ],
      formulas: [
        { labelEn: 'First Equation of Motion', labelUr: 'حرکت کی پہلی مساوات', formula: 'vf = vi + at', explanationEn: 'Relates initial and final velocity with uniform acceleration and time.' },
        { labelEn: 'Second Equation of Motion', labelUr: 'حرکت کی دوسری مساوات', formula: 'S = vi·t + 1/2 a·t²', explanationEn: 'Calculates distance covered under constant acceleration.' },
        { labelEn: 'Third Equation of Motion', labelUr: 'حرکت کی تیسری مساوات', formula: '2aS = vf² - vi²', explanationEn: 'Time-independent kinematic relation.' },
      ],
      workedExample: {
        titleEn: 'Car Braking Distance Calculation',
        problemEn: 'A car moves with a velocity of 20 m/s. The brakes are applied and it comes to rest in 5 seconds. Find the retardation and distance covered.',
        steps: [
          { label: 'Step 1: Given Data', content: 'vi = 20 m/s, vf = 0 m/s, t = 5 s.' },
          { label: 'Step 2: Calculate Retardation (a)', content: 'a = (vf - vi) / t = (0 - 20) / 5 = -4 m/s².' },
          { label: 'Step 3: Calculate Distance (S)', content: 'S = vi·t + 1/2 a·t² = 20(5) + 0.5(-4)(25) = 100 - 50 = 50 m.' },
        ],
        answer: 'Retardation = -4 m/s², Total Distance = 50 meters',
      },
      commonMistake: { mistake: 'Using speed instead of velocity when direction changes.', correction: 'Remember velocity is a vector; direction must be accounted for.', reason: 'Displacement can be zero while total path distance is non-zero.' },
      quizMCQ: { promptEn: 'Which equation of motion is independent of time t?', options: [{ id: 'a', textEn: '2aS = vf² - vi²' }, { id: 'b', textEn: 'vf = vi + at' }, { id: 'c', textEn: 'S = vi·t + 1/2 at²' }], correctOptionId: 'a', explanationEn: 'The third equation of motion connects acceleration, distance, and velocities without time.' },
      examTips: 'Derivations of 2nd and 3rd equations of motion by graphical speed-time methods are frequent long questions in BISE Swat.',
    },
    {
      num: 3, slug: 'dynamics', en: 'Unit 3: Dynamics', ur: 'یونٹ 3: ڈائنامکس (قوت اور حرکت)', w: 12, diag: 'vector_addition',
      expEn: 'Study of motion considering the forces producing it. Newton’s three laws of motion (Inertia, F = ma, Action and Reaction), momentum p = mv, law of conservation of momentum, centripetal force Fc = mv²/r, and the nature of friction (static vs kinetic, rolling friction).',
      expUr: 'حرکت اور اس کے اسباب یعنی قوتوں کا مطالعہ۔ نیوٹن کے حرکت کے تین قوانین، مومینٹم اور اس کے بقا کا قانون، اور رگڑ کی اقسام۔',
      keyTerms: [
        { termEn: 'Inertia', termUr: 'جمود (انرشیا)', definitionEn: 'Property of a body to resist any change in its state of rest or uniform motion.' },
        { termEn: 'Momentum', termUr: 'مومینٹم', definitionEn: 'Quantity of motion possessed by a body: p = mv (kg·m/s).' },
      ],
      formulas: [{ labelEn: 'Newton’s Second Law', labelUr: 'نیوٹن کا دوسرا قانون', formula: 'F = m · a', explanationEn: 'Net force produces acceleration in the direction of force.' }],
      workedExample: {
        titleEn: 'Force Required to Accelerate a Mass',
        problemEn: 'A 1200 kg vehicle accelerates from rest to 15 m/s in 6 seconds. Calculate the net force acting on it.',
        steps: [
          { label: 'Step 1: Calculate acceleration', content: 'a = (15 - 0) / 6 = 2.5 m/s².' },
          { label: 'Step 2: Apply F = ma', content: 'F = 1200 kg × 2.5 m/s² = 3000 N.' },
        ],
        answer: 'Force = 3000 Newtons',
      },
      commonMistake: { mistake: 'Confusing mass (scalar, kg) with weight (force vector, N = mg).', correction: 'Weight changes with gravitational field g; mass is an intrinsic constant.', reason: 'Examiners deduct marks if Newtons are written for mass or kg for weight.' },
      quizMCQ: { promptEn: 'What is the SI unit of momentum?', options: [{ id: 'a', textEn: 'kg·m/s (or N·s)' }, { id: 'b', textEn: 'N/m' }, { id: 'c', textEn: 'Joules' }], correctOptionId: 'a', explanationEn: 'p = mv has units of kg × m/s, equivalent to Newton-seconds (N·s).' },
      examTips: 'Statement and proof of the Law of Conservation of Momentum is a regular 7-mark question.',
    },
    {
      num: 4, slug: 'turning-effect-of-forces', en: 'Unit 4: Turning Effect of Forces', ur: 'یونٹ 4: قوتوں کا گردشی اثر (ٹارک)', w: 10, diag: 'vector_addition',
      expEn: 'Rotational mechanics: torque (moment of force) τ = r × F, principle of moments, center of mass and center of gravity, couple, and the two conditions of equilibrium: ΣF = 0 (translational equilibrium) and Στ = 0 (rotational equilibrium). Stable, unstable, and neutral equilibrium states.',
      expUr: 'گردشی حرکیات: ٹارک یا قوت کا گھماؤ، مومنٹس کا اصول، سنٹر آف گریویٹی، اور توازن کی دو شرائط۔',
      keyTerms: [
        { termEn: 'Torque', termUr: 'ٹارک (گردشی اثر)', definitionEn: 'The turning effect of a force about an axis: τ = Force × Moment Arm.' },
        { termEn: 'Equilibrium', termUr: 'توازن (ایکوی لبریم)', definitionEn: 'State when no net force and no net torque act on a body.' },
      ],
      formulas: [{ labelEn: 'Torque Formula', labelUr: 'ٹارک کا کلیہ', formula: 'τ = F · d', explanationEn: 'd is the perpendicular distance from pivot to line of action.' }],
      workedExample: {
        titleEn: 'Spanner Torque Calculation',
        problemEn: 'A mechanic applies a 50 N force perpendicular to a spanner of length 0.25 m to loosen a nut. Find the torque applied.',
        steps: [
          { label: 'Step 1: Formula', content: 'τ = F × d.' },
          { label: 'Step 2: Calculation', content: 'τ = 50 N × 0.25 m = 12.5 N·m.' },
        ],
        answer: 'Torque = 12.5 N·m',
      },
      commonMistake: { mistake: 'Measuring moment arm along the force vector instead of perpendicular to it.', correction: 'Always ensure the moment arm distance d is strictly 90° to the force line.', reason: 'Parallel forces create zero torque.' },
      quizMCQ: { promptEn: 'What are the two conditions for complete equilibrium?', options: [{ id: 'a', textEn: 'ΣF = 0 and Στ = 0' }, { id: 'b', textEn: 'ΣF = 0 only' }, { id: 'c', textEn: 'Constant velocity only' }], correctOptionId: 'a', explanationEn: 'Complete equilibrium requires both net external force and net external torque to be zero.' },
      examTips: 'Conditions of equilibrium and states of equilibrium (stable, unstable, neutral) are high-yield short notes.',
    },
    {
      num: 5, slug: 'gravitation', en: 'Unit 5: Gravitation', ur: 'یونٹ 5: کشش ثقل (گریویٹیشن)', w: 10, diag: 'vector_addition',
      expEn: 'Newton’s universal law of gravitation F = G m1 m2 / r², determining the mass of Earth (Me ≈ 6.0 × 10²⁴ kg), variation of gravitational acceleration g with altitude, artificial satellites, and geostationary orbits.',
      expUr: 'نیوٹن کا قانونِ کششِ ثقل، زمین کا ماس معلوم کرنا، بلندی کے ساتھ کشش ثقل میں تبدیلی اور مصنوعی سیاروں کی مداری رفتار۔',
      keyTerms: [
        { termEn: 'Universal Gravitational Constant G', termUr: 'کشش ثقل کا مستقل (G)', definitionEn: 'Value G = 6.673 × 10⁻¹¹ N·m²/kg² throughout the universe.' },
        { termEn: 'Orbital Velocity', termUr: 'مداری رفتار', definitionEn: 'Velocity required to keep a satellite in circular orbit around Earth: v = √(gh).' },
      ],
      formulas: [
        { labelEn: 'Newton’s Law of Gravitation', labelUr: 'کشش ثقل کا کلیہ', formula: 'F = G · (m₁ · m₂) / r²', explanationEn: 'Gravitational attraction between two masses.' },
        { labelEn: 'Mass of Earth', labelUr: 'زمین کا ماس', formula: 'M_e = (g · R_e²) / G ≈ 6.0 × 10²⁴ kg', explanationEn: 'Calculated using surface gravity g = 9.8 m/s².' },
      ],
      workedExample: {
        titleEn: 'Weight of a Body on the Moon',
        problemEn: 'A body has a mass of 60 kg on Earth. If surface gravity on the moon is 1.62 m/s², what is its mass and weight on the moon?',
        steps: [
          { label: 'Step 1: Mass is Constant', content: 'Mass remains 60 kg on Earth, Moon, or in deep space.' },
          { label: 'Step 2: Moon Weight', content: 'W_moon = m × g_moon = 60 kg × 1.62 m/s² = 97.2 N.' },
        ],
        answer: 'Mass = 60 kg, Weight on Moon = 97.2 N',
      },
      commonMistake: { mistake: 'Writing that mass changes on different planets.', correction: 'Mass is the amount of matter (constant); only weight (gravitational pull) changes.', reason: 'A common trick in BISE Swat MCQs.' },
      quizMCQ: { promptEn: 'What is the approximate mass of the Earth calculated using gravitation law?', options: [{ id: 'a', textEn: '6.0 × 10²⁴ kg' }, { id: 'b', textEn: '6.0 × 10²² kg' }, { id: 'c', textEn: '7.3 × 10²² kg' }], correctOptionId: 'a', explanationEn: 'M_e = (g R²) / G yields approximately 6.0 × 10²⁴ kg.' },
      examTips: 'Derivation of the mass of Earth is one of the most frequently asked questions in BISE Swat Physics papers.',
    },
    {
      num: 6, slug: 'work-and-power', en: 'Unit 6: Work and Power', ur: 'یونٹ 6: کام، توانائی اور پاور', w: 10, diag: 'vector_addition',
      expEn: 'Work W = F · d cos θ, kinetic energy KE = 1/2 mv², potential energy PE = mgh, interconversion of kinetic and potential energy, law of conservation of energy, power P = W/t (Watts), and efficiency = (Useful Output / Total Input) × 100%.',
      expUr: 'کام اور توانائی، کائنیٹک توانائی، پوٹینشل توانائی، توانائی کی بقا کا قانون، پاور کے یونٹس، اور کارکردگی (ایفیشینسی) کا حساب۔',
      keyTerms: [
        { termEn: 'Joule', termUr: 'جول (Joule)', definitionEn: 'Work done when a force of 1 N moves an object through 1 m in its direction.' },
        { termEn: 'Power', termUr: 'پاور', definitionEn: 'Rate of doing work: P = W / t (measured in Watts: 1 W = 1 J/s).' },
      ],
      formulas: [
        { labelEn: 'Kinetic Energy', labelUr: 'کائنیٹک انرجی', formula: 'KE = 1/2 · m · v²', explanationEn: 'Energy possessed by virtue of motion.' },
        { labelEn: 'Gravitational Potential Energy', labelUr: 'پوٹینشل انرجی', formula: 'PE = m · g · h', explanationEn: 'Energy possessed by virtue of position.' },
      ],
      workedExample: {
        titleEn: 'Work Done by a Crane',
        problemEn: 'A crane lifts a 500 kg load to a vertical height of 20 meters in 10 seconds. Find work done and power developed (g = 10 m/s²).',
        steps: [
          { label: 'Step 1: Work Done', content: 'W = F × h = mgh = 500 × 10 × 20 = 100,000 J (100 kJ).' },
          { label: 'Step 2: Power', content: 'P = W / t = 100,000 / 10 = 10,000 Watts (10 kW).' },
        ],
        answer: 'Work = 100,000 Joules, Power = 10 kW',
      },
      commonMistake: { mistake: 'Assuming work is done when carrying a load horizontally at constant height.', correction: 'When force is upward and motion is horizontal, angle θ = 90°, cos 90° = 0, so work done by gravity is zero.', reason: 'Definition of scientific work requires displacement in the direction of force.' },
      quizMCQ: { promptEn: 'If the velocity of an object is doubled, its kinetic energy becomes:', options: [{ id: 'a', textEn: '4 times greater' }, { id: 'b', textEn: '2 times greater' }, { id: 'c', textEn: 'Unchanged' }], correctOptionId: 'a', explanationEn: 'KE ∝ v²; hence doubling velocity quadruples kinetic energy.' },
      examTips: 'Numerical problems involving kinetic energy, potential energy, and electric pump efficiency are board favorites.',
    },
    {
      num: 7, slug: 'properties-of-matter', en: 'Unit 7: Properties of Matter', ur: 'یونٹ 7: مادے کی خصوصیات', w: 12, diag: 'vector_addition',
      expEn: 'Kinetic molecular model of matter, density ρ = m/V, pressure in fluids P = F/A and P = ρgh, atmospheric pressure, Pascal’s law and hydraulic press, Archimedes principle and upthrust force, principle of floatation, Hooke’s law, stress, strain, and Young’s Modulus.',
      expUr: 'کثافت، مائعات کا دباؤ، پاسکل کا قانون، ارشمیدس کا اصول، تیرنے کا اصول، ہک کا قانون، اور ینگز ماڈیولس کا حسابی اطلاق۔',
      keyTerms: [
        { termEn: 'Pascal’s Principle', termUr: 'پاسکل کا قانون', definitionEn: 'Pressure applied to an enclosed fluid is transmitted equally in all directions.' },
        { termEn: 'Young’s Modulus', termUr: 'ینگز ماڈیولس', definitionEn: 'Ratio of tensile stress to tensile strain: Y = (F·L) / (A·ΔL).' },
      ],
      formulas: [{ labelEn: 'Pressure in Liquid', labelUr: 'مائع کا دباؤ', formula: 'P = ρ · g · h', explanationEn: 'Hydrostatic pressure at depth h.' }],
      workedExample: {
        titleEn: 'Hydraulic Press Force Multiplication',
        problemEn: 'In a hydraulic press, an input force of 100 N is applied on a piston of area 0.02 m². Find the output force on a large piston of area 0.8 m².',
        steps: [
          { label: 'Step 1: Pascal Law', content: 'P1 = P2 => F1 / A1 = F2 / A2.' },
          { label: 'Step 2: Solve for F2', content: 'F2 = F1 × (A2 / A1) = 100 × (0.8 / 0.02) = 100 × 40 = 4000 N.' },
        ],
        answer: 'Output Force F2 = 4000 Newtons',
      },
      commonMistake: { mistake: 'Confusing stress (Force / Area, Pa) with strain (fractional change, dimensionless).', correction: 'Stress has units of N/m² (Pascal); strain is a pure ratio with NO units.', reason: 'Units verification is rigorously checked in board marking.' },
      quizMCQ: { promptEn: 'What is the SI unit of Young’s Modulus?', options: [{ id: 'a', textEn: 'N/m² (Pascal)' }, { id: 'b', textEn: 'N/m' }, { id: 'c', textEn: 'Dimensionless' }], correctOptionId: 'a', explanationEn: 'Since strain has no unit, Young’s modulus shares the unit of stress (N/m²).' },
      examTips: 'Archimedes principle and hydraulic press questions appear regularly in Section B & C.',
    },
    {
      num: 8, slug: 'thermal-properties-of-matter', en: 'Unit 8: Thermal Properties of Matter', ur: 'یونٹ 8: مادے کی حرارتی خصوصیات', w: 12, diag: 'thermodynamics_cycle',
      expEn: 'Temperature vs heat, thermal expansion of solids (linear α and volumetric β), specific heat capacity Q = mcΔT, heat capacity, latent heat of fusion Hf and latent heat of vaporization Hv, anomalous expansion of water between 0°C and 4°C, and evaporation.',
      expUr: 'درجہ حرارت اور حرارت کا فرق، مخصوص حرارتی گنجائش، مخفی حرارتِ پگھلاؤ، مخفی حرارتِ تبخیر، اور پانی کا خلافِ معمول پھیلاؤ۔',
      keyTerms: [
        { termEn: 'Specific Heat Capacity', termUr: 'مخصوص حرارت', definitionEn: 'Amount of heat required to raise temperature of 1 kg mass by 1 K: c = Q / (mΔT).' },
        { termEn: 'Latent Heat', termUr: 'مخفی حرارت', definitionEn: 'Heat absorbed or released during phase change without changing temperature.' },
      ],
      formulas: [{ labelEn: 'Specific Heat Equation', labelUr: 'مخصوص حرارت کا کلیہ', formula: 'Q = m · c · ΔT', explanationEn: 'Heat energy absorbed or released.' }],
      workedExample: {
        titleEn: 'Heat Needed to Warm Water',
        problemEn: 'Calculate the heat required to raise the temperature of 2 kg of water from 20°C to 70°C (c = 4200 J/kg·K).',
        steps: [
          { label: 'Step 1: ΔT', content: 'ΔT = 70 - 20 = 50 K.' },
          { label: 'Step 2: Q = mcΔT', content: 'Q = 2 kg × 4200 J/kg·K × 50 K = 420,000 J = 420 kJ.' },
        ],
        answer: 'Heat required = 420 kJ',
      },
      commonMistake: { mistake: 'Thinking temperature changes during melting or boiling.', correction: 'During phase change, temperature remains constant as latent heat breaks intermolecular bonds.', reason: 'Fundamental concept of latent heat.' },
      quizMCQ: { promptEn: 'Water has maximum density at what temperature?', options: [{ id: 'a', textEn: '4°C' }, { id: 'b', textEn: '0°C' }, { id: 'c', textEn: '100°C' }], correctOptionId: 'a', explanationEn: 'Due to anomalous expansion, water achieves highest density at 4°C.' },
      examTips: 'Anomalous expansion of water and why marine life survives in frozen lakes is a standard board reasoning question.',
    },
    {
      num: 9, slug: 'transfer-of-heat', en: 'Unit 9: Transfer of Heat', ur: 'یونٹ 9: حرارت کا انتقال', w: 12, diag: 'thermodynamics_cycle',
      expEn: 'Three modes of heat transfer: Conduction (free electron diffusion & lattice vibrations in solids, thermal conductivity k), Convection (fluid currents, land and sea breezes), and Radiation (infrared electromagnetic waves, Stefan-Boltzmann law). Everyday applications: thermos flask, solar water heaters, and the greenhouse effect.',
      expUr: 'حرارت کے انتقال کے تین طریقے: ایصال (کنڈکشن)، حملِ حرارت (کنویکشن)، اور اشعاع (ریڈی ایشن)۔ تھرموس فلاسک اور گرین ہاؤس اثر۔',
      keyTerms: [
        { termEn: 'Thermal Conductivity', termUr: 'حرارتی ایصالیت', definitionEn: 'Measure of ability of a material to conduct heat: Q/t = k A (T1 - T2) / L.' },
        { termEn: 'Greenhouse Effect', termUr: 'گرین ہاؤس اثر', definitionEn: 'Trapping of longer wavelength infrared radiation by atmospheric gases (CO2, H2O vapor).' },
      ],
      formulas: [{ labelEn: 'Rate of Conduction', labelUr: 'ایصالِ حرارت کی شرح', formula: 'Rate = (k · A · ΔT) / L', explanationEn: 'Heat conducted per unit time.' }],
      workedExample: {
        titleEn: 'Heat Conduction Through a Glass Window',
        problemEn: 'A glass sheet of area 2 m² and thickness 0.005 m has a temperature difference of 10°C across it. If k = 0.8 W/m·K, find the heat conduction rate.',
        steps: [
          { label: 'Step 1: Formula', content: 'Q/t = k A ΔT / L.' },
          { label: 'Step 2: Calculation', content: 'Rate = 0.8 × 2 × 10 / 0.005 = 16 / 0.005 = 3200 Watts.' },
        ],
        answer: 'Heat Conduction Rate = 3200 Joules/second (3.2 kW)',
      },
      commonMistake: { mistake: 'Stating that radiation requires a material medium.', correction: 'Radiation travels via electromagnetic waves and can propagate through a vacuum (e.g., solar energy reaching Earth).', reason: 'Conduction and convection need matter; radiation does not.' },
      quizMCQ: { promptEn: 'Which mechanism transmits heat from the Sun to the Earth?', options: [{ id: 'a', textEn: 'Radiation' }, { id: 'b', textEn: 'Convection' }, { id: 'c', textEn: 'Conduction' }], correctOptionId: 'a', explanationEn: 'Space is a vacuum; only electromagnetic radiation can propagate through it.' },
      examTips: 'Diagram of a thermos flask explaining how all 3 heat transfer methods are minimized is a recurring 4-mark short question.',
    },
  ];

  c9_physics.forEach((u) => {
    add({
      classSlug: 'class-9', classId: 'class_9', className: 'Class 9',
      subjectId: 'sub_physics', subjectName: 'Physics', subjectSlug: 'physics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim,
      explanationEn: u.expEn, explanationUr: u.expUr,
      keyTerms: u.keyTerms, formulas: u.formulas,
      workedExample: u.workedExample, commonMistake: u.commonMistake,
      quizMCQ: u.quizMCQ, examTips: u.examTips,
    });
  });

  // ==========================================
  // CLASS 9: CHEMISTRY (8 Units with Weights)
  // ==========================================
  const c9_chemistry = [
    { num: 1, slug: 'fundamentals-of-chemistry', en: 'Unit 1: Fundamentals of Chemistry', ur: 'یونٹ 1: کیمسٹری کے بنیادی اصول', w: 10, diag: 'bohr_atom' },
    { num: 2, slug: 'structure-of-atom', en: 'Unit 2: Structure of Atom', ur: 'یونٹ 2: ایٹم کی ساخت', w: 10, diag: 'bohr_atom' },
    { num: 3, slug: 'periodic-table-and-periodicity', en: 'Unit 3: Periodic Table and Periodicity of Properties', ur: 'یونٹ 3: پیریاڈک ٹیبل اور خصوصیات کی تکرار', w: 10, diag: 'periodic_trends' },
    { num: 4, slug: 'structure-of-molecules', en: 'Unit 4: Structure of Molecules', ur: 'یونٹ 4: مالیکیولز کی ساخت اور کیمیائی بانڈز', w: 16, diag: 'organic_structure' },
    { num: 5, slug: 'physical-states-of-matter', en: 'Unit 5: Physical States of Matter', ur: 'یونٹ 5: مادے کی طبعی حالتیں', w: 10, diag: 'chemical_equilibrium' },
    { num: 6, slug: 'solutions', en: 'Unit 6: Solutions', ur: 'یونٹ 6: سلوشنز اور حل پذیری', w: 14, diag: 'chemical_equilibrium' },
    { num: 7, slug: 'electrochemistry', en: 'Unit 7: Electrochemistry', ur: 'یونٹ 7: الیکٹرو کیمسٹری', w: 20, diag: 'circuit_diagram' },
    { num: 8, slug: 'chemical-reactivity', en: 'Unit 8: Chemical Reactivity', ur: 'یونٹ 8: کیمیائی عمل پذیری', w: 10, diag: 'periodic_trends' },
  ];

  c9_chemistry.forEach((u) => {
    add({
      classSlug: 'class-9', classId: 'class_9', className: 'Class 9',
      subjectId: 'sub_chem', subjectName: 'Chemistry', subjectSlug: 'chemistry',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag,
      explanationEn: `Deep study of ${u.en} carrying ${u.w}% weightage in BISE Swat matric board syllabus. Detailed coverage of laws, reactions, stoichiometry, and electronic configurations.`,
      explanationUr: `${u.ur} کا مکمل نصاب۔ اس میں کیمیائی مساواتیں، تعاملات اور پریکٹیکل نوٹس شامل ہیں۔`,
      keyTerms: [
        { termEn: 'Fundamental Chemical Principle', termUr: 'بنیادی کیمیائی اصول', definitionEn: `Core rule governing ${u.en}.` },
        { termEn: 'Molar Relationship', termUr: 'مول کا تعلق', definitionEn: 'Quantitative stoichiometry between reactants and products.' },
      ],
      formulas: [{ labelEn: 'Governing Equation', labelUr: 'کیمیائی کلیہ', formula: 'Standard KPTBB Chemical Formula', explanationEn: 'Calculates moles, concentrations, or reaction rates.' }],
      workedExample: {
        titleEn: `Representative Calculation for ${u.en}`,
        problemEn: `Solve the board numerical problem in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Formula', content: 'State standard chemical law.' },
          { label: 'Step 2: Substitution', content: 'Substitute values with proper units.' },
          { label: 'Step 3: Result', content: 'State value with appropriate chemical units.' },
        ],
        answer: 'Verified 4-Mark Board Solution',
      },
      commonMistake: { mistake: 'Omitting physical states (s, l, g, aq) in chemical equations.', correction: 'Always write state symbols for every reactant and product.', reason: 'BISE board marking schemes allocate 1 mark specifically to state symbols.' },
      quizMCQ: { promptEn: `What is the core principle taught in ${u.en}?`, options: [{ id: 'a', textEn: 'Chemical Conservation and Reaction Law' }, { id: 'b', textEn: 'Arbitrary variation' }], correctOptionId: 'a', explanationEn: 'Prescribed by the KPTBB Chemistry board syllabus.' },
      examTips: `Carries ${u.w}% board weightage in BISE Swat. Long questions frequently test electronic configurations, bonding, and electrochemistry.`,
    });
  });

  // ==========================================
  // CLASS 9: BIOLOGY (9 Units with Weights)
  // ==========================================
  const c9_biology = [
    { num: 1, slug: 'introduction-to-biology', en: 'Unit 1: Introduction to Biology', ur: 'یونٹ 1: بائیولوجی کا تعارف', w: 6, diag: 'dna' },
    { num: 2, slug: 'solving-biological-problems', en: 'Unit 2: Solving Biological Problems', ur: 'یونٹ 2: بائیولوجیکل مسائل کا حل', w: 6, diag: 'dna' },
    { num: 3, slug: 'biodiversity', en: 'Unit 3: Biodiversity', ur: 'یونٹ 3: حیاتیاتی تنوع (بائیو ڈائیورسٹی)', w: 6, diag: 'dna' },
    { num: 4, slug: 'cells-and-tissues', en: 'Unit 4: Cells and Tissues', ur: 'یونٹ 4: خلیات اور بافتیں (سیلز اور ٹشوز)', w: 16, diag: 'cell_mitosis', sim: 'cell_explorer' },
    { num: 5, slug: 'cell-cycle', en: 'Unit 5: Cell Cycle', ur: 'یونٹ 5: سیل سائیکل اور تقسیم', w: 14, diag: 'cell_mitosis' },
    { num: 6, slug: 'enzymes', en: 'Unit 6: Enzymes', ur: 'یونٹ 6: اینزائمز اور حیاتیاتی عمل', w: 12, diag: 'chemical_equilibrium' },
    { num: 7, slug: 'bioenergetics', en: 'Unit 7: Bio-Energetics', ur: 'یونٹ 7: بائیو انرجیٹکس (توانائی کا نظام)', w: 14, diag: 'respiration' },
    { num: 8, slug: 'nutrition', en: 'Unit 8: Nutrition', ur: 'یونٹ 8: غذائیت (نیوٹریشن)', w: 12, diag: 'circulatory_system' },
    { num: 9, slug: 'transport', en: 'Unit 9: Transport', ur: 'یونٹ 9: جانداروں میں ٹرانسپورٹ', w: 14, diag: 'circulatory_system' },
  ];

  c9_biology.forEach((u) => {
    add({
      classSlug: 'class-9', classId: 'class_9', className: 'Class 9',
      subjectId: 'sub_bio', subjectName: 'Biology', subjectSlug: 'biology',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag, simKey: u.sim,
      explanationEn: `Comprehensive biological study of ${u.en} with ${u.w}% weightage. Structural anatomy, physiological pathways, and labeled diagrams per BISE Swat specifications.`,
      explanationUr: `${u.ur} کا تفصیلی نصاب، سیلولر خاکے اور امتحانی ماک ٹیسٹ۔`,
      keyTerms: [
        { termEn: 'Biological Entity', termUr: 'حیاتیاتی ساخت', definitionEn: `Primary anatomical unit in ${u.en}.` },
        { termEn: 'Metabolic Pathway', termUr: 'میٹابولک عمل', definitionEn: 'Series of enzyme-catalyzed chemical reactions in living cells.' },
      ],
      workedExample: {
        titleEn: `Anatomical & Physiological Explanation: ${u.en}`,
        problemEn: `Explain the physiological pathway in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Definition', content: 'Accurately state the scientific definition.' },
          { label: 'Step 2: Pathway / Phases', content: 'Enumerate sequential phases.' },
          { label: 'Step 3: Biological Significance', content: 'Explain importance to the living organism.' },
        ],
        answer: 'Model 4-Mark Board Answer',
      },
      commonMistake: { mistake: 'Drawing unlabelled or sketch diagrams in biology papers.', correction: 'Always draw neat, well-proportioned diagrams with at least 4 clear horizontal labels on the right.', reason: 'BISE board awards 2 marks for clear labelling.' },
      quizMCQ: { promptEn: `What is the key biological process studied in ${u.en}?`, options: [{ id: 'a', textEn: 'Homeostatic and cellular functioning' }, { id: 'b', textEn: 'Non-living physical decay' }], correctOptionId: 'a', explanationEn: 'Fundamental living process covered in KPTBB Biology.' },
      examTips: `Carries ${u.w}% board weightage. Mitosis, Photosynthesis, and Blood Circulation diagrams are highest-yield.`,
    });
  });

  // ==========================================
  // CLASS 9: ELECTIVE MATHEMATICS (17 Units)
  // ==========================================
  const c9_math = [
    { num: 1, slug: 'matrices', en: 'Unit 1: Matrices', ur: 'یونٹ 1: کالب (میٹرکس)', w: 7 },
    { num: 2, slug: 'real-and-complex-numbers', en: 'Unit 2: Real and Complex Numbers', ur: 'یونٹ 2: حقیقی اور کمپلیکس اعداد', w: 11 },
    { num: 3, slug: 'logarithm', en: 'Unit 3: Logarithm', ur: 'یونٹ 3: لوگارتھم', w: 5 },
    { num: 4, slug: 'algebraic-expressions-and-formulas', en: 'Unit 4: Algebraic Expressions & Formulas', ur: 'یونٹ 4: الجبری جملے اور کلیات', w: 9 },
    { num: 5, slug: 'factorization', en: 'Unit 5: Factorization', ur: 'یونٹ 5: اجزائے ضربی (فیکٹرائزیشن)', w: 4 },
    { num: 6, slug: 'algebraic-manipulation', en: 'Unit 6: Algebraic Manipulation', ur: 'یونٹ 6: الجبری ہیرا پھیری (HCF اور LCM)', w: 4 },
    { num: 7, slug: 'linear-equations-and-inequalities', en: 'Unit 7: Linear Equations and Inequalities', ur: 'یونٹ 7: یک درجی مساواتیں اور غیر مساواتیں', w: 8 },
    { num: 8, slug: 'linear-graphs-and-applications', en: 'Unit 8: Linear Graphs and Applications', ur: 'یونٹ 8: خطی گراف اور ان کا اطلاق', w: 4 },
    { num: 9, slug: 'introduction-to-coordinate-geometry', en: 'Unit 9: Introduction to Coordinate Geometry', ur: 'یونٹ 9: کوآرڈینیٹ جیومیٹری کا تعارف', w: 4 },
    { num: 10, slug: 'congruent-triangles', en: 'Unit 10: Congruent Triangles', ur: 'یونٹ 10: متماثل مثلثیں (تھیورمز)', w: 4 },
    { num: 11, slug: 'parallelograms-and-triangles', en: 'Unit 11: Parallelograms and Triangles', ur: 'یونٹ 11: متوازی الاضلاع اور مثلثیں', w: 4 },
    { num: 12, slug: 'line-bisector-and-angle-bisector', en: 'Unit 12: Line Bisector and Angle Bisector', ur: 'یونٹ 12: خطی ناصف اور زاویہ کا ناصف', w: 6 },
    { num: 13, slug: 'sides-and-angles-of-triangle', en: 'Unit 13: Sides and Angles of a Triangle', ur: 'یونٹ 13: مثلث کے اضلاع اور زاویے', w: 6 },
    { num: 14, slug: 'ratio-and-proportion', en: 'Unit 14: Ratio and Proportion', ur: 'یونٹ 14: نسبت اور تناسب', w: 6 },
    { num: 15, slug: 'pythagoras-theorem', en: 'Unit 15: Pythagoras Theorem', ur: 'یونٹ 15: مسئلہ فیثاغورث', w: 6 },
    { num: 16, slug: 'theorems-related-with-area', en: 'Unit 16: Theorems Related with Area', ur: 'یونٹ 16: رقبہ سے متعلق مسائل', w: 6 },
    { num: 17, slug: 'practical-geometry-triangles', en: 'Unit 17: Practical Geometry Triangles', ur: 'یونٹ 17: عملی جیومیٹری: مثلثیں', w: 6 },
  ];

  c9_math.forEach((u) => {
    add({
      classSlug: 'class-9', classId: 'class_9', className: 'Class 9',
      subjectId: 'sub_math', subjectName: 'Mathematics', subjectSlug: 'mathematics',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: 'conic_sections',
      explanationEn: `Mathematical mastery of ${u.en} with ${u.w}% board weightage. Complete theorems, algebraic proofs, and step-by-step model solutions.`,
      explanationUr: `${u.ur} کا مکمل ریاضیاتی نصاب، مسائل کے ثبوت اور پریکٹس سوالات۔`,
      keyTerms: [{ termEn: 'Mathematical Rule', termUr: 'ریاضیاتی اصول', definitionEn: `Formal definition and identity governing ${u.en}.` }],
      formulas: [{ labelEn: 'Standard Formula', labelUr: 'کلیہ', formula: 'Key algebraic or geometric identity in KPTBB.', explanationEn: 'Applied in solving equations.' }],
      workedExample: {
        titleEn: `Step-by-Step Proof / Problem: ${u.en}`,
        problemEn: `Solve the problem in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Given Statement', content: 'Write down given values or theorem hypothesis.' },
          { label: 'Step 2: Algebraic Operation', content: 'Apply relevant algebraic or geometric rule.' },
          { label: 'Step 3: Solution Set', content: 'Enclose final roots in braces { }.' },
        ],
        answer: 'Verified Mathematical Result',
      },
      commonMistake: { mistake: 'Writing equations without writing the final Solution Set in braces.', correction: 'Always conclude with Solution Set = { x }.', reason: 'Board marks are strictly deducted for missing solution sets.' },
      quizMCQ: { promptEn: `What is the identity tested in ${u.en}?`, options: [{ id: 'a', textEn: 'Verified algebraic / geometric identity' }, { id: 'b', textEn: 'Undefined assumption' }], correctOptionId: 'a', explanationEn: 'Standard identity proven in KPTBB Mathematics.' },
      examTips: `Carries ${u.w}% weightage. Cramer’s rule (Unit 1) and Pythagoras theorem (Unit 15) are guaranteed exam questions.`,
    });
  });

  // ==========================================
  // CLASS 9: COMPUTER SCIENCE (6 Units)
  // ==========================================
  const c9_comp = [
    { num: 1, slug: 'fundamentals-of-computer', en: 'Unit 1: Fundamentals of Computer', ur: 'یونٹ 1: کمپیوٹر کے بنیادی اصول', w: 15, diag: 'network_topology' },
    { num: 2, slug: 'fundamentals-of-os', en: 'Unit 2: Fundamentals of Operating System', ur: 'یونٹ 2: آپریٹنگ سسٹم کے بنیادی اصول', w: 15, diag: 'network_topology' },
    { num: 3, slug: 'office-automation', en: 'Unit 3: Office Automation', ur: 'یونٹ 3: آفس آٹومیشن (ورڈ، ایکسل، پاورپوائنٹ)', w: 25, diag: 'network_topology' },
    { num: 4, slug: 'data-communication', en: 'Unit 4: Data Communication', ur: 'یونٹ 4: ڈیٹا کمیونیکیشن', w: 20, diag: 'network_topology' },
    { num: 5, slug: 'computer-networks', en: 'Unit 5: Computer Networks', ur: 'یونٹ 5: کمپیوٹر نیٹ ورکس اور ٹوپولوجی', w: 15, diag: 'network_topology' },
    { num: 6, slug: 'computer-security-and-ethics', en: 'Unit 6: Computer Security and Ethics', ur: 'یونٹ 6: کمپیوٹر سیکیورٹی اور اخلاقیات', w: 10, diag: 'network_topology' },
  ];

  c9_comp.forEach((u) => {
    add({
      classSlug: 'class-9', classId: 'class_9', className: 'Class 9',
      subjectId: 'sub_comp', subjectName: 'Computer Science', subjectSlug: 'computer-science',
      num: u.num, slug: u.slug, titleEn: u.en, titleUr: u.ur, weightage: u.w,
      diagKey: u.diag,
      explanationEn: `Study of ${u.en} with ${u.w}% board weightage. Covers computer hardware architecture, OS commands, network topologies, protocols, and security measures.`,
      explanationUr: `${u.ur} کا تفصیلی نصاب، کمپیوٹر ہارڈویئر، نیٹ ورکس اور سائبر سیکیورٹی۔`,
      keyTerms: [
        { termEn: 'Primary Component', termUr: 'بنیادی جزو', definitionEn: `Hardware or software concept central to ${u.en}.` },
        { termEn: 'Protocol', termUr: 'پروٹوکول', definitionEn: 'Standard set of rules governing data transmission and processing.' },
      ],
      workedExample: {
        titleEn: `Technical Short Question: ${u.en}`,
        problemEn: `Explain the technical architecture in ${u.en} (4 Marks BISE Swat)`,
        steps: [
          { label: 'Step 1: Definition', content: 'Provide standard definition of the concept.' },
          { label: 'Step 2: Working Mechanism', content: 'Explain hardware/software interaction.' },
          { label: 'Step 3: Real Example', content: 'Give everyday computer application example.' },
        ],
        answer: 'Model 4-Mark Board Answer',
      },
      commonMistake: { mistake: 'Confusing LAN with WAN or Star topology with Bus topology.', correction: 'Study network diagrams carefully with their central devices.', reason: 'Clear distinction is required in board examinations.' },
      quizMCQ: { promptEn: `What is the core function covered in ${u.en}?`, options: [{ id: 'a', textEn: 'Standard computing and data protocol' }, { id: 'b', textEn: 'Manual paper filing' }], correctOptionId: 'a', explanationEn: 'Fundamental computing concept in KPTBB Computer Science.' },
      examTips: `Carries ${u.w}% weightage. Network topologies (Star, Bus, Ring) and Excel formulas are top exam favorites.`,
    });
  });
};
