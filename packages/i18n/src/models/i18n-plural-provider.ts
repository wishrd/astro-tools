import type { I18nPlural } from './i18n-translations.ts';

export interface I18nPluralProviderOptions {
  locale: string;
}

export type I18nPluralResolver = (value: I18nPlural, count: number) => string | undefined;

export type I18nPluralProvider = (options: I18nPluralProviderOptions) => I18nPluralResolver;
