import { join } from 'node:path';
import { copyFile, mkdir, rm } from 'node:fs/promises';

import { execAsync } from './utils/exec-async.mjs';
import { directories, folders } from './utils/directories.mjs';

await rm(directories.template, { recursive: true, force: true });

await execAsync([
  `./node_modules/.bin/create-astro`,
  folders.template,
  '--template starlight',
  '--no-install',
  '--no-git',
  '--skip-houston'
].join(' '), { cwd: directories.projectCwd });

await rm(join(directories.template, 'src', 'content', 'docs'), { recursive: true });
await rm(join(directories.template, 'README.md'));
await rm(join(directories.template, '.gitignore'));
await rm(join(directories.template, '.vscode'), { recursive: true, force: true });
await mkdir(join(directories.template, 'src', 'content', 'docs'));

const loadConfigFile = 'astro.config.load.mjs';
const astroConfigFile = 'astro.config.mjs';

await copyFile(join(directories.files, loadConfigFile), join(directories.template, loadConfigFile));
await copyFile(join(directories.files, astroConfigFile), join(directories.template, astroConfigFile));
