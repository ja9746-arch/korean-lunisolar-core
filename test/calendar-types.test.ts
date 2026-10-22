import { describe, expect, it } from 'vitest';
import {
  assertValidLunarDate,
  assertValidSolarDate,
  isValidLunarDate,
  isValidSolarDate,
} from '../src/index.ts';

describe('calendar date validation', () => {
  it('accepts a real Gregorian leap day', () => {
    expect(isValidSolarDate({ year: 2024, month: 2, day: 29 })).toBe(true);
  });

  it('rejects an impossible Gregorian date', () => {
    expect(isValidSolarDate({ year: 2026, month: 2, day: 29 })).toBe(false);
    expect(() => assertValidSolarDate({ year: 2026, month: 2, day: 29 })).toThrow(RangeError);
  });

  it('checks month and day bounds', () => {
    expect(isValidSolarDate({ year: 2026, month: 13, day: 1 })).toBe(false);
    expect(isValidSolarDate({ year: 2026, month: 4, day: 31 })).toBe(false);
  });

  it('accepts lunar field bounds without pretending to perform conversion', () => {
    expect(isValidLunarDate({ year: 2026, month: 12, day: 30, isLeapMonth: true })).toBe(true);
  });

  it('rejects out-of-range lunar fields', () => {
    expect(isValidLunarDate({ year: 2026, month: 13, day: 1, isLeapMonth: false })).toBe(false);
    expect(() => assertValidLunarDate({ year: 2026, month: 1, day: 31, isLeapMonth: false })).toThrow(RangeError);
  });

  it('requires a real boolean leap-month flag', () => {
    expect(isValidLunarDate({ year: 2026, month: 1, day: 1, isLeapMonth: true })).toBe(true);
  });
});
