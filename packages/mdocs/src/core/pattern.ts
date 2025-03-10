import { DEFAULT_EXTENSIONS } from './extensions.js';

export const DEFAULT_PATTERN = [
  '!**/node_modules/',
  `**/[^_]*.{${DEFAULT_EXTENSIONS.join(',')}}`,
];
