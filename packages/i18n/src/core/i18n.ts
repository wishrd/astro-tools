import { merge } from 'ts-deepmerge';
import { getState, setState } from '@astro-tools:transfer-state';

import type { I18nUseOptions } from './models/i18n-use-options.ts';
import type { I18n } from './models/i18n.ts';
import type { I18nValues } from './models/i18n-values.ts';
import { i18nProviders } from './init.ts';

function i18nState(): I18n {
  const state = getState<I18n>('i18n');
  if (!state) {
    throw new Error(`i18n is not configured!`);
  }

  return state;
}

export async function use({ locale, fallbackLocale }: I18nUseOptions): Promise<void> {
  const localeTranslations = await i18nProviders().translations(locale);
  const fallbackLocaleTranslations = fallbackLocale !== locale ? await i18nProviders().translations(fallbackLocale) : {};
  const translations = merge(fallbackLocaleTranslations, localeTranslations);

  setState('i18n', { locale, fallbackLocale, translations });
}

export function locale(): string {
  return i18nState().locale;
}

export function fallbackLocale(): string {
  return i18nState().fallbackLocale;
}

function interpolate(translation: string, values?: I18nValues): string {
  for (const valueKey in values) {
    const value = values[valueKey]?.toString();
    if (!value) {
      continue;
    }

    translation = translation.replace(new RegExp(`{*${valueKey}(:\\w+)?}`, 'g'), value);
  }

  return translation;
}

export function t(key: string, countOrValues?: I18nValues | number, values?: I18nValues): string {
  const state = i18nState();
  let i18nTranslation = state.translations[key];
  if (!i18nTranslation) {
    return key;
  }

  if (typeof i18nTranslation === 'object') {
    if (typeof countOrValues !== 'number') {
      throw new Error(`There is no count for pluralization of key "${key}"`);
    }

    const pluralResolver = i18nProviders().plural({ locale: state.locale });
    const pluralKey = pluralResolver(countOrValues);
    const translation = i18nTranslation[pluralKey] || `key$${pluralKey}`;
    return interpolate(translation, values);
  } else {
    if (typeof countOrValues === 'number') {
      throw new Error(`There is count without pluralization for key "${key}"`);
    }

    return interpolate(i18nTranslation, countOrValues);
  }
}
