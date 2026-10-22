import { describe, expect, it } from 'vitest';
import { UnsupportedRangeError } from '../src/index.js';

describe('package surface', () => {
  it('exports UnsupportedRangeError with a stable name and message', () => {
    const error = new UnsupportedRangeError('outside supported range');

    expect(error).toBeInstanceOf(RangeError);
    expect(error.name).toBe('UnsupportedRangeError');
    expect(error.message).toBe('outside supported range');
  });
});
