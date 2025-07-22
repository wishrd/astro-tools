import type { ProcessedFile } from '../models/processed-file.js';
import type { TransformContext } from '../models/transform-context.js';
import type { Transformer } from '../models/transformer.js';

export async function transformFile(
  file: ProcessedFile,
  transformers: Transformer[],
  context: TransformContext,
): Promise<ProcessedFile[]> {
  let workingFile = file;
  let extraFiles: ProcessedFile[] = [];

  for (let i = 0; i < transformers.length; i++) {
    const transformer = transformers[i];
    if (!transformer) {
      throw new Error(`Invalid transformer value at position ${i}`);
    }

    const result = await transformer(workingFile, context);
    if (Array.isArray(result)) {
      if (!result[0]) {
        throw new Error('Transformer result array is empty!');
      }

      workingFile = result[0];

      if (result.length > 1) {
        extraFiles = extraFiles.concat(result.slice(1));
      }
    } else {
      workingFile = result;
    }
  }

  const files = await Promise.all(
    extraFiles.map((extraFile) =>
      transformFile(extraFile, transformers, context),
    ),
  );
  return [workingFile].concat(files.flat());
}
