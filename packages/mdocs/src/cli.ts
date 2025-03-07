#!/usr/bin/env node

import { join } from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { build } from './core/build.js';
import { file } from './core/paths.js';
import { Config } from './models/config.js';

const { config: configFile } = yargs(hideBin(process.argv))
  .option('config', { type: 'string' })
  .help()
  .argv as { config?: string };

let config: Config;
const configPath = join(process.cwd(), configFile || file.config);

try {
  config = await import(configPath).then(f => f.default);
} catch (err) {
  console.error(`[ERROR] Missing configuration file ${configPath}`);
  process.exit(1);
}

await build({ config, configPath });
