import { readFile } from 'node:fs';

import { mapTranslations } from '../adapters/json-to-translations.ts';
import type { I18nTranslations } from '../core/models/i18n-translations.ts';

export function typesProviderFactory(filePath: string): () => Promise<I18nTranslations> {
  return () => new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) return reject(err);
      resolve(mapTranslations(JSON.parse(data.toString())));
    });
  });
}
