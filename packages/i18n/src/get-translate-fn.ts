import type { I18nTranslations } from './models/i18n-translations.ts';
import { getTranslationOverload } from './utils/get-translation-overload.ts';

export async function getTranslateFn(loader: () => Promise<I18nTranslations>): Promise<string> {
  const translations = await loader();
  return Object.keys(translations).map(translationKey => getTranslationOverload({ key: translationKey, value: translations[translationKey]! })).join('\n');
  // return overloads.concat([`export function t(key: string, values: Record<string, string | number>): string;`]).join('\n');
}
