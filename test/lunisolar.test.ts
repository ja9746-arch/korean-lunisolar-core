import { describe, expect, it } from 'vitest';
import { LUNISOLAR_SUPPORT } from '../src/index.ts';

describe('lunisolar conversion support', () => {
  it('reports conversion as unavailable until it can be verified', () => {
    expect(LUNISOLAR_SUPPORT.available).toBe(false);
    expect(LUNISOLAR_SUPPORT.requirement).toMatch(/verified/i);
    expect(LUNISOLAR_SUPPORT.reason).toContain('does not guess');
  });
});
