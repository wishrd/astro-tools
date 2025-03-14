import { dirname, join, relative } from 'node:path';

import type { TransformerFactory } from '../models/transformer.js';
import { isAnyMarkdown } from './utils/is-markdown.js';

export interface ReadmeToIndexTransformerOptions {
  flat?: boolean;
}

function isFlat(flat: boolean | undefined | null): boolean {
  return flat === undefined || flat === null || flat === true;
}

export const readmeToIndexTransformer: TransformerFactory<ReadmeToIndexTransformerOptions> = (options) => {
  return async (file, context) => {
    if (!isAnyMarkdown(file.output)) {
      return file;
    }

    const resolvedPath = relative(join(context.executionDir, context.contentDir), dirname(file.output));

    let output = file.output;
    if (resolvedPath && isFlat(options?.flat)) {
      const parts = output.split('/');
      const filename = parts[parts.length - 2];
      if (!filename) {
        throw new Error(`Error while transforming ${output} to index`);
      }

      output = output.replace(new RegExp(`${filename}/(readme|index)`, 'i'), filename);
    } else {
      output = output.replace(new RegExp('readme', 'i'), 'index');
    }

    return { ...file, output };
  };
};
