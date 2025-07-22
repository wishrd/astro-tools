import { join, parse, relative } from 'node:path';
import type { TransformerFactory } from '../models/transformer.js';
import { isAnyMarkdown } from './utils/is-markdown.js';

export const localLinksTransformer: TransformerFactory<void> =
  () =>
  async (file, { executionDir, contentDir, files }) => {
    if (!file.content || !isAnyMarkdown(file.output)) {
      return [file];
    }

    let content = file.content;

    const matches = content.match(/\!?\[[\w\s-_]+\](\([\.\/\w\s-_]+\))/gim)?.filter(match => !match.startsWith('!'));
    if (!matches) {
      return [file];
    }

    const linkPaths = new Set(
      matches
        .map((match) =>
          match.substring(match.indexOf('(') + 1, match.length - 1),
        ),
    );

    linkPaths.forEach(linkPath => {
      const targetFile = files.find(file => relative(process.cwd(), file.input) === relative(process.cwd(), linkPath));
      if (targetFile) {
        const outputPath = parse(relative(join(executionDir, contentDir), targetFile.output));
        const link = join('./', outputPath.dir, outputPath.name, '/');
        content = content.replaceAll(linkPath, link);
      }
    });

    file.content = content;
    return file;
  };
