import type { Context } from './context.js';
import type { ProcessedFile } from './processed-file.js';

export interface TransformContext extends Context {
  files: ProcessedFile[];
}
