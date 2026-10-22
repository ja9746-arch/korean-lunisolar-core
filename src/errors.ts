export class UnsupportedRangeError extends RangeError {
  override name = 'UnsupportedRangeError';

  constructor(message: string) {
    super(message);
  }
}
