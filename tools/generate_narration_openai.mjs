import { mkdir, writeFile } from 'node:fs/promises';
import { pages } from '../src/data/pages.js';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('Set OPENAI_API_KEY before generating narration.');
}

await mkdir('public/narration', { recursive: true });

for (const page of pages) {
  const input = page.narration?.trim();
  if (!input) continue;

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-tts',
      voice: 'coral',
      input,
      instructions:
        'Lee como un personaje amable de cuento infantil: voz calida, cercana, clara y expresiva. Ritmo pausado para ninos pequenos, con entonacion curiosa y tierna. Pronuncia Doctor Lupa con entusiasmo suave.',
      response_format: 'mp3',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed ${page.id}: ${response.status} ${await response.text()}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  await writeFile(`public/narration/${page.id}.mp3`, audio);
  console.log(`Wrote public/narration/${page.id}.mp3`);
}
