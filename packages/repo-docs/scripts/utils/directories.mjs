import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const path = fileURLToPath(import.meta.url);
const projectCwd = resolve(dirname(path), '..', '..');

export const folders = {
  template: 'template',
  temporal: '.tmp',
}

export const directories = {
  projectCwd,
  template: join(projectCwd, folders.template),
  temporal: join(projectCwd, folders.temporal),
  files: join(projectCwd, 'scripts', 'files'),
}
