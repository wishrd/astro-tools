import { setI18nProviders } from '../state/providers.ts';
import type { I18nInitOptions } from '../models/i18n-init-options.ts';

export function init(initOptions: I18nInitOptions): void {
  setI18nProviders(initOptions.providers);
}
