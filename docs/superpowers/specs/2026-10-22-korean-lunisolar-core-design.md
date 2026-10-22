# Korean Lunisolar Core — Design Specification

Date: 2026-10-22
Status: Proposed for implementation

## Purpose

Build a small, reusable, well-tested TypeScript library for Korean calendar edge cases that developers repeatedly reimplement incorrectly: Korean Standard Time normalization, civil-date boundaries, late-night rollover policies, lunar/solar date representation, and 24 solar-term boundary handling.

The project is intentionally independent from any commercial service. It must not contain Daeguksa business logic, fortune-reading logic, prompts, proprietary interpretation data, paid content, images, or private application code.

## Primary goals

1. Provide deterministic calendar utilities that are useful outside astrology applications.
2. Keep the runtime API small and documented.
3. Make edge-case behavior explicit rather than implicit.
4. Ship with strong automated tests and GitHub Actions CI.
5. Avoid paid services and runtime network calls.
6. Prefer zero runtime dependencies where practical.

## Non-goals

- Fortune telling or saju interpretation.
- Baekgwi classification or content.
- User profiling or personal-data storage.
- Payment, authentication, analytics, or hosted API services.
- Copying private code from `ja9746-arch/daeguksa`.

## Public API direction

The initial package will expose focused modules rather than one large class.

### `kst`

Utilities for explicit Korea Standard Time handling.

- `toKstParts(date)` — returns KST civil date/time parts.
- `kstDateKey(date)` — returns `YYYY-MM-DD` in KST.
- `fromKstParts(parts)` — creates an instant from KST civil parts.

The implementation uses the fixed UTC+09:00 offset. Korea currently has no daylight-saving transitions, so the offset is deterministic for modern dates. Historical timezone research is outside v0.1 scope and will be documented.

### `day-boundary`

Utilities for applications that need an explicit day rollover rule.

- `resolveCivilDate(date, options)`
- supported boundary policies:
  - `midnight`: normal civil date rollover at 00:00
  - `late-zi`: configurable late-night rollover, defaulting to 23:00 KST

The library will not claim that one policy is universally correct; the caller must choose the policy explicitly.

### `calendar-types`

Stable TypeScript types for solar and lunar dates.

- `SolarDate`
- `LunarDate`
- leap-month flag
- validation helpers

### `solar-terms`

A deterministic interface for the 24 traditional solar terms.

Initial version will provide:

- canonical term names and order
- lookup helpers
- boundary comparison utilities
- data-source metadata and supported year range

The astronomical calculation/data method must be documented and covered by fixture tests before being presented as authoritative.

### `lunisolar`

Lunar/solar conversion will be added only with a verifiable dataset or algorithm and a clearly stated supported year range. The package must reject unsupported years instead of silently returning guessed values.

## Accuracy strategy

Calendar correctness is more important than breadth.

Every conversion feature must have:

1. a documented source or algorithm,
2. a defined supported date range,
3. edge fixtures around year/month/leap-month boundaries,
4. deterministic tests,
5. explicit errors for unsupported input.

No network lookup is allowed at runtime.

## Project structure

```text
src/
  index.ts
  kst.ts
  day-boundary.ts
  calendar-types.ts
  solar-terms.ts
  lunisolar.ts
  errors.ts

test/
  kst.test.ts
  day-boundary.test.ts
  calendar-types.test.ts
  solar-terms.test.ts
  lunisolar.test.ts

docs/
  accuracy.md
  data-sources.md

.github/workflows/
  ci.yml
```

## Tooling

- TypeScript
- Node.js 20+
- Vitest for tests
- `tsc` for type-check/build
- GitHub Actions for CI
- MIT License

No paid API or external hosted service is required.

## Package quality requirements

Before v0.1.0 is considered usable:

- `npm test` passes
- `npm run typecheck` passes
- `npm run build` passes
- README contains installation and examples
- CI runs on push and pull request
- unsupported ranges fail loudly
- public exports are covered by tests
- package contains no private Daeguksa code or assets

## OSS presentation

The README should make the project understandable to developers who have never seen Daeguksa. It should explain the concrete engineering problem, supported behavior, limitations, accuracy policy, contribution process, and roadmap.

The project should be genuinely useful as a standalone utility rather than existing only as evidence for an application program.

## Initial implementation order

1. Tooling and package metadata.
2. KST conversion utilities with tests.
3. Explicit day-boundary utilities with tests.
4. Date types and validators.
5. Solar-term data contract and source documentation.
6. Lunisolar conversion only after source validation.
7. README, contribution guide, CI, and release checks.
