import type { I18nTranslations } from '@astro-tools/i18n';

interface Translations {
  [key: string]: Translations | string;
}

function getTranslations(propOrObj: Translations | string, stack: Array<string> = []): Array<{ key: string, value: string }> {
  if (typeof propOrObj === 'string') {
    return [{ key: stack.join('.'), value: propOrObj }];
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
