import { readFileSync } from 'node:fs';

import { defineConfig } from 'tsup';

const { peerDependencies } = JSON.parse(
  readFileSync('./package.json', 'utf-8'),
);

export default defineConfig(() => {
  return {
    entry: ['src/**/*.ts'],
    format: ['esm'],
    target: 'node18',
    bundle: false,
    dts: true,
    sourcemap: true,
    clean: true,
    minify: false,
    external: [...Object.keys(peerDependencies)],
    tsconfig: 'tsconfig.json',
  };
});
