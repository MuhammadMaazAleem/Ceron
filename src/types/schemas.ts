import { z } from 'zod';

export const AgeBandSchema = z.enum(['kg-3', '4-8', '9-12']);

export const LearnerProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name cannot be empty'),
  nameUrdu: z.string().optional(),
  classId: z.string(),
  className: z.string(),
  ageBand: AgeBandSchema,
  avatarIcon: z.string(),
  avatarColor: z.string(),
  streakDays: z.number().nonnegative().default(1),
  xp: z.number().nonnegative().default(0),
  completedLessons: z.array(z.string()).default([]),
  badges: z.array(z.string()).default([]),
});

export const QuizAttemptSchema = z.object({
  id: z.string(),
  quizId: z.string(),
  quizTitle: z.string(),
  childId: z.string(),
  score: z.number().nonnegative(),
  total: z.number().positive(),
  percentage: z.number().min(0).max(100),
  passed: z.boolean(),
  grade: z.enum(['A-1', 'A', 'B', 'C', 'D', 'E', 'F']),
  date: z.string(),
  timeSpentSeconds: z.number().nonnegative(),
  categoryBreakdown: z.record(z.string(), z.number()).optional(),
  weakTopics: z.array(z.string()).default([]),
});

export type LearnerProfileDto = z.infer<typeof LearnerProfileSchema>;
export type QuizAttemptDto = z.infer<typeof QuizAttemptSchema>;
