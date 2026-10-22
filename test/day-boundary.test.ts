import { describe, expect, it } from 'vitest';
import { resolveCivilDate } from '../src/index.ts';

describe('resolveCivilDate', () => {
  it('uses normal Korean midnight for the midnight policy', () => {
    expect(resolveCivilDate(new Date('2026-01-01T15:00:00Z'), { policy: 'midnight' })).toBe('2026-01-02');
  });

  it('does not roll before 23:00 KST by default', () => {
    expect(resolveCivilDate(new Date('2026-01-31T13:59:59Z'), { policy: 'late-zi' })).toBe('2026-01-31');
  });

  it('rolls at exactly 23:00 KST', () => {
    expect(resolveCivilDate(new Date('2026-01-31T14:00:00Z'), { policy: 'late-zi' })).toBe('2026-02-01');
  });

  it('rolls correctly across the end of a year', () => {
    expect(resolveCivilDate(new Date('2026-12-31T14:30:00Z'), { policy: 'late-zi' })).toBe('2027-01-01');
  });

  it('supports an explicit custom late-night boundary', () => {
    expect(resolveCivilDate(new Date('2026-01-01T13:00:00Z'), { policy: 'late-zi', lateZiHour: 22 })).toBe('2026-01-02');
  });

  it('rejects invalid boundary hours', () => {
    expect(() => resolveCivilDate(new Date('2026-01-01T00:00:00Z'), { policy: 'late-zi', lateZiHour: 24 })).toThrow(RangeError);
  });
});
