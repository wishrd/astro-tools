import { readFile } from 'fs';

import { mapTranslations } from './map-translations.mjs';

export function i18nSchemaLoader(filePath) {
  return () => new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) return reject(err);
      resolve(mapTranslations(JSON.parse(data.toString())));
    });
  });
}
