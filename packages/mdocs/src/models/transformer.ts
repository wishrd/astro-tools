import type { Context } from './context.ts';
import type { ProcessedFile } from './processed-file.ts';

export type Transformer = (file: ProcessedFile, context: Context) => Promise<ProcessedFile | ProcessedFile[]>;
