import { StarlightConfig } from './starlight-config.js';
import { Transformer } from './transformer.js';

export interface Config {
  pattern?: string[];
  transformers?: Transformer[];
  starlight: StarlightConfig;
}
