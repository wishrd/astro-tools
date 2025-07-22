import type {
  TransformId,
  TransformerDefinition,
} from '../transformers/index.js';
import type { Transformer } from './transformer.js';

export interface ConfigAssets {
  public?: string;
}

export type ConfigTransformerGroup = (Transformer | TransformerDefinition | TransformId)[];

export interface Config {
  pattern?: string | string[];
  ignore?: string | string[];
  assets?: ConfigAssets;
  transformers?: ConfigTransformerGroup | ConfigTransformerGroup[];
  starlight: unknown;
}
