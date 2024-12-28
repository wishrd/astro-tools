import type { I18nTranslationsProvider } from '../core/models/i18n-translations-provider.ts';

import { mapTranslations, type Translations } from '../adapters/json-to-translations.ts';

export function translationsProviderFactory(locales: Record<string, () => Promise<Translations>>): I18nTranslationsProvider {

  return async (locale: string) => {
    const loader = locales[locale];
    if (!loader) {
      throw new Error(`Missing translations loader for ${locale}`);
    }

    return await loader().then(content => mapTranslations(content));
  }
}

export default translationsProviderFactory;
