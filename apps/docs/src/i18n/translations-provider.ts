import type { I18nTranslationsProvider } from '@astro-tools/i18n';

const translations = new Map();
translations.set('en-US', () =>
  import('./translations/en-US.json').then((json) => json.default),
);
translations.set('es-ES', () =>
  import('./translations/es-ES.json').then((json) => json.default),
);

const translationsProvider: I18nTranslationsProvider = async (locale) => {
  const loader = translations.get(locale);
  if (!loader) {
    throw new Error(`Missing translations for locale ${locale}`);
  }

  return await loader();
};

export default translationsProvider;
