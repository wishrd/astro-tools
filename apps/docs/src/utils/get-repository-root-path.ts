import { fileURLToPath } from 'url';
import { resolve } from 'path';

export function getRepositoryRootPath(): string {
  return resolve(fileURLToPath(import.meta.url), '../../../../../');
}
