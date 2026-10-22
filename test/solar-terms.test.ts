import { describe, expect, it } from 'vitest';
import {
  getSolarTerm,
  getSolarTerms,
  SOLAR_TERM_DATA_STATUS,
  SOLAR_TERM_NAMES,
  UnsupportedRangeError,
} from '../src/index.ts';

describe('solar term metadata', () => {
  it('exposes the 24 canonical terms in civil-year order', () => {
    expect(SOLAR_TERM_NAMES).toHaveLength(24);
    expect(SOLAR_TERM_NAMES[0]).toBe('소한');
    expect(SOLAR_TERM_NAMES[2]).toBe('입춘');
    expect(SOLAR_TERM_NAMES[11]).toBe('하지');
    expect(SOLAR_TERM_NAMES[23]).toBe('동지');
  });

  it('states that boundary timestamps are not bundled', () => {
    expect(SOLAR_TERM_DATA_STATUS.bundledBoundaryData).toBe(false);
    expect(SOLAR_TERM_DATA_STATUS.authoritativeReference).toContain('KASI');
  });

  it('fails loudly instead of fabricating boundary data', () => {
    expect(() => getSolarTerms(2026)).toThrow(UnsupportedRangeError);
    expect(() => getSolarTerm(2026, '입춘')).toThrow(UnsupportedRangeError);
  });

  it('rejects non-integer year input', () => {
    expect(() => getSolarTerms(2026.5)).toThrow(RangeError);
  });
});
