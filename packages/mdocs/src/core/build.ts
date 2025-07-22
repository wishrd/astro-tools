import { glob } from 'glob';
import { existsSync } from 'node:fs';
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import type { Config } from '../models/config.js';
import type { ProcessedFile } from '../models/processed-file.js';
import { execAsync } from './exec-async.js';
import { getContentFile } from './get-content-file.js';
import { getTransformerGroups } from './get-transformer-groups.js';
import { DEFAULT_IGNORE, DEFAULT_PATTERN } from './glob.js';
import { folder, workDir } from './paths.js';
import { transformFile } from './transform-file.js';

interface BuildOptions {
  config: Config;
  configPath: string;
}

export async function build({
  config,
  configPath,
}: BuildOptions): Promise<void> {
  const temporalDir = workDir.temporal();

  // Copy template
  console.info('[INFO] Copying template...');
  if (!existsSync(temporalDir)) await mkdir(temporalDir, { recursive: true });
  const executionDir = await mkdtemp(join(temporalDir, '/'));
  await cp(workDir.template(), executionDir, { recursive: true });

  // Copy markdown files and related assets
  console.info('[INFO] Copying documentation files...');
  const filePaths = await glob(config.pattern || DEFAULT_PATTERN, { ignore: config.ignore || DEFAULT_IGNORE });

  // Read initial files contents
  const filesContentsPromises = filePaths.map((filePath: string) =>
    getContentFile(filePath, {
      executionDir,
      contentDir: folder.starlightContent,
      assetsDir: folder.starlightAssets,
    }),
  );

  const filesContents = await Promise.all(filesContentsPromises);

  // Process files contents in groups
  const transformerGroups = getTransformerGroups(config.transformers);

  let files: ProcessedFile[] = filesContents;
  let processedFiles: ProcessedFile[] = [];
  for (const transformerGroup of transformerGroups) {
    const promises = files.map((file: ProcessedFile) =>
      transformFile(file, transformerGroup, {
        executionDir,
        contentDir: folder.starlightContent,
        assetsDir: folder.starlightAssets,
        files,
      }),
    );
    const groupFiles = await Promise.all(promises);
    processedFiles = processedFiles.concat(groupFiles.flat());
    files = processedFiles;
  }

  // Copy transformed files to the destination directory
  const cpPromises = files.map(async (file: ProcessedFile) => {
    if (!file.content) {
      return cp(file.input, file.output);
    }

    await mkdir(dirname(file.output), { recursive: true });
    await writeFile(file.output, file.content);
  });
  await Promise.all(cpPromises);

  // Public assets
  if (config.assets?.public) {
    cp(
      join(process.cwd(), config.assets.public),
      join(executionDir, folder.starlightPublic),
      { recursive: true },
    );
  }

  // Build docs
  console.info('[INFO] Building docs...');
  await execAsync(join(workDir.cli(), './node_modules/.bin/astro build'), {
    cwd: executionDir,
    env: { ...process.env, REPO_DOCS_CONFIG_FILE: configPath },
  });

  // Copy result to destination directory
  console.info('[INFO] Copying result into the destination folder...');
  const destDir = workDir.destination();
  await rm(destDir, { recursive: true, force: true });
  await cp(join(executionDir, folder.starlightDist), destDir, {
    recursive: true,
  });

  // Remove temporal files
  console.info('[INFO] Removing temporal files...');
  await rm(executionDir, { recursive: true, force: true });

  console.info('[INFO] Documentation generated successfully!');
}
