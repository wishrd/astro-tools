import type { I18nTranslationsLoader } from './i18n-translations-loader.ts';

export interface I18nOptions {
  locale: string;
  fallbackLocale: string;
  loader: I18nTranslationsLoader;
}
