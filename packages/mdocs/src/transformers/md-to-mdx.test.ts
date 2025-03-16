import { describe, expect, it } from 'vitest';
import type { Context } from '../models/context';
import type { ProcessedFile } from '../models/processed-file';
import { mdToMdxTransformer } from './md-to-mdx';

describe('mdToMdxTransformer', () => {
  const mockContext: Context = {
    executionDir: '/test/dest',
    contentDir: 'src/content/docs',
    assetsDir: 'src/assets',
  };

  it('should convert markdown to mdx', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: '# Hello World\n\nThis is a test',
    };

    const transformer = mdToMdxTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: "---\ntitle: 'Hello World'\n---\n\n\nThis is a test",
    });
  });

  it('should preserve existing mdx attributes', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content:
        '---\ndescription: My Guide\n---\n\n# Hello World\n\nThis is a test',
    };

    const transformer = mdToMdxTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content:
        '---\ndescription: My Guide\n---\n\n# Hello World\n\nThis is a test',
    });
  });

  it('should handle files without content', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
    };

    const transformer = mdToMdxTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual(input);
  });

  it('should handle files without headings', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: 'Just some content without headings',
    };

    const transformer = mdToMdxTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: 'Just some content without headings',
    });
  });

  it('should handle files with empty headings', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: '#\n\nContent with empty heading',
    };

    const transformer = mdToMdxTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: '#\n\nContent with empty heading',
    });
  });

  it('should preserve file extension if already mdx', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.mdx',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: '# Hello World\n\nThis is a test',
    };

    const transformer = mdToMdxTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/guide.mdx',
      output: '/test/dest/src/content/docs/guide.mdx',
      content: "---\ntitle: 'Hello World'\n---\n\n\nThis is a test",
    });
  });
});
