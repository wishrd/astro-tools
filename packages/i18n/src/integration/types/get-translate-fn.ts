import type { I18nTranslations } from '../../core/models/i18n-translations.ts';
import { getTranslationOverload } from './get-translation-overload.ts';

export function getTranslateFn(translations: I18nTranslations): string {
  return Object.keys(translations).map(translationKey => getTranslationOverload({ key: translationKey, value: translations[translationKey]! })).join('\n');
}
