export type AgeBand = 'kg-3' | '4-8' | '9-12';

export interface ClassInfo {
  id: string; // e.g. 'class_kg', 'class_1', ..., 'class_12'
  nameEn: string;
  nameUr: string;
  gradeLevel: number; // 0 for KG, 1..12
  ageBand: AgeBand;
  stage: 'Early Childhood' | 'Primary' | 'Middle School' | 'Matric' | 'Intermediate (FSc)';
}

export interface LearnerProfile {
  id: string;
  name: string;
  nameUrdu?: string;
  classId: string;
  className: string;
  ageBand: AgeBand;
  avatarIcon: string;
  avatarColor: string;
  streakDays: number;
  xp: number;
  completedLessons: string[];
  badges: string[];
}

export interface Subject {
  id: string;
  nameEn: string;
  nameUr: string;
  icon: string;
  color: string;
  glowColor: string;
  classes: string[];
  unitsCount: number;
}

export interface Block {
  id: string;
  type: 'explanation' | 'visual' | 'animation' | 'audio' | 'flashcard' | 'practice' | 'board_tip' | 'solved_example' | 'diagram' | 'common_mistakes';
  order: number;
  data: any;
}

export interface Lesson {
  id: string;
  unitId: string;
  subjectId: string;
  lessonNumber: number;
  titleEn: string;
  titleUr: string;
  kptbbChapterRef: string;
  durationMinutes: number;
  encyclopediaQuery?: string;
  blocks: Block[];
}

export interface ChapterKeyTerm {
  termEn: string;
  termUr: string;
  definitionEn: string;
  definitionUr: string;
}

export interface ChapterFormula {
  labelEn: string;
  labelUr: string;
  formula: string;
  explanationEn: string;
  explanationUr: string;
}

export interface GivenDataEntry {
  symbol: string;
  value: string;
  unit: string;
  description: string;
}

export interface SolvedNumericalStep {
  label: string;
  math: string;
  explanationEn?: string;
  explanationUr?: string;
}

export interface SolvedExerciseItem {
  id: string;
  questionNumber: string; // e.g. "Conceptual Q1", "Numerical 10.1", "Exercise Q3"
  category: 'conceptual' | 'numerical' | 'short_question' | 'long_question';
  titleEn: string;
  titleUr: string;
  marks: number;
  questionEn: string;
  questionUr: string;
  modelAnswerEn?: string;
  modelAnswerUr?: string;
  boardTipEn?: string;
  boardTipUr?: string;
  // Specific for numerical problems:
  givenData?: GivenDataEntry[];
  toFind?: string[];
  formula?: string;
  calculationSteps?: SolvedNumericalStep[];
  finalAnswer?: string;
}

export interface BoardPairingInfo {
  mcqMarks: number;
  shortQuestionMarks: number;
  longQuestionMarks: number;
  totalBoardMarks: number;
  pairedWithChapters?: string;
  sectionCPairingRule?: string;
  highYieldTopics: string[];
}

export interface PastPaperQuestion {
  questionEn: string;
  questionUr: string;
  year: string;
  marks: number;
  section?: 'Section A (MCQs)' | 'Section B (Short Qs)' | 'Section C (Long Qs)';
  modelAnswerEn: string;
  modelAnswerUr: string;
}

export interface Unit {
  id: string;
  subjectId: string;
  classId: string;
  unitNumber: number;
  titleEn: string;
  titleUr: string;
  kptbbChapter: number;
  lessons: Lesson[];
  quizId?: string;
  overviewEn?: string;
  overviewUr?: string;
  keyTerms?: ChapterKeyTerm[];
  formulas?: ChapterFormula[];
  pastPaperQuestions?: PastPaperQuestion[];
  solvedExercises?: SolvedExerciseItem[];
  pairingScheme?: BoardPairingInfo;
}

export interface QuizOption {
  id: string;
  textEn: string;
  textUr: string;
}

export interface Question {
  id: string;
  unitId: string;
  type: 'mcq' | 'true_false' | 'numerical';
  difficulty: 'easy' | 'medium' | 'hard';
  promptEn: string;
  promptUr: string;
  options: QuizOption[];
  correctOptionId: string;
  explanationEn: string;
  explanationUr: string;
  kptbbRef: string;
  tags: string[];
}

export interface Quiz {
  id: string;
  unitId: string;
  titleEn: string;
  titleUr: string;
  timeLimitMinutes: number;
  passPercentage: number; // 33%
  questions: Question[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  childId: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  grade: 'A-1' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  weakTopics: string[];
  date: string;
}
