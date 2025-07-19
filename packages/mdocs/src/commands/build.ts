import { join } from 'node:path';


import { build } from '../core/build.js';
import { file } from '../core/paths.js';
import type { Config } from '../models/config.js';

export async function buildCommand(configFile?: string) {
  let config: Config;
  const configPath = join(process.cwd(), configFile || file.config);

  try {
    config = await import(configPath).then((f) => f.default);
  } catch (err) {
    console.error(`[ERROR] Missing configuration file ${configPath}`);
    process.exit(1);
  }

  await build({ config, configPath });
}