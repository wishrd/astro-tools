import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Context } from '../models/context.js';
import type { ProcessedFile } from '../models/processed-file.js';

export async function getContentFile(
  filePath: string,
  { executionDir, contentDir }: Context,
): Promise<ProcessedFile> {
  const content = (await readFile(filePath)).toString();

  return {
    input: join(process.cwd(), filePath),
    output: join(executionDir, contentDir, filePath),
    content,
  };
}
