import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const path = fileURLToPath(import.meta.url);
const projectCwd = resolve(dirname(path), '..', '..');

const OUTPUT_FOLDER = '.mdocs';
const OUTPUT_BUILD_FOLDER = '.tmp';
const OUTPUT_DEST_FOLDER = 'dist';

export const file = {
  config: '.mdocs.mjs',
};

export const folder = {
  files: 'files',
  template: 'template',
  starlightContent: join('src', 'content', 'docs'),
  starlightAssets: join('src', 'assets'),
  starlightPublic: join('public'),
  starlightDist: 'dist',
};

export const workDir = {
  cli: () => projectCwd,
  template: () => join(projectCwd, folder.template),
  files: () => join(projectCwd, folder.files),
  temporal: () => join(projectCwd, OUTPUT_BUILD_FOLDER),
  destination: () => join(process.cwd(), OUTPUT_FOLDER, OUTPUT_DEST_FOLDER),
};
