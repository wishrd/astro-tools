import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { typesProviderFactory } from '@astro-tools/i18n/types';

const resolve = (path) => join(dirname(fileURLToPath(import.meta.url)), path);

export default typesProviderFactory(resolve('./translations/en-US.json'));
