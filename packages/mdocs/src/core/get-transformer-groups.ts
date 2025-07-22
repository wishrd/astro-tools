import type { ConfigTransformerGroup } from '../models/config.js';
import type { TransformerGroup } from '../models/transformer-group.js';
import { getTransformer, type TransformId } from '../transformers/index.js';

const defaultTransformers: TransformId[][] = [
  [
    'md-to-mdx',
    'readme-to-index',
  ],
  [
    'local-assets',
    'local-links',
  ]
];

export function getTransformerGroups(customTransformers?: ConfigTransformerGroup | ConfigTransformerGroup[]): TransformerGroup[] {
  let transformerGroups: ConfigTransformerGroup[] = defaultTransformers;

  if (customTransformers && customTransformers.length > 0) {
    if (customTransformers.every((t) => Array.isArray(t))) {
      transformerGroups = customTransformers;
    } else if (customTransformers.every((t) => !Array.isArray(t))) {
      transformerGroups = [customTransformers];
    } else {
      throw new Error('Invalid transformers configuration');
    }
  }

  return transformerGroups.map((t) => t.map((t) => typeof t === 'function' ? t : getTransformer(t)));
}
