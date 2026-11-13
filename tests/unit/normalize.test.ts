import { describe, it, expect } from 'vitest';
import {
  normalizeVietnamese,
  removeVietnameseAccents,
  checkAnswerMatch,
  getTileCharacters,
} from '@/lib/normalize';

describe('Vietnamese Text Normalization & Answer Matching', () => {
  it('normalizes extra spaces and casing with diacritics preserved', () => {
    expect(normalizeVietnamese('   đức   mẹ   la   vang  ')).toBe('ĐỨC MẸ LA VANG');
    expect(normalizeVietnamese('magnificat')).toBe('MAGNIFICAT');
  });

  it('correctly handles Vietnamese Đ and đ characters', () => {
    expect(removeVietnameseAccents('Đức Mẹ')).toBe('DUC ME');
    expect(removeVietnameseAccents('đức maria')).toBe('DUC MARIA');
    expect(removeVietnameseAccents('Đồng Trinh')).toBe('DONG TRINH');
  });

  it('matches exact accented answers and aliases', () => {
    expect(
      checkAnswerMatch('Tông Hiến', 'TÔNG HIẾN', ['TONG HIEN', 'APOSTOLIC CONSTITUTION'])
    ).toBe(true);

    expect(
      checkAnswerMatch('Magnificat', 'MAGNIFICAT', ['KINH MAGNIFICAT'])
    ).toBe(true);

    expect(
      checkAnswerMatch('kinh magnificat', 'MAGNIFICAT', ['KINH MAGNIFICAT'])
    ).toBe(true);
  });

  it('matches unaccented fallback answers without ambiguity', () => {
    expect(
      checkAnswerMatch('Sao Bien', 'SAO BIỂN', ['BIỂN'], true)
    ).toBe(true);

    expect(
      checkAnswerMatch('Canh Thinh', 'CẢNH THỊNH', ['QUANG TOẢN'], true)
    ).toBe(true);
  });

  it('rejects incorrect answers correctly', () => {
    expect(
      checkAnswerMatch('Chúa Giêsu', 'MAGNIFICAT', ['KINH MAGNIFICAT'])
    ).toBe(false);
  });

  it('splits answers into correct character tiles without whitespace', () => {
    expect(getTileCharacters('LỘ ĐỨC')).toEqual(['L', 'Ộ', 'Đ', 'Ứ', 'C']);
    expect(getTileCharacters('SAO BIỂN')).toEqual(['S', 'A', 'O', 'B', 'I', 'Ể', 'N']);
  });
});
