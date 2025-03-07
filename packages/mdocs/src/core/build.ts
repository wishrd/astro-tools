import { existsSync } from 'node:fs';
import { cp, mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { glob } from 'glob';

import { execAsync } from './exec-async.js';
import { workDir, folder } from './paths.js';
import { DEFAULT_PATTERN } from './pattern.js';
import { processContentFile } from './process-content-file.js';
import { Config } from '../models/config.js';
import { ProcessedFile } from '../models/processed-file.js';

interface BuildOptions {
  config: Config;
  configPath: string;
}

export async function build({ config, configPath }: BuildOptions): Promise<void> {
  const temporalDir = workDir.temporal();

  // Copy template
  console.info('[INFO] Copying template...');
  if (!existsSync(temporalDir)) await mkdir(temporalDir, { recursive: true });
  const executionDir = await mkdtemp(join(temporalDir, '/'));
  await cp(workDir.template(), executionDir, { recursive: true });

  // Copy markdown files and related assets
  console.info('[INFO] Copying documentation files...');
  const filePaths = await glob(config.pattern || DEFAULT_PATTERN);

  const promises = filePaths.map((filePath: string) =>
    processContentFile(filePath, config.transformers, {
      executionDir,
      contentDir: folder.starlightContent,
      assetsDir: folder.starlightAssets
    })
  );
  const files = await Promise.all(promises);

  const cpPromises = files.flat().map(async (file: ProcessedFile) => {
    if (!file.content) {
      return cp(file.input, file.output);
    }

    await mkdir(dirname(file.output), { recursive: true });
    await writeFile(file.output, file.content);
  });
  await Promise.all(cpPromises);

  // Build docs
  console.info('[INFO] Building docs...');
  await execAsync(join(workDir.cli(), './node_modules/.bin/astro build'), {
    cwd: executionDir,
    stdio: 'inherit',
    env: { ...process.env, REPO_DOCS_CONFIG_FILE: configPath }
  });

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
