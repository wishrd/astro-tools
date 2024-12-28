import type { I18nPluralProvider } from '../core/models/i18n-plural-provider.ts';

export function pluralProviderFactory(): I18nPluralProvider {
  return ({ locale }) => {
    const pluralRules = new Intl.PluralRules(locale);
    return (count: number) => pluralRules.select(count);
  };
}
