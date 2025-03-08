import { join } from 'node:path';
import { copyFile, mkdir, rm } from 'node:fs/promises';

import { execAsync } from '../src/core/exec-async';
import { workDir, folder } from '../src/core/paths';

const templateDir = workDir.template();

await rm(templateDir, { recursive: true, force: true });

await execAsync([
  `./node_modules/.bin/create-astro`,
  folder.template,
  '--template starlight',
  '--no-install',
  '--no-git',
  '--skip-houston'
].join(' '), { cwd: workDir.cli() });

await rm(join(templateDir, 'src', 'content', 'docs'), { recursive: true });
await rm(join(templateDir, 'README.md'));
await rm(join(templateDir, '.gitignore'));
await rm(join(templateDir, '.vscode'), { recursive: true, force: true });
await mkdir(join(templateDir, 'src', 'content', 'docs'));

const loadConfigFile = 'astro.config.load.mjs';
const astroConfigFile = 'astro.config.mjs';

await copyFile(join(workDir.files(), loadConfigFile), join(templateDir, loadConfigFile));
await copyFile(join(workDir.files(), astroConfigFile), join(templateDir, astroConfigFile));
