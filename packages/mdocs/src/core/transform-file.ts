import { Context } from '../models/context.js';
import { ProcessedFile } from '../models/processed-file.js';
import { Transformer } from '../models/transformer.js';

export async function transformFile(
  file: ProcessedFile,
  transformers: Transformer[],
  context: Context
): Promise<ProcessedFile[]> {
  let extraFiles: ProcessedFile[] = [];

  for (let i = 0; i < transformers.length; i++) {
    const result = await transformers[i](file, context);
    if (Array.isArray(result)) {
      file = result[0];

      if (result.length > 1) {
        extraFiles = extraFiles.concat(result.slice(1));
      }
    } else {
      file = result;
    }
  }

  const files = await Promise.all(extraFiles.map(extraFile => transformFile(extraFile, transformers, context)));
  return files.flat().concat(file);
}
