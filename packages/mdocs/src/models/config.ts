import type {
  TransformId,
  TransformerDefinition,
} from '../transformers/index.js';
import type { Transformer } from './transformer.js';

export interface ConfigAssets {
  public?: string;
}

export interface Config {
  pattern?: string | string[];
  ignore?: string | string[];
  assets?: ConfigAssets;
  transformers?: (Transformer | TransformerDefinition | TransformId)[];
  starlight: unknown;
}
