import { describe, expect, it } from 'vitest';
import { fromKstParts, kstDateKey, toKstParts } from '../src/index.ts';

describe('KST utilities', () => {
  it('converts an instant to Korean civil parts across UTC midnight', () => {
    expect(toKstParts(new Date('2026-01-01T18:30:45.123Z'))).toEqual({
      year: 2026,
      month: 1,
      day: 2,
      hour: 3,
      minute: 30,
      second: 45,
      millisecond: 123,
    });
  });

  it('round-trips KST parts to the same instant', () => {
    expect(fromKstParts({
      year: 2026,
      month: 1,
      day: 2,
      hour: 3,
      minute: 30,
      second: 45,
      millisecond: 123,
    }).toISOString()).toBe('2026-01-01T18:30:45.123Z');
  });

  it('returns a zero-padded Korean date key', () => {
    expect(kstDateKey(new Date('2026-03-04T00:00:00Z'))).toBe('2026-03-04');
  });

  it('rejects impossible KST civil dates', () => {
    expect(() => fromKstParts({
      year: 2026,
      month: 2,
      day: 29,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    })).toThrow(RangeError);
  });

  it('rejects an invalid Date instance', () => {
    expect(() => toKstParts(new Date(Number.NaN))).toThrow(RangeError);
  });
});
