import type { I18nTranslations } from './i18n-translations.ts';

export type I18nTranslationsLoader = (locale: string) => Promise<I18nTranslations>;
