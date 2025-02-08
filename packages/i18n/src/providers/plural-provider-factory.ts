import type { I18nPluralProvider } from '../models/i18n-plural-provider.ts';

export function pluralProviderFactory(): I18nPluralProvider {
  return ({ locale }) => {
    const pluralRules = new Intl.PluralRules(locale);
    return (value, count) => value[pluralRules.select(count)];
  };
}
