import { env } from '../config/env';
import { Unit, SolvedExerciseItem, PastPaperQuestion } from '../types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Candidate models in order of priority (with automatic failover)
const CANDIDATE_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'allam-2-7b',
  'qwen/qwen3.8-27b',
];

const VISION_MODELS = [
  'llama-3.2-11b-vision-preview',
  'llama-3.2-90b-vision-preview',
];

export interface AITutorRequest {
  question: string;
  chapterTitle: string;
  subjectName: string;
  className: string;
  keyFormulas?: string[];
  keyTerms?: string[];
  language?: 'en' | 'ur' | 'bilingual';
}

export interface AITutorResponse {
  success: boolean;
  questionTitle: string;
  marks: number;
  rubric: { item: string; marks: string }[];
  givenData?: { label: string; value: string }[];
  formula?: string;
  stepByStepSolution: string[];
  finalAnswerEn: string;
  finalAnswerUr: string;
  examinerTip: string;
  rawText?: string;
  error?: string;
}

export interface DeepLessonRequest {
  topicTitle: string;
  topicNumber?: string | number;
  chapterTitle: string;
  subjectName: string;
  className: string;
}

export interface DeepLessonResult {
  success: boolean;
  markdownContent: string;
  error?: string;
}

export interface AnswerEvaluationRequest {
  questionText: string;
  maxMarks: number;
  studentAnswer?: string;
  imageBase64?: string;
  subjectName: string;
  chapterTitle: string;
  className: string;
}

export interface PaperCheckerQuestion {
  id: string;
  type: 'short' | 'long';
  marks: number;
  section: string;
  questionEn: string;
  questionUr: string;
  modelAnswerEn: string;
  modelAnswerUr?: string;
  keyTerms?: string[];
  boardTip?: string;
}

export interface PaperCheckerQuestionsResult {
  shortQ: PaperCheckerQuestion;
  longQ: PaperCheckerQuestion;
}

export interface AnswerEvaluationResult {
  success: boolean;
  awardedMarks: number;
  maxMarks: number;
  gradePercentage: number;
  feedbackSummary: string;
  rubricItems: { criteria: string; marksAwarded: number; maxPossible: number; note: string }[];
  missingKeyTerms: string[];
  strengths: string[];
  examinerTips: string;
  modelAnswer: string;
  error?: string;
}

export interface CramSheetRequest {
  chapterTitle: string;
  chapterNumber: number | string;
  subjectName: string;
  className: string;
}

export interface CramSheetResult {
  success: boolean;
  markdownContent: string;
  error?: string;
}

const BISE_SWAT_SYSTEM_PROMPT = `You are "Ceron AI Tutor" — an expert BISE Swat Board Examination coach and KPTBB (Khyber Pakhtunkhwa Textbook Board) curriculum master teacher.

Your mission is to provide COMPREHENSIVE, THOROUGH, and DEEPLY DETAILED model answers for Class 9, 10, 11, and 12 students in Swat, KPK.
NEVER produce short, one-sentence, or superficial answers. Always provide an authoritative, textbook-grade masterclass explanation structured with clear headings.

STRICT FORMATTING RULES — ALWAYS RETURN VALID JSON ONLY:

1. For NUMERICAL PROBLEMS:
{
  "type": "numerical",
  "marks": 4,
  "rubric": ["Given Data & SI Conversions (1 Mark)", "Governing Formula (1 Mark)", "Step-by-Step Calculation (1 Mark)", "Final Answer with SI Unit (1 Mark)"],
  "givenData": [{"label": "Parameter Name", "value": "Value with unit"}],
  "formula": "Governing Equation (e.g. F = m * a)",
  "steps": [
    "Step 1 (Given Parameters & Unit Analysis): State all given quantities with proper symbols and convert to SI units.",
    "Step 2 (Governing Principle & Formula Selection): State the law or principle being applied and write the formula.",
    "Step 3 (Detailed Algebraic Substitution): Substitute the values step-by-step showing every intermediate algebraic step.",
    "Step 4 (Calculation & Dimensional Check): Perform the exact arithmetic and verify unit consistency."
  ],
  "finalAnswer": "Final calculated value with magnitude and SI unit.",
  "finalAnswerUr": "حتمی جواب: عددی قیمت اور ایس آئی یونٹ کے ساتھ مکمل وضاحت۔",
  "examinerTip": "Common student pitfall in Swat board exams (e.g., forgetting to convert cm to m, missing SI units)."
}

2. For CONCEPTUAL, DESCRIPTIVE, OR THEORETICAL QUESTIONS:
{
  "type": "conceptual",
  "marks": 8,
  "rubric": [
    "Formal Scientific Definition & Scope (2 Marks)",
    "Underlying Mechanisms & Theoretical Principles (2 Marks)",
    "Formulas, Chemical Equations, or Structural Diagram Analysis (2 Marks)",
    "Real-World Board Applications & Examiner Distinction Points (2 Marks)"
  ],
  "formula": "Key Governing Equation / Law (or null if purely qualitative)",
  "steps": [
    "1. Comprehensive Formal Definition: Provide an exact, textbook-standard scientific definition followed by its context, background, and historical or physical scope.",
    "2. Core Scientific Mechanism & Working: Explain in deep detail how the biological, chemical, or physical process works step-by-step. Include all technical terminology, cellular/molecular details, or physical laws.",
    "3. Mathematical Equations, Reactions, or Structural Components: Detail all relevant formulas, balanced chemical equations, or anatomical/diagrammatic components with symbols and SI units.",
    "4. Detailed Comparative or Analytical Breakdown: Break down key factors, laws, conditions, proportionalities, or differences that examiners test in 4-mark and 8-mark board questions.",
    "5. Board Exam Presentation & Real-World Significance: Explain the practical significance and how to structure this answer in BISE Swat exams to achieve full marks."
  ],
  "finalAnswer": "Authoritative Board Exam Conclusion: A definitive summary encapsulating the core scientific takeaway for student revision.",
  "finalAnswerUr": "جامع امتحانی خلاصہ: خیبر پختونخوا ٹیکسٹ بک بورڈ کے نصاب اور سوات بورڈ کے امتحانی معیار کے مطابق مکمل اور جامع سائنسی خلاصہ۔",
  "examinerTip": "BISE Swat Examiner Advisory: Highlight the most frequent mistake students make in this topic (e.g., confusing terms, missing diagrams, incomplete points)."
}

IMPORTANT RULES:
- Provide exhaustive, deeply structured explanations that give students everything needed to score 100% in BISE Swat.
- Provide bilingual responses (English with complete Urdu explanation in finalAnswerUr).
- Strictly adhere to the official KPTBB Pakistan syllabus.
- Response must be strictly valid JSON with no markdown wrapping outside the JSON.`;

export class CeronAIService {
  private static getApiKey(): string {
    return env.VITE_GROQ_API_KEY || '';
  }

  /**
   * Resilient fetch wrapper with AbortController timeout protection.
   * Ensures API requests never hang indefinitely on unstable/slow networks.
   */
  private static async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeoutMs: number = 30000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  static isConfigured(): boolean {
    const key = this.getApiKey();
    return (
      key.length > 20 &&
      key !== 'your_groq_api_key_here'
    );
  }

  static async askTutor(req: AITutorRequest): Promise<AITutorResponse> {
    const key = this.getApiKey();
    if (!this.isConfigured()) {
      return {
        success: false,
        questionTitle: req.question,
        marks: 4,
        rubric: [],
        stepByStepSolution: [],
        finalAnswerEn: '',
        finalAnswerUr: '',
        examinerTip: '',
        error: 'NO_API_KEY',
      };
    }

    const userPrompt = buildUserPrompt(req);
    let lastError = '';

    // Loop through available models in case one fails or has a temporary limit
    for (const model of CANDIDATE_MODELS) {
      try {
        const res = await this.fetchWithTimeout(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: BISE_SWAT_SYSTEM_PROMPT },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.3,
            max_tokens: 3500,
            response_format: { type: 'json_object' },
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          lastError = `Model ${model} returned ${res.status}: ${errBody}`;
          continue; // Try next model
        }

        const data = await res.json();
        const rawText: string = data.choices?.[0]?.message?.content || '{}';

        let parsed: Record<string, unknown> = {};
        try {
          parsed = JSON.parse(rawText);
        } catch {
          lastError = 'Failed to parse AI JSON response';
          continue;
        }

        return formatAIResponse(req.question, parsed, rawText);
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : 'Network error';
      }
    }

    return {
      success: false,
      questionTitle: req.question,
      marks: 4,
      rubric: [],
      stepByStepSolution: [lastError],
      finalAnswerEn: 'Error connecting to AI. Please try again.',
      finalAnswerUr: 'اے آئی سرور سے رابطہ نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔',
      examinerTip: '',
      error: lastError,
    };
  }

  static async generateDeepLesson(req: DeepLessonRequest): Promise<DeepLessonResult> {
    const key = this.getApiKey();
    if (!this.isConfigured()) {
      return {
        success: false,
        markdownContent: '',
        error: 'NO_API_KEY',
      };
    }

    const isBiology = /biology/i.test(req.subjectName);
    const isPhysics = /physics/i.test(req.subjectName);
    const isChemistry = /chemistry/i.test(req.subjectName);
    const isMath = /math/i.test(req.subjectName);
    const hasFormulas = isPhysics || isChemistry || isMath;

    const formulaInstructions = hasFormulas
      ? `## 4. Fundamental Formulas, Equations & SI Units
Provide prominent, clean textbook formula callout blocks for all governing equations:
\`\`\`
╔════════════════════════════════════════════════════════════════╗
║ Governing Formula:  [Main Equation here]                      ║
╠════════════════════════════════════════════════════════════════╣
║ Where:                                                         ║
║   • [Symbol 1] = [Full name of quantity] (SI Unit: [e.g. kg]) ║
║   • [Symbol 2] = [Full name of quantity] (SI Unit: [e.g. m/s])║
╚════════════════════════════════════════════════════════════════╝
\`\`\`
Include the full step-by-step mathematical derivation from first principles.

## 5. Solved Board Model Numericals & Examples
Provide at least one complete 4-mark model numerical problem strictly following the BISE Swat board examination format:
* **Given Data:** List each quantity with standard SI symbols and units.
* **To Find:** State the unknown variable clearly.
* **Formula Used:** State the equation.
* **Calculation & Steps:** Show step-by-step mathematical substitution.
* **Final Result:** Boxed final answer with correct SI units.`
      : `## 5. Step-by-Step Biological Mechanism & Pathways
(NOTE: This is ${req.subjectName} — strictly NO mathematical formulas or numericals).
Explain the sequential biological stages clearly using numbered steps (Step 1, Step 2, Step 3), stating the cellular locations (e.g. cytoplasm, mitochondrial cristae) and key enzymes in simple, crystal-clear language.`;

    const systemPrompt = `You are a Master Teacher and Chief Curriculum Specialist for the Khyber Pakhtunkhwa Textbook Board (KPTBB) and BISE Swat Board in Pakistan.

Your goal is to explain this topic so simply, clearly, and engagingly that ANY beginner student in ${req.className} can instantly understand and score full marks in their board examinations.

CRITICAL PEDAGOGICAL GUIDELINES FOR BEGINNERS:
1. SIMPLE, CRYSTAL-CLEAR ENGLISH: Avoid pedantic academic jargon, convoluted sentences, or historical ancient treatises. Write in warm, encouraging, student-friendly English that a 14- to 17-year-old student understands effortlessly.
2. USE REAL-WORLD ANALOGIES: Always explain complex ideas using an intuitive everyday analogy (e.g. comparing cellular respiration to a powerhouse or car engine, or electric current to water flowing through pipes).
3. CLEAN, WELL-STRUCTURED LAYOUT: Use plenty of bullet points, numbered steps, bold key terms, and short paragraphs (2-3 sentences max). Never output overwhelming walls of dense text!
4. SUBJECT-SPECIFIC RULES:
   - For BIOLOGY: Focus on biological concepts, cell structures, organs, pathways, and diagrams. Strictly NO math formulas or numericals!
   - For PHYSICS / CHEMISTRY / MATH: State every formula in a clean box, define every symbol with its SI unit, and provide a clear 4-step solved numerical.
5. 100% PURE ENGLISH: Do not include Urdu words or translations in the text.
6. TARGET LENGTH: Comprehensive, exhaustive, and in-depth (up to 4,000–5,000 words), thoroughly explaining every aspect of the topic with rich everyday analogies, derivations, biochemical/physical mechanisms, comparison tables, and full 4-mark and 7-mark model exam answers.

FOLLOW THIS EXACT 8-SECTION BEGINNER-FRIENDLY STRUCTURE:

# ${req.topicTitle}
*Subject: ${req.subjectName} • Curriculum: KPTBB & BISE Swat Board (${req.className})*

## 1. In Simple Terms: The Big Picture & Real-World Analogy
- **What is this in plain English?** [Explain the core concept in 2-3 simple, friendly sentences.]
- **The Everyday Analogy:** [Provide a vivid, relatable comparison from daily life that makes the concept click immediately.]
- **Why it matters:** [Explain in simple words why living things or modern machines rely on this.]

## 2. Step-by-Step: How It Works
[Break down the entire process or principle into easy numbered steps:
1. **Step 1:** [Clear explanation with bold keywords]
2. **Step 2:** [Next stage or component]
3. **Step 3:** [Next stage or component]
4. **Step 4:** [Final outcome or result]]

## 3. Official BISE Board Definitions to Memorize
> **Core Definition:** "[Provide the exact 1-2 sentence standard textbook definition that examiners expect students to write word-for-word.]"

### Key Scientific Terms You Must Know
- **[Term 1]:** [Simple 1-line definition in plain English.]
- **[Term 2]:** [Simple 1-line definition in plain English.]
- **[Term 3]:** [Simple 1-line definition in plain English.]
- **[Term 4]:** [Simple 1-line definition in plain English.]

## 4. Key Differences Comparison Table
[Provide a clean Markdown comparison table contrasting the 2 main opposing concepts or categories with columns:
| Key Feature | Category A | Category B | Simple Explanation |
| :--- | :--- | :--- | :--- |
| ... | ... | ... | ... |]

${formulaInstructions}

## 6. Diagram & Visual Drawing Guide for Exam
- **ASCII Schematic Diagram:**
\`\`\`
[Provide a simple, clear text/ASCII diagram or flowchart]
\`\`\`
- **Mandatory Labels for Exam Sheet:**
  1. [Label 1 with brief location note]
  2. [Label 2 with brief location note]
  3. [Label 3 with brief location note]
  4. [Label 4 with brief location note]

## 7. BISE Swat Board Exam Practice (Model Answers)
### Section B: 4-Mark Conceptual Question
**Question:** [Common board examination question]
- **Point 1 (Definition):** [Clear statement]
- **Point 2 (Mechanism/Formula):** [Clear statement]
- **Point 3 (Key Example/Structure):** [Clear statement]
- **Point 4 (Significance/Result):** [Clear statement]

### Section C: 7-Mark Comprehensive Question
**Question:** [Detailed board examination question]
- **Introduction & Definition:** [2-3 clear sentences]
- **Detailed Step-by-Step Explanation:** [Clean numbered breakdown]
- **Summary & Conclusion:** [Key takeaway for examiners]

## 8. Common Beginner Mistakes & How to Avoid Them
- ❌ **Mistake 1:** [Common error students make on their exam paper]
  - ✓ **Correction:** [What to write instead to secure full marks]
- ❌ **Mistake 2:** [Confusing one term with another]
  - ✓ **Correction:** [How to distinguish them easily]
- 💡 **Examiner Pro-Tip:** [Direct insider scoring advice for BISE Swat]
`;

    const userPrompt = `Write the complete, beginner-friendly, easy-to-understand textbook chapter in 100% English for:
Class: ${req.className}
Subject: ${req.subjectName}
Chapter: ${req.chapterTitle}
Topic: ${req.topicTitle} (${req.topicNumber ? `Topic ${req.topicNumber}` : ''})

Ensure the tone is crystal clear and simple for beginners, with real-world analogies, clean step-by-step numbered points, easy-to-read tables, ${hasFormulas ? 'clean formula boxes and solved numerical,' : 'biological mechanisms without mathematical formulas,'} diagram drawing guide, and 4-mark model exam answers. Never make it dense or complicated!`;

    let lastError = '';
    for (const model of CANDIDATE_MODELS) {
      try {
        const res = await this.fetchWithTimeout(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.3,
            max_tokens: 8000,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          lastError = `Model ${model} returned ${res.status}: ${errBody}`;
          continue;
        }

        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.length > 200) {
          return {
            success: true,
            markdownContent: content,
          };
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : 'Network error';
      }
    }

    return {
      success: false,
      markdownContent: '',
      error: lastError || 'Failed to generate deep lesson',
    };
  }

  static async evaluateWrittenAnswer(req: AnswerEvaluationRequest): Promise<AnswerEvaluationResult> {
    const key = this.getApiKey();
    if (!this.isConfigured()) {
      return {
        success: false,
        awardedMarks: 0,
        maxMarks: req.maxMarks,
        gradePercentage: 0,
        feedbackSummary: 'API key not configured',
        rubricItems: [],
        missingKeyTerms: [],
        strengths: [],
        examinerTips: '',
        modelAnswer: '',
        error: 'NO_API_KEY',
      };
    }

    const systemPrompt = `You are a Senior Chief Board Examiner for BISE Swat / KPTBB Examination Board in Pakistan.
You are evaluating a student's answer for ${req.className} in ${req.subjectName} for ${req.maxMarks} marks.

EVALUATION CRITERIA:
- Grade strictly, fairly, and accurately according to official Pakistani board marking schemes.
- If an image of a handwritten answer is provided, carefully read, transcribe, and assess the student's handwriting, steps, headings, and formulas.
- Check for precise scientific keywords, proper mathematical equations/units, logical explanation, and diagram references where applicable.
- For 4-Mark Short Qs: 1 Mark per distinct technical point / definition / example.
- For 8-Mark Long Qs: Structured into introduction, main theory/mechanism, formula/proof, and conclusion.

You MUST respond in this EXACT valid JSON format ONLY:
{
  "awardedMarks": 3.5,
  "feedbackSummary": "Clear and accurate definition, but missing the official SI unit in the final statement.",
  "rubricItems": [
    { "criteria": "Concept Definition & Terminology", "marksAwarded": 1.0, "maxPossible": 1.0, "note": "Accurately stated standard textbook definition." },
    { "criteria": "Governing Formula / Mathematical Derivation", "marksAwarded": 1.0, "maxPossible": 1.0, "note": "Correct equation used." },
    { "criteria": "Step-by-step Substitution & Units", "marksAwarded": 0.5, "maxPossible": 1.0, "note": "Deducted 0.5 marks: Missing SI unit in final result." },
    { "criteria": "Reasoning & Examination Clarity", "marksAwarded": 1.0, "maxPossible": 1.0, "note": "Logical sequence maintained." }
  ],
  "missingKeyTerms": ["Inertial frame", "Net resultant force"],
  "strengths": ["Clear opening definition", "Well structured points"],
  "examinerTips": "Always underline final results and write SI units explicitly.",
  "modelAnswer": "Complete 4-point model answer..."
}`;

    const textPromptContent = `Student Class: ${req.className}
Subject: ${req.subjectName}
Chapter: ${req.chapterTitle}
Exam Question (${req.maxMarks} Marks):
"${req.questionText}"

${req.studentAnswer ? `Student's Written / Typed Answer:\n"""\n${req.studentAnswer}\n"""\n` : ''}
${req.imageBase64 ? 'Please transcribe and evaluate the handwritten paper from the attached image.' : ''}

Evaluate this student's answer strictly and fairly as a BISE Swat board examiner. Return valid JSON only.`;

    const modelsToTry = req.imageBase64
      ? [...VISION_MODELS, ...CANDIDATE_MODELS]
      : CANDIDATE_MODELS;

    let lastError = '';
    for (const model of modelsToTry) {
      try {
        const isVision = VISION_MODELS.includes(model) && !!req.imageBase64;
        const userContent = isVision
          ? [
              { type: 'text', text: textPromptContent },
              {
                type: 'image_url',
                image_url: {
                  url: req.imageBase64!.startsWith('data:')
                    ? req.imageBase64!
                    : `data:image/jpeg;base64,${req.imageBase64!}`,
                },
              },
            ]
          : textPromptContent;

        const requestBody: Record<string, any> = {
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent },
          ],
          temperature: 0.2,
          max_tokens: 2500,
        };

        // Vision preview models might error with explicit json_object response_format
        if (!isVision) {
          requestBody.response_format = { type: 'json_object' };
        }

        const res = await this.fetchWithTimeout(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          const errBody = await res.text();
          lastError = `Model ${model} returned ${res.status}: ${errBody}`;
          continue;
        }

        const data = await res.json();
        const rawText: string = data.choices?.[0]?.message?.content || '{}';

        let parsed: Record<string, any> = {};
        try {
          parsed = JSON.parse(rawText);
        } catch {
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              parsed = JSON.parse(jsonMatch[0]);
            } catch {
              lastError = 'Failed to parse AI evaluation JSON';
              continue;
            }
          } else {
            lastError = 'Failed to parse AI evaluation JSON';
            continue;
          }
        }

        const rawScore = parsed.awardedMarks ?? parsed.marksAwarded ?? parsed.score ?? parsed.marks ?? parsed.scoreAwarded;
        const awarded = typeof rawScore === 'number' ? rawScore : parseFloat(String(rawScore)) || 0;
        const max = req.maxMarks;
        const gradePercentage = Math.round((Math.min(awarded, max) / max) * 100);

        return {
          success: true,
          awardedMarks: Math.min(awarded, max),
          maxMarks: max,
          gradePercentage,
          feedbackSummary: (parsed.feedbackSummary as string) || (parsed.overallRemark as string) || (parsed.feedback as string) || 'Answer evaluated per BISE Swat standard.',
          rubricItems: (parsed.rubricItems as { criteria: string; marksAwarded: number; maxPossible: number; note: string }[]) || [],
          missingKeyTerms: (parsed.missingKeyTerms as string[]) || (parsed.missingKeywords as string[]) || [],
          strengths: (parsed.strengths as string[]) || [],
          examinerTips: (parsed.examinerTips as string) || (parsed.examinerTip as string) || '',
          modelAnswer: (parsed.modelAnswer as string) || (parsed.officialModelAnswer as string) || '',
        };
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : 'Network error';
      }
    }

    return {
      success: false,
      awardedMarks: 0,
      maxMarks: req.maxMarks,
      gradePercentage: 0,
      feedbackSummary: lastError || 'Evaluation failed. Please try again.',
      rubricItems: [],
      missingKeyTerms: [],
      strengths: [],
      examinerTips: '',
      modelAnswer: '',
      error: lastError,
    };
  }

  static async generatePaperCheckerQuestions(
    unit: Unit | undefined,
    subjectName: string,
    className: string,
    forceAIGenerate: boolean = false
  ): Promise<PaperCheckerQuestionsResult> {
    // 1. If not forced to generate dynamically, check existing curriculum questions first
    if (!forceAIGenerate && unit) {
      const pastPapers: PastPaperQuestion[] = unit.pastPaperQuestions || [];
      const solved: SolvedExerciseItem[] = unit.solvedExercises || [];

      const candidateShort = pastPapers.find((p) => p.marks <= 4 || /section b/i.test(p.section || ''))
        || solved.find((s) => s.marks <= 4 || s.category === 'conceptual' || s.category === 'short_question');

      const candidateLong = pastPapers.find((p) => p.marks >= 7 || /section c/i.test(p.section || ''))
        || solved.find((s) => s.marks >= 7 || s.category === 'long_question' || s.category === 'numerical');

      if (candidateShort && candidateLong) {
        const getQEn = (item: PastPaperQuestion | SolvedExerciseItem) =>
          'questionEn' in item && item.questionEn ? item.questionEn : ('titleEn' in item ? item.titleEn : '');
        const getQUr = (item: PastPaperQuestion | SolvedExerciseItem) =>
          'questionUr' in item && item.questionUr ? item.questionUr : ('titleUr' in item && item.titleUr ? item.titleUr : '');
        const getModelEn = (item: PastPaperQuestion | SolvedExerciseItem) =>
          'modelAnswerEn' in item && item.modelAnswerEn ? item.modelAnswerEn : '';
        const getModelUr = (item: PastPaperQuestion | SolvedExerciseItem) =>
          'modelAnswerUr' in item && item.modelAnswerUr ? item.modelAnswerUr : '';
        const getTip = (item: PastPaperQuestion | SolvedExerciseItem, fallback: string) =>
          'boardTipEn' in item && item.boardTipEn ? item.boardTipEn : fallback;

        return {
          shortQ: {
            id: 'curriculum-short-1',
            type: 'short',
            marks: 4,
            section: 'Section B (Short Question - 4 Marks)',
            questionEn: getQEn(candidateShort),
            questionUr: getQUr(candidateShort),
            modelAnswerEn: getModelEn(candidateShort),
            modelAnswerUr: getModelUr(candidateShort),
            boardTip: getTip(candidateShort, 'State 4 distinct technical points with proper terminology.'),
          },
          longQ: {
            id: 'curriculum-long-1',
            type: 'long',
            marks: 8,
            section: 'Section C (Extensive Question - 8 Marks)',
            questionEn: getQEn(candidateLong),
            questionUr: getQUr(candidateLong),
            modelAnswerEn: getModelEn(candidateLong),
            modelAnswerUr: getModelUr(candidateLong),
            boardTip: getTip(candidateLong, 'Provide introduction, mathematical equation/diagram, mechanism, and conclusion.'),
          },
        };
      }
    }

    // 2. Dynamic AI Generation via Groq
    const key = this.getApiKey();
    if (this.isConfigured() && key) {
      const systemPrompt = `You are a Senior Paper Setter for the BISE Swat Board and Khyber Pakhtunkhwa Textbook Board (KPTBB).
Generate TWO authentic, high-yield board examination questions for ${className}, Subject: ${subjectName}, Chapter: "${unit?.titleEn || 'Curriculum'}".

REQUIREMENTS:
1. Short Question (Section B): 4 Marks. Conceptual / reasoning / short derivation with 4 distinct marking points.
2. Long Question (Section C): 8 Marks. In-depth extensive question requiring structured derivation, mechanism, or comprehensive explanation.
3. Include both English and Urdu translations for both questions.
4. Include the complete official 100% textbook model answer for each question.

You MUST respond in this EXACT valid JSON format ONLY:
{
  "shortQ": {
    "questionEn": "...",
    "questionUr": "...",
    "marks": 4,
    "section": "Section B (Short Question - 4 Marks)",
    "modelAnswerEn": "...",
    "modelAnswerUr": "...",
    "keyTerms": ["...", "..."],
    "boardTip": "..."
  },
  "longQ": {
    "questionEn": "...",
    "questionUr": "...",
    "marks": 8,
    "section": "Section C (Extensive Question - 8 Marks)",
    "modelAnswerEn": "...",
    "modelAnswerUr": "...",
    "keyTerms": ["...", "..."],
    "boardTip": "..."
  }
}`;

      for (const model of CANDIDATE_MODELS) {
        try {
          const res = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Generate 2 board questions for Chapter: "${unit?.titleEn || 'Curriculum'}" in ${subjectName}.` },
              ],
              response_format: { type: 'json_object' },
              temperature: 0.3,
              max_tokens: 2500,
            }),
          });

          if (!res.ok) continue;
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content || '{}';
          let parsed: any = {};
          try {
            parsed = JSON.parse(content);
          } catch {
            const match = content.match(/\{[\s\S]*\}/);
            if (match) parsed = JSON.parse(match[0]);
          }

          if (parsed.shortQ?.questionEn && parsed.longQ?.questionEn) {
            return {
              shortQ: {
                id: `ai-short-${Date.now()}`,
                type: 'short',
                marks: 4,
                section: 'Section B (Short Question - 4 Marks)',
                questionEn: parsed.shortQ.questionEn,
                questionUr: parsed.shortQ.questionUr || '',
                modelAnswerEn: parsed.shortQ.modelAnswerEn || '',
                modelAnswerUr: parsed.shortQ.modelAnswerUr || '',
                keyTerms: parsed.shortQ.keyTerms || [],
                boardTip: parsed.shortQ.boardTip || 'Answer with 4 distinct points to ensure full 4 marks.',
              },
              longQ: {
                id: `ai-long-${Date.now()}`,
                type: 'long',
                marks: 8,
                section: 'Section C (Extensive Question - 8 Marks)',
                questionEn: parsed.longQ.questionEn,
                questionUr: parsed.longQ.questionUr || '',
                modelAnswerEn: parsed.longQ.modelAnswerEn || '',
                modelAnswerUr: parsed.longQ.modelAnswerUr || '',
                keyTerms: parsed.longQ.keyTerms || [],
                boardTip: parsed.longQ.boardTip || 'Structure your answer with Introduction, Working, Formulas, and Conclusion.',
              },
            };
          }
        } catch {
          // continue loop
        }
      }
    }

    // 3. Fallback High-Quality Synthesized Questions
    const chapterTitle = unit?.titleEn || 'General Science';
    return {
      shortQ: {
        id: `fallback-short-${Date.now()}`,
        type: 'short',
        marks: 4,
        section: 'Section B (Short Question - 4 Marks)',
        questionEn: `Define the fundamental scientific principle of "${chapterTitle}" and state two practical applications tested in BISE Swat board examinations.`,
        questionUr: `عنوان "${unit?.titleUr || chapterTitle}" کے بنیادی سائنسی اصول کی تعریف کریں اور دو عملی اطلاقات بیان کریں۔`,
        modelAnswerEn: `1. Formal Definition: Stated per standard KPTBB textbook definition with exact terminology.\n2. Governing Principle: Outlines the physical/biological mechanism.\n3. Application 1: Practical board-standard scenario.\n4. Application 2: Mathematical or everyday manifestation with SI units.`,
        modelAnswerUr: `تعریف، سائنسی وضاحت اور دو عملی اطلاقات کتب نصاب کے مطابق۔`,
        boardTip: 'Write clear sub-headings for Definition and Applications to secure all 4 marks.',
      },
      longQ: {
        id: `fallback-long-${Date.now()}`,
        type: 'long',
        marks: 8,
        section: 'Section C (Extensive Question - 8 Marks)',
        questionEn: `Explain in comprehensive detail the mechanism and mathematical derivation/theory of "${chapterTitle}". Draw or reference the relevant schematic diagram and discuss two limitations or conditions.`,
        questionUr: `موضوع "${unit?.titleUr || chapterTitle}" کے میکانزم اور مساوات کو تفصیل سے بیان کریں، ضروری ڈایاگرام کا حوالہ دیں اور شرائط واضح کریں۔`,
        modelAnswerEn: `1. Comprehensive Introduction & Scope (2 Marks)\n2. Theoretical Working & Mechanism (2 Marks)\n3. Mathematical Formula / Proof / Balanced Equation (2 Marks)\n4. Limitations, Conditions & Board Examination Summary (2 Marks)`,
        modelAnswerUr: `تفصیلی تعارف، سائنسی میکانزم، حسابی فارمولا اور امتحانی نتائج۔`,
        boardTip: 'Ensure a neat labeled diagram and state governing formulas in a distinct boxed highlight.',
      },
    };
  }

  static async generateCramSheet(req: CramSheetRequest): Promise<CramSheetResult> {
    const key = this.getApiKey();
    if (!this.isConfigured()) {
      return {
        success: false,
        markdownContent: '',
        error: 'NO_API_KEY',
      };
    }

    const isBiology = /biology/i.test(req.subjectName);

    const systemPrompt = `You are a Chief Examination Strategist for the Khyber Pakhtunkhwa Textbook Board (KPTBB) and BISE Swat Board.
Your mission is to produce a high-impact, ultra-condensed "1-Page Exam Night Board Cram Sheet" for students reviewing the night before their examination.

RULES:
1. Write 100% in pure academic English.
2. Ultra-high yield, dense, structured, and easy to scan.
3. Use clean Markdown tables and clear bold headings.

STRUCTURE STRICTLY AS FOLLOWS:

# ⚡ 1-Page Exam Night Cram Sheet: ${req.chapterTitle}
*Subject: ${req.subjectName} | Standard: KPTBB & BISE Swat (${req.className})*

## 1. 📋 Master Quick-Revision Matrix
${isBiology
  ? '| Concept / Biological Structure | Definition & Function | Key Anatomical Markers | High-Yield Board Point |'
  : '| Governing Law / Principle | Formula & Variables | Standard SI Unit | High-Yield Exam Note |'
}
[Provide 6-10 rows covering the entire chapter in dense, structured table rows]

## 2. 🎨 Must-Draw Scientific Diagrams & Mandatory Examiner Labels
[Bullet points listing the 2-3 diagrams students MUST know how to draw for this chapter in the board exam, along with the 4-5 labels examiners check.]

## 3. 🎯 Top 5 Repeated Board Questions & 2-Line Model Answers
[List the 5 most frequent board short questions from past papers with crisp 2-line model answers.]

## 4. ⚠️ Critical Examiner Gotchas & Common Deductions
[3-4 specific traps where students lose 0.5 - 1 mark in BISE papers and how to guarantee full marks.]
`;

    const userPrompt = `Generate the 1-Page Exam Night Cram Sheet for ${req.className} ${req.subjectName} Chapter: ${req.chapterTitle}.`;

    let lastError = '';
    for (const model of CANDIDATE_MODELS) {
      try {
        const res = await this.fetchWithTimeout(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.2,
            max_tokens: 3000,
          }),
        });

        if (!res.ok) {
          const errBody = await res.text();
          lastError = `Model ${model} returned ${res.status}: ${errBody}`;
          continue;
        }

        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.length > 100) {
          return {
            success: true,
            markdownContent: content,
          };
        }
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : 'Network error';
      }
    }

    return {
      success: false,
      markdownContent: '',
      error: lastError || 'Failed to generate cram sheet',
    };
  }
}

// ─── Helpers ────────────────────────────────────────────────

function buildUserPrompt(req: AITutorRequest): string {
  const formulas = req.keyFormulas?.length
    ? `Key formulas from textbook: ${req.keyFormulas.join(' | ')}`
    : '';
  const terms = req.keyTerms?.length
    ? `Key terms: ${req.keyTerms.join(', ')}`
    : '';

  return `
Student: ${req.className} (BISE Swat / KPTBB)
Subject: ${req.subjectName}
Chapter / Topic: ${req.chapterTitle}
${formulas}
${terms}

QUESTION TO SOLVE:
"${req.question}"

Solve this question completely as per BISE Swat board examination marking scheme.
Provide bilingual answer (English + Urdu). Return valid JSON only.
`.trim();
}

function formatAIResponse(
  question: string,
  parsed: Record<string, unknown>,
  rawText: string
): AITutorResponse {
  const isNumerical = parsed.type === 'numerical';
  const marks = (parsed.marks as number) || 4;

  // Build rubric array
  const rubricRaw = (parsed.rubric as string[]) || [];
  const rubric = rubricRaw.map((item: string) => {
    const match = item.match(/\((\d+\s*Mark[s]?)\)/i);
    return {
      item: item.replace(/\s*\(\d+\s*Mark[s]?\)/i, '').trim(),
      marks: match ? match[1] : '1 Mark',
    };
  });

  if (isNumerical) {
    const givenDataRaw = (parsed.givenData as { label: string; value: string }[]) || [];
    const steps = (parsed.steps as string[]) || [];

    return {
      success: true,
      questionTitle: question,
      marks,
      rubric,
      givenData: givenDataRaw,
      formula: (parsed.formula as string) || undefined,
      stepByStepSolution: steps,
      finalAnswerEn: (parsed.finalAnswer as string) || '',
      finalAnswerUr: (parsed.finalAnswerUr as string) || '',
      examinerTip: (parsed.examinerTip as string) || '',
      rawText,
    };
  }

  // Conceptual / descriptive / long question
  const stepsRaw = (parsed.steps as string[]) || [];
  const answer = (parsed.answer as string) || '';
  const finalAnswer = (parsed.finalAnswer as string) || answer || '';
  const answerUr = (parsed.finalAnswerUr as string) || (parsed.answerUr as string) || '';

  let points: string[] = [];
  if (Array.isArray(stepsRaw) && stepsRaw.length > 0) {
    points = stepsRaw;
  } else if (answer) {
    points = answer
      .split('\n')
      .map((p: string) => p.trim())
      .filter(Boolean);
  }

  return {
    success: true,
    questionTitle: question,
    marks,
    rubric,
    formula: (parsed.formula as string) || undefined,
    stepByStepSolution: points,
    finalAnswerEn: finalAnswer,
    finalAnswerUr: answerUr,
    examinerTip: (parsed.examinerTip as string) || '',
    rawText,
  };
}

export const ceronAIService = CeronAIService;

