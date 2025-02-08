import type { I18nIntegrationTypesLoader } from '@astro-tools/i18n';

export function typesLoader(): I18nIntegrationTypesLoader {
  return () => import('./translations/en-US.json').then(json => json.default);
};
