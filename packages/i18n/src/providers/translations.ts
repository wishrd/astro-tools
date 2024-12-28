import type { I18nTranslationsProvider } from '@astro-tools/i18n';

import { mapTranslations, type Translations } from '../adapters/json-to-translations.ts';

export function translationsProviderFactory(locales: Record<string, () => Promise<Translations>>): I18nTranslationsProvider {

  return async (locale) => {
    const loader = locales[locale];
    if (!loader) {
      throw new Error(`Missing translations loader for ${locale}`);
    }

    return await loader().then(content => mapTranslations(content));
  }
}

export default translationsProviderFactory;
