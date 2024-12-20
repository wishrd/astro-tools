import type { I18nTranslations } from '@astro-tools/i18n';

import { i18n } from '@astro-tools:i18n';

interface Translations {
  [key: string]: Translations | string;
}

function mapTranslations(propOrObj: Translations): I18nTranslations  {
  return getTranslations(propOrObj).reduce<I18nTranslations>((obj, translation) => {
    obj[translation.key] = translation.value;
    return obj;
  }, {});
}

function getTranslations(propOrObj: Translations | string, stack: Array<string> = []): Array<{ key: string, value: string }> {
  if (typeof propOrObj === 'string') {
    return [{ key: stack.join('.'), value: propOrObj }];
  }

  const keys = Object.keys(propOrObj);
  return keys.flatMap(key => getTranslations(propOrObj[key]!, stack.concat(key)));
}

async function translationsLoader(locale: string): Promise<I18nTranslations> {
  switch (locale) {
    case 'en-US':
      return import('../../../../../../i18n/en-US.json').then(json => mapTranslations(json));
    case 'es-ES':
      return import('../../../../../../i18n/es-ES.json').then(json => mapTranslations(json));
    default:
      throw new Error(`Missing translation file for ${locale}`);
  }
}

export async function useTranslations(locale: string, fallbackLocale?: string): Promise<void> {
  await i18n({
    locale,
    fallbackLocale: fallbackLocale || 'en-US',
    loader: translationsLoader,
  });
}
