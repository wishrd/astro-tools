import { describe, it, expect } from 'vitest';
import { localAssetsTransformer } from './local-assets';
import type { Context } from '../models/context';
import type { ProcessedFile } from '../models/processed-file';
import { hash } from 'node:crypto';

describe('localAssetsTransformer', () => {
  const mockContext: Context = {
    executionDir: '/test/dest',
    contentDir: 'src/content',
    assetsDir: 'src/assets'
  };

  function getMd5Hash(path: string): string {
    return hash('md5', path);
  }

  it('should transform single local image reference', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.md',
      content: '# Guide\n\n![My Image](./images/test.png)'
    };

    const transformer = localAssetsTransformer();
    const result = await transformer(input, mockContext);

    const expectedHash = getMd5Hash('./images/test.png');
    expect(result).toEqual([
      {
        input: '/test/source/guide.md',
        output: '/test/dest/src/content/docs/guide.md',
        content: `# Guide\n\n![My Image](../../assets/${expectedHash}.png)`
      },
      {
        input: '/test/source/images/test.png',
        output: '/test/dest/src/assets/' + expectedHash + '.png'
      }
    ]);
  });

  it('should transform multiple local image references', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.md',
      content: '# Guide\n\n![First Image](./images/first.jpg)\n\n![Second Image](./images/second.png)'
    };

    const transformer = localAssetsTransformer();
    const result = await transformer(input, mockContext);

    const firstHash = getMd5Hash('./images/first.jpg');
    const secondHash = getMd5Hash('./images/second.png');
    expect(result).toEqual([
      {
        input: '/test/source/guide.md',
        output: '/test/dest/src/content/docs/guide.md',
        content: `# Guide\n\n![First Image](../../assets/${firstHash}.jpg)\n\n![Second Image](../../assets/${secondHash}.png)`
      },
      {
        input: '/test/source/images/first.jpg',
        output: '/test/dest/src/assets/' + firstHash + '.jpg'
      },
      {
        input: '/test/source/images/second.png',
        output: '/test/dest/src/assets/' + secondHash + '.png'
      }
    ]);
  });

  it('should handle files without image references', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.md',
      content: '# Guide\n\nJust some text without images.'
    };

    const transformer = localAssetsTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual([input]);
  });

  it('should handle files without content', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.md'
    };

    const transformer = localAssetsTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual([input]);
  });

  it('should handle non-markdown files', async () => {
    const input: ProcessedFile = {
      input: '/test/source/data.json',
      output: '/test/dest/src/content/docs/data.json',
      content: '{"image": "./images/test.png"}'
    };

    const transformer = localAssetsTransformer();
    const result = await transformer(input, mockContext);

    expect(result).toEqual([input]);
  });

  it('should handle image references with spaces in alt text', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.md',
      content: '# Guide\n\n![My Complex Image Title](./images/test.png)'
    };

    const transformer = localAssetsTransformer();
    const result = await transformer(input, mockContext);

    const expectedHash = getMd5Hash('./images/test.png');
    expect(result).toEqual([
      {
        input: '/test/source/guide.md',
        output: '/test/dest/src/content/docs/guide.md',
        content: `# Guide\n\n![My Complex Image Title](../../assets/${expectedHash}.png)`
      },
      {
        input: '/test/source/images/test.png',
        output: '/test/dest/src/assets/' + expectedHash + '.png'
      }
    ]);
  });

  it('should handle duplicate image references', async () => {
    const input: ProcessedFile = {
      input: '/test/source/guide.md',
      output: '/test/dest/src/content/docs/guide.md',
      content: '# Guide\n\n![First](./images/test.png)\n\n![Second](./images/test.png)'
    };

    const transformer = localAssetsTransformer();
    const result = await transformer(input, mockContext);

    const expectedHash = getMd5Hash('./images/test.png');
    expect(result).toEqual([
      {
        input: '/test/source/guide.md',
        output: '/test/dest/src/content/docs/guide.md',
        content: `# Guide\n\n![First](../../assets/${expectedHash}.png)\n\n![Second](../../assets/${expectedHash}.png)`
      },
      {
        input: '/test/source/images/test.png',
        output: '/test/dest/src/assets/' + expectedHash + '.png'
      }
    ]);
  });
});
