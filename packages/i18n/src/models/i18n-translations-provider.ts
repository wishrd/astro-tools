import type { I18nTranslations } from './i18n-translations.ts';

export type I18nTranslationsProvider = <T>(locale: string, context: T) => Promise<I18nTranslations>;
