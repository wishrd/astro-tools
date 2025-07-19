#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { buildCommand } from './commands/build.js';
import { serveCommand } from './commands/serve.js';

yargs()
  .command('build', 'build the documentation', {
    config: {
      type: 'string',
      default: '.mdocs.mjs',
    },
  }, ({ config }) => buildCommand(config))
  .command('serve', 'serve the documentation built with the "build" command', {
    port: {
      type: 'number',
      default: 8888
    }
  }, ({ port }) => serveCommand(port))
  .demandCommand(1)
  .help().parse(hideBin(process.argv));
