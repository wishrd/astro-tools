import { readFileSync, writeFileSync } from 'fs';
import { join,  } from 'path';

const file = join(process.cwd(), 'i18n', 'en-US.json');
const json = JSON.parse(readFileSync(file).toString());

function navigateObject(property, stack = []) {
  if (typeof property !== 'object') {
    return { key: stack.join('.'), value: property };
  }

  const keys = Object.keys(property);
  return keys.flatMap(key => navigateObject(property[key], stack.concat(key)));
}

function getInterpolationValues(translation) {
  return (translation.match(/\{\w+(:\w+)?\}/g) || [])
    .map((match) => {
      const [key, type = 'string'] = match.replace(/{|}/g, '').trim().split(':');
      return { key, type };
    });
}

const translations = navigateObject(json);

const overloads = translations.map(translation => {
  const interpolationValues = getInterpolationValues(translation.value);
  let valuesArgument = '';

  if (interpolationValues.length) {
    valuesArgument = `, values: { ${interpolationValues.map(({ key, type }) => `${key}: ${type}`).join(', ')} }`;
  }

  return `function t(key: '${translation.key}'${valuesArgument});`;
})

console.log(overloads.join('\n') + `export function t(key: string, values?: Record<string, string | number>): string;\n`);
