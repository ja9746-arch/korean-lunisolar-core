import { UnsupportedRangeError } from './errors.ts';

export const SOLAR_TERM_NAMES = [
  '소한', '대한', '입춘', '우수', '경칩', '춘분', '청명', '곡우',
  '입하', '소만', '망종', '하지', '소서', '대서', '입추', '처서',
  '백로', '추분', '한로', '상강', '입동', '소설', '대설', '동지',
] as const;

export type SolarTermName = (typeof SOLAR_TERM_NAMES)[number];

export interface SolarTermBoundary {
  name: SolarTermName;
  instant: Date;
  source: string;
}

export const SOLAR_TERM_DATA_STATUS = Object.freeze({
  bundledBoundaryData: false,
  authoritativeReference: 'Korea Astronomy and Space Science Institute (KASI)',
  checkedAt: '2026-10-22',
  reason: 'Boundary timestamps are not bundled until redistribution terms and a verified source dataset are confirmed.',
} as const);

export function getSolarTerms(year: number): readonly SolarTermBoundary[] {
  if (!Number.isInteger(year)) {
    throw new RangeError('year must be an integer.');
  }
  throw new UnsupportedRangeError(
    `No verified redistributable solar-term boundary dataset is bundled for ${year}.`,
  );
}

export function getSolarTerm(year: number, name: SolarTermName): SolarTermBoundary {
  if (!SOLAR_TERM_NAMES.includes(name)) {
    throw new RangeError(`Unknown solar term: ${String(name)}.`);
  }
  return getSolarTerms(year).find((term) => term.name === name)!;
}
