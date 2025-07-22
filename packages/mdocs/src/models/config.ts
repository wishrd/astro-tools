import type {
  TransformId,
  TransformerDefinition,
} from '../transformers/index.js';
import type { Transformer } from './transformer.js';

export interface ConfigAssets {
  public?: string;
}

export type ConfigTransformer = Transformer | TransformerDefinition | TransformId;

export interface Config {
  pattern?: string | string[];
  ignore?: string | string[];
  assets?: ConfigAssets;
  transformers?: ConfigTransformer[];
  starlight: unknown;
}
