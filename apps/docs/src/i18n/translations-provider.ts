import { translationsProviderFactory } from '@astro-tools/i18n/providers';

export default translationsProviderFactory({
  'en-US': () => import('./translations/en-US.json').then(json => json.default),
  'es-ES': () => import('./translations/es-ES.json').then(json => json.default),
});
