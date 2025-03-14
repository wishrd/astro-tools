import type { Context } from './context.js';
import type { ProcessedFile } from './processed-file.js';

export type Transformer = (
  file: ProcessedFile,
  context: Context,
) => Promise<ProcessedFile | ProcessedFile[]>;

export type TransformerFactory<T> = (options?: T) => Transformer;
