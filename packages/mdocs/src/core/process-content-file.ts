import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Context } from '../models/context.js';
import type { ProcessedFile } from '../models/processed-file.js';
import type { Transformer } from '../models/transformer.js';
import {
  type TransformId,
  type TransformerDefinition,
  getTransformer,
} from '../transformers/index.js';
import { transformFile } from './transform-file.js';

const defaultTransformers: TransformId[] = [
  'md-to-mdx',
  'readme-to-index',
  'local-assets',
];

async function getContentFile(
  filePath: string,
  { executionDir, contentDir }: Context,
): Promise<ProcessedFile> {
  const content = (await readFile(filePath)).toString();

  return {
    input: join(process.cwd(), filePath),
    output: join(executionDir, contentDir, filePath),
    content,
  };
}

export async function processContentFile(
  filePath: string,
  customTransformers:
    | (Transformer | TransformerDefinition | TransformId)[]
    | undefined,
  context: Context,
): Promise<ProcessedFile[]> {
  const transformers = (customTransformers || defaultTransformers).map((t) =>
    typeof t === 'function' ? t : getTransformer(t),
  );
  const file = await getContentFile(filePath, context);
  return await transformFile(file, transformers, context);
}
