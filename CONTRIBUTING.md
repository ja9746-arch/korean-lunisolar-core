# Contributing

Thanks for helping improve `korean-lunisolar-core`.

## Development setup

```bash
npm install
npm test
npm run typecheck
npm run build
```

Node.js 20 or newer is required.

## Calendar-behavior changes

Changes that affect date semantics must include tests covering the boundary being changed. Examples include:

- UTC/KST date rollover,
- month and year boundaries,
- leap years,
- configurable late-night day boundaries,
- unsupported input and ranges.

Do not silently change a default convention. Calendar conventions that are domain-dependent should be explicit options.

## External datasets

Before adding a calendar or astronomical dataset, document:

1. authoritative source and version,
2. redistribution license or permission,
3. timezone/time standard,
4. supported year range,
5. transformation or import procedure,
6. fixture tests that can independently catch an incorrect import.

Do not add data copied from a source whose redistribution status is unclear.

## Scope

Keep this repository reusable. Do not add product-specific interpretation logic, prompts, payment code, private data, proprietary assets, or application-specific content.

## Pull requests

A pull request should explain the behavior change, tests added, data provenance when relevant, and any compatibility impact. CI must pass on the supported Node.js versions before merge.
