# Data sources and provenance

## Korea Astronomy and Space Science Institute (KASI)

KASI is the primary authoritative reference used to verify Korean calendrical terminology and official annual calendar information.

- 2026 calendar standards announcement: https://www.kasi.re.kr/kor/post/newsMaterial/32031
- Verified on: 2026-10-22
- The announcement describes the annual `월력요항` as the official basis for calendar production and includes the 24 solar terms among the published calendar standards.

## Why solar-term timestamps are not bundled yet

This repository currently exposes the canonical 24 solar-term names, but it does **not** redistribute KASI's multi-year `24기 입기시각` timestamp dataset.

At the time of this release, KASI's public site contains active inquiries about reuse and redistribution of that dataset. We did not find a sufficiently explicit redistribution grant for copying the multi-year source file into an MIT-licensed repository. Until that is clarified, the library fails explicitly rather than embedding data under uncertain terms.

This is a provenance and licensing precaution, not a claim that reuse is prohibited.

## Future acceptance criteria

A boundary-time dataset may be bundled only after all of the following are documented:

1. authoritative source and version,
2. permission or license compatible with redistribution,
3. time standard and timezone,
4. supported year range,
5. fixture checks around year boundaries and known terms,
6. reproducible update procedure.

No network data source is queried at runtime.
