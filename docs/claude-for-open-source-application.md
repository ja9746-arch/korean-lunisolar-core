# Claude for Open Source — Application Notes

Prepared: 2026-10-22
Repository: https://github.com/ja9746-arch/korean-lunisolar-core
Maintainer: `ja9746-arch`
License: MIT

## Current Anthropic program context

Anthropic currently offers six months of Claude Max 20x through the Claude for Open Source program. The published quantitative examples include projects with 500+ dependent repositories, 100+ dependent packages, 200,000+ combined monthly registry downloads, 100+ merged PRs into repositories the applicant does not own in the last 12 months, 20+ unique external contributors with merged PRs in the last 12 months, or an OpenSSF criticality score of 0.4+.

This repository is a new project and does not claim to meet those quantitative thresholds yet. The application should use Anthropic's published exception path for maintainers who do not quite fit the listed criteria but maintain something they believe the ecosystem can benefit from.

## Short application pitch

I maintain `korean-lunisolar-core`, an MIT-licensed TypeScript library for deterministic Korean calendrical edge cases that are repeatedly reimplemented across Korean software: Korea Standard Time normalization, civil-day boundaries, late-night rollover policies, calendar-date validation, and 24-solar-term interfaces. The project is deliberately accuracy-first: unsupported or unverified calendar data fails explicitly instead of returning guessed results. I am building the project as reusable infrastructure for developers who need Korean civil-time and traditional-calendar primitives without depending on a commercial application or hosted API. Claude Max would primarily be used for test generation, edge-case analysis, documentation, code review, and expanding verified calendar coverage.

## 3–5 line form version

I maintain `korean-lunisolar-core`, an MIT-licensed TypeScript library for Korean civil-time and calendrical edge cases such as KST normalization, date-boundary handling, validation, and 24-solar-term interfaces. The project is dependency-light and accuracy-first: unsupported data fails explicitly rather than being guessed. My goal is to provide reusable, well-tested infrastructure for Korean developers instead of having each project reimplement these rules independently. Claude Max would be used for edge-case testing, verification, documentation, code review, and expanding the library's verified coverage.

## Why the project matters

Korean applications that work with birthdays, traditional calendars, cultural scheduling, historical/civil date rules, or astrology-adjacent date input often need the same low-level primitives. Timezone rollover, invalid Gregorian dates, leap-month representation, and late-night date-boundary policies are easy to implement inconsistently. A small standalone library can centralize those rules, tests, and documentation without coupling callers to a specific product.

## What is already verifiable in the repository

- Public MIT-licensed repository.
- TypeScript package metadata and package export surface.
- KST conversion utilities with tests.
- Explicit `midnight` and configurable `late-zi` civil-day policies.
- Solar/lunar date validation helpers.
- Canonical 24-solar-term names.
- Accuracy and provenance documentation.
- Explicit support metadata where full conversion is not yet verified.
- CONTRIBUTING guide.
- GitHub Actions on Node.js 20 and 22.
- CI checks for tests, typechecking, build, and package dry-run.

## Important honesty points for the form

Do not claim:

- 500+ dependent repositories.
- 100+ dependent packages.
- 200,000+ monthly downloads.
- 20+ external contributors.
- OpenSSF criticality >= 0.4.
- Production adoption that cannot be independently verified.

Instead, state that the project is early-stage and that the application is being made under the program's `Don't quite fit?` invitation.

## How Claude Max would be used

1. Expand boundary and property-based test coverage for calendar edge cases.
2. Review algorithms and fixtures for date/time correctness.
3. Research and document redistribution-compatible authoritative data sources.
4. Improve contributor documentation and API design.
5. Review pull requests and regressions as the project gains users.
6. Add verified lunar/solar conversion only after the data or algorithm meets the project's documented accuracy gate.

## Suggested repository URL field

https://github.com/ja9746-arch/korean-lunisolar-core

## Suggested role field

Maintainer / library author

## Suggested contribution summary

Created and maintain the project, designed the public API and accuracy policy, implemented the initial TypeScript core, added automated regression tests, CI across Node.js 20/22, package verification, documentation, and contribution guidelines.

## Suggested exception-path statement

This project is new and does not yet meet the program's published adoption thresholds. I am applying under the program's invitation for maintainers who "don't quite fit" because Korean calendrical edge cases are repeatedly reimplemented across local software, and the project is intended to turn those rules into a small, tested, reusable public dependency. I am deliberately prioritizing correctness, provenance, and explicit unsupported states before wider adoption.
