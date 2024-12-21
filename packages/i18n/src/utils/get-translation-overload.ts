import { getInterpolationValues } from './get-interpolation-values.ts';

export function getTranslationOverload(translation: { key: string, value: string }) {
  const interpolationValues = getInterpolationValues(translation.value);
  let valuesArgument = '';

  if (interpolationValues.length) {
    valuesArgument = `, values: { ${interpolationValues.map(({ key, type }) => `${key}: ${type}`).join(', ')} }`;
  }

  return `export function t(key: '${translation.key}'${valuesArgument});`;
}
