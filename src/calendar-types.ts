export interface SolarDate {
  year: number;
  month: number;
  day: number;
}

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
}

function isIntegerInRange(value: number, min: number, max: number): boolean {
  return Number.isInteger(value) && value >= min && value <= max;
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function gregorianMonthLength(year: number, month: number): number {
  const lengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const;
  return lengths[month - 1] ?? 0;
}

export function isValidSolarDate(date: SolarDate): boolean {
  if (!isIntegerInRange(date.year, 1, 9999) || !isIntegerInRange(date.month, 1, 12)) return false;
  return isIntegerInRange(date.day, 1, gregorianMonthLength(date.year, date.month));
}

export function assertValidSolarDate(date: SolarDate): void {
  if (!isValidSolarDate(date)) {
    throw new RangeError(`Invalid Gregorian date: ${date.year}-${date.month}-${date.day}.`);
  }
}

export function isValidLunarDate(date: LunarDate): boolean {
  return (
    isIntegerInRange(date.year, 1, 9999) &&
    isIntegerInRange(date.month, 1, 12) &&
    isIntegerInRange(date.day, 1, 30) &&
    typeof date.isLeapMonth === 'boolean'
  );
}

export function assertValidLunarDate(date: LunarDate): void {
  if (!isValidLunarDate(date)) {
    throw new RangeError(`Invalid lunar date fields: ${date.year}-${date.month}-${date.day}.`);
  }
}
