import { describe, it, expect } from 'vitest';
import { CROSSWORD_DATA } from '@/content/questions/crossword.data';
import { QUIZ_DATA } from '@/content/questions/quiz.data';
import { REFLECTION_DATA } from '@/content/questions/reflection.data';
import {
  CrosswordClueSchema,
  QuizQuestionSchema,
  ReflectionQuestionSchema,
} from '@/content/schemas/question.schema';

describe('Question Bank Integrity & Schema Verification', () => {
  it('validates all 11 crossword clues against schema', () => {
    expect(CROSSWORD_DATA).toHaveLength(11);
    CROSSWORD_DATA.forEach((clue) => {
      const result = CrosswordClueSchema.safeParse(clue);
      expect(result.success).toBe(true);
    });
  });

  it('verifies that the 11 cipher letters assemble Đ-Ứ-C-M-Ẹ-L-A-V-A-N-G', () => {
    const letters = CROSSWORD_DATA.map((c) => c.cipherLetter).join('');
    expect(letters).toBe('ĐỨCMẸLAVANG');
  });

  it('validates all 10 multiple-choice questions against schema', () => {
    expect(QUIZ_DATA).toHaveLength(10);
    QUIZ_DATA.forEach((q) => {
      const result = QuizQuestionSchema.safeParse(q);
      expect(result.success).toBe(true);
      expect(['A', 'B', 'C', 'D']).toContain(q.answer);
      expect(Object.keys(q.options)).toEqual(['A', 'B', 'C', 'D']);
    });
  });

  it('validates all 12 reflection questions against schema', () => {
    expect(REFLECTION_DATA).toHaveLength(12);
    REFLECTION_DATA.forEach((r) => {
      const result = ReflectionQuestionSchema.safeParse(r);
      expect(result.success).toBe(true);
      expect(r.rubric.full).toBe(20);
      expect(r.rubric.partial).toBe(10);
      expect(r.rubric.none).toBe(0);
    });
  });

  it('ensures all question IDs are globally unique', () => {
    const allIds = [
      ...CROSSWORD_DATA.map((c) => c.id),
      ...QUIZ_DATA.map((q) => q.id),
      ...REFLECTION_DATA.map((r) => r.id),
    ];
    const uniqueIds = new Set(allIds);
    expect(uniqueIds.size).toBe(allIds.length);
  });
});
