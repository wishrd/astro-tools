import { join, relative } from 'node:path';

import type { TransformerFactory } from '../models/transformer.js';
import { isAnyMarkdown } from './utils/is-markdown.js';

export interface PathMappingTransformerMapping {
  from: string | RegExp;
  to: string;
};

export type PathMappingTransformerOptions = {
  mappings: PathMappingTransformerMapping[];
};

export const pathMappingTransformer: TransformerFactory<PathMappingTransformerOptions> = (options) => {
  const regexMappings = (options?.mappings || []).map(mapping => ({ from: new RegExp(mapping.from), to: mapping.to }));

  return async (file, context) => {
    if (!regexMappings.length) {
      throw new Error(`Array of path mappings with at least one item is required!`);
    }

    if (!isAnyMarkdown(file.output)) {
      return file;
    }

    const relativeInput = relative(join(context.executionDir, context.contentDir), file.output);
    let relativeOutput = relativeInput;

    for (const mapping of regexMappings) {
      relativeOutput = relativeOutput.replace(mapping.from, mapping.to);
    }

    return { ...file, output: file.output.replace(relativeInput, relativeOutput) };
  };
}
