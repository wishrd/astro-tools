import { hash } from 'node:crypto';
import { dirname, extname, join, relative, resolve } from 'node:path';

import type { ProcessedFile } from '../models/processed-file.js';
import type { TransformerFactory } from '../models/transformer.js';
import { isAnyMarkdown } from './utils/is-markdown.js';

export const localAssetsTransformer: TransformerFactory<void> =
  () =>
  async (file, { executionDir, assetsDir }) => {
    if (!file.content || !isAnyMarkdown(file.output)) {
      return [file];
    }

    const matches = file.content.match(/\!\[[\w|\s]+\](\([\.\/\w\s-_]+\))/gim);
    if (!matches) {
      return [file];
    }

    const assets: ProcessedFile[] = [];

    const assetPaths = new Set(
      matches.map((match) =>
        match.substring(match.indexOf('(') + 1, match.length - 1),
      ),
    );

    let content = file.content;

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
      });
    }

    const files: ProcessedFile[] = [{ ...file, content }];
    return files.concat(assets);
  };
