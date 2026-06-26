import { writeFileSync } from 'node:fs';

const now = new Date().toISOString();
const payload = {
  generatedAt: now,
  demoEscrows: [
    {
      title: 'Landing page redesign for Colombian buyer',
      amount: 850,
      asset: 'USDC',
      route: 'Argentina → Colombia',
    },
    {
      title: 'WhatsApp commerce automation',
      amount: 1200,
      asset: 'USDC',
      route: 'Colombia → Brazil',
    },
  ],
};

writeFileSync('docs/submission/demo-data.json', `${JSON.stringify(payload, null, 2)}\n`);
console.log('Wrote docs/submission/demo-data.json');
