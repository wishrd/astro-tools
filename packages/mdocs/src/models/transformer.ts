import type { ProcessedFile } from './processed-file.js';
import type { TransformContext } from './transform-context.js';

export type Transformer = (
  file: ProcessedFile,
  context: TransformContext,
) => Promise<ProcessedFile | ProcessedFile[]>;

export type TransformerFactory<T> = (options?: T) => Transformer;
