import { defineConfig } from 'tsup';
import { peerDependencies } from './package.json';

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
