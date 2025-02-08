import type { I18nPluralProvider } from './i18n-plural-provider.ts';
import type { I18nTranslationsProvider } from './i18n-translations-provider.ts';

export interface I18nProviders {
  translations: I18nTranslationsProvider;
  plural: I18nPluralProvider;
}

export interface I18nInitOptions {
  providers: I18nProviders;
}
