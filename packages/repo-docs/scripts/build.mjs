import { existsSync } from 'node:fs';
import { cp, mkdtemp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

import { glob } from 'glob';
import yargs from 'yargs';

import { transform } from './utils/transform.mjs';
import { execAsync } from './utils/exec-async.mjs';
import { directories } from './utils/directories.mjs';

const { config: configFile } = yargs(process.argv.slice(2)).option('config', { type: 'string' }).help().argv;
const configFilePath = join(process.cwd(), configFile || '.repo-docs.mjs');

const config = await import(configFilePath).then(f => f.default);

// Copy template
if (!existsSync(directories.temporal)) await mkdir(directories.temporal);
const executionDir = await mkdtemp(join(directories.temporal, '/'));
await cp(directories.template, executionDir, { recursive: true });

// Copy markdown files
const extensions = ['markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'md', 'mdx'];
const filePaths = await glob(config.pattern || ['!**/node_modules/', `**/[^_]*.{${extensions.join(',')}}`]);
const files = filePaths.map(file => ({ input: file, output: config.transform ? config.transform(file) : transform(file) }))
const contentDirectory = join(executionDir, 'src', 'content', 'docs');
const cpPromises = files.map(file => cp(join(process.cwd(), file.input), join(contentDirectory, file.output)));
await Promise.all(cpPromises);

// Build docs
await execAsync('npm run build', { cwd: executionDir, stdio: 'inherit', env: { ...process.env, REPO_DOCS_CONFIG_FILE: configFilePath } });

// Copy result to destination directory
const destDir = join(process.cwd(), config.dest);
await rm(destDir, { recursive: true, force: true });
await cp(join(executionDir, 'dist'), destDir, { recursive: true });
