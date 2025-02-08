import type { I18nValues } from '../../models/i18n-values.ts';

export function interpolate(translation: string, values?: I18nValues): string {
  for (const valueKey in values) {
    const value = values[valueKey]?.toString();
    if (!value) {
      continue;
    }

    translation = translation.replace(new RegExp(`{*${valueKey}(:\\w+)?}`, 'g'), value);
  }

  return translation;
}
