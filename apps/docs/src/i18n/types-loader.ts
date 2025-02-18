import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import type { I18nIntegrationTypesLoader } from '@astro-tools/i18n';
import { join, parse } from 'node:path';

export function typesLoader(): I18nIntegrationTypesLoader {
  return async () => {
    const base = parse(fileURLToPath(import.meta.url)).dir;
    const buffer = await readFile(join(base, 'translations', 'en-US.json'));
    return JSON.parse(buffer.toString('utf-8'));
  };
};
