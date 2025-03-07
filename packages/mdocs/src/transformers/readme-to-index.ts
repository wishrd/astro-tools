import { ProcessedFile } from '../models/processed-file.js';

export async function readmeToIndexTransformer(file: ProcessedFile): Promise<ProcessedFile> {
  return { ...file, output: file.output.replace('README', 'index') };
}
