import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProcessedFile } from '../models/processed-file';
import type { TransformContext } from '../models/transform-context';
import type { Transformer } from '../models/transformer';
import { mdToMdxTransformer } from '../transformers/md-to-mdx';
import { transformFile } from './transform-file';

// Mock the fs promises
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn().mockResolvedValue(Buffer.from('# Test Content')),
}));

// Mock the transform-file module
vi.mock('./transform-file.js', () => ({
  transformFile: vi.fn().mockImplementation((file) => [file]),
}));

describe('processContentFile', () => {
  const mockContext: TransformContext = {
    executionDir: '/test/exec',
    contentDir: 'content',
    assetsDir: 'assets',
    files: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process a file with default transformers', async () => {
    const file = {
      input: 'test.md',
      output: 'test.md',
      content: '# Test Content',
    };
    const result = await transformFile(file, mdToMdxTransformer(), mockContext);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);

    const processedFile = result[0];
    expect(processedFile).toHaveProperty('input');
    expect(processedFile).toHaveProperty('output');
    expect(processedFile).toHaveProperty('content');
  });

  it('should process a file with custom transformers', async () => {
    const file = {
      input: 'test.md',
      output: 'test.md',
      content: '# Test Content',
    };
    const customTransformer: Transformer = async (file: ProcessedFile) => {
      return {
        ...file,
        content: `${file.content}\nCustom transformed`,
      };
    };

    const result = await transformFile(file, customTransformer, mockContext);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle transformer definitions and IDs', async () => {
    const file = {
      input: 'test.md',
      output: 'test.md',
      content: '# Test Content',
    };
    const result = await transformFile(
      file,
      mdToMdxTransformer(),
      mockContext,
    );

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });
});
