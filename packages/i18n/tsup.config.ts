import { readFileSync } from 'node:fs';

import { defineConfig } from 'tsup';

const { peerDependencies } = JSON.parse(
  readFileSync('./package.json', 'utf-8'),
);

export default defineConfig((options) => {
  const dev = !!options.watch;
  return {
    entry: ['src/**/*.ts'],
    format: ['esm'],
    target: 'node18',
    bundle: true,
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: true,
    minify: !dev,
    external: [...Object.keys(peerDependencies), '@astro-tools:transfer-state'],
    tsconfig: 'tsconfig.json',
  };
});
