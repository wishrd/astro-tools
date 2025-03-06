import { hash } from 'node:crypto';
import { resolve, extname, join, relative, dirname } from 'node:path';

export function inlineAssetsTransformer(file, { executionDir, assetsDir }) {
  if (!file.content) {
    return file;
  }

  const matches = file.content.match(/\!\[[\w|\s]+\](\([\.\/\w\s-_]+\))/gmi);
  if (!matches) {
    return file;
  }

  const assets = [];

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
    });
  }

  return [{ ...file, content }].concat(assets);
}
