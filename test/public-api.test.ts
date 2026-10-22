import { describe, expect, it } from 'vitest';
import * as api from '../src/index.ts';

describe('public runtime API', () => {
  it('exports only the intended runtime surface', () => {
    expect(Object.keys(api).sort()).toEqual([
      'LUNISOLAR_SUPPORT',
      'SOLAR_TERM_DATA_STATUS',
      'SOLAR_TERM_NAMES',
      'UnsupportedRangeError',
      'assertValidLunarDate',
      'assertValidSolarDate',
      'fromKstParts',
      'getSolarTerm',
      'getSolarTerms',
      'isValidLunarDate',
      'isValidSolarDate',
      'kstDateKey',
      'resolveCivilDate',
      'toKstParts',
    ].sort());
  });

  it('exercises one representative call per implemented module', () => {
    expect(api.kstDateKey(new Date('2026-01-01T15:00:00Z'))).toBe('2026-01-02');
    expect(api.resolveCivilDate(new Date('2026-01-01T13:59:59Z'), { policy: 'late-zi' })).toBe('2026-01-01');
    expect(api.isValidSolarDate({ year: 2024, month: 2, day: 29 })).toBe(true);
    expect(api.SOLAR_TERM_NAMES).toHaveLength(24);
    expect(api.LUNISOLAR_SUPPORT.available).toBe(false);
    expect(() => api.getSolarTerms(2026)).toThrow(api.UnsupportedRangeError);
  });
});
