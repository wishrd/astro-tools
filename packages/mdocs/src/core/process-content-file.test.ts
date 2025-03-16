import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Context } from '../models/context';
import type { ProcessedFile } from '../models/processed-file';
import type { Transformer } from '../models/transformer';
import { processContentFile } from './process-content-file';

// Mock the fs promises
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn().mockResolvedValue(Buffer.from('# Test Content')),
}));

// Mock the transform-file module
vi.mock('./transform-file.js', () => ({
  transformFile: vi.fn().mockImplementation((file) => [file]),
}));

describe('processContentFile', () => {
  const mockContext: Context = {
    executionDir: '/test/exec',
    contentDir: 'content',
    assetsDir: 'assets',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process a file with default transformers', async () => {
    const filePath = 'test.md';
    const result = await processContentFile(filePath, undefined, mockContext);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);

    const processedFile = result[0];
    expect(processedFile).toHaveProperty('input');
    expect(processedFile).toHaveProperty('output');
    expect(processedFile).toHaveProperty('content');
  });

  it('should process a file with custom transformers', async () => {
    const filePath = 'test.md';
    const customTransformer: Transformer = async (file: ProcessedFile) => {
      return {
        ...file,
        content: `${file.content}\nCustom transformed`,
      };
    };

    const result = await processContentFile(
      filePath,
      [customTransformer],
      mockContext,
    );

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle transformer definitions and IDs', async () => {
    const filePath = 'test.md';
    const result = await processContentFile(
      filePath,
      ['md-to-mdx'],
      mockContext,
    );

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should construct correct input and output paths', async () => {
    const filePath = 'docs/test.md';
    const result = await processContentFile(filePath, undefined, mockContext);

    expect(result.length).toBeGreaterThan(0);
    const processedFile = result[0];
    if (!processedFile) {
      throw new Error('Expected at least one processed file');
    }

    expect(processedFile.input).toContain(filePath);
    expect(processedFile.output).toContain(mockContext.contentDir);
    expect(processedFile.output).toContain(mockContext.executionDir);
  });
});
