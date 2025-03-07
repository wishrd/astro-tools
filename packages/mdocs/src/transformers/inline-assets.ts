import { hash } from 'node:crypto';
import { resolve, extname, join, relative, dirname } from 'node:path';

import { Context } from '../models/context.js';
import { ProcessedFile } from '../models/processed-file.js';

export async function inlineAssetsTransformer(file: ProcessedFile, { executionDir, assetsDir }: Context): Promise<ProcessedFile[]> {
  if (!file.content) {
    return [file];
  }

  const matches = file.content.match(/\!\[[\w|\s]+\](\([\.\/\w\s-_]+\))/gmi);
  if (!matches) {
    return [file];
  }

  const assets: ProcessedFile[] = [];

  let content = file.content;

  const assetPaths = new Set(matches.map(match => match.substring(match.indexOf('(') + 1, match.length - 1)));

  for (const assetPath of assetPaths) {
    const fileExtension = extname(assetPath);

    const absoluteOutputPath = join(executionDir, assetsDir, `${hash('md5', assetPath)}${fileExtension}`);
    const relativeOutputPath = relative(dirname(file.output), absoluteOutputPath);

    content = content.replaceAll(assetPath, relativeOutputPath);

    assets.push({
      input: resolve(dirname(file.input), assetPath),
      output: absoluteOutputPath,
      content: '', // This will be filled by the file system operations
    });
  }

  return [{ ...file, content }].concat(assets);
}
