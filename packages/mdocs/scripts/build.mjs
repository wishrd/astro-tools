import { existsSync } from 'node:fs';
import { cp, mkdtemp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

import { glob } from 'glob';

import { transform } from './utils/transform.mjs';
import { execAsync } from './utils/exec-async.mjs';
import { workDir, folder } from './utils/paths.mjs';
import { DEFAULT_PATTERN } from './utils/pattern.mjs';

export async function build({ config, configPath }) {
  const temporalDir = workDir.temporal();

  // Copy template
  console.info('[INFO] Copying template...');
  if (!existsSync(temporalDir)) await mkdir(temporalDir, { recursive: true });
  const executionDir = await mkdtemp(join(temporalDir, '/'));
  await cp(workDir.template(), executionDir, { recursive: true });

  // Copy markdown files
  console.info('[INFO] Copying documentation files...');
  const filePaths = await glob(config.pattern || DEFAULT_PATTERN);
  const files = filePaths.map(file => ({ input: file, output: config.transform ? config.transform(file) : transform(file) }))
  const contentDirectory = join(executionDir, folder.starlightContent);
  const cpPromises = files.map(file => cp(join(process.cwd(), file.input), join(contentDirectory, file.output)));
  await Promise.all(cpPromises);

  // Build docs
  console.info('[INFO] Building docs...');
  await execAsync(join(workDir.cli(), './node_modules/.bin/astro build'), { cwd: executionDir, stdio: 'inherit', env: { ...process.env, REPO_DOCS_CONFIG_FILE: configPath } });

  // Copy result to destination directory
  console.info('[INFO] Copying result into the destination folder...');
  const destDir = workDir.destination();
  await rm(destDir, { recursive: true, force: true });
  await cp(join(executionDir, folder.starlightDist), destDir, { recursive: true });

  // Remove temporal files
  console.info('[INFO] Removing temporal files...');
  await rm(executionDir, { recursive: true, force: true });

  console.info('[INFO] Documentation generated successfully!');
}
