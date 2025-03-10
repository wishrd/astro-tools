import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Context } from '../models/context.js';
import type { ProcessedFile } from '../models/processed-file.js';
import type { Transformer } from '../models/transformer.js';
import { inlineAssetsTransformer } from '../transformers/inline-assets.js';
import { readmeToIndexTransformer } from '../transformers/readme-to-index.js';
import { mdToMdxTransformer } from '../transformers/md-to-mdx.js';
import { transformFile } from './transform-file.js';

const defaultTransformers = [mdToMdxTransformer, readmeToIndexTransformer, inlineAssetsTransformer];

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
  customTransformers: Transformer[] | undefined,
  context: Context,
): Promise<ProcessedFile[]> {
  const transformers = customTransformers || defaultTransformers;
  const file = await getContentFile(filePath, context);
  return await transformFile(file, transformers, context);
}
