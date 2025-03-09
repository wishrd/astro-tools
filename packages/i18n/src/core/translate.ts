import type { I18nValues } from '../models/i18n-values.ts';
import { getI18nProviders } from '../state/providers.ts';
import { getI18nState } from '../state/translations.ts';
import { interpolate } from './utils/interpolate.ts';

export function t(
  key: string,
  countOrValues?: I18nValues | number,
  values?: I18nValues,
): string {
  const state = getI18nState();
  const translation = state.translations[key];
  if (!translation) {
    return key;
  }

  if (typeof translation === 'string') {
    if (typeof countOrValues === 'number') {
      throw new Error(`There is count without pluralization for key "${key}"`);
    }

    return interpolate(translation, countOrValues);
  }

  if (typeof countOrValues !== 'number') {
    throw new Error(`There is no count for pluralization of key "${key}"`);
  }

  const pluralResolver = getI18nProviders().plural({ locale: state.locale });
  const pluralTranslation =
    pluralResolver(translation, countOrValues) || `${key}$${countOrValues}`;
  return interpolate(pluralTranslation, values);
}
