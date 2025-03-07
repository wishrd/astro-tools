import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { transformFile } from './transform-file.js';
import { readmeToIndexTransformer } from '../transformers/readme-to-index.js';
import { inlineAssetsTransformer } from '../transformers/inline-assets.js';
import type { Context } from '../models/context.js';
import type { ProcessedFile } from '../models/processed-file.js';
import type { Transformer } from '../models/transformer.js';

const defaultTransformers = [
  readmeToIndexTransformer,
  inlineAssetsTransformer,
];

async function getContentFile(filePath: string, { executionDir, contentDir }: Context): Promise<ProcessedFile> {
  let content = (await readFile(filePath)).toString();

  return {
    input: join(process.cwd(), filePath),
    output: join(executionDir, contentDir, filePath),
    content,
  };
}

export async function processContentFile(
  filePath: string,
  customTransformers: Transformer[] | undefined,
  context: Context
): Promise<ProcessedFile[]> {
  const transformers = customTransformers || defaultTransformers;
  let file = await getContentFile(filePath, context);
  return await transformFile(file, transformers, context);
}
