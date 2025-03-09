import { hash } from 'node:crypto';
import { dirname, extname, join, relative, resolve } from 'node:path';

import type { ProcessedFile } from '../models/processed-file.js';
import type { Transformer } from '../models/transformer.js';

export const inlineAssetsTransformer: Transformer = async (
  file,
  { executionDir, assetsDir },
) => {
  if (!file.content) {
    return [file];
  }

  const matches = file.content.match(/\!\[[\w|\s]+\](\([\.\/\w\s-_]+\))/gim);
  if (!matches) {
    return [file];
  }

  const assets: ProcessedFile[] = [];

  let content = file.content;

  const assetPaths = new Set(
    matches.map((match) =>
      match.substring(match.indexOf('(') + 1, match.length - 1),
    ),
  );

  for (const assetPath of assetPaths) {
    const fileExtension = extname(assetPath);

    const absoluteOutputPath = join(
      executionDir,
      assetsDir,
      `${hash('md5', assetPath)}${fileExtension}`,
    );
    const relativeOutputPath = relative(
      dirname(file.output),
      absoluteOutputPath,
    );

    content = content.replaceAll(assetPath, relativeOutputPath);

    assets.push({
      input: resolve(dirname(file.input), assetPath),
      output: absoluteOutputPath,
      content: '', // This will be filled by the file system operations
    });
  }

  return [{ ...file, content }].concat(assets);
};
