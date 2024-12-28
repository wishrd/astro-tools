import type { I18nInitOptions, I18nProviders } from './models/i18n-init-options.ts';

const i18nConfig = new Map();

export function init(options: I18nInitOptions): void {
  i18nConfig.set('providers', options.providers);
}

export function i18nProviders(): I18nProviders {
  const providers = i18nConfig.get('providers');
  if (!providers) {
    throw new Error(`i18n is not configured!`);
  }

  return providers;
}
