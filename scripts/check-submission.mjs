import { existsSync, readFileSync } from 'node:fs';

const required = [
  'README.md',
  'apps/web/package.json',
  'contracts/escrow/Cargo.toml',
  'contracts/escrow/src/lib.rs',
  'docs/pitch-outline.md',
  'docs/pitch-deck/SLIDES.md',
  'docs/demo-script.md',
  'docs/customer-discovery.md',
  'docs/interviews/evidence-log.md',
  'docs/submission/final-checklist.md',
];

let ok = true;
for (const path of required) {
  if (!existsSync(path)) {
    console.error(`Missing: ${path}`);
    ok = false;
  } else {
    console.log(`OK: ${path}`);
  }
}

const readme = readFileSync('README.md', 'utf8');
for (const phrase of ['Stellar', 'Soroban', 'customer discovery', 'testnet']) {
  if (!readme.includes(phrase)) {
    console.error(`README missing phrase: ${phrase}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('\nSubmission skeleton looks complete. Now add real links: demo video, interviews, contract ID, tx proof.');
