import typesRaw from '../../../../../.astro/integrations/_astro-tools_i18n/types.d.ts?raw';

export function getTranslateTypes(): string {
  return typesRaw.split('\n').filter(line => line.includes('function t(')).join('\n');
}
