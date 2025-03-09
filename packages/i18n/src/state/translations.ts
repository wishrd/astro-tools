import { getState, setState } from '@astro-tools:transfer-state';

import type { I18nTranslations } from '../models/i18n-translations.ts';

export interface I18nTranslationsState {
  locale: string;
  fallbackLocale: string;
  translations: I18nTranslations;
}

export function setI18nState(value: I18nTranslationsState): void {
  setState('i18n', value);
}

export function getI18nState(): I18nTranslationsState {
  const state = getState<I18nTranslationsState>('i18n');
  if (!state) {
    throw new Error('i18n is not configured!');
  }

  return state;
}
