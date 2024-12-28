import type { I18nTranslation, I18nTranslations } from '../core/models/i18n-translations.ts';

export interface Translations {
  [key: string]: Translations | string;
}

const pluralKeys = ['one', 'two', 'three', 'zero', 'other'];

function getTranslations(propOrObj: Translations | string, stack: Array<string> = []): Array<{ key: string, value: I18nTranslation }> {
  if (typeof propOrObj === 'string' || Object.keys(propOrObj).some(key => pluralKeys.includes(key))) {
    return [{ key: stack.join('.'), value: propOrObj as I18nTranslation }];
  }

  const keys = Object.keys(propOrObj);
  return keys.flatMap(key => getTranslations(propOrObj[key]!, stack.concat(key)));
}

export function mapTranslations(propOrObj: Translations): I18nTranslations {
  return getTranslations(propOrObj).reduce<I18nTranslations>((obj, translation) => {
    obj[translation.key] = translation.value;
    return obj;
  }, {});
}
