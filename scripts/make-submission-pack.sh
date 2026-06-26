#!/usr/bin/env bash
set -euo pipefail

OUT="submission-pack"
rm -rf "$OUT"
mkdir -p "$OUT"

cp README.md "$OUT/README.md"
cp docs/submission/JURY_ONE_PAGER.md "$OUT/JURY_ONE_PAGER.md"
cp docs/submission/DORAHACKS_SUBMISSION.md "$OUT/DORAHACKS_SUBMISSION.md"
cp docs/demo/VIDEO_SCRIPT_90_SECONDS.md "$OUT/VIDEO_SCRIPT_90_SECONDS.md"
cp docs/pitch-deck/PITCH_DECK_8_SLIDES.md "$OUT/PITCH_DECK_8_SLIDES.md"
cp docs/interviews/INTERVIEW_SCRIPT.md "$OUT/INTERVIEW_SCRIPT.md"
cp docs/interviews/EVIDENCE_TABLE.md "$OUT/EVIDENCE_TABLE.md"
cp docs/legal/DISCLAIMER.md "$OUT/DISCLAIMER.md"

zip -r pulso-garantia-submission-pack.zip "$OUT"
echo "Created pulso-garantia-submission-pack.zip"
