import { toKstParts } from './kst.ts';

export type BoundaryPolicy = 'midnight' | 'late-zi';

export interface ResolveCivilDateOptions {
  policy: BoundaryPolicy;
  lateZiHour?: number;
}

function formatDate(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function addOneCivilDay(year: number, month: number, day: number): string {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day + 1);
  date.setUTCHours(0, 0, 0, 0);
  return formatDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

export function resolveCivilDate(date: Date, options: ResolveCivilDateOptions): string {
  const parts = toKstParts(date);
  if (options.policy === 'midnight') {
    return formatDate(parts.year, parts.month, parts.day);
  }

  if (options.policy !== 'late-zi') {
    throw new RangeError(`Unsupported boundary policy: ${String(options.policy)}`);
  }

  const boundary = options.lateZiHour ?? 23;
  if (!Number.isInteger(boundary) || boundary < 0 || boundary > 23) {
    throw new RangeError('lateZiHour must be an integer between 0 and 23.');
  }

  if (parts.hour >= boundary) {
    return addOneCivilDay(parts.year, parts.month, parts.day);
  }
  return formatDate(parts.year, parts.month, parts.day);
}
