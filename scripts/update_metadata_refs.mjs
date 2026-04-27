import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const base = 'ebooks-ai/content/acervo/metadata';
const files = readdirSync(base);

files.forEach(file => {
  if (!file.endsWith('.json')) return;
  
  const path = join(base, file);
  const data = JSON.parse(readFileSync(path, 'utf-8'));
  const slug = file.replace('.json', '');

  if (data.coverUrl) {
    // Regex ajustada para evitar template literals mal formados no heredoc
    const regex = /\/covers\/[^/]+(\.[a-z]+)$/i;
    data.coverUrl = data.coverUrl.replace(regex, '/covers/' + slug + '$1');
  }

  writeFileSync(path, JSON.stringify(data, null, 2));
  console.log('Atualizado: ' + file);
});
