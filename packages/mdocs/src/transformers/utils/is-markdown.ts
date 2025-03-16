import {
  MARKDOWN_EXTENDED_EXTENSIONS,
  MARKDOWN_EXTENSIONS,
} from '../../core/extensions.js';

function hasExtension(filePath: string, extensions: Array<string>): boolean {
  return extensions.some((ext) => filePath.endsWith(`.${ext}`));
}

export function isMarkdown(filePath: string): boolean {
  return hasExtension(filePath, MARKDOWN_EXTENSIONS);
}

export function isExtendedMarkdown(filePath: string): boolean {
  return hasExtension(filePath, MARKDOWN_EXTENDED_EXTENSIONS);
}

export function isAnyMarkdown(filePath: string): boolean {
  return isMarkdown(filePath) || isExtendedMarkdown(filePath);
}
