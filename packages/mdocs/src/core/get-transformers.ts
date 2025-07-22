import type { ConfigTransformer } from '../models/config.js';
import type { Transformer } from '../models/transformer.js';
import { getTransformer, type TransformId } from '../transformers/index.js';

const defaultTransformers: TransformId[] = [
  'md-to-mdx',
  'readme-to-index',
  'local-assets',
  'local-links',
];

export function getTransformers(customTransformers?: ConfigTransformer[]): Transformer[] {
  return (customTransformers || defaultTransformers).map((t) => typeof t === 'function' ? t : getTransformer(t));
}
