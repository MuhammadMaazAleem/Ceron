// ============================================================
// Ceron AI Service — Groq API Integration
// Powers the Board Exam Tutor & Homework Solver
// ============================================================

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Candidate models in order of priority (with automatic failover)
const CANDIDATE_MODELS = [
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'allam-2-7b',
  'qwen/qwen3.8-27b',
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
  maxMarks: 4 | 7;
  studentAnswer: string;
  subjectName: string;
  chapterTitle: string;
  className: string;
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

const BISE_SWAT_SYSTEM_PROMPT = `You are "Ceron AI Tutor" — an expert BISE Swat Board Examination coach and KPTBB (Khyber Pakhtunkhwa Textbook Board) curriculum specialist for Pakistan.

Your job is to help Class 9, 10, 11, and 12 students in Swat, KPK prepare for their board exams by giving complete, authoritative model answers.

STRICT FORMATTING RULES — always follow this EXACT structure:

For NUMERICAL problems, respond in this JSON format:
{
  "type": "numerical",
  "marks": 4,
  "rubric": ["Given Data (1 Mark)", "Formula (1 Mark)", "Calculation Steps (1 Mark)", "Final Answer with SI Unit (1 Mark)"],
  "givenData": [{"label": "...", "value": "..."}],
  "formula": "...",
  "steps": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
  "finalAnswer": "... (with SI unit)",
  "finalAnswerUr": "حتمی جواب: ... (یونٹ کے ساتھ)",
  "examinerTip": "..."
}

For CONCEPTUAL / SHORT QUESTIONS, respond in this JSON format:
{
  "type": "conceptual",
  "marks": 4,
  "rubric": ["Definition (1 Mark)", "Scientific Principle (1 Mark)", "Formula/Diagram (1 Mark)", "Application/Example (1 Mark)"],
  "answer": "1. [Point 1]\\n2. [Point 2]\\n3. [Point 3]\\n4. [Point 4]",
  "answerUr": "1. [اردو میں نکتہ]\\n2. [اردو میں نکتہ]\\n3. [اردو میں نکتہ]\\n4. [اردو میں نکتہ]",
  "examinerTip": "..."
}

IMPORTANT RULES:
- Always answer in BOTH English and Urdu (bilingual)
- For numericals: Always write Given Data first, then Formula, then Step-by-Step substitution, then Final Answer with SI unit
- For short questions: Write exactly 4 numbered points to match the 4-mark rubric
- Strictly follow KPTBB Pakistan textbook curriculum content
- The examinerTip must warn about the most common mistake students make
- Response must be valid JSON only — no extra text outside the JSON`;

export class CeronAIService {
  private static getApiKey(): string {
    return import.meta.env.VITE_GROQ_API_KEY || '';
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
        const res = await fetch(GROQ_API_URL, {
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
            max_tokens: 1000,
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
- Check for precise scientific keywords, proper mathematical equations/units, logical explanation, and diagram references where applicable.
- For 4-Mark Short Qs: 1 Mark per distinct technical point.
- For 7-Mark Long Qs: Structured into introduction, main theory/mechanism, formula/proof, and conclusion.

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

    const userPrompt = `Student Class: ${req.className}
Subject: ${req.subjectName}
Chapter: ${req.chapterTitle}
Exam Question (${req.maxMarks} Marks):
"${req.questionText}"

Student's Written Answer to Grade:
"""
${req.studentAnswer}
"""

Evaluate this student's answer strictly and fairly as a BISE Swat board examiner. Return valid JSON only.`;

    let lastError = '';
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
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2,
            max_tokens: 2000,
          }),
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
          // If wrapped or surrounded by text, extract JSON substring
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

  // Conceptual / short question
  const answer = (parsed.answer as string) || '';
  const answerUr = (parsed.answerUr as string) || '';
  const points = answer
    .split('\n')
    .map((p: string) => p.trim())
    .filter(Boolean);

  return {
    success: true,
    questionTitle: question,
    marks,
    rubric,
    stepByStepSolution: points,
    finalAnswerEn: answer,
    finalAnswerUr: answerUr,
    examinerTip: (parsed.examinerTip as string) || '',
    rawText,
  };
}

export const ceronAIService = CeronAIService;

