import { merge } from 'ts-deepmerge';

import type { I18nUseOptions } from '../models/i18n-use-options.ts';
import { getI18nProviders } from '../state/providers.ts';
import { setI18nState } from '../state/translations.ts';

export async function use({ locale, fallbackLocale }: I18nUseOptions): Promise<void> {
  const localeTranslations = await getI18nProviders().translations(locale);
  const fallbackLocaleTranslations = fallbackLocale !== locale ? await getI18nProviders().translations(fallbackLocale) : {};
  const translations = merge(fallbackLocaleTranslations, localeTranslations);
  setI18nState({ locale, fallbackLocale, translations });
}
