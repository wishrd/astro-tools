import type { Transformer, TransformerFactory } from '../models/transformer.js';
import { localAssetsTransformer } from './local-assets.js';
import { localLinksTransformer } from './local-links.js';
import { mdToMdxTransformer } from './md-to-mdx.js';
import { pathMappingTransformer } from './path-mapping.js';
import { readmeToIndexTransformer } from './readme-to-index.js';

export type TransformId =
  | 'md-to-mdx'
  | 'readme-to-index'
  | 'local-assets'
  | 'local-links'
  | 'path-mapping';

// biome-ignore lint/suspicious/noExplicitAny: allow factory pattern
export type TransformerDefinition = { id: TransformId; options?: any };

// biome-ignore lint/suspicious/noExplicitAny: allow factory pattern
const factory = new Map<TransformId, TransformerFactory<any>>();
factory.set('md-to-mdx', mdToMdxTransformer);
factory.set('readme-to-index', readmeToIndexTransformer);
factory.set('local-assets', localAssetsTransformer);
factory.set('local-links', localLinksTransformer);
factory.set('path-mapping', pathMappingTransformer);

export function getTransformer(
  idOrDefinition: TransformId | TransformerDefinition,
): Transformer {
  const normalizedDefinition =
    typeof idOrDefinition === 'string'
      ? { id: idOrDefinition }
      : idOrDefinition;

  const transformer = factory.get(normalizedDefinition.id);
  if (!transformer) {
    throw new Error(`Transformer with ID ${idOrDefinition} is not registered!`);
  }

  return transformer(normalizedDefinition.options);
}
