import { i18n } from './src/i18n.ts';
import type { I18nTranslations } from './src/index.ts';

export interface Translations {
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

export async function useTranslations(locale: string, fallbackLocale?: string): Promise<void> {
  return i18n({
    locale,
    fallbackLocale: fallbackLocale || 'en-US',
    loader: (locale) => fetch(new URL(`/i18n/${locale}.json`, location.origin)).then(result => result.json()).then(json => mapTranslations(json)),
  });
}
