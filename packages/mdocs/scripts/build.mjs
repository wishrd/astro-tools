import { existsSync } from 'node:fs';
import { cp, mkdtemp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

import { glob } from 'glob';
import yargs from 'yargs';

import { transform } from './utils/transform.mjs';
import { execAsync } from './utils/exec-async.mjs';
import { workDir, folder, file } from './utils/paths.mjs';
import { DEFAULT_PATTERN } from './utils/pattern.mjs';

const { config: configFile } = yargs(process.argv.slice(2)).option('config', { type: 'string' }).help().argv;
const configFilePath = join(process.cwd(), configFile || file.config);

const config = await import(configFilePath).then(f => f.default);

const temporalDir = workDir.temporal();

// Copy template
if (!existsSync(temporalDir)) await mkdir(temporalDir, { recursive: true });
const executionDir = await mkdtemp(join(temporalDir, '/'));
await cp(workDir.template(), executionDir, { recursive: true });

// Copy markdown files
const filePaths = await glob(config.pattern || DEFAULT_PATTERN);
const files = filePaths.map(file => ({ input: file, output: config.transform ? config.transform(file) : transform(file) }))
const contentDirectory = join(executionDir, folder.starlightContent);
const cpPromises = files.map(file => cp(join(process.cwd(), file.input), join(contentDirectory, file.output)));
await Promise.all(cpPromises);

// Build docs
await execAsync(join(workDir.cli(), './node_modules/.bin/astro build'), { cwd: executionDir, stdio: 'inherit', env: { ...process.env, REPO_DOCS_CONFIG_FILE: configFilePath } });

// Copy result to destination directory
const destDir = workDir.destination();
await rm(destDir, { recursive: true, force: true });
await cp(join(executionDir, folder.starlightDist), destDir, { recursive: true });

// Remove temporal files
await rm(executionDir, { recursive: true, force: true });
