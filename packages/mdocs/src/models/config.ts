import type { StarlightUserConfigWithPlugins } from '@astrojs/starlight/utils/plugins';
import type { Transformer } from './transformer.js';

export interface Config {
  pattern?: string | string[];
  transformers?: Transformer[];
  starlight: StarlightUserConfigWithPlugins;
}
