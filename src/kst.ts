const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export interface KstParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

function assertValidDate(date: Date): void {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new RangeError('Expected a valid Date instance.');
  }
}

function assertIntegerInRange(value: number, min: number, max: number, label: string): void {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${label} must be an integer between ${min} and ${max}.`);
  }
}

export function toKstParts(date: Date): KstParts {
  assertValidDate(date);
  const shifted = new Date(date.getTime() + KST_OFFSET_MS);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    second: shifted.getUTCSeconds(),
    millisecond: shifted.getUTCMilliseconds(),
  };
}

export function fromKstParts(parts: KstParts): Date {
  assertIntegerInRange(parts.year, 1, 9999, 'year');
  assertIntegerInRange(parts.month, 1, 12, 'month');
  assertIntegerInRange(parts.day, 1, 31, 'day');
  assertIntegerInRange(parts.hour, 0, 23, 'hour');
  assertIntegerInRange(parts.minute, 0, 59, 'minute');
  assertIntegerInRange(parts.second, 0, 59, 'second');
  assertIntegerInRange(parts.millisecond, 0, 999, 'millisecond');

  const wall = new Date(0);
  wall.setUTCFullYear(parts.year, parts.month - 1, parts.day);
  wall.setUTCHours(parts.hour, parts.minute, parts.second, parts.millisecond);

  if (
    wall.getUTCFullYear() !== parts.year ||
    wall.getUTCMonth() + 1 !== parts.month ||
    wall.getUTCDate() !== parts.day
  ) {
    throw new RangeError('Invalid Korean civil date.');
  }

  return new Date(wall.getTime() - KST_OFFSET_MS);
}

export function kstDateKey(date: Date): string {
  const { year, month, day } = toKstParts(date);
  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
