export interface LunisolarSupport {
  readonly available: false;
  readonly requirement: string;
  readonly reason: string;
}

export const LUNISOLAR_SUPPORT: LunisolarSupport = Object.freeze({
  available: false,
  requirement: 'A verified algorithm or redistributable reference dataset with a defined supported year range is required.',
  reason: 'v0.1 does not guess lunar/solar conversions.',
});
