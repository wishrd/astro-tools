import type { Transformer } from './transformer.js';

export interface ConfigAssets {
  public?: string;
}

export interface Config {
  pattern?: string | string[];
  assets?: ConfigAssets;
  transformers?: Transformer[];
  starlight: unknown;
}
