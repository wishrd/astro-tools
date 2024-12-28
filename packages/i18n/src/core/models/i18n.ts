import type { I18nTranslations } from './i18n-translations.ts';

export interface I18n {
  locale: string;
  fallbackLocale: string;
  translations: I18nTranslations;
}
