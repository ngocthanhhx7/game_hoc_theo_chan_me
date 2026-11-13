import { z } from 'zod';

export const CrosswordClueSchema = z.object({
  id: z.string().min(1),
  index: z.number().int().min(1).max(11),
  cipherLetter: z.string().length(1),
  clue: z.string().min(5),
  answer: z.string().min(1),
  aliases: z.array(z.string()),
  explanation: z.string().min(5),
  reference: z.string(),
  rowLength: z.number().int().positive(),
});

export const QuizQuestionSchema = z.object({
  id: z.string().min(1),
  index: z.number().int().min(1).max(10),
  prompt: z.string().min(5),
  options: z.object({
    A: z.string().min(1),
    B: z.string().min(1),
    C: z.string().min(1),
    D: z.string().min(1),
  }),
  answer: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().min(5),
  reference: z.string().optional(),
});

export const ReflectionQuestionSchema = z.object({
  id: z.string().min(1),
  index: z.number().int().min(1).max(12),
  category: z.enum(['LIFE', 'DOGMAS', 'FAITH_INQUIRIES']),
  categoryLabel: z.string(),
  prompt: z.string().min(5),
  referenceAnswer: z.string().min(10),
  keyPoints: z.array(z.string().min(2)),
  rubric: z.object({
    full: z.number().int().nonnegative(),
    partial: z.number().int().nonnegative(),
    none: z.number().int().nonnegative(),
  }),
  reference: z.string(),
});
