import { Context } from './context.js';
import { ProcessedFile } from './processed-file.js';

export type Transformer = (file: ProcessedFile, context: Context) => Promise<ProcessedFile | ProcessedFile[]>;
