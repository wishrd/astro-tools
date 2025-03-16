import { describe, expect, it } from 'vitest';
import type { Context } from '../models/context';
import type { ProcessedFile } from '../models/processed-file';
import { pathMappingTransformer } from './path-mapping';

describe('pathMappingTransformer', () => {
  const mockContext: Context = {
    executionDir: '/test/dest',
    contentDir: 'src/content/docs',
    assetsDir: 'src/assets',
  };

  it('should apply string mapping to markdown file', async () => {
    const input: ProcessedFile = {
      input: '/test/source/docs/guide.md',
      output: '/test/dest/src/content/docs/docs/guide.md',
      content: '# Guide',
    };

    const transformer = pathMappingTransformer({
      mappings: [{ from: 'docs', to: 'documentation' }],
    });
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/docs/guide.md',
      output: '/test/dest/src/content/docs/documentation/guide.md',
      content: '# Guide',
    });
  });

  it('should apply regex mapping to markdown file', async () => {
    const input: ProcessedFile = {
      input: '/test/source/docs/v1/guide.md',
      output: '/test/dest/src/content/docs/v1/guide.md',
      content: '# Guide',
    };

    const transformer = pathMappingTransformer({
      mappings: [{ from: /v\d+\//, to: '' }],
    });
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/docs/v1/guide.md',
      output: '/test/dest/src/content/docs/guide.md',
      content: '# Guide',
    });
  });

  it('should apply multiple mappings in sequence', async () => {
    const input: ProcessedFile = {
      input: '/test/source/docs/v1/guide.md',
      output: '/test/dest/src/content/docs/docs/v1/guide.md',
      content: '# Guide',
    };

    const transformer = pathMappingTransformer({
      mappings: [
        { from: /v\d+\//, to: '' },
        { from: 'docs', to: 'documentation' },
      ],
    });
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/docs/v1/guide.md',
      output: '/test/dest/src/content/docs/documentation/guide.md',
      content: '# Guide',
    });
  });

  it('should ignore non-markdown files', async () => {
    const input: ProcessedFile = {
      input: '/test/source/docs/data.json',
      output: '/test/dest/src/content/docs/docs/data.json',
      content: '{"key": "value"}',
    };

    const transformer = pathMappingTransformer({
      mappings: [{ from: 'docs', to: 'documentation' }],
    });
    const result = await transformer(input, mockContext);

    expect(result).toEqual(input);
  });

  it('should throw error if no mappings provided', async () => {
    const input: ProcessedFile = {
      input: '/test/source/docs/guide.md',
      output: '/test/dest/src/content/docs/docs/guide.md',
      content: '# Guide',
    };

    const transformer = pathMappingTransformer({
      mappings: [],
    });

    await expect(transformer(input, mockContext)).rejects.toThrow(
      'Array of path mappings with at least one item is required!',
    );
  });

  it('should throw error if options not provided', async () => {
    const input: ProcessedFile = {
      input: '/test/source/docs/guide.md',
      output: '/test/dest/src/content/docs/docs/guide.md',
      content: '# Guide',
    };

    const transformer = pathMappingTransformer();

    await expect(transformer(input, mockContext)).rejects.toThrow(
      'Array of path mappings with at least one item is required!',
    );
  });

  it('should handle complex regex patterns', async () => {
    const input: ProcessedFile = {
      input: '/test/source/docs/api/v2.1/endpoints/users.md',
      output: '/test/dest/src/content/docs/api/v2.1/endpoints/users.md',
      content: '# API Endpoints',
    };

    const transformer = pathMappingTransformer({
      mappings: [
        { from: /v\d+\.\d+\//, to: '' },
        { from: 'endpoints', to: 'reference' },
      ],
    });
    const result = await transformer(input, mockContext);

    expect(result).toEqual({
      input: '/test/source/docs/api/v2.1/endpoints/users.md',
      output: '/test/dest/src/content/docs/api/reference/users.md',
      content: '# API Endpoints',
    });
  });
});
