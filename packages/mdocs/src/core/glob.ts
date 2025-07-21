import { DEFAULT_EXTENSIONS } from './extensions.js';

export const DEFAULT_PATTERN = [
  `**/[^_]*.{${DEFAULT_EXTENSIONS.join(',')}}`,
];

export const DEFAULT_IGNORE = [
  '**/node_modules/**',
];
