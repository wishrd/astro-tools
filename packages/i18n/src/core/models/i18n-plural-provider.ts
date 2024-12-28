export interface I18nPluralProviderOptions {
  locale: string;
}

export type I18nPluralResolver = (count: number) => string;

export type I18nPluralProvider = (options: I18nPluralProviderOptions) => I18nPluralResolver;
