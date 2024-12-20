import { merge } from 'ts-deepmerge';
import { getState, setState } from '@astro-tools:transfer-state';

import type { I18nOptions } from './models/i18n-options.ts';
import type { I18n } from './models/i18n.ts';

function i18nState(): I18n {
  const state = getState<I18n>('i18n');
  if (!state) {
    throw new Error(`i8n state is not set`);
  }

  return state;
}

export async function i18n({ locale, fallbackLocale, loader }: I18nOptions): Promise<void> {
  const localeTranslations = await loader(locale);
  const fallbackLocaleTranslations = fallbackLocale !== locale ? await loader(fallbackLocale) : {};

  const translations = merge(localeTranslations, fallbackLocaleTranslations);

  setState('i18n', {
    locale,
    fallbackLocale,
    translations,
  });
}

export function locale(): string {
  return i18nState().locale;
}

export function fallbackLocale(): string {
  return i18nState().fallbackLocale;
}

export function t(key: string, values: Record<string, string | number>): string {
  let translation = i18nState().translations[key];
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
