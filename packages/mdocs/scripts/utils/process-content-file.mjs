import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { transformFile } from './transform-file.mjs';
import { readmeToIndexTransformer } from './transformers/readme-to-index.mjs';
import { inlineAssetsTransformer } from './transformers/inline-assets.mjs';

const defaultTransformers = [
  readmeToIndexTransformer,
  inlineAssetsTransformer,
];

async function getContentFile(filePath, { executionDir, contentDir }) {
  let content = (await readFile(filePath)).toString();

  return {
    input: join(process.cwd(), filePath),
    output: join(executionDir, contentDir, filePath),
    content,
  };
}

export async function processContentFile(filePath, customTransformers, context) {
  const transformers = (customTransformers || []).concat(defaultTransformers);
  let file = await getContentFile(filePath, context);
  return await transformFile(file, transformers, context);
}
