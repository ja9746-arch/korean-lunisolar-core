# Korean Lunisolar Core Initial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a real, reusable TypeScript v0.1 core for Korean Standard Time handling, explicit day-boundary policies, validated calendar date types, and KASI-backed solar-term reference data, with tests, CI, and OSS documentation.

**Architecture:** Keep the runtime dependency-free and split behavior into focused modules. v0.1 will implement deterministic KST/date-boundary utilities and calendar validators for all supported JavaScript dates, plus static 24-solar-term reference data sourced from the Korea Astronomy and Space Science Institute (KASI) for 2026–2028. Full lunar/solar conversion remains gated until a verified dataset or algorithm is added; the library must not guess outside verified data.

**Tech Stack:** TypeScript, Node.js 20+, Vitest, `tsc`, GitHub Actions, MIT License.

**Spec:** `docs/superpowers/specs/2026-10-22-korean-lunisolar-core-design.md`

## Global Constraints

- No Daeguksa business logic, fortune-reading logic, prompts, proprietary interpretation data, paid content, images, or private application code.
- No paid API or external hosted service is required.
- No runtime network calls.
- Prefer zero runtime dependencies.
- Unsupported ranges must fail explicitly rather than return guessed values.
- Modern KST is treated as fixed UTC+09:00; historical timezone transitions are outside v0.1 scope and must be documented.
- KASI is the authoritative reference source for v0.1 solar-term fixtures and reference dates.

## Review Focus

1. UTC dates crossing midnight in KST must resolve to the correct Korean civil date.
2. `late-zi` at exactly 23:00 KST must roll to the next civil date, while 22:59:59 must not.
3. Invalid dates such as 2026-02-29 and invalid lunar month/day values must be rejected deterministically.
4. Solar-term lookups outside 2026–2028 must throw an explicit unsupported-range error.
5. Public exports must not accidentally expose internal/private application concepts or require network access.

---

### Task 1: Tooling and package surface

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/index.ts`
- Create: `src/errors.ts`
- Create: `test/package.test.ts`

**Interfaces:**
- Produces: `UnsupportedRangeError extends RangeError`, package scripts `test`, `typecheck`, `build`.

- [ ] **Step 1: Write the failing package-surface test**
  - Assert `UnsupportedRangeError` can be imported from `src/index.ts` and preserves its message/name.
- [ ] **Step 2: Run `npm test -- test/package.test.ts` and verify failure before implementation.**
- [ ] **Step 3: Add minimal package/tooling configuration and export `UnsupportedRangeError`.**
- [ ] **Step 4: Run `npm test -- test/package.test.ts`, `npm run typecheck`, and `npm run build`; all must pass.**
- [ ] **Step 5: Commit `chore: scaffold TypeScript package`.**

### Task 2: KST conversion utilities

**Files:**
- Create: `src/kst.ts`
- Create: `test/kst.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- Produces: `KstParts`, `toKstParts(date: Date): KstParts`, `fromKstParts(parts: KstParts): Date`, `kstDateKey(date: Date): string`.

- [ ] **Step 1: Write failing tests** for UTC→KST conversion, date rollover, inverse conversion, zero-padded date keys, and invalid `Date` input.
- [ ] **Step 2: Run `npm test -- test/kst.test.ts`; verify the tests fail for missing exports.**
- [ ] **Step 3: Implement the minimal fixed UTC+09:00 conversion without runtime dependencies.**
- [ ] **Step 4: Run the KST tests, typecheck, and build; all must pass.**
- [ ] **Step 5: Commit `feat: add KST conversion utilities`.**

### Task 3: Explicit day-boundary policies

**Files:**
- Create: `src/day-boundary.ts`
- Create: `test/day-boundary.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- Consumes: `toKstParts`, `kstDateKey`.
- Produces: `BoundaryPolicy = 'midnight' | 'late-zi'`, `ResolveCivilDateOptions`, `resolveCivilDate(date: Date, options: ResolveCivilDateOptions): string`.

- [ ] **Step 1: Write failing tests** for midnight behavior, 22:59:59 KST, exactly 23:00 KST, post-23:00 year/month rollover, and custom `lateZiHour` validation.
- [ ] **Step 2: Run `npm test -- test/day-boundary.test.ts`; verify failure.**
- [ ] **Step 3: Implement explicit boundary resolution; default `lateZiHour` is 23.**
- [ ] **Step 4: Run targeted tests plus full test suite/typecheck/build.**
- [ ] **Step 5: Commit `feat: add civil day boundary policies`.**

### Task 4: Calendar date types and validators

**Files:**
- Create: `src/calendar-types.ts`
- Create: `test/calendar-types.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- Produces: `SolarDate`, `LunarDate`, `isValidSolarDate`, `assertValidSolarDate`, `isValidLunarDate`, `assertValidLunarDate`.

- [ ] **Step 1: Write failing tests** for leap-year dates, impossible Gregorian dates, month/day bounds, lunar day 1–30, month 1–12, and leap-month boolean preservation.
- [ ] **Step 2: Run the calendar-type tests and verify failure.**
- [ ] **Step 3: Implement validators with no locale/runtime-network dependence.**
- [ ] **Step 4: Run targeted and full verification commands.**
- [ ] **Step 5: Commit `feat: add calendar date types and validation`.**

### Task 5: KASI-backed 24 solar-term reference data

**Files:**
- Create: `src/solar-terms.ts`
- Create: `src/data/solar-terms-2026-2028.ts`
- Create: `test/solar-terms.test.ts`
- Create: `docs/data-sources.md`
- Modify: `src/index.ts`

**Interfaces:**
- Produces: `SolarTermName`, `SolarTermBoundary`, `SOLAR_TERM_NAMES`, `getSolarTerms(year: number): readonly SolarTermBoundary[]`, `getSolarTerm(year: number, name: SolarTermName): SolarTermBoundary`.
- Supported year range: 2026–2028 inclusive for v0.1 reference data.

- [ ] **Step 1: Record official KASI references** for 2026, 2027, and 2028 calendar data in `docs/data-sources.md`, including retrieval date and the fact that term times are Korean local time.
- [ ] **Step 2: Write failing tests** asserting exactly 24 canonical terms per supported year, chronological order, named fixtures such as 2026 입춘/동지 and 2028 입춘/동지, and explicit `UnsupportedRangeError` for 2025/2029.
- [ ] **Step 3: Run `npm test -- test/solar-terms.test.ts`; verify failure.**
- [ ] **Step 4: Add the verified static reference dataset and lookup helpers.**
- [ ] **Step 5: Run targeted tests, full tests, typecheck, and build.**
- [ ] **Step 6: Commit `feat: add KASI solar term reference data`.**

### Task 6: Accuracy policy and lunisolar conversion gate

**Files:**
- Create: `docs/accuracy.md`
- Create: `src/lunisolar.ts`
- Create: `test/lunisolar.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- Produces: `LunisolarSupport` metadata describing that full conversion is not shipped in v0.1 until a verified dataset/algorithm is incorporated.
- Must not expose a conversion function that guesses results.

- [ ] **Step 1: Write a failing test** asserting the public support metadata reports conversion as unavailable and names the verification requirement instead of returning fabricated dates.
- [ ] **Step 2: Run the targeted test and verify failure.**
- [ ] **Step 3: Implement only the honest capability metadata and document the acceptance criteria for future conversion support.**
- [ ] **Step 4: Run full tests/typecheck/build.**
- [ ] **Step 5: Commit `docs: define lunisolar accuracy gate`.**

### Task 7: OSS documentation and CI

**Files:**
- Modify: `README.md`
- Create: `CONTRIBUTING.md`
- Create: `.github/workflows/ci.yml`
- Create: `test/public-api.test.ts`

**Interfaces:**
- Consumes all public exports from Tasks 1–6.

- [ ] **Step 1: Write the public-API test** importing every documented export from the package root and exercising one representative call per module.
- [ ] **Step 2: Run the public-API test and fix any export gaps.**
- [ ] **Step 3: Expand README** with problem statement, installation, examples, supported ranges, limitations, KASI attribution, roadmap, and contribution link.
- [ ] **Step 4: Add GitHub Actions CI** for Node 20 and 22 running `npm ci`, tests, typecheck, and build on push/PR.
- [ ] **Step 5: Run `npm test`, `npm run typecheck`, `npm run build`, and `npm pack --dry-run`; all must succeed and package contents must contain no private Daeguksa code/assets.**
- [ ] **Step 6: Commit `docs: prepare v0.1 OSS release surface`.**

### Task 8: Whole-branch review and PR

**Files:**
- Review all changed files.

- [ ] **Step 1: Compare the implementation branch against `main` and inspect every changed path.**
- [ ] **Step 2: Re-run the complete local verification suite from a clean install.**
- [ ] **Step 3: Push the branch and confirm GitHub Actions succeeds.**
- [ ] **Step 4: Open a PR to `main` summarizing scope, verified commands, supported data range, and explicit non-inclusion of private Daeguksa code.**
- [ ] **Step 5: Do not merge until the PR diff and CI are clean.**
