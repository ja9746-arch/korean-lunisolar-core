# Accuracy policy

Calendar software becomes dangerous when unsupported calculations look authoritative. This project therefore prefers a smaller verified API over broad guessed coverage.

## KST scope

The initial release treats modern Korea Standard Time as a fixed UTC+09:00 offset. Historical timezone transitions are outside the current scope. Inputs that require historical timezone reconstruction should not rely on this package without an explicit historical-time module.

## Day-boundary policies

`resolveCivilDate` requires an explicit policy:

- `midnight` uses the normal Korean civil date.
- `late-zi` rolls the application date at a configurable hour, defaulting to 23:00 KST.

The library does not claim that a late-night rollover convention is universally correct. It makes the chosen rule deterministic and visible to the caller.

## Solar and lunar date validation

`SolarDate` validation checks actual Gregorian month lengths and leap years.

`LunarDate` validation checks only structural field bounds (year, month 1-12, day 1-30, boolean leap-month flag). It does not claim that a particular lunar month/day combination exists in a specific year.

## Solar-term boundaries

The canonical 24 names are included. Boundary timestamps are intentionally not bundled until the source, version, time standard, supported range, and redistribution terms are verified and documented.

Calling `getSolarTerms` or `getSolarTerm` currently throws `UnsupportedRangeError` rather than returning approximated values.

## Lunisolar conversion

Full lunar/solar conversion is not shipped in v0.1. A future implementation must provide:

1. a verifiable algorithm or redistributable dataset,
2. a documented supported year range,
3. leap-month fixtures,
4. new-year and month-boundary fixtures,
5. deterministic round-trip tests,
6. explicit errors outside the supported range.

Until those requirements are met, `LUNISOLAR_SUPPORT.available` remains `false`.
