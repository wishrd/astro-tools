import { describe, expect, it } from 'vitest';
import type { Context } from '../models/context';
import type { ProcessedFile } from '../models/processed-file';
import { readmeToIndexTransformer } from './readme-to-index';

describe('readmeToIndexTransformer', () => {
  const mockContext: Context = {
    executionDir: '/test/dest',
    contentDir: 'src/content/docs',
    assetsDir: 'src/assets',
  };

  it('should convert readme to index in non-flat mode', async () => {
    const input: ProcessedFile = {
      input: '/test/source/readme.md',
      output: '/test/dest/src/content/docs/readme.md',
      content: '# Hello World',
    };

    const transformer = readmeToIndexTransformer({ flat: false });
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/readme.md',
      output: '/test/dest/src/content/docs/index.md',
      content: '# Hello World',
    });
  });

  it('should convert folder/readme to folder in flat mode (default)', async () => {
    const input: ProcessedFile = {
      input: '/test/source/getting-started/readme.md',
      output: '/test/dest/src/content/docs/getting-started/readme.md',
      content: '# Getting Started',
    };

    const transformer = readmeToIndexTransformer({});
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/getting-started/readme.md',
      output: '/test/dest/src/content/docs/getting-started.md',
      content: '# Getting Started',
    });
  });

  it('should handle case-insensitive readme/index', async () => {
    const input: ProcessedFile = {
      input: '/test/source/getting-started/README.md',
      output: '/test/dest/src/content/docs/getting-started/README.md',
      content: '# Getting Started',
    };

    const transformer = readmeToIndexTransformer({});
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/getting-started/README.md',
      output: '/test/dest/src/content/docs/getting-started.md',
      content: '# Getting Started',
    });
  });

  it('should handle index files in flat mode', async () => {
    const input: ProcessedFile = {
      input: '/test/source/getting-started/index.md',
      output: '/test/dest/src/content/docs/getting-started/index.md',
      content: '# Getting Started',
    };

    const transformer = readmeToIndexTransformer({});
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/getting-started/index.md',
      output: '/test/dest/src/content/docs/getting-started.md',
      content: '# Getting Started',
    });
  });

  it('should ignore non-markdown files', async () => {
    const input: ProcessedFile = {
      input: '/test/source/getting-started/readme.txt',
      output: '/test/dest/src/content/docs/getting-started/readme.txt',
      content: '# Getting Started',
    };

    const transformer = readmeToIndexTransformer({});
    const result = await transformer(input, mockContext);

    expect(result).toEqual(input);
  });

  it('should throw error if filename cannot be determined in flat mode', async () => {
    const input: ProcessedFile = {
      input: '/test/source/getting-started//readme.md',
      output: '/test/dest/src/content/docs/getting-started//readme.md',
      content: '# Getting Started',
    };

    const transformer = readmeToIndexTransformer({});
    await expect(transformer(input, mockContext)).rejects.toThrow(
      'Error while transforming /test/dest/src/content/docs/getting-started//readme.md to index',
    );
  });
});
