#!/usr/bin/env node

import { join } from 'node:path';

import yargs from 'yargs';

import { build } from './build.mjs';
import { file } from './utils/paths.mjs';

const { config: configFile } = yargs(process.argv.slice(2)).option('config', { type: 'string' }).help().argv;

let config;
const configPath = join(process.cwd(), configFile || file.config);

try {
  config = await import(configPath).then(f => f.default);
} catch (err) {
  console.error(`[ERROR] Missing configuration file ${configPath}`);
  process.exit(1);
}

await build({ config, configPath });
