import type { Transformer } from '../models/transformer';
import { isAnyMarkdown, isExtendedMarkdown } from './utils/is-markdown.js';

const MDX_ATTRIBUTES = /^---\n/;
const FIRST_HEADING = /\s*# (.*)/;

function generateMdxAttributes(title: string): string {
  return `---\ntitle: '${title}'\n---\n`;
}

export const mdToMdxTransformer: Transformer = async (file) => {
  if (!file.content || !isAnyMarkdown(file.output)) {
    return file;
  }

  if (MDX_ATTRIBUTES.test(file.content)) {
    return file;
  }

  const heading = file.content.match(FIRST_HEADING);
  if (!heading || heading.length < 2 || !heading[1]) {
    return file;
  }

  const headingText = heading[1]?.trim();
  if (!headingText) {
    return file;
  }

  const output = isExtendedMarkdown(file.output) ? file.output : file.output.replace(/\.\w+$/, '.mdx');
  const content = `${generateMdxAttributes(headingText)}${file.content.replace(heading[0], '')}`;

  return {
    input: file.input,
    output,
    content,
  };
}
