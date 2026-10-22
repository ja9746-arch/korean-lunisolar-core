# korean-lunisolar-core

[![CI](https://github.com/ja9746-arch/korean-lunisolar-core/actions/workflows/ci.yml/badge.svg)](https://github.com/ja9746-arch/korean-lunisolar-core/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Small, dependency-free TypeScript utilities for Korean civil time and calendrical boundary handling.

The project focuses on the parts of Korean calendar software that are easy to implement inconsistently: KST normalization, explicit day-rollover policies, Gregorian/lunar field validation, and a transparent path toward verified solar-term and lunisolar data.

## Why this exists

Applications dealing with Korean dates often need to answer questions such as:

- What Korean civil date does a UTC instant belong to?
- Should a domain-specific day roll at midnight or at a configured late-night boundary?
- Is a Gregorian date structurally valid?
- Is a lunar-date input structurally valid without pretending that conversion has been verified?
- What should an application do when authoritative astronomical boundary data is not safely bundled?

This library makes those decisions explicit and testable instead of hiding them in application-specific code.

## Current capabilities

| Capability | v0.1 status |
| --- | --- |
| UTC instant ↔ modern KST civil parts | Available |
| KST `YYYY-MM-DD` key | Available |
| Midnight day boundary | Available |
| Configurable late-night (`late-zi`) boundary | Available; default 23:00 KST |
| Gregorian date validation | Available |
| Lunar field validation | Available (structural only) |
| Canonical 24 solar-term names | Available |
| Solar-term boundary timestamps | Not bundled yet |
| Full lunar/solar conversion | Not shipped yet |

Unsupported calculations fail explicitly instead of returning guessed values.

## Development

Requirements: Node.js 20+.

```bash
npm install
npm test
npm run typecheck
npm run build
```

The runtime library has no dependencies. TypeScript and Vitest are development dependencies only.

## Examples

### Convert an instant to Korean civil time

```ts
import { kstDateKey, toKstParts } from 'korean-lunisolar-core';

const instant = new Date('2026-01-01T18:30:00Z');

toKstParts(instant);
// { year: 2026, month: 1, day: 2, hour: 3, minute: 30, ... }

kstDateKey(instant);
// '2026-01-02'
```

### Make a day-boundary convention explicit

```ts
import { resolveCivilDate } from 'korean-lunisolar-core';

resolveCivilDate(new Date('2026-01-31T14:00:00Z'), {
  policy: 'late-zi',
});
// '2026-02-01' because 14:00 UTC is 23:00 KST
```

Use `{ policy: 'midnight' }` for the ordinary Korean civil date. A custom `lateZiHour` can be supplied when a domain uses another explicit rollover rule.

### Validate dates without fabricating conversion results

```ts
import { isValidLunarDate, isValidSolarDate } from 'korean-lunisolar-core';

isValidSolarDate({ year: 2024, month: 2, day: 29 }); // true
isValidSolarDate({ year: 2026, month: 2, day: 29 }); // false

isValidLunarDate({
  year: 2026,
  month: 8,
  day: 15,
  isLeapMonth: false,
}); // structural validation only
```

## Accuracy and data provenance

Modern KST is treated as fixed UTC+09:00. Historical Korean timezone transitions are outside v0.1 scope.

KASI (Korea Astronomy and Space Science Institute) is the primary authoritative reference for Korean annual calendar standards. The repository links to official source material but does not currently redistribute KASI's multi-year solar-term timestamp dataset because the redistribution terms have not been verified for inclusion in an MIT-licensed repository.

See:

- [Accuracy policy](docs/accuracy.md)
- [Data sources and provenance](docs/data-sources.md)

## Explicit non-goals

This repository does not contain fortune-reading interpretations, commercial application logic, prompts, private user data, payment logic, proprietary content, or assets from another product.

It is intended to remain a reusable calendrical utility.

## Roadmap

- Verify a redistribution-compatible authoritative solar-term boundary source.
- Add fixture-backed solar-term boundary lookup with a documented year range.
- Add lunar/solar conversion only after algorithm/data verification and leap-month round-trip tests.
- Expand historical-time support as a separate, explicitly scoped feature.

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing behavior that changes calendar semantics or adds external data.

## License

MIT. See [LICENSE](LICENSE).
