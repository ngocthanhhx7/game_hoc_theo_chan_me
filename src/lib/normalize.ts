/**
 * Utility functions for Vietnamese text normalization and fuzzy/alias matching
 * Handles Unicode NFC/NFD, uppercase/lowercase, spaces, and optional unaccented fallback.
 */

export function normalizeVietnamese(input: string): string {
  if (!input) return '';
  return input
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

/**
 * Strips Vietnamese diacritics / accents while handling Đ/đ properly.
 */
export function removeVietnameseAccents(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFC')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();
}

/**
 * Checks whether user input matches the expected answer or any approved aliases.
 * Supports both exact accented match (standard) and unaccented fallback if allowUnaccented is true.
 */
export function checkAnswerMatch(
  userInput: string,
  targetAnswer: string,
  aliases: string[] = [],
  allowUnaccented = true
): boolean {
  const cleanInput = normalizeVietnamese(userInput);
  const cleanTarget = normalizeVietnamese(targetAnswer);
  const cleanAliases = aliases.map(normalizeVietnamese);

  // Exact match with diacritics
  if (cleanInput === cleanTarget || cleanAliases.includes(cleanInput)) {
    return true;
  }

  // Optional unaccented match
  if (allowUnaccented) {
    const noAccentInput = removeVietnameseAccents(cleanInput);
    const noAccentTarget = removeVietnameseAccents(cleanTarget);
    const noAccentAliases = cleanAliases.map(removeVietnameseAccents);

    if (
      noAccentInput === noAccentTarget ||
      noAccentAliases.includes(noAccentInput)
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Splits an answer string into valid character grid tiles (skipping spaces).
 */
export function getTileCharacters(answer: string): string[] {
  return normalizeVietnamese(answer)
    .replace(/\s+/g, '')
    .split('');
}
