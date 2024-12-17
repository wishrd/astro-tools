import { setState, getState } from '@astro-tools:transfer-state';

import type { I18n } from './i18n.ts';

export function i18n(config: I18n): void {
  setState('i18n', config);
}

export function t(key: string, values: Record<string, string | number>): string {
  let translation = getState<I18n>('i18n').translations[key];
  if (!translation) {
    return key;
  }

  for (const valueKey in values) {
    const value = values[valueKey]?.toString();
    if (!value) {
      continue;
    }

    translation = translation.replace(new RegExp(`{*${valueKey}(:\\w+)?}`, 'g'), value);
  }

  return translation;
}
