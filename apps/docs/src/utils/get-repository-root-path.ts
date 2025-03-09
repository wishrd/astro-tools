import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getRepositoryRootPath(): string {
  return resolve(fileURLToPath(import.meta.url), '../../../../../');
}
