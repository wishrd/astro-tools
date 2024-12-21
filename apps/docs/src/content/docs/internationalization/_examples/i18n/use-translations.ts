import type { I18nTranslations } from '@astro-tools/i18n';

import { i18n } from '@astro-tools:i18n';

import { mapTranslations } from './map-translations';

async function translationsLoader(locale: string): Promise<I18nTranslations> {
  switch (locale) {
    case 'en-US':
      return import('../../../../../../i18n/en-US.json')
        .then(json => mapTranslations(json.default));
    case 'es-ES':
      return import('../../../../../../i18n/es-ES.json')
        .then(json => mapTranslations(json.default));
    default:
      throw new Error(`Missing translations file for ${locale}`);
  }
}

export async function useTranslations(locale: string, fallbackLocale?: string): Promise<void> {
  await i18n({
    locale,
    fallbackLocale: fallbackLocale || 'en-US',
    loader: translationsLoader,
  });
}
