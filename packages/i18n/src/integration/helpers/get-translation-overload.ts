import type { I18nTranslation } from '../../models/i18n-translations.ts';
import { getInterpolationValues } from './get-interpolation-values.ts';

export interface I18nTranslationPair {
  key: string;
  value: I18nTranslation;
};

export function getTranslationOverload({ key, value }: I18nTranslationPair) {
  let interpolationValues: Array<{ key: string, type: string }>;
  let isPlural = false;

  const translationValue = value;
  if (typeof translationValue === 'string') {
    interpolationValues = getInterpolationValues(translationValue);
  } else {
    const valuesMap = Object.keys(translationValue).reduce((values, key) => {
      const pluralizationValues = getInterpolationValues(translationValue[key]!);
      pluralizationValues.forEach(({ key, type }) => values.set(key, type));
      return values;
    }, new Map());

    interpolationValues = Array.from(valuesMap.entries()).map(([key, type]) => ({ key, type }));
    isPlural = true;
  }

  let valuesArgument = '';
  let pluralArgument = '';

  if (isPlural) {
    pluralArgument = ', count: number';
  }

  if (interpolationValues.length) {
    valuesArgument = `, values: { ${interpolationValues.map(({ key, type }) => `${key}: ${type}`).join(', ')} }`;
  }

  return `export function t(key: '${key}'${pluralArgument}${valuesArgument}): string;`;
}
