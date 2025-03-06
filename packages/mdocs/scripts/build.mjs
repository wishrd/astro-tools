import { existsSync } from 'node:fs';
import { cp, mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { glob } from 'glob';

import { execAsync } from './utils/exec-async.mjs';
import { workDir, folder } from './utils/paths.mjs';
import { DEFAULT_PATTERN } from './utils/pattern.mjs';
import { processContentFile } from './utils/process-content-file.mjs';

export async function build({ config, configPath }) {
  const temporalDir = workDir.temporal();

  // Copy template
  console.info('[INFO] Copying template...');
  if (!existsSync(temporalDir)) await mkdir(temporalDir, { recursive: true });
  const executionDir = await mkdtemp(join(temporalDir, '/'));
  await cp(workDir.template(), executionDir, { recursive: true });

  // Copy markdown files and related assets
  console.info('[INFO] Copying documentation files...');
  const filePaths = await glob(config.pattern || DEFAULT_PATTERN);

  const promises = filePaths.map(filePath => processContentFile(filePath, config.transformers, { executionDir, contentDir: folder.starlightContent, assetsDir: folder.starlightAssets }));
  const files = await Promise.all(promises);

  const cpPromises = files.flat().map(async file => {
    if (!file.content) {
      return cp(file.input, file.output);
    }

    await mkdir(dirname(file.output), { recursive: true });
    await writeFile(file.output, file.content);
  });
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
