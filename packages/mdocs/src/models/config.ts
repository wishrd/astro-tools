import type { TransformerDefinition, TransformId } from '../transformers/index.js';
import type { Transformer } from './transformer.js';

export interface ConfigAssets {
  public?: string;
}

export interface Config {
  pattern?: string | string[];
  assets?: ConfigAssets;
  transformers?: (Transformer | TransformerDefinition | TransformId)[];
  starlight: unknown;
}
