import type { I18nProviders } from '../models/i18n-init-options.ts';

let i18nProviders: I18nProviders | null = null;

export function setI18nProviders(providers: I18nProviders): void {
  i18nProviders = providers;
}

export function getI18nProviders(): I18nProviders {
  if (!i18nProviders) {
    throw new Error(`i18n is not configured!`);
  }

  return i18nProviders;
}
