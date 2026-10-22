# Changelog

All notable changes to this project will be documented in this file.

## 0.1.0 — 2026-10-22

Initial public foundation.

### Added

- Dependency-free Korea Standard Time helpers for UTC+09:00 civil-time handling.
- Explicit civil-day boundary policies, including configurable late-night rollover with a 23:00 KST default.
- Gregorian date validation and structural lunar-date validation helpers.
- Canonical names for the 24 traditional solar terms.
- Explicit unsupported-range errors for solar-term boundary data that has not yet been verified for redistribution.
- Explicit lunisolar capability metadata instead of guessed conversion results.
- Accuracy and data-provenance documentation.
- Contribution guide and public API regression tests.
- GitHub Actions verification on Node.js 20 and 22.
- Package build, typecheck, test, and `npm pack --dry-run` checks.

### Accuracy policy

This release intentionally does not ship full lunar/solar conversion or copied multi-year solar-term timestamp tables. Those features remain gated on a documented, redistribution-compatible source or a independently verified algorithm with fixture coverage and a defined supported range.
