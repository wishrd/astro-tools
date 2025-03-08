import type { Transformer } from '../models/transformer.js';

export const readmeToIndexTransformer: Transformer = async (file) => {
  return { ...file, output: file.output.replace('README', 'index') };
}
