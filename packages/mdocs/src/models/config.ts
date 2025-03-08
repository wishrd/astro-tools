import type { Transformer } from './transformer.js';

export interface Config {
  pattern?: string | string[];
  transformers?: Transformer[];
  starlight: unknown;
}
